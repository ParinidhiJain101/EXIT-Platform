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

// In a real application, these would make HTTP requests to the backend API.
// For the MVP, we use mock adapters that execute deterministic logic in-memory.

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
    // Return dummy data; in real MVP, we fetch from directory.demo.json
    const services: DirectoryService[] = [
      {
        id: '1',
        name: 'Safe Haven Legal Aid',
        categories: ['Legal'],
        location: { state: 'Delhi', district: 'South Delhi' },
        contact: { phone: 'Confidential', hours: '9AM - 5PM' },
        verificationStatus: 'Verified',
        lastVerified: '2026-08-10',
        safetyNote: 'Calls may leave traces on your device.',
      },
    ];

    if (filters?.category) {
      return services.filter((s) => s.categories.includes(filters.category!));
    }

    return services;
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
    // Return dummy aggregate
    return { totalContributions: 150 };
  }
}

// Export singleton instances for use in components
export const planService = new MockPlanService();
export const directoryService = new MockDirectoryService();
export const vaultService = new MockVaultService();
export const consentService = new MockConsentService();
export const observatoryService = new MockObservatoryService();
