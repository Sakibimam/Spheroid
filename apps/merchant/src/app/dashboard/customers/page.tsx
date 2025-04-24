"use client"

import React from "react"
import { CountCard } from "@spheroid/ui"

import DropdownNav from "@/components/layout/DropdownNav"

const navItems = [
  { label: "Customers", href: "/dashboard/customers" },
  { label: "Collections", href: "/dashboard/collections" },
]

const Members = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <DropdownNav
        active="Customers"
        navItems={navItems}
      />
      <div className="flex flex-wrap items-center gap-5">
        <CountCard
          label="New Members"
          count={44}
        />
        <CountCard
          label="Total Members"
          count={89}
        />
      </div>
    </div>
  )
}

export default Members
