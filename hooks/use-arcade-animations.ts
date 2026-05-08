import { useCallback } from "react"
import { gsap } from "gsap"

export function useArcadeAnimations() {

  
  const glitch = useCallback((element: HTMLElement | null) => {
    if (!element) return
    
    // AAA Glitch: Subtle chromatic flicker, not destructive
    const tl = gsap.timeline()
    tl.to(element, {
      skewX: 5, // Reduced from 20
      duration: 0.05,
      ease: "power4.inOut"
    })
    .to(element, {
      skewX: -5,
      duration: 0.05,
      ease: "power4.inOut"
    })
    .to(element, {
      skewX: 0,
      duration: 0.05,
      ease: "power4.inOut"
    })
    .set(element, { color: "var(--accent)", opacity: 0.8 })
    .to(element, { x: 1, duration: 0.03, repeat: 1, yoyo: true })
    .set(element, { color: "", opacity: 1 })
  }, [])

  const screenShake = useCallback(() => {
    const main = document.querySelector("main")
    if (!main) return

    // AAA Shake: Sharp impact, fast recovery
    gsap.to(main, {
      x: () => Math.random() * 4 - 2, // Reduced amplitude
      y: () => Math.random() * 4 - 2,
      duration: 0.03,
      repeat: 3,
      yoyo: true,
      onComplete: () => {
        gsap.to(main, { x: 0, y: 0, duration: 0.2, ease: "elastic.out(1, 0.3)" })
      }
    })
  }, [])

  const squish = useCallback((element: HTMLElement | null) => {
    if (!element) return
    gsap.to(element, {
      scaleX: 1.05,
      scaleY: 0.95,
      duration: 0.1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(element, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.3,
          ease: "back.out(2)"
        })
      }
    })
  }, [])

  return { glitch, screenShake, squish }
}

