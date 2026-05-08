"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

import { triggerTransition } from "./page-transition"

const navItems = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT", href: "#about" },
  { label: "GAMES", href: "#projects" },
  { label: "WINS", href: "#achievements" },
  { label: "CONTACT", href: "#contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navItems.map((item) => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    // Scroll directly to section without full-screen transition for a more "persistent" feel
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Brand/Logo - Fixed Top Left */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-4 md:top-8 md:left-8 z-[9999]"
      >
        <button
          onClick={() => scrollToSection("#hero")}
          className="flex items-center gap-2 md:gap-4 text-primary text-[10px] md:text-[12px] tracking-[0.2em] font-bold hover:text-white transition-colors group bg-background/60 backdrop-blur-md p-2 md:p-3 border-2 md:border-4 border-primary/30 pixel-border-neon"
        >
          <img 
            src="https://img.itch.zone/aW1nLzI0MTEwODI4LmpwZw==/80x80%23/Cd4zyB.jpg" 
            alt="Logo" 
            className="w-6 h-6 md:w-10 md:h-10 border-2 border-primary group-hover:border-white transition-colors pixelated object-cover"
          />
          <span className="hidden sm:inline">LIGHT12A</span>
        </button>
      </motion.div>

      {/* Side Navigation - Fixed Right Center */}
      <motion.nav
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-6 md:gap-8 items-end"
      >
        <div className="flex flex-col gap-6 md:gap-8 items-end relative py-4 px-2 md:px-4">
          {/* Vertical line decoration - more subtle */}
          <div className="absolute right-[11px] md:right-[19px] top-0 bottom-0 w-[1px] bg-primary/20 shadow-[0_0_5px_rgba(0,255,255,0.2)]" />
          
          {navItems.map((item, i) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`group flex items-center gap-4 transition-all duration-300 ${
                activeSection === item.href.slice(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <span 
                className={`
                  text-[8px] tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap
                  ${activeSection === item.href.slice(1) 
                    ? "opacity-100 translate-x-0 neon-text-cyan scale-105" 
                    : "opacity-60 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  }
                `}
              >
                {item.label}
              </span>
              
              <div className="relative flex items-center justify-center">
                {/* Active Glow - more refined */}
                {activeSection === item.href.slice(1) && (
                  <motion.div 
                    layoutId="sideNavGlow"
                    className="absolute inset-0 bg-primary/30 blur-lg rounded-full"
                  />
                )}
                
                <div className={`
                  w-3 h-3 rotate-45 border-2 transition-all duration-300 relative z-10
                  ${activeSection === item.href.slice(1)
                    ? "bg-primary border-primary shadow-[0_0_15px_rgba(0,255,255,0.8)] scale-110"
                    : "bg-background border-muted-foreground/50 group-hover:border-primary group-hover:scale-105"
                  }
                `} />
              </div>
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  )
}
