"use client"

import React, { useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { FiBell, FiSettings } from "react-icons/fi"

import { SideMenuContext } from "@/context/SideMenuContext"

const Navbar: React.FC = () => {
  const { toggleCollapsed } = useContext(SideMenuContext)

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleCollapsed}
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {/* You can use any icon here */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo and App Name */}
            <Link
              href="/dashboard"
              className="flex items-center"
            >
              <Image
                src="/logo.svg"
                alt="Spheroid Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">Spheroid</span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Icons */}
            <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FiBell className="h-6 w-6" />
            </button>

            {/* Settings Icon */}
            <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FiSettings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
