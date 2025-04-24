"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { CoinbaseProvider, ConnectWallet, Name, useAccount, Wallet } from "@spheroid/coinbase"
import useReadMerchantRegistryContract from "@/hooks/useReadMerchantRegistryContract"
import { toast } from "sonner"

const Home = () => {
  return (
    <CoinbaseProvider>
      <HomeView />
    </CoinbaseProvider>
  )
}

export default Home

const HomeView = () => {
  const { address, isConnected } = useAccount()

  const { data: isRegistered, isFetched } = useReadMerchantRegistryContract({
    functionName: "isMerchantRegistered",
    args: [address],
  })

  console.log("Fetched data:", address, isRegistered)

  useEffect(() => {
    if (isConnected && address && isFetched) {
      if (isRegistered) {
        redirect("/dashboard")
      } else {
        redirect("/onboarding")
      }
    }
  }, [address, isConnected, isRegistered])

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex w-full flex-col items-start justify-center bg-white px-8 py-12 md:w-1/2 md:px-16">
        <img
          src="/logo.svg"
          alt=""
          className="mb-8 h-20"
        />
        <h1 className="mb-6 text-4xl font-extrabold text-gray-800 md:text-5xl">Seamless On Chain Payments</h1>
        <p className="mb-4 text-lg text-gray-600 md:text-xl">
          Welcome to <span className="text-blue-600">Spheroid</span>, your premier on-chain payment protocol and loyalty
          application
        </p>
        <p className="text-base text-gray-600 md:text-lg">
          Experience fast, secure transactions and earn rewards with every payment.
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center bg-gray-50 px-8 py-12 md:w-1/2 md:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-100"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-100"></div>
        </div>

        <div className="relative w-full max-w-md">
          <h2 className="mb-8 text-center text-3xl font-semibold text-gray-800">Get Started with Spheroid</h2>
          <Wallet className="w-full">
            <ConnectWallet className="center mb-4 w-full rounded-md bg-blue-600 px-6 py-3 text-white shadow-md transition duration-300 hover:bg-blue-700">
              <Name className="w-full" />
            </ConnectWallet>
          </Wallet>
          <button
            // onClick={handleRegister}
            className="w-full rounded-md border border-blue-600 bg-white px-6 py-3 text-blue-600 shadow-md transition duration-300 hover:bg-blue-50"
          >
            Register
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <Link
              href={"https://google.com"}
              className="text-blue-600 underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={"https://google.com"}
              className="text-blue-600 underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
