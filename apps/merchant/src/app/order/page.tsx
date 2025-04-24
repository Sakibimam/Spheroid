// pages/order.tsx
"use client"

import React, { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@spheroid/ui"
import { useAccount } from "@spheroid/coinbase"
import useReadMerchantRegistryContract from "@/hooks/useReadMerchantRegistryContract"

type Product = {
  id: number
  name: string
  image: string
  price: number
}

const Order: React.FC = () => {
  const { address } = useAccount()
  const [orderItems, setOrderItems] = useState<{ productId: number; quantity: number }[]>([])
  const [qrCode, setQrCode] = useState<string | null>(null)

  const { data: products } = useReadMerchantRegistryContract({
    functionName: "getMerchantServices",
    args: [address],
  })

  const predefinedProducts: Product[] =
    products?.map((product, index) => ({
      id: index,
      name: product.name,
      image: "",
      price: product.mintRatio,
    })) || []

  const addOrderItem = () => {
    setOrderItems([...orderItems, { productId: predefinedProducts[0]?.id ?? 0, quantity: 1 }])
  }

  const handleProductChange = (index: number, productId: number) => {
    const newOrderItems = [...orderItems]
    newOrderItems[index].productId = productId
    setOrderItems(newOrderItems)
  }

  const handleQuantityChange = (index: number, quantity: number) => {
    const newOrderItems = [...orderItems]
    newOrderItems[index].quantity = quantity
    setOrderItems(newOrderItems)
  }

  const removeOrderItem = (index: number) => {
    const newOrderItems = [...orderItems]
    newOrderItems.splice(index, 1)
    setOrderItems(newOrderItems)
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const product = predefinedProducts.find((p) => p.id === item.productId)
      if (product) {
        return total + product.price * item.quantity
      }
      return total
    }, 0)
  }

  const handlePrintBill = () => {
    toast.success("Bill is ready for download!")
    //   const doc = new jsPDF();

    //   doc.setFontSize(18);
    //   doc.text('Order Receipt', 14, 22);
    //   doc.setFontSize(12);
    //   doc.setTextColor(100);

    //   // Prepare the table data
    //   const tableColumn = ['Product', 'Price', 'Quantity', 'Total'];
    //   const tableRows: any[] = [];

    //   orderItems.forEach((item) => {
    //     const product = predefinedProducts.find(
    //       (p) => p.id === item.productId,
    //     );
    //     if (product) {
    //       const itemTotal = product.price * item.quantity;
    //       const rowData = [
    //         product.name,
    //         `$${product.price.toFixed(2)}`,
    //         item.quantity,
    //         `$${itemTotal.toFixed(2)}`,
    //       ];
    //       tableRows.push(rowData);
    //     }
    //   });

    //   // Add table to PDF
    //   autoTable(doc, {
    //     head: [tableColumn],
    //     body: tableRows,
    //     startY: 30,
    //   });

    //   // Add total price
    //   doc.text(
    //     `Total: $${calculateTotal().toFixed(2)}`,
    //     14,
    //     doc.lastAutoTable.finalY + 10,
    //   );

    //   doc.save('order_receipt.pdf');
  }

  const handleGenerateQRcode = () => {
    const orderId = uuidv4()
    const products = orderItems
      .map((item) => {
        const product = predefinedProducts.find((p) => p.id === item.productId)
        return product ? { name: product.name, quantity: item.quantity, price: product.price } : null
      })
      .filter(Boolean)

    if (products.length === 0) {
      toast.error("Please add products to generate QR Code!")
      return
    }

    const qrData = {
      stack: "spheroid",
      orderId: orderId,
      merchant: { name: "Test", logo: "", address },
      total: calculateTotal(),
      products: products,
    }

    toast.success("QR Code generated successfully!")
    const qrValue = JSON.stringify(qrData)
    setQrCode(qrValue)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Create Order</h1>

        <div className="mb-6">
          <Button
            variant="primary"
            onClick={addOrderItem}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Add Product
          </Button>
        </div>

        {orderItems.length === 0 ? (
          <p className="text-gray-600">No products added to the order.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 p-2">Product</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Total</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => {
                const product = predefinedProducts.find((p) => p.id === item.productId)
                if (!product) return null

                const itemTotal = product.price * item.quantity

                return (
                  <tr
                    key={index}
                    className="border-b"
                  >
                    <td className="border border-gray-300 p-2">
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductChange(index, Number(e.target.value))}
                        className="w-full rounded-md border border-gray-300 p-2"
                      >
                        {predefinedProducts.map((product) => (
                          <option
                            key={product.id}
                            value={product.id}
                          >
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 p-2">${product.price.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                        className="w-20 rounded-md border border-gray-300 p-2"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">${itemTotal.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => removeOrderItem(index)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        <div className="mt-6 flex flex-col-reverse md:flex-row md:justify-between">
          {qrCode ? (
            <QRCodeSVG
              value={qrCode}
              size={256}
            />
          ) : (
            <div className="mt-4 w-full md:mt-0 md:w-1/2">
              <div className="flex h-64 w-full items-center justify-center rounded-md bg-red-300 text-white">
                QR Code Placeholder
              </div>
            </div>
          )}
          <div className="w-full text-right md:w-1/2">
            <p className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
            <div className="mt-4 space-x-4">
              <Button
                variant="secondary"
                onClick={handlePrintBill}
                className="rounded-md border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
              >
                Print Bill
              </Button>
              <Button
                onClick={handleGenerateQRcode}
                variant="primary"
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Generate QR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
