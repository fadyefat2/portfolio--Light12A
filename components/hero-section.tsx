"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useArcadeAnimations } from "@/hooks/use-arcade-animations"


export default function HeroSection() {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  const { glitch, squish } = useArcadeAnimations()

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Video background for the Hero section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
          src="/arcade-bg.mp4"
        />
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        {/* Arcade cabinet frame */}
        <div className="bg-card border-4 border-primary p-8 md:p-12 relative pixel-border-neon overflow-hidden">
          {/* Screen bezel */}
          <div className="absolute top-2 left-2 right-2 h-1 bg-primary opacity-50" />
          <div className="absolute bottom-2 left-2 right-2 h-1 bg-primary opacity-50" />
          <div className="absolute top-2 bottom-2 left-2 w-1 bg-primary opacity-50" />
          <div className="absolute top-2 bottom-2 right-2 w-1 bg-primary opacity-50" />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <span className="text-accent text-[8px] md:text-[10px] animate-pulse">
              {">>> INSERT COIN TO PLAY <<<"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onMouseEnter={(e) => glitch(e.currentTarget)}
            className="text-3xl md:text-5xl lg:text-7xl text-primary mb-4 neon-text-cyan tracking-tighter font-bold cursor-pointer"
          >
            LIGHT12A
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <p className="text-foreground text-[10px] md:text-xs mb-2">
              DEVELOPER:
            </p>
            <p className="text-accent text-xs md:text-sm neon-text-purple uppercase">
              Moris Efat
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {["PIXEL ART", "PUZZLES", "INTERACTIVE"].map((tag, i) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                onMouseEnter={(e) => squish(e.currentTarget)}
                className="px-3 py-1 bg-secondary text-primary text-[8px] border-2 border-primary cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-muted-foreground text-[8px] md:text-[10px] cursor-pointer hover:text-primary transition-colors inline-block"
            onClick={() => {
              const element = document.getElementById("projects")
              if (element) element.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span className="text-primary">{">"}</span>
            {" CLICK TO START"}
            <span
              className={`inline-block w-2 h-3 bg-primary ml-1 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </motion.div>
        </div>

        {/* Controls hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex justify-center gap-4"
        >
          <button 
            onClick={() => {
              const element = document.getElementById("about")
              if (element) element.scrollIntoView({ behavior: "smooth" })
            }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-8 border-2 border-primary flex items-center justify-center text-primary text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              ↓
            </motion.div>
            <span className="text-muted-foreground text-[6px] group-hover:text-primary transition-colors">SCROLL</span>
          </button>
        </motion.div>
      </motion.div>

      {/* High score display */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute top-24 right-4 md:right-8 text-right hidden md:block"
      >
        <p className="text-[8px] text-muted-foreground mb-1">HIGH SCORE</p>
        <p className="text-primary text-sm neon-text-cyan">999,999</p>
      </motion.div>

      {/* Credits display */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute top-24 left-4 md:left-8 hidden md:block"
      >
        <p className="text-[8px] text-muted-foreground mb-1">CREDITS</p>
        <p className="text-accent text-sm neon-text-purple">∞</p>
      </motion.div>
    </section>
  )
}
