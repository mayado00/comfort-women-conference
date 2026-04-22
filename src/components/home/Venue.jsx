import { useTranslation } from 'react-i18next'
import { conferenceInfo } from '../../data/dummyData'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Venue() {
  const { t } = useTranslation()
  const ref = useScrollReveal()

  return (
    <section id="venue" className="py-20 sm:py-28 bg-warm-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-dark text-center mb-14">
            {t('section.venueTitle')}
          </h2>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            {/* Map placeholder */}
            <div className="h-64 sm:h-80 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center">
              <div className="text-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mx-auto text-primary/40 mb-3"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <p className="text-sm text-text-light">지도가 여기에 표시됩니다</p>
              </div>
            </div>

            {/* Venue info */}
            <div className="p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-text-dark">
                {t('section.venueName')}
              </h3>
              <p className="text-sm text-text-mid mt-2">{t('section.venueAddress')}</p>

              {/* Map links */}
              <div className="flex gap-3 mt-5">
                <a
                  href={conferenceInfo.kakaoMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#FEE500] text-[#3C1E1E] text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  카카오맵
                </a>
                <a
                  href={conferenceInfo.googleMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white border border-gray-200 text-text-mid text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Google Maps
                </a>
              </div>

              {/* Note */}
              <p className="mt-5 text-xs text-text-light bg-warm-bg rounded-lg p-3">
                {t('section.venueNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
