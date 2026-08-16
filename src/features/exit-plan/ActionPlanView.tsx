import { useState, useMemo } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import type { ActionPriority } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip, type StatusChipVariant } from '../../components/StatusChip/StatusChip';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import {
  CheckIcon,
  CheckCircleIcon,
  RefreshIcon,
  TrashIcon,
} from '../../components/Icons/Icons';

type FilterTab = 'active' | 'all' | 'completed' | 'dismissed';

const PRIORITY_ORDER: Record<ActionPriority, number> = {
  Essential: 1,
  High: 2,
  Helpful: 3,
  Optional: 4,
};

const PRIORITY_VARIANTS: Record<ActionPriority, StatusChipVariant> = {
  Essential: 'essential',
  High: 'high',
  Helpful: 'helpful',
  Optional: 'optional',
};

export const ActionPlanView: FC = () => {
  const { t } = useTranslation();
  const { actions, toggleActionComplete, dismissAction, restoreAction } = useSession();
  const [activeTab, setActiveTab] = useState<FilterTab>('active');

  const counts = useMemo(() => {
    const total = actions.length;
    const completed = actions.filter((a) => a.completed && !a.dismissed).length;
    const dismissed = actions.filter((a) => a.dismissed).length;
    const active = actions.filter((a) => !a.completed && !a.dismissed).length;
    return { total, completed, dismissed, active };
  }, [actions]);

  const filteredActions = useMemo(() => {
    let result = [...actions];

    switch (activeTab) {
      case 'active':
        result = result.filter((a) => !a.completed && !a.dismissed);
        break;
      case 'completed':
        result = result.filter((a) => a.completed && !a.dismissed);
        break;
      case 'dismissed':
        result = result.filter((a) => a.dismissed);
        break;
      case 'all':
      default:
        break;
    }

    return result.sort((a, b) => {
      const pDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (pDiff !== 0) return pDiff;
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return 0;
    });
  }, [actions, activeTab]);

  const filterOptions = [
    {
      value: 'active' as FilterTab,
      label: t('actions.filterActive', { count: counts.active }),
    },
    {
      value: 'all' as FilterTab,
      label: t('actions.filterAll', { count: counts.total }),
    },
    {
      value: 'completed' as FilterTab,
      label: t('actions.filterCompleted', { count: counts.completed }),
    },
    ...(counts.dismissed > 0
      ? [
          {
            value: 'dismissed' as FilterTab,
            label: t('actions.filterDismissed', { count: counts.dismissed }),
          },
        ]
      : []),
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      {/* Header & Progress */}
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-1)' }}>
          {t('actions.title')}
        </h3>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
          {t('actions.description')}
        </p>

        {/* Checklist Progress Note */}
        {counts.total > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <StatusChip
              label={t('actions.progressLabel', {
                completed: counts.completed,
                total: counts.total - counts.dismissed,
              })}
              variant="safe"
              size="sm"
              icon={<CheckCircleIcon size={13} />}
              withDot
            />
          </div>
        )}
      </div>

      {/* Filter Tabs via SegmentedControl */}
      <SegmentedControl
        options={filterOptions}
        value={activeTab}
        onChange={(val) => setActiveTab(val)}
        size="sm"
        aria-label="Action filters"
      />

      {/* Action Cards List */}
      {filteredActions.length === 0 ? (
        <Card variant="neutral" padding="lg">
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
            {t('actions.noActions')}
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          {filteredActions.map((action) => {
            const isCompleted = action.completed;
            const isDismissed = action.dismissed;
            const priorityVariant = PRIORITY_VARIANTS[action.priority];
            const title = t(action.titleKey);
            const description = t(action.descriptionKey);
            const reason = t(action.reasonKey);
            const categoryTitle = t(`onboarding.needsStep.categories.${action.category}.title`);

            return (
              <Card
                key={action.id}
                variant={isCompleted ? 'highlight' : isDismissed ? 'neutral' : 'default'}
                padding="md"
                style={{
                  opacity: isDismissed ? 0.65 : 1,
                  boxShadow: isCompleted || isDismissed ? 'none' : 'var(--shadow-xs)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                  {/* Top Bar: Priority Chip, Category Chip, Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                      <StatusChip
                        label={t(`actions.priorityBands.${action.priority.toLowerCase()}`)}
                        variant={priorityVariant}
                        size="xs"
                        withDot
                      />
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 'var(--font-weight-medium)' }}>
                        {categoryTitle}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                      {isDismissed ? (
                        <button
                          type="button"
                          onClick={() => restoreAction(action.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-trust-blue)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            cursor: 'pointer',
                            padding: '2px 6px',
                          }}
                        >
                          <RefreshIcon size={12} />
                          <span>{t('common.restore')}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => dismissAction(action.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-xs)',
                            cursor: 'pointer',
                            padding: '2px 6px',
                          }}
                        >
                          <TrashIcon size={12} />
                          <span>{t('common.dismiss')}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Main Action Content & Checkbox */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
                    {!isDismissed && (
                      <button
                        type="button"
                        onClick={() => toggleActionComplete(action.id)}
                        role="checkbox"
                        aria-checked={isCompleted}
                        aria-label={`${title} (${isCompleted ? t('common.completed') : t('common.markComplete')})`}
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: 'var(--border-radius-xs)',
                          border: isCompleted ? '2px solid var(--color-safe-green)' : '1.5px solid var(--color-border-default)',
                          backgroundColor: isCompleted ? 'var(--color-safe-green)' : 'var(--color-bg-canvas)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          marginTop: '2px',
                          flexShrink: 0,
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        {isCompleted && <CheckIcon size={14} />}
                      </button>
                    )}

                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          fontSize: 'var(--font-size-base)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: isCompleted ? 'var(--color-safe-green)' : 'var(--color-text-primary)',
                          textDecoration: isCompleted ? 'line-through' : 'none',
                          marginBottom: '4px',
                          lineHeight: 1.35,
                        }}
                      >
                        {title}
                      </h4>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.45, marginBottom: 'var(--spacing-2)' }}>
                        {description}
                      </p>

                      {/* Explainability Rationale Box */}
                      <div
                        style={{
                          backgroundColor: 'var(--color-bg-subtle)',
                          borderLeft: '3px solid var(--color-trust-blue)',
                          padding: 'var(--spacing-2) var(--spacing-3)',
                          borderRadius: '0 var(--border-radius-xs) var(--border-radius-xs) 0',
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.4,
                        }}
                      >
                        <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                          {t('actions.whySuggested')}{' '}
                        </span>
                        {reason}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
