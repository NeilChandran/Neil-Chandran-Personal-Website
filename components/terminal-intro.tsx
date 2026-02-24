"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

/* ────────────────────────────────────────────────────────────────────
   A single LEGO-style brick: box geometry + a rounded bevel look
   via meshStandardMaterial with low roughness edges.
   ──────────────────────────────────────────────────────────────────── */

function Brick({
  size,
  color,
  targetPos,
  targetRot,
  startPos,
  startRot,
  trigger,
  delay,
}: {
  size: [number, number, number]
  color: string
  targetPos: [number, number, number]
  targetRot?: [number, number, number]
  startPos: [number, number, number]
  startRot?: [number, number, number]
  trigger: boolean
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const progress = useRef(0)
  const elapsed = useRef(0)
  const started = useRef(false)

  const tRot = targetRot || [0, 0, 0]
  const sRot = startRot || [0, 0, 0]

  useFrame((_, delta) => {
    if (!ref.current) return

    if (trigger) {
      elapsed.current += delta * 1000
      if (elapsed.current >= delay) started.current = true
    }

    if (started.current && progress.current < 1) {
      progress.current = Math.min(progress.current + delta * 4.0, 1)
    }

    // Cubic ease-out
    const t = 1 - Math.pow(1 - progress.current, 3)

    ref.current.position.x = startPos[0] + (targetPos[0] - startPos[0]) * t
    ref.current.position.y = startPos[1] + (targetPos[1] - startPos[1]) * t
    ref.current.position.z = startPos[2] + (targetPos[2] - startPos[2]) * t

    ref.current.rotation.x = sRot[0] + (tRot[0] - sRot[0]) * t
    ref.current.rotation.y = sRot[1] + (tRot[1] - sRot[1]) * t
    ref.current.rotation.z = sRot[2] + (tRot[2] - sRot[2]) * t
  })

  return (
    <mesh ref={ref} position={startPos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
    </mesh>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Stud: the small cylindrical bump on top of each brick
   ──────────────────────────────────────────────────────────────────── */

function Stud({
  position,
  color,
  trigger,
  delay,
  startPos,
}: {
  position: [number, number, number]
  color: string
  trigger: boolean
  delay: number
  startPos: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)
  const progress = useRef(0)
  const elapsed = useRef(0)
  const started = useRef(false)

  useFrame((_, delta) => {
    if (!ref.current) return
    if (trigger) {
      elapsed.current += delta * 1000
      if (elapsed.current >= delay) started.current = true
    }
    if (started.current && progress.current < 1) {
      progress.current = Math.min(progress.current + delta * 4.0, 1)
    }
    const t = 1 - Math.pow(1 - progress.current, 3)
    ref.current.position.x = startPos[0] + (position[0] - startPos[0]) * t
    ref.current.position.y = startPos[1] + (position[1] - startPos[1]) * t
    ref.current.position.z = startPos[2] + (position[2] - startPos[2]) * t
  })

  return (
    <mesh ref={ref} position={startPos} castShadow>
      <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
    </mesh>
  )
}

/* ────────────────────────────────────────────────────────────────────
   A brick + studs on top, moving as a logical unit
   ──────────────────────────────────────────────────────────────────── */

function BrickWithStuds({
  size,
  color,
  targetPos,
  startPos,
  trigger,
  delay,
  studCountX,
  studCountZ,
}: {
  size: [number, number, number]
  color: string
  targetPos: [number, number, number]
  startPos: [number, number, number]
  trigger: boolean
  delay: number
  studCountX: number
  studCountZ: number
}) {
  const studs: { pos: [number, number, number]; start: [number, number, number] }[] = []
  const topY = size[1] / 2 + 0.06
  const spacingX = size[0] / (studCountX + 1)
  const spacingZ = size[2] / (studCountZ + 1)
  const offsetDx = startPos[0] - targetPos[0]
  const offsetDy = startPos[1] - targetPos[1]
  const offsetDz = startPos[2] - targetPos[2]

  for (let ix = 1; ix <= studCountX; ix++) {
    for (let iz = 1; iz <= studCountZ; iz++) {
      const sx = targetPos[0] - size[0] / 2 + spacingX * ix
      const sy = targetPos[1] + topY
      const sz = targetPos[2] - size[2] / 2 + spacingZ * iz
      studs.push({
        pos: [sx, sy, sz],
        start: [sx + offsetDx, sy + offsetDy, sz + offsetDz],
      })
    }
  }

  return (
    <group>
      <Brick
        size={size}
        color={color}
        targetPos={targetPos}
        startPos={startPos}
        trigger={trigger}
        delay={delay}
      />
      {studs.map((s, i) => (
        <Stud
          key={i}
          position={s.pos}
          startPos={s.start}
          color={color}
          trigger={trigger}
          delay={delay}
        />
      ))}
    </group>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Camera with subtle drift
   ──────────────────────────────────────────────────────────────────── */

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x = 0 + Math.sin(t * 0.2) * 0.15
    camera.position.y = 5.5 + Math.cos(t * 0.15) * 0.1
    camera.position.z = 10 + Math.sin(t * 0.1) * 0.1
    camera.lookAt(0, 0.5, 0)
  })
  return null
}

/* ────────────────────────────────────────────────────────────────────
   The full 3D scene: N (white bricks) + C (cyan bricks)

   Each letter is built from 3-4 large LEGO-style bricks.
   N: left bar, right bar, diagonal piece
   C: left bar (spine), top bar, bottom bar
   ──────────────────────────────────────────────────────────────────── */

function Scene({ trigger }: { trigger: boolean }) {
  const nColor = "#d4d4d4"
  const cColor = "#06b6d4"

  // Brick height unit
  const bh = 0.7
  // N offset: shift entire N to the left
  const nx = -2.2
  // C offset: shift entire C to the right
  const cx = 1.6

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 8]} intensity={1.4} castShadow />
      <directionalLight position={[-4, 6, -3]} intensity={0.3} />

      <CameraDrift />

      {/* ═══ N: left vertical bar ═══ */}
      <BrickWithStuds
        size={[0.9, bh * 4, 0.9]}
        color={nColor}
        targetPos={[nx - 0.95, bh * 2, 0]}
        startPos={[nx - 0.95 - 12, bh * 2, 0]}
        trigger={trigger}
        delay={0}
        studCountX={1}
        studCountZ={1}
      />

      {/* ═══ N: right vertical bar ═══ */}
      <BrickWithStuds
        size={[0.9, bh * 4, 0.9]}
        color={nColor}
        targetPos={[nx + 0.95, bh * 2, 0]}
        startPos={[nx + 0.95 + 12, bh * 2, 0]}
        trigger={trigger}
        delay={80}
        studCountX={1}
        studCountZ={1}
      />

      {/* ═══ N: diagonal connector (top-left to bottom-right) ═══ */}
      <Brick
        size={[0.7, bh * 4.6, 0.85]}
        color={nColor}
        targetPos={[nx, bh * 2, 0]}
        targetRot={[0, 0, -0.52]}
        startPos={[nx, bh * 2 + 10, 0]}
        startRot={[0, 0, -0.52]}
        trigger={trigger}
        delay={160}
      />

      {/* ═══ C: left vertical bar (spine) ═══ */}
      <BrickWithStuds
        size={[0.9, bh * 4, 0.9]}
        color={cColor}
        targetPos={[cx, bh * 2, 0]}
        startPos={[cx, bh * 2 - 10, 0]}
        trigger={trigger}
        delay={60}
        studCountX={1}
        studCountZ={1}
      />

      {/* ═══ C: top horizontal bar ═══ */}
      <BrickWithStuds
        size={[1.8, bh, 0.9]}
        color={cColor}
        targetPos={[cx + 1.35, bh * 3.5, 0]}
        startPos={[cx + 1.35 + 10, bh * 3.5, 0]}
        trigger={trigger}
        delay={180}
        studCountX={2}
        studCountZ={1}
      />

      {/* ═══ C: bottom horizontal bar ═══ */}
      <BrickWithStuds
        size={[1.8, bh, 0.9]}
        color={cColor}
        targetPos={[cx + 1.35, bh * 0.5, 0]}
        startPos={[cx + 1.35 + 10, bh * 0.5 - 4, 0]}
        trigger={trigger}
        delay={240}
        studCountX={2}
        studCountZ={1}
      />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
    </>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Main intro component
   ──────────────────────────────────────────────────────────────────── */

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"idle" | "building" | "loading" | "done">("idle")
  const [loadProgress, setLoadProgress] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 600)
    return () => clearTimeout(t)
  }, [])

  // Loading bar
  useEffect(() => {
    if (phase !== "loading") return
    const start = Date.now()
    const duration = 700
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setLoadProgress(p)
      if (p < 1) requestAnimationFrame(tick)
      else {
        setPhase("done")
        setTimeout(onComplete, 350)
      }
    }
    requestAnimationFrame(tick)
  }, [phase, onComplete])

  const handleTrigger = useCallback(() => {
    if (triggered.current) return
    triggered.current = true
    setPhase("building")
    setTimeout(() => setPhase("loading"), 1000)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Tab") return
      handleTrigger()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleTrigger])

  const handleSkip = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setPhase("done")
      setTimeout(onComplete, 100)
    },
    [onComplete],
  )

  const isDone = phase === "done"

  return (
    <div
      onClick={phase === "idle" ? handleTrigger : undefined}
      className="fixed inset-0 z-50 select-none"
      style={{
        background: "#0a0a0a",
        cursor: phase === "idle" ? "pointer" : "default",
        opacity: isDone ? 0 : 1,
        transition: "opacity 350ms ease",
        pointerEvents: isDone ? "none" : "auto",
      }}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 5.5, 10], fov: 30, near: 0.1, far: 100 }}
        shadows
        gl={{ antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene trigger={phase !== "idle"} />
      </Canvas>

      {/* Skip */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-30 text-white/10 hover:text-white/30 transition-colors font-mono uppercase text-[10px] tracking-[0.3em] px-3 py-1.5"
      >
        Skip
      </button>

      {/* Bottom hint / loading */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        {phase === "loading" ? (
          <>
            <div style={{ width: 160, height: 2, background: "#1a1a1a" }}>
              <div
                style={{
                  width: `${loadProgress * 100}%`,
                  height: "100%",
                  background: "#e5e5e5",
                  transition: "width 30ms linear",
                }}
              />
            </div>
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/20">
              Loading
            </span>
          </>
        ) : phase === "idle" ? (
          <span
            className="text-[9px] font-mono tracking-[0.3em] uppercase transition-opacity duration-500"
            style={{ color: "rgba(255,255,255,0.15)", opacity: showHint ? 1 : 0 }}
          >
            Click to build
          </span>
        ) : null}
      </div>
    </div>
  )
}
