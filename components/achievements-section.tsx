"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const achievements = [
  {
    id: 1,
    title: "MICRO JAM 057: SYMMETRY",
    award: "HUE DUO",
    description: "Ranked #13 in Theme Usage. Successfully implemented color-mixing co-op mechanics.",
    icon: "🏆",
    rarity: "LEGENDARY",
    color: "text-yellow-400",
  },
  {
    id: 2,
    title: "CONDUIT RETRO JAM",
    award: "DONT CLICK......!",
    description: "Official submission for the $600 Retro prize pool.",
    icon: "🎨",
    rarity: "EPIC",
    color: "text-purple-400",
  },
  {
    id: 3,
    title: "HAM JAM #1",
    award: "VIRUS ESCAPE 98",
    description: "Competitive survival submission for the Ham Jam event.",
    icon: "🚀",
    rarity: "RARE",
    color: "text-blue-400",
  },
  {
    id: 4,
    title: "MICRO JAM 053: ISOLATION",
    award: "SPACE PEACE",
    description: "Developed a fast-paced typing defense for the $200 prize jam.",
    icon: "👾",
    rarity: "EPIC",
    color: "text-purple-400",
  },
  {
    id: 5,
    title: "CRYSTAL JAM",
    award: "THE URGE",
    description: "Explored psychological horror themes in the $100 Crystal Jam.",
    icon: "⭐",
    rarity: "RARE",
    color: "text-blue-400",
  },
  {
    id: 6,
    title: "MICRO JAM 051: CHRISTMAS",
    award: "SANTAS GIFT SPREE",
    description: "Festive submission for the holiday-themed Micro Jam.",
    icon: "📺",
    rarity: "UNCOMMON",
    color: "text-green-400",
  },
  {
    id: 7,
    title: "IT'S BASED JAM",
    award: "FLAMER",
    description: "A hidden gem submitted to the Fall 2025 $500 prize jam.",
    icon: "🔥",
    rarity: "LEGENDARY",
    color: "text-yellow-400",
  },
  {
    id: 8,
    title: "SOP GAME JAM",
    award: "UNSTABLE ROBO",
    description: "Ranked #5 in Best Use of AI and #21 Overall out of 450+ entries.",
    icon: "🤖",
    rarity: "LEGENDARY",
    color: "text-yellow-400",
  },
]

export default function AchievementsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="achievements"
      ref={ref}
      className="min-h-screen py-20 px-4 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-card border-4 border-primary px-6 py-3 mb-4">
            <h2 className="text-lg md:text-xl text-primary neon-text-cyan">
              {"<< ACHIEVEMENTS >>"}
            </h2>
          </div>
          <p className="text-muted-foreground text-[8px] md:text-[10px]">
            TROPHIES UNLOCKED: {achievements.length}/{achievements.length}
          </p>
        </motion.div>

        {/* Trophy case */}
        <div className="bg-card border-4 border-primary p-6 md:p-8 relative">
          {/* Cabinet decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                  type: "spring",
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-secondary border-2 border-border p-4 relative overflow-hidden group"
              >
                {/* Rarity glow effect */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${
                    achievement.rarity === "LEGENDARY"
                      ? "bg-yellow-400"
                      : achievement.rarity === "EPIC"
                      ? "bg-purple-400"
                      : achievement.rarity === "RARE"
                      ? "bg-blue-400"
                      : "bg-green-400"
                  }`}
                />

                {/* Trophy icon */}
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="text-3xl md:text-4xl"
                  >
                    {achievement.icon}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[6px] px-1.5 py-0.5 ${
                          achievement.rarity === "LEGENDARY"
                            ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/50"
                            : achievement.rarity === "EPIC"
                            ? "bg-purple-400/20 text-purple-400 border border-purple-400/50"
                            : achievement.rarity === "RARE"
                            ? "bg-blue-400/20 text-blue-400 border border-blue-400/50"
                            : "bg-green-400/20 text-green-400 border border-green-400/50"
                        }`}
                      >
                        {achievement.rarity}
                      </span>
                    </div>

                    <h3 className="text-foreground text-[10px] md:text-xs mb-1">
                      {achievement.title}
                    </h3>

                    <p className={`text-sm font-bold ${achievement.color} mb-1`}>
                      {achievement.award}
                    </p>

                    <p className="text-muted-foreground text-[8px]">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                {/* Achievement unlocked bar */}
                <div className="mt-3 h-1 bg-background relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                    className={`h-full ${
                      achievement.rarity === "LEGENDARY"
                        ? "bg-yellow-400"
                        : achievement.rarity === "EPIC"
                        ? "bg-purple-400"
                        : achievement.rarity === "RARE"
                        ? "bg-blue-400"
                        : "bg-green-400"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-8 flex justify-center gap-8"
        >
          <div className="text-center">
            <p className="text-yellow-400 text-lg md:text-xl">3</p>
            <p className="text-[6px] text-muted-foreground">LEGENDARY</p>
          </div>
          <div className="text-center">
            <p className="text-purple-400 text-lg md:text-xl">2</p>
            <p className="text-[6px] text-muted-foreground">EPIC</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400 text-lg md:text-xl">2</p>
            <p className="text-[6px] text-muted-foreground">RARE</p>
          </div>
          <div className="text-center">
            <p className="text-green-400 text-lg md:text-xl">1</p>
            <p className="text-[6px] text-muted-foreground">UNCOMMON</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
