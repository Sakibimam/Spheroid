"use client"

import React, { useState } from "react"
import Link from "next/link"
import { AiOutlineRobot } from "react-icons/ai"
import { IoAlertCircle } from "react-icons/io5"
import { toast } from "sonner"
import { DynamicSdk } from "@spheroid/dynamic"
import { Button } from "@spheroid/ui"

import Modal from "@/components/Modal"

const HomeView = () => {
  const [receiverAddress, setReceiverAddress] = useState("")
  const [giftModal, setGiftModal] = useState(false)
  const loggedIn = DynamicSdk.useIsLoggedIn()
  const [loyaltyPoint, setLoyaltyPoint] = useState<string>("0")
  const [error, setError] = useState("")

  const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/

  const validateGiftDetails = () => {
    if (!receiverAddress) {
      setError("Please enter a contract address.")
      toast.error("Please enter a contract address.", {
        icon: <IoAlertCircle className="text-lg" />,
      })
      return false
    }

    if (!ethereumAddressRegex.test(receiverAddress)) {
      const errorMessage =
        "Invalid Ethereum contract address format. Must start with '0x' followed by 40 hexadecimal characters."
      setError(errorMessage)
      toast.error(errorMessage, {
        icon: <IoAlertCircle className="text-lg" />,
      })
      return false
    }

    if (!loyaltyPoint || parseInt(loyaltyPoint, 10) <= 0) {
      const errorMessage = "Please enter a valid number of loyalty points."
      setError(errorMessage)
      toast.error(errorMessage, {
        icon: <IoAlertCircle className="text-lg" />,
      })
      return false
    }

    setError("")
    return true
  }

  const handleGift = () => {
    if (validateGiftDetails()) {
      toast.success("Gift details are valid! Proceeding with the transaction...", {
        description: `Sending ${loyaltyPoint} points to ${receiverAddress}`,
      })
      // Add your logic to send the gift
    }
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(event.target.value)
  }

  const handleLoyaltyPointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === "" || /^[0-9]*$/.test(value)) {
      setLoyaltyPoint(value)
    }
  }

  if (loggedIn) {
    return (
      <>
        <Modal
          isOpen={giftModal}
          onClose={() => setGiftModal(false)}
          title="Gift Loyalty Points"
        >
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col items-start gap-2 font-normal text-gray-500">
              <span className="text-base">Send to *</span>
              <input
                type="text"
                value={receiverAddress}
                onChange={handleAddressChange}
                className="flex w-full rounded-lg border border-gray-400 p-2"
                placeholder="0x..."
              />
            </div>
            <div className="flex flex-col items-start gap-2 font-normal text-gray-500">
              <span className="text-base">Loyalty Points *</span>
              <input
                type="text"
                value={loyaltyPoint}
                onChange={handleLoyaltyPointChange}
                className="flex w-full rounded-lg border border-gray-400 p-2"
                placeholder="0"
              />
            </div>
            <Button onClick={() => handleGift()}>Gift</Button>
          </div>
        </Modal>
        <header className="bg-secondary text-primary flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold">Wallet</h1>
          <div className="flex flex-row items-center gap-2 rounded-full bg-black bg-opacity-10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="font-medium">Spheroid</span>
          </div>
        </header>

        <div className="mx-4 mt-4 grid grid-cols-3 rounded-lg bg-white shadow">
          <Link
            href="/history"
            className="center text-secondary h-full grow space-x-2 py-4 text-center transition-transform hover:scale-105"
          >
            <span>History</span>
          </Link>
          <Link
            href="/scanner"
            className="center bg-accent h-full grow space-x-2 rounded-lg bg-black px-4 py-4 text-center text-white transition-transform hover:scale-105 active:scale-95"
          >
            <span>Scan</span>
          </Link>
          <button
            onClick={() => setGiftModal(true)}
            className="center text-secondary h-full grow space-x-2 py-4 text-center transition-transform hover:scale-105"
          >
            <span>Transfer</span>
          </button>
        </div>

        <section className="mx-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-secondary text-lg font-semibold">Recent Activities</h2>
            <button className="text-blue-500 transition-colors hover:text-blue-700">View Collections</button>
          </div>
          <div className="mt-4 flex transform flex-col items-center justify-center rounded-lg bg-gray-100 p-8 transition-all hover:scale-105">
            <div className="mb-4 rounded-full bg-gray-200 p-4">
              <AiOutlineRobot
                size={40}
                className="animate-bounce text-gray-500"
              />
            </div>
            <p className="text-gray-500">No recent claims.</p>
          </div>
        </section>
        <section className="mx-4 mt-6">
          <h2 className="text-secondary text-lg font-semibold">Tokens</h2>
          <div className="mt-4 transform rounded-lg bg-gray-100 p-4 transition-all hover:scale-105">
            <p className="text-gray-500">No tokens available.</p>
          </div>
        </section>
      </>
    )
  }

  return (
    <main className="flex h-screen flex-col">
      <div className="bg-primary-base flex grow items-center justify-center">
        <></>
      </div>
      <div className="flex min-h-[40%] flex-col items-center justify-center bg-white p-8">
        <h2 className="mb-4 text-2xl font-bold">Easy payments online</h2>
        <p className="mb-6 text-center text-lg">Make your payment experience better today. No hidden fees</p>
        <style>{`
        #dynamic-widget {
            width: 100%;
            height: 100%;
        }
      `}</style>
        <div className="mx-auto w-fit whitespace-nowrap">
          <DynamicSdk.DynamicWidget />
        </div>
      </div>
    </main>
  )
}

export default HomeView
