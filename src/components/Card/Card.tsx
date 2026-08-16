import type { FC, HTMLAttributes, ReactNode, CSSProperties } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'surface' | 'highlight' | 'warning' | 'neutral';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  style,
  ...props
}) => {
  const getVariantStyles = (): CSSProperties => {
    switch (variant) {
      case 'surface':
        return {
          backgroundColor: 'var(--color-soft-blue)',
          border: '1px solid #D0E1FD',
        };
      case 'highlight':
        return {
          backgroundColor: 'var(--color-soft-green)',
          border: '1px solid #C3E6CB',
        };
      case 'warning':
        return {
          backgroundColor: 'var(--color-soft-amber)',
          border: '1px solid #FFEAA7',
        };
      case 'neutral':
        return {
          backgroundColor: 'var(--color-neutral-grey)',
          border: '1px solid #E2E8F0',
        };
      case 'default':
      default:
        return {
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--color-neutral-grey)',
        };
    }
  };

  const getPadding = (): string => {
    switch (padding) {
      case 'sm':
        return 'var(--spacing-3)';
      case 'lg':
        return 'var(--spacing-6)';
      case 'md':
      default:
        return 'var(--spacing-4)';
    }
  };

  const baseStyles: CSSProperties = {
    borderRadius: 'var(--border-radius-md)',
    padding: getPadding(),
    boxShadow: '0 1px 3px rgba(16, 42, 67, 0.05)',
    color: 'var(--color-deep-ink)',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <div style={baseStyles} {...props}>
      {children}
    </div>
  );
};
