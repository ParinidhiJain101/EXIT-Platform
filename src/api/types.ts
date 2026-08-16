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

export interface ReadinessStatus {
  category: string;
  status: 'Prepared' | 'Partially prepared' | 'Needs attention' | 'Not yet planned' | 'Not relevant';
}

export interface ActionPlan {
  plan: string;
  actions?: string[];
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
  getReadinessSnapshot(needs: PlanNeeds): Promise<ReadinessStatus[]>;
  generateActionPlan(needs: PlanNeeds): Promise<ActionPlan>;
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
