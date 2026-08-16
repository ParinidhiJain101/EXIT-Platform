import type { FC, ReactNode, CSSProperties } from 'react';

export type StatusChipVariant =
  | 'quiet'
  | 'memory'
  | 'info'
  | 'safe'
  | 'warning'
  | 'muted'
  | 'essential'
  | 'high'
  | 'helpful'
  | 'optional'
  | 'prepared'
  | 'partiallyPrepared'
  | 'needsAttention'
  | 'notPlanned';

export interface StatusChipProps {
  label: string;
  variant?: StatusChipVariant;
  icon?: ReactNode;
  size?: 'sm' | 'md';
}

export const StatusChip: FC<StatusChipProps> = ({
  label,
  variant = 'info',
  icon,
  size = 'md',
}) => {
  const getVariantStyles = (): CSSProperties => {
    switch (variant) {
      case 'quiet':
        return {
          backgroundColor: '#EDE9FE',
          color: '#5B21B6',
          border: '1px solid #DDD6FE',
        };
      case 'memory':
        return {
          backgroundColor: 'var(--color-soft-blue)',
          color: 'var(--color-trust-blue)',
          border: '1px solid #D0E1FD',
        };
      case 'safe':
      case 'prepared':
        return {
          backgroundColor: 'var(--color-soft-green)',
          color: 'var(--color-safe-green)',
          border: '1px solid #C3E6CB',
        };
      case 'warning':
      case 'needsAttention':
        return {
          backgroundColor: 'var(--color-soft-amber)',
          color: 'var(--color-warm-amber)',
          border: '1px solid #FFEAA7',
        };
      case 'partiallyPrepared':
      case 'helpful':
      case 'info':
        return {
          backgroundColor: 'var(--color-soft-blue)',
          color: 'var(--color-trust-blue)',
          border: '1px solid #D0E1FD',
        };
      case 'essential':
        return {
          backgroundColor: '#FDEDEC',
          color: '#B03A2E',
          border: '1px solid #F5C6CB',
        };
      case 'high':
        return {
          backgroundColor: '#FFF4D6',
          color: '#B9770E',
          border: '1px solid #FFEAA7',
        };
      case 'optional':
      case 'notPlanned':
      case 'muted':
      default:
        return {
          backgroundColor: 'var(--color-neutral-grey)',
          color: '#64748B',
          border: '1px solid #E2E8F0',
        };
    }
  };

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-1)',
    borderRadius: 'var(--border-radius-full)',
    padding: size === 'sm' ? '2px 8px' : '4px 10px',
    fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 1.2,
    ...getVariantStyles(),
  };

  return (
    <span style={style}>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
