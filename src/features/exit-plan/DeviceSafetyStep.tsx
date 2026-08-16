import type { FC, CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { Button } from '../../components/Button/Button';

type SafetyAnswer = boolean | null;

interface QuestionCardProps {
  title: string;
  description: string;
  value: SafetyAnswer;
  onChange: (val: boolean | null) => void;
}

const QuestionCard: FC<QuestionCardProps> = ({ title, description, value, onChange }) => {
  const { t } = useTranslation();

  const getButtonStyle = (isSelected: boolean): CSSProperties => ({
    flex: 1,
    padding: 'var(--spacing-2) var(--spacing-3)',
    borderRadius: 'var(--border-radius-sm)',
    border: isSelected ? '2px solid var(--color-trust-blue)' : '1px solid #D2D6DC',
    backgroundColor: isSelected ? 'var(--color-soft-blue)' : 'var(--color-white)',
    color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-deep-ink)',
    fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
    fontSize: 'var(--font-size-sm)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  });

  return (
    <Card variant="default" padding="sm" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: '2px' }}>
          {title}
        </h3>
        <p style={{ fontSize: 'var(--font-size-xs)', color: '#486581' }}>{description}</p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }} role="group" aria-label={title}>
        <button
          type="button"
          style={getButtonStyle(value === true)}
          onClick={() => onChange(true)}
          aria-pressed={value === true}
        >
          {t('common.yes')}
        </button>
        <button
          type="button"
          style={getButtonStyle(value === false)}
          onClick={() => onChange(false)}
          aria-pressed={value === false}
        >
          {t('common.no')}
        </button>
        <button
          type="button"
          style={getButtonStyle(value === null)}
          onClick={() => onChange(null)}
          aria-pressed={value === null}
        >
          {t('common.unsure')}
        </button>
      </div>
    </Card>
  );
};

export const DeviceSafetyStep: FC = () => {
  const { t } = useTranslation();
  const { deviceSafety, setDeviceSafety, quietMode, setQuietMode } = useSession();

  const isQuietRecommended =
    deviceSafety.deviceShared === true ||
    deviceSafety.notificationsSafe === false ||
    deviceSafety.accountsOrLocationShared === true;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-1)' }}>
          {t('onboarding.deviceSafetyStep.title')}
        </h2>
        <p style={{ color: '#486581', fontSize: 'var(--font-size-sm)' }}>
          {t('onboarding.deviceSafetyStep.description')}
        </p>
      </div>

      <QuestionCard
        title={t('onboarding.deviceSafetyStep.q1Title')}
        description={t('onboarding.deviceSafetyStep.q1Desc')}
        value={deviceSafety.notificationsSafe}
        onChange={(val) => setDeviceSafety({ notificationsSafe: val })}
      />

      <QuestionCard
        title={t('onboarding.deviceSafetyStep.q2Title')}
        description={t('onboarding.deviceSafetyStep.q2Desc')}
        value={deviceSafety.deviceShared}
        onChange={(val) => setDeviceSafety({ deviceShared: val })}
      />

      <QuestionCard
        title={t('onboarding.deviceSafetyStep.q3Title')}
        description={t('onboarding.deviceSafetyStep.q3Desc')}
        value={deviceSafety.accountsOrLocationShared}
        onChange={(val) => setDeviceSafety({ accountsOrLocationShared: val })}
      />

      {/* Quiet Mode Recommendation or Status Box */}
      {isQuietRecommended && (
        <Card variant="warning" padding="sm">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: '4px' }}>
            <StatusChip label={t('onboarding.deviceSafetyStep.quietModeAutoNoticeTitle')} variant="quiet" size="sm" />
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#744210', lineHeight: 1.4 }}>
            {t('onboarding.deviceSafetyStep.quietModeAutoNoticeDesc')}
          </p>
        </Card>
      )}

      {/* Manual Quiet Mode Toggle */}
      <Card variant="surface" padding="sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-deep-ink)' }}>
              {t('onboarding.deviceSafetyStep.quietModeManualToggleLabel')}
            </span>
            {quietMode && <StatusChip label={t('safetyShell.quietModeActive')} variant="quiet" size="sm" />}
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#486581', marginTop: '2px' }}>
            {t('onboarding.deviceSafetyStep.quietModeManualToggleDesc')}
          </p>
        </div>
        <Button
          variant={quietMode ? 'primary' : 'outline'}
          style={{ minWidth: '80px', padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--font-size-xs)' }}
          onClick={() => setQuietMode(!quietMode)}
          aria-pressed={quietMode}
        >
          {quietMode ? t('common.yes') : t('common.no')}
        </Button>
      </Card>
    </div>
  );
};
