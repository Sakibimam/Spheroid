"use client"

import React from "react"

type ICoinbase = {}

const CoinbaseContext = React.createContext<ICoinbase>({})

export default CoinbaseContext