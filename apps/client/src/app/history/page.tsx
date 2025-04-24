"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { FaArrowUp } from "react-icons/fa"
import { IoMdArrowRoundBack } from "react-icons/io"

import { truncateAddress } from "@/utils/truncateAddress"

type Transaction = {
  receiver: {
    name: string
    address: string
  }
  amount: number // USDC amount
  dateTime: string // ISO string
}

const History = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null)

  useEffect(() => {
    // Simulating a delayed fetch with empty data
    const fetchTransactions = () => {
      setTimeout(() => {
        setTransactions([])
      }, 1000) // Simulate API response delay
    }

    fetchTransactions()
  }, [])

  if (!transactions) {
    return <div className="p-4 text-center">Loading transactions...</div>
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex flex-row items-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-black bg-opacity-10 p-2"
          >
            <IoMdArrowRoundBack size={16} />
          </Link>
          <h1 className="text-xl font-semibold">Previous Transactions</h1>
        </div>
        <div className="w-full p-4 text-center text-gray-500">No transactions found.</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-4 p-4">
      {/* Header */}
      <div className="flex flex-row items-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-black bg-opacity-10 p-2"
        >
          <IoMdArrowRoundBack size={16} />
        </Link>
        <h1 className="text-xl font-semibold">Previous Transactions</h1>
      </div>

      {/* Transaction List */}
      <div className="flex w-full flex-col gap-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between rounded-lg bg-red-50 p-4 shadow-md"
          >
            {/* Icon */}
            <div className="flex flex-row items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-200 text-red-600">
                <FaArrowUp size={20} />
              </div>

              {/* Transaction Details */}
              <div className="flex flex-col items-start">
                <span className="font-semibold">To:</span>
                <div className="flex flex-row items-center gap-1">
                  <span>{transaction.receiver.name}</span>
                  <span className="truncate text-sm text-gray-500">
                    {truncateAddress(transaction.receiver.address)}
                  </span>
                </div>
              </div>
            </div>
            <span className="justify-self-end">{transaction.amount} USDC</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
