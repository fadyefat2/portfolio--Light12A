"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function ArcadeBackground() {

  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      // AAA Rule: Parallax should be felt, not seen (Reduced amplitude)
      const x = (clientX / innerWidth - 0.5) * 10
      const y = (clientY / innerHeight - 0.5) * 10

      gsap.to(containerRef.current, {
        x: -x,
        y: -y,
        duration: 2, // Slower, more cinematic ease
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Reduced particle density for AAA clarity
    const particleCount = 15
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div")
      p.className = "absolute bg-primary/10 w-0.5 h-0.5 pointer-events-none"
      p.style.left = `${Math.random() * 100}%`
      p.style.top = `${Math.random() * 100}%`
      particlesRef.current?.appendChild(p)

      gsap.to(p, {
        y: "-=50",
        opacity: 0,
        duration: 4 + Math.random() * 4,
        repeat: -1,
        delay: Math.random() * 5,
        ease: "none",
      })
    }

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050508]">
      {/* Subtle Parallax Layer */}
      <div ref={containerRef} className="absolute inset-[-5%] opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #1a1a2e 1px, transparent 0)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid Floor - Simplified and dimmed */}
      <div className="absolute bottom-0 left-0 w-full h-[20%] opacity-5 perspective-[1000px]">
        <div 
          className="w-full h-full"
          style={{
            transform: "rotateX(75deg) scale(2)",
            backgroundSize: "60px 60px",
            backgroundImage: "linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)"
          }}
        />
      </div>
    </div>
  )
}
