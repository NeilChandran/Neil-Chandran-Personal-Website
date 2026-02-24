"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, Center } from "@react-three/drei"
import * as THREE from "three"

/* ── 3D Letter that slides in from an offset ─────────────────────── */

function Letter3D({
  char,
  color,
  position,
  rotation,
  startOffset,
  trigger,
  delay,
}: {
  char: string
  color: string
  position: [number, number, number]
  rotation?: [number, number, number]
  startOffset: [number, number, number]
  trigger: boolean
  delay: number
}) {
  const ref = useRef<THREE.Group>(null)
  const progress = useRef(0)
  const started = useRef(false)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current) return

    if (trigger) {
      elapsed.current += delta * 1000
      if (elapsed.current >= delay) {
        started.current = true
      }
    }

    if (started.current && progress.current < 1) {
      // Fast ease-out
      progress.current = Math.min(progress.current + delta * 3.2, 1)
    }

    // Cubic ease-out
    const t = 1 - Math.pow(1 - progress.current, 3)

    ref.current.position.x = position[0] + startOffset[0] * (1 - t)
    ref.current.position.y = position[1] + startOffset[1] * (1 - t)
    ref.current.position.z = position[2] + startOffset[2] * (1 - t)
  })

  return (
    <group
      ref={ref}
      position={[
        position[0] + startOffset[0],
        position[1] + startOffset[1],
        position[2] + startOffset[2],
      ]}
      rotation={rotation ? rotation.map((r) => (r * Math.PI) / 180) as [number, number, number] : [0, 0, 0]}
    >
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={2.2}
        height={0.8}
        bevelEnabled={false}
      >
        {char}
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </Text3D>
    </group>
  )
}

/* ── Subtle camera drift ──────────────────────────────────────────── */

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.15) * 0.12
    camera.position.y = 6 + Math.cos(t * 0.12) * 0.08
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Scene ────────────────────────────────────────────────────────── */

function Scene({ trigger }: { trigger: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} />

      <CameraDrift />

      {/* N - matte white, enters from the left */}
      <Center position={[-1.2, 0, 0]} disableY disableZ>
        <Letter3D
          char="N"
          color="#e0e0e0"
          position={[-1.2, 0, 0]}
          startOffset={[-8, 0, 0]}
          trigger={trigger}
          delay={0}
        />
      </Center>

      {/* C - cyan, enters from the right, slightly rotated and leaning */}
      <Center position={[1.6, -0.25, 0.15]} disableY disableZ>
        <Letter3D
          char="C"
          color="#22d3ee"
          position={[1.6, -0.25, 0.15]}
          rotation={[0, 0, -3]}
          startOffset={[8, 0, 0]}
          trigger={trigger}
          delay={150}
        />
      </Center>

      {/* Ground plane for subtle shadow reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
    </>
  )
}

/* ── Main component ───────────────────────────────────────────────── */

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"idle" | "building" | "loading" | "done">("idle")
  const [loadProgress, setLoadProgress] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 600)
    return () => clearTimeout(t)
  }, [])

  // Loading bar after build
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
    // After letters land, show loading bar
    setTimeout(() => setPhase("loading"), 900)
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
        camera={{ position: [0, 6, 0.1], fov: 32, near: 0.1, far: 100 }}
        gl={{ antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene trigger={phase === "building" || phase === "loading" || phase === "done"} />
      </Canvas>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-30 text-white/10 hover:text-white/30 transition-colors font-mono uppercase text-[10px] tracking-[0.3em] px-3 py-1.5"
      >
        Skip
      </button>

      {/* Bottom hint or loading bar */}
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
