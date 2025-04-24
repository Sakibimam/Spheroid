import { NextResponse } from "next/server"
import axios from "axios"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

export const POST = async (request: Request) => {
  const { event, merchant } = await request.json()

  if (!event || !merchant) {
    return NextResponse.json({ error: "Event and merchant are required" }, { status: 400 })
  }

  // Fetch registered webhooks for the event
  const { data: webhooks, error } = await supabase
    .from("webhooks")
    .select("url")
    .eq("event", event)
    .eq("merchant", merchant)

  if (error) {
    return NextResponse.json({ error: "Failed to fetch webhooks" }, { status: 500 })
  }

  if (!webhooks.length) {
    return NextResponse.json({ message: "No webhooks registered for this event." }, { status: 404 })
  }

  // Trigger each webhook
  const results = await Promise.all(
    webhooks.map(async (webhook) => {
      try {
        await axios.get(webhook.url)
        return { url: webhook.url, status: "success" }
      } catch (err) {
        return { url: webhook.url, status: "error", error: err.message }
      }
    })
  )

  return NextResponse.json({ results })
}
