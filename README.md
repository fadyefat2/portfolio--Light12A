# Light12A | Indie Game Developer Portfolio 🕹️

Welcome to the source code of **Light12A**, an interactive, retro-arcade inspired portfolio built for an indie game developer. This project is more than just a website; it's a demonstration of technical logic, aesthetic design, and interactive web animations.

![Portfolio Preview](public/icon-light-32x32.png) <!-- Feel free to replace with an actual screenshot -->

## 🚀 Technologies Used

This project was built using modern web development standards combined with classic game logic:
- **Framework:** Next.js 14 (App Router) & React
- **Language:** TypeScript for robust type safety
- **Styling:** Tailwind CSS (with custom neon and CRT scanline utilities)
- **Animations:** 
  - **Framer Motion:** For smooth UI component entrances and state changes.
  - **GSAP:** For high-performance parallax background effects and glitch interactions.
- **Graphics Rendering:** HTML5 `<canvas>` API for the custom Tetris AI.
- **Deployment:** Vercel

---

## 🧠 What I Learned & The Challenges I Faced

Building this portfolio was an incredible learning experience. Here are the main hurdles and takeaways:

### 1. The Tetris AI Background (The Biggest Challenge!)
I wanted the Hero section to feature a live Tetris game playing itself in the background. 
- **The Challenge:** Building a Tetris game is one thing, but building an AI that *knows* how to play it was exhausting. I had to create an evaluation algorithm that tests every possible rotation and X-position of a falling piece.
- **The Solution:** I implemented a scoring system that simulates the piece dropping. It penalizes creating "holes" and stacking too high, while heavily rewarding line clears. Seeing the blocks perfectly rotate and snap into place automatically was incredibly rewarding.

### 2. Canvas vs. DOM Performance
- **The Challenge:** Rendering hundreds of falling blocks and explosion particles using standard React `div` elements caused performance drops.
- **The Solution:** I switched the entire Tetris background to an HTML5 `<canvas>` running on a pure `requestAnimationFrame` loop, completely detached from React's render cycle. This resulted in a buttery-smooth 60FPS experience even during massive row-clear explosions.

### 3. Deployment & Git Authorship
- **The Challenge:** When attempting to deploy to Vercel, the build was blocked because the repository was private and the local Git commit email didn't match the Vercel owner exactly, triggering Vercel's "Team Collaboration" block on the free Hobby plan.
- **The Solution:** Changing the repository to Public solved the issue instantly, teaching me a valuable lesson about Vercel's strict deployment rules for private repos.

---

## 🏗️ How Every Part Was Built

Here is a breakdown of the core architectural decisions:

### `components/tetris-background.tsx`
This is the heart of the home page. It uses a 2D grid matrix to track locked blocks. 
- **Spawning:** When a piece spawns, the AI simulates dropping it across the entire board. 
- **Drawing:** It uses `ctx.clearRect` to refresh the frame and draws the blocks with a custom glass/neon aesthetic (`mix-blend-screen`). 
- **Explosions:** When a row clears, it spawns custom particle objects with velocity (`vx`, `vy`), gravity, and decay to mimic arcade shrapnel.

### `components/hero-section.tsx`
This component houses the main introductory UI. 
- I used a `backdrop-blur-md` (Glassmorphism) technique on the central card so the Tetris blocks could be seen falling *behind* the glowing neon text, creating a deep sense of layers.
- The texts utilize Framer Motion for sequential fade-ins (`delay: 0.3`, `0.4`, etc.).

### `hooks/use-arcade-animations.ts`
To keep the React components clean, I extracted the interaction logic (like hovering over buttons to cause a glitch or squish effect) into a custom React Hook that triggers GSAP timelines.

### `components/arcade-background.tsx`
For the rest of the site outside the Hero section, I created a subtle parallax starfield and a 3D perspective grid floor using CSS `transform: rotateX(75deg)` and GSAP for mouse-tracking parallax.

### The CRT Effect
A global CSS class (`.scanlines`) overlays a repeating linear-gradient across the entire screen with `pointer-events: none` to give the authentic feel of an old arcade monitor.

---

## 💻 Running Locally

To run this project on your local machine:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
