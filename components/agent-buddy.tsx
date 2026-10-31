"use client"

import { useEffect, useRef } from "react"

/**
 * The Hedwig agent perched beside the name, as a real 3D character (three.js):
 * a glossy rounded cube skinned with the original artwork, plus capsule eyes. Idle it
 * floats, breathes, blinks and looks toward the cursor. Clicking makes it
 * crouch, hop into a full spin with a happy squint, and land with a squash. It is also the landing
 * spot for the first-open flyover ([data-hedwig-perch]).
 */
export function AgentBuddy() {
  const wrapRef = useRef<HTMLButtonElement>(null)
  const hostRef = useRef<HTMLSpanElement>(null)
  const actRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const host = hostRef.current
    if (!wrap || !host) return
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const THREE = await import("three")
      const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js")
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js")
      if (disposed) return

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      // Skin baked from the original agent artwork (eyes removed; the 3D eyes
      // sit on top), so colors match the flying sprite one-to-one.
      const map = await new THREE.TextureLoader().loadAsync("/hedwig-agent-skin.png")
      if (disposed) return
      map.colorSpace = THREE.SRGBColorSpace

      const scene = new THREE.Scene()
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min((window.devicePixelRatio || 1) * 1.5, 3))
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
      // Soft reflections only: keep the artwork's colors in charge.
      scene.environmentIntensity = 0.3

      const body = new THREE.Mesh(
        new RoundedBoxGeometry(1, 1, 1, 6, 0.22),
        new THREE.MeshPhysicalMaterial({
          // Mostly self-lit by the artwork so its colors stay exact; the lit
          // part and clearcoat add the glassy highlights.
          map,
          color: 0x5a5a5a,
          emissiveMap: map,
          emissive: 0xffffff,
          emissiveIntensity: 0.82,
          roughness: 0.15,
          clearcoat: 1,
          clearcoatRoughness: 0.25,
          iridescence: 0.35,
          iridescenceIOR: 1.35,
        }),
      )

      const eyeMat = new THREE.MeshPhysicalMaterial({ color: 0x07080b, roughness: 0.18, clearcoat: 1 })
      // Proportions measured from the artwork: each eye ~11.5% of the face wide
      // and 20% tall, ±14% from center, slightly above the midline.
      const eyeGeo = new THREE.CapsuleGeometry(0.058, 0.086, 6, 16)
      const eyes = new THREE.Group()
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
      eyeL.position.set(-0.143, 0.06, 0)
      eyeR.position.set(0.137, 0.06, 0)
      eyes.add(eyeL, eyeR)
      eyes.position.z = 0.5

      const agent = new THREE.Group()
      agent.add(body, eyes)
      const rig = new THREE.Group() // squash/stretch + hop live here
      rig.add(agent)
      scene.add(rig)
      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const key = new THREE.DirectionalLight(0xffffff, 1.2)
      key.position.set(-2, 3, 4)
      scene.add(key)

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20)
      camera.position.z = 5.2

      const resize = () => {
        const size = host.clientWidth || 80
        renderer.setSize(size, size, false)
      }
      resize()
      host.appendChild(renderer.domElement)

      const look = { x: 0, y: 0, tx: 0, ty: 0 }
      const onMove = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect()
        look.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 320))
        look.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 320))
      }

      // One-shot actions animate these on top of the idle motion.
      const act = { squashY: 1, hop: 0, spin: 0, squint: 0 }
      let nextBlink = performance.now() + 1500
      let blinkUntil = 0
      let actionTween: { start: number; dur: number; fn: (t: number) => void; done?: () => void } | null = null

      const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
      const run = (dur: number, fn: (t: number) => void, done?: () => void) => {
        actionTween = { start: performance.now(), dur, fn, done }
      }

      const hopSpin = () => {
        run(1100, (t) => {
          if (t < 0.18) act.squashY = 1 - 0.28 * ease(t / 0.18) // crouch
          else if (t < 0.75) {
            const k = (t - 0.18) / 0.57
            act.squashY = 1.12 - 0.12 * k
            act.hop = Math.sin(k * Math.PI) * 0.55
            act.spin = ease(k) * Math.PI * 2
            act.squint = Math.sin(k * Math.PI)
          } else {
            const k = (t - 0.75) / 0.25
            act.hop = 0
            act.squashY = 1 - 0.18 * Math.sin(k * Math.PI) // landing squash
            act.squint = 0
          }
        }, () => {
          act.spin = 0
          blinkUntil = performance.now() + 140
        })
      }

      actRef.current = () => {
        if (reduced || actionTween) return
        hopSpin()
      }

      let raf = 0
      const tick = (now: number) => {
        if (actionTween) {
          const t = Math.min(1, (now - actionTween.start) / actionTween.dur)
          actionTween.fn(t)
          if (t >= 1) {
            const done = actionTween.done
            actionTween = null
            done?.()
          }
        }
        look.x += (look.tx - look.x) * 0.1
        look.y += (look.ty - look.y) * 0.1

        const idle = reduced ? 0 : now / 1000
        const breathe = 1 + Math.sin(idle * 2.2) * 0.02
        rig.position.y = (reduced ? 0 : Math.sin(idle * 1.8) * 0.06) + act.hop
        rig.scale.set((1 / Math.sqrt(act.squashY)) * breathe, act.squashY * breathe, 1 / Math.sqrt(act.squashY))
        agent.rotation.y = look.x * 0.32 + act.spin
        agent.rotation.x = look.y * 0.24
        eyes.position.x = look.x * 0.06
        eyes.position.y = -look.y * 0.05

        if (!reduced && now > nextBlink) {
          blinkUntil = now + 130
          nextBlink = now + 2200 + Math.random() * 3200
        }
        const blink = now < blinkUntil ? 0.12 : 1
        const eyeY = Math.min(blink, 1 - act.squint * 0.75)
        eyeL.scale.y = eyeR.scale.y = eyeY

        if (!reduced) {
          // Slowly orbit the key light so a glint drifts across the glass.
          key.position.set(Math.cos(idle * 0.6) * 3, 2.5 + Math.sin(idle * 0.9), 4)
        }
        renderer.render(scene, camera)
        raf = requestAnimationFrame(tick)
      }

      window.addEventListener("pointermove", onMove)
      window.addEventListener("resize", resize)
      raf = requestAnimationFrame(tick)

      cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("resize", resize)
        renderer.dispose()
        pmrem.dispose()
        map.dispose()
        renderer.domElement.remove()
        actRef.current = null
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <button
      ref={wrapRef}
      type="button"
      onClick={() => actRef.current?.()}
      aria-label="Play with the Hedwig agent"
      data-hedwig-perch=""
      className="agent-buddy"
    >
      <span ref={hostRef} className="agent-buddy__canvas" aria-hidden="true" />
    </button>
  )
}
