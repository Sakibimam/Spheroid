"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ethers, BrowserProvider } from "ethers"
import { BiDotsVertical, BiSolidTorch } from "react-icons/bi"
import { GrClose, GrGallery } from "react-icons/gr"
import { MdQrCode2 } from "react-icons/md"
import Rodal from "rodal"
import { boundingBox, Scanner } from "@yudiel/react-qr-scanner"
import { truncateAddress } from "@/utils/truncateAddress"
import { PROTOCOL_ABI, PROTOCOL_BASE_SEPOLIA } from "@spheroid/configuration"

const ScannerPage = () => {
  const router = useRouter()
  const [data, setData] = useState({
    merchant: {
      name: "Test Merchant",
      address: "0xD65725Bf3b78B70653f8290B7FA3AFf773D62b1e",
      logo: "/api/placeholder/100/100", // Using placeholder image
    },
    products: [
      {
        id: 1,
        name: "Product 1",
        price: 0.5,
        quantity: 1,
        image: "/api/placeholder/80/80",
      },
      {
        id: 2,
        name: "Product 2",
        price: 0.5,
        quantity: 1,
        image: "/api/placeholder/80/80",
      },
    ],
    total: 1, // 1 USDC total
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onCickSend = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask to make payments")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const network = await provider.getNetwork()
      if (network.chainId !== 84532n) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x14a34" }],
        })
      }

      if (!ethers.isAddress(PROTOCOL_BASE_SEPOLIA)) {
        throw new Error("Invalid contract address")
      }

      const contract = new ethers.Contract(PROTOCOL_BASE_SEPOLIA, PROTOCOL_ABI, signer)

      // approving usdc
      // USDC Token Contract ABI (ERC20)
      const ERC20_ABI = ["function approve(address spender, uint256 amount) external returns (bool)"]
      const USDC_ADDRESS = "0xEddDb6B6253dAB7A62b7E4D56B9F597DB4cEF506" // Example USDC token address

      async function approveUSDC(spenderAddress, amount) {
        if (!window.ethereum) {
          alert("Please install MetaMask to continue.")
          return
        }
        try {
          // Connect to wallet and get signer
          const provider = new BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()

          // Initialize contract
          const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer)

          // Convert amount to smallest unit (assuming USDC has 6 decimals)
          const amountInUnits = ethers.parseUnits(amount.toString(), 6) // Convert to 6 decimals

          // Send approval transaction
          const tx = await usdcContract.approve(spenderAddress, amountInUnits)
          console.log("Approval transaction sent:", tx.hash)

          // Wait for transaction confirmation
          const receipt = await tx.wait()
          console.log("Transaction confirmed:", receipt)
          alert("USDC approved successfully!")
        } catch (error) {
          console.error("Error approving USDC:", error)
          alert("Failed to approve USDC. Please try again.")
        }
      }

      // Example usage
      // Approve 100 USDC to a spender address
      approveUSDC("0xaaC3A7B643915d17eAcc3DcFf8e1439fB4B1a3D2", 1)

      // Using hardcoded values as requested
      const merchant = "0xd65725bf3b78b70653f8290b7fa3aff773d62b1e"
      const amount = ethers.parseUnits("1", 6) // 1 USDC
      const servicesAvailed = [1, 2] // Array of 1 and 2 as requested

    //   const gasEstimate = await contract.verifyAndPayMerchant.estimateGas(merchant, amount, servicesAvailed)
    //   const gasLimit = (gasEstimate * BigInt(120)) / BigInt(100)

      const tx = await contract.verifyAndPayMerchant(merchant, amount, servicesAvailed, {
        // gasLimit,
        // maxFeePerGas: ethers.parseUnits("50", "gwei"),
        // maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
      })

      console.log("Transaction sent:", tx.hash)

      const receipt = await Promise.race([
        tx.wait(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Transaction timeout")), 60000)),
      ])

      console.log("Transaction confirmed:", receipt)
      alert("Payment successful!")
      router.replace("/")
    } catch (err) {
      console.error("Transaction error:", err)
      setError(err.message || "Payment failed. Please try again.")

      if (err.code === 4001) {
        setError("Transaction rejected by user")
      } else if (err.code === -32603) {
        setError("Internal Error. Please check if you have sufficient balance")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-0 right-0 top-0 h-20 bg-black/80 backdrop-blur-md">
            <div className="flex items-center justify-between px-6 py-5">
              <button
                onClick={() => {
                  router.replace("/")
                }}
                className="flex items-center gap-1 text-white"
              >
                <GrClose size={20} />
              </button>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-white">
                  <BiSolidTorch size={24} />
                </button>
                <button className="flex items-center gap-1 text-white">
                  <MdQrCode2 size={24} />
                </button>
                <button className="flex items-center gap-1 text-white">
                  <BiDotsVertical size={24} />
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[calc(100%-25rem)] bg-black/80 backdrop-blur-md" />
          <div className="absolute bottom-[calc(100%-25rem)] left-0 top-20 w-[calc(50%-160px)] bg-black/80 backdrop-blur-md" />
          <div className="absolute bottom-[calc(100%-25rem)] right-0 top-20 w-[calc(50%-160px)] bg-black/80 backdrop-blur-md" />
          <div className="glowing-card absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 transform" />

          <button className="center bg-whites-wallet_modal_background absolute left-1/2 right-0 top-[28rem] -translate-x-1/2 gap-1.5 rounded-full px-2.5 py-2 text-sm">
            <GrGallery />
            <span>Upload from Gallery</span>
          </button>
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Scanner
            allowMultiple={true}
            scanDelay={2000}
            paused={true} // Paused since we're using hardcoded data
            onScan={(detectedCodes) => {
              const rawValues = detectedCodes.map((code) => code.rawValue)
              rawValues.forEach((rawValue) => {
                try {
                  const parsedValue = JSON.parse(rawValue)
                  console.log("Parsed value", parsedValue)
                  if (parsedValue && parsedValue.stack === "spheroid") {
                    console.log("Data found", parsedValue)
                    setData(parsedValue)
                  } else {
                    console.log("No matching data found")
                  }
                } catch (error) {
                  console.error("Failed to parse rawValue:", rawValue, error)
                }
              })
            }}
            onError={(error) => {
              console.log(`onError: ${error}`)
            }}
            classNames={{
              container: "relative w-full h-full",
              video: "z-0 w-full h-full object-cover",
            }}
            components={{
              finder: false,
              zoom: true,
              tracker: boundingBox,
            }}
          />
        </div>
      </div>
      <Rodal
        visible
        onClose={() => {}}
        className="fixed inset-0 !z-[65] h-full w-full"
        customStyles={{
          background: "transparent",
        }}
        closeOnEsc
      >
        <div className="fixed inset-0 !z-[65] flex flex-col justify-end rounded-2xl p-0 md:items-center md:justify-center md:p-4">
          <div className="relative !z-[60] flex min-w-[380px] flex-col items-center rounded-t-xl bg-black px-5 py-6">
            <div className="absolute left-1/2 top-2 mb-2 h-1 w-10 -translate-x-1/2 transform rounded-full bg-gray-500" />
            <h2 className="text-texts-1 mb-1 text-lg font-semibold">{`Pay ${truncateAddress(data.merchant.name)}`}</h2>
            <p className="text-texts-6 text-sm">Instant • Secure • Easy</p>

            {error && <div className="mt-4 w-full max-w-md rounded-lg bg-red-100 p-3 text-red-700">{error}</div>}

            <div className="mt-4 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6">
                <div className="flex items-center text-sm font-semibold text-gray-700">
                  <span>Pay to:</span>
                </div>
                <div className="mt-2 flex items-center">
                  {data.merchant.logo && (
                    <img
                      src={data.merchant.logo}
                      alt="Merchant Logo"
                      className="mr-3 h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{data.merchant.name}</h2>
                    <p className="text-sm text-gray-500">{truncateAddress(data.merchant.address)}</p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center text-sm font-semibold text-gray-700">
                  <span>Products:</span>
                </div>
                <div className="mt-2">
                  {data.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b py-3 last:border-b-0"
                    >
                      <div className="flex items-center">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="mr-3 h-8 w-8 rounded-md object-cover"
                          />
                        )}
                        <span className="text-gray-800">{product.name}</span>
                      </div>
                      <div className="text-gray-600">
                        {product.quantity} x ${product.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-gray-900">${data.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onCickSend}
              disabled={loading}
              className="mt-4 w-full max-w-md rounded-lg bg-blue-600 px-6 py-3 text-white disabled:bg-blue-400"
            >
              {loading ? "Processing..." : "Pay"}
            </button>
          </div>
        </div>
      </Rodal>
    </>
  )
}

export default ScannerPage
