import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { directoryService } from '../../api/mockAdapter';
import type { DirectoryService } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import {
  SearchIcon,
  ShieldCheckIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  GlobeIcon,
  MoneyIcon,
  AccessibilityIcon,
  LockIcon,
  AlertTriangleIcon,
} from '../../components/Icons/Icons';

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
            {t('directory.title')}
          </h2>
          <StatusChip
            label={t('directory.verifiedBadge')}
            variant="safe"
            size="sm"
            icon={<ShieldCheckIcon size={13} />}
            withDot
          />
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {t('directory.subtitle')}
        </p>
      </div>

      {/* Synthetic Demo Disclaimer Banner */}
      <Card variant="warning" padding="sm">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
          <span style={{ color: 'var(--color-warm-amber)', marginTop: '1px' }}>
            <AlertTriangleIcon size={16} />
          </span>
          <div>
            <h4 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: '#744210', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
              {t('directory.demoBannerTitle')}
            </h4>
            <p style={{ fontSize: 'var(--font-size-xs)', color: '#744210', lineHeight: 1.4 }}>
              {t('directory.demoBannerText')}
            </p>
          </div>
        </div>
      </Card>

      {/* Search Input Bar with Icon */}
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <SearchIcon size={18} />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('directory.searchPlaceholder')}
          aria-label={t('directory.searchPlaceholder')}
          style={{
            width: '100%',
            height: '42px',
            paddingLeft: '38px',
            paddingRight: '14px',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--color-border-default)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--color-bg-canvas)',
            boxShadow: 'var(--shadow-xs)',
            outline: 'none',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
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
                padding: '5px 12px',
                borderRadius: 'var(--border-radius-full)',
                border: `1px solid ${isSelected ? 'var(--color-trust-blue)' : 'var(--color-border-subtle)'}`,
                backgroundColor: isSelected ? 'var(--color-trust-blue)' : 'var(--color-bg-canvas)',
                color: isSelected ? 'var(--color-white)' : 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-xs)',
                transition: 'all var(--transition-fast)',
              }}
            >
              {category === 'All' ? t('directory.allCategories') : category}
            </button>
          );
        })}
      </div>

      {/* Services List */}
      {loading ? (
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--spacing-8)' }}>
          {t('common.loading')}
        </p>
      ) : services.length === 0 ? (
        <Card variant="neutral" padding="lg">
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
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
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              {/* Service Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                <div>
                  <h3
                    style={{
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--color-text-primary)',
                      marginBottom: '3px',
                      lineHeight: 1.3,
                    }}
                  >
                    {service.name}
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPinIcon size={13} />
                    <span>{service.location.district}, {service.location.state}</span>
                  </p>
                </div>

                <StatusChip
                  label={service.verificationStatus}
                  variant="safe"
                  size="xs"
                  icon={<ShieldCheckIcon size={12} />}
                  withDot
                />
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
                      border: '1px solid var(--color-border-blue)',
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: 'var(--spacing-2)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  padding: 'var(--spacing-3)',
                  borderRadius: 'var(--border-radius-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ClockIcon size={14} />
                  <span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{t('directory.hoursLabel')}: </strong>
                    {service.contact.hours}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <PhoneIcon size={14} />
                  <span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{t('directory.contactLabel')}: </strong>
                    {service.contact.phone}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GlobeIcon size={14} />
                  <span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{t('directory.languagesLabel')}: </strong>
                    {service.languages.join(', ')}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MoneyIcon size={14} />
                  <span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{t('directory.costLabel')}: </strong>
                    {service.cost}
                  </span>
                </div>
              </div>

              {/* Accessibility tags */}
              {service.accessibility.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  <span style={{ fontWeight: 'var(--font-weight-semibold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AccessibilityIcon size={13} />
                    <span>{t('directory.accessibilityLabel')}:</span>
                  </span>
                  {service.accessibility.map((acc) => (
                    <span
                      key={acc}
                      style={{
                        backgroundColor: 'var(--color-bg-canvas)',
                        padding: '1px 6px',
                        borderRadius: 'var(--border-radius-xs)',
                        border: '1px solid var(--color-border-subtle)',
                        fontSize: '11px',
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
                    backgroundColor: 'var(--color-soft-rose)',
                    borderLeft: '3px solid var(--color-muted-red)',
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    borderRadius: '0 var(--border-radius-xs) var(--border-radius-xs) 0',
                    fontSize: 'var(--font-size-xs)',
                    color: '#7F1D1D',
                    lineHeight: 1.4,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                  }}
                >
                  <LockIcon size={14} />
                  <div>
                    <span style={{ fontWeight: 'var(--font-weight-bold)' }}>{t('directory.safetyNoteLabel')}: </span>
                    {service.safetyNote}
                  </div>
                </div>
              )}

              {/* Verification Freshness Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '11px', color: 'var(--color-text-faint)' }}>
                <span>{t('directory.lastVerifiedLabel')}: {service.lastVerified}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
