import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { consentService } from '../../api/mockAdapter';
import type { ConsentState } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { Button } from '../../components/Button/Button';

export const ConsentGatewayView: FC = () => {
  const { t } = useTranslation();
  const [consentState, setConsentState] = useState<ConsentState>({
    optedIn: false,
    shareHarmCategory: false,
    shareBroadRegion: false,
    shareServiceNeed: false,
    shareQuarterYear: false,
    updatedAt: null,
    version: '1.0-synthetic',
  });
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const current = await consentService.getConsentState();
      if (isMounted) setConsentState(current);
    }
    void load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggle = (field: keyof Omit<ConsentState, 'updatedAt' | 'version' | 'optedIn'>) => {
    setConsentState((prev) => {
      const updatedField = !prev[field];
      const updated = {
        ...prev,
        [field]: updatedField,
      };
      // If any field is checked, optedIn is true
      updated.optedIn =
        updated.shareHarmCategory ||
        updated.shareBroadRegion ||
        updated.shareServiceNeed ||
        updated.shareQuarterYear;
      return updated;
    });
  };

  const handleSave = async () => {
    const updated = await consentService.updateConsent(consentState);
    setConsentState(updated);
    setFeedbackMsg(t('consent.saveSuccess'));
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleKeepPrivate = async () => {
    const updated = await consentService.withdrawConsent();
    setConsentState(updated);
    setFeedbackMsg(t('consent.privateSuccess'));
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', margin: 0 }}>
            {t('consent.title')}
          </h2>
          <StatusChip
            label={consentState.optedIn ? t('consent.optedInBadge') : t('consent.privateBadge')}
            variant={consentState.optedIn ? 'warning' : 'safe'}
            size="sm"
          />
        </div>
        <p style={{ color: '#486581', fontSize: 'var(--font-size-sm)' }}>
          {t('consent.subtitle')}
        </p>
      </div>

      {/* One-Way Airlock UX Visualization */}
      <Card variant="surface" padding="md">
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-2)' }}>
          🛡️ {t('consent.airlockTitle')}
        </h3>
        <p style={{ fontSize: 'var(--font-size-xs)', color: '#334E68', marginBottom: 'var(--spacing-3)', lineHeight: 1.4 }}>
          {t('consent.airlockDescription')}
        </p>

        {/* Step-by-step Airlock Flow Pipeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--spacing-2)',
            fontSize: 'var(--font-size-xs)',
          }}
        >
          <div style={{ backgroundColor: 'var(--color-white)', padding: 'var(--spacing-2) var(--spacing-3)', borderRadius: 'var(--border-radius-sm)', border: '1px solid #D0E1FD' }}>
            <div style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-trust-blue)' }}>1. Survivor Plan</div>
            <div style={{ color: '#64748B', fontSize: '11px' }}>100% In-Memory Local</div>
          </div>
          <div style={{ backgroundColor: 'var(--color-white)', padding: 'var(--spacing-2) var(--spacing-3)', borderRadius: 'var(--border-radius-sm)', border: '1px solid #D0E1FD' }}>
            <div style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-trust-blue)' }}>2. Consent Gateway</div>
            <div style={{ color: '#64748B', fontSize: '11px' }}>Granular Field Filtering</div>
          </div>
          <div style={{ backgroundColor: 'var(--color-white)', padding: 'var(--spacing-2) var(--spacing-3)', borderRadius: 'var(--border-radius-sm)', border: '1px solid #D0E1FD' }}>
            <div style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-trust-blue)' }}>3. One-Way Airlock</div>
            <div style={{ color: '#64748B', fontSize: '11px' }}>De-identify & k ≥ 10 Gate</div>
          </div>
          <div style={{ backgroundColor: 'var(--color-white)', padding: 'var(--spacing-2) var(--spacing-3)', borderRadius: 'var(--border-radius-sm)', border: '1px solid #D0E1FD' }}>
            <div style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-trust-blue)' }}>4. LIVEGENDER</div>
            <div style={{ color: '#64748B', fontSize: '11px' }}>Aggregates Only</div>
          </div>
        </div>
      </Card>

      {/* Allowed Synthetic Fields vs Forbidden Fields Comparison */}
      <div className="responsive-grid-2col">
        {/* Allowed Granular Fields */}
        <Card variant="default" padding="md" style={{ border: '1px solid #CBD5E1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)' }}>
              {t('consent.allowedFieldsHeading')}
            </h3>
            <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 'bold' }}>✓ Explicit Opt-in</span>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#486581', marginBottom: 'var(--spacing-3)' }}>
            {t('consent.allowedFieldsSub')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)', cursor: 'pointer', fontSize: 'var(--font-size-xs)' }}>
              <input
                type="checkbox"
                checked={consentState.shareHarmCategory}
                onChange={() => handleToggle('shareHarmCategory')}
                style={{ marginTop: '2px', accentColor: 'var(--color-trust-blue)' }}
              />
              <div>
                <strong style={{ color: 'var(--color-deep-ink)' }}>{t('consent.fieldHarmCategoryTitle')}: </strong>
                <span style={{ color: '#475569' }}>{t('consent.fieldHarmCategoryDesc')}</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)', cursor: 'pointer', fontSize: 'var(--font-size-xs)' }}>
              <input
                type="checkbox"
                checked={consentState.shareBroadRegion}
                onChange={() => handleToggle('shareBroadRegion')}
                style={{ marginTop: '2px', accentColor: 'var(--color-trust-blue)' }}
              />
              <div>
                <strong style={{ color: 'var(--color-deep-ink)' }}>{t('consent.fieldBroadRegionTitle')}: </strong>
                <span style={{ color: '#475569' }}>{t('consent.fieldBroadRegionDesc')}</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)', cursor: 'pointer', fontSize: 'var(--font-size-xs)' }}>
              <input
                type="checkbox"
                checked={consentState.shareServiceNeed}
                onChange={() => handleToggle('shareServiceNeed')}
                style={{ marginTop: '2px', accentColor: 'var(--color-trust-blue)' }}
              />
              <div>
                <strong style={{ color: 'var(--color-deep-ink)' }}>{t('consent.fieldServiceNeedTitle')}: </strong>
                <span style={{ color: '#475569' }}>{t('consent.fieldServiceNeedDesc')}</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)', cursor: 'pointer', fontSize: 'var(--font-size-xs)' }}>
              <input
                type="checkbox"
                checked={consentState.shareQuarterYear}
                onChange={() => handleToggle('shareQuarterYear')}
                style={{ marginTop: '2px', accentColor: 'var(--color-trust-blue)' }}
              />
              <div>
                <strong style={{ color: 'var(--color-deep-ink)' }}>{t('consent.fieldQuarterTitle')}: </strong>
                <span style={{ color: '#475569' }}>{t('consent.fieldQuarterDesc')}</span>
              </div>
            </label>
          </div>
        </Card>

        {/* Strictly Forbidden Fields */}
        <Card variant="neutral" padding="md" style={{ border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: '#991B1B' }}>
              {t('consent.forbiddenFieldsHeading')}
            </h3>
            <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: 'bold' }}>❌ Never Collected</span>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#64748B', marginBottom: 'var(--spacing-3)' }}>
            {t('consent.forbiddenFieldsSub')}
          </p>

          <ul style={{ paddingLeft: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', fontSize: 'var(--font-size-xs)', color: '#475569' }}>
            <li>{t('consent.forbidden1')}</li>
            <li>{t('consent.forbidden2')}</li>
            <li>{t('consent.forbidden3')}</li>
            <li>{t('consent.forbidden4')}</li>
            <li>{t('consent.forbidden5')}</li>
          </ul>
        </Card>
      </div>

      {/* Status Feedback Callout */}
      {feedbackMsg && (
        <Card variant="highlight" padding="sm">
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#065F46', fontWeight: 'var(--font-weight-semibold)' }}>
            ✓ {feedbackMsg}
          </p>
        </Card>
      )}

      {/* Actions: Save Consent vs Keep Everything Private / Withdraw */}
      <div className="responsive-button-row">
        <Button
          variant="outline"
          onClick={handleKeepPrivate}
          style={{ flex: 1 }}
        >
          {t('consent.keepPrivateButton')}
        </Button>

        <Button
          variant="primary"
          onClick={handleSave}
          style={{ flex: 1 }}
        >
          {t('consent.savePreferencesButton')}
        </Button>
      </div>

      {/* Withdrawal Receipt Notice */}
      {consentState.updatedAt && (
        <div style={{ textAlign: 'center', fontSize: '11px', color: '#94A3B8' }}>
          {t('consent.lastUpdatedReceipt')}: {new Date(consentState.updatedAt).toLocaleString()} ({t('consent.versionLabel')}: {consentState.version})
        </div>
      )}
    </div>
  );
};
