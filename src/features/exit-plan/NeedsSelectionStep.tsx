import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../context/useSession';
import type { PlanNeeds } from '../../api/types';
import { Card } from '../../components/Card/Card';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import {
  CommunicationIcon,
  DocumentsIcon,
  MoneyIcon,
  HousingIcon,
  ChildrenIcon,
  HealthIcon,
  LegalIcon,
  DigitalSafetyIcon,
  WorkIcon,
  CheckIcon,
} from '../../components/Icons/Icons';

type NeedKey = keyof PlanNeeds;

interface CategoryConfig {
  key: NeedKey;
  icon: ReactNode;
}

const CATEGORIES: CategoryConfig[] = [
  { key: 'communicationSafety', icon: <CommunicationIcon size={20} /> },
  { key: 'documents', icon: <DocumentsIcon size={20} /> },
  { key: 'money', icon: <MoneyIcon size={20} /> },
  { key: 'housing', icon: <HousingIcon size={20} /> },
  { key: 'children', icon: <ChildrenIcon size={20} /> },
  { key: 'health', icon: <HealthIcon size={20} /> },
  { key: 'legal', icon: <LegalIcon size={20} /> },
  { key: 'digitalSafety', icon: <DigitalSafetyIcon size={20} /> },
  { key: 'work', icon: <WorkIcon size={20} /> },
];

export const NeedsSelectionStep: FC = () => {
  const { t } = useTranslation();
  const { planNeeds, setPlanNeeds } = useSession();

  const toggleNeed = (key: NeedKey) => {
    setPlanNeeds({ [key]: !planNeeds[key] });
  };

  const selectedCount = Object.values(planNeeds).filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
        <div>
          <h2
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--spacing-1)',
            }}
          >
            {t('onboarding.needsStep.title')}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
            {t('onboarding.needsStep.description')}
          </p>
        </div>
        <StatusChip
          label={t('onboarding.summaryStep.needsCount', { count: selectedCount })}
          variant={selectedCount > 0 ? 'safe' : 'muted'}
          size="sm"
          withDot={selectedCount > 0}
        />
      </div>

      <div
        role="group"
        aria-label={t('onboarding.needsStep.title')}
        className="responsive-grid-3col"
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
                border: isSelected ? '1.5px solid var(--color-trust-blue)' : '1px solid var(--color-border-subtle)',
                boxShadow: isSelected ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                {/* Icon & Checkbox Top Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: isSelected ? 'var(--color-trust-blue)' : 'var(--color-bg-subtle)',
                      color: isSelected ? 'white' : 'var(--color-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all var(--transition-fast)',
                    }}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>

                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: 'var(--border-radius-xs)',
                      border: isSelected ? '2px solid var(--color-trust-blue)' : '1.5px solid var(--color-border-default)',
                      backgroundColor: isSelected ? 'var(--color-trust-blue)' : 'var(--color-bg-canvas)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'all var(--transition-fast)',
                    }}
                    aria-hidden="true"
                  >
                    {isSelected && <CheckIcon size={14} />}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-text-primary)',
                      marginBottom: '4px',
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.45,
                    }}
                  >
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
