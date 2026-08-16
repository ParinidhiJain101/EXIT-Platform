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
          minHeight: '32px',
          padding: '4px 10px',
          fontSize: '12px',
          borderRadius: 'var(--border-radius-sm)',
        };
      case 'lg':
        return {
          minHeight: '44px',
          padding: '10px 20px',
          fontSize: '15px',
          borderRadius: 'var(--border-radius-md)',
        };
      case 'md':
      default:
        return {
          minHeight: '38px',
          padding: '6px 14px',
          fontSize: '13.5px',
          borderRadius: 'var(--border-radius-sm)',
        };
    }
  };

  const baseStyles: CSSProperties = {
    fontWeight: 'var(--font-weight-medium)',
    fontFamily: 'var(--font-family-sans)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    lineHeight: 1.25,
    whiteSpace: 'nowrap',
    transition: 'all var(--transition-fast)',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <button disabled={disabled} style={baseStyles} {...props}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }} aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
