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
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <h2
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {t('vault.title')}
          </h2>
          <StatusChip label={t('vault.prototypeBadge')} variant="memory" size="xs" withDot />
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {t('vault.subtitle')}
        </p>
      </div>

      {/* Legal & Prototype Disclaimer Banner */}
      <Card variant="warning" padding="sm">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
          <span style={{ color: 'var(--color-warm-amber)', marginTop: '1px' }}>
            <AlertTriangleIcon size={16} />
          </span>
          <div>
            <h4 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: '#744210', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
              {t('vault.legalDisclaimerTitle')}
            </h4>
            <p style={{ fontSize: 'var(--font-size-xs)', color: '#744210', lineHeight: 1.4 }}>
              {t('vault.legalDisclaimerText')}
            </p>
          </div>
        </div>
      </Card>

      {/* Preservation Sandbox Card */}
      <Card variant="surface" padding="md">
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-1)' }}>
          {t('vault.sandboxTitle')}
        </h3>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
          {t('vault.sandboxSubtitle')}
        </p>

        {/* Template Select Grid */}
        <div className="responsive-grid-2col" style={{ marginBottom: 'var(--spacing-4)' }}>
          {templates.map((tpl) => {
            const isSelected = selectedTemplateId === tpl.id;
            return (
              <Card
                key={tpl.id}
                variant={isSelected ? 'surface' : 'default'}
                padding="sm"
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '1.5px solid var(--color-trust-blue)' : '1px solid var(--color-border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
                  transition: 'all var(--transition-fast)',
                }}
                onClick={() => setSelectedTemplateId(tpl.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileTextIcon size={16} />
                    <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-text-primary)' }}>
                      {t(tpl.titleKey)}
                    </h4>
                  </div>
                  <StatusChip label={tpl.category} variant="memory" size="xs" />
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {t(tpl.descriptionKey)}
                </p>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px', fontFamily: 'var(--font-family-mono)' }}>
                  {tpl.fileName} ({tpl.fileSize})
                </div>
              </Card>
            );
          })}
        </div>

        {/* Content Preview Box */}
        {selectedTemplate && (
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)' }}>
              {t('vault.syntheticPreviewLabel')}:
            </span>
            <pre
              style={{
                backgroundColor: '#0F172A',
                color: '#E2E8F0',
                padding: 'var(--spacing-3) var(--spacing-4)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: 'var(--font-size-xs)',
                fontFamily: 'var(--font-family-mono)',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                marginTop: '6px',
                border: '1px solid #1E293B',
              }}
            >
              {selectedTemplate.syntheticContent}
            </pre>
          </div>
        )}

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

      {/* Preserved Evidence Timeline */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
            {t('vault.timelineTitle')} ({timeline.length})
          </h3>
          <StatusChip label={t('vault.inMemoryOnly')} variant="safe" size="xs" withDot />
        </div>

        {timeline.length === 0 ? (
          <Card variant="neutral" padding="lg">
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
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
                      <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <LockIcon size={15} />
                        <span>{item.fileName}</span>
                      </h4>
                      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        {t('vault.timestampLabel')}: {new Date(item.timestamp).toLocaleString()}
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
                      gap: '4px',
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
                      <span style={{ wordBreak: 'break-all' }}>{item.ciphertextBase64.slice(0, 48)}...</span>
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
                      <strong>{isVerified && !isTampered ? '✓ ' + t('vault.integrityValid') : '❌ ' + t('vault.integrityFailed')}: </strong>
                      {isVerified && !isTampered
                        ? t('vault.integrityValidDetails')
                        : t('vault.integrityTamperDetails', {
                            computed: res.computedHash.slice(0, 16) + '...',
                            expected: res.expectedHash.slice(0, 16) + '...',
                          })}
                    </div>
                  )}

                  {/* Action Buttons: Live Verify vs Simulate Tamper */}
                  <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: '2px', flexWrap: 'wrap' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleVerify(item, false)}
                      icon={<ShieldCheckIcon size={14} />}
                    >
                      {t('vault.verifyIntegrityBtn')}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerify(item, true)}
                      style={{ color: 'var(--color-muted-red)', borderColor: 'var(--color-border-red)' }}
                      icon={<AlertTriangleIcon size={14} />}
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
  );
};
