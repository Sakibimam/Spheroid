"use client"
import Image from "next/image"
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi"
import { SupportChat } from "@pushprotocol/uiweb"
import { ethers } from "ethers"
import { useState, useEffect } from "react"

export default function Home() {
  const [status, setStatus] = useState("")
  const [notifications, setNotifications] = useState([])
  const [inboxNotifications, setInboxNotifications] = useState([])
  const [signer, setSigner] = useState(null)
  const channelAddress = process.env.NEXT_PUBLIC_CHANNEL_ADDRESS

  const initializePushUser = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/2QvY7pMMCwBjGKUF96Km0QsRN8g")

      let privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY
      if (!privateKey) {
        throw new Error("Private key not found")
      }

      if (!privateKey.startsWith("0x")) {
        privateKey = `0x${privateKey}`
      }

      const signer = new ethers.Wallet(privateKey, provider)
      setSigner(signer) // Store signer for chat component

      const userAlice = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.STAGING,
      })

      return userAlice
    } catch (error) {
      console.error("Error initializing user:", error)
      throw error
    }
  }

  const fetchNotifications = async () => {
    try {
      const userAlice = await initializePushUser()

      const inbox = await userAlice.notification.list("INBOX")
      setInboxNotifications(inbox)

      if (channelAddress) {
        const channelNotifs = await userAlice.channel.notifications(channelAddress)
        setNotifications(channelNotifs)
      }

      setStatus("Notifications fetched successfully!")
    } catch (error) {
      console.error("Error fetching notifications:", error)
      setStatus(`Error: ${error.message}`)
    }
  }

  const sendNotification = async () => {
    try {
      const userAlice = await initializePushUser()

      const apiResponse = await userAlice.channel.send(["*"], {
        notification: {
          title: "pay done",
          body: "lmao",
        },
      })

      setStatus("Notification sent successfully!")
      console.log("Notification sent:", apiResponse)

      await fetchNotifications()
    } catch (error) {
      console.error("Error sending notification:", error)
      setStatus(`Error: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <div className="relative min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="grid grid-rows-[auto_1fr] gap-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Push Notification Demo</h1>
          <button
            onClick={sendNotification}
            className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Send Notification
          </button>
          <button
            onClick={fetchNotifications}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Refresh Notifications
          </button>
          {status && <p className={`mt-4 ${status.includes("Error") ? "text-red-500" : "text-green-500"}`}>{status}</p>}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Inbox Notifications */}
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-semibold">Inbox Notifications</h2>
            <div className="space-y-4">
              {inboxNotifications.length > 0 ? (
                inboxNotifications.map((notif, index) => (
                  <div
                    key={index}
                    className="rounded border p-3"
                  >
                    <h3 className="font-semibold">{notif.title}</h3>
                    <p className="text-gray-600">{notif.message}</p>
                    <p className="mt-2 text-sm text-gray-400">{new Date(notif.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No inbox notifications</p>
              )}
            </div>
          </div>

          {/* Channel Notifications */}
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-semibold">Channel Notifications</h2>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <div
                    key={index}
                    className="rounded border p-3"
                  >
                    <h3 className="font-semibold">{notif.title}</h3>
                    <p className="text-gray-600">{notif.message}</p>
                    <p className="mt-2 text-sm text-gray-400">{new Date(notif.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No channel notifications</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {signer && (
        <div className="fixed bottom-4 right-4 z-50">
          <SupportChat
            supportAddress="0x44c4A3061c84ea28Ff4EbeA0Dad7c876493AA7b5"
            signer={signer}
            env="staging"
          />
        </div>
      )}
    </div>
  )
}
