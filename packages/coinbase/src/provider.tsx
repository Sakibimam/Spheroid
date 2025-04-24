"use client"

import React, { useState } from "react"
import { baseSepolia } from "viem/chains"
import { WagmiProvider } from "wagmi"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { getConfig } from "./wagmi"

// export * from "@coinbase/onchainkit"
export * as Viem from "viem"
export * from "@coinbase/onchainkit/api"
export * from "@coinbase/onchainkit/transaction"
export * from "@coinbase/onchainkit/core"
export * from "@coinbase/onchainkit/identity"
export * from "@coinbase/onchainkit/wallet"
export * from "wagmi"

export const CoinbaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  if (!config) {
    return <></>
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey="5XWSQ9a9m1RWedWAMXwinIMEafSJWOZO"
          chain={baseSepolia}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
