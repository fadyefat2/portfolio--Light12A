"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function PageTransition() {
  const [isActive, setIsActive] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Listen for custom transition event
    const handleTransition = () => {
      setIsActive(true)
      const squares = gridRef.current?.querySelectorAll(".pixel-square")
      if (!squares) return

      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsActive(false), 500)
        }
      })

      tl.to(squares, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: {
          grid: [10, 10],
          from: "random",
          amount: 0.5
        },
        ease: "steps(4)"
      })
      .to(squares, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        stagger: {
          grid: [10, 10],
          from: "random",
          amount: 0.5
        },
        delay: 0.2,
        ease: "steps(4)"
      })
    }

    window.addEventListener("arcade-transition", handleTransition)
    return () => window.removeEventListener("arcade-transition", handleTransition)
  }, [])

  return (
    <div 
      className={`fixed inset-0 z-[10000] pointer-events-none ${isActive ? "visible" : "invisible"}`}
    >
      <div 
        ref={gridRef}
        className="grid grid-cols-10 grid-rows-10 w-full h-full bg-transparent"
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i} 
            className="pixel-square bg-primary opacity-0 scale-0"
            style={{ imageRendering: "pixelated" }}
          />
        ))}
      </div>
    </div>
  )
}

export function triggerTransition() {
  window.dispatchEvent(new CustomEvent("arcade-transition"))
}
