import { useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { ShieldCheckIcon, LockIcon, CheckCircleIcon, SparklesIcon, CheckIcon } from '../../components/Icons/Icons';

export const PrivacyStep: FC = () => {
  const { t } = useTranslation();
  const [demoVaultActive, setDemoVaultActive] = useState(false);

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
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, paddingLeft: '28px', margin: 0 }}>
          {t('onboarding.privacyStep.memoryOptionDesc')}
        </p>
      </Card>

      {/* Interactive Synthetic Demo Option: Encrypted Local Vault */}
      <Card
        variant="default"
        padding="md"
        style={{
          border: demoVaultActive ? '1.5px solid var(--color-trust-blue)' : '1px solid var(--color-border-subtle)',
          transition: 'all var(--transition-fast)',
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
              <LockIcon size={18} />
            </div>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
              {t('onboarding.privacyStep.localOptionTitle')}
            </h3>
          </div>
          <StatusChip label={t('onboarding.privacyStep.localOptionBadge')} variant="warning" size="xs" withDot />
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, paddingLeft: '26px', marginBottom: 'var(--spacing-3)' }}>
          {t('onboarding.privacyStep.localOptionDesc')}
        </p>

        <div style={{ paddingLeft: '26px' }}>
          <button
            type="button"
            onClick={() => setDemoVaultActive(!demoVaultActive)}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--border-radius-xs)',
              border: '1px solid var(--color-border-blue)',
              backgroundColor: demoVaultActive ? 'var(--color-soft-green)' : 'var(--color-soft-blue)',
              color: demoVaultActive ? '#065F46' : 'var(--color-trust-blue)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {demoVaultActive ? <CheckIcon size={13} /> : <SparklesIcon size={13} />}
            <span>{demoVaultActive ? 'Simulated PBKDF2 + AES-GCM Keystore Active' : 'Test Synthetic Keystore Simulation'}</span>
          </button>

          {demoVaultActive && (
            <div
              style={{
                marginTop: 'var(--spacing-2)',
                padding: 'var(--spacing-2) var(--spacing-3)',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--border-radius-xs)',
                fontSize: '11.5px',
                fontFamily: 'var(--font-family-mono)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {t('onboarding.privacyStep.localOptionDemoDetails')}
            </div>
          )}
        </div>
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
