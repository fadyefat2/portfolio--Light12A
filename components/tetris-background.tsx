"use client"

import { useEffect, useRef } from "react"

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]], // L
  [[1, 1], [1, 1]], // O
  [[0, 1, 1], [1, 1, 0]], // S
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 1, 0], [0, 1, 1]], // Z
]

const COLORS = [
  "#00ffff", // Cyan
  "#0077ff", // Blue
  "#ff7f00", // Orange
  "#ffff00", // Yellow
  "#00ff00", // Green
  "#cc00ff", // Purple
  "#ff0055", // Red/Pink
]

export default function TetrisBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationFrameId: number;
    let lastTime = performance.now();
    let dropCounter = 0;
    let dropInterval = 20; // Super fast drop speed for dynamic AI background

    let BLOCK_SIZE = 40;
    let COLS = 0;
    let ROWS = 0;
    let grid: (string | null)[][] = [];

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      decay: number;
      color: string;
      size: number;
      isWhiteFlash?: boolean;
    }[] = [];

    let currentPiece: {
      matrix: number[][],
      x: number,
      y: number,
      color: string
    } | null = null;

    let wipingBoard = false;
    let wipeY = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      BLOCK_SIZE = Math.max(30, Math.floor(canvas.width / 40));
      COLS = Math.ceil(canvas.width / BLOCK_SIZE);
      ROWS = Math.ceil(canvas.height / BLOCK_SIZE);
      
      const newGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
      
      if (grid.length > 0) {
        for (let r = 0; r < Math.min(grid.length, ROWS); r++) {
          for (let c = 0; c < Math.min(grid[0].length, COLS); c++) {
            newGrid[ROWS - 1 - r][c] = grid[grid.length - 1 - r][c];
          }
        }
      }
      grid = newGrid;
    }

    window.addEventListener('resize', resize);
    resize();

    // AI Helper Functions
    const rotate = (matrix: number[][]) => {
      const N = matrix.length;
      const M = matrix[0].length;
      let result = new Array(M).fill(0).map(() => new Array(N).fill(0));
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < M; c++) {
          result[c][N - 1 - r] = matrix[r][c];
        }
      }
      return result;
    }

    const cloneGrid = (g: (string | null)[][]) => g.map(row => [...row]);

    const getScore = (testGrid: (string | null)[][]) => {
      let linesCleared = 0;
      let holes = 0;
      let aggregateHeight = 0;
      let bumpiness = 0;
      let heights = new Array(COLS).fill(0);

      // Calculate heights
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          if (testGrid[r][c] !== null) {
            heights[c] = ROWS - r;
            aggregateHeight += heights[c];
            break;
          }
        }
      }

      // Calculate holes
      for (let c = 0; c < COLS; c++) {
        let blockFound = false;
        for (let r = 0; r < ROWS; r++) {
          if (testGrid[r][c] !== null) {
            blockFound = true;
          } else if (testGrid[r][c] === null && blockFound) {
            holes++;
          }
        }
      }

      // Calculate bumpiness
      for (let c = 0; c < COLS - 1; c++) {
        bumpiness += Math.abs(heights[c] - heights[c + 1]);
      }

      // Calculate lines cleared
      for (let r = 0; r < ROWS; r++) {
        let isFull = true;
        for (let c = 0; c < COLS; c++) {
          if (testGrid[r][c] === null) {
            isFull = false;
            break;
          }
        }
        if (isFull) linesCleared++;
      }

      // AI Weights
      return (linesCleared * 76) - (holes * 35) - (aggregateHeight * 5) - (bumpiness * 18);
    }

    const spawnPiece = () => {
      const typeId = Math.floor(Math.random() * SHAPES.length);
      const originalMatrix = SHAPES[typeId];
      const color = COLORS[typeId];
      
      let bestScore = -Infinity;
      let bestMatrix = originalMatrix;
      let bestX = 0;

      // Evaluate all 4 rotations
      let currentMatrix = originalMatrix;
      for (let rot = 0; rot < 4; rot++) {
        const pieceWidth = currentMatrix[0].length;
        
        // Evaluate all possible X positions
        for (let x = 0; x <= COLS - pieceWidth; x++) {
          // Find drop Y
          let dropY = 0;
          while (!collide(grid, { matrix: currentMatrix, x, y: dropY })) {
            dropY++;
          }
          dropY--; // Last valid position

          // Simulate merge
          const testGrid = cloneGrid(grid);
          let canPlace = false;
          for (let r = 0; r < currentMatrix.length; r++) {
            for (let c = 0; c < currentMatrix[r].length; c++) {
              if (currentMatrix[r][c]) {
                const gy = dropY + r;
                const gx = x + c;
                if (gy >= 0 && gy < ROWS) {
                  testGrid[gy][gx] = color;
                  canPlace = true;
                }
              }
            }
          }

          if (canPlace) {
            const score = getScore(testGrid);
            // Slight random factor to prevent infinite repeating loops on flat boards
            const randomJitter = Math.random() * 2; 
            if (score + randomJitter > bestScore) {
              bestScore = score + randomJitter;
              bestMatrix = currentMatrix;
              bestX = x;
            }
          }
        }
        currentMatrix = rotate(currentMatrix);
      }

      currentPiece = {
        matrix: bestMatrix,
        x: bestX,
        y: -bestMatrix.length, // Spawn at top
        color
      };

      if (collide(grid, currentPiece) && currentPiece.y >= 0) {
        wipingBoard = true;
        wipeY = 0;
        currentPiece = null;
      }
    }

    const collide = (grid: (string | null)[][], piece: any) => {
      for (let r = 0; r < piece.matrix.length; r++) {
        for (let c = 0; c < piece.matrix[r].length; c++) {
          if (piece.matrix[r][c] !== 0) {
            const gridY = piece.y + r;
            const gridX = piece.x + c;
            if (gridX < 0 || gridX >= COLS || gridY >= ROWS || (gridY >= 0 && grid[gridY][gridX])) {
              return true;
            }
          }
        }
      }
      return false;
    }

    const merge = (grid: (string | null)[][], piece: any) => {
      for (let r = 0; r < piece.matrix.length; r++) {
        for (let c = 0; c < piece.matrix[r].length; c++) {
          if (piece.matrix[r][c] !== 0) {
            const gridY = piece.y + r;
            const gridX = piece.x + c;
            if (gridY >= 0 && gridY < ROWS && gridX >= 0 && gridX < COLS) {
              grid[gridY][gridX] = piece.color;
            }
          }
        }
      }
    }

    const explodeRow = (r: number) => {
      const centerY = r * BLOCK_SIZE + BLOCK_SIZE / 2;
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c]) {
          const color = grid[r][c]!;
          const centerX = c * BLOCK_SIZE + BLOCK_SIZE / 2;
          
          // Flash effect
          for (let i = 0; i < 3; i++) {
            particles.push({
              x: centerX + (Math.random() - 0.5) * BLOCK_SIZE,
              y: centerY + (Math.random() - 0.5) * BLOCK_SIZE,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              life: 1,
              decay: 0.1,
              color: "#ffffff", // Pure white for flash
              size: Math.random() * 8 + 4,
              isWhiteFlash: true
            });
          }

          // Shrapnel
          for (let i = 0; i < 15; i++) {
            particles.push({
              x: centerX,
              y: centerY,
              vx: (Math.random() - 0.5) * 20,
              vy: (Math.random() - 0.5) * 20,
              life: 1,
              decay: Math.random() * 0.02 + 0.01,
              color: color,
              size: Math.random() * 4 + 2
            });
          }
        }
      }
    }

    const clearRows = () => {
      for (let r = ROWS - 1; r >= 0; r--) {
        let isFull = true;
        for (let c = 0; c < COLS; c++) {
          if (!grid[r][c]) {
            isFull = false;
            break;
          }
        }

        if (isFull) {
          explodeRow(r);
          grid.splice(r, 1);
          grid.unshift(Array(COLS).fill(null));
          r++; 
        }
      }
    }

    const drawBlock = (x: number, y: number, color: string, alpha = 0.8) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, Math.max(2, BLOCK_SIZE * 0.15));
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (grid[r][c]) {
            drawBlock(c, r, grid[r][c]!, 0.4); 
          }
        }
      }

      if (currentPiece) {
        for (let r = 0; r < currentPiece.matrix.length; r++) {
          for (let c = 0; c < currentPiece.matrix[r].length; c++) {
            if (currentPiece.matrix[r][c]) {
              const gridY = currentPiece.y + r;
              if (gridY >= 0) {
                drawBlock(currentPiece.x + c, gridY, currentPiece.color, 0.9);
              }
            }
          }
        }
      }

      if (wipingBoard) {
        ctx.fillStyle = "#00ffff";
        ctx.globalAlpha = 0.8;
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#00ffff";
        ctx.fillRect(0, wipeY * BLOCK_SIZE, canvas.width, BLOCK_SIZE * 2);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        
        if (p.isWhiteFlash) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = "#ffffff";
        } else {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        }
        
        ctx.beginPath();
        // Render rects for shrapnel, arc for flash
        if (p.isWhiteFlash) {
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
        }
        
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    const update = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (wipingBoard) {
        dropCounter += deltaTime;
        if (dropCounter > 20) { 
          dropCounter = 0;
          if (wipeY < ROWS) {
            for(let c=0; c<COLS; c++) grid[wipeY][c] = null;
            wipeY++;
          } else {
            wipingBoard = false;
            spawnPiece();
          }
        }
      } else {
        if (!currentPiece) {
          spawnPiece();
        } else {
          dropCounter += deltaTime;
          if (dropCounter > dropInterval) {
            currentPiece.y++;
            dropCounter = 0;

            if (collide(grid, currentPiece)) {
              currentPiece.y--;
              if (currentPiece.y >= -1) {
                merge(grid, currentPiece);
                clearRows();
              } else {
                wipingBoard = true;
                wipeY = 0;
              }
              currentPiece = null;
            }
          }
        }
      }

      draw();
      animationFrameId = requestAnimationFrame(update);
    }

    spawnPiece();
    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen"
      />
    </div>
  )
}
