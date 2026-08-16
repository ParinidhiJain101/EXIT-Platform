import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSession } from '../context/useSession';
import { Button } from '../components/Button/Button';
import { StatusChip } from '../components/StatusChip/StatusChip';
import {
  ShieldIcon,
  EyeOffIcon,
  EyeIcon,
  LockIcon,
  FileTextIcon,
  SearchIcon,
  BarChartIcon,
} from '../components/Icons/Icons';

export default function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const {
    quickExit,
    clearSession,
    quietMode,
    setQuietMode,
    neutralMode,
    setNeutralMode,
  } = useSession();

  const handleClear = () => {
    if (window.confirm(t('safetyShell.clearSessionConfirm'))) {
      void clearSession();
    }
  };

  const navItems = [
    { path: '/', label: t('navigation.plan'), icon: <FileTextIcon size={15} /> },
    { path: '/directory', label: t('navigation.directory'), icon: <SearchIcon size={15} /> },
    { path: '/vault', label: t('navigation.vault'), icon: <LockIcon size={15} /> },
    { path: '/consent', label: t('navigation.consent'), icon: <ShieldIcon size={15} /> },
    { path: '/observatory', label: t('navigation.observatory'), icon: <BarChartIcon size={15} /> },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: neutralMode ? '#F8FAFC' : 'var(--color-bg-app)',
      }}
    >
      {/* Top Safety & Action Header */}
      <header className="app-header-wrapper">
        <div className="app-header-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                textDecoration: 'none',
                color: 'var(--color-deep-ink)',
              }}
            >
              {!neutralMode && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: 'var(--color-trust-blue)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                  aria-hidden="true"
                >
                  <ShieldIcon size={18} />
                </div>
              )}
              <h1
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                  color: 'var(--color-deep-ink)',
                }}
              >
                {neutralMode ? t('safetyShell.neutralBrandName') : t('safetyShell.brandName')}
              </h1>
            </Link>

            {quietMode && (
              <StatusChip
                label={t('safetyShell.quietModeActive')}
                variant="quiet"
                size="sm"
                icon={<EyeOffIcon size={12} />}
                withDot
              />
            )}
          </div>

          <div className="app-header-actions">
            {/* Quiet Mode Pill Toggle */}
            <button
              type="button"
              onClick={() => setQuietMode(!quietMode)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: quietMode ? 'var(--color-soft-purple)' : 'var(--color-bg-canvas)',
                border: `1px solid ${quietMode ? 'var(--color-border-purple)' : 'var(--color-border-subtle)'}`,
                cursor: 'pointer',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: quietMode ? 'var(--color-quiet-purple)' : 'var(--color-text-secondary)',
                padding: '5px 10px',
                borderRadius: 'var(--border-radius-full)',
                transition: 'all var(--transition-fast)',
                boxShadow: 'var(--shadow-xs)',
              }}
              aria-label={t('safetyShell.quietMode')}
              aria-pressed={quietMode}
            >
              {quietMode ? <EyeOffIcon size={13} /> : <EyeIcon size={13} />}
              <span>{quietMode ? t('safetyShell.quietModeActive') : t('safetyShell.quietMode')}</span>
            </button>

            {/* Neutral Mode Toggle */}
            <button
              type="button"
              onClick={() => setNeutralMode(!neutralMode)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: neutralMode ? 'var(--color-bg-subtle)' : 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border-subtle)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-secondary)',
                padding: '5px 10px',
                borderRadius: 'var(--border-radius-full)',
                transition: 'all var(--transition-fast)',
                boxShadow: 'var(--shadow-xs)',
              }}
              aria-label={t('safetyShell.neutralModeAria')}
              aria-pressed={neutralMode}
            >
              <span>{t('safetyShell.neutralMode')}</span>
            </button>

            {/* Clear Session */}
            <Button
              variant="subtle"
              size="sm"
              onClick={handleClear}
            >
              {t('safetyShell.clearSession')}
            </Button>

            {/* Quick Exit */}
            <Button
              variant="destructive"
              size="sm"
              onClick={quickExit}
              aria-label={t('safetyShell.quickExitAria')}
              title={t('safetyShell.quickExitHint')}
            >
              {t('safetyShell.quickExit')}
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="app-nav-wrapper">
        <div className="app-nav-container">
          {navItems.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`app-nav-item ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="app-main-wrapper">
        <div className="app-main-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
