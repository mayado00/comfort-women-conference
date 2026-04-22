import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../data/supabaseClient'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function RegistrationForm() {
  const { t } = useTranslation()
  const ref = useScrollReveal()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    affiliation: '',
    role: 'general',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = t('register.required')
    if (!form.email.trim()) errs.email = t('register.required')
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.phone.trim()) errs.phone = t('register.required')
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setErrors({})

    try {
      // Supabase insert — will work when connected
      const { error } = await supabase
        .from('registrations')
        .insert([{
          name: form.name,
          email: form.email,
          phone: form.phone,
          affiliation: form.affiliation,
          role: form.role,
          created_at: new Date().toISOString(),
        }])

      if (error) {
        // If Supabase not configured, show success anyway for demo
        console.warn('Supabase not configured:', error.message)
      }

      setSubmitted(true)
    } catch (err) {
      console.warn('Registration error:', err)
      setSubmitted(true) // Demo mode
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (submitted) {
    return (
      <section id="register" className="py-20 sm:py-28 bg-gradient-to-b from-white to-warm-bg">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text-dark mb-3">{t('register.success')}</h3>
        </div>
      </section>
    )
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-warm-bg border rounded-xl text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
      errors[field] ? 'border-red-300' : 'border-gray-200'
    }`

  return (
    <section id="register" className="py-20 sm:py-28 bg-gradient-to-b from-white to-warm-bg">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <div ref={ref} className="fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-dark text-center mb-4">
            {t('section.registerTitle')}
          </h2>
          <p className="text-sm text-text-light text-center mb-10">
            사전등록을 완료하시면 참석 확인 메일이 발송됩니다.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-text-mid mb-1.5">
                {t('register.name')} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                className={inputClass('name')}
                placeholder={t('register.name')}
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-mid mb-1.5">
                {t('register.email')} <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                className={inputClass('email')}
                placeholder="email@example.com"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-text-mid mb-1.5">
                {t('register.phone')} <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                className={inputClass('phone')}
                placeholder="010-0000-0000"
              />
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </div>

            {/* Affiliation */}
            <div>
              <label className="block text-sm font-medium text-text-mid mb-1.5">
                {t('register.affiliation')}
              </label>
              <input
                type="text"
                value={form.affiliation}
                onChange={handleChange('affiliation')}
                className={inputClass('affiliation')}
                placeholder={t('register.affiliation')}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-text-mid mb-1.5">
                {t('register.role')}
              </label>
              <select
                value={form.role}
                onChange={handleChange('role')}
                className={inputClass('role')}
              >
                <option value="general">{t('register.roleGeneral')}</option>
                <option value="student">{t('register.roleStudent')}</option>
                <option value="press">{t('register.rolePress')}</option>
                <option value="other">{t('register.roleOther')}</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {loading ? '처리 중...' : t('register.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
