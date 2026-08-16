import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import type { PlanNeeds } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';

type NeedKey = keyof PlanNeeds;

interface CategoryConfig {
  key: NeedKey;
  icon: string;
}

const CATEGORIES: CategoryConfig[] = [
  { key: 'communicationSafety', icon: '💬' },
  { key: 'documents', icon: '📄' },
  { key: 'money', icon: '💳' },
  { key: 'housing', icon: '🏠' },
  { key: 'children', icon: '🧸' },
  { key: 'health', icon: '🩺' },
  { key: 'legal', icon: '⚖️' },
  { key: 'digitalSafety', icon: '🔒' },
  { key: 'work', icon: '💼' },
];

export const NeedsSelectionStep: FC = () => {
  const { t } = useTranslation();
  const { planNeeds, setPlanNeeds } = useSession();

  const toggleNeed = (key: NeedKey) => {
    setPlanNeeds({ [key]: !planNeeds[key] });
  };

  const selectedCount = Object.values(planNeeds).filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-deep-ink)', marginBottom: 'var(--spacing-1)' }}>
            {t('onboarding.needsStep.title')}
          </h2>
          <p style={{ color: '#486581', fontSize: 'var(--font-size-sm)' }}>
            {t('onboarding.needsStep.description')}
          </p>
        </div>
        <StatusChip
          label={t('onboarding.summaryStep.needsCount', { count: selectedCount })}
          variant={selectedCount > 0 ? 'safe' : 'muted'}
          size="sm"
        />
      </div>

      <div
        role="group"
        aria-label={t('onboarding.needsStep.title')}
        className="responsive-grid-2col"
      >
        {CATEGORIES.map(({ key, icon }) => {
          const isSelected = !!planNeeds[key];
          const title = t(`onboarding.needsStep.categories.${key}.title`);
          const description = t(`onboarding.needsStep.categories.${key}.description`);

          return (
            <Card
              key={key}
              variant={isSelected ? 'surface' : 'default'}
              padding="sm"
              style={{
                cursor: 'pointer',
                border: isSelected ? '2px solid var(--color-trust-blue)' : '1px solid #E2E8F0',
                transition: 'all 0.15s ease',
              }}
              onClick={() => toggleNeed(key)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggleNeed(key);
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
                <span style={{ fontSize: '20px', lineHeight: 1, marginTop: '2px' }} aria-hidden="true">
                  {icon}
                </span>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-deep-ink)' }}>
                      {title}
                    </h3>
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isSelected ? '2px solid var(--color-trust-blue)' : '2px solid #CBD5E1',
                        backgroundColor: isSelected ? 'var(--color-trust-blue)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                      aria-hidden="true"
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: '#486581', lineHeight: 1.4 }}>
                    {description}
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
