import type { ReactNode } from 'react';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  subLabel?: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  'aria-label'?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  'aria-label': ariaLabel,
}: SegmentedControlProps<T>) {
  const getContainerPadding = () => {
    switch (size) {
      case 'sm':
        return '2px';
      case 'lg':
        return '4px';
      case 'md':
      default:
        return '3px';
    }
  };

  const getItemPadding = () => {
    switch (size) {
      case 'sm':
        return '4px 10px';
      case 'lg':
        return '8px 14px';
      case 'md':
      default:
        return '6px 12px';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 'var(--font-size-xs)';
      case 'lg':
        return 'var(--font-size-base)';
      case 'md':
      default:
        return 'var(--font-size-sm)';
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{
        display: fullWidth ? 'grid' : 'inline-flex',
        gridTemplateColumns: fullWidth ? `repeat(${options.length}, 1fr)` : undefined,
        gap: '2px',
        backgroundColor: 'var(--color-bg-subtle)',
        border: '1px solid var(--color-border-subtle)',
        padding: getContainerPadding(),
        borderRadius: 'var(--border-radius-md)',
        alignItems: 'center',
      }}
    >
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(opt.value)}
            style={{
              display: 'flex',
              flexDirection: opt.subLabel ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: getItemPadding(),
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              backgroundColor: isSelected ? 'var(--color-bg-canvas)' : 'transparent',
              color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-text-secondary)',
              fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
              fontSize: getFontSize(),
              boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {opt.icon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }} aria-hidden="true">{opt.icon}</span>}
              <span>{opt.label}</span>
              {opt.badge && <span>{opt.badge}</span>}
            </div>
            {opt.subLabel && (
              <span
                style={{
                  fontSize: '11px',
                  color: isSelected ? 'var(--color-trust-blue)' : 'var(--color-text-muted)',
                  fontWeight: 'var(--font-weight-regular)',
                }}
              >
                {opt.subLabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
