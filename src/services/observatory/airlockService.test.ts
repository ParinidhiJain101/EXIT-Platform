/**
 * Airlock Service Tests
 *
 * Tests covering all airlock pipeline stages:
 * - Forbidden fields rejected
 * - Identifiers removed (only allowed fields pass through)
 * - Time and geography generalization
 * - Invalid taxonomy rejected
 * - k < 20 suppressed
 * - k >= 20 aggregated and released
 * - Raw plan/evidence cannot reach LIVEGENDER
 *
 * These tests use Vitest. Run with: npm run test
 */

import { describe, it, expect } from 'vitest';
import {
  rejectForbiddenFields,
  stripIdentifiers,
  generalizeTime,
  generalizeGeography,
  validateTaxonomy,
  processContribution,
  aggregateWithKSuppression,
  runAirlockPipeline,
  K_THRESHOLD,
} from './airlockService';
import type { RawContributionCandidate, SanitizedContribution } from './airlockTypes';
import {
  REJECTED_HAS_SURVIVOR_ID,
  REJECTED_HAS_PLAN_ID,
  REJECTED_HAS_NARRATIVE,
  REJECTED_HAS_GPS,
  REJECTED_HAS_VAULT_REF,
  REJECTED_INVALID_TAXONOMY,
  SYNTHETIC_CONTRIBUTION_SEED,
} from './syntheticData';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeValidCandidate(
  overrides: Partial<RawContributionCandidate> = {},
): RawContributionCandidate {
  return {
    harmCategory: 'Financial control',
    broadRegion: 'North India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q3 2026',
    ...overrides,
  };
}

function makeValidSanitized(
  overrides: Partial<SanitizedContribution> = {},
): SanitizedContribution {
  return {
    harmCategory: 'Financial control',
    broadRegion: 'North India',
    serviceNeed: 'Legal aid',
    quarterBucket: 'Q3 2026',
    ...overrides,
  };
}

// ─── Stage 1: Forbidden field rejection ──────────────────────────────────────

