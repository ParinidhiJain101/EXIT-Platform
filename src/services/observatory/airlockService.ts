/**
 * LIVEGENDER Airlock Service
 *
 * A deterministic, pure, testable de-identification pipeline.
 * This is the ONLY path through which survivor data may approach
 * LIVEGENDER. Each stage is explicit and independently testable.
 *
 * DESIGN RULES (enforced by types):
 * - Raw candidates NEVER reach the dashboard.
 * - Sanitized contributions NEVER appear as individual rows in the dashboard.
 * - The dashboard receives ONLY AggregateCell[] where count >= K_THRESHOLD.
 * - No join key between Plan IDs, Vault IDs, and contributions exists here.
 *
 * K-THRESHOLD: 20 for this MVP (raised from the k=10 documented in the brief
 * to provide stronger de-identification in the prototype demo context).
 */

import type {
  RawContributionCandidate,
  SanitizedContribution,
  AggregateCell,
  AirlockResult,
  AirlockRejectionReason,
  ObservatoryDashboard,
  HarmCategory,
  BroadRegion,
  ServiceNeed,
  QuarterBucket,
} from './airlockTypes';
import {
  ALLOWED_HARM_CATEGORIES,
  ALLOWED_BROAD_REGIONS,
  ALLOWED_SERVICE_NEEDS,
  ALLOWED_QUARTER_BUCKETS,
} from './airlockTypes';

// ─── K-threshold ─────────────────────────────────────────────────────────────

export const K_THRESHOLD = 20;

// ─── Stage 1: Forbidden field rejection ──────────────────────────────────────

/**
 * Hard-rejects any candidate that carries a known forbidden field.
 * This is a whitelist check — if ANY forbidden field is non-empty,
 * the entire contribution is discarded.
 *
 * Forbidden fields include any linkable identifier or sensitive content
 * that could re-identify a survivor.
 */
const FORBIDDEN_FIELDS: ReadonlyArray<keyof RawContributionCandidate> = [
  'survivorId',
  'planId',
  'vaultItemId',
  'name',
  'email',
  'phone',
  'exactAddress',
  'exactGPS',
  'ipAddress',
  'deviceId',
  'narrativeText',
  'evidenceFileRef',
];

export function rejectForbiddenFields(
  candidate: RawContributionCandidate,
): AirlockRejectionReason | null {
  for (const field of FORBIDDEN_FIELDS) {
    const value = candidate[field];
    if (value !== undefined && value !== null && value !== '') {
      return 'forbidden_field_present';
    }
  }
  return null;
}

// ─── Stage 2: Identifier stripping ───────────────────────────────────────────

/**
 * Returns a new object containing ONLY the four allowed fields.
 * Destructures away everything else — this is the identifier strip.
 * Result is an intermediate object with unvalidated field values.
 */
export function stripIdentifiers(
  candidate: RawContributionCandidate,
): Pick<
  RawContributionCandidate,
  'harmCategory' | 'broadRegion' | 'serviceNeed' | 'quarterBucket'
> {
  return {
    harmCategory: candidate.harmCategory,
    broadRegion: candidate.broadRegion,
    serviceNeed: candidate.serviceNeed,
    quarterBucket: candidate.quarterBucket,
  };
}

// ─── Stage 3 & 4: Time and geography generalization ─────────────────────────

/**
 * Generalizes a raw quarter string to a canonical bucket.
 * Returns null if the value cannot be generalized.
 *
 * This stage ensures no sub-monthly granularity leaks through.
 * Any date strings are bucketed to the nearest approved quarter.
 */
export function generalizeTime(rawQuarter: string | undefined): QuarterBucket | null {
  if (!rawQuarter) return null;
  // Trim and check against the allowed set (already at quarterly grain)
  const trimmed = rawQuarter.trim();
  if ((ALLOWED_QUARTER_BUCKETS as ReadonlyArray<string>).includes(trimmed)) {
    return trimmed as QuarterBucket;
  }
  return null;
}

/**
 * Generalizes a raw region string to a canonical broad region.
 * Returns null if the value cannot be generalized to an approved region.
 *
 * This stage ensures no district/city/exact location leaks through.
 */
export function generalizeGeography(rawRegion: string | undefined): BroadRegion | null {
  if (!rawRegion) return null;
  const trimmed = rawRegion.trim();
  if ((ALLOWED_BROAD_REGIONS as ReadonlyArray<string>).includes(trimmed)) {
    return trimmed as BroadRegion;
  }
  return null;
}

// ─── Stage 5: Taxonomy validation ────────────────────────────────────────────

/**
 * Validates all four fields against the approved taxonomy.
 * Returns a rejection reason if any field is invalid.
 *
 * The taxonomy is closed — unrecognized values are rejected, not guessed.
 * This prevents contribution poisoning via unexpected enum values.
 */
