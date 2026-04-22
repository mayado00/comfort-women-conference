import { useEffect, useRef } from 'react'

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Small delay to let the browser finish layout before observing
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            observer.unobserve(el)
          }
        },
        { threshold, rootMargin: '50px 0px' }
      )

      observer.observe(el)
      el._scrollRevealObserver = observer
    }, 100)

    return () => {
      clearTimeout(timer)
      if (el._scrollRevealObserver) el._scrollRevealObserver.disconnect()
    }
  }, [threshold])

  return ref
}
