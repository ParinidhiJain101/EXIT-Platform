import { useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import { PrivacyStep } from './PrivacyStep';
import { DeviceSafetyStep } from './DeviceSafetyStep';
import { NeedsSelectionStep } from './NeedsSelectionStep';
import { SummaryStep } from './SummaryStep';
import { Button } from '../../components/Button/Button';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { ShieldCheckIcon, ArrowRightIcon, ArrowLeftIcon } from '../../components/Icons/Icons';

export const ExitPlanOnboarding: FC = () => {
  const { t } = useTranslation();
  const { completeOnboarding } = useSession();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PrivacyStep />;
      case 2:
        return <DeviceSafetyStep />;
      case 3:
        return <NeedsSelectionStep />;
      case 4:
        return <SummaryStep onGoToStep={(step) => setCurrentStep(step)} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Top Stepper Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StatusChip
            label={t('onboarding.badge')}
            variant="memory"
            size="sm"
            icon={<ShieldCheckIcon size={13} />}
          />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)' }}>
            {t('common.step', { current: currentStep, total: totalSteps })}
          </span>
        </div>

        {/* Segmented Progress Track */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${totalSteps}, 1fr)`,
            gap: '6px',
            width: '100%',
          }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={t('common.step', { current: currentStep, total: totalSteps })}
        >
          {Array.from({ length: totalSteps }).map((_, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div
                key={stepNum}
                style={{
                  height: '4px',
                  borderRadius: 'var(--border-radius-full)',
                  backgroundColor: isCompleted || isCurrent ? 'var(--color-trust-blue)' : 'var(--color-border-subtle)',
                  opacity: isCompleted ? 0.7 : isCurrent ? 1 : 0.4,
                  transition: 'all var(--transition-smooth)',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Step Content */}
      <div style={{ minHeight: '340px' }}>
        {renderCurrentStep()}
      </div>

      {/* Bottom Navigation Buttons */}
      <div
        className="responsive-button-row"
        style={{
          marginTop: 'var(--spacing-4)',
          paddingTop: 'var(--spacing-4)',
          borderTop: '1px solid var(--color-border-subtle)',
        }}
      >
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={handleBack}
            icon={<ArrowLeftIcon size={16} />}
            style={{ flex: 1 }}
          >
            {t('common.back')}
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleNext}
          icon={currentStep < totalSteps ? <ArrowRightIcon size={16} /> : <ShieldCheckIcon size={16} />}
          style={{ flex: currentStep > 1 ? 2 : 1 }}
        >
          {currentStep === totalSteps
            ? t('onboarding.summaryStep.startPlanButton')
            : t('common.continue')}
        </Button>
      </div>
    </div>
  );
};
