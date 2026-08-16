import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSession } from '../context/useSession';
import { Button } from '../components/Button/Button';
import { StatusChip } from '../components/StatusChip/StatusChip';

export default function App() {
  const { t } = useTranslation();
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: neutralMode ? '#F8FAFC' : 'var(--color-white)',
      }}
    >
      {/* Top Safety & Action Header */}
      <header
        style={{
          padding: 'var(--spacing-3) var(--spacing-4)',
          borderBottom: '1px solid var(--color-neutral-grey)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: neutralMode ? '#F1F5F9' : 'var(--color-soft-blue)',
          gap: 'var(--spacing-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <h1
            style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)',
              margin: 0,
              color: 'var(--color-deep-ink)',
            }}
          >
            {neutralMode ? t('safetyShell.neutralBrandName') : t('safetyShell.brandName')}
          </h1>
          {quietMode && <StatusChip label={t('safetyShell.quietModeActive')} variant="quiet" size="sm" />}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          {/* Quiet Mode Quick Toggle */}
          <button
            type="button"
            onClick={() => setQuietMode(!quietMode)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'var(--font-size-xs)',
              color: quietMode ? '#5B21B6' : '#64748B',
              padding: 'var(--spacing-1) var(--spacing-2)',
              borderRadius: 'var(--border-radius-sm)',
              textDecoration: 'underline',
            }}
            aria-label={t('safetyShell.quietMode')}
          >
            {quietMode ? t('safetyShell.quietModeActive') : t('safetyShell.quietModeOff')}
          </button>

          {/* Neutral Mode Toggle */}
          <button
            type="button"
            onClick={() => setNeutralMode(!neutralMode)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'var(--font-size-xs)',
              color: '#64748B',
              padding: 'var(--spacing-1) var(--spacing-2)',
              borderRadius: 'var(--border-radius-sm)',
              textDecoration: 'underline',
            }}
            aria-label={t('safetyShell.neutralModeAria')}
          >
            {t('safetyShell.neutralMode')}
          </button>

          {/* Clear Session */}
          <Button
            variant="outline"
            onClick={handleClear}
            style={{
              padding: 'var(--spacing-1) var(--spacing-3)',
              fontSize: 'var(--font-size-xs)',
              minHeight: '36px',
            }}
          >
            {t('safetyShell.clearSession')}
          </Button>

          {/* Quick Exit */}
          <Button
            variant="destructive"
            onClick={quickExit}
            aria-label={t('safetyShell.quickExitAria')}
            title={t('safetyShell.quickExitHint')}
            style={{
              padding: 'var(--spacing-1) var(--spacing-3)',
              fontSize: 'var(--font-size-xs)',
              minHeight: '36px',
            }}
          >
            {t('safetyShell.quickExit')}
          </Button>
        </div>
      </header>

      {/* Navigation */}
      <nav
        style={{
          padding: 'var(--spacing-2) var(--spacing-4)',
          display: 'flex',
          gap: 'var(--spacing-4)',
          backgroundColor: neutralMode ? '#F8FAFC' : 'var(--color-soft-blue)',
          borderBottom: '1px solid var(--color-neutral-grey)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
        }}
      >
        <Link to="/" style={{ color: 'var(--color-trust-blue)', textDecoration: 'none' }}>
          {t('navigation.plan')}
        </Link>
        <Link to="/directory" style={{ color: 'var(--color-trust-blue)', textDecoration: 'none' }}>
          {t('navigation.directory')}
        </Link>
        <Link to="/vault" style={{ color: 'var(--color-trust-blue)', textDecoration: 'none' }}>
          {t('navigation.vault')}
        </Link>
        <Link to="/observatory" style={{ color: 'var(--color-trust-blue)', textDecoration: 'none' }}>
          {t('navigation.observatory')}
        </Link>
      </nav>

      {/* Main Content Area */}
      <main style={{ padding: 'var(--spacing-4)', flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
