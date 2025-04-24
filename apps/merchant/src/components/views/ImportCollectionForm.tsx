// components/ImportCollectionsForm.tsx
"use client"

import React, { useState } from "react"
import { IoAlertCircle } from "react-icons/io5"
import { toast } from "sonner"
import { Button } from "@spheroid/ui"

const ImportCollectionsForm = () => {
  const [contractAddress, setContractAddress] = useState("")
  const [error, setError] = useState("")

  // Ethereum address regex pattern
  const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/

  const validateContract = () => {
    if (!contractAddress) {
      setError("Please enter a contract address")
      toast.error("Please enter a contract address", {
        icon: <IoAlertCircle className="text-lg" />,
      })
      return
    }

    if (!ethereumAddressRegex.test(contractAddress)) {
      const errorMessage =
        "Invalid Ethereum contract address format. Must start with '0x' followed by 40 hexadecimal characters"
      setError(errorMessage)
      toast.error(errorMessage, {
        icon: <IoAlertCircle className="text-lg" />,
      })
      return
    }

    setError("")
    toast.success("Contract address is valid!", {
      description: "Proceeding with validation...",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col gap-0">
          <span className="text-sm text-gray-700">Default Network</span>
          <div className="flex w-[300px] rounded-lg border border-gray-400 px-4 py-2">Base</div>
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-sm text-gray-700">Enter Contract Address</span>
          <input
            type="text"
            placeholder="0x..."
            value={contractAddress}
            onChange={(e) => {
              setContractAddress(e.target.value)
              setError("")
            }}
            className="flex w-[400px] rounded-lg border border-gray-400 p-2"
          />
        </div>
        <Button
          onClick={validateContract}
          variant="primary"
          className="mx-4 self-end py-3"
        >
          Validate
        </Button>
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-500">
          <IoAlertCircle className="text-lg" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default ImportCollectionsForm
