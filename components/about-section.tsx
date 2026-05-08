"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const stats = [
  { label: "YEARS EXP", value: "1", icon: "⏰" },
  { label: "GAMES MADE", value: "8", icon: "🎮" },
  { label: "LINES CODE", value: "25K+", icon: "💻" },
  { label: "CUPS COFFEE", value: "∞", icon: "☕" },
]

const skills = [
  { name: "GODOT", level: 90 },
  { name: "GAMEMAKER", level: 85 },
  { name: "PIXEL ART", level: 95 },
  { name: "GAME DESIGN", level: 88 },
  { name: "PUZZLE DESIGN", level: 80 },
]

import { useArcadeAnimations } from "@/hooks/use-arcade-animations"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { squish } = useArcadeAnimations()

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-20 px-4 relative"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-card border-4 border-primary px-6 py-3 mb-4">
            <h2 className="text-lg md:text-xl text-primary neon-text-cyan">
              {"<< ABOUT >>"}
            </h2>
          </div>
          <p className="text-muted-foreground text-[8px] md:text-[10px]">
            PLAYER PROFILE LOADED
          </p>
        </motion.div>

        {/* Character card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border-4 border-primary p-6 md:p-8 mb-8 relative group"
        >
          <div className="absolute top-0 left-4 -translate-y-1/2 bg-background px-2">
            <span className="text-accent text-[8px]">CHARACTER SELECT</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Avatar area */}
            <div className="flex flex-col items-center">
              <motion.div 
                onMouseEnter={(e) => squish(e.currentTarget)}
                className="w-32 h-32 md:w-40 md:h-40 bg-secondary border-4 border-accent relative overflow-hidden mb-4 cursor-pointer flex items-center justify-center"
              >
                <img 
                  src="https://img.itch.zone/aW1nLzI0MTEwODI4LmpwZw==/80x80%23/Cd4zyB.jpg" 
                  alt="Light12A Logo" 
                  className="w-full h-full object-cover pixelated"
                />
              </motion.div>
              <p className="text-primary text-xs md:text-sm text-center">
                LIGHT12A
              </p>
              <p className="text-accent text-[8px] md:text-[10px]">
                INDIE GAME DEVELOPER
              </p>
            </div>

            {/* Bio area */}
            <div className="space-y-4">
              <div className="bg-secondary p-4 border-2 border-border hover:border-primary transition-colors cursor-default">
                <p className="text-foreground text-[10px] md:text-xs leading-relaxed">
                  {">"} A game developer specializing in 2D pixel art games, puzzles, and interactive experiences. 
                  Passionate about crafting unique retro aesthetics and engaging gameplay mechanics.
                </p>
              </div>
              <div className="bg-secondary p-4 border-2 border-border hover:border-accent transition-colors cursor-default">
                <p className="text-foreground text-[10px] md:text-xs leading-relaxed">
                  {">"} Frequent participant in game jams, bringing creative concepts to life 
                  with meticulous attention to detail and nostalgic pixel art visuals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              onMouseEnter={(e) => squish(e.currentTarget)}
              className="bg-card border-4 border-accent p-4 text-center arcade-card cursor-pointer hover:bg-secondary/50"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-primary text-lg md:text-xl neon-text-cyan">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-[6px] md:text-[8px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>


        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-card border-4 border-primary p-6"
        >
          <h3 className="text-sm text-accent mb-6 text-center neon-text-purple">
            SKILL TREE
          </h3>
          <div className="space-y-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-foreground text-[8px] md:text-[10px]">
                    {skill.name}
                  </span>
                  <span className="text-primary text-[8px] md:text-[10px]">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-4 bg-secondary border-2 border-border relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                    className="h-full bg-primary"
                  />
                  {/* Pixel segments */}
                  <div className="absolute inset-0 flex">
                    {[...Array(10)].map((_, j) => (
                      <div
                        key={j}
                        className="flex-1 border-r border-background/30"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
