/**
 * SessionContext — application-wide in-memory session state.
 * Invariant: Storage mode is memory-only; no survivor data is persisted to localStorage.
 */

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import {
  SessionContext,
  type DeviceSafety,
  type StorageMode,
} from './SessionContext';
import type { PlanNeeds, PlanAction } from '../api/types';
import { evaluateActionPlan } from '../services/rulesEngine/rulesEngine';

import { memoryStorage } from '../services/storage/memoryStorage';

const initialDeviceSafety: DeviceSafety = {
  notificationsSafe: null,
  deviceShared: null,
  accountsOrLocationShared: null,
};

const initialPlanNeeds: PlanNeeds = {
  communicationSafety: false,
  documents: false,
  money: false,
  housing: false,
  children: false,
  health: false,
  legal: false,
  digitalSafety: false,
  work: false,
};

export function SessionProvider({ children }: { children: ReactNode }) {
  const [neutralMode, setNeutralMode] = useState<boolean>(false);
  const [quietMode, setQuietMode] = useState<boolean>(false);
  const [immediateDanger, setImmediateDanger] = useState<boolean | null>(null);
  const [deviceSafety, setDeviceSafetyState] = useState<DeviceSafety>(initialDeviceSafety);
  const [planNeeds, setPlanNeedsState] = useState<PlanNeeds>(initialPlanNeeds);
  const [actions, setActions] = useState<PlanAction[]>([]);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);

  // MVP: memory-only storage. No data leaves the browser tab.
  const storageMode: StorageMode = 'memory';

  const setDeviceSafety = (answers: Partial<DeviceSafety>) => {
    setDeviceSafetyState((prev) => {
      const updated = { ...prev, ...answers };
      // Automatically suggest quiet mode if the device or accounts are shared
      if (
        updated.deviceShared === true ||
        updated.notificationsSafe === false ||
        updated.accountsOrLocationShared === true
      ) {
        setQuietMode(true);
      }
      return updated;
    });
  };

  const setPlanNeeds = (needs: Partial<PlanNeeds>) => {
    setPlanNeedsState((prev) => ({
      ...prev,
      ...needs,
    }));
  };

  const toggleActionComplete = (id: string) => {
    setActions((prev) =>
      prev.map((action) =>
        action.id === id ? { ...action, completed: !action.completed } : action,
      ),
    );
  };

  const dismissAction = (id: string) => {
    setActions((prev) =>
      prev.map((action) =>
        action.id === id ? { ...action, dismissed: true } : action,
      ),
    );
  };

  const restoreAction = (id: string) => {
    setActions((prev) =>
      prev.map((action) =>
        action.id === id ? { ...action, dismissed: false } : action,
      ),
    );
  };

  const completeOnboarding = () => {
    const generatedActions = evaluateActionPlan(planNeeds, deviceSafety);
    setActions(generatedActions);
    setOnboardingComplete(true);
    // Persist only within the in-memory store; nothing leaves the tab
    void memoryStorage.setItem('onboarding_complete', true);
  };

  const resetOnboarding = () => {
    setOnboardingComplete(false);
    setDeviceSafetyState(initialDeviceSafety);
    setPlanNeedsState(initialPlanNeeds);
    setActions([]);
    setImmediateDanger(null);
  };

  const clearSession = async () => {
    await memoryStorage.clear();
    sessionStorage.clear();
    setNeutralMode(false);
    setQuietMode(false);
    setImmediateDanger(null);
    setDeviceSafetyState(initialDeviceSafety);
    setPlanNeedsState(initialPlanNeeds);
    setActions([]);
    setOnboardingComplete(false);
  };

  const quickExit = () => {
    // Clear in-memory state synchronously before navigation
    void memoryStorage.clear();
    sessionStorage.clear();
    window.location.replace('https://www.google.com');
  };

  // Double-ESC keyboard shortcut triggers Quick Exit
  useEffect(() => {
    let lastEscTime = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscTime < 500) {
          quickExit();
        }
        lastEscTime = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // quickExit reads only module-level stable refs; empty deps array is correct
  }, []);

  return (
    <SessionContext.Provider
      value={{
        storageMode,
        neutralMode,
        quietMode,
        immediateDanger,
        deviceSafety,
        planNeeds,
        actions,
        onboardingComplete,
        setNeutralMode,
        setQuietMode,
        setImmediateDanger,
        setDeviceSafety,
        setPlanNeeds,
        toggleActionComplete,
        dismissAction,
        restoreAction,
        completeOnboarding,
        resetOnboarding,
        clearSession,
        quickExit,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
