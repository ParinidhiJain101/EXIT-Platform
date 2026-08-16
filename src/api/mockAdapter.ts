import type {
  IPlanService,
  IDirectoryService,
  IVaultService,
  IConsentService,
  IObservatoryService,
  PlanNeeds,
  DeviceSafetyAnswers,
  ReadinessItem,
  PlanAction,
  DirectoryFilters,
  DirectoryService,
  SyntheticEvidenceTemplate,
  VaultCapsuleItem,
  ConsentState,
  ObservatoryDashboardData,
} from './types';
import {
  evaluateReadiness,
  evaluateActionPlan,
} from '../services/rulesEngine/rulesEngine';
import {
  computeSHA256,
  generateDemoAESKey,
  encryptAESGCM,
  simulateTamperPayload,
} from '../services/vault/cryptoUtils';

// Seeded synthetic demo directory for hackathon evaluation
const SEEDED_SERVICES: DirectoryService[] = [
  {
    id: 'srv_1',
    name: 'Nyaya Free Legal Aid Society',
    categories: ['Legal', 'Documents'],
    location: { state: 'Delhi NCR', district: 'South Delhi' },
    contact: { phone: '1800-XXX-0192 (Confidential)', hours: 'Mon–Fri 9:00 AM – 5:30 PM' },
    languages: ['English', 'Hindi'],
    accessibility: ['Wheelchair accessible', 'Sign language on request', 'Walk-ins accepted'],
    eligibility: 'Open to anyone seeking confidential civil protection or document counsel',
    cost: 'Free / Pro Bono',
    verificationStatus: 'Verified',
    lastVerified: '2026-08-10',
    safetyNote: 'Toll-free number does not appear on standard monthly phone bills. Discreet entrance available.',
  },
  {
    id: 'srv_2',
    name: 'Aashray Safe Steps Transition Shelter',
    categories: ['Housing', 'Children'],
    location: { state: 'Maharashtra', district: 'Mumbai Suburban' },
    contact: { phone: 'Confidential Helpline (Direct)', hours: '24/7 Intake' },
    languages: ['English', 'Hindi', 'Marathi'],
    accessibility: ['Childcare area', 'Medical staff on site', 'Secure admission gate'],
    eligibility: 'Women and dependent children seeking temporary short-stay transition',
    cost: 'Free',
    verificationStatus: 'Verified',
    lastVerified: '2026-08-12',
    safetyNote: 'Physical address is unlisted for security. Initial intake is coordinated via confidential safe transfer points.',
  },
  {
    id: 'srv_3',
    name: 'Asha Community Health & Trauma Support',
    categories: ['Health'],
    location: { state: 'West Bengal', district: 'Kolkata' },
    contact: { phone: 'Direct clinic intake line', hours: 'Mon–Sat 8:00 AM – 8:00 PM' },
    languages: ['English', 'Bengali', 'Hindi'],
    accessibility: ['Anonymous consultation', 'Low-data messaging', 'Prescription assistance'],
    eligibility: 'General public needing confidential outpatient care or counselling',
    cost: 'Sliding scale / Free for low-income',
    verificationStatus: 'Verified',
    lastVerified: '2026-08-05',
    safetyNote: 'No requirement for next-of-kin or partner identification. Medical records are held in separate sealed clinic partitions.',
  },
  {
    id: 'srv_4',
    name: 'CyberShakti Digital Safety Network',
    categories: ['Digital Safety', 'Communication Safety'],
    location: { state: 'Karnataka', district: 'Bengaluru Urban' },
    contact: { phone: 'Encrypted chat & helpline', hours: 'Mon–Sat 10:00 AM – 7:00 PM' },
    languages: ['English', 'Hindi', 'Kannada'],
    accessibility: ['Remote browser-based support', 'Text-only consultation', 'Screen share audits'],
    eligibility: 'Survivors facing device tracking, account takeovers, or online harassment',
    cost: 'Free NGO service',
    verificationStatus: 'Verified',
    lastVerified: '2026-08-14',
    safetyNote: 'Consultations include guidance on safe browser wiping and verifying whether parental tracking apps are installed.',
  },
  {
    id: 'srv_5',
    name: 'Swavalamban Economic & Livelihood Center',
    categories: ['Money', 'Work'],
    location: { state: 'Tamil Nadu', district: 'Chennai' },
    contact: { phone: 'Direct desk line', hours: 'Mon–Fri 9:30 AM – 5:00 PM' },
    languages: ['English', 'Tamil', 'Hindi'],
    accessibility: ['Financial literacy workshops', 'Direct bank liaison', 'Vocational training'],
    eligibility: 'Individuals seeking independent livelihood pathways or emergency bank account setup',
    cost: 'Free',
    verificationStatus: 'Verified',
    lastVerified: '2026-08-01',
    safetyNote: 'Helps facilitate independent, zero-balance bank accounts with secure e-statement delivery to separate private email addresses.',
  },
  {
    id: 'srv_6',
    name: 'Sahara Rapid Support Hub',
    categories: ['Communication Safety', 'Housing', 'Health'],
    location: { state: 'Uttar Pradesh', district: 'Lucknow' },
    contact: { phone: 'Confidential coordination desk', hours: 'Daily 8:00 AM – 10:00 PM' },
    languages: ['Hindi', 'English', 'Urdu'],
    accessibility: ['Discreet walk-in reception', 'Emergency food & hygiene kits'],
    eligibility: 'Immediate community referral & crisis navigation',
    cost: 'Free',
    verificationStatus: 'Verified',
    lastVerified: '2026-08-08',
    safetyNote: 'Provides one-on-one safety planning and safe travel route assistance.',
  },
];

