import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  const handleQuickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  const handleClearSession = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-white)' }}>
      <header style={{ 
        padding: 'var(--spacing-4)', 
        borderBottom: '1px solid var(--color-neutral-grey)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'var(--color-soft-blue)'
      }}>
        <h1 style={{ fontSize: 'var(--font-size-lg)', margin: 0, color: 'var(--color-deep-ink)' }}>EXIT</h1>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <button 
            onClick={handleClearSession}
            style={{ padding: 'var(--spacing-2) var(--spacing-4)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-trust-blue)', backgroundColor: 'transparent' }}
          >
            {t('safetyShell.clearSession')}
          </button>
          <button 
            onClick={handleQuickExit}
            style={{ padding: 'var(--spacing-2) var(--spacing-4)', borderRadius: 'var(--border-radius-sm)', border: 'none', backgroundColor: 'var(--color-muted-red)', color: 'var(--color-white)' }}
          >
            {t('safetyShell.quickExit')}
          </button>
        </div>
      </header>

      <nav style={{ padding: 'var(--spacing-2) var(--spacing-4)', display: 'flex', gap: 'var(--spacing-4)', backgroundColor: 'var(--color-soft-blue)', borderBottom: '1px solid var(--color-neutral-grey)' }}>
        <Link to="/" style={{ color: 'var(--color-trust-blue)' }}>Plan</Link>
        <Link to="/directory" style={{ color: 'var(--color-trust-blue)' }}>Directory</Link>
        <Link to="/vault" style={{ color: 'var(--color-trust-blue)' }}>AegisVault</Link>
        <Link to="/observatory" style={{ color: 'var(--color-trust-blue)' }}>LIVEGENDER</Link>
      </nav>

      <main style={{ padding: 'var(--spacing-4)', flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
