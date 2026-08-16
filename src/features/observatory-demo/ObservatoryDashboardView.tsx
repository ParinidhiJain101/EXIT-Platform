import { useMemo, useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { runAirlockPipeline } from '../../services/observatory/airlockService';
import { SYNTHETIC_CONTRIBUTION_SEED } from '../../services/observatory/syntheticData';
import type {
  AggregateCell,
  ObservatoryDashboard,
} from '../../services/observatory/airlockTypes';

import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { Button } from '../../components/Button/Button';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import {
  BarChartIcon,
  ShieldIcon,
  AlertTriangleIcon,
  LockIcon,
  XIcon,
} from '../../components/Icons/Icons';

// ─── Mini bar chart component ────────────────────────────────────────────────

interface BarChartProps {
  cells: AggregateCell[];
  groupBy: 'harmCategory' | 'serviceNeed' | 'broadRegion';
}

const BarChart: FC<BarChartProps> = ({ cells, groupBy }) => {
  const grouped = useMemo(() => {
    const map = new Map<string, number>();

    for (const cell of cells) {
      const key = cell[groupBy];
      map.set(key, (map.get(key) ?? 0) + cell.count);
    }

    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [cells, groupBy]);

  const max = grouped[0]?.[1] ?? 1;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-2)',
      }}
    >
      {grouped.map(([label, count]) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3)',
          }}
        >
          <div
            style={{
              width: '150px',
              flexShrink: 0,
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-secondary)',
              textAlign: 'right',
              lineHeight: 1.3,
            }}
          >
            {label}
          </div>

          <div
            style={{
              flex: 1,
              height: '20px',
              backgroundColor: 'var(--color-bg-subtle)',
              borderRadius: 'var(--border-radius-xs)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${(count / max) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--color-trust-blue)',
                borderRadius: 'var(--border-radius-xs)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>

          <div
            style={{
              width: '36px',
              flexShrink: 0,
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-trust-blue)',
              textAlign: 'left',
            }}
          >
            {count}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Pipeline process step ──────────────────────────────────────────────────

interface PipelineStepProps {
  step: number;
  label: string;
  detail: string;
  color?: string;
}

const PipelineStep: FC<PipelineStepProps> = ({
  step,
  label,
  detail,
  color = 'var(--color-text-secondary)',
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--spacing-3)',
    }}
  >
    <div
      style={{
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-trust-blue)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: 'bold',
        flexShrink: 0,
      }}
    >
      {step}
    </div>

    <div>
      <div
        style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text-primary)',
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: '11px',
          color,
          lineHeight: 1.4,
        }}
      >
        {detail}
      </div>
    </div>
  </div>
);

// ─── Main view ──────────────────────────────────────────────────────────────

type ChartView = 'harm' | 'service' | 'region';

