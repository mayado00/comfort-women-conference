import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { sessions, speakers } from '../../data/dummyData'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ── helpers ── */
const getSpeaker = (id) => speakers.find((s) => s.id === id)

function useSpeakerName(speaker) {
  const { i18n } = useTranslation()
  if (!speaker) return ''
  const lang = i18n.language
  if (lang === 'en') return speaker.nameEn
  if (lang === 'ja') return speaker.nameJa
  if (lang === 'zh') return speaker.nameZh
  return speaker.name
}

function useAffiliation(speaker) {
  const { i18n } = useTranslation()
  if (!speaker) return ''
  return i18n.language === 'en' ? speaker.affiliationEn : speaker.affiliation
}

/* ── Presentation detail modal / overlay ── */
function PresentationModal({ pres, session, onClose }) {
  const { t, i18n } = useTranslation()
  const speaker = pres.speakerId ? getSpeaker(pres.speakerId) : null
  const moderator = pres.moderatorId ? getSpeaker(pres.moderatorId) : null

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const getName = (s) => {
    if (!s) return ''
    const lang = i18n.language
    if (lang === 'en') return s.nameEn
    if (lang === 'ja') return s.nameJa
    if (lang === 'zh') return s.nameZh
    return s.name
  }
  const getAff = (s) => (i18n.language === 'en' ? s?.affiliationEn : s?.affiliation) || ''

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* modal */}
      <div
        className="relative w-full max-w-3xl mx-4 my-8 sm:my-16 bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* session header bar */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: session.color }}
        >
          <p className="text-white text-sm font-medium">
            {t(`sessions.${session.id}.num`)}{'  '}
            {t(`sessions.${session.id}.title`)}
          </p>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* content */}
        <div className="p-6 sm:p-8">
          {/* type badge + title */}
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
            style={{ background: `${session.color}15`, color: session.color }}
          >
            {pres.typeLabel}
          </span>

          <h2 className="text-xl sm:text-2xl font-bold text-text-dark leading-snug mb-2">
            {i18n.language === 'en' ? pres.titleEn : pres.title}
          </h2>
          <p className="text-sm text-primary flex items-center gap-1.5 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
            {pres.time}
          </p>

          {/* description */}
          {pres.desc && (
            <div className="text-sm sm:text-base text-text-mid leading-relaxed mb-8 whitespace-pre-line">
              {pres.desc}
            </div>
          )}

          {/* divider */}
          <hr className="border-gray-100 mb-6" />

          {/* speaker info */}
          {speaker && (
            <div className="flex gap-4 sm:gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-accent-blue/30 to-accent-purple/30 flex items-center justify-center text-2xl font-bold text-primary/50 shrink-0">
                {speaker.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-dark text-base">
                  {getName(speaker)}
                </h3>
                <p className="text-xs text-text-light mt-0.5">{getAff(speaker)}</p>
                <p className="text-sm text-text-mid mt-3 leading-relaxed">
                  {speaker.bioLong || speaker.bio}
                </p>
              </div>
            </div>
          )}

          {/* moderator + panelists for panel type */}
          {moderator && (
            <div className="mt-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-pink/30 to-accent-purple/30 flex items-center justify-center text-lg font-bold text-accent-purple/50 shrink-0">
                  {moderator.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-text-light">{t('program.moderator')}</p>
                  <p className="font-medium text-text-dark">{getName(moderator)}</p>
                  <p className="text-xs text-text-light">{getAff(moderator)}</p>
                </div>
              </div>
              {pres.panelistIds && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-3">
                    {t('program.panelist')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pres.panelistIds.map((id) => {
                      const p = getSpeaker(id)
                      if (!p) return null
                      return (
                        <div key={id} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-warm-gray flex items-center justify-center text-sm font-medium text-text-light shrink-0">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-dark">{getName(p)}</p>
                            <p className="text-xs text-text-light">{getAff(p)}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Presentation card (grid item) ── */
function PresentationCard({ pres, session, onClick }) {
  const { i18n } = useTranslation()
  const speaker = pres.speakerId ? getSpeaker(pres.speakerId) : null
  const getName = (s) => {
    if (!s) return ''
    const lang = i18n.language
    if (lang === 'en') return s.nameEn
    if (lang === 'ja') return s.nameJa
    if (lang === 'zh') return s.nameZh
    return s.name
  }
  const getAff = (s) => (i18n.language === 'en' ? s?.affiliationEn : s?.affiliation) || ''

  return (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-2xl p-5 sm:p-6 text-left border border-gray-100
        hover:shadow-lg hover:shadow-primary/8 hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
    >
      {/* + icon */}
      <div className="absolute top-4 right-4 w-7 h-7 rounded-md bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-light group-hover:text-primary transition-colors">
          <path d="M7 1v12M1 7h12" />
        </svg>
      </div>

      {/* type badge */}
      <span
        className="inline-block self-start px-2.5 py-0.5 text-xs font-semibold rounded-full mb-3"
        style={{ background: `${session.color}15`, color: session.color }}
      >
        {pres.typeLabel}
      </span>

      {/* title */}
      <h4 className="text-base sm:text-lg font-bold text-text-dark leading-snug pr-8 mb-2 group-hover:text-primary transition-colors">
        {i18n.language === 'en' ? pres.titleEn : pres.title}
      </h4>

      {/* time */}
      <p className="text-xs text-text-light flex items-center gap-1 mb-auto">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
        {pres.time}
      </p>

      {/* speaker */}
      {speaker && (
        <div className="mt-4 pt-4 border-t border-gray-50">
          <p className="text-sm font-medium text-text-dark">{getName(speaker)}</p>
          <p className="text-xs text-text-light">{getAff(speaker)}</p>
        </div>
      )}
    </button>
  )
}

/* ── Session block ── */
function SessionBlock({ session }) {
  const { t } = useTranslation()
  const [selectedPres, setSelectedPres] = useState(null)
  const ref = useScrollReveal()

  return (
    <>
      <div ref={ref} className="fade-in mb-12 sm:mb-16">
        {/* Session grid: title card + presentation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Session title card (glassmorphism gradient) */}
          <div
            className="rounded-2xl p-6 sm:p-8 flex flex-col justify-center text-white relative overflow-hidden backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${session.color}dd 0%, ${session.color}88 40%, ${session.color}55 100%)`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: `0 8px 32px ${session.color}30, inset 0 1px 0 rgba(255,255,255,0.2)`,
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <span className="text-xs font-semibold tracking-wider opacity-80">
              {t(`sessions.${session.id}.num`)}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-2 leading-snug">
              {t(`sessions.${session.id}.title`)}
            </h3>
            <p className="text-sm mt-3 opacity-80">
              {t(`sessions.${session.id}.time`)}
            </p>
          </div>

          {/* Presentation cards */}
          {session.presentations.map((pres) => (
            <PresentationCard
              key={pres.id}
              pres={pres}
              session={session}
              onClick={() => setSelectedPres(pres)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPres && (
        <PresentationModal
          pres={selectedPres}
          session={session}
          onClose={() => setSelectedPres(null)}
        />
      )}
    </>
  )
}

/* ── Main Sessions component ── */
export default function Sessions() {
  const { t } = useTranslation()
  const titleRef = useScrollReveal()

  return (
    <section id="sessions" className="py-20 sm:py-28 bg-warm-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="fade-in text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-dark">
            {t('section.sessionTitle')}
          </h2>
          <p className="mt-4 text-text-mid text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t('section.sessionDesc')}
          </p>
        </div>

        {sessions.map((session) => (
          <SessionBlock key={session.id} session={session} />
        ))}
      </div>
    </section>
  )
}
