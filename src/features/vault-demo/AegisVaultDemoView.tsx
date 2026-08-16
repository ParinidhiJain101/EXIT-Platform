import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { vaultService } from '../../api/mockAdapter';
import type { SyntheticEvidenceTemplate, VaultCapsuleItem } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { Button } from '../../components/Button/Button';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', margin: 0 }}>
            {t('vault.title')}
          </h2>
          <StatusChip label={t('vault.prototypeBadge')} variant="memory" size="sm" />
        </div>
        <p style={{ color: '#486581', fontSize: 'var(--font-size-sm)' }}>
          {t('vault.subtitle')}
        </p>
      </div>

      {/* Legal & Prototype Disclaimer Banner */}
      <Card variant="warning" padding="sm">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
          <span style={{ fontSize: '18px' }} aria-hidden="true">⚖️</span>
          <div>
            <h4 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: '#744210', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-1)' }}>
          {t('vault.sandboxTitle')}
        </h3>
        <p style={{ fontSize: 'var(--font-size-xs)', color: '#334E68', marginBottom: 'var(--spacing-3)' }}>
          {t('vault.sandboxSubtitle')}
        </p>

        {/* Template Select Grid */}
        <div className="responsive-grid-2col" style={{ marginBottom: 'var(--spacing-3)' }}>
          {templates.map((tpl) => {
            const isSelected = selectedTemplateId === tpl.id;
            return (
              <Card
                key={tpl.id}
                variant={isSelected ? 'surface' : 'default'}
                padding="sm"
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--color-trust-blue)' : '1px solid #CBD5E1',
                }}
                onClick={() => setSelectedTemplateId(tpl.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-deep-ink)' }}>
                    {t(tpl.titleKey)}
                  </h4>
                  <StatusChip label={tpl.category} variant="memory" size="sm" />
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: '#486581', lineHeight: 1.3 }}>
                  {t(tpl.descriptionKey)}
                </p>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px', fontFamily: 'monospace' }}>
                  📁 {tpl.fileName} ({tpl.fileSize})
                </div>
              </Card>
            );
          })}
        </div>

        {/* Content Preview Box */}
        {selectedTemplate && (
          <div style={{ marginBottom: 'var(--spacing-3)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#334E68' }}>
              {t('vault.syntheticPreviewLabel')}:
            </span>
            <pre
              style={{
                backgroundColor: '#1E293B',
                color: '#E2E8F0',
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: 'var(--font-size-xs)',
                fontFamily: 'monospace',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                marginTop: '4px',
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
          style={{ width: '100%' }}
        >
          {processing ? t('common.loading') : t('vault.preserveButton')}
        </Button>
      </Card>

      {/* Preserved Evidence Timeline */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)' }}>
            {t('vault.timelineTitle')} ({timeline.length})
          </h3>
          <StatusChip label={t('vault.inMemoryOnly')} variant="safe" size="sm" />
        </div>

        {timeline.length === 0 ? (
          <Card variant="neutral" padding="md">
            <p style={{ fontSize: 'var(--font-size-sm)', color: '#64748B', textAlign: 'center', fontStyle: 'italic' }}>
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
                  variant={isVerified && !isTampered ? 'surface' : isTampered ? 'warning' : 'default'}
                  padding="md"
                  style={{
                    border: isVerified && !isTampered
                      ? '1px solid #93C5FD'
                      : isTampered
                      ? '2px solid #EF4444'
                      : '1px solid #CBD5E1',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                    <div>
                      <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)' }}>
                        🔒 {item.fileName}
                      </h4>
                      <p style={{ fontSize: '11px', color: '#64748B' }}>
                        {t('vault.timestampLabel')}: {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>

                    <StatusChip
                      label={isVerified && !isTampered ? t('vault.verifiedMatch') : isTampered ? t('vault.tamperMismatch') : t('vault.unverified')}
                      variant={isVerified && !isTampered ? 'safe' : isTampered ? 'essential' : 'muted'}
                      size="sm"
                    />
                  </div>

                  {/* Cryptographic Receipts */}
                  <div
                    style={{
                      backgroundColor: '#F8FAFC',
                      padding: 'var(--spacing-2) var(--spacing-3)',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      color: '#334E68',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div>
                      <strong style={{ color: '#0F172A' }}>SHA-256: </strong>
                      <span style={{ wordBreak: 'break-all' }}>{item.plainHash}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#0F172A' }}>AES-GCM (IV): </strong>
                      <span>{item.ivHex}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#0F172A' }}>Ciphertext: </strong>
                      <span style={{ wordBreak: 'break-all' }}>{item.ciphertextBase64.slice(0, 48)}...</span>
                    </div>
                  </div>

                  {/* Verification Result Callout */}
                  {res && (
                    <div
                      style={{
                        backgroundColor: isVerified && !isTampered ? '#ECFDF5' : '#FEF2F2',
                        borderLeft: `3px solid ${isVerified && !isTampered ? '#10B981' : '#EF4444'}`,
                        padding: 'var(--spacing-2) var(--spacing-3)',
                        borderRadius: '0 4px 4px 0',
                        fontSize: 'var(--font-size-xs)',
                        color: isVerified && !isTampered ? '#065F46' : '#991B1B',
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
                  <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: '4px', flexWrap: 'wrap' }}>
                    <Button
                      variant="secondary"
                      onClick={() => handleVerify(item, false)}
                      style={{ padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--font-size-xs)', minHeight: '34px' }}
                    >
                      {t('vault.verifyIntegrityBtn')}
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => handleVerify(item, true)}
                      style={{ padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--font-size-xs)', minHeight: '34px' }}
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
