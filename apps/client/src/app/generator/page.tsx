"use client"

import React, { useState } from "react"
import { QRCodeSVG } from "qrcode.react"

const GeneratorPage = () => {
  const [inputData, setInputData] = useState("")
  const [qrValue, setQRValue] = useState("")

  const handleGenerate = () => {
    setQRValue(inputData)
  }

  return (
    <>
      <div className="flex flex-col items-center p-8">
        <h1 className="mb-4 text-2xl font-bold">QR Code Generator</h1>
        <textarea
          placeholder="Enter text, URL, JSON, or any data..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="mb-4 h-24 w-72 rounded border border-gray-300 p-2"
        />
        <button
          onClick={handleGenerate}
          className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white"
        >
          Generate QR Code
        </button>
        {qrValue && (
          <div className="mt-5 text-center">
            <QRCodeSVG
              value={qrValue}
              size={256}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default GeneratorPage
