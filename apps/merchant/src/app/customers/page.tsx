"use client"

import React from "react"

import Table, { Column } from "@/components/ui/Table"

type User = {
  id: number
  name: string
  email: string
  age: number
}

const Customers = () => {
  const columns: Column<User>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    {
      key: "age",
      header: "Age",
    },
  ]

  const data: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 28 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 34 },
    { id: 3, name: "Mike Brown", email: "mike@example.com", age: 23 },
  ]
  return (
    <div className="flex w-full flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <Table
        columns={columns}
        data={data}
      />
    </div>
  )
}

export default Customers
