import {
  DIGITAL_SAFETY_CATEGORIES,
  DIGITAL_SAFETY_QUESTIONS,
} from './digitalSafetyQuestions';
import type {
  AssessmentStatus,
  CategoryEvaluation,
  DigitalSafetyCategory,
  DigitalSafetyCheckupReport,
  FlaggedActionItem,
  SelfCheckAnswer,
} from './digitalSafetyTypes';

export function evaluateDigitalSafetyCheckup(
  answers: Record<string, SelfCheckAnswer | undefined>,
): DigitalSafetyCheckupReport {
  const categoryEvaluations: Record<DigitalSafetyCategory, CategoryEvaluation> = {
    device: { category: 'device', status: 'notChecked', flaggedQuestions: [], answeredCount: 0, totalCount: 0 },
    accounts: { category: 'accounts', status: 'notChecked', flaggedQuestions: [], answeredCount: 0, totalCount: 0 },
    location: { category: 'location', status: 'notChecked', flaggedQuestions: [], answeredCount: 0, totalCount: 0 },
    communication: { category: 'communication', status: 'notChecked', flaggedQuestions: [], answeredCount: 0, totalCount: 0 },
    social: { category: 'social', status: 'notChecked', flaggedQuestions: [], answeredCount: 0, totalCount: 0 },
    cloud: { category: 'cloud', status: 'notChecked', flaggedQuestions: [], answeredCount: 0, totalCount: 0 },
    recovery: { category: 'recovery', status: 'notChecked', flaggedQuestions: [], answeredCount: 0, totalCount: 0 },
  };

  const flaggedItems: FlaggedActionItem[] = [];
  let answeredQuestions = 0;

  for (const question of DIGITAL_SAFETY_QUESTIONS) {
    const catEval = categoryEvaluations[question.category];
    catEval.totalCount += 1;

    const answer = answers[question.id];
    if (answer) {
      catEval.answeredCount += 1;
      answeredQuestions += 1;

      const isFlagged = answer === question.flaggedIf;
      const isUnsure = answer === 'unsure';

      if (isFlagged || isUnsure) {
        const severity = isFlagged ? question.severity : 'reviewRecommended';
        catEval.flaggedQuestions.push(question);
        flaggedItems.push({
          question,
          severity,
          userAnswer: answer,
        });
      }
    }
  }

  const statusSummary = {
    looksConfigured: 0,
    reviewRecommended: 0,
    needsAttention: 0,
    notChecked: 0,
  };

  for (const cat of DIGITAL_SAFETY_CATEGORIES) {
    const catEval = categoryEvaluations[cat];
    let status: AssessmentStatus;

    if (catEval.answeredCount === 0) {
      status = 'notChecked';
    } else if (catEval.flaggedQuestions.length === 0) {
      status = 'looksConfigured';
    } else {
      const hasNeedsAttention = catEval.flaggedQuestions.some((q) => {
        const ans = answers[q.id];
        return ans === q.flaggedIf && q.severity === 'needsAttention';
      });
      status = hasNeedsAttention ? 'needsAttention' : 'reviewRecommended';
    }

    catEval.status = status;
    statusSummary[status] += 1;
  }

  return {
    totalQuestions: DIGITAL_SAFETY_QUESTIONS.length,
    answeredQuestions,
    categoryEvaluations,
    flaggedItems,
    statusSummary,
  };
}
