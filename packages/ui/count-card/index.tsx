// components/CountCard.tsx
import React from "react"
import { IoAlertCircleOutline } from "react-icons/io5"

type CountCardProps = {
  label: string
  count: number | string
}

const CountCard: React.FC<CountCardProps> = ({ label, count }) => {
  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between gap-1.5">
        <h2 className="text-lg font-medium text-gray-700">{label}</h2>
        <IoAlertCircleOutline className="ml-2.5 h-2.5 w-2.5 text-gray-400" />
      </div>
      <div className="mt-4 text-3xl font-semibold text-gray-900">{count}</div>
    </div>
  )
}

export default CountCard
