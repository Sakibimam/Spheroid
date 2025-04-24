"use client"

import React, { useContext, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { GiHamburgerMenu } from "react-icons/gi"

import { SideMenuContext } from "@/context/SideMenuContext"

import Button from "../ui/Button"

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toggleCollapsed } = useContext(SideMenuContext)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileMenuOpen(false) // Close menu on navigation
  }

  const isActivePath = (path: string) => pathname === path

  return (
    <nav className="relative top-0 z-30 w-full bg-white/80 shadow-md backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <button onClick={toggleCollapsed}>
          <GiHamburgerMenu />
        </button>
        <Link
          href="/"
          className="flex items-center space-x-2"
        >
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="font-bold text-gray-800"></span>
        </Link>
        <div className="hidden items-center space-x-6 md:flex">
          <Button
            onClick={() => (window.location.href = "/demo")}
            type="primary"
          >
            Login
          </Button>
        </div>

        <button
          className="z-50 text-gray-800 md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`fixed right-0 top-0 mt-14 h-fit w-fit transform rounded-md bg-white p-5 shadow-md md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-40 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col items-center justify-center space-y-6 text-lg font-medium text-gray-800">
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
            onClick={() => handleNavigation("/get-started")}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Get Started
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
