"use client"

import { useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Plus, Minus, Trash2, Heart, Truck, Shield, Tag, ArrowRight } from "lucide-react"

interface CartItem {
  id: number
  product_id: number
  product_name: string
  product_image: string
  price: number
  original_price?: number
  quantity: number
  vendor_name: string
  vendor_id: number
  in_stock: boolean
  max_quantity: number
  selected: boolean
}

interface CartProps {
  cartItems?: CartItem[]
}

export default function CustomerCart({ cartItems = [] }: CartProps) {
  // Mock data for demonstration
  const [items, setItems] = useState<CartItem[]>(
    cartItems.length > 0
      ? cartItems
      : [
          {
            id: 1,
            product_id: 1,
            product_name: "Wireless Bluetooth Headphones",
            product_image: "/placeholder.svg?height=120&width=120",
            price: 199.99,
            original_price: 249.99,
            quantity: 1,
            vendor_name: "TechStore",
            vendor_id: 1,
            in_stock: true,
            max_quantity: 5,
            selected: true,
          },
          {
            id: 2,
            product_id: 2,
            product_name: "Smartphone Case",
            product_image: "/placeholder.svg?height=120&width=120",
            price: 29.99,
            quantity: 2,
            vendor_name: "AccessoryHub",
            vendor_id: 2,
            in_stock: true,
            max_quantity: 10,
            selected: true,
          },
          {
            id: 3,
            product_id: 3,
            product_name: "USB-C Cable",
            product_image: "/placeholder.svg?height=120&width=120",
            price: 15.99,
            quantity: 1,
            vendor_name: "TechStore",
            vendor_id: 1,
            in_stock: false,
            max_quantity: 20,
            selected: false,
          },
        ],
  )

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.max_quantity)) } : item,
      ),
    )
  }

  const toggleSelection = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const selectAll = () => {
    const allSelected = items.filter((item) => item.in_stock).every((item) => item.selected)
    setItems(items.map((item) => (item.in_stock ? { ...item, selected: !allSelected } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const moveToWishlist = (id: number) => {
    // Implementation for moving to wishlist
    removeItem(id)
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10")
      setPromoCode("")
    }
  }

  const selectedItems = items.filter((item) => item.selected && item.in_stock)
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = selectedItems.reduce(
    (sum, item) => sum + ((item.original_price || item.price) - item.price) * item.quantity,
    0,
  )
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal - promoDiscount + shipping

  const groupedItems = items.reduce(
    (groups, item) => {
      const vendorId = item.vendor_id
      if (!groups[vendorId]) {
        groups[vendorId] = {
          vendor_name: item.vendor_name,
          items: [],
        }
      }
      groups[vendorId].items.push(item)
      return groups
    },
    {} as Record<number, { vendor_name: string; items: CartItem[] }>,
  )

  if (items.length === 0) {
    return (
      <CustomerLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Button size="lg">Continue Shopping</Button>
          </div>
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">{items.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Select All */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={items.filter((item) => item.in_stock).every((item) => item.selected)}
                      onCheckedChange={selectAll}
                    />
                    <span className="font-medium">Select All Available Items</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {selectedItems.length} of {items.filter((item) => item.in_stock).length} selected
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Grouped by Vendor */}
            {Object.entries(groupedItems).map(([vendorId, group]) => (
              <Card key={vendorId}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {group.vendor_name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg border ${!item.in_stock ? "bg-gray-50 opacity-60" : ""}`}
                    >
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={() => toggleSelection(item.id)}
                        disabled={!item.in_stock}
                      />

                      <img
                        src={item.product_image || "/placeholder.svg"}
                        alt={item.product_name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.product_name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold text-gray-900">${item.price}</span>
                          {item.original_price && item.original_price > item.price && (
                            <>
                              <span className="text-sm text-gray-500 line-through">${item.original_price}</span>
                              <Badge variant="destructive" className="text-xs">
                                Save ${(item.original_price - item.price).toFixed(2)}
                              </Badge>
                            </>
                          )}
                        </div>
                        {!item.in_stock && (
                          <Badge variant="secondary" className="mt-2">
                            Out of Stock
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || !item.in_stock}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                          max={item.max_quantity}
                          disabled={!item.in_stock}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.max_quantity || !item.in_stock}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveToWishlist(item.id)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({selectedItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo ({appliedPromo})</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Shipping
                  </span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-sm text-gray-600">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={applyPromoCode} disabled={!promoCode}>
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <p className="text-sm text-green-600 mt-2">Promo code {appliedPromo} applied successfully!</p>
                )}
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button size="lg" className="w-full" disabled={selectedItems.length === 0}>
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
