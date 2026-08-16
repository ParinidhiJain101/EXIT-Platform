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
  size?: 'xs' | 'sm' | 'md';
  withDot?: boolean;
}

export const StatusChip: FC<StatusChipProps> = ({
  label,
  variant = 'info',
  icon,
  size = 'md',
  withDot = false,
}) => {
  const getVariantStyles = (): { bg: string; color: string; border: string; dot: string } => {
    switch (variant) {
      case 'quiet':
        return {
          bg: 'var(--color-soft-purple)',
          color: 'var(--color-quiet-purple)',
          border: 'var(--color-border-purple)',
          dot: 'var(--color-quiet-purple)',
        };
      case 'memory':
        return {
          bg: 'var(--color-soft-blue)',
          color: 'var(--color-trust-blue)',
          border: 'var(--color-border-blue)',
          dot: 'var(--color-trust-blue)',
        };
      case 'safe':
      case 'prepared':
        return {
          bg: 'var(--color-soft-green)',
          color: 'var(--color-safe-green)',
          border: 'var(--color-border-green)',
          dot: 'var(--color-safe-green)',
        };
      case 'warning':
      case 'needsAttention':
        return {
          bg: 'var(--color-soft-amber)',
          color: 'var(--color-warm-amber)',
          border: 'var(--color-border-amber)',
          dot: 'var(--color-warm-amber)',
        };
      case 'essential':
        return {
          bg: 'var(--color-soft-rose)',
          color: 'var(--color-muted-red)',
          border: 'var(--color-border-red)',
          dot: 'var(--color-muted-red)',
        };
      case 'high':
        return {
          bg: 'var(--color-soft-amber)',
          color: '#B45309',
          border: 'var(--color-border-amber)',
          dot: '#B45309',
        };
      case 'partiallyPrepared':
      case 'helpful':
      case 'info':
        return {
          bg: 'var(--color-soft-blue)',
          color: 'var(--color-trust-blue)',
          border: 'var(--color-border-blue)',
          dot: 'var(--color-trust-blue)',
        };
      case 'optional':
      case 'notPlanned':
      case 'muted':
      default:
        return {
          bg: 'var(--color-bg-subtle)',
          color: 'var(--color-text-muted)',
          border: 'var(--color-border-subtle)',
          dot: 'var(--color-text-muted)',
        };
    }
  };

  const { bg, color, border, dot } = getVariantStyles();

  const getSizeStyles = (): CSSProperties => {
    switch (size) {
      case 'xs':
        return {
          padding: '1px 7px',
          fontSize: '11px',
          gap: '4px',
        };
      case 'sm':
        return {
          padding: '2px 9px',
          fontSize: '12px',
          gap: '5px',
        };
      case 'md':
      default:
        return {
          padding: '4px 12px',
          fontSize: '13px',
          gap: '6px',
        };
    }
  };

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'var(--border-radius-full)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 1.25,
    backgroundColor: bg,
    color,
    border: `1px solid ${border}`,
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
    ...getSizeStyles(),
  };

  return (
    <span style={style}>
      {withDot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: dot,
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
      )}
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }} aria-hidden="true">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
