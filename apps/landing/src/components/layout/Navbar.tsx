"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@spheroid/ui"

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileMenuOpen(false) // Close menu on navigation
  }

  const isActivePath = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 z-30 w-full bg-white/80 shadow-md backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link
          href="/"
          className="flex items-center space-x-2"
        >
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={24}
            height={24}
            className="rounded-lg"
          />
          <span className="text-lg font-bold text-gray-800 md:text-2xl">Spheroid</span>
        </Link>
        <div className="hidden items-center space-x-6 md:flex">
          <Link
            href="/product"
            className={`transition-colors ${
              isActivePath("/product") ? "font-medium text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Product
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${
              isActivePath("/about") ? "font-medium text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            About Us
          </Link>

          <Button
            onClick={() => (window.location.href = "/demo")}
            variant={"primary"}
            className="rounded-md bg-black px-3 py-2 text-white"
          >
            Merchant
          </Button>
          <Button
            onClick={() => (window.location.href = "/demo")}
            variant={"outline"}
            className="rounded-md border-2 border-black bg-white px-4 py-2 text-black"
          >
            User
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="z-50 text-gray-800 md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Slider */}
      <div
        className={`fixed right-0 top-0 mt-14 h-fit w-fit transform rounded-md bg-white p-5 shadow-md md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-40 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center space-y-6 text-lg font-medium text-gray-800">
          <Link
            href="/product"
            onClick={() => handleNavigation("/product")}
            className={`transition-colors ${isActivePath("/product") ? "text-blue-600" : "hover:text-gray-700"}`}
          >
            Product
          </Link>
          <Link
            href="/about"
            onClick={() => handleNavigation("/about")}
            className={`transition-colors ${isActivePath("/about") ? "text-blue-600" : "hover:text-gray-700"}`}
          >
            About Us
          </Link>
          <button
            onClick={() => (window.location.href = "/demo")}
            className="w-full rounded-md bg-black px-2 py-1 text-white"
          >
            Merchant
          </button>
          <button
            onClick={() => (window.location.href = "/demo")}
            className="w-full rounded-md border-2 border-black bg-white text-black"
          >
            User
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
