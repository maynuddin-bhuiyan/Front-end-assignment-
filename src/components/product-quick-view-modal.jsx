"use client"
import Image from "next/image"
import { useState } from "react"
import { FaX } from "react-icons/fa6"


export default function ProductQuickViewModal({ isOpen, onClose, product }) {
  const [quantity, setQuantity] = useState(1)

  if (!isOpen) return null

  const features = [
    { label: "Memory", value: `${product.memory || "16GB (2 x8GB) DDR5"}` },
    { label: "Bus Speed", value: `${product.busSpeed || "6000MHz"}` },
    { label: "Type", value: `${product.type || "DIMM Type Module"}` },
    { label: "Pin", value: `${product.pin || "288 Pin"}` },
    { label: "CAS Latency", value: `${product.casLatency || "CL38-38-38-78"}` },
    { label: "Features", value: `${product.features || "On-Die Error Checking"}` },
    { label: "Warranty", value: `${product.warranty || "Product Life Time Warranty"}` },
  ]

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    // Reuse the existing add to cart logic
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingProductIndex = existingCart.findIndex((item) => item.slug === product.slug)

    let isExisting = false

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += quantity
      isExisting = true
    } else {
      existingCart.push({
        ...product,
        quantity,
      })
    }

    localStorage.setItem("cart", JSON.stringify(existingCart))

    // Show notification
    import("antd").then(({ notification }) => {
      notification.success({
        message: isExisting ? "Updated product quantity" : "Added to Cart",
        description: isExisting
          ? `${product.title} quantity is now ${existingCart[existingProductIndex].quantity}`
          : `${product.title} was added to your cart`,
        placement: "topRight",
        style: {
          backgroundColor: "#f0fff3",
          border: "1px solid #52c41a",
          borderRadius: "8px",
        },
        icon: <span style={{ color: "#52c41a" }}>✓</span>,
      })
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="relative bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <FaX size={14} />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-secondary p-8 rounded-lg">
            <div className="relative w-full h-[300px]">
              <Image src={product.image || "/placeholder.svg"} alt={product.title} layout="fill" objectFit="contain" />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">{product.title}</h2>

            <div className="space-y-2 mb-4">
              <div className="bg-gray-800 text-white py-2 px-4 rounded-full inline-block">
                Regular Price: ${product.regularPrice || product.price}
              </div>

              {product.specialPrice && (
                <div className="bg-red-500 text-white py-2 px-4 rounded-full inline-block ml-2">
                  Special Price: ${product.specialPrice}
                </div>
              )}

              {product.ecomPrice && (
                <div className="bg-cyan-500 text-white py-2 px-4 rounded-full inline-block ml-2">
                  E-com Price: ${product.ecomPrice}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gray-100 px-3 py-1 rounded-full">
                <span className="font-medium">Brand:</span> {product.brand || "Team"}
              </div>

              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">In-Stock</div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Key Features</h3>
              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="text-sm">
                    {feature.value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center border rounded-md">
                <button onClick={handleDecrement} className="px-3 py-1 border-r hover:bg-gray-100">
                  -
                </button>
                <input type="text" value={quantity} readOnly className="w-12 text-center py-1" />
                <button onClick={handleIncrement} className="px-3 py-1 border-l hover:bg-gray-100">
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
