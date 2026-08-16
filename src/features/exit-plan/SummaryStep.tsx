import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import type { PlanNeeds } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { ShieldCheckIcon, EyeOffIcon, DatabaseIcon, CheckCircleIcon } from '../../components/Icons/Icons';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      <div>
        <h2
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: 'var(--spacing-1)',
          }}
        >
          {t('onboarding.summaryStep.title')}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
          {t('onboarding.summaryStep.description')}
        </p>
      </div>

      {/* Session & Storage Card */}
      <Card variant="surface" padding="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <span style={{ color: 'var(--color-trust-blue)' }}>
              <DatabaseIcon size={16} />
            </span>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-trust-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('onboarding.summaryStep.storageStatusLabel')}
            </span>
          </div>
          <StatusChip label={t('safetyShell.memoryBadge')} variant="memory" size="xs" withDot />
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-medium)', lineHeight: 1.4 }}>
          {t('onboarding.summaryStep.storageStatusValue')}
        </p>
      </Card>

      {/* Quiet Mode Card */}
      <Card variant="default" padding="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>
              <EyeOffIcon size={16} />
            </span>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('onboarding.summaryStep.quietModeStatusLabel')}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(2)}
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-trust-blue)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '2px 6px',
            }}
          >
            {t('common.edit')}
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <StatusChip
            label={quietMode ? t('onboarding.summaryStep.quietModeStatusEnabled') : t('onboarding.summaryStep.quietModeStatusDisabled')}
            variant={quietMode ? 'quiet' : 'muted'}
            size="sm"
            withDot
          />
        </div>
      </Card>

      {/* Selected Needs Card */}
      <Card variant="default" padding="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>
              <ShieldCheckIcon size={16} />
            </span>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('onboarding.summaryStep.selectedNeedsLabel')} ({selectedKeys.length})
            </span>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(3)}
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-trust-blue)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '2px 6px',
            }}
          >
            {t('common.edit')}
          </button>
        </div>

        {selectedKeys.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
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
                icon={<CheckCircleIcon size={12} />}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
