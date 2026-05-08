"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import AchievementsSection from "@/components/achievements-section"
import ContactSection from "@/components/contact-section"
import PixelRevealSection from "@/components/pixel-reveal-section"

import { useArcadeAnimations } from "@/hooks/use-arcade-animations"

export default function Home() {
  const [isBooted, setIsBooted] = useState(false)
  const [bootProgress, setBootProgress] = useState(0)
  const { screenShake } = useArcadeAnimations()

  useEffect(() => {
    const bootSequence = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(bootSequence)
          setTimeout(() => setIsBooted(true), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(bootSequence)
  }, [])

  if (!isBooted) {
    return <BootScreen progress={bootProgress} />
  }

  return (
    <main 
      className="min-h-screen bg-transparent overflow-x-hidden relative"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
        
        <PixelRevealSection>
          <AboutSection />
        </PixelRevealSection>

        <PixelRevealSection>
          <ProjectsSection />
        </PixelRevealSection>

        <PixelRevealSection>
          <AchievementsSection />
        </PixelRevealSection>

        <PixelRevealSection>
          <ContactSection />
        </PixelRevealSection>
      </motion.div>
    </main>
  )
}



function BootScreen({ progress }: { progress: number }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 scanlines relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="text-primary text-xs md:text-sm mb-8 neon-text-cyan">
          {">>> SYSTEM BOOT SEQUENCE <<<"}
        </div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <pre className="text-primary text-[6px] md:text-[8px] leading-tight neon-text-cyan">
{`
██╗     ██╗ ██████╗ ██╗  ██╗████████╗ ██╗██████╗  █████╗ 
██║     ██║██╔════╝ ██║  ██║╚══██╔══╝███║╚════██╗██╔══██╗
██║     ██║██║  ███╗███████║   ██║   ╚██║ █████╔╝███████║
██║     ██║██║   ██║██╔══██║   ██║    ██║██╔═══╝ ██╔══██║
███████╗██║╚██████╔╝██║  ██║   ██║    ██║███████╗██║  ██║
╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═╝╚══════╝╚═╝  ╚═╝
`}
          </pre>
        </motion.div>

        <div className="w-64 md:w-80 h-6 bg-secondary border-4 border-primary mb-4 relative overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] text-primary-foreground mix-blend-difference">
              LOADING... {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>

        <div className="text-muted-foreground text-[8px] md:text-[10px] space-y-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 20 ? 1 : 0 }}
          >
            {"[OK] Initializing pixel engine..."}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 40 ? 1 : 0 }}
          >
            {"[OK] Loading game assets..."}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 60 ? 1 : 0 }}
          >
            {"[OK] Connecting to arcade network..."}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 80 ? 1 : 0 }}
          >
            {"[OK] Ready to play!"}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
