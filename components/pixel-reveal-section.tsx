"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useArcadeAnimations } from "@/hooks/use-arcade-animations"

interface PixelRevealSectionProps {
  children: React.ReactNode
}

export default function PixelRevealSection({ children }: PixelRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { screenShake } = useArcadeAnimations()
  const isInView = useInView(containerRef, { 
    amount: 0.2, // Start reveal when 20% of section is visible
    once: false  // Trigger every time it enters/leaves
  })
  
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    if (isInView) {
      setIsRevealed(true)
      screenShake()
    } else {
      setIsRevealed(false)
    }
  }, [isInView, screenShake])

  // Grid dimensions
  const cols = 10
  const rows = 8
  const totalPixels = cols * rows

  return (
    <div ref={containerRef} className="relative">
      {/* The actual content */}
      <motion.div
        animate={{ 
          opacity: isRevealed ? 1 : 0,
          scale: isRevealed ? 1 : 0.95,
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Pixel Wall Overlay */}
      {!isRevealed && (
        <div className="absolute inset-0 z-[40] pointer-events-none flex flex-wrap overflow-hidden bg-background">
          {Array.from({ length: totalPixels }).map((_, i) => (
            <div
              key={i}
              className="border-[0.5px] border-primary/10 bg-secondary/50"
              style={{
                width: `${100 / cols}%`,
                height: `${100 / rows}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* Breaking Pixels Animation */}
      {isRevealed && (
        <div className="absolute inset-0 z-[40] pointer-events-none flex flex-wrap overflow-hidden">
          {Array.from({ length: totalPixels }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ 
                opacity: 0, 
                scale: [1, 1.2, 0],
                y: [0, -20, 500], // Small hop up then fall
                x: (Math.random() - 0.5) * 300,
                rotate: (Math.random() - 0.5) * 720,
              }}
              transition={{ 
                duration: 0.8 + Math.random() * 0.4, 
                delay: (i % cols) * 0.03 + (Math.floor(i / cols)) * 0.03 + Math.random() * 0.1,
                ease: "circIn"
              }}
              className="bg-primary border border-white/30 shadow-[0_0_15px_rgba(0,255,255,0.8)]"
              style={{
                width: `${100 / cols}%`,
                height: `${100 / rows}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
