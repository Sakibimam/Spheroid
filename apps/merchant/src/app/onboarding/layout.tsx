"use client"

import React from "react"
import { CoinbaseProvider } from "@spheroid/coinbase"

const Layout = ({ children }: Readonly<IChildren>) => {
  return (
    <CoinbaseProvider>
      <>{children}</>
    </CoinbaseProvider>
  )
}

export default Layout
