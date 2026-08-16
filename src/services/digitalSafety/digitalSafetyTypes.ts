export type DigitalSafetyCategory =
  | 'device'
  | 'accounts'
  | 'location'
  | 'communication'
  | 'social'
  | 'cloud'
  | 'recovery';

export type SelfCheckAnswer = 'yes' | 'no' | 'unsure';

export type AssessmentStatus =
  | 'looksConfigured'
  | 'reviewRecommended'
  | 'needsAttention'
  | 'notChecked';

export interface DigitalSafetyQuestion {
  id: string;
  category: DigitalSafetyCategory;
  titleKey: string;
  descriptionKey: string;
  whyMattersKey: string;
  actionKey: string;
  flaggedIf: 'yes' | 'no';
  severity: 'needsAttention' | 'reviewRecommended';
}

export interface CategoryEvaluation {
  category: DigitalSafetyCategory;
  status: AssessmentStatus;
  flaggedQuestions: DigitalSafetyQuestion[];
  answeredCount: number;
  totalCount: number;
}

export interface FlaggedActionItem {
  question: DigitalSafetyQuestion;
  severity: 'needsAttention' | 'reviewRecommended';
  userAnswer: SelfCheckAnswer;
}

export interface DigitalSafetyCheckupReport {
  totalQuestions: number;
  answeredQuestions: number;
  categoryEvaluations: Record<DigitalSafetyCategory, CategoryEvaluation>;
  flaggedItems: FlaggedActionItem[];
  statusSummary: {
    looksConfigured: number;
    reviewRecommended: number;
    needsAttention: number;
    notChecked: number;
  };
}
