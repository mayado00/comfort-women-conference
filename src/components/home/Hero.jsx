import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#f5f0f8] to-warm-bg">
      {/* Decorative orbs matching key visual */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-orb hero-orb-4" />

      {/* Key Visual Image (background) */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30"
        style={{ backgroundImage: 'url(/images/hero-kv.jpg)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-primary text-sm sm:text-base font-medium tracking-widest mb-6">
          {t('hero.year')}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-tight mb-4">
          {t('hero.title')}
          <br />
          {t('hero.titleLine2')}
        </h1>

        <div className="mt-6 mb-8">
          <p className="text-text-mid text-base sm:text-lg">{t('hero.date')}</p>
          <p className="text-text-light text-sm sm:text-base">{t('hero.venue')}</p>
        </div>

        {/* Theme */}
        <div className="my-10 py-6">
          <p className="text-lg sm:text-xl md:text-2xl text-text-dark font-light leading-relaxed">
            {t('hero.theme')}
            <br />
            {t('hero.themeLine2')}
          </p>
        </div>

        {/* Organizers */}
        <p className="text-text-light text-xs sm:text-sm mb-10">
          {t('hero.organizers')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#register"
            className="px-8 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            {t('hero.registerBtn')}
          </a>
          <a
            href="#"
            className="px-8 py-3.5 border border-primary/30 text-primary font-medium rounded-full hover:bg-primary/5 transition-all"
          >
            {t('hero.watchLive')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-light">
          <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
        </svg>
      </div>
    </section>
  )
}
