import { cookies } from "next/headers"

// In-memory store (resets on deployment, but works for demo)
// For production, use a database like Vercel KV, Supabase, or Neon
let visitorCount = 0

export async function GET() {
  const cookieStore = await cookies()
  const hasVisited = cookieStore.get("visited")

  // Increment only if this is a new visitor (no cookie set)
  if (!hasVisited) {
    visitorCount++
  }

  return Response.json({ count: visitorCount })
}

export async function POST() {
  const cookieStore = await cookies()

  // Mark this visitor as counted
  cookieStore.set("visited", "true", {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    sameSite: "strict",
  })

  visitorCount++

  return Response.json({ count: visitorCount })
}
