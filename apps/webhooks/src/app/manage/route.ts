import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get("merchant")
  const event = searchParams.get("event")

  if (address) {
    // Fetch a single merchant by ID
    const { data, error } = await supabase.from("webhooks").select("*").eq("merchant", address)

    if (error) {
      return NextResponse.json({ error: "Failed to fetch merchant hooks" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } else if (event) {
    // Fetch all hooks for a specific event
    const { data, error } = await supabase.from("webhooks").select("*").eq("event", event)

    if (error) {
      return NextResponse.json({ error: "Failed to fetch event hooks" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } else {
    // Fetch all hooks
    const { data, error } = await supabase.from("webhooks").select("*")

    if (error) {
      return NextResponse.json({ error: "Failed to fetch merchants" }, { status: 500 })
    }

    return NextResponse.json({ data })
  }
}

export async function POST(request: Request) {
  const { action, merchant, event, url } = await request.json()

  if (!merchant) {
    return NextResponse.json({ error: "Merchant is required" }, { status: 400 })
  }

  if (action === "add") {
    if (!event || !url) {
      return NextResponse.json({ error: "Event and URL are required" }, { status: 400 })
    }

    // Insert new webhook
    const { error } = await supabase.from("webhooks").insert({ merchant, event, url })

    if (error) {
      console.error(error)
      return NextResponse.json({ error: "Failed to add webhook" }, { status: 500 })
    }

    return NextResponse.json({ message: "Webhook added successfully" })
  }

  if (action === "delete") {
    if (!event || !url) {
      return NextResponse.json({ error: "Event and URL are required for deletion" }, { status: 400 })
    }

    // Delete webhook
    const { error } = await supabase
      .from("webhooks")
      .delete()
      .eq("merchant", merchant)
      .eq("event", event)
      .eq("url", url)

    if (error) {
      return NextResponse.json({ error: "Failed to delete webhook" }, { status: 500 })
    }

    return NextResponse.json({ message: "Webhook deleted successfully" })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
