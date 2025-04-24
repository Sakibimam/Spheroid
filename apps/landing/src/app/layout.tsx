import React from "react"
import { Metadata } from "next"

import Footer from "@/components/layout/Footer"

import Navbar from "@/components/layout/Navbar"

import "@spheroid/styles/src/styles/global.css"

export const metadata: Metadata = {
  title: {
    absolute: "Home | Spheroid",
  },
  description: "",
  verification: {
    me: "",
    google: "",
    yahoo: "",
  },
}

const RootLayout = ({ children }: Readonly<IChildren>) => {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <Navbar />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
