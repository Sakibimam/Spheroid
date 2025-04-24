import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Webhooks | Spheroid",
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
        <>{children}</>
      </body>
    </html>
  )
}

export default RootLayout
