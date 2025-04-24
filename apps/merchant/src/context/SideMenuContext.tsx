"use client"

import { createContext, PropsWithChildren, useState } from "react"

type SideMenuContextValue = {
  collapsed: boolean
  toggleCollapsed: () => void
}

export const SideMenuContext = createContext<SideMenuContextValue>({
  collapsed: false,
  toggleCollapsed: () => {},
})

export const SideMenuProvider = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed)
  }

  // eslint-disable-next-line react/react-in-jsx-scope
  return <SideMenuContext.Provider value={{ collapsed, toggleCollapsed }}>{children}</SideMenuContext.Provider>
}
