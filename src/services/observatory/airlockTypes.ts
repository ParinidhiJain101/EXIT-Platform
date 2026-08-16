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

export interface RawContributionCandidate {
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

  harmCategory?: string;
  broadRegion?: string;
  serviceNeed?: string;
  quarterBucket?: string;
}

export interface SanitizedContribution {
  harmCategory: HarmCategory;
  broadRegion: BroadRegion;
  serviceNeed: ServiceNeed;
  quarterBucket: QuarterBucket;
}

export interface AggregateCell {
  harmCategory: HarmCategory;
  broadRegion: BroadRegion;
  serviceNeed: ServiceNeed;
  quarterBucket: QuarterBucket;
  count: number;
}

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

export interface ObservatoryDashboard {
  aggregateCells: AggregateCell[];
  totalCandidatesSubmitted: number;
  totalAccepted: number;
  totalSuppressed: number;
  kThreshold: number;
  differentialPrivacySimulated: true;
  aggregatedAt: string;
}