export const ObservatoryDashboardView: FC = () => {
  const { t } = useTranslation();

  const dashboard: ObservatoryDashboard = useMemo(
    () => runAirlockPipeline(SYNTHETIC_CONTRIBUTION_SEED),
    [],
  );

  const [chartView, setChartView] = useState<ChartView>('harm');
  const [showPipelineDetail, setShowPipelineDetail] = useState(false);
  const [showCellTable, setShowCellTable] = useState(false);

  const {
    aggregateCells,
    totalCandidatesSubmitted,
    totalAccepted,
    totalSuppressed,
    kThreshold,
  } = dashboard;

  const totalReleased = aggregateCells.reduce(
    (sum, cell) => sum + cell.count,
    0,
  );

  const rejected = totalCandidatesSubmitted - totalAccepted;

  const chartGroupBy: Record<
    ChartView,
    'harmCategory' | 'serviceNeed' | 'broadRegion'
  > = {
    harm: 'harmCategory',
    service: 'serviceNeed',
    region: 'broadRegion',
  };

  const chartViewOptions = [
    { value: 'harm' as ChartView, label: t('observatory.chartBy.harm') },
    { value: 'service' as ChartView, label: t('observatory.chartBy.service') },
    { value: 'region' as ChartView, label: t('observatory.chartBy.region') },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-6)',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--spacing-2)',
            marginBottom: 'var(--spacing-1)',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                marginBottom: '4px',
              }}
            >
              <h2
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                {t('observatory.title')}
              </h2>

              <StatusChip
                label={t('observatory.syntheticBadge')}
                variant="warning"
                size="xs"
                withDot
              />
            </div>

            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {t('observatory.subtitle')}
            </p>
          </div>

          <StatusChip
            label={t('observatory.memoryOnlyBadge')}
            variant="memory"
            size="sm"
            withDot
          />
        </div>
      </div>

      {/* ── Synthetic data warning ──────────────────────────────────────────── */}
      <Card variant="warning" padding="sm">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--spacing-2)',
          }}
        >
          <span style={{ color: 'var(--color-warm-amber)', marginTop: '1px' }}>
            <AlertTriangleIcon size={16} />
          </span>

          <div>
            <h4
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#744210',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '2px',
              }}
            >
              {t('observatory.syntheticWarningTitle')}
            </h4>

            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                color: '#744210',
                lineHeight: 1.4,
              }}
            >
              {t('observatory.syntheticWarningText')}
            </p>
          </div>
        </div>
      </Card>

      {/* ── Privacy pipeline process card ──────────────────────────────────── */}
      <Card variant="surface" padding="md">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-3)',
            flexWrap: 'wrap',
            gap: 'var(--spacing-2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldIcon size={18} />
            <h3
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
              }}
            >
              {t('observatory.pipelineTitle')}
            </h3>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPipelineDetail((value) => !value)}
          >
            {showPipelineDetail
              ? t('observatory.hidePipeline')
              : t('observatory.showPipeline')}
          </Button>
        </div>

        {/* Pipeline summary stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 'var(--spacing-3)',
            marginBottom: showPipelineDetail ? 'var(--spacing-4)' : 0,
          }}
        >
          {[
            {
              label: t('observatory.statSubmitted'),
              value: totalCandidatesSubmitted,
              color: 'var(--color-text-primary)',
              bg: 'var(--color-bg-canvas)',
              border: 'var(--color-border-subtle)',
            },
            {
              label: t('observatory.statRejected'),
              value: rejected,
              color: 'var(--color-muted-red)',
              bg: 'var(--color-soft-rose)',
              border: 'var(--color-border-red)',
            },
            {
              label: t('observatory.statAccepted'),
              value: totalAccepted,
              color: 'var(--color-safe-green)',
              bg: 'var(--color-soft-green)',
              border: 'var(--color-border-green)',
            },
            {
              label: t('observatory.statSuppressed', { kThreshold }),
              value: totalSuppressed,
              color: '#B45309',
              bg: 'var(--color-soft-amber)',
              border: 'var(--color-border-amber)',
            },
            {
              label: t('observatory.statReleased'),
              value: totalReleased,
              color: 'var(--color-trust-blue)',
              bg: 'var(--color-soft-blue)',
              border: 'var(--color-border-blue)',
            },
          ].map(({ label, value, color, bg, border }) => (
            <div
              key={label}
              style={{
                backgroundColor: bg,
                borderRadius: 'var(--border-radius-sm)',
                border: `1px solid ${border}`,
                padding: 'var(--spacing-3)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color,
                  lineHeight: 1.2,
                }}
              >
                {value}
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  marginTop: '4px',
                  lineHeight: 1.3,
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed pipeline steps */}
        {showPipelineDetail && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-3)',
              borderTop: '1px solid var(--color-border-blue)',
              paddingTop: 'var(--spacing-4)',
            }}
          >
            <PipelineStep
              step={1}
              label={t('observatory.stage1Title')}
              detail={t('observatory.stage1Detail', { rejected })}
              color="var(--color-muted-red)"
            />

            <PipelineStep
              step={2}
              label={t('observatory.stage2Title')}
              detail={t('observatory.stage2Detail')}
            />

            <PipelineStep
              step={3}
              label={t('observatory.stage3Title')}
              detail={t('observatory.stage3Detail')}
            />

            <PipelineStep
              step={4}
              label={t('observatory.stage4Title')}
              detail={t('observatory.stage4Detail')}
            />

            <PipelineStep
              step={5}
              label={t('observatory.stage5Title')}
              detail={t('observatory.stage5Detail')}
            />

            <PipelineStep
              step={6}
              label={t('observatory.stage6Title')}
              detail={t('observatory.stage6Detail', {
                suppressed: totalSuppressed,
                kThreshold,
              })}
              color="#B45309"
            />

            <PipelineStep
              step={7}
              label={t('observatory.stage7Title')}
              detail={t('observatory.stage7Detail', {
                cells: aggregateCells.length,
                released: totalReleased,
              })}
              color="var(--color-safe-green)"
            />
          </div>
        )}
      </Card>

      {/* ── K-threshold notice ──────────────────────────────────────────────── */}
      <Card variant="neutral" padding="sm">
        <p
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px',
          }}
        >
          <LockIcon size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
          <span>
            <strong>k ≥ {kThreshold} suppression active. </strong>
            {t('observatory.kThresholdExplanation', {
              k: kThreshold,
            })}{' '}
            <em style={{ color: 'var(--color-text-muted)' }}>
              {t('observatory.differentialPrivacyNote')}
            </em>
          </span>
        </p>
      </Card>

      {/* ── Aggregate chart ─────────────────────────────────────────────────── */}
      {aggregateCells.length > 0 ? (
        <Card variant="default" padding="md" style={{ boxShadow: 'var(--shadow-xs)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--spacing-4)',
              flexWrap: 'wrap',
              gap: 'var(--spacing-2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChartIcon size={18} />
              <h3
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {t('observatory.chartTitle')}
              </h3>
            </div>

            <SegmentedControl
              options={chartViewOptions}
              value={chartView}
              onChange={(val) => setChartView(val)}
              size="sm"
              aria-label="Chart category"
            />
          </div>

          <BarChart
            cells={aggregateCells}
            groupBy={chartGroupBy[chartView]}
          />

          <p
            style={{
              fontSize: '11px',
              color: 'var(--color-text-faint)',
              marginTop: 'var(--spacing-4)',
              fontStyle: 'italic',
            }}
          >
            {t('observatory.chartDisclaimer')}
          </p>
        </Card>
      ) : (
        <Card variant="neutral" padding="lg">
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            {t('observatory.noDataReleased', {
              k: kThreshold,
            })}
          </p>
        </Card>
      )}

      {/* ── Released aggregate cells table ─────────────────────────────────── */}
      <Card variant="default" padding="md" style={{ boxShadow: 'var(--shadow-xs)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-2)',
            flexWrap: 'wrap',
            gap: 'var(--spacing-2)',
          }}
        >
          <h3
            style={{
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
            }}
          >
            {t('observatory.tableTitle')} ({aggregateCells.length}{' '}
            {t('observatory.tableCells')})
          </h3>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCellTable((value) => !value)}
          >
            {showCellTable
              ? t('observatory.hideTable')
              : t('observatory.showTable')}
          </Button>
        </div>

        {showCellTable && (
          <div style={{ overflowX: 'auto', marginTop: 'var(--spacing-3)' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 'var(--font-size-xs)',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: 'var(--color-soft-blue)',
                    textAlign: 'left',
                  }}
                >
                  {[
                    'Harm Category',
                    'Region',
                    'Service Need',
                    'Quarter',
                    'Count',
                  ].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-trust-blue)',
                        borderBottom: '1px solid var(--color-border-blue)',
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {aggregateCells.map((cell, index) => (
                  <tr
                    key={`${cell.harmCategory}-${cell.broadRegion}-${cell.serviceNeed}-${cell.quarterBucket}-${cell.count}-${index}`}
                    style={{
                      borderBottom: '1px solid var(--color-border-subtle)',
                      backgroundColor:
                        index % 2 === 0 ? 'transparent' : 'var(--color-bg-subtle)',
                    }}
                  >
                    <td
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        color: 'var(--color-text-primary)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {cell.harmCategory}
                    </td>

                    <td
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {cell.broadRegion}
                    </td>

                    <td
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {cell.serviceNeed}
                    </td>

                    <td
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {cell.quarterBucket}
                    </td>

                    <td
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        textAlign: 'center',
                      }}
                    >
                      <StatusChip
                        label={`${cell.count}`}
                        variant="memory"
                        size="xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p
              style={{
                fontSize: '11px',
                color: 'var(--color-text-faint)',
                marginTop: 'var(--spacing-3)',
                fontStyle: 'italic',
              }}
            >
              {t('observatory.tableNote', {
                k: kThreshold,
              })}
            </p>
          </div>
        )}
      </Card>

      {/* ── What LIVEGENDER never sees ──────────────────────────────────────── */}
      <Card variant="neutral" padding="md">
        <h3
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-muted-red)',
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <XIcon size={16} />
          <span>{t('observatory.neverSeesTitle')}</span>
        </h3>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {[
            t('observatory.neverSees1'),
            t('observatory.neverSees2'),
            t('observatory.neverSees3'),
            t('observatory.neverSees4'),
            t('observatory.neverSees5'),
            t('observatory.neverSees6'),
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: 'var(--color-muted-red)', marginTop: '2px' }}>
                <XIcon size={13} />
              </span>
              <span style={{ lineHeight: 1.4 }}>{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};