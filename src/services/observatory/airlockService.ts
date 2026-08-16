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

export const K_THRESHOLD = 20;

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

export function generalizeTime(rawQuarter: string | undefined): QuarterBucket | null {
  if (!rawQuarter) return null;
  const trimmed = rawQuarter.trim();
  if ((ALLOWED_QUARTER_BUCKETS as ReadonlyArray<string>).includes(trimmed)) {
    return trimmed as QuarterBucket;
  }
  return null;
}

export function generalizeGeography(rawRegion: string | undefined): BroadRegion | null {
  if (!rawRegion) return null;
  const trimmed = rawRegion.trim();
  if ((ALLOWED_BROAD_REGIONS as ReadonlyArray<string>).includes(trimmed)) {
    return trimmed as BroadRegion;
  }
  return null;
}

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

export function processContribution(
  candidate: RawContributionCandidate,
): AirlockResult {
  const forbiddenRejection = rejectForbiddenFields(candidate);
  if (forbiddenRejection) {
    return { accepted: false, rejectionReason: forbiddenRejection };
  }

  const stripped = stripIdentifiers(candidate);
  const generalizedQuarter = generalizeTime(stripped.quarterBucket);
  const generalizedRegion = generalizeGeography(stripped.broadRegion);

  const generalizedCandidate = {
    ...stripped,
    quarterBucket: generalizedQuarter ?? stripped.quarterBucket,
    broadRegion: generalizedRegion ?? stripped.broadRegion,
  };

  const taxonomyRejection = validateTaxonomy(generalizedCandidate);
  if (taxonomyRejection) {
    return { accepted: false, rejectionReason: taxonomyRejection };
  }

  const sanitized: SanitizedContribution = {
    harmCategory: generalizedCandidate.harmCategory as HarmCategory,
    broadRegion: generalizedCandidate.broadRegion as BroadRegion,
    serviceNeed: generalizedCandidate.serviceNeed as ServiceNeed,
    quarterBucket: generalizedCandidate.quarterBucket as QuarterBucket,
  };

  return { accepted: true, sanitized };
}

function cellKey(c: SanitizedContribution): string {
  return `${c.harmCategory}||${c.broadRegion}||${c.serviceNeed}||${c.quarterBucket}`;
}

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

  result.sort((a, b) =>
    b.count - a.count || a.harmCategory.localeCompare(b.harmCategory),
  );

  return result;
}

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
