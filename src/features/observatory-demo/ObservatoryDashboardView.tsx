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

// ─── Mini bar chart component ────────────────────────────────────────────────

interface BarChartProps {
  cells: AggregateCell[];
  groupBy: 'harmCategory' | 'serviceNeed' | 'broadRegion';
  maxBarWidth?: number;
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
            gap: 'var(--spacing-2)',
          }}
        >
          <div
            style={{
              width: '140px',
              flexShrink: 0,
              fontSize: '11px',
              color: '#334E68',
              textAlign: 'right',
              lineHeight: 1.3,
            }}
          >
            {label}
          </div>

          <div
            style={{
              flex: 1,
              height: '18px',
              backgroundColor: '#EBF5FF',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${(count / max) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--color-trust-blue)',
                borderRadius: '4px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>

          <div
            style={{
              width: '36px',
              flexShrink: 0,
              fontSize: '11px',
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
  color = '#334E68',
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--spacing-2)',
    }}
  >
    <div
      style={{
        width: '24px',
        height: '24px',
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
          color: 'var(--color-deep-ink)',
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-5)',
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
                  color: 'var(--color-deep-ink)',
                  margin: 0,
                }}
              >
                {t('observatory.title')}
              </h2>

              <StatusChip
                label={t('observatory.syntheticBadge')}
                variant="warning"
                size="sm"
              />
            </div>

            <p
              style={{
                color: '#486581',
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
          <span style={{ fontSize: '18px' }} aria-hidden="true">
            ⚠️
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
          <h3
            style={{
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-deep-ink)',
            }}
          >
            🔏 {t('observatory.pipelineTitle')}
          </h3>

          <Button
            variant="ghost"
            onClick={() => setShowPipelineDetail((value) => !value)}
            style={{
              fontSize: 'var(--font-size-xs)',
              minHeight: '30px',
              padding: 'var(--spacing-1) var(--spacing-2)',
            }}
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
              color: '#334E68',
              bg: '#F0F7FF',
            },
            {
              label: t('observatory.statRejected'),
              value: rejected,
              color: '#B03A2E',
              bg: '#FEF2F2',
            },
            {
              label: t('observatory.statAccepted'),
              value: totalAccepted,
              color: '#1E8449',
              bg: '#F0FFF4',
            },
            {
              label: t('observatory.statSuppressed'),
              value: totalSuppressed,
              color: '#744210',
              bg: '#FFFBEB',
            },
            {
              label: t('observatory.statReleased'),
              value: totalReleased,
              color: 'var(--color-trust-blue)',
              bg: 'var(--color-soft-blue)',
            },
          ].map(({ label, value, color, bg }) => (
            <div
              key={label}
              style={{
                backgroundColor: bg,
                borderRadius: 'var(--border-radius-sm)',
                padding: 'var(--spacing-3)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color,
                }}
              >
                {value}
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: '#475569',
                  marginTop: '2px',
                  lineHeight: 1.3,
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
              borderTop: '1px solid #D0E1FD',
              paddingTop: 'var(--spacing-3)',
            }}
          >
            <PipelineStep
              step={1}
              label={t('observatory.stage1Title')}
              detail={t('observatory.stage1Detail', { rejected })}
              color="#B03A2E"
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
              color="#744210"
            />

            <PipelineStep
              step={7}
              label={t('observatory.stage7Title')}
              detail={t('observatory.stage7Detail', {
                cells: aggregateCells.length,
                released: totalReleased,
              })}
              color="#1E8449"
            />
          </div>
        )}
      </Card>

      {/* ── K-threshold notice ──────────────────────────────────────────────── */}
      <Card variant="neutral" padding="sm">
        <p
          style={{
            fontSize: 'var(--font-size-xs)',
            color: '#334E68',
            lineHeight: 1.5,
          }}
        >
          <strong>🔒 k ≥ {kThreshold} suppression active. </strong>

          {t('observatory.kThresholdExplanation', {
            k: kThreshold,
          })}{' '}

          <em style={{ color: '#64748B' }}>
            {t('observatory.differentialPrivacyNote')}
          </em>
        </p>
      </Card>

      {/* ── Aggregate chart ─────────────────────────────────────────────────── */}
      {aggregateCells.length > 0 ? (
        <Card variant="default" padding="md">
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
            <h3
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-deep-ink)',
              }}
            >
              📊 {t('observatory.chartTitle')}
            </h3>

            <div
              style={{
                display: 'flex',
                gap: 'var(--spacing-1)',
              }}
            >
              {(['harm', 'service', 'region'] as ChartView[]).map((view) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setChartView(view)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--border-radius-full)',
                    border: '1px solid',
                    borderColor:
                      chartView === view
                        ? 'var(--color-trust-blue)'
                        : '#CBD5E1',
                    backgroundColor:
                      chartView === view
                        ? 'var(--color-trust-blue)'
                        : 'transparent',
                    color: chartView === view ? 'white' : '#475569',
                    fontSize: '11px',
                    fontWeight: 'var(--font-weight-medium)',
                    cursor: 'pointer',
                  }}
                >
                  {t(`observatory.chartBy.${view}`)}
                </button>
              ))}
            </div>
          </div>

          <BarChart
            cells={aggregateCells}
            groupBy={chartGroupBy[chartView]}
          />

          <p
            style={{
              fontSize: '10px',
              color: '#94A3B8',
              marginTop: 'var(--spacing-3)',
              fontStyle: 'italic',
            }}
          >
            {t('observatory.chartDisclaimer')}
          </p>
        </Card>
      ) : (
        <Card variant="neutral" padding="md">
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: '#64748B',
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
      <Card variant="default" padding="md">
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
              color: 'var(--color-deep-ink)',
            }}
          >
            {t('observatory.tableTitle')} ({aggregateCells.length}{' '}
            {t('observatory.tableCells')})
          </h3>

          <Button
            variant="ghost"
            onClick={() => setShowCellTable((value) => !value)}
            style={{
              fontSize: 'var(--font-size-xs)',
              minHeight: '30px',
              padding: 'var(--spacing-1) var(--spacing-2)',
            }}
          >
            {showCellTable
              ? t('observatory.hideTable')
              : t('observatory.showTable')}
          </Button>
        </div>

        {showCellTable && (
          <div style={{ overflowX: 'auto' }}>
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
                        color: '#334E68',
                        borderBottom: '1px solid #D0E1FD',
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
                      borderBottom: '1px solid #E2E8F0',
                      backgroundColor:
                        index % 2 === 0 ? 'transparent' : '#F8FAFC',
                    }}
                  >
                    <td
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        color: 'var(--color-deep-ink)',
                      }}
                    >
                      {cell.harmCategory}
                    </td>

                    <td
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        color: '#475569',
                      }}
                    >
                      {cell.broadRegion}
                    </td>

                    <td
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        color: '#475569',
                      }}
                    >
                      {cell.serviceNeed}
                    </td>

                    <td
                      style={{
                        padding:
                          'var(--spacing-2) var(--spacing-3)',
                        color: '#64748B',
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
                        size="sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p
              style={{
                fontSize: '10px',
                color: '#94A3B8',
                marginTop: 'var(--spacing-2)',
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
            color: 'var(--color-deep-ink)',
            marginBottom: 'var(--spacing-2)',
          }}
        >
          🚫 {t('observatory.neverSeesTitle')}
        </h3>

        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-1)',
            paddingLeft: 'var(--spacing-4)',
            fontSize: 'var(--font-size-xs)',
            color: '#475569',
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
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};