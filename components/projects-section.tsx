"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useArcadeAnimations } from "@/hooks/use-arcade-animations"

const projects = [
  {
    id: 1,
    title: "HUE DUO",
    genre: "CO-OP PUZZLE",
    year: "2026",
    description: "Color-mixing puzzle game relying on cooperation. Control Blue and Red cubes to paint tiles. Mixing them creates purple.",
    tech: ["GODOT", "PIXEL ART", "HTML5"],
    image: "https://img.itch.zone/aW1nLzI2NzgyNDAwLmpwZw==/315x250%23c/1vmNc3.jpg",
    color: "primary",
    status: "RELEASED",
    link: "https://light12a.itch.io/hue-duo",
  },
  {
    id: 2,
    title: "DONT CLICK......!",
    genre: "INTERACTIVE",
    year: "2026",
    description: "An interactive experience challenging curiosity and patience. A simple button leads to surprises and strange events.",
    tech: ["GAMEMAKER", "PIXEL ART", "WINDOWS"],
    image: "https://img.itch.zone/aW1nLzI2Mjg3MzU4LmpwZw==/315x250%23c/deboqv.jpg",
    color: "accent",
    status: "RELEASED",
    link: "https://light12a.itch.io/dont-click",
  },
  {
    id: 3,
    title: "VIRUS ESCAPE 98",
    genre: "SURVIVAL / TOP-DOWN",
    year: "2026",
    description: "Survival game as a virus in a computer system. Features dash skills and folder navigation to escape the firewall.",
    tech: ["GAMEMAKER", "RETRO", "HTML5"],
    image: "https://img.itch.zone/aW1nLzI1NjAzNjMyLnBuZw==/315x250%23c/63DDzd.png",
    color: "primary",
    status: "RELEASED",
    link: "https://light12a.itch.io/virus-escab",
  },
  {
    id: 4,
    title: "SPACE PEACE",
    genre: "TYPING DEFENSE",
    year: "2026",
    description: "Fast-paced typing game to protect a hero's isolation in deep space from meteors and invaders.",
    tech: ["GAMEMAKER", "TYPING", "PIXEL ART"],
    image: "https://img.itch.zone/aW1nLzI1NDc5MjYwLnBuZw==/315x250%23c/0Pw0Jz.png",
    color: "accent",
    status: "RELEASED",
    link: "https://light12a.itch.io/space-peace-typing-defense",
  },
  {
    id: 5,
    title: "THE URGE",
    genre: "HORROR ESCAPE",
    year: "2025",
    description: "A dark, psychological escape game about the 'original sin' of curiosity. Experience the tension of the unknown.",
    tech: ["GODOT", "HORROR", "SINGLEPLAYER"],
    image: "https://img.itch.zone/aW1nLzI0OTY5OTgwLmpwZw==/315x250%23c/5b%2FriQ.jpg",
    color: "primary",
    status: "RELEASED",
    link: "https://light12a.itch.io/the-urge",
  },
  {
    id: 6,
    title: "SANTAS GIFT SPREE!",
    genre: "PLATFORMER",
    year: "2025",
    description: "Help Santa deliver gifts and spread Christmas spirit after he overslept in this festive adventure.",
    tech: ["GODOT", "ADVENTURE", "ANDROID"],
    image: "https://img.itch.zone/aW1nLzI0NTQ5MzI2LmpwZw==/315x250%23c/FeQvjw.jpg",
    color: "accent",
    status: "RELEASED",
    link: "https://light12a.itch.io/santas-gift-spree",
  },
  {
    id: 7,
    title: "FLAMER",
    genre: "ADVENTURE",
    year: "2025",
    description: "A platforming adventure featuring a fire elemental navigating through challenging environments.",
    tech: ["GODOT", "PIXEL ART", "HTML5"],
    image: "https://img.itch.zone/aW1nLzIzOTY2MjY3LnBuZw==/315x250%23c/qayG4a.png",
    color: "primary",
    status: "RELEASED",
    link: "https://light12a.itch.io/flamer",
  },
  {
    id: 8,
    title: "UNSTABLE ROBO",
    genre: "ACTION PLATFORMER",
    year: "2025",
    description: "Action-platformer where you control an unstable robot reaching for the end of levels while managing instability.",
    tech: ["GODOT", "ACTION", "PIXEL ART"],
    image: "https://img.itch.zone/aW1nLzIzMzc1MjAxLnBuZw==/315x250%23c/1NiVFY.png",
    color: "accent",
    status: "RELEASED",
    link: "https://light12a.itch.io/unstable-robo",
  },
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { squish, glitch } = useArcadeAnimations()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (

    <section
      id="projects"
      ref={ref}
      className="min-h-screen py-20 px-4 relative bg-secondary/30"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-card border-4 border-accent px-6 py-3 mb-4">
            <h2 className="text-lg md:text-xl text-accent neon-text-purple">
              {"<< GAMES >>"}
            </h2>
          </div>
          <p className="text-muted-foreground text-[8px] md:text-[10px]">
            SELECT YOUR ADVENTURE
          </p>
        </motion.div>

        {/* Arcade cabinet display */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              onClick={() =>
                setSelectedProject(selectedProject === project.id ? null : project.id)
              }
              onMouseEnter={(e) => squish(e.currentTarget)}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "var(--arcade-panel)",
                borderColor: "var(--primary)",
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)"
              }}
              className={`
                bg-card border-4 cursor-pointer transition-all duration-200
                ${project.color === "primary" ? "border-primary" : "border-accent"}
                ${selectedProject === project.id ? "pixel-border-neon" : ""}
                arcade-card relative overflow-hidden group
              `}
            >
              {/* Palette shift overlay */}
              <motion.div 
                className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
              />

              {/* Game screen / Link */}
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.link, "_blank")
                }}
                className={`
                  h-40 relative overflow-hidden cursor-pointer group/screen
                  ${project.color === "primary" ? "bg-primary/10" : "bg-accent/10"}
                `}
              >
                {/* Project Image */}
                <motion.div 
                  className="absolute inset-0 w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover/screen:opacity-100 transition-opacity"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="bg-primary text-black px-4 py-1 text-[8px] font-bold">
                      PLAY NOW
                    </span>
                  </div>
                </motion.div>

                {/* Status badge */}
                <div
                  className={`
                    absolute top-2 right-2 px-2 py-1 text-[6px] z-10
                    ${project.status === "RELEASED" 
                      ? "bg-green-500 text-black" 
                      : "bg-yellow-500 text-black blink"
                    }
                  `}
                >
                  {project.status}
                </div>

                {/* Scanlines overlay */}
                <div className="absolute inset-0 scanlines pointer-events-none z-20" />
              </div>

              {/* Info panel */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className={`
                      text-sm md:text-base
                      ${project.color === "primary" ? "text-primary" : "text-accent"}
                    `}
                  >
                    {project.title}
                  </h3>
                  <span className="text-muted-foreground text-[8px]">
                    {project.year}
                  </span>
                </div>

                <p className="text-muted-foreground text-[8px] mb-2">
                  {project.genre}
                </p>

                <motion.div
                  initial={false}
                  animate={{
                    height: selectedProject === project.id ? "auto" : 0,
                    opacity: selectedProject === project.id ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-foreground text-[8px] md:text-[10px] mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-secondary text-muted-foreground text-[6px] border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className={`
                          w-2 h-2
                          ${j < 4 
                            ? project.color === "primary" ? "bg-primary" : "bg-accent"
                            : "bg-secondary"
                          }
                        `}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-[6px]">
                    {selectedProject === project.id ? "CLICK TO CLOSE" : "CLICK FOR INFO"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More games hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground text-[8px]">
            {">>> MORE GAMES LOADING... <<<"}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
