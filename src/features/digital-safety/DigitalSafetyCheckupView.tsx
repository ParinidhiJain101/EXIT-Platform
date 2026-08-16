import { useState, useMemo } from 'react';
import type { FC, ReactNode, CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DIGITAL_SAFETY_CATEGORIES,
  DIGITAL_SAFETY_QUESTIONS,
  SYNTHETIC_PRESET_ANSWERS,
} from '../../services/digitalSafety/digitalSafetyQuestions';
import { evaluateDigitalSafetyCheckup } from '../../services/digitalSafety/digitalSafetyService';
import type {
  DigitalSafetyCategory,
  SelfCheckAnswer,
  AssessmentStatus,
} from '../../services/digitalSafety/digitalSafetyTypes';
import { Card } from '../../components/Card/Card';
import { StatusChip, type StatusChipVariant } from '../../components/StatusChip/StatusChip';
import { Button } from '../../components/Button/Button';
import {
  ShieldCheckIcon,
  SmartphoneIcon,
  UserCheckIcon,
  CompassIcon,
  CommunicationIcon,
  ShareIcon,
  CloudIcon,
  KeyIcon,
  SparklesIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  LockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  RefreshIcon,
  GlobeIcon,
  BarChartIcon,
  ArrowRightIcon,
  CheckIcon,
  FileTextIcon,
  ClockIcon,
} from '../../components/Icons/Icons';

const CATEGORY_ICONS: Record<DigitalSafetyCategory, ReactNode> = {
  device: <SmartphoneIcon size={18} />,
  accounts: <UserCheckIcon size={18} />,
  location: <CompassIcon size={18} />,
  communication: <CommunicationIcon size={18} />,
  social: <ShareIcon size={18} />,
  cloud: <CloudIcon size={18} />,
  recovery: <KeyIcon size={18} />,
};

const STATUS_CHIP_VARIANTS: Record<AssessmentStatus, StatusChipVariant> = {
  looksConfigured: 'safe',
  reviewRecommended: 'helpful',
  needsAttention: 'essential',
  notChecked: 'muted',
};

type PremiumDemoFeatureKey =
  | 'walkthrough'
  | 'actionPlan'
  | 'education'
  | 'periodic'
  | 'continuity';

