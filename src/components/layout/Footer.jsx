import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Organizers */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">주최·주관</h3>
            <p className="text-sm leading-relaxed">{t('footer.org1')}</p>
            <p className="text-sm leading-relaxed">{t('footer.org2')}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">{t('footer.contact')}</h3>
            <p className="text-sm">Email: conference@example.com</p>
            <p className="text-sm">Tel: 02-0000-0000</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Links</h3>
            <div className="flex gap-4">
              <a href="#" className="text-sm hover:text-white transition-colors">YouTube</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">{t('footer.copyright')}</p>
          <a href="#" className="text-xs text-white/50 hover:text-white/70 transition-colors">
            {t('footer.privacy')}
          </a>
        </div>
      </div>
    </footer>
  )
}
