"use client"

import { useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Package, Search, Eye, Truck, Star, MessageCircle, Download } from "lucide-react"

interface OrderItem {
  id: number
  product_name: string
  product_image: string
  quantity: number
  price: number
  vendor_name: string
}

interface Order {
  id: number
  order_number: string
  status: "pending" | "confirmed" | "processing" | "dispatched" | "delivered" | "cancelled"
  total_amount: number
  created_at: string
  delivery_date?: string
  tracking_number?: string
  items: OrderItem[]
  shipping_address: string
  payment_method: string
}

interface OrdersProps {
  orders?: Order[]
}

export default function CustomerOrders({ orders = [] }: OrdersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Mock data for demonstration
  const mockOrders: Order[] = [
    {
      id: 1,
      order_number: "ORD-2024-001",
      status: "delivered",
      total_amount: 299.99,
      created_at: "2024-01-15",
      delivery_date: "2024-01-18",
      tracking_number: "TRK123456789",
      shipping_address: "123 Main St, City, State 12345",
      payment_method: "Credit Card",
      items: [
        {
          id: 1,
          product_name: "Wireless Headphones",
          product_image: "/placeholder.svg?height=80&width=80",
          quantity: 1,
          price: 199.99,
          vendor_name: "TechStore",
        },
        {
          id: 2,
          product_name: "Phone Case",
          product_image: "/placeholder.svg?height=80&width=80",
          quantity: 2,
          price: 50.0,
          vendor_name: "AccessoryHub",
        },
      ],
    },
    {
      id: 2,
      order_number: "ORD-2024-002",
      status: "processing",
      total_amount: 149.99,
      created_at: "2024-01-20",
      tracking_number: "TRK987654321",
      shipping_address: "123 Main St, City, State 12345",
      payment_method: "PayPal",
      items: [
        {
          id: 3,
          product_name: "Bluetooth Speaker",
          product_image: "/placeholder.svg?height=80&width=80",
          quantity: 1,
          price: 149.99,
          vendor_name: "AudioWorld",
        },
      ],
    },
  ]

  const displayOrders = orders.length > 0 ? orders : mockOrders

  const filteredOrders = displayOrders.filter(
    (order) =>
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.product_name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "dispatched":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-purple-100 text-purple-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOrdersByStatus = (status: string) => {
    if (status === "all") return filteredOrders
    return filteredOrders.filter((order) => order.status === status)
  }

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Order Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All ({filteredOrders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({getOrdersByStatus("pending").length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({getOrdersByStatus("processing").length})</TabsTrigger>
            <TabsTrigger value="dispatched">Dispatched ({getOrdersByStatus("dispatched").length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({getOrdersByStatus("delivered").length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({getOrdersByStatus("cancelled").length})</TabsTrigger>
          </TabsList>

          {["all", "pending", "processing", "dispatched", "delivered", "cancelled"].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              {getOrdersByStatus(status).length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-500">
                      {status === "all" ? "You haven't placed any orders yet." : `No ${status} orders found.`}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                getOrdersByStatus(status).map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Order #{order.order_number}</h3>
                          <p className="text-sm text-gray-600">Placed on {order.created_at}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="text-lg font-bold mt-1">${order.total_amount}</p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <img
                              src={item.product_image || "/placeholder.svg"}
                              alt={item.product_name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product_name}</h4>
                              <p className="text-sm text-gray-600">by {item.vendor_name}</p>
                              <p className="text-sm">
                                Qty: {item.quantity} × ${item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details - #{order.order_number}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Order Information</h4>
                                    <p className="text-sm text-gray-600">Status: {order.status}</p>
                                    <p className="text-sm text-gray-600">Order Date: {order.created_at}</p>
                                    {order.delivery_date && (
                                      <p className="text-sm text-gray-600">Delivered: {order.delivery_date}</p>
                                    )}
                                    {order.tracking_number && (
                                      <p className="text-sm text-gray-600">Tracking: {order.tracking_number}</p>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Shipping Address</h4>
                                    <p className="text-sm text-gray-600">{order.shipping_address}</p>
                                    <h4 className="font-medium mb-2 mt-4">Payment Method</h4>
                                    <p className="text-sm text-gray-600">{order.payment_method}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Items</h4>
                                  <div className="space-y-2">
                                    {order.items.map((item) => (
                                      <div key={item.id} className="flex justify-between">
                                        <span>
                                          {item.product_name} × {item.quantity}
                                        </span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                      </div>
                                    ))}
                                    <div className="border-t pt-2 font-bold">
                                      <div className="flex justify-between">
                                        <span>Total</span>
                                        <span>${order.total_amount}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {order.tracking_number && (
                            <Button variant="outline" size="sm">
                              <Truck className="w-4 h-4 mr-2" />
                              Track Order
                            </Button>
                          )}

                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Invoice
                          </Button>
                        </div>

                        <div className="flex space-x-2">
                          {order.status === "delivered" && (
                            <>
                              <Button variant="outline" size="sm">
                                <Star className="w-4 h-4 mr-2" />
                                Review
                              </Button>
                              <Button variant="outline" size="sm">
                                Buy Again
                              </Button>
                            </>
                          )}

                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Support
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
