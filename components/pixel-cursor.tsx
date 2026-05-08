"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function PixelCursor() {

  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05, // Ultra-low latency
        ease: "none",
      })
    }

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest("button, a, .interactive-card, .arcade-card")
      setIsHovering(!!isInteractive)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousemove", handleHover)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousemove", handleHover)
    }
  }, [])

  useEffect(() => {
    if (isHovering) {
      gsap.to(cursorRef.current, {
        scale: 1.5,
        backgroundColor: "#fff",
        mixBlendMode: "difference",
        duration: 0.1,
      })
    } else {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "var(--primary)",
        mixBlendMode: "normal",
        duration: 0.1,
      })
    }
  }, [isHovering])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-primary z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%, 50% 0)",
          boxShadow: "0 0 10px var(--primary)" 
        }}
      />
      <style jsx global>{`
        body, button, a {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}

