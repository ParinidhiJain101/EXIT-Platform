import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import type { PlanNeeds } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';

type NeedKey = keyof PlanNeeds;

const CATEGORY_NAMES: NeedKey[] = [
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

interface SummaryStepProps {
  onGoToStep: (step: number) => void;
}

export const SummaryStep: FC<SummaryStepProps> = ({ onGoToStep }) => {
  const { t } = useTranslation();
  const { planNeeds, quietMode } = useSession();

  const selectedKeys = CATEGORY_NAMES.filter((key) => !!planNeeds[key]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-1)' }}>
          {t('onboarding.summaryStep.title')}
        </h2>
        <p style={{ color: '#486581', fontSize: 'var(--font-size-sm)' }}>
          {t('onboarding.summaryStep.description')}
        </p>
      </div>

      {/* Session & Storage Card */}
      <Card variant="surface" padding="sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-1)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#334E68', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('onboarding.summaryStep.storageStatusLabel')}
          </span>
          <StatusChip label={t('safetyShell.memoryBadge')} variant="memory" size="sm" />
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-deep-ink)', fontWeight: 'var(--font-weight-medium)' }}>
          {t('onboarding.summaryStep.storageStatusValue')}
        </p>
      </Card>

      {/* Quiet Mode Card */}
      <Card variant="default" padding="sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-1)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('onboarding.summaryStep.quietModeStatusLabel')}
          </span>
          <button
            type="button"
            onClick={() => onGoToStep(2)}
            style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-trust-blue)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {t('common.edit')}
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <StatusChip
            label={quietMode ? t('onboarding.summaryStep.quietModeStatusEnabled') : t('onboarding.summaryStep.quietModeStatusDisabled')}
            variant={quietMode ? 'quiet' : 'muted'}
            size="sm"
          />
        </div>
      </Card>

      {/* Selected Needs Card */}
      <Card variant="default" padding="sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('onboarding.summaryStep.selectedNeedsLabel')} ({selectedKeys.length})
          </span>
          <button
            type="button"
            onClick={() => onGoToStep(3)}
            style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-trust-blue)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {t('common.edit')}
          </button>
        </div>

        {selectedKeys.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#64748B', fontStyle: 'italic' }}>
            {t('onboarding.summaryStep.noNeedsSelected')}
          </p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
            {selectedKeys.map((key) => (
              <StatusChip
                key={key}
                label={t(`onboarding.needsStep.categories.${key}.title`)}
                variant="safe"
                size="sm"
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
