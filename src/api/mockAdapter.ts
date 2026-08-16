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
  AegisVaultItem,
  ObservatoryDashboardData,
} from './types';
import {
  evaluateReadiness,
  evaluateActionPlan,
} from '../services/rulesEngine/rulesEngine';

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
  async uploadFictionalEvidence(file: File): Promise<AegisVaultItem> {
    return {
      id: Math.random().toString(36).substring(2, 11),
      hash: 'synthetic-hash-' + Date.now(),
      timestamp: new Date().toISOString(),
      fileName: file.name || 'SYNTHETIC DEMO FILE',
    };
  }

  async getTimeline(): Promise<AegisVaultItem[]> {
    return [];
  }
}

export class MockConsentService implements IConsentService {
  private consentFields: string[] = [];

  async submitConsent(fields: string[]): Promise<boolean> {
    this.consentFields = fields;
    return true;
  }

  async getConsentStatus(): Promise<string[]> {
    return this.consentFields;
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
