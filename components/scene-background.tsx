/**
 * Full-viewport scene behind the landing page, switched purely by CSS:
 * - light theme: soft whitish-blue day sky with a pale sun
 * - dark theme: night sky with stars and planets
 * - during the owl flyover (html.hedwig-night): Gotham — skyline, moon, stars
 * Layers crossfade on theme changes (see the .scene rules in globals.css).
 */

/** Deterministic starfield (seeded LCG) as one box-shadow list, in vw/vh. */
function makeStars(count: number, seed: number): string {
  let s = seed
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
  const shadows: string[] = []
  for (let i = 0; i < count; i++) {
    const x = (rnd() * 100).toFixed(1)
    const y = (rnd() * 70).toFixed(1)
    const r = rnd() < 0.16 ? 1.5 : 0.7
    const a = (0.3 + rnd() * 0.55).toFixed(2)
    shadows.push(`${x}vw ${y}vh 0 ${r}px rgba(237, 233, 221, ${a})`)
  }
  return shadows.join(", ")
}

const NIGHT_STARS = makeStars(85, 42)
const GOTHAM_STARS = makeStars(60, 1337)

function Planets() {
  return (
    <>
      {/* Ringed planet */}
      <svg className="scene__planet" style={{ left: "19%", top: "4%", width: 96, opacity: 0.8 }} viewBox="0 0 100 70" aria-hidden="true">
        <circle cx="50" cy="35" r="20" fill="#d8cfae" />
        <ellipse cx="50" cy="35" rx="40" ry="10" fill="none" stroke="#b9ac8a" strokeWidth="3" transform="rotate(-16 50 35)" />
        <ellipse cx="50" cy="35" rx="20" ry="20" fill="rgba(2, 5, 16, 0.25)" transform="translate(6 -4)" clipPath="circle(20px at 44px 39px)" />
      </svg>
      {/* Crescent moon */}
      <svg className="scene__planet" style={{ right: "12%", top: "26%", width: 64, opacity: 0.9 }} viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r="22" fill="#e6e2d4" />
        <circle cx="39" cy="24" r="20" fill="#091425" />
      </svg>
      {/* Distant planets */}
      <svg className="scene__planet" style={{ left: "34%", top: "7%", width: 14, opacity: 0.75 }} viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="4" fill="#c87f5a" />
      </svg>
      <svg className="scene__planet" style={{ right: "30%", top: "44%", width: 10, opacity: 0.6 }} viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="4" fill="#8fb6d8" />
      </svg>
    </>
  )
}

function GothamSkyline() {
  // Building silhouettes with a handful of lit windows, Batman-style low moon.
  const buildings = [
    [0, 140, 70, 160], [80, 90, 55, 210], [145, 170, 60, 130], [215, 60, 70, 240],
    [295, 130, 50, 170], [355, 180, 80, 120], [445, 40, 65, 260], [520, 120, 55, 180],
    [585, 160, 70, 140], [665, 70, 60, 230], [735, 140, 75, 160], [820, 100, 55, 200],
    [885, 170, 65, 130], [960, 55, 70, 245], [1040, 130, 60, 170], [1110, 90, 90, 210],
  ]
  const windows = [
    [92, 110], [104, 128], [116, 110], [230, 84], [244, 102], [258, 84], [230, 130],
    [458, 64], [472, 82], [486, 64], [458, 110], [486, 128], [678, 94], [692, 112],
    [832, 122], [846, 140], [972, 80], [986, 98], [1000, 80], [972, 126], [1124, 112],
    [1140, 130], [1156, 112], [310, 150], [532, 142], [600, 180], [748, 160], [1052, 150],
  ]
  return (
    <svg className="scene__skyline" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
      {buildings.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#04070d" />
      ))}
      <rect x="245" y="22" width="6" height="40" fill="#04070d" />
      <rect x="474" y="6" width="5" height="36" fill="#04070d" />
      <rect x="990" y="20" width="5" height="37" fill="#04070d" />
      {windows.map(([x, y], i) => (
        <rect key={`w${i}`} x={x} y={y} width="5" height="7" fill="rgba(244, 227, 165, 0.75)" />
      ))}
      {/* Easter egg: the Dark Knight keeps watch from the tallest tower. */}
      <g transform="translate(972 28.6) scale(1.1)">
        <path
          d="M9 0 L10.5 3.2 L13.5 3.2 L15 0 L15.8 3.8 C18 4.6 19.5 6.2 19.8 8.2 C22 12 23.5 17.5 24 24 L0 24 C0.5 17.5 2 12 4.2 8.2 C4.5 6.2 6 4.6 8.2 3.8 Z"
          fill="#04070d"
        />
      </g>
    </svg>
  )
}

function DayMountains() {
  // Hazy layered ranges with one prominent snow-capped peak.
  return (
    <svg className="scene__mountains" viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true">
      <polygon
        points="0,150 120,90 240,140 380,70 520,130 660,95 800,140 950,85 1080,130 1200,100 1200,240 0,240"
        fill="#cadded"
      />
      <polygon
        points="0,180 150,120 300,170 460,105 620,165 780,125 920,170 1060,135 1200,160 1200,240 0,240"
        fill="#aec8e0"
      />
      <polygon points="520,210 615,92 710,210" fill="#7497bd" />
      <polygon points="589,125 615,92 641,125 628,138 615,127 602,138" fill="#f2f7fb" />
      <polygon
        points="0,210 180,162 360,202 560,155 760,198 940,168 1200,192 1200,240 0,240"
        fill="#93b3d2"
      />
    </svg>
  )
}

export function SceneBackground() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene__layer scene__layer--day">
        <DayMountains />
      </div>
      <div className="scene__layer scene__layer--night">
        <div className="scene__stars" style={{ boxShadow: NIGHT_STARS }} />
        <Planets />
      </div>
      <div className="scene__layer scene__layer--gotham">
        <div className="scene__stars" style={{ boxShadow: GOTHAM_STARS }} />
        <GothamSkyline />
      </div>
    </div>
  )
}
