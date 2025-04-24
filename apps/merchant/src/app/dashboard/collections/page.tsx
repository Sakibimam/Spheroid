"use client"

import React from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { Button, CountCard } from "@spheroid/ui"

import DropdownNav from "@/components/layout/DropdownNav"

const navItems = [
  { label: "Customers", href: "/dashboard/customers" },
  { label: "Collections", href: "/dashboard/collections" },
]

const Collections = () => {
  return (
    <div className="flex w-full flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <DropdownNav
        active="Collections"
        navItems={navItems}
      />
      <div className="flex flex-wrap items-center gap-5">
        <CountCard
          label="Total Collections"
          count={44}
        />
        <CountCard
          label="NFT in all collections"
          count={89}
        />
      </div>
      <div className="flex h-full w-full flex-col gap-5 rounded-md p-6 shadow-lg">
        <h3 className="text-lg font-semibold">Collections per network</h3>
        <div className="flex h-full w-full items-center justify-center">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/collections")}
            className="flex flex-row items-center gap-3"
          >
            <AiOutlinePlus
              style={{ color: "#2563eb" }}
              size={14}
            />
            Create Collection
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Collections
