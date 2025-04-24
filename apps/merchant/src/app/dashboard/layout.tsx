"use client"

import React from "react"
import { CoinbaseProvider } from "@spheroid/coinbase"

import Navbar from "@/components/layout/Navbar"
import SideMenu from "@/components/layout/SideMenu"
import { SideMenuProvider } from "@/context/SideMenuContext"

const Layout = ({ children }: Readonly<IChildren>) => {
  return (
    <CoinbaseProvider>
      <SideMenuProvider>
        <>
          <Navbar />
          <div className="flex h-full flex-row">
            <SideMenu />
            {children}
          </div>
        </>
      </SideMenuProvider>
    </CoinbaseProvider>
  )
}

export default Layout
