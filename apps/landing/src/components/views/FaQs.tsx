"use client"

import React from "react"
import Accordion from "../ui/Accordion"
import { faq } from "@/constant"

const FaQs = () => {
  return (
    <div className="my-8 flex w-full flex-col items-center gap-5">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      <Accordion items={faq} />
    </div>
  )
}

export default FaQs