export const DigitalSafetyCheckupView: FC = () => {
  const { t } = useTranslation();

  /* Preload synthetic demonstration scenario by default */
  const [answers, setAnswers] = useState<Record<string, SelfCheckAnswer | undefined>>(
    SYNTHETIC_PRESET_ANSWERS,
  );

  const [expandedCategories, setExpandedCategories] = useState<Record<DigitalSafetyCategory, boolean>>({
    device: true,
    accounts: true,
    location: true,
    communication: false,
    social: false,
    cloud: false,
    recovery: true,
  });

  const [selectedDemoFeature, setSelectedDemoFeature] =
    useState<PremiumDemoFeatureKey>('walkthrough');

  const [simulatedRevocationDone, setSimulatedRevocationDone] = useState(false);

  const report = useMemo(() => evaluateDigitalSafetyCheckup(answers), [answers]);

  const handleAnswerChange = (questionId: string, value: SelfCheckAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === value ? undefined : value,
    }));
  };

  const handleToggleCategory = (category: DigitalSafetyCategory) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleResetToBlank = () => {
    setAnswers({});
  };

  const handleLoadDemoPreset = () => {
    setAnswers(SYNTHETIC_PRESET_ANSWERS);
    setExpandedCategories({
      device: true,
      accounts: true,
      location: true,
      communication: false,
      social: false,
      cloud: false,
      recovery: true,
    });
  };

  const getAnswerButtonStyle = (isSelected: boolean): CSSProperties => {
    const activeBorder = 'var(--color-trust-blue)';
    const activeBg = 'var(--color-soft-blue)';
    const activeColor = 'var(--color-trust-blue)';

    return {
      flex: 1,
      minHeight: '36px',
      padding: 'var(--spacing-1) var(--spacing-3)',
      borderRadius: 'var(--border-radius-sm)',
      border: isSelected ? `1.5px solid ${activeBorder}` : '1px solid var(--color-border-subtle)',
      backgroundColor: isSelected ? activeBg : 'var(--color-bg-canvas)',
      color: isSelected ? activeColor : 'var(--color-text-secondary)',
      fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
      fontSize: 'var(--font-size-xs)',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
      boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  const premiumFeaturesList: { key: PremiumDemoFeatureKey; icon: ReactNode }[] = [
    { key: 'walkthrough', icon: <UserCheckIcon size={16} /> },
    { key: 'actionPlan', icon: <CheckCircleIcon size={16} /> },
    { key: 'education', icon: <FileTextIcon size={16} /> },
    { key: 'periodic', icon: <ClockIcon size={16} /> },
    { key: 'continuity', icon: <LockIcon size={16} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Header */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 'var(--spacing-2)',
            marginBottom: 'var(--spacing-1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <h2
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {t('digitalSafety.title')}
            </h2>
            <StatusChip
              label={t('digitalSafety.labels.demoBadge')}
              variant="warning"
              size="xs"
              withDot
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            {report.answeredQuestions > 0 ? (
              <Button
                variant="subtle"
                size="sm"
                onClick={handleResetToBlank}
                icon={<RefreshIcon size={13} />}
              >
                {t('digitalSafety.labels.clearPreset')}
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLoadDemoPreset}
                icon={<SparklesIcon size={13} />}
              >
                {t('digitalSafety.labels.loadPreset')}
              </Button>
            )}

            <StatusChip
              label={t('safetyShell.memoryBadge')}
              variant="memory"
              size="sm"
              icon={<ShieldCheckIcon size={13} />}
              withDot
            />
          </div>
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {t('digitalSafety.subtitle')}
        </p>
      </div>

      {/* Synthetic Demo Notice Banner */}
      <Card variant="warning" padding="sm">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
          <span style={{ color: 'var(--color-warm-amber)', marginTop: '2px', flexShrink: 0 }}>
            <LockIcon size={16} />
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
              {t('digitalSafety.privacyNoticeTitle')}
            </h4>
            <p style={{ fontSize: 'var(--font-size-xs)', color: '#744210', lineHeight: 1.45 }}>
              {t('digitalSafety.privacyNoticeText')}
            </p>
          </div>
        </div>
      </Card>

      {/* 2-Column Responsive Layout on Desktop */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--spacing-6)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: 7 Self-Check Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              {t('digitalSafety.freeBadge')} (7 Areas)
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              {t('digitalSafety.labels.answeredCount', {
                answered: report.answeredQuestions,
                total: report.totalQuestions,
              })}
            </span>
          </div>

          {DIGITAL_SAFETY_CATEGORIES.map((category) => {
            const catEval = report.categoryEvaluations[category];
            const isExpanded = expandedCategories[category];
            const questions = DIGITAL_SAFETY_QUESTIONS.filter((q) => q.category === category);
            const statusLabel = t(`digitalSafety.status.${catEval.status}`);
            const chipVariant = STATUS_CHIP_VARIANTS[catEval.status];

            return (
              <Card
                key={category}
                variant={catEval.status === 'needsAttention' ? 'surface' : 'default'}
                padding="md"
                style={{
                  border:
                    catEval.status === 'needsAttention'
                      ? '1px solid var(--color-border-red)'
                      : catEval.status === 'looksConfigured'
                      ? '1px solid var(--color-border-green)'
                      : '1px solid var(--color-border-subtle)',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {/* Category Header Bar */}
                <div
                  onClick={() => handleToggleCategory(category)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  role="button"
                  aria-expanded={isExpanded}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      handleToggleCategory(category);
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--border-radius-sm)',
                        backgroundColor: 'var(--color-bg-subtle)',
                        color: 'var(--color-trust-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {CATEGORY_ICONS[category]}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: 'var(--font-size-base)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--color-text-primary)',
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {t(`digitalSafety.categories.${category}`)}
                      </h4>
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'var(--color-text-muted)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        {t('digitalSafety.labels.questionCount', { count: questions.length })}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                    <StatusChip label={statusLabel} variant={chipVariant} size="xs" withDot />
                    <span style={{ color: 'var(--color-text-muted)', display: 'inline-flex' }}>
                      {isExpanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                    </span>
                  </div>
                </div>

                {/* Question Items (Expanded) */}
                {isExpanded && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-4)',
                      marginTop: 'var(--spacing-4)',
                      paddingTop: 'var(--spacing-4)',
                      borderTop: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    {questions.map((q) => {
                      const currentAnswer = answers[q.id];
                      const isFlagged = currentAnswer === q.flaggedIf;
                      const isUnsure = currentAnswer === 'unsure';
                      const title = t(q.titleKey);
                      const desc = t(q.descriptionKey);
                      const whyMatters = t(q.whyMattersKey);
                      const action = t(q.actionKey);

                      return (
                        <div
                          key={q.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-2)',
                            backgroundColor: 'var(--color-bg-subtle)',
                            padding: 'var(--spacing-3)',
                            borderRadius: 'var(--border-radius-sm)',
                            border: isFlagged
                              ? '1px solid var(--color-border-amber)'
                              : '1px solid transparent',
                          }}
                        >
                          <div>
                            <h5
                              style={{
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 'var(--font-weight-bold)',
                                color: 'var(--color-text-primary)',
                                marginBottom: '2px',
                                lineHeight: 1.35,
                              }}
                            >
                              {title}
                            </h5>
                            <p
                              style={{
                                fontSize: 'var(--font-size-xs)',
                                color: 'var(--color-text-secondary)',
                                lineHeight: 1.4,
                              }}
                            >
                              {desc}
                            </p>
                          </div>

                          {/* 3-Option Toggle */}
                          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }} role="group" aria-label={title}>
                            <button
                              type="button"
                              style={getAnswerButtonStyle(currentAnswer === 'yes')}
                              onClick={() => handleAnswerChange(q.id, 'yes')}
                              aria-pressed={currentAnswer === 'yes'}
                            >
                              {t('common.yes')}
                            </button>
                            <button
                              type="button"
                              style={getAnswerButtonStyle(currentAnswer === 'no')}
                              onClick={() => handleAnswerChange(q.id, 'no')}
                              aria-pressed={currentAnswer === 'no'}
                            >
                              {t('common.no')}
                            </button>
                            <button
                              type="button"
                              style={getAnswerButtonStyle(currentAnswer === 'unsure')}
                              onClick={() => handleAnswerChange(q.id, 'unsure')}
                              aria-pressed={currentAnswer === 'unsure'}
                            >
                              {t('common.unsure')}
                            </button>
                          </div>

                          {/* Inline Deterministic Explainability Box when Flagged */}
                          {(isFlagged || isUnsure) && (
                            <div
                              style={{
                                backgroundColor: isFlagged ? 'var(--color-soft-amber)' : 'var(--color-bg-canvas)',
                                borderLeft: `3px solid ${isFlagged ? 'var(--color-warm-amber)' : 'var(--color-trust-blue)'}`,
                                padding: 'var(--spacing-2) var(--spacing-3)',
                                borderRadius: '0 var(--border-radius-xs) var(--border-radius-xs) 0',
                                fontSize: 'var(--font-size-xs)',
                                marginTop: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                              }}
                            >
                              <div style={{ color: 'var(--color-text-primary)' }}>
                                <strong style={{ color: isFlagged ? '#92400E' : 'var(--color-trust-blue)' }}>
                                  {t('digitalSafety.labels.whyMatters')}{' '}
                                </strong>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{whyMatters}</span>
                              </div>
                              <div style={{ color: 'var(--color-text-primary)' }}>
                                <strong style={{ color: isFlagged ? '#92400E' : 'var(--color-trust-blue)' }}>
                                  {t('digitalSafety.labels.whatYouCanDo')}{' '}
                                </strong>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{action}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Right Column: Checkup Breakdown, DIGITAL SAFETY PLUS Showcase & Scale Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
          {/* Checkup Overview Card */}
          <Card variant="surface" padding="md" style={{ boxShadow: 'var(--shadow-xs)' }}>
            <h3
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              {t('digitalSafety.labels.summaryHeading')}
            </h3>

            {/* Answered Progress Pill */}
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: '4px',
                }}
              >
                <span>
                  {t('digitalSafety.labels.answeredCount', {
                    answered: report.answeredQuestions,
                    total: report.totalQuestions,
                  })}
                </span>
                <span>
                  {Math.round((report.answeredQuestions / report.totalQuestions) * 100)}%
                </span>
              </div>
              <div
                style={{
                  height: '6px',
                  borderRadius: 'var(--border-radius-full)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(report.answeredQuestions / report.totalQuestions) * 100}%`,
                    backgroundColor: 'var(--color-trust-blue)',
                    borderRadius: 'var(--border-radius-full)',
                    transition: 'width var(--transition-smooth)',
                  }}
                />
              </div>
            </div>

            {/* Status Breakdown Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--spacing-2)',
                fontSize: 'var(--font-size-xs)',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-bg-subtle)',
                  padding: 'var(--spacing-2)',
                  borderRadius: 'var(--border-radius-xs)',
                }}
              >
                <div style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                  {t('digitalSafety.status.looksConfigured')}
                </div>
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-safe-green)' }}>
                  {report.statusSummary.looksConfigured}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-bg-subtle)',
                  padding: 'var(--spacing-2)',
                  borderRadius: 'var(--border-radius-xs)',
                }}
              >
                <div style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                  {t('digitalSafety.status.reviewRecommended')}
                </div>
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-warm-amber)' }}>
                  {report.statusSummary.reviewRecommended}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-bg-subtle)',
                  padding: 'var(--spacing-2)',
                  borderRadius: 'var(--border-radius-xs)',
                }}
              >
                <div style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                  {t('digitalSafety.status.needsAttention')}
                </div>
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-muted-red)' }}>
                  {report.statusSummary.needsAttention}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-bg-subtle)',
                  padding: 'var(--spacing-2)',
                  borderRadius: 'var(--border-radius-xs)',
                }}
              >
                <div style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                  {t('digitalSafety.status.notChecked')}
                </div>
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-muted)' }}>
                  {report.statusSummary.notChecked}
                </div>
              </div>
            </div>
          </Card>

          {/* Identified Recommendations List */}
          {report.flaggedItems.length > 0 && (
            <Card variant="default" padding="md" style={{ boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-3)' }}>
                <AlertTriangleIcon size={16} />
                <h3
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {t('digitalSafety.labels.recommendationsTitle')} ({report.flaggedItems.length})
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                {report.flaggedItems.map(({ question, severity }) => (
                  <div
                    key={question.id}
                    style={{
                      borderLeft: `3px solid ${severity === 'needsAttention' ? 'var(--color-muted-red)' : 'var(--color-warm-amber)'}`,
                      paddingLeft: 'var(--spacing-2)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {t(question.titleKey)}
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.4, margin: 0 }}>
                      {t(question.actionKey)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* DIGITAL SAFETY PLUS — Interactive Premium Feature Demonstration */}
          <Card
            variant="surface"
            padding="lg"
            style={{
              border: '1.5px solid #2563EB',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-4)',
            }}
          >
            {/* Top Brand Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-trust-blue)' }}>
                  <SparklesIcon size={18} />
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-bold)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('digitalSafety.plus.title')}
                  </span>
                </div>
                <StatusChip
                  label={t('digitalSafety.plus.badge')}
                  variant="safe"
                  size="xs"
                  icon={<SparklesIcon size={11} />}
                  withDot
                />
              </div>

              <h4
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: '2px',
                  lineHeight: 1.3,
                }}
              >
                {t('digitalSafety.plus.subtitle')}
              </h4>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                {t('digitalSafety.plus.intro')}
              </p>
            </div>

            {/* FREE vs PLUS Value Comparison */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--spacing-3)',
                backgroundColor: 'var(--color-bg-subtle)',
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '11px',
              }}
            >
              <div>
                <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  {t('digitalSafety.plus.freeTierTitle')}
                </strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', color: 'var(--color-text-secondary)' }}>
                  <div>• {t('digitalSafety.plus.freeTier1')}</div>
                  <div>• {t('digitalSafety.plus.freeTier2')}</div>
                  <div>• {t('digitalSafety.plus.freeTier3')}</div>
                  <div>• {t('digitalSafety.plus.freeTier4')}</div>
                </div>
              </div>

              <div style={{ borderLeft: '1px solid var(--color-border-subtle)', paddingLeft: 'var(--spacing-2)' }}>
                <strong style={{ color: 'var(--color-trust-blue)', display: 'block', marginBottom: '4px' }}>
                  {t('digitalSafety.plus.plusTierTitle')}
                </strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', color: 'var(--color-text-secondary)' }}>
                  <div>✓ {t('digitalSafety.plus.plusTier1')}</div>
                  <div>✓ {t('digitalSafety.plus.plusTier2')}</div>
                  <div>✓ {t('digitalSafety.plus.plusTier3')}</div>
                  <div>✓ {t('digitalSafety.plus.plusTier4')}</div>
                  <div>✓ {t('digitalSafety.plus.plusTier5')}</div>
                </div>
              </div>
            </div>

            {/* Interactive Demo Features Tab Selector */}
            <div>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-2)' }}>
                {t('digitalSafety.plus.exploreCta')} (Select Demo Capability):
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {premiumFeaturesList.map(({ key, icon }) => {
                  const isSelected = selectedDemoFeature === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedDemoFeature(key)}
                      style={{
                        padding: '4px 9px',
                        borderRadius: 'var(--border-radius-sm)',
                        border: isSelected
                          ? '1.5px solid var(--color-trust-blue)'
                          : '1px solid var(--color-border-subtle)',
                        backgroundColor: isSelected
                          ? 'var(--color-soft-blue)'
                          : 'var(--color-bg-canvas)',
                        color: isSelected
                          ? 'var(--color-trust-blue)'
                          : 'var(--color-text-secondary)',
                        fontSize: '11.5px',
                        fontWeight: isSelected
                          ? 'var(--font-weight-semibold)'
                          : 'var(--font-weight-medium)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {icon}
                      <span>{t(`digitalSafety.plus.demoFeatures.${key}.title`)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Interactive Feature Synthetic Preview */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border-blue)',
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--border-radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-2)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h5
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--color-text-primary)',
                        margin: 0,
                      }}
                    >
                      {t(`digitalSafety.plus.demoFeatures.${selectedDemoFeature}.resTitle`)}
                    </h5>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                    {t(`digitalSafety.plus.demoFeatures.${selectedDemoFeature}.sub`)}
                  </p>
                </div>
                <StatusChip
                  label={t('digitalSafety.plus.demoFeatures.' + selectedDemoFeature + '.tag')}
                  variant="safe"
                  size="xs"
                />
              </div>

              {/* Dynamic Feature Synthetic Result Demonstration */}
              {selectedDemoFeature === 'walkthrough' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--font-size-xs)', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <CheckCircleIcon size={13} style={{ color: 'var(--color-safe-green)', flexShrink: 0 }} />
                    <span>{t('digitalSafety.plus.demoFeatures.walkthrough.stat1')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991B1B' }}>
                    <AlertTriangleIcon size={13} style={{ color: 'var(--color-warm-amber)', flexShrink: 0 }} />
                    <span>{t('digitalSafety.plus.demoFeatures.walkthrough.stat2')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <CheckCircleIcon size={13} style={{ color: 'var(--color-safe-green)', flexShrink: 0 }} />
                    <span>{t('digitalSafety.plus.demoFeatures.walkthrough.stat3')}</span>
                  </div>

                  <div style={{ marginTop: '4px' }}>
                    <button
                      type="button"
                      onClick={() => setSimulatedRevocationDone(!simulatedRevocationDone)}
                      style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        borderRadius: 'var(--border-radius-xs)',
                        backgroundColor: simulatedRevocationDone ? 'var(--color-soft-green)' : 'var(--color-trust-blue)',
                        color: simulatedRevocationDone ? '#065F46' : 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'var(--font-weight-semibold)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {simulatedRevocationDone ? <CheckIcon size={12} /> : <ArrowRightIcon size={12} />}
                      <span>
                        {simulatedRevocationDone
                          ? 'Simulated Session Successfully Revoked'
                          : t('digitalSafety.plus.demoFeatures.walkthrough.actionHint')}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {selectedDemoFeature === 'actionPlan' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--font-size-xs)', marginTop: '4px' }}>
                  <div style={{ padding: '4px 8px', backgroundColor: 'var(--color-bg-canvas)', borderRadius: 'var(--border-radius-xs)', borderLeft: '3px solid var(--color-muted-red)' }}>
                    <strong style={{ color: 'var(--color-text-primary)' }}>Priority 1 (Immediate): </strong>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{t('digitalSafety.plus.demoFeatures.actionPlan.step1')}</span>
                  </div>
                  <div style={{ padding: '4px 8px', backgroundColor: 'var(--color-bg-canvas)', borderRadius: 'var(--border-radius-xs)', borderLeft: '3px solid var(--color-warm-amber)' }}>
                    <strong style={{ color: 'var(--color-text-primary)' }}>Priority 2 (24 Hours): </strong>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{t('digitalSafety.plus.demoFeatures.actionPlan.step2')}</span>
                  </div>
                  <div style={{ padding: '4px 8px', backgroundColor: 'var(--color-bg-canvas)', borderRadius: 'var(--border-radius-xs)', borderLeft: '3px solid var(--color-safe-green)' }}>
                    <strong style={{ color: 'var(--color-text-primary)' }}>Priority 3 (48 Hours): </strong>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{t('digitalSafety.plus.demoFeatures.actionPlan.step3')}</span>
                  </div>
                </div>
              )}

              {selectedDemoFeature === 'education' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--font-size-xs)', marginTop: '4px' }}>
                  <div style={{ padding: '6px 8px', backgroundColor: 'var(--color-bg-canvas)', borderRadius: 'var(--border-radius-xs)', border: '1px solid var(--color-border-subtle)' }}>
                    <div style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-trust-blue)' }}>
                      📖 {t('digitalSafety.plus.demoFeatures.education.mod1Title')}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '11px', marginTop: '2px' }}>
                      {t('digitalSafety.plus.demoFeatures.education.mod1Desc')}
                    </div>
                  </div>
                  <div style={{ padding: '6px 8px', backgroundColor: 'var(--color-bg-canvas)', borderRadius: 'var(--border-radius-xs)', border: '1px solid var(--color-border-subtle)' }}>
                    <div style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-trust-blue)' }}>
                      📍 {t('digitalSafety.plus.demoFeatures.education.mod2Title')}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '11px', marginTop: '2px' }}>
                      {t('digitalSafety.plus.demoFeatures.education.mod2Desc')}
                    </div>
                  </div>
                  <div style={{ padding: '6px 8px', backgroundColor: 'var(--color-bg-canvas)', borderRadius: 'var(--border-radius-xs)', border: '1px solid var(--color-border-subtle)' }}>
                    <div style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-trust-blue)' }}>
                      🔑 {t('digitalSafety.plus.demoFeatures.education.mod3Title')}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '11px', marginTop: '2px' }}>
                      {t('digitalSafety.plus.demoFeatures.education.mod3Desc')}
                    </div>
                  </div>
                </div>
              )}

              {selectedDemoFeature === 'periodic' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--font-size-xs)', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <CheckCircleIcon size={13} style={{ color: 'var(--color-safe-green)', flexShrink: 0 }} />
                    <span>{t('digitalSafety.plus.demoFeatures.periodic.p1')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400E' }}>
                    <AlertTriangleIcon size={13} style={{ color: 'var(--color-warm-amber)', flexShrink: 0 }} />
                    <span>{t('digitalSafety.plus.demoFeatures.periodic.p2')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <CheckCircleIcon size={13} style={{ color: 'var(--color-safe-green)', flexShrink: 0 }} />
                    <span>{t('digitalSafety.plus.demoFeatures.periodic.p3')}</span>
                  </div>
                </div>
              )}

              {selectedDemoFeature === 'continuity' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--font-size-xs)', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <CheckCircleIcon size={13} style={{ color: 'var(--color-safe-green)', flexShrink: 0 }} />
                    <span>{t('digitalSafety.plus.demoFeatures.continuity.c1')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <CheckCircleIcon size={13} style={{ color: 'var(--color-safe-green)', flexShrink: 0 }} />
                    <span>{t('digitalSafety.plus.demoFeatures.continuity.c2')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <CheckCircleIcon size={13} style={{ color: 'var(--color-safe-green)', flexShrink: 0 }} />
                    <span>{t('digitalSafety.plus.demoFeatures.continuity.c3')}</span>
                  </div>
                </div>
              )}

              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  fontStyle: 'italic',
                  marginTop: '4px',
                }}
              >
                {t('digitalSafety.plus.syntheticResultNotice')}
              </div>
            </div>

            {/* Prototype judge disclosure */}
            <div
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              {t('digitalSafety.plus.prototypeNotice')}
            </div>
          </Card>

          {/* Business Pillars: WHY THIS CAN SCALE */}
          <Card variant="neutral" padding="md">
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <h4
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '2px',
                }}
              >
                {t('digitalSafety.scale.title')}
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                {t('digitalSafety.scale.subtitle')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
                <span style={{ color: 'var(--color-trust-blue)', marginTop: '1px' }}>
                  <SparklesIcon size={14} />
                </span>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>
                    {t('digitalSafety.scale.consumerTitle')}:{' '}
                  </strong>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {t('digitalSafety.scale.consumerDesc')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
                <span style={{ color: 'var(--color-safe-green)', marginTop: '1px' }}>
                  <GlobeIcon size={14} />
                </span>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>
                    {t('digitalSafety.scale.institutionalTitle')}:{' '}
                  </strong>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {t('digitalSafety.scale.institutionalDesc')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}>
                <span style={{ color: 'var(--color-warm-amber)', marginTop: '1px' }}>
                  <BarChartIcon size={14} />
                </span>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>
                    {t('digitalSafety.scale.observatoryTitle')}:{' '}
                  </strong>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {t('digitalSafety.scale.observatoryDesc')}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
