"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const socialLinks = [
  { label: "ITCH.IO", url: "https://light12a.itch.io/", icon: "◉" },
  { label: "DISCORD", url: "https://discord.com/users/merostar", icon: "◈" },
  { label: "BUY ME A COFFEE", url: "#", icon: "☕" },
]

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [terminalText, setTerminalText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const fullText = `
> TERMINAL v2.0.24
> SECURE CONNECTION ESTABLISHED
> READY FOR INPUT...

CONTACT LIGHT12A:
==================
STATUS: ONLINE
EMAIL: mrmres49@gmail.com
DISCORD: merostar
RESPONSE TIME: < 24H

TYPE YOUR MESSAGE BELOW:
`

  useEffect(() => {
    if (isInView) {
      let i = 0
      const typeInterval = setInterval(() => {
        if (i < fullText.length) {
          setTerminalText(fullText.slice(0, i + 1))
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 20)
      return () => clearInterval(typeInterval)
    }
  }, [isInView])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`New Transmission from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:mrmres49@gmail.com?subject=${subject}&body=${body}`
    
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen py-20 px-4 relative bg-secondary/30"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-card border-4 border-accent px-6 py-3 mb-4">
            <h2 className="text-lg md:text-xl text-accent neon-text-purple">
              {"<< CONTACT >>"}
            </h2>
          </div>
          <p className="text-muted-foreground text-[8px] md:text-[10px]">
            ESTABLISH CONNECTION
          </p>
        </motion.div>

        {/* Terminal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border-4 border-primary relative overflow-hidden"
        >
          {/* Terminal header */}
          <div className="bg-primary px-4 py-2 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500" />
              <div className="w-3 h-3 bg-yellow-500" />
              <div className="w-3 h-3 bg-green-500" />
            </div>
            <span className="text-primary-foreground text-[8px]">
              ARCADE_TERMINAL.EXE
            </span>
            <div className="w-12" />
          </div>

          {/* Terminal content */}
          <div className="p-6 md:p-8">
            {/* Terminal text display */}
            <div className="bg-background/50 p-4 mb-6 border-2 border-border font-mono">
              <pre className="text-primary text-[8px] md:text-[10px] whitespace-pre-wrap leading-relaxed">
                {terminalText}
                <span
                  className={`inline-block w-2 h-3 bg-primary ml-0.5 ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                />
              </pre>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-muted-foreground text-[8px] mb-1 block">
                  {">"} ENTER NAME:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-background border-2 border-primary text-foreground text-[10px] md:text-xs p-3 focus:outline-none focus:border-accent transition-colors"
                  placeholder="PLAYER_NAME"
                  required
                />
              </div>

              <div>
                <label className="text-muted-foreground text-[8px] mb-1 block">
                  {">"} ENTER EMAIL:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-background border-2 border-primary text-foreground text-[10px] md:text-xs p-3 focus:outline-none focus:border-accent transition-colors"
                  placeholder="player@arcade.net"
                  required
                />
              </div>

              <div>
                <label className="text-muted-foreground text-[8px] mb-1 block">
                  {">"} ENTER MESSAGE:
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-background border-2 border-primary text-foreground text-[10px] md:text-xs p-3 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="TYPE YOUR MESSAGE HERE..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground py-3 text-xs hover:bg-accent transition-colors border-4 border-primary hover:border-accent"
              >
                {">>> SEND TRANSMISSION <<<"}
              </motion.button>
            </form>

            {/* Social links */}
            <div className="mt-8 pt-6 border-t-2 border-border">
              <p className="text-muted-foreground text-[8px] mb-4 text-center">
                {">"} ALTERNATIVE CHANNELS:
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-2 bg-secondary px-4 py-2 border-2 border-border hover:border-primary transition-colors group"
                  >
                    <span className="text-primary group-hover:text-accent transition-colors">
                      {link.icon}
                    </span>
                    <span className="text-foreground text-[8px] group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Overlay */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-primary border-4 border-white p-8 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] pixel-border-neon pointer-events-auto">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-primary-foreground text-xl md:text-2xl font-bold mb-4"
                >
                  TRANSMISSION SENT!
                </motion.div>
                <p className="text-primary-foreground text-[10px] md:text-xs">
                  YOUR MESSAGE HAS BEEN ENCRYPTED AND SENT TO THE GRID.
                </p>
                <p className="text-primary-foreground text-[8px] mt-4 opacity-70">
                  ESTIMATED RESPONSE TIME: 24H
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-card border-4 border-border p-4 inline-block">
            <p className="text-muted-foreground text-[8px] mb-2">
              © 2024 LIGHT12A - ALL RIGHTS RESERVED
            </p>
            <p className="text-primary text-[6px]">
              CRAFTED WITH ♥ AND LOTS OF PIXELS
            </p>
          </div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-muted-foreground text-[8px] hover:text-primary transition-colors"
            >
              ▲ BACK TO TOP ▲
            </button>
          </motion.div>
        </motion.footer>
      </div>
    </section>
  )
}
