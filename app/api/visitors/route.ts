import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function GET() {
  try {
    const cookieStore = await cookies()
    const hasVisited = cookieStore.get("visitor_counted")

    // Get current count from Redis
    let count = await redis.get<number>("visitor_count")

    if (count === null) {
      count = 0
    }

    // If not visited before, increment count
    if (!hasVisited) {
      count = await redis.incr("visitor_count")
    }

    const response = NextResponse.json({ count })

    // Set cookie to mark this visitor as counted (expires in 1 year)
    if (!hasVisited) {
      response.cookies.set("visitor_counted", "true", {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax",
      })
    }

    return response
  } catch (error) {
    console.error("[v0] Error fetching visitor count:", error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
