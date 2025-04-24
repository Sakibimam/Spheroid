"use client"

import React from "react"
import { ChevronDown } from "lucide-react"

type AccordionItemProps = {
  title: string
  children: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
}

type AccordionProps = {
  items: {
    title: string
    content: React.ReactNode
  }[]
  allowMultiple?: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen = false, onToggle }) => {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | undefined>(isOpen ? undefined : 0)

  React.useEffect(() => {
    if (!contentRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (!isOpen) {
          setHeight(0)
        } else {
          setHeight(entry.contentRect.height)
        }
      }
    })

    resizeObserver.observe(contentRef.current)
    return () => resizeObserver.disconnect()
  }, [isOpen])

  return (
    <div className="w-[350px] border-b border-gray-200 md:w-[450px]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-4 text-left"
      >
        <span className="text-sm font-medium text-gray-900">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
        style={{ height: height ? `${height}px` : "0px" }}
      >
        <div
          ref={contentRef}
          className="px-4 pb-4 pt-0"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const Accordion = ({ items, allowMultiple = false }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<number[]>([])

  const handleToggle = (index: number) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      }
      return prev.includes(index) ? [] : [index]
    })
  }

  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openItems.includes(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

export default Accordion
