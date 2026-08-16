import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { directoryService } from '../../api/mockAdapter';
import type { DirectoryService } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';

export const ServiceDirectoryView: FC = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState<DirectoryService[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const [fetchedServices, fetchedCategories] = await Promise.all([
        directoryService.getServices({
          category: selectedCategory,
          searchQuery,
        }),
        directoryService.getCategories(),
      ]);
      if (isMounted) {
        setServices(fetchedServices);
        setCategories(fetchedCategories);
        setLoading(false);
      }
    }
    void loadData();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', margin: 0 }}>
            {t('directory.title')}
          </h2>
          <StatusChip label={t('directory.verifiedBadge')} variant="safe" size="sm" />
        </div>
        <p style={{ color: '#486581', fontSize: 'var(--font-size-sm)' }}>
          {t('directory.subtitle')}
        </p>
      </div>

      {/* Synthetic Demo Disclaimer Banner */}
      <Card variant="warning" padding="sm">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
          <span style={{ fontSize: '18px' }} aria-hidden="true">⚠️</span>
          <div>
            <h4 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: '#744210', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('directory.demoBannerTitle')}
            </h4>
            <p style={{ fontSize: 'var(--font-size-xs)', color: '#744210', lineHeight: 1.4 }}>
              {t('directory.demoBannerText')}
            </p>
          </div>
        </div>
      </Card>

      {/* Search Input Bar */}
      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('directory.searchPlaceholder')}
          aria-label={t('directory.searchPlaceholder')}
          style={{
            width: '100%',
            padding: 'var(--spacing-2) var(--spacing-4)',
            borderRadius: 'var(--border-radius-sm)',
            border: '1px solid #CBD5E1',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-deep-ink)',
            backgroundColor: 'var(--color-white)',
            outline: 'none',
          }}
        />
      </div>

      {/* Category Filter Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }} role="toolbar" aria-label="Filter directory by category">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--border-radius-full)',
                border: 'none',
                backgroundColor: isSelected ? 'var(--color-trust-blue)' : 'var(--color-neutral-grey)',
                color: isSelected ? 'var(--color-white)' : 'var(--color-deep-ink)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: isSelected ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {category === 'All' ? t('directory.allCategories') : category}
            </button>
          );
        })}
      </div>

      {/* Services List */}
      {loading ? (
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#64748B', textAlign: 'center' }}>
          {t('common.loading')}
        </p>
      ) : services.length === 0 ? (
        <Card variant="neutral" padding="lg">
          <p style={{ fontSize: 'var(--font-size-sm)', color: '#64748B', textAlign: 'center', fontStyle: 'italic' }}>
            {t('directory.noResults')}
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          {services.map((service) => (
            <Card
              key={service.id}
              variant="default"
              padding="md"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-3)',
                border: '1px solid #CBD5E1',
              }}
            >
              {/* Service Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: '2px' }}>
                    {service.name}
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: '#64748B' }}>
                    📍 {service.location.district}, {service.location.state}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  <StatusChip label={service.verificationStatus} variant="safe" size="sm" />
                </div>
              </div>

              {/* Category tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-1)' }}>
                {service.categories.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      fontSize: '11px',
                      backgroundColor: 'var(--color-soft-blue)',
                      color: 'var(--color-trust-blue)',
                      padding: '2px 8px',
                      borderRadius: 'var(--border-radius-full)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Details Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--spacing-2)',
                  fontSize: 'var(--font-size-xs)',
                  color: '#334E68',
                  backgroundColor: '#F8FAFC',
                  padding: 'var(--spacing-3)',
                  borderRadius: 'var(--border-radius-sm)',
                }}
              >
                <div>
                  <strong style={{ color: '#1E293B' }}>{t('directory.hoursLabel')}: </strong>
                  {service.contact.hours}
                </div>
                <div>
                  <strong style={{ color: '#1E293B' }}>{t('directory.contactLabel')}: </strong>
                  {service.contact.phone}
                </div>
                <div>
                  <strong style={{ color: '#1E293B' }}>{t('directory.languagesLabel')}: </strong>
                  {service.languages.join(', ')}
                </div>
                <div>
                  <strong style={{ color: '#1E293B' }}>{t('directory.costLabel')}: </strong>
                  {service.cost}
                </div>
              </div>

              {/* Accessibility tags */}
              {service.accessibility.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: '#475569' }}>
                  <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>♿ {t('directory.accessibilityLabel')}:</span>
                  {service.accessibility.map((acc) => (
                    <span
                      key={acc}
                      style={{
                        backgroundColor: '#F1F5F9',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      {acc}
                    </span>
                  ))}
                </div>
              )}

              {/* Safety Note Callout */}
              {service.safetyNote && (
                <div
                  style={{
                    backgroundColor: '#FEF2F2',
                    borderLeft: '3px solid #EF4444',
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0',
                    fontSize: 'var(--font-size-xs)',
                    color: '#7F1D1D',
                  }}
                >
                  <span style={{ fontWeight: 'var(--font-weight-bold)' }}>🔒 {t('directory.safetyNoteLabel')}: </span>
                  {service.safetyNote}
                </div>
              )}

              {/* Verification Freshness Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '11px', color: '#94A3B8' }}>
                <span>{t('directory.lastVerifiedLabel')}: {service.lastVerified}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
