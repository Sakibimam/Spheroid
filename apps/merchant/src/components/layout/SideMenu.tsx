"use client"

import React, { useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiOutlineDashboard } from "react-icons/ai"
import { BiSolidCollection } from "react-icons/bi"
import { FaUsers } from "react-icons/fa"
import { MdOutlineWebhook } from "react-icons/md"

import { SideMenuContext } from "@/context/SideMenuContext"

const SideMenu: React.FC = () => {
  const { collapsed } = useContext(SideMenuContext)
  const pathname = usePathname()

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <AiOutlineDashboard size={24} />,
    },
    {
      name: "Members",
      href: "/members",
      icon: <FaUsers size={24} />,
    },
    {
      name: "Collections",
      href: "/collections",
      icon: <BiSolidCollection size={24} />,
    },
    {
      name: "Webhooks",
      href: "/dashboard/webhooks",
      icon: <MdOutlineWebhook size={24} />,
    },
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <div
      className={`h-screen bg-white text-black shadow-lg ${
        collapsed ? "w-20" : "w-64"
      } transition-width flex flex-col duration-300 ease-in-out`}
    >
      {/* Navigation Items */}
      <nav className="flex-1 space-y-2 px-2 py-4">
        {navigationItems.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className={`group flex items-center rounded-md px-3 py-3 text-base font-medium ${
              isActive(item.href) ? "bg-blue-200 text-black" : "text-gray-700 hover:bg-gray-200 hover:text-black"
            }`}
          >
            <div className="h-6 w-6 flex-shrink-0 text-gray-500 group-hover:text-black">{item.icon}</div>
            {!collapsed && <span className="ml-4">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default SideMenu
