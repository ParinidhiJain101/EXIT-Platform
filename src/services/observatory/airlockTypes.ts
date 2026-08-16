/**
 * LIVEGENDER Airlock — Type Definitions
 *
 * These types define the shape of data as it moves through the
 * deterministic de-identification pipeline. They are kept separate
 * from the main types.ts to make the one-way flow explicit and
 * auditable.
 *
 * Flow:
 *   RawContributionCandidate
 *     → [forbidden-field rejection]
 *     → [identifier stripping]
 *     → [time generalization]
 *     → [geography generalization]
 *     → [taxonomy validation]
 *     → SanitizedContribution
 *     → [k-threshold suppression]
 *     → AggregateCell[]
 *
 * LIVEGENDER dashboard consumes ONLY AggregateCell[]. It never
 * receives SanitizedContribution or anything above it in this chain.
 */

// ─── Allowed taxonomy values ─────────────────────────────────────────────────

export const ALLOWED_HARM_CATEGORIES = [
  'Financial control',
  'Digital tracking',
  'Physical harm',
  'Psychological coercion',
  'Document withholding',
  'Housing insecurity',
] as const;

export const ALLOWED_BROAD_REGIONS = [
  'North India',
  'South India',
  'East India',
  'West India',
  'Central India',
  'Northeast India',
] as const;

export const ALLOWED_SERVICE_NEEDS = [
  'Legal aid',
  'Transition shelter',
  'Financial independence',
  'Digital safety support',
  'Medical care',
  'Counselling',
  'Child welfare',
  'Document assistance',
] as const;

export const ALLOWED_QUARTER_BUCKETS = [
  'Q1 2026',
  'Q2 2026',
  'Q3 2026',
  'Q4 2026',
] as const;

export type HarmCategory = typeof ALLOWED_HARM_CATEGORIES[number];
export type BroadRegion = typeof ALLOWED_BROAD_REGIONS[number];
export type ServiceNeed = typeof ALLOWED_SERVICE_NEEDS[number];
export type QuarterBucket = typeof ALLOWED_QUARTER_BUCKETS[number];

// ─── Raw candidate (may contain forbidden fields) ────────────────────────────

/**
 * A raw contribution candidate BEFORE the airlock processes it.
 * This type intentionally carries fields that will be rejected
 * or stripped during processing. It must NEVER reach LIVEGENDER.
 */
export interface RawContributionCandidate {
  // Forbidden fields — present here so we can test rejection
  survivorId?: string;
  planId?: string;
  vaultItemId?: string;
  name?: string;
  email?: string;
  phone?: string;
  exactAddress?: string;
  exactGPS?: { lat: number; lng: number };
  ipAddress?: string;
  deviceId?: string;
  narrativeText?: string;
  evidenceFileRef?: string;

  // Allowed-but-must-be-validated fields
  harmCategory?: string;
  broadRegion?: string;
  serviceNeed?: string;
  quarterBucket?: string;
}

// ─── Sanitized contribution (post-airlock, pre-aggregation) ─────────────────

/**
 * A contribution that has passed all airlock stages.
 * Contains ONLY the four generalized, de-identified fields.
 * Must never be exposed to the dashboard as an individual row.
 */
export interface SanitizedContribution {
  harmCategory: HarmCategory;
  broadRegion: BroadRegion;
  serviceNeed: ServiceNeed;
  quarterBucket: QuarterBucket;
}

// ─── Aggregate cell (dashboard-safe output) ──────────────────────────────────

/**
 * The ONLY output LIVEGENDER may display.
 * count is always >= K_THRESHOLD. Cells below threshold are suppressed.
 */
export interface AggregateCell {
  harmCategory: HarmCategory;
  broadRegion: BroadRegion;
  serviceNeed: ServiceNeed;
  quarterBucket: QuarterBucket;
  count: number;
}

// ─── Airlock processing result ───────────────────────────────────────────────

export type AirlockRejectionReason =
  | 'forbidden_field_present'
  | 'invalid_harm_category'
  | 'invalid_broad_region'
  | 'invalid_service_need'
  | 'invalid_quarter_bucket';

export interface AirlockResult {
  accepted: boolean;
  rejectionReason?: AirlockRejectionReason;
  sanitized?: SanitizedContribution;
}

// ─── Observatory dashboard data ──────────────────────────────────────────────

export interface ObservatoryDashboard {
  /** Cells that cleared k-threshold. Dashboard ONLY gets this. */
  aggregateCells: AggregateCell[];
  /** How many raw candidates were submitted in total (not a count of individuals) */
  totalCandidatesSubmitted: number;
  /** How many passed all airlock stages */
  totalAccepted: number;
  /** How many were suppressed for k < threshold */
  totalSuppressed: number;
  /** The k-threshold value in use */
  kThreshold: number;
  /** Whether differential privacy noise is simulated (vs. production-grade) */
  differentialPrivacySimulated: true;
  /** Timestamp of last aggregation */
  aggregatedAt: string;
}
