import type { RawContributionCandidate } from './airlockTypes';

const NORTH_FINANCIAL_LEGAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 28 },
  () => ({
    harmCategory: 'Financial control',
    broadRegion: 'North India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q3 2026',
  }),
);

const SOUTH_DIGITAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 24 },
  () => ({
    harmCategory: 'Digital tracking',
    broadRegion: 'South India',
    serviceNeed: 'Digital safety support',
    quarterBucket: 'Q3 2026',
  }),
);

const WEST_PSYCH_COUNSELLING_Q3: RawContributionCandidate[] = Array.from(
  { length: 31 },
  () => ({
    harmCategory: 'Psychological coercion',
    broadRegion: 'West India',
    serviceNeed: 'Counselling',
    quarterBucket: 'Q3 2026',
  }),
);

const EAST_PHYSICAL_MEDICAL_Q2: RawContributionCandidate[] = Array.from(
  { length: 22 },
  () => ({
    harmCategory: 'Physical harm',
    broadRegion: 'East India',
    serviceNeed: 'Medical care',
    quarterBucket: 'Q2 2026',
  }),
);

const CENTRAL_DOCS_Q3: RawContributionCandidate[] = Array.from(
  { length: 26 },
  () => ({
    harmCategory: 'Document withholding',
    broadRegion: 'Central India',
    serviceNeed: 'Document assistance',
    quarterBucket: 'Q3 2026',
  }),
);

const NORTHEAST_HOUSING_Q2: RawContributionCandidate[] = Array.from(
  { length: 20 },
  () => ({
    harmCategory: 'Housing insecurity',
    broadRegion: 'Northeast India',
    serviceNeed: 'Transition shelter',
    quarterBucket: 'Q2 2026',
  }),
);

const NORTH_DIGITAL_LEGAL_Q2: RawContributionCandidate[] = Array.from(
  { length: 25 },
  () => ({
    harmCategory: 'Digital tracking',
    broadRegion: 'North India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q2 2026',
  }),
);

const SOUTH_FINANCIAL_INDEPENDENCE_Q3: RawContributionCandidate[] = Array.from(
  { length: 21 },
  () => ({
    harmCategory: 'Financial control',
    broadRegion: 'South India',
    serviceNeed: 'Financial independence',
    quarterBucket: 'Q3 2026',
  }),
);

const WEST_PHYSICAL_COUNSELLING_Q2: RawContributionCandidate[] = Array.from(
  { length: 23 },
  () => ({
    harmCategory: 'Physical harm',
    broadRegion: 'West India',
    serviceNeed: 'Counselling',
    quarterBucket: 'Q2 2026',
  }),
);

const NORTH_PSYCH_LEGAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 27 },
  () => ({
    harmCategory: 'Psychological coercion',
    broadRegion: 'North India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q3 2026',
  }),
);

const EAST_DOCS_LEGAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 20 },
  () => ({
    harmCategory: 'Document withholding',
    broadRegion: 'East India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q3 2026',
  }),
);

const SOUTH_PHYSICAL_MEDICAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 22 },
  () => ({
    harmCategory: 'Physical harm',
    broadRegion: 'South India',
    serviceNeed: 'Medical care',
    quarterBucket: 'Q3 2026',
  }),
);

const SUPPRESSED_SMALL_CELL: RawContributionCandidate[] = Array.from(
  { length: 7 },
  () => ({
    harmCategory: 'Housing insecurity',
    broadRegion: 'Central India',
    serviceNeed: 'Transition shelter',
    quarterBucket: 'Q1 2026',
  }),
);

const SUPPRESSED_MEDIUM_CELL: RawContributionCandidate[] = Array.from(
  { length: 12 },
  () => ({
    harmCategory: 'Document withholding',
    broadRegion: 'Northeast India',
    serviceNeed: 'Document assistance',
    quarterBucket: 'Q2 2026',
  }),
);

export const REJECTED_HAS_SURVIVOR_ID: RawContributionCandidate = {
  survivorId: 'user-abc-123',
  harmCategory: 'Physical harm',
  broadRegion: 'North India',
  serviceNeed: 'Legal aid',
  quarterBucket: 'Q3 2026',
};

export const REJECTED_HAS_PLAN_ID: RawContributionCandidate = {
  planId: 'plan-xyz-456',
  harmCategory: 'Digital tracking',
  broadRegion: 'South India',
  serviceNeed: 'Digital safety support',
  quarterBucket: 'Q3 2026',
};

export const REJECTED_HAS_NARRATIVE: RawContributionCandidate = {
  narrativeText: 'My partner threatened me via messaging app',
  harmCategory: 'Psychological coercion',
  broadRegion: 'West India',
  serviceNeed: 'Counselling',
  quarterBucket: 'Q3 2026',
};

export const REJECTED_HAS_GPS: RawContributionCandidate = {
  exactGPS: { lat: 28.6139, lng: 77.209 },
  harmCategory: 'Housing insecurity',
  broadRegion: 'North India',
  serviceNeed: 'Transition shelter',
  quarterBucket: 'Q3 2026',
};

export const REJECTED_HAS_VAULT_REF: RawContributionCandidate = {
  vaultItemId: 'capsule_abc123',
  harmCategory: 'Digital tracking',
  broadRegion: 'East India',
  serviceNeed: 'Digital safety support',
  quarterBucket: 'Q2 2026',
};

export const REJECTED_INVALID_TAXONOMY: RawContributionCandidate = {
  harmCategory: 'Unknown harm type',
  broadRegion: 'North India',
  serviceNeed: 'Legal aid',
  quarterBucket: 'Q3 2026',
};

export const SYNTHETIC_CONTRIBUTION_SEED: RawContributionCandidate[] = [
  ...NORTH_FINANCIAL_LEGAL_Q3,
  ...SOUTH_DIGITAL_Q3,
  ...WEST_PSYCH_COUNSELLING_Q3,
  ...EAST_PHYSICAL_MEDICAL_Q2,
  ...CENTRAL_DOCS_Q3,
  ...NORTHEAST_HOUSING_Q2,
  ...NORTH_DIGITAL_LEGAL_Q2,
  ...SOUTH_FINANCIAL_INDEPENDENCE_Q3,
  ...WEST_PHYSICAL_COUNSELLING_Q2,
  ...NORTH_PSYCH_LEGAL_Q3,
  ...EAST_DOCS_LEGAL_Q3,
  ...SOUTH_PHYSICAL_MEDICAL_Q3,
  ...SUPPRESSED_SMALL_CELL,
  ...SUPPRESSED_MEDIUM_CELL,
  REJECTED_HAS_SURVIVOR_ID,
  REJECTED_HAS_PLAN_ID,
  REJECTED_HAS_NARRATIVE,
  REJECTED_HAS_GPS,
  REJECTED_HAS_VAULT_REF,
  REJECTED_INVALID_TAXONOMY,
];
