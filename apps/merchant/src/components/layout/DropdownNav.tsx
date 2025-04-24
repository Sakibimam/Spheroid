"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MdOutlineArrowDropDown } from "react-icons/md"

type NavItem = {
  label: string
  href: string
}

type DropdownNavProps = {
  navItems: NavItem[]
  active: string
}

const DropdownNav: React.FC<DropdownNavProps> = ({ navItems, active }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative inline-block">
      <button
        className="flex flex-row items-center gap-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        onClick={toggleDropdown}
      >
        {active} <MdOutlineArrowDropDown />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-48 overflow-hidden rounded bg-white shadow-lg">
          <div
            className={`transform transition-all duration-300 ease-in-out ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 hover:bg-gray-100 ${pathname === item.href ? "font-bold" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownNav
