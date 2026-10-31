"use client"

import { useEffect, useRef } from "react"

/** Idle cruise speed, radians per frame. */
const AUTO_SPIN = 0.006
const SIZE = 220
/** Logo's longest side in world units; small inside a roomy canvas so it never clips. */
const LOGO_EXTENT = 1.25

const LIGHT_FACE = 0x000000
const LIGHT_RIM = 0xd4d6da
const DARK_FACE = 0xffffff
const DARK_RIM = 0xd4d6da

/**
 * The Hedwig "H" mark as a real extruded 3D object (WebGL via three.js,
 * symbal.ai style), built from the brand SVG at runtime. Idle: slow
 * horizontal auto-spin with flick momentum. Vertical tilt follows the
 * cursor only and stays where you leave it.
 */
export function Hedwig3D({ className }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const THREE = await import("three")
      const { SVGLoader } = await import("three/examples/jsm/loaders/SVGLoader.js")
      const svgText = await (await fetch("/hedwig-h.svg")).text()
      if (disposed) return

      const svg = new SVGLoader().parse(svgText)
      const shapes = svg.paths.flatMap((p) => SVGLoader.createShapes(p))
      // Thin plate with a softly rounded rim, like a machined badge.
      const geometry = new THREE.ExtrudeGeometry(shapes, {
        depth: 62,
        bevelEnabled: true,
        bevelThickness: 8,
        bevelSize: 6,
        bevelSegments: 4,
        curveSegments: 16,
      })
      geometry.center()

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const cruise = reduced ? 0 : AUTO_SPIN
      const isDark = () => document.documentElement.classList.contains("dark")

      // Faces stay the flat brand color, exactly like the 2D logo. The rim
      // (extrude material index 1) is the same ink, lit, so it reads as the
      // edge of a real object instead of a grey slab.
      const faceMaterial = new THREE.MeshBasicMaterial({ color: isDark() ? DARK_FACE : LIGHT_FACE })
      const rimMaterial = new THREE.MeshStandardMaterial({
        color: isDark() ? DARK_RIM : LIGHT_RIM,
        roughness: 0.35,
        metalness: 0.4,
      })
      const mesh = new THREE.Mesh(geometry, [faceMaterial, rimMaterial])
      // SVG space is y-down; flip and fit to view.
      const bounds = new THREE.Box3().setFromObject(mesh)
      const extent = Math.max(bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y)
      const s = LOGO_EXTENT / extent
      mesh.scale.set(s, -s, s)
      mesh.rotation.x = -0.18
      mesh.rotation.y = 0.42

      const scene = new THREE.Scene()
      scene.add(mesh)
      scene.add(new THREE.AmbientLight(0xffffff, 0.9))
      const key = new THREE.DirectionalLight(0xffffff, 1.8)
      key.position.set(2, 3, 4)
      scene.add(key)
      const fill = new THREE.DirectionalLight(0xffffff, 0.6)
      fill.position.set(-3, -1, 2)
      scene.add(fill)

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20)
      camera.position.z = 4.6

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(SIZE, SIZE)
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"
      box.appendChild(renderer.domElement)

      const st = { v: cruise, dragging: false, lastX: 0, lastY: 0 }
      let raf = 0
      const tick = () => {
        if (!st.dragging) {
          // Flick momentum decays back toward the idle cruise.
          st.v = cruise + (st.v - cruise) * 0.95
          mesh.rotation.y += st.v
        }
        renderer.render(scene, camera)
        raf = requestAnimationFrame(tick)
      }

      const onDown = (e: PointerEvent) => {
        st.dragging = true
        st.v = 0
        st.lastX = e.clientX
        st.lastY = e.clientY
        try {
          box.setPointerCapture(e.pointerId)
        } catch {
          // Synthetic pointers can't be captured; dragging still works.
        }
      }
      const onMove = (e: PointerEvent) => {
        if (!st.dragging) return
        const dx = e.clientX - st.lastX
        const dy = e.clientY - st.lastY
        st.lastX = e.clientX
        st.lastY = e.clientY
        mesh.rotation.y += dx * 0.009
        mesh.rotation.x += dy * 0.007
        st.v = dx * 0.009
      }
      const onUp = (e: PointerEvent) => {
        st.dragging = false
        if (box.hasPointerCapture(e.pointerId)) box.releasePointerCapture(e.pointerId)
      }

      const themeObserver = new MutationObserver(() => {
        faceMaterial.color.setHex(isDark() ? DARK_FACE : LIGHT_FACE)
        rimMaterial.color.setHex(isDark() ? DARK_RIM : LIGHT_RIM)
      })
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

      box.addEventListener("pointerdown", onDown)
      box.addEventListener("pointermove", onMove)
      box.addEventListener("pointerup", onUp)
      box.addEventListener("pointercancel", onUp)
      raf = requestAnimationFrame(tick)

      cleanup = () => {
        cancelAnimationFrame(raf)
        themeObserver.disconnect()
        box.removeEventListener("pointerdown", onDown)
        box.removeEventListener("pointermove", onMove)
        box.removeEventListener("pointerup", onUp)
        box.removeEventListener("pointercancel", onUp)
        renderer.dispose()
        geometry.dispose()
        faceMaterial.dispose()
        rimMaterial.dispose()
        renderer.domElement.remove()
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return <div ref={boxRef} className={`h3d ${className ?? ""}`} aria-hidden="true" />
}
