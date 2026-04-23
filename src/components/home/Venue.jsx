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
            {/* Embedded Google Map */}
            <div className="h-64 sm:h-80">
              <iframe
                src="https://www.google.com/maps?q=서울특별시+중구+소공로+70+포스트타워&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="포스트타워 위치"
              />
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
