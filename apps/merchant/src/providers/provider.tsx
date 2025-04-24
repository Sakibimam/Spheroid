"use client"

import React from "react"

import { TanstackProvider } from "./tanstack"

const providerMap: Record<string, (children: React.ReactNode) => React.JSX.Element> = {
  // server: (children: React.ReactNode) => <ServerProvider>{children}</ServerProvider>,
}

type ProvidersProps = {
  children: React.ReactNode
  features: Array<keyof typeof providerMap>
}

const Providers: React.FC<ProvidersProps> = ({ children, features }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const wrapWithProviders = (content: React.ReactNode) => {
    return features.reduceRight((acc, feature) => {
      const Provider = providerMap[feature]
      return Provider ? Provider(acc) : acc
    }, content)
  }

  if (!mounted) {
    return <></>
  }

  return (
    <TanstackProvider>
      <>{wrapWithProviders(children)}</>
    </TanstackProvider>
  )
}

export default Providers
