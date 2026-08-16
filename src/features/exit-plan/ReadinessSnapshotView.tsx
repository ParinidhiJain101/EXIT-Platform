import { useState, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import { evaluateReadiness } from '../../services/rulesEngine/rulesEngine';
import type { ReadinessStatusType } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip, type StatusChipVariant } from '../../components/StatusChip/StatusChip';
import {
  CommunicationIcon,
  DocumentsIcon,
  MoneyIcon,
  HousingIcon,
  ChildrenIcon,
  HealthIcon,
  LegalIcon,
  DigitalSafetyIcon,
  WorkIcon,
} from '../../components/Icons/Icons';

const STATUS_VARIANTS: Record<ReadinessStatusType, StatusChipVariant> = {
  Prepared: 'prepared',
  'Partially prepared': 'partiallyPrepared',
  'Needs attention': 'needsAttention',
  'Not yet planned': 'notPlanned',
  Optional: 'optional',
};

const CATEGORY_ICONS: Record<string, ReactNode> = {
  communicationSafety: <CommunicationIcon size={18} />,
  documents: <DocumentsIcon size={18} />,
  money: <MoneyIcon size={18} />,
  housing: <HousingIcon size={18} />,
  children: <ChildrenIcon size={18} />,
  health: <HealthIcon size={18} />,
  legal: <LegalIcon size={18} />,
  digitalSafety: <DigitalSafetyIcon size={18} />,
  work: <WorkIcon size={18} />,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      {/* Header Description */}
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-1)' }}>
          {t('readiness.title')}
        </h3>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          {t('readiness.description')}
        </p>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }} role="toolbar" aria-label="Filter categories by readiness status">
        <button
          type="button"
          onClick={() => setSelectedFilter('all')}
          style={{
            background: selectedFilter === 'all' ? 'var(--color-trust-blue)' : 'var(--color-bg-canvas)',
            color: selectedFilter === 'all' ? 'var(--color-white)' : 'var(--color-text-secondary)',
            border: `1px solid ${selectedFilter === 'all' ? 'var(--color-trust-blue)' : 'var(--color-border-subtle)'}`,
            borderRadius: 'var(--border-radius-sm)',
            padding: '4px 10px',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-medium)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-xs)',
            transition: 'all var(--transition-fast)',
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
                background: isSelected ? 'var(--color-trust-blue)' : 'var(--color-bg-canvas)',
                color: isSelected ? 'var(--color-white)' : 'var(--color-text-secondary)',
                border: `1px solid ${isSelected ? 'var(--color-trust-blue)' : 'var(--color-border-subtle)'}`,
                borderRadius: 'var(--border-radius-sm)',
                padding: '4px 10px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-xs)',
                transition: 'all var(--transition-fast)',
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
          const icon = CATEGORY_ICONS[item.category];
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
                gap: 'var(--spacing-3)',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: 'var(--border-radius-xs)',
                        backgroundColor: 'var(--color-bg-subtle)',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                    <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
                      {title}
                    </h4>
                  </div>
                  <StatusChip label={item.status} variant={chipVariant} size="xs" withDot />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                    {reason}
                  </p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
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
