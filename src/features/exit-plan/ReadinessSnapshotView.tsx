import { useState, useMemo } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import { evaluateReadiness } from '../../services/rulesEngine/rulesEngine';
import type { ReadinessStatusType } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip, type StatusChipVariant } from '../../components/StatusChip/StatusChip';

const STATUS_VARIANTS: Record<ReadinessStatusType, StatusChipVariant> = {
  Prepared: 'prepared',
  'Partially prepared': 'partiallyPrepared',
  'Needs attention': 'needsAttention',
  'Not yet planned': 'notPlanned',
  Optional: 'optional',
};

const CATEGORY_ICONS: Record<string, string> = {
  communicationSafety: '💬',
  documents: '📄',
  money: '💳',
  housing: '🏠',
  children: '🧸',
  health: '🩺',
  legal: '⚖️',
  digitalSafety: '🔒',
  work: '💼',
};

export const ReadinessSnapshotView: FC = () => {
  const { t } = useTranslation();
  const { planNeeds, deviceSafety } = useSession();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const snapshotItems = useMemo(() => {
    return evaluateReadiness(planNeeds, deviceSafety);
  }, [planNeeds, deviceSafety]);

  const filteredItems = useMemo(() => {
    if (selectedFilter === 'all') return snapshotItems;
    return snapshotItems.filter((item) => item.status === selectedFilter);
  }, [snapshotItems, selectedFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {/* Header Description */}
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-1)' }}>
          {t('readiness.title')}
        </h3>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#486581' }}>
          {t('readiness.description')}
        </p>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }} role="toolbar" aria-label="Filter categories by readiness status">
        <button
          type="button"
          onClick={() => setSelectedFilter('all')}
          style={{
            background: selectedFilter === 'all' ? 'var(--color-trust-blue)' : 'var(--color-neutral-grey)',
            color: selectedFilter === 'all' ? 'var(--color-white)' : 'var(--color-deep-ink)',
            border: 'none',
            borderRadius: 'var(--border-radius-full)',
            padding: '4px 12px',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-medium)',
            cursor: 'pointer',
          }}
        >
          {t('readiness.filterAll')} ({snapshotItems.length})
        </button>
        {(['Needs attention', 'Partially prepared', 'Not yet planned'] as ReadinessStatusType[]).map((status) => {
          const count = snapshotItems.filter((i) => i.status === status).length;
          if (count === 0) return null;
          const isSelected = selectedFilter === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedFilter(status)}
              style={{
                background: isSelected ? 'var(--color-trust-blue)' : 'var(--color-neutral-grey)',
                color: isSelected ? 'var(--color-white)' : 'var(--color-deep-ink)',
                border: 'none',
                borderRadius: 'var(--border-radius-full)',
                padding: '4px 12px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
              }}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Category Readiness Cards Grid */}
      <div className="responsive-grid-2col">
        {filteredItems.map((item) => {
          const chipVariant = STATUS_VARIANTS[item.status];
          const icon = CATEGORY_ICONS[item.category] || '📋';
          const title = t(item.titleKey);
          const reason = t(item.reasonKey);
          const rationale = t(item.rationaleKey);

          return (
            <Card
              key={item.category}
              variant={item.status === 'Needs attention' ? 'warning' : item.status === 'Partially prepared' ? 'surface' : 'default'}
              padding="md"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-2)',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                    <span style={{ fontSize: '18px' }} aria-hidden="true">
                      {icon}
                    </span>
                    <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)' }}>
                      {title}
                    </h4>
                  </div>
                  <StatusChip label={item.status} variant={chipVariant} size="sm" />
                </div>

                <div style={{ marginTop: 'var(--spacing-1)' }}>
                  <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#334E68', marginBottom: '2px' }}>
                    {reason}
                  </p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: '#486581', lineHeight: 1.4 }}>
                    {rationale}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
