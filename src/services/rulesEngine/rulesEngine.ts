import type {
  PlanNeeds,
  DeviceSafetyAnswers,
  ReadinessItem,
  PlanAction,
} from '../../api/types';

export const ALL_NEED_CATEGORIES: (keyof PlanNeeds)[] = [
  'communicationSafety',
  'documents',
  'money',
  'housing',
  'children',
  'health',
  'legal',
  'digitalSafety',
  'work',
];

/**
 * Evaluates selected needs and device safety answers into deterministic categorical readiness states.
 * Guarantees: Never outputs numeric safety/danger scores.
 */
export function evaluateReadiness(
  needs: PlanNeeds,
  deviceSafety: DeviceSafetyAnswers,
): ReadinessItem[] {
  return ALL_NEED_CATEGORIES.map((category) => {
    const isSelected = !!needs[category];

    if (!isSelected) {
      return {
        category,
        status: 'Not yet planned',
        titleKey: `onboarding.needsStep.categories.${category}.title`,
        reasonKey: `readiness.reasons.notSelected`,
        rationaleKey: `readiness.rationales.notSelected`,
      };
    }

    switch (category) {
      case 'communicationSafety': {
        const isMonitored =
          deviceSafety.deviceShared === true ||
          deviceSafety.notificationsSafe === false;
        return {
          category,
          status: isMonitored ? 'Needs attention' : 'Partially prepared',
          titleKey: `onboarding.needsStep.categories.communicationSafety.title`,
          reasonKey: isMonitored
            ? 'readiness.reasons.commMonitored'
            : 'readiness.reasons.commPendingSafeChannel',
          rationaleKey: isMonitored
            ? 'readiness.rationales.commMonitored'
            : 'readiness.rationales.commPendingSafeChannel',
        };
      }

      case 'digitalSafety': {
        const isShared = deviceSafety.accountsOrLocationShared === true;
        return {
          category,
          status: isShared ? 'Needs attention' : 'Partially prepared',
          titleKey: `onboarding.needsStep.categories.digitalSafety.title`,
          reasonKey: isShared
            ? 'readiness.reasons.digitalShared'
            : 'readiness.reasons.digitalAuditPending',
          rationaleKey: isShared
            ? 'readiness.rationales.digitalShared'
            : 'readiness.rationales.digitalAuditPending',
        };
      }

      case 'documents':
        return {
          category,
          status: 'Needs attention',
          titleKey: `onboarding.needsStep.categories.documents.title`,
          reasonKey: 'readiness.reasons.docsChecklistPending',
          rationaleKey: 'readiness.rationales.docsChecklistPending',
        };

      case 'money':
        return {
          category,
          status: 'Needs attention',
          titleKey: `onboarding.needsStep.categories.money.title`,
          reasonKey: 'readiness.reasons.moneyFundPending',
          rationaleKey: 'readiness.rationales.moneyFundPending',
        };

      case 'housing':
        return {
          category,
          status: 'Needs attention',
          titleKey: `onboarding.needsStep.categories.housing.title`,
          reasonKey: 'readiness.reasons.housingTemporaryPending',
          rationaleKey: 'readiness.rationales.housingTemporaryPending',
        };

      case 'children':
        return {
          category,
          status: 'Needs attention',
          titleKey: `onboarding.needsStep.categories.children.title`,
          reasonKey: 'readiness.reasons.childrenCarePending',
          rationaleKey: 'readiness.rationales.childrenCarePending',
        };

      case 'health':
        return {
          category,
          status: 'Partially prepared',
          titleKey: `onboarding.needsStep.categories.health.title`,
          reasonKey: 'readiness.reasons.healthPathwayPending',
          rationaleKey: 'readiness.rationales.healthPathwayPending',
        };

      case 'legal':
        return {
          category,
          status: 'Partially prepared',
          titleKey: `onboarding.needsStep.categories.legal.title`,
          reasonKey: 'readiness.reasons.legalAidPending',
          rationaleKey: 'readiness.rationales.legalAidPending',
        };

      case 'work':
        return {
          category,
          status: 'Partially prepared',
          titleKey: `onboarding.needsStep.categories.work.title`,
          reasonKey: 'readiness.reasons.workDiscretionPending',
          rationaleKey: 'readiness.rationales.workDiscretionPending',
        };
    }
  });
}