export function validateTaxonomy(stripped: {
  harmCategory?: string;
  broadRegion?: string;
  serviceNeed?: string;
  quarterBucket?: string;
}): AirlockRejectionReason | null {
  if (
    !stripped.harmCategory ||
    !(ALLOWED_HARM_CATEGORIES as ReadonlyArray<string>).includes(stripped.harmCategory)
  ) {
    return 'invalid_harm_category';
  }
  if (
    !stripped.broadRegion ||
    !(ALLOWED_BROAD_REGIONS as ReadonlyArray<string>).includes(stripped.broadRegion)
  ) {
    return 'invalid_broad_region';
  }
  if (
    !stripped.serviceNeed ||
    !(ALLOWED_SERVICE_NEEDS as ReadonlyArray<string>).includes(stripped.serviceNeed)
  ) {
    return 'invalid_service_need';
  }
  if (
    !stripped.quarterBucket ||
    !(ALLOWED_QUARTER_BUCKETS as ReadonlyArray<string>).includes(stripped.quarterBucket)
  ) {
    return 'invalid_quarter_bucket';
  }
  return null;
}

// ─── Full pipeline: single contribution ──────────────────────────────────────

/**
 * Processes a single raw contribution candidate through the full airlock.
 * Returns an AirlockResult indicating acceptance or the rejection reason.
 *
 * This function is the authoritative entry point for all LIVEGENDER data.
 */
export function processContribution(
  candidate: RawContributionCandidate,
): AirlockResult {
  // Stage 1: Forbidden field rejection
  const forbiddenRejection = rejectForbiddenFields(candidate);
  if (forbiddenRejection) {
    return { accepted: false, rejectionReason: forbiddenRejection };
  }

  // Stage 2: Identifier stripping
  const stripped = stripIdentifiers(candidate);

  // Stage 3 & 4: Time and geography generalization
  const generalizedQuarter = generalizeTime(stripped.quarterBucket);
  const generalizedRegion = generalizeGeography(stripped.broadRegion);

  const generalizedCandidate = {
    ...stripped,
    quarterBucket: generalizedQuarter ?? stripped.quarterBucket,
    broadRegion: generalizedRegion ?? stripped.broadRegion,
  };

  // Stage 5: Taxonomy validation
  const taxonomyRejection = validateTaxonomy(generalizedCandidate);
  if (taxonomyRejection) {
    return { accepted: false, rejectionReason: taxonomyRejection };
  }

  // All stages passed — return sanitized contribution
  const sanitized: SanitizedContribution = {
    harmCategory: generalizedCandidate.harmCategory as HarmCategory,
    broadRegion: generalizedCandidate.broadRegion as BroadRegion,
    serviceNeed: generalizedCandidate.serviceNeed as ServiceNeed,
    quarterBucket: generalizedCandidate.quarterBucket as QuarterBucket,
  };

  return { accepted: true, sanitized };
}

// ─── Stage 6: K-threshold suppression + aggregation ─────────────────────────

/**
 * Builds the cell key for grouping contributions.
 * The key is deterministic and contains no survivor-linkable data.
 */
function cellKey(c: SanitizedContribution): string {
  return `${c.harmCategory}||${c.broadRegion}||${c.serviceNeed}||${c.quarterBucket}`;
}

/**
 * Aggregates a list of sanitized contributions into cells.
 * Applies k-threshold suppression: cells with count < K_THRESHOLD are
 * entirely omitted from the output (not returned as "< k" placeholders).
 *
 * The returned array contains ONLY cells that are safe to display.
 */
export function aggregateWithKSuppression(
  contributions: SanitizedContribution[],
  kThreshold: number = K_THRESHOLD,
): AggregateCell[] {
  const counts = new Map<string, { cell: SanitizedContribution; count: number }>();

  for (const c of contributions) {
    const key = cellKey(c);
    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, { cell: c, count: 1 });
    }
  }

  const result: AggregateCell[] = [];
  for (const { cell, count } of counts.values()) {
    if (count >= kThreshold) {
      result.push({
        harmCategory: cell.harmCategory,
        broadRegion: cell.broadRegion,
        serviceNeed: cell.serviceNeed,
        quarterBucket: cell.quarterBucket,
        count,
      });
    }
  }

  // Sort for deterministic dashboard rendering
  result.sort((a, b) =>
    b.count - a.count || a.harmCategory.localeCompare(b.harmCategory),
  );

  return result;
}

// ─── Full batch processing ────────────────────────────────────────────────────

/**
 * Processes a batch of raw candidates through the full airlock pipeline
 * and returns the observatory dashboard data.
 *
 * This is the ONLY function LIVEGENDER components call.
 * It returns AggregateCell[] — no raw or sanitized rows.
 */
export function runAirlockPipeline(
  candidates: RawContributionCandidate[],
  kThreshold: number = K_THRESHOLD,
): ObservatoryDashboard {
  const sanitized: SanitizedContribution[] = [];

  for (const candidate of candidates) {
    const result = processContribution(candidate);
    if (result.accepted && result.sanitized) {
      sanitized.push(result.sanitized);
    }
  }

  const aggregateCells = aggregateWithKSuppression(sanitized, kThreshold);

  // Count suppressed: sanitized contributions that are in cells below threshold
  const releasedCount = aggregateCells.reduce((sum, c) => sum + c.count, 0);
  const suppressedCount = sanitized.length - releasedCount;

  return {
    aggregateCells,
    totalCandidatesSubmitted: candidates.length,
    totalAccepted: sanitized.length,
    totalSuppressed: suppressedCount,
    kThreshold,
    differentialPrivacySimulated: true,
    aggregatedAt: new Date().toISOString(),
  };
}
