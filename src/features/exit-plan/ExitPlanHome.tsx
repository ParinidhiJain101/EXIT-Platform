import { useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import { ExitPlanOnboarding } from './ExitPlanOnboarding';
import { LeaveTomorrowSimulatorView } from './LeaveTomorrowSimulatorView';
import { ActionPlanView } from './ActionPlanView';
import { ReadinessSnapshotView } from './ReadinessSnapshotView';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { StatusChip } from '../../components/StatusChip/StatusChip';

type DashboardTab = 'simulator' | 'actions' | 'readiness';

export const ExitPlanHome: FC = () => {
  const { t } = useTranslation();
  const {
    onboardingComplete,
    deviceSafety,
    quietMode,
    resetOnboarding,
  } = useSession();
  const [activeTab, setActiveTab] = useState<DashboardTab>('simulator');

  if (!onboardingComplete) {
    return <ExitPlanOnboarding />;
  }

  const formatSafetyAnswer = (val: boolean | null): string => {
    if (val === true) return t('common.yes');
    if (val === false) return t('common.no');
    return t('common.unsure');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', margin: 0 }}>
              {t('planDashboard.title')}
            </h2>
            <StatusChip label={t('safetyShell.memoryBadge')} variant="memory" size="sm" />
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            <Button
              variant="outline"
              onClick={resetOnboarding}
              style={{ padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--font-size-xs)', minHeight: '34px' }}
            >
              {t('planDashboard.resetPlanButton')}
            </Button>
          </div>
        </div>
        <p style={{ color: '#486581', fontSize: 'var(--font-size-sm)' }}>
          {t('planDashboard.subtitle')}
        </p>
      </div>

      {/* Main Tab Navigation */}
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid var(--color-neutral-grey)',
          gap: 'var(--spacing-2)',
          flexWrap: 'wrap',
        }}
        role="tablist"
        aria-label="Planning Views"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'simulator'}
          onClick={() => setActiveTab('simulator')}
          style={{
            padding: 'var(--spacing-2) var(--spacing-3)',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'simulator' ? '3px solid var(--color-trust-blue)' : '3px solid transparent',
            color: activeTab === 'simulator' ? 'var(--color-trust-blue)' : 'var(--color-deep-ink)',
            fontWeight: activeTab === 'simulator' ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-base)',
            cursor: 'pointer',
            marginBottom: '-2px',
            transition: 'all 0.15s ease',
          }}
        >
          {t('planDashboard.tabSimulator')}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'actions'}
          onClick={() => setActiveTab('actions')}
          style={{
            padding: 'var(--spacing-2) var(--spacing-3)',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'actions' ? '3px solid var(--color-trust-blue)' : '3px solid transparent',
            color: activeTab === 'actions' ? 'var(--color-trust-blue)' : 'var(--color-deep-ink)',
            fontWeight: activeTab === 'actions' ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-base)',
            cursor: 'pointer',
            marginBottom: '-2px',
            transition: 'all 0.15s ease',
          }}
        >
          {t('planDashboard.tabActions')}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'readiness'}
          onClick={() => setActiveTab('readiness')}
          style={{
            padding: 'var(--spacing-2) var(--spacing-3)',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'readiness' ? '3px solid var(--color-trust-blue)' : '3px solid transparent',
            color: activeTab === 'readiness' ? 'var(--color-trust-blue)' : 'var(--color-deep-ink)',
            fontWeight: activeTab === 'readiness' ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-base)',
            cursor: 'pointer',
            marginBottom: '-2px',
            transition: 'all 0.15s ease',
          }}
        >
          {t('planDashboard.tabReadiness')}
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: '340px' }}>
        {activeTab === 'simulator' && <LeaveTomorrowSimulatorView />}
        {activeTab === 'actions' && <ActionPlanView />}
        {activeTab === 'readiness' && <ReadinessSnapshotView />}
      </div>

      {/* Collapsible/Summary Device Safety Status Bar */}
      <Card variant="neutral" padding="sm" style={{ marginTop: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', fontSize: 'var(--font-size-xs)', color: '#475569' }}>
            <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-deep-ink)' }}>
              {t('planDashboard.deviceSafetyHeading')}:
            </span>
            <span>
              {t('planDashboard.notificationsSafeLabel')} {formatSafetyAnswer(deviceSafety.notificationsSafe)}
            </span>
            <span>•</span>
            <span>
              {t('planDashboard.deviceSharedLabel')} {formatSafetyAnswer(deviceSafety.deviceShared)}
            </span>
            <span>•</span>
            <span>
              {t('planDashboard.accountsSharedLabel')} {formatSafetyAnswer(deviceSafety.accountsOrLocationShared)}
            </span>
          </div>

          {quietMode && <StatusChip label={t('safetyShell.quietModeActive')} variant="quiet" size="sm" />}
        </div>
      </Card>
    </div>
  );
};
