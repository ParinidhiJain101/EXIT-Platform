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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      {/* Top Progress & Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StatusChip label={t('onboarding.badge')} variant="memory" size="sm" />
        <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#627D98' }}>
          {t('common.step', { current: currentStep, total: totalSteps })}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#E2E8F0',
          borderRadius: 'var(--border-radius-full)',
          overflow: 'hidden',
        }}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={t('common.step', { current: currentStep, total: totalSteps })}
      >
        <div
          style={{
            height: '100%',
            width: `${(currentStep / totalSteps) * 100}%`,
            backgroundColor: 'var(--color-trust-blue)',
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      {/* Main Step Content */}
      <div style={{ minHeight: '320px' }}>
        {renderCurrentStep()}
      </div>

      {/* Bottom Navigation Buttons */}
      <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-4)', paddingTop: 'var(--spacing-3)', borderTop: '1px solid var(--color-neutral-grey)' }}>
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={handleBack}
            style={{ flex: 1 }}
          >
            {t('common.back')}
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleNext}
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
