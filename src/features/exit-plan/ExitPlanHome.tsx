import { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import { ExitPlanOnboarding } from './ExitPlanOnboarding';
import { LeaveTomorrowSimulatorView } from './LeaveTomorrowSimulatorView';
import { ActionPlanView } from './ActionPlanView';
import { ReadinessSnapshotView } from './ReadinessSnapshotView';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import {
  ClockIcon,
  CheckCircleIcon,
  BarChartIcon,
  RefreshIcon,
  EyeOffIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
} from '../../components/Icons/Icons';

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

  const tabOptions = [
    {
      value: 'simulator' as DashboardTab,
      label: t('planDashboard.tabSimulator'),
      icon: <ClockIcon size={16} />,
    },
    {
      value: 'actions' as DashboardTab,
      label: t('planDashboard.tabActions'),
      icon: <CheckCircleIcon size={16} />,
    },
    {
      value: 'readiness' as DashboardTab,
      label: t('planDashboard.tabReadiness'),
      icon: <BarChartIcon size={16} />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <h2
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {t('planDashboard.title')}
            </h2>
            <StatusChip label={t('safetyShell.memoryBadge')} variant="memory" size="sm" withDot />
          </div>

          <Button
            variant="subtle"
            size="sm"
            onClick={resetOnboarding}
            icon={<RefreshIcon size={13} />}
          >
            {t('planDashboard.resetPlanButton')}
          </Button>
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {t('planDashboard.subtitle')}
        </p>
      </div>

      {/* Main Tab Navigation via SegmentedControl */}
      <SegmentedControl
        options={tabOptions}
        value={activeTab}
        onChange={(val) => setActiveTab(val)}
        size="lg"
        fullWidth
        aria-label="Planning Views"
      />

      {/* Tab Content Canvas */}
      <div style={{ minHeight: '340px' }}>
        {activeTab === 'simulator' && <LeaveTomorrowSimulatorView />}
        {activeTab === 'actions' && <ActionPlanView />}
        {activeTab === 'readiness' && <ReadinessSnapshotView />}
      </div>

      {/* Device Safety Status Bar */}
      <Card variant="neutral" padding="sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheckIcon size={13} />
              <span>{t('planDashboard.deviceSafetyHeading')}:</span>
            </span>
            <span>
              {t('planDashboard.notificationsSafeLabel')} <strong>{formatSafetyAnswer(deviceSafety.notificationsSafe)}</strong>
            </span>
            <span>•</span>
            <span>
              {t('planDashboard.deviceSharedLabel')} <strong>{formatSafetyAnswer(deviceSafety.deviceShared)}</strong>
            </span>
            <span>•</span>
            <span>
              {t('planDashboard.accountsSharedLabel')} <strong>{formatSafetyAnswer(deviceSafety.accountsOrLocationShared)}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <Link
              to="/digital-safety"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-trust-blue)',
                textDecoration: 'none',
                padding: '2px 8px',
                borderRadius: 'var(--border-radius-xs)',
                backgroundColor: 'var(--color-soft-blue)',
                border: '1px solid var(--color-border-blue)',
              }}
            >
              <SmartphoneIcon size={12} />
              <span>{t('digitalSafety.title')}</span>
            </Link>

            {quietMode && (
              <StatusChip
                label={t('safetyShell.quietModeActive')}
                variant="quiet"
                size="xs"
                icon={<EyeOffIcon size={11} />}
                withDot
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
