/**
 * Synthetic contribution data for LIVEGENDER MVP demo.
 *
 * This file contains ONLY synthetic, fictional data generated for
 * hackathon evaluation. No real survivor data, no real locations,
 * no real contact information.
 *
 * The data is structured to:
 * 1. Ensure multiple cells clear the k=20 threshold (released to dashboard).
 * 2. Include a few cells below threshold (suppressed — demonstrates the rule).
 * 3. Include intentionally malformed/forbidden-field candidates (rejected).
 *
 * The synthetic dataset represents a plausible distribution across harm
 * categories, broad regions, service needs, and quarterly buckets based
 * on the published WHO and NNEDV research referenced in the project brief.
 */

import type { RawContributionCandidate } from './airlockTypes';

// ─── VALID candidates (will clear k=20 after aggregation) ────────────────────

/** 28 North India / Financial control / Legal aid / Q3 2026 contributions */
const NORTH_FINANCIAL_LEGAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 28 },
  () => ({
    harmCategory: 'Financial control',
    broadRegion: 'North India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q3 2026',
  }),
);

/** 24 South India / Digital tracking / Digital safety support / Q3 2026 */
const SOUTH_DIGITAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 24 },
  () => ({
    harmCategory: 'Digital tracking',
    broadRegion: 'South India',
    serviceNeed: 'Digital safety support',
    quarterBucket: 'Q3 2026',
  }),
);

/** 31 West India / Psychological coercion / Counselling / Q3 2026 */
const WEST_PSYCH_COUNSELLING_Q3: RawContributionCandidate[] = Array.from(
  { length: 31 },
  () => ({
    harmCategory: 'Psychological coercion',
    broadRegion: 'West India',
    serviceNeed: 'Counselling',
    quarterBucket: 'Q3 2026',
  }),
);

/** 22 East India / Physical harm / Medical care / Q2 2026 */
const EAST_PHYSICAL_MEDICAL_Q2: RawContributionCandidate[] = Array.from(
  { length: 22 },
  () => ({
    harmCategory: 'Physical harm',
    broadRegion: 'East India',
    serviceNeed: 'Medical care',
    quarterBucket: 'Q2 2026',
  }),
);

/** 26 Central India / Document withholding / Document assistance / Q3 2026 */
const CENTRAL_DOCS_Q3: RawContributionCandidate[] = Array.from(
  { length: 26 },
  () => ({
    harmCategory: 'Document withholding',
    broadRegion: 'Central India',
    serviceNeed: 'Document assistance',
    quarterBucket: 'Q3 2026',
  }),
);

/** 20 Northeast India / Housing insecurity / Transition shelter / Q2 2026 */
const NORTHEAST_HOUSING_Q2: RawContributionCandidate[] = Array.from(
  { length: 20 },
  () => ({
    harmCategory: 'Housing insecurity',
    broadRegion: 'Northeast India',
    serviceNeed: 'Transition shelter',
    quarterBucket: 'Q2 2026',
  }),
);

/** 25 North India / Digital tracking / Legal aid / Q2 2026 */
const NORTH_DIGITAL_LEGAL_Q2: RawContributionCandidate[] = Array.from(
  { length: 25 },
  () => ({
    harmCategory: 'Digital tracking',
    broadRegion: 'North India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q2 2026',
  }),
);

/** 21 South India / Financial control / Financial independence / Q3 2026 */
const SOUTH_FINANCIAL_INDEPENDENCE_Q3: RawContributionCandidate[] = Array.from(
  { length: 21 },
  () => ({
    harmCategory: 'Financial control',
    broadRegion: 'South India',
    serviceNeed: 'Financial independence',
    quarterBucket: 'Q3 2026',
  }),
);

/** 23 West India / Physical harm / Counselling / Q2 2026 */
const WEST_PHYSICAL_COUNSELLING_Q2: RawContributionCandidate[] = Array.from(
  { length: 23 },
  () => ({
    harmCategory: 'Physical harm',
    broadRegion: 'West India',
    serviceNeed: 'Counselling',
    quarterBucket: 'Q2 2026',
  }),
);

/** 27 North India / Psychological coercion / Legal aid / Q3 2026 */
const NORTH_PSYCH_LEGAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 27 },
  () => ({
    harmCategory: 'Psychological coercion',
    broadRegion: 'North India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q3 2026',
  }),
);

/** 20 East India / Document withholding / Legal aid / Q3 2026 */
const EAST_DOCS_LEGAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 20 },
  () => ({
    harmCategory: 'Document withholding',
    broadRegion: 'East India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q3 2026',
  }),
);

