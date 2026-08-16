import { createContext } from 'react';

import type { PlanNeeds } from '../api/types';

export type StorageMode = 'memory';

export interface DeviceSafety {
    notificationsSafe: boolean | null;
    deviceShared: boolean | null;
    accountsOrLocationShared: boolean | null;
}

export interface SessionContextType {
    storageMode: StorageMode;
    neutralMode: boolean;
    quietMode: boolean;
    immediateDanger: boolean | null;
    deviceSafety: DeviceSafety;
    planNeeds: PlanNeeds;
    onboardingComplete: boolean;

    setNeutralMode: (enabled: boolean) => void;
    setQuietMode: (enabled: boolean) => void;
    setImmediateDanger: (danger: boolean | null) => void;
    setDeviceSafety: (safety: Partial<DeviceSafety>) => void;
    setPlanNeeds: (needs: Partial<PlanNeeds>) => void;

    completeOnboarding: () => void;
    resetOnboarding: () => void;
    clearSession: () => Promise<void>;
    quickExit: () => void;
}

export const SessionContext =
    createContext<SessionContextType | undefined>(undefined);