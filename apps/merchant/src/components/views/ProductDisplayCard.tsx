// components/ProductDisplayCard.tsx
import React from "react"
import Image from "next/image"

type ProductDisplayCardProps = {
  image?: string
  name?: string
  description?: string
  price?: string
  loyaltyPoints?: string
}

const ProductDisplayCard: React.FC<ProductDisplayCardProps> = ({
  image,
  name = "Product Name",
  description = "No description provided.",
  price = "0.00",
  loyaltyPoints = "0",
}) => {
  return (
    <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
      {/* Product Image */}
      <div className="relative h-64 w-full">
        <Image
          src={image || "/images/dummy-image.png"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>

        {/* Price and Loyalty Points */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">${price}</span>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
            {loyaltyPoints} Points
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplayCard
