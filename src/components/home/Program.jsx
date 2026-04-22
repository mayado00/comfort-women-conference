import { useTranslation } from 'react-i18next'
import { programSchedule, sessions, speakers } from '../../data/dummyData'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function getTypeColor(type) {
  switch (type) {
    case 'opening':
    case 'closing':
      return 'bg-accent-purple/10 text-accent-purple'
    case 'session':
      return 'bg-primary/10 text-primary'
    case 'break':
      return 'bg-warm-gray text-text-light'
    case 'info':
      return 'bg-accent-blue/10 text-accent-blue'
    default:
      return 'bg-gray-100 text-text-mid'
  }
}

function getTypeDot(type) {
  switch (type) {
    case 'opening':
    case 'closing':
      return 'bg-accent-purple'
    case 'session':
      return 'bg-primary'
    case 'break':
      return 'bg-gray-300'
    default:
      return 'bg-accent-blue'
  }
}

export default function Program() {
  const { t, i18n } = useTranslation()
  const ref = useScrollReveal()

  const getSessionData = (sessionId) => sessions.find((s) => s.id === sessionId)
  const getSpeaker = (id) => speakers.find((s) => s.id === id)

  return (
    <section id="program" className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-in text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-dark">
            {t('section.programTitle')}
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] sm:left-[11px] top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-0">
            {programSchedule.map((item, idx) => {
              const sessionData = item.sessionId ? getSessionData(item.sessionId) : null

              return (
                <div key={idx} className="relative pl-8 sm:pl-12 pb-8">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 sm:left-1 top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-sm ${getTypeDot(item.type)}`}
                  />

                  {/* Time */}
                  <p className="text-xs sm:text-sm font-medium text-primary mb-1">
                    {item.time}
                  </p>

                  {/* Content */}
                  {item.type === 'session' && sessionData ? (
                    <div className="bg-warm-bg rounded-xl p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-semibold text-text-dark">
                        {t(`sessions.${item.sessionId}.title`)}
                      </h3>
                      <div className="mt-3 space-y-2">
                        {sessionData.presentations.map((pres, pIdx) => {
                          const speaker = pres.speakerId ? getSpeaker(pres.speakerId) : null
                          return (
                            <div key={pIdx} className="flex items-start gap-3 text-sm">
                              <span className={`shrink-0 px-2 py-0.5 text-xs rounded-full ${getTypeColor('session')}`}>
                                {pres.time}
                              </span>
                              <div>
                                <p className="text-text-dark font-medium">
                                  {i18n.language === 'en' ? pres.titleEn : pres.title}
                                </p>
                                {speaker && (
                                  <p className="text-text-light text-xs mt-0.5">
                                    {i18n.language === 'en' ? speaker.nameEn : speaker.name}
                                    {' · '}
                                    {i18n.language === 'en' ? speaker.affiliationEn : speaker.affiliation}
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : item.type === 'break' ? (
                    <p className="text-sm text-text-light italic">{item.label}</p>
                  ) : (
                    <div className={`inline-block px-3 py-1.5 rounded-lg text-sm font-medium ${getTypeColor(item.type)}`}>
                      {item.label}
                      {item.detail && (
                        <span className="text-xs font-normal ml-2 opacity-70">{item.detail}</span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