/** 22 South India / Physical harm / Medical care / Q3 2026 */
const SOUTH_PHYSICAL_MEDICAL_Q3: RawContributionCandidate[] = Array.from(
  { length: 22 },
  () => ({
    harmCategory: 'Physical harm',
    broadRegion: 'South India',
    serviceNeed: 'Medical care',
    quarterBucket: 'Q3 2026',
  }),
);

// ─── SUPPRESSED candidates (cells with count < 20) ───────────────────────────
// These demonstrate k-threshold suppression — they exist but won't reach the dashboard.

/** Only 7 contributions — will be SUPPRESSED (k < 20) */
const SUPPRESSED_SMALL_CELL: RawContributionCandidate[] = Array.from(
  { length: 7 },
  () => ({
    harmCategory: 'Housing insecurity',
    broadRegion: 'Central India',
    serviceNeed: 'Transition shelter',
    quarterBucket: 'Q1 2026',
  }),
);

/** Only 12 contributions — will be SUPPRESSED (k < 20) */
const SUPPRESSED_MEDIUM_CELL: RawContributionCandidate[] = Array.from(
  { length: 12 },
  () => ({
    harmCategory: 'Document withholding',
    broadRegion: 'Northeast India',
    serviceNeed: 'Document assistance',
    quarterBucket: 'Q2 2026',
  }),
);

// ─── REJECTED candidates (contain forbidden fields) ──────────────────────────
// These demonstrate forbidden-field rejection — they will be discarded by the airlock.

/** Has survivorId — will be REJECTED */
export const REJECTED_HAS_SURVIVOR_ID: RawContributionCandidate = {
  survivorId: 'user-abc-123',
  harmCategory: 'Physical harm',
  broadRegion: 'North India',
  serviceNeed: 'Legal aid',
  quarterBucket: 'Q3 2026',
};

/** Has planId — will be REJECTED */
export const REJECTED_HAS_PLAN_ID: RawContributionCandidate = {
  planId: 'plan-xyz-456',
  harmCategory: 'Digital tracking',
  broadRegion: 'South India',
  serviceNeed: 'Digital safety support',
  quarterBucket: 'Q3 2026',
};

/** Has raw narrative text — will be REJECTED */
export const REJECTED_HAS_NARRATIVE: RawContributionCandidate = {
  narrativeText: 'My husband threatened me via WhatsApp',
  harmCategory: 'Psychological coercion',
  broadRegion: 'West India',
  serviceNeed: 'Counselling',
  quarterBucket: 'Q3 2026',
};

/** Has exact GPS — will be REJECTED */
export const REJECTED_HAS_GPS: RawContributionCandidate = {
  exactGPS: { lat: 28.6139, lng: 77.209 },
  harmCategory: 'Housing insecurity',
  broadRegion: 'North India',
  serviceNeed: 'Transition shelter',
  quarterBucket: 'Q3 2026',
};

/** Has vault item reference — will be REJECTED */
export const REJECTED_HAS_VAULT_REF: RawContributionCandidate = {
  vaultItemId: 'capsule_abc123',
  harmCategory: 'Digital tracking',
  broadRegion: 'East India',
  serviceNeed: 'Digital safety support',
  quarterBucket: 'Q2 2026',
};

/** Invalid taxonomy — will be REJECTED */
export const REJECTED_INVALID_TAXONOMY: RawContributionCandidate = {
  harmCategory: 'Unknown harm type',
  broadRegion: 'North India',
  serviceNeed: 'Legal aid',
  quarterBucket: 'Q3 2026',
};

// ─── Full synthetic dataset ───────────────────────────────────────────────────

/**
 * The complete synthetic seed dataset.
 * Mix of: valid (will aggregate), suppressed (< k), and rejected (forbidden fields).
 */
export const SYNTHETIC_CONTRIBUTION_SEED: RawContributionCandidate[] = [
  // Valid — will aggregate and release
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
  // Below threshold — will be suppressed
  ...SUPPRESSED_SMALL_CELL,
  ...SUPPRESSED_MEDIUM_CELL,
  // Forbidden fields — will be rejected
  REJECTED_HAS_SURVIVOR_ID,
  REJECTED_HAS_PLAN_ID,
  REJECTED_HAS_NARRATIVE,
  REJECTED_HAS_GPS,
  REJECTED_HAS_VAULT_REF,
  REJECTED_INVALID_TAXONOMY,
];
