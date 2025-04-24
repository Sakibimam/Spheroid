"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAccount } from "@spheroid/coinbase"

type Webhook = {
  id: number
  event: string
  url: string
}

const events = ["order-created", "order-qr-generated", "qr-code-scanned", "payment-initialized", "payment-completed"]

const WebhookPage = () => {
  const router = useRouter()
  const { address } = useAccount()

  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [newWebhook, setNewWebhook] = useState({ event: "", url: "" })
  const [loading, setLoading] = useState(false)

  const fetchWebhooks = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:3000/manage?merchant=${address}`)
      setWebhooks(res.data.merchant || [])
    } catch (err) {
      console.error("Failed to fetch webhooks:", err)
    } finally {
      setLoading(false)
    }
  }

  const addWebhook = async () => {
    if (!newWebhook.event || !newWebhook.url) {
      alert("Event and URL are required.")
      return
    }
    try {
      await axios.post("http://localhost:3000/manage", {
        action: "add",
        merchant: address,
        event: newWebhook.event,
        url: newWebhook.url,
      })
      setNewWebhook({ event: "", url: "" })
      fetchWebhooks()
    } catch (err) {
      console.error("Failed to add webhook:", err)
    }
  }

  const deleteWebhook = async (event: string, url: string) => {
    try {
      await axios.post("http://localhost:3000/manage", {
        action: "delete",
        merchant: address,
        event,
        url,
      })
      fetchWebhooks()
    } catch (err) {
      console.error("Failed to delete webhook:", err)
    }
  }

  const testWebhook = async (url: string) => {
    try {
      await axios.get(url)
      alert("Test successful!")
    } catch {
      alert("Test failed. Please check the endpoint.")
    }
  }

  useEffect(() => {
    if (address) fetchWebhooks()
  }, [address])

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
      <main className="mx-auto mt-10 max-w-5xl">
        {/* Loading Indicator */}
        {loading && <p className="text-center text-gray-500">Loading webhooks...</p>}

        {/* Webhook List */}
        {!loading && (
          <div className="mt-6 space-y-6">
            {webhooks.length > 0 ? (
              webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      <span className="font-bold text-indigo-600">Event:</span> {webhook.event}
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      <span className="font-bold text-indigo-600">URL:</span> {webhook.url}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => testWebhook(webhook.url)}
                      className="rounded-lg bg-indigo-500 px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-indigo-400"
                    >
                      Test
                    </button>
                    <button
                      onClick={() => deleteWebhook(webhook.event, webhook.url)}
                      className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No webhooks found.</p>
            )}
          </div>
        )}

        {/* Add New Webhook */}
        <div className="mt-10 rounded-lg border bg-white p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">Add New Webhook</h3>
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event:</label>
              <select
                value={newWebhook.event}
                onChange={(e) => setNewWebhook({ ...newWebhook, event: e.target.value })}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Event</option>
                {events.map((event) => (
                  <option
                    key={event}
                    value={event}
                  >
                    {event}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">API URL:</label>
              <input
                type="text"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                placeholder="Enter API URL"
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={addWebhook}
              className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-md hover:bg-indigo-500"
            >
              Add Webhook
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WebhookPage
