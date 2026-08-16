import { useState, useMemo } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import type { PlanningHorizon, ActionPriority } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip, type StatusChipVariant } from '../../components/StatusChip/StatusChip';

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

export const LeaveTomorrowSimulatorView: FC = () => {
  const { t } = useTranslation();
  const { actions, toggleActionComplete, dismissAction, restoreAction } = useSession();
  const [selectedHorizon, setSelectedHorizon] = useState<PlanningHorizon>('24h');

  const horizonActions = useMemo(() => {
    return actions
      .filter((a) => a.horizons && a.horizons.includes(selectedHorizon))
      .sort((a, b) => {
        const pDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        if (pDiff !== 0) return pDiff;
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return 0;
      });
  }, [actions, selectedHorizon]);

  const stats = useMemo(() => {
    const total = horizonActions.length;
    const completed = horizonActions.filter((a) => a.completed && !a.dismissed).length;
    const dismissed = horizonActions.filter((a) => a.dismissed).length;
    const active = horizonActions.filter((a) => !a.completed && !a.dismissed).length;
    return { total, completed, dismissed, active };
  }, [horizonActions]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {/* Simulator Introduction */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', margin: 0 }}>
            {t('simulator.title')}
          </h3>
          <StatusChip label={t('simulator.modeBadge')} variant="memory" size="sm" />
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#486581' }}>
          {t('simulator.description')}
        </p>
      </div>

      {/* Horizon Tabs (24h, 72h, 7d) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--spacing-2)',
          backgroundColor: 'var(--color-neutral-grey)',
          padding: '4px',
          borderRadius: 'var(--border-radius-md)',
        }}
        role="tablist"
        aria-label="Planning Horizon"
      >
        {(['24h', '72h', '7d'] as PlanningHorizon[]).map((horizon) => {
          const isSelected = selectedHorizon === horizon;
          return (
            <button
              key={horizon}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedHorizon(horizon)}
              style={{
                padding: 'var(--spacing-2) var(--spacing-3)',
                borderRadius: 'var(--border-radius-sm)',
                border: 'none',
                backgroundColor: isSelected ? 'var(--color-white)' : 'transparent',
                color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-deep-ink)',
                fontWeight: isSelected ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-sm)',
                boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'center',
              }}
            >
              <div>{t(`simulator.horizons.${horizon}.label`)}</div>
              <div style={{ fontSize: '11px', color: isSelected ? '#3B82F6' : '#64748B', fontWeight: 'normal' }}>
                {t(`simulator.horizons.${horizon}.sub`)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Horizon Focus Guidance Card */}
      <Card variant="surface" padding="sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: '2px' }}>
              {t(`simulator.horizons.${selectedHorizon}.title`)}
            </h4>
            <p style={{ fontSize: 'var(--font-size-xs)', color: '#334E68', lineHeight: 1.4 }}>
              {t(`simulator.horizons.${selectedHorizon}.description`)}
            </p>
          </div>
          {stats.total > 0 && (
            <StatusChip
              label={t('simulator.progressNote', {
                completed: stats.completed,
                total: stats.total - stats.dismissed,
              })}
              variant="safe"
              size="sm"
            />
          )}
        </div>
      </Card>

      {/* Actions List for Selected Horizon */}
      {horizonActions.length === 0 ? (
        <Card variant="neutral" padding="md">
          <p style={{ fontSize: 'var(--font-size-sm)', color: '#64748B', textAlign: 'center', fontStyle: 'italic' }}>
            {t('simulator.noActionsForHorizon')}
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          {horizonActions.map((action) => {
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
                  {/* Action Top Bar */}
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

                    <div>
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

                  {/* Action Checkbox & Content */}
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

                      {/* Explainability Box */}
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
