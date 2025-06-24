"use client"

import { useState } from "react"
import AdminLayout from "@/layouts/admin-layout"
import { ReviewDisplay } from "@/components/reviews/review-display"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Search,
  TrendingUp,
  MessageSquare,
  Package,
  Store,
  Flag,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"

interface AdminReviewsProps {
  reviews?: any[]
  reportedReviews?: any[]
  stats?: any
}

export default function AdminReviews({ reviews = [], reportedReviews = [], stats }: AdminReviewsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data
  const mockStats = {
    total_reviews: 15847,
    product_reviews: 13256,
    vendor_reviews: 2591,
    pending_moderation: 23,
    reported_reviews: 8,
    avg_rating: 4.3,
    reviews_this_month: 1247,
  }

  const mockReviews = [
    {
      id: 1,
      type: "product",
      rating: 5,
      title: "Amazing product quality!",
      comment: "This product exceeded all my expectations. The quality is outstanding and delivery was super fast.",
      created_at: "2024-01-15T10:30:00Z",
      status: "approved",
      helpful_count: 24,
      not_helpful_count: 2,
      reported_count: 0,
      user: {
        id: 2,
        first_name: "Sarah",
        last_name: "Johnson",
        email: "sarah@example.com",
        verified_purchase: true,
      },
      product: {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        vendor: {
          store_name: "TechWorld",
        },
      },
    },
    {
      id: 2,
      type: "vendor",
      overall_rating: 2,
      communication_rating: 1,
      shipping_rating: 2,
      service_rating: 2,
      title: "Poor customer service",
      comment:
        "Vendor was unresponsive to my messages and shipping took way too long. Very disappointed with the experience.",
      created_at: "2024-01-12T14:20:00Z",
      status: "reported",
      helpful_count: 8,
      not_helpful_count: 15,
      reported_count: 3,
      user: {
        id: 3,
        first_name: "Mike",
        last_name: "Chen",
        email: "mike@example.com",
        verified_purchase: true,
      },
      vendor: {
        id: 1,
        store_name: "QuickShip Store",
        user: {
          first_name: "John",
          last_name: "Doe",
        },
      },
    },
  ]

  const mockReportedReviews = [
    {
      id: 3,
      review_id: 2,
      reason: "inappropriate_content",
      description: "Contains offensive language and false accusations",
      reported_by: {
        first_name: "Store",
        last_name: "Owner",
      },
      created_at: "2024-01-13T09:15:00Z",
      status: "pending",
    },
  ]

  const currentStats = stats || mockStats
  const currentReviews = reviews.length > 0 ? reviews : mockReviews
  const currentReportedReviews = reportedReviews.length > 0 ? reportedReviews : mockReportedReviews

  const handleDeleteReview = async (reviewId: number) => {
    console.log("Delete review:", reviewId)
    // Implement API call to delete review
  }

  const handleApproveReview = async (reviewId: number) => {
    console.log("Approve review:", reviewId)
    // Implement API call to approve review
  }

  const handleRejectReview = async (reviewId: number) => {
    console.log("Reject review:", reviewId)
    // Implement API call to reject review
  }

  const handleResolveReport = async (reportId: number, action: "approve" | "remove") => {
    console.log("Resolve report:", { reportId, action })
    // Implement API call to resolve report
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "reported":
        return <Badge className="bg-orange-100 text-orange-800">Reported</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Review Management</h1>
          <p className="text-gray-600">Monitor and moderate all platform reviews</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold">{currentStats.total_reviews.toLocaleString()}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold">{currentStats.avg_rating}</span>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
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
                  <p className="text-sm font-medium text-gray-600">Pending Moderation</p>
                  <p className="text-2xl font-bold text-orange-600">{currentStats.pending_moderation}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reported Reviews</p>
                  <p className="text-2xl font-bold text-red-600">{currentStats.reported_reviews}</p>
                </div>
                <Flag className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search reviews, products, or users..."
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reported">Reported</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
                  <SelectItem value="most_reported">Most Reported</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Review Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Reviews ({currentStats.total_reviews})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({currentStats.pending_moderation})</TabsTrigger>
                <TabsTrigger value="reported">Reported ({currentStats.reported_reviews})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-6">
                  {currentReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
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
                          {getStatusBadge(review.status)}
                          {review.reported_count > 0 && (
                            <Badge variant="destructive">
                              <Flag className="w-3 h-3 mr-1" />
                              {review.reported_count} Reports
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {review.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApproveReview(review.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleRejectReview(review.id)}>
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteReview(review.id)}>
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      {/* Review Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Reviewer</p>
                          <p className="font-medium">
                            {review.user.first_name} {review.user.last_name}
                          </p>
                          <p className="text-sm text-gray-500">{review.user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {review.type === "product" ? "Product" : "Vendor"}
                          </p>
                          <p className="font-medium">
                            {review.type === "product" ? review.product?.name : review.vendor?.store_name}
                          </p>
                          {review.type === "product" && (
                            <p className="text-sm text-gray-500">by {review.product?.vendor?.store_name}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Engagement</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-green-600">👍 {review.helpful_count}</span>
                            <span className="text-sm text-red-600">👎 {review.not_helpful_count}</span>
                          </div>
                        </div>
                      </div>

                      <ReviewDisplay review={review} type={review.type} isAdmin={true} onDelete={handleDeleteReview} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <div className="space-y-4">
                  {currentReviews
                    .filter((review) => review.status === "pending")
                    .map((review) => (
                      <div key={review.id} className="border rounded-lg p-4 bg-yellow-50">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveReview(review.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleRejectReview(review.id)}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                        <ReviewDisplay
                          review={review}
                          type={review.type}
                          isAdmin={true}
                          onDelete={handleDeleteReview}
                        />
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="reported" className="mt-6">
                <div className="space-y-6">
                  {currentReportedReviews.map((report) => (
                    <Card key={report.id} className="border-red-200">
                      <CardHeader className="bg-red-50">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-red-800">Reported Review #{report.review_id}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleResolveReport(report.id, "approve")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Keep Review
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleResolveReport(report.id, "remove")}
                            >
                              Remove Review
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Report Reason</p>
                            <p className="font-medium capitalize">{report.reason.replace("_", " ")}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Reported By</p>
                            <p className="font-medium">
                              {report.reported_by.first_name} {report.reported_by.last_name}
                            </p>
                          </div>
                        </div>
                        {report.description && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-600">Description</p>
                            <p className="text-gray-700">{report.description}</p>
                          </div>
                        )}
                        <p className="text-sm text-gray-500">
                          Reported on {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
