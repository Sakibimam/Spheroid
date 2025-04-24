"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { CornerConfetti } from "@spheroid/ts-particles"
import { Button } from "@spheroid/ui"
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
  Viem,
} from "@spheroid/coinbase"
import { BASE_SEPOLIA_CHAIN_ID, environment, PROTOCOL_ABI, PROTOCOL_BASE_SEPOLIA } from "@spheroid/configuration"
import lighthouse from "@lighthouse-web3/sdk"

const Onboarding: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(1)
  const [cid, setCid] = useState<string | null>(null)

  // Step 1: Merchant Information
  const [merchantName, setMerchantName] = useState("Ethglobal")
  const [merchantDescription, setMerchantDescription] = useState("This is a test description")
  const [merchantLocation, setMerchantLocation] = useState("Bangkok, Thailand")
  const [merchantWebsite, setMerchantWebsite] = useState("ethglobal.com")
  const [merchantTwitter, setMerchantTwitter] = useState("ethglobal")
  const [merchantTelegram, setMerchantTelegram] = useState("ethglobal")
  const [merchantDiscord, setMerchantDiscord] = useState("ethglobal")
  const [merchantInstagram, setMerchantInstagram] = useState("ethglobal")
  const [merchantFacebook, setMerchantFacebook] = useState("")
  const [merchantFarcaster, setMerchantFarcaster] = useState("")
  const [merchantLens, setMerchantLens] = useState("")
  const [merchantImage, setMerchantImage] = useState<File | null>(null)
  const [merchantImagePreview, setMerchantImagePreview] = useState<string | null>(null)

  // Step 2: Loyalty Token Details
  const [tokenName, setTokenName] = useState("ETHGLOBAL")
  const [tokenSymbol, setTokenSymbol] = useState("GLB")
  const [tokenImage, setTokenImage] = useState<File | null>(null)
  const [tokenImagePreview, setTokenImagePreview] = useState<string | null>(null)

  // Step 3: Submission State
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle Image Uploads
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0] || null

    if (file && !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (JPG, PNG, GIF).")
      return
    }

    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setImage(file)
    }
  }

  const validateStep1 = () => {
    if (!merchantName.trim()) {
      toast.error("Please enter your business name.")
      return false
    }
    if (!merchantDescription.trim()) {
      toast.error("Please enter a description.")
      return false
    }
    if (!merchantLocation.trim()) {
      toast.error("Please enter your location.")
      return false
    }
    if (!merchantImage) {
      toast.error("Please upload a business image.")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!tokenName.trim()) {
      toast.error("Please enter a token name.")
      return false
    }
    if (!tokenSymbol.trim()) {
      toast.error("Please enter a token symbol.")
      return false
    }
    if (!tokenImage) {
      toast.error("Please upload a token image.")
      return false
    }
    return true
  }

  const handleAccordionClick = (stepNumber: number) => {
    if (activeStep === stepNumber) {
      // If the clicked accordion is already open, close it
      setActiveStep(null)
    } else {
      // Open the clicked accordion
      setActiveStep(stepNumber)
    }
  }

  const handleNext = async () => {
    if (activeStep === 1 && validateStep1()) {
      if (!environment.NEXT_PUBLIC_LIGHTHOUSE_API_KEY) {
        toast.error("There was an error")
        return
      }

      let imageUploadResponse = null
      if (merchantImage) {
        console.log("Uploading merchant image")
        imageUploadResponse = await lighthouse.upload(
          [merchantImage],
          environment.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
          undefined,
          (progressData) => {
            let percentageDone = (100 - (progressData?.progress ?? 0)).toFixed(2)
            console.log("Image upload percentage: ", percentageDone)
          }
        )
        console.log("Merchant image uploaded:", imageUploadResponse?.data.Hash)
      }

      // Register the loyalty token
      const merchantData = {
        name: merchantName,
        description: merchantDescription,
        image: imageUploadResponse?.data.Hash,
        location: merchantLocation,
        website: merchantWebsite,
        social: {
          twitter: merchantTwitter,
          telegram: merchantTelegram,
          discord: merchantDiscord,
          instagram: merchantInstagram,
          facebook: merchantFacebook,
          farcaster: merchantFarcaster,
          lens: merchantLens,
        },
      }

      const responseText = await lighthouse.uploadText(
        JSON.stringify(merchantData),
        environment.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
        `merchant-${merchantName}`
      )

      const cid = responseText.data

      setCid(cid)
      setActiveStep(2)
    } else if (activeStep === 2 && validateStep2()) {
      setActiveStep(3)
    }
  }

  const handleBack = () => {
    if (activeStep !== null) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <div className="absolute inset-0 flex h-screen overflow-hidden bg-white">
      {/* Left Side Content */}
      <div className="flex h-screen flex-1 flex-col justify-center overflow-y-scroll px-8 py-12">
        <div className="mx-auto max-w-lg">
          {/* Header */}
          <h1 className="mb-8 text-3xl font-bold text-gray-800">Welcome to Spheroid Onboarding</h1>
          <p className="mb-12 text-gray-600">
            Let&rsquo;s get you set up with your merchant profile and loyalty token. Complete the steps below to begin.
          </p>

          {/* Steps Accordion */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="rounded-md border border-gray-200">
              <button
                className="w-full px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAccordionClick(1)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-700">1. Business Information</span>
                  {activeStep === 1 ? (
                    <svg
                      className="h-5 w-5 rotate-180 transform text-blue-600 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 transform text-gray-400 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeStep === 1 ? "max-h-[50vh] overflow-y-scroll" : "max-h-0"
                }`}
              >
                <div className="bg-gray-50 px-4 py-6">
                  {/* Step 1 Content */}
                  <form className="space-y-4">
                    {/* Business Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Business Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={merchantName}
                        onChange={(e) => setMerchantName(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Your business name"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={merchantDescription}
                        onChange={(e) => setMerchantDescription(e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Tell us about your business"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={merchantLocation}
                        onChange={(e) => setMerchantLocation(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="e.g., New York, USA"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <input
                        type="text"
                        value={merchantWebsite}
                        onChange={(e) => setMerchantWebsite(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Social Media Links</label>

                      <input
                        type="text"
                        value={merchantTwitter}
                        onChange={(e) => setMerchantTwitter(e.target.value)}
                        className="block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Twitter"
                      />

                      <input
                        type="text"
                        value={merchantTelegram}
                        onChange={(e) => setMerchantTelegram(e.target.value)}
                        className="block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Telegram"
                      />

                      <input
                        type="text"
                        value={merchantDiscord}
                        onChange={(e) => setMerchantDiscord(e.target.value)}
                        className="block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Discord"
                      />

                      <input
                        type="text"
                        value={merchantInstagram}
                        onChange={(e) => setMerchantInstagram(e.target.value)}
                        className="block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Instagram"
                      />

                      <input
                        type="text"
                        value={merchantFacebook}
                        onChange={(e) => setMerchantFacebook(e.target.value)}
                        className="block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Facebook"
                      />

                      <input
                        type="text"
                        value={merchantFarcaster}
                        onChange={(e) => setMerchantFarcaster(e.target.value)}
                        className="block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Farcaster"
                      />

                      <input
                        type="text"
                        value={merchantLens}
                        onChange={(e) => setMerchantLens(e.target.value)}
                        className="block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Lens"
                      />
                    </div>

                    {/* Merchant Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Business Logo/Image <span className="text-red-500">*</span>
                      </label>
                      {merchantImagePreview ? (
                        <div className="mt-2 flex items-center">
                          <img
                            src={merchantImagePreview}
                            alt="Merchant"
                            className="h-20 w-20 rounded-md border border-gray-300 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setMerchantImage(null)
                              setMerchantImagePreview(null)
                            }}
                            className="ml-4 text-sm text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <label
                            htmlFor="merchant-image-upload"
                            className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 p-6 text-center hover:border-blue-500"
                          >
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H20C14.4772 8 10 12.4772 10 18V30C10 35.5228 14.4772 40 20 40H28C33.5228 40 38 35.5228 38 30V18C38 12.4772 33.5228 8 28 8Z"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M22 14L26 18M26 14L22 18"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <span className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                                  Upload an image
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                            <input
                              id="merchant-image-upload"
                              name="merchant-image-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => handleImageChange(e, setMerchantImage, setMerchantImagePreview)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </form>
                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="primary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-md border border-gray-200">
              <button
                className="w-full px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAccordionClick(2)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-700">2. Loyalty Token Details</span>
                  {activeStep === 2 ? (
                    <svg
                      className="h-5 w-5 rotate-180 transform text-blue-600 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 transform text-gray-400 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeStep === 2 ? "max-h-[50vh] overflow-y-scroll" : "max-h-0"
                }`}
              >
                <div className="bg-gray-50 px-4 py-6">
                  {/* Step 2 Content */}
                  <form className="space-y-4">
                    {/* Token Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Token Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Your token name"
                      />
                    </div>

                    {/* Token Symbol */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Token Symbol <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={tokenSymbol}
                        onChange={(e) => setTokenSymbol(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-solid border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="e.g., XYZ"
                      />
                    </div>

                    {/* Token Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Token Logo/Image <span className="text-red-500">*</span>
                      </label>
                      {tokenImagePreview ? (
                        <div className="mt-2 flex items-center">
                          <img
                            src={tokenImagePreview}
                            alt="Token"
                            className="h-20 w-20 rounded-md border border-gray-300 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setTokenImage(null)
                              setTokenImagePreview(null)
                            }}
                            className="ml-4 text-sm text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <label
                            htmlFor="token-image-upload"
                            className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 p-6 text-center hover:border-blue-500"
                          >
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H20C14.4772 8 10 12.4772 10 18V30C10 35.5228 14.4772 40 20 40H28C33.5228 40 38 35.5228 38 30V18C38 12.4772 33.5228 8 28 8Z"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M22 14L26 18M26 14L22 18"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <span className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                                  Upload an image
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                            <input
                              id="token-image-upload"
                              name="token-image-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => handleImageChange(e, setTokenImage, setTokenImagePreview)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </form>
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="secondary"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-md border border-gray-200">
              <button
                className="w-full px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleAccordionClick(3)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-700">3. Review & Submit</span>
                  {activeStep === 3 ? (
                    <svg
                      className="h-5 w-5 rotate-180 transform text-blue-600 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 transform text-gray-400 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeStep === 3 ? "max-h-[50vh] overflow-y-scroll" : "max-h-0"
                }`}
              >
                <div className="bg-gray-50 px-4 py-6">
                  {/* Step 3 Content */}
                  <div className="space-y-6">
                    {/* Merchant Info Summary */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Business Information</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <span className="w-32 font-semibold text-gray-700">Name:</span>
                          <span className="text-gray-600">{merchantName}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-32 font-semibold text-gray-700">Description:</span>
                          <span className="text-gray-600">{merchantDescription}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-32 font-semibold text-gray-700">Location:</span>
                          <span className="text-gray-600">{merchantLocation}</span>
                        </div>
                        {merchantWebsite && (
                          <div className="flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Website:</span>
                            <a
                              href={merchantWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {merchantWebsite}
                            </a>
                          </div>
                        )}
                        {merchantTwitter && (
                          <div className="flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Twitter:</span>
                            <span className="text-gray-600">{merchantTwitter}</span>
                          </div>
                        )}
                        {merchantTelegram && (
                          <div className="flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Telegram:</span>
                            <span className="text-gray-600">{merchantTelegram}</span>
                          </div>
                        )}
                        {merchantDiscord && (
                          <div className="flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Discord:</span>
                            <span className="text-gray-600">{merchantDiscord}</span>
                          </div>
                        )}
                        {merchantInstagram && (
                          <div className="flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Instagram:</span>
                            <span className="text-gray-600">{merchantInstagram}</span>
                          </div>
                        )}
                        {merchantFacebook && (
                          <div className="flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Facebook:</span>
                            <span className="text-gray-600">{merchantFacebook}</span>
                          </div>
                        )}
                        {merchantFarcaster && (
                          <div className="flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Farcaster:</span>
                            <span className="text-gray-600">{merchantFarcaster}</span>
                          </div>
                        )}
                        {merchantLens && (
                          <div className="flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Lens:</span>
                            <span className="text-gray-600">{merchantLens}</span>
                          </div>
                        )}
                        {merchantImagePreview && (
                          <div className="mt-4 flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Image:</span>
                            <img
                              src={merchantImagePreview}
                              alt="Merchant"
                              className="h-16 w-16 rounded-md border border-gray-300 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Token Info Summary */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Loyalty Token Details</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <span className="w-32 font-semibold text-gray-700">Token Name:</span>
                          <span className="text-gray-600">{tokenName}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-32 font-semibold text-gray-700">Token Symbol:</span>
                          <span className="text-gray-600">{tokenSymbol}</span>
                        </div>
                        {tokenImagePreview && (
                          <div className="mt-4 flex items-center">
                            <span className="w-32 font-semibold text-gray-700">Token Image:</span>
                            <img
                              src={tokenImagePreview}
                              alt="Token"
                              className="h-16 w-16 rounded-md border border-gray-300 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="secondary"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    {cid ? (
                      <Transaction
                        onError={(error) => {
                          console.error("Error", error)
                          toast.error("An error occurred. Please try again.")
                        }}
                        onSuccess={(response) => {
                          setIsSubmitting(true)
                          setTimeout(() => {
                            setIsSubmitting(false)
                            toast.success("Profile setup complete!")
                            toast.success("Redirecting to base...")
                            console.log("Redirecting to dashboard")
                            redirect("/dashboard")
                          }, 1000)
                        }}
                        chainId={BASE_SEPOLIA_CHAIN_ID}
                        contracts={[
                          {
                            address: PROTOCOL_BASE_SEPOLIA,
                            abi: PROTOCOL_ABI,
                            functionName: "deployMerchantWithToken",
                            args: [
                              Viem.pad(Viem.stringToHex(merchantName, { size: 32 })),
                              Viem.pad(Viem.stringToHex(cid, { size: 32 })),
                              tokenName,
                              tokenSymbol,
                            ],
                          },
                        ]}
                      >
                        <TransactionButton text="Submit" />
                        <TransactionSponsor />
                        <TransactionStatus>
                          <TransactionStatusLabel />
                          <TransactionStatusAction />
                        </TransactionStatus>
                      </Transaction>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          disabled
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setting Up Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
            <CornerConfetti />
            <div className="flex flex-col items-center">
              <svg
                className="h-12 w-12 animate-spin text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <p className="mt-4 text-xl font-semibold text-gray-700">Setting up your profile...</p>
            </div>
          </div>
          //   <div className="fixed inset-0 z-50 flex items-center justify-center">
          //     {/* Particle Animation */}
          //     <CornerConfetti />
          //     <div className="relative z-10 flex flex-col items-center">
          //       <svg
          //         className="h-12 w-12 animate-spin text-white"
          //         xmlns="http://www.w3.org/2000/svg"
          //         fill="none"
          //         viewBox="0 0 24 24"
          //       >
          //         {/* ... spinner paths */}
          //       </svg>
          //       <p className="mt-4 text-2xl font-semibold text-white">Setting up your profile...</p>
          //     </div>
          //   </div>
        )}
      </div>

      {/* Right Side Content */}
      <div className="relative hidden w-full flex-col items-center justify-center bg-gray-50 px-8 py-12 md:flex md:w-1/2 md:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-blue-100"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-purple-100"></div>
        </div>

        <div className="relative w-full max-w-md text-center">
          <h2 className="mb-8 text-3xl font-semibold text-gray-800">What Our Partners Say</h2>
          {/* Testimonials */}
          <div className="space-y-8">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-lg italic text-gray-700">
                "Spheroid has transformed the way we engage with our customers. The loyalty token system is a
                game-changer!"
              </p>
              <p className="mt-4 text-sm font-medium text-gray-600">— Alex Smith, CEO of Stellar Inc.</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-lg italic text-gray-700">
                "An innovative platform that seamlessly integrates blockchain technology into our business."
              </p>
              <p className="mt-4 text-sm font-medium text-gray-600">— Maria Johnson, Founder of Nova Boutique</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-lg italic text-gray-700">
                "Exceptional support and a fantastic community. Spheroid is leading the way in merchant solutions."
              </p>
              <p className="mt-4 text-sm font-medium text-gray-600">— David Lee, Owner of Quantum Café</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
