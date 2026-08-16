/**
 * SessionContext — application-wide session state.
 *
 * Storage policy for this MVP:
 *   - Default and only active mode: 'memory' (MemoryStorageService).
 *     No survivor data is written to localStorage or any persistent store.
 *
 * Local persistence is architecturally ready:
 *   - EncryptedLocalStorageService (AES-GCM, PBKDF2) exists in
 *     src/services/storage/encryptedLocalStorage.ts.
 *   - Activating it requires a passphrase collection UX (e.g. a PIN screen)
 *     which is deferred to a later phase.
 *   - The StorageMode type is extended at that point; do NOT add a
 *     'local_encrypted' mode here until the passphrase UX is implemented
 *     and the implementation has been reviewed.
 */

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import {
  SessionContext,
  type DeviceSafety,
  type StorageMode,
} from './SessionContext';

import { memoryStorage } from '../services/storage/memoryStorage';

const initialDeviceSafety: DeviceSafety = {
  notificationsSafe: null,
  deviceShared: null,
  accountsOrLocationShared: null,
};


export function SessionProvider({ children }: { children: ReactNode }) {
  const [neutralMode, setNeutralMode] = useState<boolean>(false);
  const [quietMode, setQuietMode] = useState<boolean>(false);
  const [immediateDanger, setImmediateDanger] = useState<boolean | null>(null);
  const [deviceSafety, setDeviceSafetyState] = useState<DeviceSafety>(initialDeviceSafety);
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

  const completeOnboarding = () => {
    setOnboardingComplete(true);
    // Persist only within the in-memory store; nothing leaves the tab
    void memoryStorage.setItem('onboarding_complete', true);
  };

  const resetOnboarding = () => {
    setOnboardingComplete(false);
    setDeviceSafetyState(initialDeviceSafety);
    setImmediateDanger(null);
  };

  const clearSession = async () => {
    await memoryStorage.clear();
    sessionStorage.clear();
    setNeutralMode(false);
    setQuietMode(false);
    setImmediateDanger(null);
    setDeviceSafetyState(initialDeviceSafety);
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
        onboardingComplete,
        setNeutralMode,
        setQuietMode,
        setImmediateDanger,
        setDeviceSafety,
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

