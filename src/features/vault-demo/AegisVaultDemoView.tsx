import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { vaultService } from '../../api/mockAdapter';
import type { SyntheticEvidenceTemplate, VaultCapsuleItem } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { Button } from '../../components/Button/Button';
import {
  LockIcon,
  ShieldCheckIcon,
  FileTextIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  RefreshIcon,
} from '../../components/Icons/Icons';

export const AegisVaultDemoView: FC = () => {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<SyntheticEvidenceTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [timeline, setTimeline] = useState<VaultCapsuleItem[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const [tpls, tl] = await Promise.all([
        vaultService.getSyntheticTemplates(),
        vaultService.getTimeline(),
      ]);
      if (isMounted) {
        setTemplates(tpls);
        if (tpls.length > 0) setSelectedTemplateId(tpls[0].id);
        setTimeline(tl);
      }
    }
    void load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePreserve = async () => {
    const template = templates.find((t) => t.id === selectedTemplateId);
    if (!template) return;

    setProcessing(true);
    await vaultService.preserveSyntheticItem(template);
    const updated = await vaultService.getTimeline();
    setTimeline([...updated]);
    setProcessing(false);
  };

  const handleVerify = async (item: VaultCapsuleItem, simulateTamper = false) => {
    const updated = await vaultService.verifyItemIntegrity(item, simulateTamper);
    setTimeline((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  };

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* 1. Hero Header */}
      <div className="page-hero-header" style={{ marginBottom: 'var(--spacing-3)' }}>
        <div className="page-hero-top">
          <div className="page-hero-title-group">
            <h2 className="page-hero-title">{t('vault.title')}</h2>
            <StatusChip label={t('vault.prototypeBadge')} variant="warning" size="xs" withDot />
          </div>

          <StatusChip
            label={t('vault.inMemoryOnly')}
            variant="memory"
            size="sm"
            icon={<ShieldCheckIcon size={13} />}
            withDot
          />
        </div>
        <p className="page-hero-subtitle">{t('vault.subtitle')}</p>
      </div>

      {/* 2. Legal Disclaimer Banner */}
      <Card variant="warning" padding="sm">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
          <span style={{ color: 'var(--color-warm-amber)', marginTop: '2px', flexShrink: 0 }}>
            <AlertTriangleIcon size={16} />
          </span>
          <div style={{ fontSize: 'var(--font-size-xs)', color: '#744210', lineHeight: 1.45 }}>
            <strong style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('vault.legalDisclaimerTitle')}:{' '}
            </strong>
            {t('vault.legalDisclaimerText')}
          </div>
        </div>
      </Card>

      {/* 3. Primary 2-Column Workflow Layout */}
      <div className="desktop-split-layout">
        {/* Left Column: Sequential Secure Workflow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
          {/* Step 1 & 2: Select & Preview */}
          <Card variant="surface" padding="md" style={{ boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-3)' }}>
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: 'var(--border-radius-full)',
                  backgroundColor: 'var(--color-trust-blue)',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                1
              </span>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', margin: 0 }}>
                {t('vault.sandboxTitle')}
              </h3>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
              {t('vault.sandboxSubtitle')}
            </p>

            {/* Template Selection Chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
              {templates.map((tpl) => {
                const isSelected = selectedTemplateId === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    style={{
                      padding: 'var(--spacing-3)',
                      borderRadius: 'var(--border-radius-sm)',
                      border: isSelected ? '1.5px solid var(--color-trust-blue)' : '1px solid var(--color-border-subtle)',
                      backgroundColor: isSelected ? 'var(--color-soft-blue)' : 'var(--color-bg-canvas)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setSelectedTemplateId(tpl.id);
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileTextIcon size={15} style={{ color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-text-secondary)' }} />
                        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
                          {t(tpl.titleKey)}
                        </span>
                      </div>
                      <StatusChip label={tpl.category} variant="memory" size="xs" />
                    </div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0, paddingLeft: '21px', lineHeight: 1.4 }}>
                      {t(tpl.descriptionKey)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Step 2: Content Preview */}
            {selectedTemplate && (
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                  {t('vault.syntheticPreviewLabel')} ({selectedTemplate.fileName}):
                </div>
                <pre
                  style={{
                    backgroundColor: '#0F172A',
                    color: '#E2E8F0',
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '11px',
                    fontFamily: 'var(--font-family-mono)',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {selectedTemplate.syntheticContent}
                </pre>
              </div>
            )}

            {/* Step 3: Secure CTA */}
            <Button
              variant="primary"
              onClick={handlePreserve}
              disabled={processing}
              icon={<LockIcon size={16} />}
              style={{ width: '100%' }}
            >
              {processing ? t('common.loading') : t('vault.preserveButton')}
            </Button>
          </Card>
        </div>

        {/* Right Column: Preserved Timeline & Verification (Step 4) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', margin: 0 }}>
              {t('vault.timelineTitle')} ({timeline.length})
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Tamper-Evident Receipts
            </span>
          </div>

          {timeline.length === 0 ? (
            <Card variant="neutral" padding="lg">
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textAlign: 'center', fontStyle: 'italic', margin: 0 }}>
                {t('vault.noItemsInTimeline')}
              </p>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              {timeline.map((item) => {
                const res = item.verificationResult;
                const isTampered = res?.tampered;
                const isVerified = res?.verified;

                return (
                  <Card
                    key={item.id}
                    variant={isVerified && !isTampered ? 'surface' : isTampered ? 'danger' : 'default'}
                    padding="md"
                    style={{
                      boxShadow: 'var(--shadow-xs)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-3)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                      <div>
                        <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                          <LockIcon size={15} />
                          <span>{item.fileName}</span>
                        </h4>
                        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '2px 0 0' }}>
                          {t('vault.timestampLabel')}: {new Date(item.timestamp).toLocaleTimeString()}
                        </p>
                      </div>

                      <StatusChip
                        label={isVerified && !isTampered ? t('vault.verifiedMatch') : isTampered ? t('vault.tamperMismatch') : t('vault.unverified')}
                        variant={isVerified && !isTampered ? 'safe' : isTampered ? 'essential' : 'muted'}
                        size="xs"
                        icon={isVerified && !isTampered ? <CheckCircleIcon size={11} /> : isTampered ? <AlertCircleIcon size={11} /> : undefined}
                        withDot
                      />
                    </div>

                    {/* Cryptographic Receipts Box */}
                    <div
                      style={{
                        backgroundColor: 'var(--color-bg-subtle)',
                        padding: 'var(--spacing-2) var(--spacing-3)',
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: '11px',
                        fontFamily: 'var(--font-family-mono)',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                      }}
                    >
                      <div>
                        <strong style={{ color: 'var(--color-text-primary)' }}>SHA-256: </strong>
                        <span style={{ wordBreak: 'break-all' }}>{item.plainHash}</span>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--color-text-primary)' }}>AES-GCM (IV): </strong>
                        <span>{item.ivHex}</span>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--color-text-primary)' }}>Ciphertext: </strong>
                        <span style={{ wordBreak: 'break-all' }}>{item.ciphertextBase64.slice(0, 40)}...</span>
                      </div>
                    </div>

                    {/* Verification Result Callout */}
                    {res && (
                      <div
                        style={{
                          backgroundColor: isVerified && !isTampered ? 'var(--color-soft-green)' : 'var(--color-soft-rose)',
                          borderLeft: `3px solid ${isVerified && !isTampered ? 'var(--color-safe-green)' : 'var(--color-muted-red)'}`,
                          padding: 'var(--spacing-2) var(--spacing-3)',
                          borderRadius: '0 var(--border-radius-xs) var(--border-radius-xs) 0',
                          fontSize: 'var(--font-size-xs)',
                          color: isVerified && !isTampered ? '#065F46' : '#991B1B',
                          lineHeight: 1.4,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', fontWeight: 'var(--font-weight-semibold)' }}>
                          {isVerified && !isTampered ? (
                            <CheckCircleIcon size={14} style={{ color: 'var(--color-safe-green)' }} />
                          ) : (
                            <AlertCircleIcon size={14} style={{ color: 'var(--color-muted-red)' }} />
                          )}
                          <span>{isVerified && !isTampered ? t('vault.integrityValid') : t('vault.integrityFailed')}</span>
                        </div>
                        <p style={{ margin: 0 }}>
                          {isVerified && !isTampered
                            ? t('vault.integrityValidDetails')
                            : t('vault.integrityTamperDetails', {
                                computed: res.computedHash.slice(0, 16) + '...',
                                expected: res.expectedHash.slice(0, 16) + '...',
                              })}
                        </p>
                      </div>
                    )}

                    {/* Actions: Live Verify vs Simulate Tamper */}
                    <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: '2px', flexWrap: 'wrap' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleVerify(item, false)}
                        icon={<RefreshIcon size={13} />}
                        style={{ flex: 1 }}
                      >
                        {t('vault.verifyIntegrityBtn')}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerify(item, true)}
                        style={{ color: 'var(--color-muted-red)', borderColor: 'var(--color-border-red)', flex: 1 }}
                        icon={<AlertTriangleIcon size={13} />}
                      >
                        {t('vault.simulateTamperBtn')}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
