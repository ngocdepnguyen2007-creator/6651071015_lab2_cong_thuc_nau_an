import { ChefHat, ChevronDown, CookingPot, GitCompareArrows } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import { text } from '../i18n'

export function AppLayout() {
  const { language, setLanguage, compareIds, announcement } = useAppContext()
  const copy = text[language]

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Bếp Nhỏ — về trang chủ">
            <span className="brand-mark"><CookingPot size={20} strokeWidth={2.2} aria-hidden="true" /></span>
            <span className="brand-copy">
              <span className="brand-name">bếp nhỏ<span className="brand-period">.</span></span>
              <span className="brand-tagline">{copy.tagline}</span>
            </span>
          </Link>

          <nav className="primary-nav" aria-label="Điều hướng chính">
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`} end to="/">
              <ChefHat size={17} aria-hidden="true" />{copy.home}
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`} to="/compare">
              <GitCompareArrows size={17} aria-hidden="true" />
              {copy.compare}
              {compareIds.length > 0 && <span className="nav-count">{compareIds.length}</span>}
            </NavLink>
          </nav>

          <div className="language-control" aria-label={copy.selectLanguage}>
            <button
              aria-pressed={language === 'vi'}
              className={language === 'vi' ? 'language-button language-active' : 'language-button'}
              onClick={() => setLanguage('vi')}
              type="button"
            >
              VI
            </button>
            <span aria-hidden="true" className="language-divider" />
            <button
              aria-pressed={language === 'en'}
              className={language === 'en' ? 'language-button language-active' : 'language-button'}
              onClick={() => setLanguage('en')}
              type="button"
            >
              EN
            </button>
            <ChevronDown size={13} aria-hidden="true" className="language-chevron" />
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
        <div aria-live="polite" className={`toast${announcement ? ' toast-visible' : ''}`} role="status">{announcement}</div>
      </main>

      <footer className="site-footer">
        <Link className="footer-brand" to="/"><CookingPot size={16} aria-hidden="true" /> bếp nhỏ.</Link>
        <span>{copy.footerText}</span>
        <span className="footer-student">6651071015 · LAB 2</span>
      </footer>
    </div>
  )
}
