import React from "react"
import * as DynamicEthereum from "@dynamic-labs/ethereum"
import * as DynamicSdk from "@dynamic-labs/sdk-react-core"
import * as SendTx from "@dynamic-labs/sdk-react-core"

export const DynamicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DynamicSdk.DynamicContextProvider
      settings={{
        environmentId: process.env.DYNAMIC_PROJECT_ID ?? "40f06f6c-ca4c-4fec-bf8f-3e9cb98df158",
        walletConnectors: [DynamicEthereum.EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicSdk.DynamicContextProvider>
  )
}

export { DynamicEthereum, DynamicSdk, SendTx }
