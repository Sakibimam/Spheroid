import React from "react"
import { Metadata } from "next"
import { Toaster } from "sonner"
import { DynamicProvider } from "@spheroid/dynamic"

import "@spheroid/styles/src/styles/global.css"

export const metadata: Metadata = {
  title: {
    default: "Spheroid",
    template: "%s | Spheroid",
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
      <body className="min-h-screen">
        <Toaster
          position="bottom-right"
          theme="system"
        />
        <DynamicProvider>
          <>{children}</>
        </DynamicProvider>
      </body>
    </html>
  )
}

export default RootLayout
