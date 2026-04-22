import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { archiveData } from '../../data/dummyData'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function ArchiveCard({ data }) {
  const { t } = useTranslation()
  const ref = useScrollReveal()

  return (
    <div ref={ref} className="fade-in bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Year header */}
      <div className="bg-gradient-to-r from-primary/5 to-accent-purple/5 px-6 sm:px-8 py-6">
        <span className="text-xs font-semibold text-primary tracking-wider">{data.year}</span>
        <h3 className="text-lg sm:text-xl font-bold text-text-dark mt-1">{data.title}</h3>
        <p className="text-sm text-accent-purple mt-1">{data.theme}</p>
      </div>

      <div className="px-6 sm:px-8 py-6">
        {/* Event info */}
        <div className="flex flex-wrap gap-4 text-sm text-text-mid mb-5">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-light">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {data.date}
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-light">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {data.venue}
          </div>
        </div>

        {/* Sessions */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-text-light uppercase tracking-wider">{t('archive.program')}</h4>
          {data.sessions.map((session, idx) => (
            <div key={idx} className="flex items-start gap-3 pl-3 border-l-2 border-accent-blue/30">
              <span className="text-xs text-primary shrink-0 mt-0.5">{session.time}</span>
              <p className="text-sm text-text-dark">{session.title}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        {data.materials && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <a
              href={data.materials}
              className="text-sm text-primary font-medium hover:text-primary-dark transition-colors"
            >
              {t('archive.materials')} →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ArchivePage() {
  const { t } = useTranslation()
  const years = [...new Set(archiveData.map((d) => d.year))]
  const [selectedYear, setSelectedYear] = useState(null)
  const titleRef = useScrollReveal()

  const filtered = selectedYear
    ? archiveData.filter((d) => d.year === selectedYear)
    : archiveData

  return (
    <div className="min-h-screen bg-warm-bg pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="fade-in text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-dark">
            {t('section.archiveTitle')}
          </h1>
        </div>

        {/* Year filter */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              selectedYear === null
                ? 'bg-primary text-white'
                : 'bg-white text-text-mid hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {t('archive.all')}
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                selectedYear === year
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-mid hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Archive cards */}
        <div className="space-y-6">
          {filtered.map((data) => (
            <ArchiveCard key={data.year} data={data} />
          ))}
        </div>
      </div>
    </div>
  )
}
