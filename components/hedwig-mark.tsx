/**
 * The Hedwig owl, inline with the text — the small, perched companion to
 * the first-open flyover (see HedwigFlyover).
 */
export function HedwigMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/hedwig-owl.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      data-hedwig-perch=""
      className="inline-block h-[1.25em] w-auto align-[-0.2em] select-none invert dark:invert-0"
    />
  )
}
