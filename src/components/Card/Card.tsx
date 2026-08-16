import type { FC, HTMLAttributes, ReactNode, CSSProperties } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'surface' | 'highlight' | 'warning' | 'neutral' | 'elevated' | 'danger';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  style,
  className,
  ...props
}) => {
  const getVariantStyles = (): CSSProperties => {
    switch (variant) {
      case 'surface':
        return {
          backgroundColor: 'var(--color-soft-blue)',
          border: '1px solid var(--color-border-blue)',
          boxShadow: 'none',
        };
      case 'highlight':
        return {
          backgroundColor: 'var(--color-soft-green)',
          border: '1px solid var(--color-border-green)',
          boxShadow: 'none',
        };
      case 'warning':
        return {
          backgroundColor: 'var(--color-soft-amber)',
          border: '1px solid var(--color-border-amber)',
          boxShadow: 'none',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--color-soft-rose)',
          border: '1px solid var(--color-border-red)',
          boxShadow: 'none',
        };
      case 'neutral':
        return {
          backgroundColor: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'none',
        };
      case 'elevated':
        return {
          backgroundColor: 'var(--color-bg-canvas)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'default':
      default:
        return {
          backgroundColor: 'var(--color-bg-canvas)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-xs)',
        };
    }
  };

  const getPadding = (): string => {
    switch (padding) {
      case 'none':
        return '0';
      case 'sm':
        return 'var(--spacing-3)';
      case 'lg':
        return 'var(--spacing-5)';
      case 'md':
      default:
        return 'var(--spacing-4)';
    }
  };

  const baseStyles: CSSProperties = {
    borderRadius: 'var(--border-radius-md)',
    padding: getPadding(),
    color: 'var(--color-text-primary)',
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <div
      style={baseStyles}
      className={className}
      {...(interactive ? { 'data-interactive': 'true' } : {})}
      {...props}
    >
      {children}
    </div>
  );
};
