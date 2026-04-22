import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

const langs = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = isHome
    ? [
        { href: '#sessions', label: t('nav.session') },
        { href: '#program', label: t('nav.program') },
        { href: '#venue', label: t('nav.venue') },
        { href: '#faq', label: t('nav.faq') },
      ]
    : []

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className={`text-sm sm:text-base font-semibold transition-colors ${
              scrolled ? 'text-primary-dark' : 'text-primary-dark'
            }`}
          >
            <span className="hidden sm:inline">일본군 '위안부' 국제 컨퍼런스</span>
            <span className="sm:hidden">위안부 국제 컨퍼런스</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? 'text-text-mid' : 'text-text-mid'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/archive"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/archive' ? 'text-primary' : 'text-text-mid'
              }`}
            >
              {t('nav.archive')}
            </Link>
            {isHome && (
              <a
                href="#register"
                onClick={(e) => handleNavClick(e, '#register')}
                className="ml-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
              >
                {t('nav.register')}
              </a>
            )}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 ml-4 border-l pl-4 border-gray-200">
              {langs.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`lang-btn px-2 py-1 text-xs rounded transition-all ${
                    i18n.language === lang.code
                      ? 'active'
                      : 'text-text-light hover:text-text-dark'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-text-mid"
            aria-label="메뉴"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-base text-text-mid hover:text-primary py-2"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/archive"
              onClick={() => setMenuOpen(false)}
              className="block text-base text-text-mid hover:text-primary py-2"
            >
              {t('nav.archive')}
            </Link>
            {isHome && (
              <a
                href="#register"
                onClick={(e) => handleNavClick(e, '#register')}
                className="block text-center px-4 py-3 bg-primary text-white rounded-full font-medium"
              >
                {t('nav.register')}
              </a>
            )}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              {langs.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code)
                    setMenuOpen(false)
                  }}
                  className={`lang-btn px-3 py-1.5 text-sm rounded ${
                    i18n.language === lang.code
                      ? 'active'
                      : 'text-text-light hover:text-text-dark'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
