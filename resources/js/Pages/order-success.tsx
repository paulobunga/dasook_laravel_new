"use client"

import { useEffect, useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, MapPin, Calendar, Download, Share2 } from "lucide-react"

interface OrderDetails {
  order_number: string
  order_date: string
  total_amount: number
  status: string
  estimated_delivery: string
  tracking_number?: string
  items: Array<{
    id: number
    product_name: string
    product_image: string
    price: number
    quantity: number
    vendor_name: string
  }>
  shipping_address: {
    name: string
    address_line_1: string
    address_line_2?: string
    city: string
    state: string
    postal_code: string
  }
  payment_method: {
    type: string
    last_four: string
  }
  delivery_method: "pickup" | "delivery"
  pickup_location?: {
    name: string
    address: string
    phone: string
    pickup_time?: string
  }
}

export default function OrderSuccess() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching order details
    setTimeout(() => {
      setOrderDetails({
        order_number: `ORD-${Date.now()}`,
        order_date: new Date().toLocaleDateString(),
        total_amount: 259.97,
        status: "confirmed",
        estimated_delivery: "December 28, 2024",
        tracking_number: "TRK123456789",
        items: [
          {
            id: 1,
            product_name: "Wireless Bluetooth Headphones",
            product_image: "/placeholder.svg?height=80&width=80",
            price: 199.99,
            quantity: 1,
            vendor_name: "TechStore",
          },
          {
            id: 2,
            product_name: "Smartphone Case",
            product_image: "/placeholder.svg?height=80&width=80",
            price: 29.99,
            quantity: 2,
            vendor_name: "AccessoryHub",
          },
        ],
        shipping_address: {
          name: "John Doe",
          address_line_1: "123 Main Street",
          address_line_2: "Apt 4B",
          city: "New York",
          state: "NY",
          postal_code: "10001",
        },
        payment_method: {
          type: "Visa",
          last_four: "1234",
        },
        delivery_method: "delivery",
        pickup_location: {
          name: "Local Store",
          address: "456 Elm St",
          phone: "555-1234",
          pickup_time: "Ready after 3PM",
        },
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <CustomerLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
      </CustomerLayout>
    )
  }

  if (!orderDetails) {
    return (
      <CustomerLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Order not found</p>
          </div>
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. We'll send you shipping confirmation when your order ships.
          </p>
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order Details</CardTitle>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Order Number</h3>
                <p className="text-gray-600">{orderDetails.order_number}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Order Date</h3>
                <p className="text-gray-600">{orderDetails.order_date}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Total Amount</h3>
                <p className="text-gray-900 font-bold">${orderDetails.total_amount.toFixed(2)}</p>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.product_image || "/placeholder.svg"}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product_name}</h4>
                      <p className="text-sm text-gray-600">by {item.vendor_name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{orderDetails.shipping_address.name}</p>
                <p className="text-gray-600">{orderDetails.shipping_address.address_line_1}</p>
                {orderDetails.shipping_address.address_line_2 && (
                  <p className="text-gray-600">{orderDetails.shipping_address.address_line_2}</p>
                )}
                <p className="text-gray-600">
                  {orderDetails.shipping_address.city}, {orderDetails.shipping_address.state}{" "}
                  {orderDetails.shipping_address.postal_code}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {orderDetails.delivery_method === "pickup" ? (
                  <>
                    <MapPin className="w-5 h-5 mr-2" />
                    Pickup Information
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5 mr-2" />
                    Delivery Information
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderDetails.delivery_method === "pickup" ? (
                <>
                  <div>
                    <p className="text-sm text-gray-600">Pickup Location</p>
                    <p className="font-medium">{orderDetails.pickup_location?.name}</p>
                    <p className="text-sm text-gray-600">{orderDetails.pickup_location?.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pickup Time</p>
                    <p className="font-medium">{orderDetails.pickup_location?.pickup_time || "Ready in 2-4 hours"}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-medium">{orderDetails.estimated_delivery}</p>
                  </div>
                  {orderDetails.tracking_number && (
                    <div>
                      <p className="text-sm text-gray-600">Tracking Number</p>
                      <p className="font-medium">{orderDetails.tracking_number}</p>
                    </div>
                  )}
                </>
              )}
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium">
                  {orderDetails.payment_method.type} ending in {orderDetails.payment_method.last_four}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
          <Button variant="outline" className="flex items-center">
            <Truck className="w-4 h-4 mr-2" />
            Track Order
          </Button>
          <Button variant="outline" className="flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Share Order
          </Button>
          <Button>Continue Shopping</Button>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              What's Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-gray-600">We're preparing your items for shipment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Shipping Confirmation</p>
                  <p className="text-sm text-gray-600">You'll receive an email with tracking information</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-sm text-gray-600">Your order will arrive by {orderDetails.estimated_delivery}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
