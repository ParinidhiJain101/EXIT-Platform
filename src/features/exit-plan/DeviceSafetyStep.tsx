import type { FC, CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { EyeOffIcon, EyeIcon, AlertCircleIcon } from '../../components/Icons/Icons';

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
    minHeight: '38px',
    padding: 'var(--spacing-2) var(--spacing-3)',
    borderRadius: 'var(--border-radius-sm)',
    border: isSelected ? '1.5px solid var(--color-trust-blue)' : '1px solid var(--color-border-subtle)',
    backgroundColor: isSelected ? 'var(--color-soft-blue)' : 'var(--color-bg-canvas)',
    color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-text-secondary)',
    fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
    fontSize: 'var(--font-size-sm)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
  });

  return (
    <Card variant="default" padding="md" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: '3px' }}>
          {title}
        </h3>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{description}</p>
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
        <h2
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: 'var(--spacing-1)',
          }}
        >
          {t('onboarding.deviceSafetyStep.title')}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
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

      {/* Quiet Mode Recommendation Notice */}
      {isQuietRecommended && (
        <Card variant="warning" padding="sm">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
            <span style={{ color: 'var(--color-warm-amber)', marginTop: '1px' }}>
              <AlertCircleIcon size={16} />
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: '3px' }}>
                <StatusChip
                  label={t('onboarding.deviceSafetyStep.quietModeAutoNoticeTitle')}
                  variant="quiet"
                  size="xs"
                  icon={<EyeOffIcon size={11} />}
                  withDot
                />
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: '#744210', lineHeight: 1.4 }}>
                {t('onboarding.deviceSafetyStep.quietModeAutoNoticeDesc')}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Manual Quiet Mode Toggle Card */}
      <Card
        variant="surface"
        padding="md"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--spacing-3)',
        }}
      >
        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
              {t('onboarding.deviceSafetyStep.quietModeManualToggleLabel')}
            </span>
            {quietMode && (
              <StatusChip
                label={t('safetyShell.quietModeActive')}
                variant="quiet"
                size="xs"
                withDot
              />
            )}
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            {t('onboarding.deviceSafetyStep.quietModeManualToggleDesc')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setQuietMode(!quietMode)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: quietMode ? 'var(--color-quiet-purple)' : 'var(--color-bg-canvas)',
            color: quietMode ? 'white' : 'var(--color-text-secondary)',
            border: `1.5px solid ${quietMode ? 'var(--color-quiet-purple)' : 'var(--color-border-default)'}`,
            padding: 'var(--spacing-2) var(--spacing-4)',
            borderRadius: 'var(--border-radius-full)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-xs)',
            transition: 'all var(--transition-fast)',
          }}
          aria-pressed={quietMode}
        >
          {quietMode ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
          <span>{quietMode ? t('common.yes') : t('common.no')}</span>
        </button>
      </Card>
    </div>
  );
};
