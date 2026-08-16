import { useState, useMemo } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import type { PlanningHorizon, ActionPriority } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip, type StatusChipVariant } from '../../components/StatusChip/StatusChip';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import {
  ClockIcon,
  CheckCircleIcon,
  CheckIcon,
  RefreshIcon,
  TrashIcon,
} from '../../components/Icons/Icons';

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

  const horizonOptions = [
    {
      value: '24h' as PlanningHorizon,
      label: t('simulator.horizons.24h.label'),
      subLabel: t('simulator.horizons.24h.sub'),
    },
    {
      value: '72h' as PlanningHorizon,
      label: t('simulator.horizons.72h.label'),
      subLabel: t('simulator.horizons.72h.sub'),
    },
    {
      value: '7d' as PlanningHorizon,
      label: t('simulator.horizons.7d.label'),
      subLabel: t('simulator.horizons.7d.sub'),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      {/* Simulator Introduction */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', margin: 0 }}>
            {t('simulator.title')}
          </h3>
          <StatusChip label={t('simulator.modeBadge')} variant="memory" size="xs" withDot />
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          {t('simulator.description')}
        </p>
      </div>

      {/* Horizon Tabs (24h, 72h, 7d) via SegmentedControl */}
      <SegmentedControl
        options={horizonOptions}
        value={selectedHorizon}
        onChange={(val) => setSelectedHorizon(val)}
        fullWidth
        size="lg"
        aria-label="Planning Horizon"
      />

      {/* Horizon Focus Guidance Card */}
      <Card variant="surface" padding="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: '4px' }}>
              <ClockIcon size={16} />
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
                {t(`simulator.horizons.${selectedHorizon}.title`)}
              </h4>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
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
              icon={<CheckCircleIcon size={13} />}
              withDot
            />
          )}
        </div>
      </Card>

      {/* Actions List for Selected Horizon */}
      {horizonActions.length === 0 ? (
        <Card variant="neutral" padding="lg">
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
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
                  opacity: isDismissed ? 0.65 : 1,
                  boxShadow: isCompleted || isDismissed ? 'none' : 'var(--shadow-xs)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                  {/* Action Top Bar */}
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

                    <div>
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

                  {/* Action Checkbox & Content */}
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

                      {/* Explainability Box */}
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
