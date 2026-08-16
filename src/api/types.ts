export interface PlanNeeds {
  communicationSafety: boolean;
  documents: boolean;
  money: boolean;
  housing: boolean;
  children: boolean;
  health: boolean;
  legal: boolean;
  digitalSafety: boolean;
  work: boolean;
}

export interface DeviceSafetyAnswers {
  notificationsSafe: boolean | null;
  deviceShared: boolean | null;
  accountsOrLocationShared: boolean | null;
}

export type ReadinessStatusType =
  | 'Prepared'
  | 'Partially prepared'
  | 'Needs attention'
  | 'Not yet planned'
  | 'Optional';

export type ActionPriority = 'Essential' | 'High' | 'Helpful' | 'Optional';

export interface ReadinessItem {
  category: keyof PlanNeeds;
  status: ReadinessStatusType;
  titleKey: string;
  reasonKey: string;
  rationaleKey: string;
}

export interface PlanAction {
  id: string;
  category: keyof PlanNeeds;
  priority: ActionPriority;
  titleKey: string;
  descriptionKey: string;
  reasonKey: string;
  completed: boolean;
  dismissed: boolean;
}

export interface ActionPlan {
  actions: PlanAction[];
  generatedAt: string;
}

export interface DirectoryFilters {
  category?: string;
  state?: string;
  district?: string;
}

export interface DirectoryService {
  id: string;
  name: string;
  categories: string[];
  location: { state: string; district: string };
  contact: { phone: string; hours: string };
  verificationStatus: string;
  lastVerified: string;
  safetyNote: string;
}

export interface AegisVaultItem {
  id: string;
  hash: string;
  timestamp: string;
  fileName: string;
}

export interface ObservatoryContribution {
  id: string;
  quarter: string;
  region: string;
  category: string;
  need: string;
}

export interface ObservatoryDashboardData {
  totalContributions: number;
}

// API Service Interfaces
export interface IPlanService {
  getReadinessSnapshot(
    needs: PlanNeeds,
    deviceSafety: DeviceSafetyAnswers,
  ): Promise<ReadinessItem[]>;
  generateActionPlan(
    needs: PlanNeeds,
    deviceSafety: DeviceSafetyAnswers,
  ): Promise<PlanAction[]>;
}

export interface IDirectoryService {
  getServices(filters?: DirectoryFilters): Promise<DirectoryService[]>;
}

export interface IVaultService {
  uploadFictionalEvidence(file: File): Promise<AegisVaultItem>;
  getTimeline(): Promise<AegisVaultItem[]>;
}

export interface IConsentService {
  submitConsent(fields: string[]): Promise<boolean>;
  getConsentStatus(): Promise<string[]>;
}

export interface IObservatoryService {
  getDashboardData(): Promise<ObservatoryDashboardData>;
}