// Seeded synthetic evidence templates for AegisVault demo
export const SYNTHETIC_EVIDENCE_TEMPLATES: SyntheticEvidenceTemplate[] = [
  {
    id: 'tpl_whatsapp_threat',
    titleKey: 'vault.templates.whatsappThreat.title',
    category: 'Communication Safety',
    fileName: 'synthetic_threat_export_20260814.txt',
    fileType: 'text/plain',
    fileSize: '1.4 KB',
    syntheticContent: `[SYNTHETIC CHAT EXPORT LOG - DEMO ONLY]
Date: 2026-08-14 18:22:04 IST
Sender: Unknown (+91 98XXX-XXXXX)
Message: "Do not attempt to contact legal aid or change your bank branch. I have access to your device location."
Status: Exported from device sandbox for continuity record.`,
    descriptionKey: 'vault.templates.whatsappThreat.description',
  },
  {
    id: 'tpl_bank_cutoff',
    titleKey: 'vault.templates.bankCutoff.title',
    category: 'Money',
    fileName: 'synthetic_bank_alert_notice.txt',
    fileType: 'text/plain',
    fileSize: '2.1 KB',
    syntheticContent: `[SYNTHETIC BANK NOTIFICATION LOG - DEMO ONLY]
Date: 2026-08-15 09:14:22 IST
Service: Apex Bank NetBanking Security Alert
Alert: Primary online access credentials changed by primary account holder. Sub-account debit card authorization removed.
Reference: TXN-SYN-883921`,
    descriptionKey: 'vault.templates.bankCutoff.description',
  },
  {
    id: 'tpl_tracker_log',
    titleKey: 'vault.templates.trackerLog.title',
    category: 'Digital Safety',
    fileName: 'synthetic_bluetooth_tracker_audit.txt',
    fileType: 'text/plain',
    fileSize: '3.0 KB',
    syntheticContent: `[SYNTHETIC DEVICE AUDIT LOG - DEMO ONLY]
Date: 2026-08-15 14:40:11 IST
Detected Device: Unknown BLE Tracker Beacon (Device ID: SYN-BLE-TAG-492)
Location History: Moving with user device continuously for 48 hours across 3 distinct transit coordinates.`,
    descriptionKey: 'vault.templates.trackerLog.description',
  },
];

export class MockPlanService implements IPlanService {
  async getReadinessSnapshot(
    needs: PlanNeeds,
    deviceSafety: DeviceSafetyAnswers,
  ): Promise<ReadinessItem[]> {
    return evaluateReadiness(needs, deviceSafety);
  }

  async generateActionPlan(
    needs: PlanNeeds,
    deviceSafety: DeviceSafetyAnswers,
  ): Promise<PlanAction[]> {
    return evaluateActionPlan(needs, deviceSafety);
  }
}

