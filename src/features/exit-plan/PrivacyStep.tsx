import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';

export const PrivacyStep: FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-1)' }}>
          {t('onboarding.privacyStep.title')}
        </h2>
        <p style={{ color: '#486581', fontSize: 'var(--font-size-sm)' }}>
          {t('onboarding.privacyStep.description')}
        </p>
      </div>

      {/* Default Active Option: Use without saving */}
      <Card variant="surface" style={{ border: '2px solid var(--color-trust-blue)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-2)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)' }}>
            {t('onboarding.privacyStep.memoryOptionTitle')}
          </h3>
          <StatusChip label={t('onboarding.privacyStep.memoryOptionBadge')} variant="safe" size="sm" />
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#334E68', lineHeight: 1.4 }}>
          {t('onboarding.privacyStep.memoryOptionDesc')}
        </p>
      </Card>

      {/* Deferred Option: Save locally (disabled/informational) */}
      <Card variant="neutral" style={{ opacity: 0.85 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-2)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', color: '#627D98' }}>
            {t('onboarding.privacyStep.localOptionTitle')}
          </h3>
          <StatusChip label={t('onboarding.privacyStep.localOptionBadge')} variant="muted" size="sm" />
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#627D98', lineHeight: 1.4 }}>
          {t('onboarding.privacyStep.localOptionDesc')}
        </p>
      </Card>

      {/* Privacy Guarantees Card */}
      <Card variant="default" padding="sm" style={{ backgroundColor: '#F8FAFC' }}>
        <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-2)' }}>
          {t('onboarding.privacyStep.privacyGuaranteesTitle')}
        </h4>
        <ul style={{ paddingLeft: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', fontSize: 'var(--font-size-xs)', color: '#486581' }}>
          <li>{t('onboarding.privacyStep.guarantee1')}</li>
          <li>{t('onboarding.privacyStep.guarantee2')}</li>
          <li>{t('onboarding.privacyStep.guarantee3')}</li>
        </ul>
      </Card>
    </div>
  );
};
