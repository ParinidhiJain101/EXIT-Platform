import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import type { PlanNeeds } from '../../api/types';
import { ExitPlanOnboarding } from './ExitPlanOnboarding';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { StatusChip } from '../../components/StatusChip/StatusChip';

type NeedKey = keyof PlanNeeds;

const CATEGORY_KEYS: NeedKey[] = [
  'communicationSafety',
  'documents',
  'money',
  'housing',
  'children',
  'health',
  'legal',
  'digitalSafety',
  'work',
];

export const ExitPlanHome: FC = () => {
  const { t } = useTranslation();
  const {
    onboardingComplete,
    planNeeds,
    deviceSafety,
    quietMode,
    resetOnboarding,
  } = useSession();

  if (!onboardingComplete) {
    return <ExitPlanOnboarding />;
  }

  const selectedNeeds = CATEGORY_KEYS.filter((key) => !!planNeeds[key]);

  const formatSafetyAnswer = (val: boolean | null): string => {
    if (val === true) return t('common.yes');
    if (val === false) return t('common.no');
    return t('common.unsure');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)' }}>
            {t('planDashboard.title')}
          </h2>
          <StatusChip label={t('safetyShell.memoryBadge')} variant="memory" size="sm" />
        </div>
        <p style={{ color: '#486581', fontSize: 'var(--font-size-sm)' }}>
          {t('planDashboard.subtitle')}
        </p>
      </div>

      {/* Selected Needs Summary */}
      <Card variant="surface">
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-3)' }}>
          {t('planDashboard.areasSelectedHeading', { count: selectedNeeds.length })}
        </h3>

        {selectedNeeds.length === 0 ? (
          <div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: '#486581' }}>
              {t('planDashboard.noAreasSelectedDesc')}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
            {selectedNeeds.map((key) => (
              <StatusChip
                key={key}
                label={t(`onboarding.needsStep.categories.${key}.title`)}
                variant="safe"
              />
            ))}
          </div>
        )}
      </Card>

      {/* Device Safety Status */}
      <Card variant="default">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)' }}>
            {t('planDashboard.deviceSafetyHeading')}
          </h3>
          {quietMode && <StatusChip label={t('safetyShell.quietModeActive')} variant="quiet" size="sm" />}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: '#334E68' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('planDashboard.notificationsSafeLabel')}</span>
            <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{formatSafetyAnswer(deviceSafety.notificationsSafe)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('planDashboard.deviceSharedLabel')}</span>
            <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{formatSafetyAnswer(deviceSafety.deviceShared)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('planDashboard.accountsSharedLabel')}</span>
            <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{formatSafetyAnswer(deviceSafety.accountsOrLocationShared)}</span>
          </div>
        </div>
      </Card>

      {/* Milestone note card */}
      <Card variant="highlight" padding="sm">
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-safe-green)', fontWeight: 'var(--font-weight-medium)' }}>
          ✓ {t('planDashboard.milestoneNotice')}
        </p>
      </Card>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-2)' }}>
        <Button
          variant="outline"
          onClick={resetOnboarding}
          style={{ flex: 1 }}
        >
          {t('planDashboard.resetPlanButton')}
        </Button>
      </div>
    </div>
  );
};