export class MockDirectoryService implements IDirectoryService {
  async getServices(filters?: DirectoryFilters): Promise<DirectoryService[]> {
    let result = [...SEEDED_SERVICES];

    if (filters?.category && filters.category !== 'All') {
      result = result.filter((s) =>
        s.categories.some(
          (c) => c.toLowerCase() === filters.category!.toLowerCase(),
        ),
      );
    }

    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.location.state.toLowerCase().includes(q) ||
          s.location.district.toLowerCase().includes(q) ||
          s.categories.some((c) => c.toLowerCase().includes(q)) ||
          s.languages.some((l) => l.toLowerCase().includes(q)) ||
          s.safetyNote.toLowerCase().includes(q),
      );
    }

    return result;
  }

  async getCategories(): Promise<string[]> {
    const categoriesSet = new Set<string>();
    SEEDED_SERVICES.forEach((s) =>
      s.categories.forEach((c) => categoriesSet.add(c)),
    );
    return ['All', ...Array.from(categoriesSet).sort()];
  }
}

export class MockVaultService implements IVaultService {
  private timeline: VaultCapsuleItem[] = [];

  async getSyntheticTemplates(): Promise<SyntheticEvidenceTemplate[]> {
    return SYNTHETIC_EVIDENCE_TEMPLATES;
  }

  async preserveSyntheticItem(
    template: SyntheticEvidenceTemplate,
  ): Promise<VaultCapsuleItem> {
    const plainHash = await computeSHA256(template.syntheticContent);
    const key = await generateDemoAESKey();
    const { ciphertextBase64, ivHex } = await encryptAESGCM(
      template.syntheticContent,
      key,
    );

    const item: VaultCapsuleItem = {
      id: 'capsule_' + Math.random().toString(36).substring(2, 10),
      templateId: template.id,
      title: template.fileName,
      fileName: template.fileName,
      fileType: template.fileType,
      category: template.category,
      plainHash,
      ciphertextBase64,
      ivHex,
      rawSyntheticContent: template.syntheticContent,
      timestamp: new Date().toISOString(),
      verificationResult: {
        verified: true,
        computedHash: plainHash,
        expectedHash: plainHash,
        tampered: false,
        verifiedAt: new Date().toISOString(),
      },
    };

    this.timeline.unshift(item);
    return item;
  }

  async verifyItemIntegrity(
    item: VaultCapsuleItem,
    simulateTamper = false,
  ): Promise<VaultCapsuleItem> {
    const payloadToCheck = simulateTamper
      ? simulateTamperPayload(item.rawSyntheticContent)
      : item.rawSyntheticContent;

    const computedHash = await computeSHA256(payloadToCheck);
    const verified = computedHash === item.plainHash;

    const updatedItem: VaultCapsuleItem = {
      ...item,
      verificationResult: {
        verified,
        computedHash,
        expectedHash: item.plainHash,
        tampered: simulateTamper,
        verifiedAt: new Date().toISOString(),
      },
    };

    this.timeline = this.timeline.map((i) =>
      i.id === item.id ? updatedItem : i,
    );
    return updatedItem;
  }

  async getTimeline(): Promise<VaultCapsuleItem[]> {
    return this.timeline;
  }
}

export class MockConsentService implements IConsentService {
  private state: ConsentState = {
    optedIn: false,
    shareHarmCategory: false,
    shareBroadRegion: false,
    shareServiceNeed: false,
    shareQuarterYear: false,
    updatedAt: null,
    version: '1.0-synthetic',
  };

  async getConsentState(): Promise<ConsentState> {
    return this.state;
  }

  async updateConsent(updates: Partial<ConsentState>): Promise<ConsentState> {
    this.state = {
      ...this.state,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.state;
  }

  async withdrawConsent(): Promise<ConsentState> {
    this.state = {
      optedIn: false,
      shareHarmCategory: false,
      shareBroadRegion: false,
      shareServiceNeed: false,
      shareQuarterYear: false,
      updatedAt: new Date().toISOString(),
      version: '1.0-synthetic',
    };
    return this.state;
  }
}

export class MockObservatoryService implements IObservatoryService {
  async getDashboardData(): Promise<ObservatoryDashboardData> {
    return { totalContributions: 150 };
  }
}

// Export singleton instances for use in components
export const planService = new MockPlanService();
export const directoryService = new MockDirectoryService();
export const vaultService = new MockVaultService();
export const consentService = new MockConsentService();
export const observatoryService = new MockObservatoryService();
