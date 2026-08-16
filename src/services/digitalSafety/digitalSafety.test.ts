import { describe, it, expect } from 'vitest';
import {
  DIGITAL_SAFETY_CATEGORIES,
  DIGITAL_SAFETY_QUESTIONS,
} from './digitalSafetyQuestions';
import { evaluateDigitalSafetyCheckup } from './digitalSafetyService';
import type { SelfCheckAnswer } from './digitalSafetyTypes';

describe('Digital Safety Checkup Engine', () => {
  it('covers exactly 7 distinct categories', () => {
    expect(DIGITAL_SAFETY_CATEGORIES).toHaveLength(7);
    expect(DIGITAL_SAFETY_CATEGORIES).toEqual([
      'device',
      'accounts',
      'location',
      'communication',
      'social',
      'cloud',
      'recovery',
    ]);
  });

  it('has questions assigned to all 7 categories', () => {
    for (const category of DIGITAL_SAFETY_CATEGORIES) {
      const catQuestions = DIGITAL_SAFETY_QUESTIONS.filter((q) => q.category === category);
      expect(catQuestions.length).toBeGreaterThan(0);
    }
  });

  it('returns notChecked status for all categories when no answers are provided', () => {
    const report = evaluateDigitalSafetyCheckup({});
    expect(report.totalQuestions).toBe(DIGITAL_SAFETY_QUESTIONS.length);
    expect(report.answeredQuestions).toBe(0);
    expect(report.statusSummary.notChecked).toBe(7);
    expect(report.flaggedItems).toHaveLength(0);

    for (const cat of DIGITAL_SAFETY_CATEGORIES) {
      expect(report.categoryEvaluations[cat].status).toBe('notChecked');
    }
  });

  it('returns looksConfigured when answers are safe', () => {
    const safeAnswers: Record<string, SelfCheckAnswer> = {
      device_shared: 'no',
      device_lock_notifications: 'no',
      device_unfamiliar_apps: 'no',
    };

    const report = evaluateDigitalSafetyCheckup(safeAnswers);
    expect(report.categoryEvaluations.device.status).toBe('looksConfigured');
    expect(report.categoryEvaluations.device.flaggedQuestions).toHaveLength(0);
    expect(report.categoryEvaluations.accounts.status).toBe('notChecked');
  });

  it('flags needsAttention when critical questions are triggered', () => {
    const flaggedAnswers: Record<string, SelfCheckAnswer> = {
      location_live_shared: 'yes',
    };

    const report = evaluateDigitalSafetyCheckup(flaggedAnswers);
    expect(report.categoryEvaluations.location.status).toBe('needsAttention');
    expect(report.categoryEvaluations.location.flaggedQuestions).toHaveLength(1);
    expect(report.flaggedItems).toHaveLength(1);
    expect(report.flaggedItems[0].question.id).toBe('location_live_shared');
    expect(report.flaggedItems[0].severity).toBe('needsAttention');
  });

  it('flags reviewRecommended when non-critical or unsure answers are given', () => {
    const reviewAnswers: Record<string, SelfCheckAnswer> = {
      device_lock_notifications: 'yes', // flaggedIf: yes, severity: reviewRecommended
    };

    const report = evaluateDigitalSafetyCheckup(reviewAnswers);
    expect(report.categoryEvaluations.device.status).toBe('reviewRecommended');
    expect(report.flaggedItems[0].severity).toBe('reviewRecommended');
  });

  it('produces deterministic output without side-effects', () => {
    const sampleAnswers: Record<string, SelfCheckAnswer> = {
      device_shared: 'yes',
      accounts_recovery_controlled: 'no',
      location_live_shared: 'no',
      recovery_email_control: 'no',
    };

    const report1 = evaluateDigitalSafetyCheckup(sampleAnswers);
    const report2 = evaluateDigitalSafetyCheckup(sampleAnswers);

    expect(report1).toEqual(report2);
    expect(report1.statusSummary.needsAttention).toBe(3); // device, accounts, recovery
    expect(report1.statusSummary.looksConfigured).toBe(1); // location
  });

  it('contains explainability metadata for every question', () => {
    for (const q of DIGITAL_SAFETY_QUESTIONS) {
      expect(q.titleKey).toBeTruthy();
      expect(q.descriptionKey).toBeTruthy();
      expect(q.whyMattersKey).toBeTruthy();
      expect(q.actionKey).toBeTruthy();
    }
  });
});
