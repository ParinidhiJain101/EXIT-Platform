import type { FC, ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
  icon?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  icon,
  style,
  disabled,
  ...props
}) => {
  const getVariantStyles = (): CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-trust-blue)',
          color: 'var(--color-white)',
          border: '1px solid var(--color-trust-blue)',
          boxShadow: 'var(--shadow-xs)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-soft-blue)',
          color: 'var(--color-trust-blue)',
          border: '1px solid var(--color-border-blue)',
          boxShadow: 'none',
        };
      case 'destructive':
        return {
          backgroundColor: 'var(--color-muted-red)',
          color: 'var(--color-white)',
          border: '1px solid var(--color-muted-red)',
          boxShadow: 'var(--shadow-xs)',
        };
      case 'subtle':
        return {
          backgroundColor: 'var(--color-bg-subtle)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'none',
        };
      case 'outline':
        return {
          backgroundColor: 'var(--color-bg-canvas)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-default)',
          boxShadow: 'var(--shadow-xs)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-trust-blue)',
          border: '1px solid transparent',
          boxShadow: 'none',
        };
    }
  };

  const getSizeStyles = (): CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          minHeight: '34px',
          padding: 'var(--spacing-1) var(--spacing-3)',
          fontSize: 'var(--font-size-xs)',
          borderRadius: 'var(--border-radius-sm)',
        };
      case 'lg':
        return {
          minHeight: '48px',
          padding: 'var(--spacing-3) var(--spacing-6)',
          fontSize: 'var(--font-size-base)',
          borderRadius: 'var(--border-radius-md)',
        };
      case 'md':
      default:
        return {
          minHeight: 'var(--min-touch-target)',
          padding: 'var(--spacing-2) var(--spacing-4)',
          fontSize: 'var(--font-size-sm)',
          borderRadius: 'var(--border-radius-sm)',
        };
    }
  };

  const baseStyles: CSSProperties = {
    fontWeight: 'var(--font-weight-semibold)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-2)',
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    transition: 'all var(--transition-fast)',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <button disabled={disabled} style={baseStyles} {...props}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }} aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