/**
 * Deterministically generates prioritized preparation actions across planning horizons.
 * Guarantees: Uses priority bands ('Essential' | 'High' | 'Helpful' | 'Optional') instead of numeric scores.
 */
export function evaluateActionPlan(
  needs: PlanNeeds,
  deviceSafety: DeviceSafetyAnswers,
): PlanAction[] {
  const actions: PlanAction[] = [];

  // 1. Communication Safety Actions
  if (
    needs.communicationSafety ||
    deviceSafety.deviceShared === true ||
    deviceSafety.notificationsSafe === false
  ) {
    actions.push({
      id: 'comm_safe_channel',
      category: 'communicationSafety',
      priority: 'Essential',
      horizons: ['24h', '72h', '7d'],
      titleKey: 'actions.commSafeChannel.title',
      descriptionKey: 'actions.commSafeChannel.description',
      reasonKey: 'actions.commSafeChannel.reason',
      completed: false,
      dismissed: false,
    });
    actions.push({
      id: 'comm_trusted_contact',
      category: 'communicationSafety',
      priority: 'High',
      horizons: ['24h', '72h'],
      titleKey: 'actions.commTrustedContact.title',
      descriptionKey: 'actions.commTrustedContact.description',
      reasonKey: 'actions.commTrustedContact.reason',
      completed: false,
      dismissed: false,
    });
  }

  // 2. Digital & Account Security Actions
  if (needs.digitalSafety || deviceSafety.accountsOrLocationShared === true) {
    actions.push({
      id: 'digital_location_check',
      category: 'digitalSafety',
      priority: 'Essential',
      horizons: ['24h', '72h'],
      titleKey: 'actions.digitalLocationCheck.title',
      descriptionKey: 'actions.digitalLocationCheck.description',
      reasonKey: 'actions.digitalLocationCheck.reason',
      completed: false,
      dismissed: false,
    });
    actions.push({
      id: 'digital_audit_logins',
      category: 'digitalSafety',
      priority: 'High',
      horizons: ['72h', '7d'],
      titleKey: 'actions.digitalAuditLogins.title',
      descriptionKey: 'actions.digitalAuditLogins.description',
      reasonKey: 'actions.digitalAuditLogins.reason',
      completed: false,
      dismissed: false,
    });
  }

  // 3. Document Actions
  if (needs.documents) {
    actions.push({
      id: 'docs_checklist',
      category: 'documents',
      priority: 'High',
      horizons: ['24h', '72h'],
      titleKey: 'actions.docsChecklist.title',
      descriptionKey: 'actions.docsChecklist.description',
      reasonKey: 'actions.docsChecklist.reason',
      completed: false,
      dismissed: false,
    });
    actions.push({
      id: 'docs_secure_storage',
      category: 'documents',
      priority: 'Helpful',
      horizons: ['72h', '7d'],
      titleKey: 'actions.docsSecureStorage.title',
      descriptionKey: 'actions.docsSecureStorage.description',
      reasonKey: 'actions.docsSecureStorage.reason',
      completed: false,
      dismissed: false,
    });
  }

  // 4. Money & Financial Independence Actions
  if (needs.money) {
    actions.push({
      id: 'money_emergency_cash',
      category: 'money',
      priority: 'Essential',
      horizons: ['24h', '72h'],
      titleKey: 'actions.moneyEmergencyCash.title',
      descriptionKey: 'actions.moneyEmergencyCash.description',
      reasonKey: 'actions.moneyEmergencyCash.reason',
      completed: false,
      dismissed: false,
    });
    actions.push({
      id: 'money_independent_bank',
      category: 'money',
      priority: 'High',
      horizons: ['72h', '7d'],
      titleKey: 'actions.moneyIndependentBank.title',
      descriptionKey: 'actions.moneyIndependentBank.description',
      reasonKey: 'actions.moneyIndependentBank.reason',
      completed: false,
      dismissed: false,
    });
  }

  // 5. Housing Actions
  if (needs.housing) {
    actions.push({
      id: 'housing_temporary_options',
      category: 'housing',
      priority: 'Essential',
      horizons: ['24h', '72h'],
      titleKey: 'actions.housingTemporaryOptions.title',
      descriptionKey: 'actions.housingTemporaryOptions.description',
      reasonKey: 'actions.housingTemporaryOptions.reason',
      completed: false,
      dismissed: false,
    });
    actions.push({
      id: 'housing_safe_route',
      category: 'housing',
      priority: 'Helpful',
      horizons: ['72h', '7d'],
      titleKey: 'actions.housingSafeRoute.title',
      descriptionKey: 'actions.housingSafeRoute.description',
      reasonKey: 'actions.housingSafeRoute.reason',
      completed: false,
      dismissed: false,
    });
  }

  // 6. Children & Dependents Actions
  if (needs.children) {
    actions.push({
      id: 'children_essentials_pack',
      category: 'children',
      priority: 'High',
      horizons: ['24h', '72h'],
      titleKey: 'actions.childrenEssentialsPack.title',
      descriptionKey: 'actions.childrenEssentialsPack.description',
      reasonKey: 'actions.childrenEssentialsPack.reason',
      completed: false,
      dismissed: false,
    });
    actions.push({
      id: 'children_continuity_plan',
      category: 'children',
      priority: 'Helpful',
      horizons: ['72h', '7d'],
      titleKey: 'actions.childrenContinuityPlan.title',
      descriptionKey: 'actions.childrenContinuityPlan.description',
      reasonKey: 'actions.childrenContinuityPlan.reason',
      completed: false,
      dismissed: false,
    });
  }

  // 7. Health & Medical Actions
  if (needs.health) {
    actions.push({
      id: 'health_prescriptions_pack',
      category: 'health',
      priority: 'Essential',
      horizons: ['24h', '72h'],
      titleKey: 'actions.healthPrescriptionsPack.title',
      descriptionKey: 'actions.healthPrescriptionsPack.description',
      reasonKey: 'actions.healthPrescriptionsPack.reason',
      completed: false,
      dismissed: false,
    });
    actions.push({
      id: 'health_confidential_pathway',
      category: 'health',
      priority: 'Helpful',
      horizons: ['72h', '7d'],
      titleKey: 'actions.healthConfidentialPathway.title',
      descriptionKey: 'actions.healthConfidentialPathway.description',
      reasonKey: 'actions.healthConfidentialPathway.reason',
      completed: false,
      dismissed: false,
    });
  }

  // 8. Legal Information Actions
  if (needs.legal) {
    actions.push({
      id: 'legal_protection_orders',
      category: 'legal',
      priority: 'High',
      horizons: ['24h', '72h'],
      titleKey: 'actions.legalProtectionOrders.title',
      descriptionKey: 'actions.legalProtectionOrders.description',
      reasonKey: 'actions.legalProtectionOrders.reason',
      completed: false,
      dismissed: false,
    });
    actions.push({
      id: 'legal_free_counsel',
      category: 'legal',
      priority: 'Helpful',
      horizons: ['72h', '7d'],
      titleKey: 'actions.legalFreeCounsel.title',
      descriptionKey: 'actions.legalFreeCounsel.description',
      reasonKey: 'actions.legalFreeCounsel.reason',
      completed: false,
      dismissed: false,
    });
  }

  // 9. Work & Livelihood Actions
  if (needs.work) {
    actions.push({
      id: 'work_direct_deposit_privacy',
      category: 'work',
      priority: 'Helpful',
      horizons: ['72h', '7d'],
      titleKey: 'actions.workDirectDepositPrivacy.title',
      descriptionKey: 'actions.workDirectDepositPrivacy.description',
      reasonKey: 'actions.workDirectDepositPrivacy.reason',
      completed: false,
      dismissed: false,
    });
    actions.push({
      id: 'work_discretion_checklist',
      category: 'work',
      priority: 'Optional',
      horizons: ['7d'],
      titleKey: 'actions.workDiscretionChecklist.title',
      descriptionKey: 'actions.workDiscretionChecklist.description',
      reasonKey: 'actions.workDiscretionChecklist.reason',
      completed: false,
      dismissed: false,
    });
  }

  return actions;
}