describe('rejectForbiddenFields', () => {
  it('accepts a candidate with no forbidden fields', () => {
    expect(rejectForbiddenFields(makeValidCandidate())).toBeNull();
  });

  it('rejects a candidate with survivorId', () => {
    expect(rejectForbiddenFields(REJECTED_HAS_SURVIVOR_ID)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with planId', () => {
    expect(rejectForbiddenFields(REJECTED_HAS_PLAN_ID)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with vaultItemId (raw AegisVault reference)', () => {
    expect(rejectForbiddenFields(REJECTED_HAS_VAULT_REF)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with narrativeText (raw EXIT Plan content)', () => {
    expect(rejectForbiddenFields(REJECTED_HAS_NARRATIVE)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with exactGPS', () => {
    expect(rejectForbiddenFields(REJECTED_HAS_GPS)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with name', () => {
    const c: RawContributionCandidate = { ...makeValidCandidate(), name: 'Maya' };
    expect(rejectForbiddenFields(c)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with email', () => {
    const c: RawContributionCandidate = { ...makeValidCandidate(), email: 'user@example.com' };
    expect(rejectForbiddenFields(c)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with phone', () => {
    const c: RawContributionCandidate = { ...makeValidCandidate(), phone: '+91 98765 43210' };
    expect(rejectForbiddenFields(c)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with exactAddress', () => {
    const c: RawContributionCandidate = { ...makeValidCandidate(), exactAddress: '123 Main St' };
    expect(rejectForbiddenFields(c)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with ipAddress', () => {
    const c: RawContributionCandidate = { ...makeValidCandidate(), ipAddress: '192.168.1.1' };
    expect(rejectForbiddenFields(c)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with deviceId', () => {
    const c: RawContributionCandidate = { ...makeValidCandidate(), deviceId: 'device-xyz' };
    expect(rejectForbiddenFields(c)).toBe('forbidden_field_present');
  });

  it('rejects a candidate with evidenceFileRef', () => {
    const c: RawContributionCandidate = {
      ...makeValidCandidate(),
      evidenceFileRef: 'evidence.png',
    };
    expect(rejectForbiddenFields(c)).toBe('forbidden_field_present');
  });
});

// ─── Stage 2: Identifier stripping ───────────────────────────────────────────

describe('stripIdentifiers', () => {
  it('returns only the four allowed fields', () => {
    const candidate = makeValidCandidate({ name: 'Maya', email: 'x@y.com' });
    const result = stripIdentifiers(candidate);
    expect(result).toEqual({
      harmCategory: 'Financial control',
      broadRegion: 'North India',
      serviceNeed: 'Legal aid',
      quarterBucket: 'Q3 2026',
    });
    expect('name' in result).toBe(false);
    expect('email' in result).toBe(false);
    expect('survivorId' in result).toBe(false);
  });

  it('does not carry forward planId', () => {
    const candidate = makeValidCandidate({ planId: 'plan-123' });
    const result = stripIdentifiers(candidate);
    expect('planId' in result).toBe(false);
  });

  it('does not carry forward vaultItemId', () => {
    const candidate = makeValidCandidate({ vaultItemId: 'capsule-abc' });
    const result = stripIdentifiers(candidate);
    expect('vaultItemId' in result).toBe(false);
  });

  it('does not carry forward narrativeText or evidenceFileRef', () => {
    const candidate = makeValidCandidate({
      narrativeText: 'sensitive content',
      evidenceFileRef: 'screenshot.png',
    });
    const result = stripIdentifiers(candidate);
    expect('narrativeText' in result).toBe(false);
    expect('evidenceFileRef' in result).toBe(false);
  });
});

// ─── Stage 3: Time generalization ────────────────────────────────────────────

describe('generalizeTime', () => {
  it('accepts canonical quarter strings', () => {
    expect(generalizeTime('Q3 2026')).toBe('Q3 2026');
    expect(generalizeTime('Q1 2026')).toBe('Q1 2026');
    expect(generalizeTime('Q4 2026')).toBe('Q4 2026');
  });

  it('returns null for undefined input', () => {
    expect(generalizeTime(undefined)).toBeNull();
  });

  it('returns null for sub-monthly granularity (exact date)', () => {
    expect(generalizeTime('2026-08-15')).toBeNull();
  });

  it('returns null for free-text date strings', () => {
    expect(generalizeTime('August 2026')).toBeNull();
    expect(generalizeTime('last month')).toBeNull();
  });

  it('handles whitespace trimming', () => {
    expect(generalizeTime('  Q3 2026  ')).toBe('Q3 2026');
  });
});

// ─── Stage 4: Geography generalization ───────────────────────────────────────

describe('generalizeGeography', () => {
  it('accepts canonical broad region strings', () => {
    expect(generalizeGeography('North India')).toBe('North India');
    expect(generalizeGeography('South India')).toBe('South India');
    expect(generalizeGeography('Northeast India')).toBe('Northeast India');
  });

  it('returns null for undefined input', () => {
    expect(generalizeGeography(undefined)).toBeNull();
  });

  it('returns null for specific city names', () => {
    expect(generalizeGeography('Delhi')).toBeNull();
    expect(generalizeGeography('Mumbai')).toBeNull();
    expect(generalizeGeography('Kolkata West Bengal')).toBeNull();
  });

  it('returns null for GPS or address strings', () => {
    expect(generalizeGeography('28.6139, 77.209')).toBeNull();
    expect(generalizeGeography('123 Main Road, Sector 7')).toBeNull();
  });

  it('handles whitespace trimming', () => {
    expect(generalizeGeography('  South India  ')).toBe('South India');
  });
});

// ─── Stage 5: Taxonomy validation ────────────────────────────────────────────

describe('validateTaxonomy', () => {
  it('accepts a fully valid taxonomy', () => {
    expect(
      validateTaxonomy({
        harmCategory: 'Digital tracking',
        broadRegion: 'South India',
        serviceNeed: 'Digital safety support',
        quarterBucket: 'Q3 2026',
      }),
    ).toBeNull();
  });

  it('rejects an invalid harm category', () => {
    expect(
      validateTaxonomy({
        harmCategory: 'Unknown harm type',
        broadRegion: 'North India',
        serviceNeed: 'Legal aid',
        quarterBucket: 'Q3 2026',
      }),
    ).toBe('invalid_harm_category');
  });

  it('rejects an invalid broad region', () => {
    expect(
      validateTaxonomy({
        harmCategory: 'Financial control',
        broadRegion: 'Mumbai',
        serviceNeed: 'Legal aid',
        quarterBucket: 'Q3 2026',
      }),
    ).toBe('invalid_broad_region');
  });

  it('rejects an invalid service need', () => {
    expect(
      validateTaxonomy({
        harmCategory: 'Physical harm',
        broadRegion: 'West India',
        serviceNeed: 'Unknown service',
        quarterBucket: 'Q2 2026',
      }),
    ).toBe('invalid_service_need');
  });

  it('rejects an invalid quarter bucket', () => {
    expect(
      validateTaxonomy({
        harmCategory: 'Physical harm',
        broadRegion: 'East India',
        serviceNeed: 'Medical care',
        quarterBucket: 'March 2026',
      }),
    ).toBe('invalid_quarter_bucket');
  });

  it('rejects REJECTED_INVALID_TAXONOMY fixture', () => {
    const stripped = {
      harmCategory: REJECTED_INVALID_TAXONOMY.harmCategory,
      broadRegion: REJECTED_INVALID_TAXONOMY.broadRegion,
      serviceNeed: REJECTED_INVALID_TAXONOMY.serviceNeed,
      quarterBucket: REJECTED_INVALID_TAXONOMY.quarterBucket,
    };
    expect(validateTaxonomy(stripped)).toBe('invalid_harm_category');
  });
});

// ─── Full pipeline: processContribution ──────────────────────────────────────

describe('processContribution', () => {
  it('accepts a fully valid candidate', () => {
    const result = processContribution(makeValidCandidate());
    expect(result.accepted).toBe(true);
    expect(result.sanitized).toBeDefined();
    expect(result.sanitized?.harmCategory).toBe('Financial control');
    expect(result.rejectionReason).toBeUndefined();
  });

  it('rejects at Stage 1 when survivorId is present', () => {
    const result = processContribution(REJECTED_HAS_SURVIVOR_ID);
    expect(result.accepted).toBe(false);
    expect(result.rejectionReason).toBe('forbidden_field_present');
    expect(result.sanitized).toBeUndefined();
  });

  it('rejects at Stage 1 when planId is present (raw EXIT Plan reference)', () => {
    const result = processContribution(REJECTED_HAS_PLAN_ID);
    expect(result.accepted).toBe(false);
    expect(result.rejectionReason).toBe('forbidden_field_present');
    expect(result.sanitized).toBeUndefined();
  });

  it('rejects at Stage 1 when vaultItemId is present (raw AegisVault reference)', () => {
    const result = processContribution(REJECTED_HAS_VAULT_REF);
    expect(result.accepted).toBe(false);
    expect(result.rejectionReason).toBe('forbidden_field_present');
    expect(result.sanitized).toBeUndefined();
  });

  it('rejects at Stage 1 when narrativeText is present', () => {
    const result = processContribution(REJECTED_HAS_NARRATIVE);
    expect(result.accepted).toBe(false);
    expect(result.rejectionReason).toBe('forbidden_field_present');
    expect(result.sanitized).toBeUndefined();
  });

  it('rejects at Stage 1 when exactGPS is present', () => {
    const result = processContribution(REJECTED_HAS_GPS);
    expect(result.accepted).toBe(false);
    expect(result.rejectionReason).toBe('forbidden_field_present');
    expect(result.sanitized).toBeUndefined();
  });

  it('rejects at Stage 5 when taxonomy is invalid', () => {
    const result = processContribution(REJECTED_INVALID_TAXONOMY);
    expect(result.accepted).toBe(false);
    expect(result.rejectionReason).toBe('invalid_harm_category');
    expect(result.sanitized).toBeUndefined();
  });

  it('sanitized output contains no forbidden fields', () => {
    const result = processContribution(makeValidCandidate());
    expect(result.accepted).toBe(true);
    if (result.sanitized) {
      const keys = Object.keys(result.sanitized);
      expect(keys).toEqual(
        expect.arrayContaining(['harmCategory', 'broadRegion', 'serviceNeed', 'quarterBucket']),
      );
      expect(keys.length).toBe(4);
      expect('survivorId' in result.sanitized).toBe(false);
      expect('planId' in result.sanitized).toBe(false);
      expect('vaultItemId' in result.sanitized).toBe(false);
      expect('name' in result.sanitized).toBe(false);
      expect('narrativeText' in result.sanitized).toBe(false);
    }
  });
});

// ─── K-threshold suppression ─────────────────────────────────────────────────

describe('aggregateWithKSuppression', () => {
  it('suppresses cells with count < k', () => {
    const contributions: SanitizedContribution[] = Array.from(
      { length: 19 },
      () => makeValidSanitized(),
    );
    const result = aggregateWithKSuppression(contributions, 20);
    expect(result).toHaveLength(0); // All suppressed (19 < 20)
  });

  it('releases cells with count exactly equal to k', () => {
    const contributions: SanitizedContribution[] = Array.from(
      { length: 20 },
      () => makeValidSanitized(),
    );
    const result = aggregateWithKSuppression(contributions, 20);
    expect(result).toHaveLength(1);
    expect(result[0].count).toBe(20);
  });

  it('releases cells with count > k', () => {
    const contributions: SanitizedContribution[] = Array.from(
      { length: 25 },
      () => makeValidSanitized(),
    );
    const result = aggregateWithKSuppression(contributions, 20);
    expect(result).toHaveLength(1);
    expect(result[0].count).toBe(25);
  });

  it('suppresses some cells and releases others independently', () => {
    const c1: SanitizedContribution[] = Array.from({ length: 22 }, () =>
      makeValidSanitized({ harmCategory: 'Financial control', broadRegion: 'North India' }),
    );
    const c2: SanitizedContribution[] = Array.from({ length: 8 }, () =>
      makeValidSanitized({ harmCategory: 'Physical harm', broadRegion: 'East India' }),
    );
    const result = aggregateWithKSuppression([...c1, ...c2], 20);
    expect(result).toHaveLength(1); // Only c1 cleared the threshold
    expect(result[0].harmCategory).toBe('Financial control');
    expect(result[0].count).toBe(22);
  });

  it('released cells never contain individual-level data', () => {
    const contributions: SanitizedContribution[] = Array.from(
      { length: 20 },
      () => makeValidSanitized(),
    );
    const result = aggregateWithKSuppression(contributions, 20);
    result.forEach((cell) => {
      // Only aggregate fields allowed
      const allowedKeys = [
        'harmCategory',
        'broadRegion',
        'serviceNeed',
        'quarterBucket',
        'count',
      ];
      Object.keys(cell).forEach((k) => expect(allowedKeys).toContain(k));
    });
  });

  it('uses K_THRESHOLD as default when no threshold provided', () => {
    expect(K_THRESHOLD).toBe(20);
    const contributions: SanitizedContribution[] = Array.from(
      { length: K_THRESHOLD - 1 },
      () => makeValidSanitized(),
    );
    const result = aggregateWithKSuppression(contributions);
    expect(result).toHaveLength(0);
  });
});

// ─── Full batch pipeline ──────────────────────────────────────────────────────

describe('runAirlockPipeline', () => {
  it('produces a valid ObservatoryDashboard from the synthetic seed', () => {
    const dashboard = runAirlockPipeline(SYNTHETIC_CONTRIBUTION_SEED);
    // Should have released cells
    expect(dashboard.aggregateCells.length).toBeGreaterThan(0);
    // All released cells must be >= k
    dashboard.aggregateCells.forEach((cell) => {
      expect(cell.count).toBeGreaterThanOrEqual(dashboard.kThreshold);
    });
    // Diff privacy must be labeled as simulated
    expect(dashboard.differentialPrivacySimulated).toBe(true);
  });

  it('suppresses the small cells from the seed', () => {
    const dashboard = runAirlockPipeline(SYNTHETIC_CONTRIBUTION_SEED);
    // Suppressed count should be > 0 (7 + 12 contributions are in sub-threshold cells)
    expect(dashboard.totalSuppressed).toBeGreaterThan(0);
  });

  it('totalCandidatesSubmitted includes rejected candidates', () => {
    const dashboard = runAirlockPipeline(SYNTHETIC_CONTRIBUTION_SEED);
    expect(dashboard.totalCandidatesSubmitted).toBe(SYNTHETIC_CONTRIBUTION_SEED.length);
    // Rejected ones should not be in totalAccepted
    expect(dashboard.totalAccepted).toBeLessThan(dashboard.totalCandidatesSubmitted);
  });

  it('dashboard cells contain no survivorId, planId, or vaultItemId', () => {
    const dashboard = runAirlockPipeline(SYNTHETIC_CONTRIBUTION_SEED);
    dashboard.aggregateCells.forEach((cell) => {
      expect('survivorId' in cell).toBe(false);
      expect('planId' in cell).toBe(false);
      expect('vaultItemId' in cell).toBe(false);
      expect('name' in cell).toBe(false);
      expect('email' in cell).toBe(false);
      expect('phone' in cell).toBe(false);
      expect('exactAddress' in cell).toBe(false);
      expect('exactGPS' in cell).toBe(false);
      expect('narrativeText' in cell).toBe(false);
      expect('evidenceFileRef' in cell).toBe(false);
    });
  });

  it('empty input produces empty dashboard', () => {
    const dashboard = runAirlockPipeline([]);
    expect(dashboard.aggregateCells).toHaveLength(0);
    expect(dashboard.totalAccepted).toBe(0);
    expect(dashboard.totalCandidatesSubmitted).toBe(0);
  });

  it('batch of only forbidden-field candidates produces no released cells', () => {
    const dashboard = runAirlockPipeline([
      REJECTED_HAS_SURVIVOR_ID,
      REJECTED_HAS_PLAN_ID,
      REJECTED_HAS_NARRATIVE,
      REJECTED_HAS_GPS,
      REJECTED_HAS_VAULT_REF,
      REJECTED_INVALID_TAXONOMY,
    ]);
    expect(dashboard.aggregateCells).toHaveLength(0);
    expect(dashboard.totalAccepted).toBe(0);
  });
});
