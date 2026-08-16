import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  icon,
  style,
  disabled,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-trust-blue)',
          color: 'var(--color-white)',
          border: '1px solid var(--color-trust-blue)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-soft-blue)',
          color: 'var(--color-trust-blue)',
          border: '1px solid var(--color-trust-blue)',
        };
      case 'destructive':
        return {
          backgroundColor: 'var(--color-muted-red)',
          color: 'var(--color-white)',
          border: '1px solid var(--color-muted-red)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-deep-ink)',
          border: '1px solid var(--color-neutral-grey)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-trust-blue)',
          border: 'none',
        };
    }
  };

  const baseStyles: React.CSSProperties = {
    minHeight: 'var(--min-touch-target)',
    minWidth: 'var(--min-touch-target)',
    padding: 'var(--spacing-2) var(--spacing-4)',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-2)',
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <button disabled={disabled} style={baseStyles} {...props}>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
