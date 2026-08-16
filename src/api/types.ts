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

export type PlanningHorizon = '24h' | '72h' | '7d';

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
  horizons: PlanningHorizon[];
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
  searchQuery?: string;
  state?: string;
  district?: string;
  language?: string;
}

export interface DirectoryService {
  id: string;
  name: string;
  categories: string[];
  location: { state: string; district: string };
  contact: { phone: string; hours: string };
  languages: string[];
  accessibility: string[];
  eligibility: string;
  cost: string;
  verificationStatus: 'Verified' | 'Pending Review' | 'Community Reported';
  lastVerified: string;
  safetyNote: string;
}

// AegisVault Types
export interface SyntheticEvidenceTemplate {
  id: string;
  titleKey: string;
  category: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  syntheticContent: string;
  descriptionKey: string;
}

export interface VaultCapsuleItem {
  id: string;
  templateId: string;
  title: string;
  fileName: string;
  fileType: string;
  category: string;
  plainHash: string; // Original computed SHA-256
  ciphertextBase64: string; // AES-GCM Encrypted bytes
  ivHex: string;
  rawSyntheticContent: string;
  timestamp: string;
  verificationResult?: {
    verified: boolean;
    computedHash: string;
    expectedHash: string;
    tampered: boolean;
    verifiedAt: string;
  };
}

// Consent Gateway Types
export interface ConsentState {
  optedIn: boolean;
  shareHarmCategory: boolean;
  shareBroadRegion: boolean;
  shareServiceNeed: boolean;
  shareQuarterYear: boolean;
  updatedAt: string | null;
  version: string;
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
  getCategories(): Promise<string[]>;
}

export interface IVaultService {
  getSyntheticTemplates(): Promise<SyntheticEvidenceTemplate[]>;
  preserveSyntheticItem(template: SyntheticEvidenceTemplate): Promise<VaultCapsuleItem>;
  verifyItemIntegrity(item: VaultCapsuleItem, simulateTamper?: boolean): Promise<VaultCapsuleItem>;
  getTimeline(): Promise<VaultCapsuleItem[]>;
}

export interface IConsentService {
  getConsentState(): Promise<ConsentState>;
  updateConsent(state: Partial<ConsentState>): Promise<ConsentState>;
  withdrawConsent(): Promise<ConsentState>;
}

export interface IObservatoryService {
  getDashboardData(): Promise<ObservatoryDashboardData>;
}
