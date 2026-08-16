import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { consentService } from '../../api/mockAdapter';
import type { ConsentState } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { Button } from '../../components/Button/Button';
import {
  ShieldIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  CheckIcon,
  XIcon,
  LockIcon,
  ArrowRightIcon,
} from '../../components/Icons/Icons';

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

  const airlockStages = [
    { num: '1', title: t('consent.airlockStage1Title'), sub: t('consent.airlockStage1Sub') },
    { num: '2', title: t('consent.airlockStage2Title'), sub: t('consent.airlockStage2Sub') },
    { num: '3', title: t('consent.airlockStage3Title'), sub: t('consent.airlockStage3Sub') },
    { num: '4', title: t('consent.airlockStage4Title'), sub: t('consent.airlockStage4Sub') },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* 1. Hero Header */}
      <div className="page-hero-header" style={{ marginBottom: 'var(--spacing-3)' }}>
        <div className="page-hero-top">
          <div className="page-hero-title-group">
            <h2 className="page-hero-title">{t('consent.title')}</h2>
            <StatusChip
              label={consentState.optedIn ? t('consent.optedInBadge') : t('consent.privateBadge')}
              variant={consentState.optedIn ? 'warning' : 'safe'}
              size="xs"
              icon={consentState.optedIn ? <ShieldCheckIcon size={12} /> : <LockIcon size={12} />}
              withDot
            />
          </div>

          <StatusChip
            label={t('safetyShell.memoryBadge')}
            variant="memory"
            size="sm"
            icon={<ShieldCheckIcon size={13} />}
            withDot
          />
        </div>
        <p className="page-hero-subtitle">{t('consent.subtitle')}</p>
      </div>

      {/* 2. One-Way Airlock UX Visualization */}
      <Card variant="surface" padding="md" style={{ boxShadow: 'var(--shadow-xs)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-1)' }}>
          <ShieldIcon size={18} />
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', margin: 0 }}>
            {t('consent.airlockTitle')}
          </h3>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)', lineHeight: 1.45 }}>
          {t('consent.airlockDescription')}
        </p>

        {/* Step-by-step Airlock Flow Pipeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--spacing-3)',
            fontSize: 'var(--font-size-xs)',
          }}
        >
          {airlockStages.map((stg, idx) => (
            <div
              key={stg.num}
              style={{
                backgroundColor: 'var(--color-bg-canvas)',
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: 'var(--border-radius-xs)',
                      backgroundColor: 'var(--color-soft-blue)',
                      color: 'var(--color-trust-blue)',
                      border: '1px solid var(--color-border-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 'var(--font-weight-bold)',
                      flexShrink: 0,
                    }}
                  >
                    {stg.num}
                  </span>
                  <span>{stg.title}</span>
                </div>
                {idx < airlockStages.length - 1 && (
                  <span style={{ color: 'var(--color-text-faint)', display: 'inline-flex' }}>
                    <ArrowRightIcon size={14} />
                  </span>
                )}
              </div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '11.5px', marginTop: '3px', paddingLeft: '28px' }}>
                {stg.sub}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Allowed Synthetic Fields vs Forbidden Fields Comparison */}
      <div className="responsive-grid-2col">
        {/* Allowed Granular Fields */}
        <Card variant="default" padding="md" style={{ boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', margin: 0 }}>
              {t('consent.allowedFieldsHeading')}
            </h3>
            <StatusChip label={t('consent.explicitOptIn')} variant="safe" size="xs" withDot />
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)', lineHeight: 1.4 }}>
            {t('consent.allowedFieldsSub')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            {[
              { key: 'shareHarmCategory' as const, titleKey: 'consent.fieldHarmCategoryTitle', descKey: 'consent.fieldHarmCategoryDesc' },
              { key: 'shareBroadRegion' as const, titleKey: 'consent.fieldBroadRegionTitle', descKey: 'consent.fieldBroadRegionDesc' },
              { key: 'shareServiceNeed' as const, titleKey: 'consent.fieldServiceNeedTitle', descKey: 'consent.fieldServiceNeedDesc' },
              { key: 'shareQuarterYear' as const, titleKey: 'consent.fieldQuarterTitle', descKey: 'consent.fieldQuarterDesc' },
            ].map(({ key, titleKey, descKey }) => {
              const isChecked = consentState[key];
              return (
                <div
                  key={key}
                  onClick={() => handleToggle(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-3)',
                    cursor: 'pointer',
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: isChecked ? 'var(--color-soft-blue)' : 'var(--color-bg-subtle)',
                    border: `1px solid ${isChecked ? 'var(--color-border-blue)' : 'transparent'}`,
                    transition: 'all var(--transition-fast)',
                  }}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      handleToggle(key);
                    }
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: 'var(--border-radius-xs)',
                      border: isChecked ? '2px solid var(--color-trust-blue)' : '1.5px solid var(--color-border-default)',
                      backgroundColor: isChecked ? 'var(--color-trust-blue)' : 'var(--color-bg-canvas)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px',
                      flexShrink: 0,
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {isChecked && <CheckIcon size={12} />}
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-xs)' }}>
                      {t(titleKey)}:{' '}
                    </strong>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-xs)' }}>
                      {t(descKey)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Strictly Forbidden Fields */}
        <Card variant="neutral" padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-muted-red)', margin: 0 }}>
              {t('consent.forbiddenFieldsHeading')}
            </h3>
            <StatusChip label={t('consent.neverCollected')} variant="essential" size="xs" withDot />
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)', lineHeight: 1.4 }}>
            {t('consent.forbiddenFieldsSub')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            {[
              t('consent.forbidden1'),
              t('consent.forbidden2'),
              t('consent.forbidden3'),
              t('consent.forbidden4'),
              t('consent.forbidden5'),
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--color-muted-red)', marginTop: '2px', flexShrink: 0 }}>
                  <XIcon size={13} />
                </span>
                <span style={{ lineHeight: 1.4 }}>{text}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Status Feedback Callout */}
      {feedbackMsg && (
        <Card variant="highlight" padding="sm">
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#065F46', fontWeight: 'var(--font-weight-semibold)', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
            <CheckCircleIcon size={14} />
            <span>{feedbackMsg}</span>
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
          icon={<ShieldCheckIcon size={16} />}
        >
          {t('consent.savePreferencesButton')}
        </Button>
      </div>

      {/* Withdrawal Receipt Notice */}
      {consentState.updatedAt && (
        <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-text-faint)' }}>
          {t('consent.lastUpdatedReceipt')}: {new Date(consentState.updatedAt).toLocaleString()} ({t('consent.versionLabel')}: {consentState.version})
        </div>
      )}
    </div>
  );
};
