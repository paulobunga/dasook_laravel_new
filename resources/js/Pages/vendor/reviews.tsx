"use client"

import { useState } from "react"
import VendorLayout from "@/layouts/vendor-layout"
import { ReviewDisplay } from "@/components/reviews/review-display"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Search, TrendingUp, MessageSquare, Package, Store, BarChart3 } from "lucide-react"

interface VendorReviewsProps {
  productReviews?: any[]
  vendorReviews?: any[]
  stats?: any
}

export default function VendorReviews({ productReviews = [], vendorReviews = [], stats }: VendorReviewsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [activeTab, setActiveTab] = useState("products")

  // Mock data
  const mockStats = {
    overall_rating: 4.7,
    total_reviews: 324,
    product_reviews: 289,
    vendor_reviews: 35,
    rating_distribution: {
      5: 198,
      4: 89,
      3: 25,
      2: 8,
      1: 4,
    },
    response_rate: 92,
    avg_response_time: "2.3 hours",
  }

  const mockProductReviews = [
    {
      id: 1,
      rating: 5,
      title: "Excellent product quality!",
      comment:
        "This product exceeded my expectations. The build quality is fantastic and it arrived exactly as described. The packaging was also very professional. Highly recommend this vendor!",
      created_at: "2024-01-15T10:30:00Z",
      helpful_count: 12,
      not_helpful_count: 1,
      user: {
        id: 2,
        first_name: "Sarah",
        last_name: "Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        verified_purchase: true,
      },
      product: {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        image_url: "/placeholder.svg?height=60&width=60",
      },
      images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    },
    {
      id: 2,
      rating: 4,
      title: "Good value for money",
      comment:
        "Product works well and shipping was fast. Only minor issue was the packaging could be better, but overall satisfied with the purchase.",
      created_at: "2024-01-12T14:20:00Z",
      helpful_count: 8,
      not_helpful_count: 0,
      user: {
        id: 3,
        first_name: "Mike",
        last_name: "Chen",
        verified_purchase: true,
      },
      product: {
        id: 2,
        name: "USB-C Cable 6ft",
        image_url: "/placeholder.svg?height=60&width=60",
      },
      vendor_response: {
        id: 1,
        comment: "Thank you for your feedback! We're working on improving our packaging. We appreciate your business!",
        created_at: "2024-01-13T09:15:00Z",
        user: {
          first_name: "Tech",
          last_name: "Store",
        },
      },
    },
  ]

  const mockVendorReviews = [
    {
      id: 3,
      overall_rating: 5,
      communication_rating: 5,
      shipping_rating: 4,
      service_rating: 5,
      title: "Outstanding customer service",
      comment:
        "This vendor went above and beyond to help me with my order. Quick responses to messages and very professional throughout the entire process.",
      created_at: "2024-01-10T16:45:00Z",
      helpful_count: 15,
      not_helpful_count: 0,
      user: {
        id: 4,
        first_name: "Emily",
        last_name: "Davis",
        verified_purchase: true,
      },
    },
  ]

  const currentStats = stats || mockStats
  const currentProductReviews = productReviews.length > 0 ? productReviews : mockProductReviews
  const currentVendorReviews = vendorReviews.length > 0 ? vendorReviews : mockVendorReviews

  const handleVendorResponse = async (reviewId: number, response: string) => {
    console.log("Vendor response:", { reviewId, response })
    // Implement API call to submit vendor response
  }

  const handleHelpful = async (reviewId: number, helpful: boolean) => {
    console.log("Mark helpful:", { reviewId, helpful })
    // Implement API call to mark review as helpful/not helpful
  }

  const renderRatingDistribution = () => {
    const total = Object.values(currentStats.rating_distribution).reduce((a, b) => a + b, 0)

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = currentStats.rating_distribution[rating] || 0
          const percentage = total > 0 ? (count / total) * 100 : 0

          return (
            <div key={rating} className="flex items-center space-x-2">
              <span className="text-sm w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <VendorLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
          <p className="text-gray-600">Manage and respond to customer reviews</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Rating</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold">{currentStats.overall_rating}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(currentStats.overall_rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold">{currentStats.total_reviews}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold">{currentStats.response_rate}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold">{currentStats.avg_response_time}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Rating Distribution */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>{renderRatingDistribution()}</CardContent>
            </Card>
          </div>

          {/* Reviews */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Customer Reviews</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      <Package className="w-3 h-3 mr-1" />
                      {currentStats.product_reviews} Product
                    </Badge>
                    <Badge variant="outline">
                      <Store className="w-3 h-3 mr-1" />
                      {currentStats.vendor_reviews} Vendor
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
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
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Review Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="products">Product Reviews ({currentStats.product_reviews})</TabsTrigger>
                    <TabsTrigger value="vendor">Vendor Reviews ({currentStats.vendor_reviews})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="products" className="mt-6">
                    <div className="space-y-4">
                      {currentProductReviews.map((review) => (
                        <div key={review.id}>
                          {/* Product Info */}
                          <div className="flex items-center space-x-3 mb-3 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={review.product.image_url || "/placeholder.svg"}
                              alt={review.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <h4 className="font-medium">{review.product.name}</h4>
                              <p className="text-sm text-gray-600">Product Review</p>
                            </div>
                          </div>
                          <ReviewDisplay
                            review={review}
                            type="product"
                            isVendor={true}
                            onVendorResponse={handleVendorResponse}
                            onHelpful={handleHelpful}
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="vendor" className="mt-6">
                    <div className="space-y-4">
                      {currentVendorReviews.map((review) => (
                        <ReviewDisplay
                          key={review.id}
                          review={review}
                          type="vendor"
                          isVendor={true}
                          onVendorResponse={handleVendorResponse}
                          onHelpful={handleHelpful}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </VendorLayout>
  )
}
