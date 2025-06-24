"use client"

import { useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { ProductReviewForm } from "@/components/reviews/product-review-form"
import { VendorReviewForm } from "@/components/reviews/vendor-review-form"
import { ReviewDisplay } from "@/components/reviews/review-display"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Search, Package, Store, Plus } from "lucide-react"

interface CustomerReviewsProps {
  reviews?: any[]
  pendingReviews?: any[]
  stats?: any
}

export default function CustomerReviews({ reviews = [], pendingReviews = [], stats }: CustomerReviewsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [activeTab, setActiveTab] = useState("my-reviews")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewFormType, setReviewFormType] = useState<"product" | "vendor">("product")
  const [editingReview, setEditingReview] = useState<any>(null)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  // Mock data
  const mockStats = {
    total_reviews: 23,
    product_reviews: 18,
    vendor_reviews: 5,
    avg_rating_given: 4.2,
    pending_reviews: 3,
  }

  const mockReviews = [
    {
      id: 1,
      type: "product",
      rating: 5,
      title: "Excellent product!",
      comment: "This product exceeded my expectations. Great quality and fast shipping.",
      created_at: "2024-01-15T10:30:00Z",
      helpful_count: 12,
      not_helpful_count: 1,
      user: {
        id: 1,
        first_name: "John",
        last_name: "Doe",
      },
      product: {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        image_url: "/placeholder.svg?height=60&width=60",
        vendor: {
          store_name: "TechWorld",
        },
      },
      vendor_response: {
        id: 1,
        comment: "Thank you for your wonderful review! We're thrilled you love the product.",
        created_at: "2024-01-16T09:15:00Z",
        user: {
          first_name: "Tech",
          last_name: "World",
        },
      },
    },
    {
      id: 2,
      type: "vendor",
      overall_rating: 4,
      communication_rating: 5,
      shipping_rating: 4,
      service_rating: 4,
      title: "Great customer service",
      comment: "Vendor was very responsive and helpful throughout the entire process.",
      created_at: "2024-01-10T16:45:00Z",
      helpful_count: 8,
      not_helpful_count: 0,
      user: {
        id: 1,
        first_name: "John",
        last_name: "Doe",
      },
      vendor: {
        id: 1,
        store_name: "QuickShip Store",
        user: {
          first_name: "Jane",
          last_name: "Smith",
        },
      },
    },
  ]

  const mockPendingReviews = [
    {
      id: 1,
      order_number: "ORD-2024-001",
      purchased_at: "2024-01-20T14:30:00Z",
      items: [
        {
          product: {
            id: 2,
            name: "USB-C Cable 6ft",
            image_url: "/placeholder.svg?height=60&width=60",
            vendor: {
              id: 2,
              store_name: "Cable Co",
            },
          },
        },
      ],
      vendor: {
        id: 2,
        store_name: "Cable Co",
        user: {
          first_name: "Mike",
          last_name: "Johnson",
        },
      },
    },
  ]

  const currentStats = stats || mockStats
  const currentReviews = reviews.length > 0 ? reviews : mockReviews
  const currentPendingReviews = pendingReviews.length > 0 ? pendingReviews : mockPendingReviews

  const handleEditReview = (review: any) => {
    setEditingReview(review)
    setReviewFormType(review.type)
    setShowReviewForm(true)
  }

  const handleDeleteReview = async (reviewId: number) => {
    console.log("Delete review:", reviewId)
    // Implement API call to delete review
  }

  const handleSubmitReview = async (reviewData: any) => {
    console.log("Submit review:", reviewData)
    // Implement API call to submit review
    setShowReviewForm(false)
    setEditingReview(null)
    setSelectedOrder(null)
  }

  const handleWriteReview = (order: any, type: "product" | "vendor", product?: any) => {
    setSelectedOrder(order)
    setReviewFormType(type)
    setEditingReview(product ? { product } : { vendor: order.vendor })
    setShowReviewForm(true)
  }

  return (
    <CustomerLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Reviews</h1>
          <p className="text-gray-600">Manage your product and vendor reviews</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold">{currentStats.total_reviews}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating Given</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold">{currentStats.avg_rating_given}</span>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <Star className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Product Reviews</p>
                  <p className="text-2xl font-bold">{currentStats.product_reviews}</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vendor Reviews</p>
                  <p className="text-2xl font-bold">{currentStats.vendor_reviews}</p>
                </div>
                <Store className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reviews & Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search your reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="product">Product Reviews</SelectItem>
                  <SelectItem value="vendor">Vendor Reviews</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Review Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="my-reviews">My Reviews ({currentStats.total_reviews})</TabsTrigger>
                <TabsTrigger value="pending">Write Reviews ({currentStats.pending_reviews})</TabsTrigger>
              </TabsList>

              <TabsContent value="my-reviews" className="mt-6">
                <div className="space-y-4">
                  {currentReviews.map((review) => (
                    <div key={review.id}>
                      {/* Product/Vendor Info */}
                      <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {review.type === "product" ? (
                            <>
                              <img
                                src={review.product.image_url || "/placeholder.svg"}
                                alt={review.product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <h4 className="font-medium">{review.product.name}</h4>
                                <p className="text-sm text-gray-600">by {review.product.vendor.store_name}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <Store className="w-6 h-6 text-gray-500" />
                              </div>
                              <div>
                                <h4 className="font-medium">{review.vendor.store_name}</h4>
                                <p className="text-sm text-gray-600">Vendor Review</p>
                              </div>
                            </>
                          )}
                        </div>
                        <Badge variant="outline">
                          {review.type === "product" ? (
                            <>
                              <Package className="w-3 h-3 mr-1" />
                              Product
                            </>
                          ) : (
                            <>
                              <Store className="w-3 h-3 mr-1" />
                              Vendor
                            </>
                          )}
                        </Badge>
                      </div>
                      <ReviewDisplay
                        review={review}
                        type={review.type}
                        currentUserId={1}
                        onEdit={handleEditReview}
                        onDelete={handleDeleteReview}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <div className="space-y-6">
                  {currentPendingReviews.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
                          <Badge variant="outline">{new Date(order.purchased_at).toLocaleDateString()}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Products */}
                        <div className="space-y-4 mb-6">
                          <h4 className="font-medium">Products to Review:</h4>
                          {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.product.image_url || "/placeholder.svg"}
                                  alt={item.product.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <h5 className="font-medium">{item.product.name}</h5>
                                  <p className="text-sm text-gray-600">by {item.product.vendor.store_name}</p>
                                </div>
                              </div>
                              <Button size="sm" onClick={() => handleWriteReview(order, "product", item.product)}>
                                <Plus className="w-4 h-4 mr-1" />
                                Write Review
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Vendor Review */}
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Review Vendor Experience</h4>
                              <p className="text-sm text-gray-600">
                                Rate your overall experience with {order.vendor.store_name}
                              </p>
                            </div>
                            <Button variant="outline" onClick={() => handleWriteReview(order, "vendor")}>
                              <Store className="w-4 h-4 mr-1" />
                              Review Vendor
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Review Form Dialog */}
        <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingReview?.id ? "Edit Review" : "Write Review"}</DialogTitle>
            </DialogHeader>
            {reviewFormType === "product" ? (
              <ProductReviewForm
                product={editingReview?.product || selectedOrder?.items?.[0]?.product}
                order={selectedOrder}
                existingReview={editingReview?.id ? editingReview : undefined}
                onSubmit={handleSubmitReview}
                onCancel={() => {
                  setShowReviewForm(false)
                  setEditingReview(null)
                  setSelectedOrder(null)
                }}
              />
            ) : (
              <VendorReviewForm
                vendor={editingReview?.vendor || selectedOrder?.vendor}
                order={selectedOrder}
                existingReview={editingReview?.id ? editingReview : undefined}
                onSubmit={handleSubmitReview}
                onCancel={() => {
                  setShowReviewForm(false)
                  setEditingReview(null)
                  setSelectedOrder(null)
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </CustomerLayout>
  )
}
