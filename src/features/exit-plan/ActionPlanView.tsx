import { useState, useMemo } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import type { ActionPriority } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip, type StatusChipVariant } from '../../components/StatusChip/StatusChip';

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
        // show all non-dismissed first, then dismissed
        break;
    }

    return result.sort((a, b) => {
      // First sort by priority band
      const pDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (pDiff !== 0) return pDiff;
      // Then active before completed
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return 0;
    });
  }, [actions, activeTab]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {/* Header & Progress */}
      <div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-1)' }}>
          {t('actions.title')}
        </h3>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#486581', marginBottom: 'var(--spacing-2)' }}>
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
              variant="memory"
              size="sm"
            />
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }} role="tablist" aria-label="Action filters">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'active'}
          onClick={() => setActiveTab('active')}
          style={{
            background: activeTab === 'active' ? 'var(--color-trust-blue)' : 'var(--color-neutral-grey)',
            color: activeTab === 'active' ? 'var(--color-white)' : 'var(--color-deep-ink)',
            border: 'none',
            borderRadius: 'var(--border-radius-full)',
            padding: '4px 12px',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-medium)',
            cursor: 'pointer',
          }}
        >
          {t('actions.filterActive', { count: counts.active })}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
          style={{
            background: activeTab === 'all' ? 'var(--color-trust-blue)' : 'var(--color-neutral-grey)',
            color: activeTab === 'all' ? 'var(--color-white)' : 'var(--color-deep-ink)',
            border: 'none',
            borderRadius: 'var(--border-radius-full)',
            padding: '4px 12px',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-medium)',
            cursor: 'pointer',
          }}
        >
          {t('actions.filterAll', { count: counts.total })}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'completed'}
          onClick={() => setActiveTab('completed')}
          style={{
            background: activeTab === 'completed' ? 'var(--color-trust-blue)' : 'var(--color-neutral-grey)',
            color: activeTab === 'completed' ? 'var(--color-white)' : 'var(--color-deep-ink)',
            border: 'none',
            borderRadius: 'var(--border-radius-full)',
            padding: '4px 12px',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-medium)',
            cursor: 'pointer',
          }}
        >
          {t('actions.filterCompleted', { count: counts.completed })}
        </button>

        {counts.dismissed > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'dismissed'}
            onClick={() => setActiveTab('dismissed')}
            style={{
              background: activeTab === 'dismissed' ? 'var(--color-trust-blue)' : 'var(--color-neutral-grey)',
              color: activeTab === 'dismissed' ? 'var(--color-white)' : 'var(--color-deep-ink)',
              border: 'none',
              borderRadius: 'var(--border-radius-full)',
              padding: '4px 12px',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
            }}
          >
            {t('actions.filterDismissed', { count: counts.dismissed })}
          </button>
        )}
      </div>

      {/* Action Cards List */}
      {filteredActions.length === 0 ? (
        <Card variant="neutral" padding="md">
          <p style={{ fontSize: 'var(--font-size-sm)', color: '#64748B', textAlign: 'center', fontStyle: 'italic' }}>
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
                  opacity: isDismissed ? 0.7 : 1,
                  border: isCompleted
                    ? '1px solid #A7F3D0'
                    : isDismissed
                    ? '1px solid #E2E8F0'
                    : '1px solid #CBD5E1',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                  {/* Top Bar: Priority Chip, Category Chip, Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                      <StatusChip
                        label={t(`actions.priorityBands.${action.priority.toLowerCase()}`)}
                        variant={priorityVariant}
                        size="sm"
                      />
                      <span style={{ fontSize: 'var(--font-size-xs)', color: '#64748B', fontWeight: 'var(--font-weight-medium)' }}>
                        {categoryTitle}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                      {isDismissed ? (
                        <button
                          type="button"
                          onClick={() => restoreAction(action.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-trust-blue)',
                            fontSize: 'var(--font-size-xs)',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                        >
                          {t('common.restore')}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => dismissAction(action.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94A3B8',
                            fontSize: 'var(--font-size-xs)',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                        >
                          {t('common.dismiss')}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Main Action Content & Checkbox */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
                    {!isDismissed && (
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => toggleActionComplete(action.id)}
                        aria-label={`${title} (${isCompleted ? t('common.completed') : t('common.markComplete')})`}
                        style={{
                          width: '20px',
                          height: '20px',
                          marginTop: '2px',
                          cursor: 'pointer',
                          accentColor: 'var(--color-safe-green)',
                        }}
                      />
                    )}

                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          fontSize: 'var(--font-size-base)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: isCompleted ? '#065F46' : 'var(--color-deep-ink)',
                          textDecoration: isCompleted ? 'line-through' : 'none',
                          marginBottom: '4px',
                        }}
                      >
                        {title}
                      </h4>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: '#334E68', lineHeight: 1.4, marginBottom: 'var(--spacing-2)' }}>
                        {description}
                      </p>

                      {/* Explainability Rationale Box */}
                      <div
                        style={{
                          backgroundColor: '#F8FAFC',
                          borderLeft: '3px solid var(--color-trust-blue)',
                          padding: 'var(--spacing-1) var(--spacing-3)',
                          borderRadius: '0 4px 4px 0',
                          fontSize: 'var(--font-size-xs)',
                          color: '#475569',
                        }}
                      >
                        <span style={{ fontWeight: 'var(--font-weight-semibold)', color: '#1E293B' }}>
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
