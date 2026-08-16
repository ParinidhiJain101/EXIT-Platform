import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { ShieldCheckIcon, LockIcon, CheckCircleIcon } from '../../components/Icons/Icons';

export const PrivacyStep: FC = () => {
  const { t } = useTranslation();

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
          {t('onboarding.privacyStep.title')}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
          {t('onboarding.privacyStep.description')}
        </p>
      </div>

      {/* Default Active Option: Use without saving */}
      <Card
        variant="surface"
        style={{
          border: '2px solid var(--color-trust-blue)',
          position: 'relative',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <div
              style={{
                color: 'var(--color-trust-blue)',
                display: 'inline-flex',
                alignItems: 'center',
              }}
              aria-hidden="true"
            >
              <CheckCircleIcon size={20} />
            </div>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
              {t('onboarding.privacyStep.memoryOptionTitle')}
            </h3>
          </div>
          <StatusChip label={t('onboarding.privacyStep.memoryOptionBadge')} variant="safe" size="sm" withDot />
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, paddingLeft: '28px' }}>
          {t('onboarding.privacyStep.memoryOptionDesc')}
        </p>
      </Card>

      {/* Deferred Option: Save locally (disabled/informational) */}
      <Card variant="neutral" style={{ opacity: 0.85 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <div
              style={{
                color: 'var(--color-text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
              }}
              aria-hidden="true"
            >
              <LockIcon size={18} />
            </div>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)' }}>
              {t('onboarding.privacyStep.localOptionTitle')}
            </h3>
          </div>
          <StatusChip label={t('onboarding.privacyStep.localOptionBadge')} variant="muted" size="sm" />
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.5, paddingLeft: '26px' }}>
          {t('onboarding.privacyStep.localOptionDesc')}
        </p>
      </Card>

      {/* Privacy Guarantees Card */}
      <Card variant="default" padding="md">
        <h4
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
          }}
        >
          <ShieldCheckIcon size={16} />
          <span>{t('onboarding.privacyStep.privacyGuaranteesTitle')}</span>
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
            <CheckCircleIcon size={14} style={{ color: 'var(--color-safe-green)', marginTop: '2px', flexShrink: 0 }} />
            <span>{t('onboarding.privacyStep.guarantee1')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
            <CheckCircleIcon size={14} style={{ color: 'var(--color-safe-green)', marginTop: '2px', flexShrink: 0 }} />
            <span>{t('onboarding.privacyStep.guarantee2')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
            <CheckCircleIcon size={14} style={{ color: 'var(--color-safe-green)', marginTop: '2px', flexShrink: 0 }} />
            <span>{t('onboarding.privacyStep.guarantee3')}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
