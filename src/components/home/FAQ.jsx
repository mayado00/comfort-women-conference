import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { faqCategories } from '../../data/dummyData'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function FAQItem({ qKey, aKey }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 px-1 text-left group"
      >
        <div className="flex items-start gap-3">
          <span className="text-primary font-bold text-sm shrink-0 mt-0.5">Q.</span>
          <span className="text-sm sm:text-base font-medium text-text-dark group-hover:text-primary transition-colors">
            {t(`faq.${qKey}`)}
          </span>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-text-light transition-transform duration-300 mt-0.5 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <path d="M5 7.5l5 5 5-5" />
        </svg>
      </button>
      <div className={`faq-content ${open ? 'open' : ''}`}>
        <div className="flex items-start gap-3 px-1 pb-5">
          <span className="text-accent-purple font-bold text-sm shrink-0">A.</span>
          <p className="text-sm text-text-mid leading-relaxed">
            {t(`faq.${aKey}`)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t, i18n } = useTranslation()
  const [activeTab, setActiveTab] = useState(faqCategories[0].id)
  const ref = useScrollReveal()

  const getCategoryLabel = (cat) => {
    const lang = i18n.language
    if (lang === 'en') return cat.labelEn
    if (lang === 'ja') return cat.labelJa
    if (lang === 'zh') return cat.labelZh
    return cat.label
  }

  const activeCategory = faqCategories.find((c) => c.id === activeTab)

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-dark text-center mb-10">
            {t('section.faqTitle')}
          </h2>

          {/* Category tabs */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-all ${
                  activeTab === cat.id
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/15'
                    : 'bg-white text-text-mid border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* FAQ items */}
          <div className="bg-warm-bg rounded-2xl p-6 sm:p-8">
            {activeCategory &&
              activeCategory.items.map((item) => (
                <FAQItem key={item.q} qKey={item.q} aKey={item.a} />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
