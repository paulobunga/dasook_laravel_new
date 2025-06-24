"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  MoreHorizontal,
  Edit,
  Trash2,
  Reply,
  ChevronDown,
  ChevronUp,
  Verified,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Review {
  id: number
  rating: number
  title: string
  comment: string
  created_at: string
  updated_at?: string
  helpful_count: number
  not_helpful_count: number
  user_found_helpful?: boolean
  images?: string[]
  user: {
    id: number
    first_name: string
    last_name: string
    avatar?: string
    verified_purchase?: boolean
  }
  vendor_response?: {
    id: number
    comment: string
    created_at: string
    user: {
      first_name: string
      last_name: string
    }
  }
  // For vendor reviews
  communication_rating?: number
  shipping_rating?: number
  service_rating?: number
  overall_rating?: number
}

interface ReviewDisplayProps {
  review: Review
  type: "product" | "vendor"
  currentUserId?: number
  isVendor?: boolean
  isAdmin?: boolean
  onEdit?: (review: Review) => void
  onDelete?: (reviewId: number) => void
  onReport?: (reviewId: number) => void
  onHelpful?: (reviewId: number, helpful: boolean) => void
  onVendorResponse?: (reviewId: number, response: string) => void
}

export function ReviewDisplay({
  review,
  type,
  currentUserId,
  isVendor,
  isAdmin,
  onEdit,
  onDelete,
  onReport,
  onHelpful,
  onVendorResponse,
}: ReviewDisplayProps) {
  const [showFullComment, setShowFullComment] = useState(false)
  const [showVendorResponse, setShowVendorResponse] = useState(false)
  const [vendorResponseText, setVendorResponseText] = useState("")
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false)

  const isOwnReview = currentUserId === review.user.id
  const shouldTruncate = review.comment.length > 300
  const displayComment = shouldTruncate && !showFullComment ? review.comment.substring(0, 300) + "..." : review.comment

  const handleVendorResponse = async () => {
    if (!vendorResponseText.trim() || !onVendorResponse) return

    setIsSubmittingResponse(true)
    try {
      await onVendorResponse(review.id, vendorResponseText)
      setVendorResponseText("")
      setShowVendorResponse(false)
    } catch (error) {
      console.error("Error submitting vendor response:", error)
    } finally {
      setIsSubmittingResponse(false)
    }
  }

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5"
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const renderVendorRatings = () => {
    if (type !== "vendor" || !review.communication_rating) return null

    const categories = [
      { label: "Communication", rating: review.communication_rating },
      { label: "Shipping", rating: review.shipping_rating },
      { label: "Service", rating: review.service_rating },
    ]

    return (
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        {categories.map((category) => (
          <div key={category.label} className="text-center">
            <p className="text-xs text-gray-600 mb-1">{category.label}</p>
            {renderStars(category.rating || 0)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.first_name} />
              <AvatarFallback>
                {review.user.first_name.charAt(0)}
                {review.user.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium">
                  {review.user.first_name} {review.user.last_name.charAt(0)}.
                </p>
                {review.user.verified_purchase && (
                  <Badge variant="outline" className="text-xs">
                    <Verified className="w-3 h-3 mr-1" />
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                {renderStars(review.overall_rating || review.rating)}
                <span className="text-sm text-gray-600">{new Date(review.created_at).toLocaleDateString()}</span>
                {review.updated_at && review.updated_at !== review.created_at && (
                  <span className="text-xs text-gray-500">(edited)</span>
                )}
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwnReview && onEdit && (
                <DropdownMenuItem onClick={() => onEdit(review)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Review
                </DropdownMenuItem>
              )}
              {(isOwnReview || isAdmin) && onDelete && (
                <DropdownMenuItem onClick={() => onDelete(review.id)} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Review
                </DropdownMenuItem>
              )}
              {!isOwnReview && onReport && (
                <DropdownMenuItem onClick={() => onReport(review.id)}>
                  <Flag className="w-4 h-4 mr-2" />
                  Report Review
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Vendor-specific ratings */}
        {renderVendorRatings()}

        {/* Review Content */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">{review.title}</h4>
          <p className="text-gray-700 leading-relaxed">{displayComment}</p>
          {shouldTruncate && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setShowFullComment(!showFullComment)}
              className="p-0 h-auto mt-1"
            >
              {showFullComment ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Read More
                </>
              )}
            </Button>
          )}
        </div>

        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Review image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border flex-shrink-0 cursor-pointer hover:opacity-80"
                onClick={() => {
                  // Open image in modal/lightbox
                }}
              />
            ))}
          </div>
        )}

        {/* Helpful Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onHelpful && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onHelpful(review.id, true)}
                  className={review.user_found_helpful === true ? "text-green-600" : ""}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful ({review.helpful_count})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onHelpful(review.id, false)}
                  className={review.user_found_helpful === false ? "text-red-600" : ""}
                >
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  Not Helpful ({review.not_helpful_count})
                </Button>
              </>
            )}
          </div>

          {/* Vendor Response Button */}
          {isVendor && !review.vendor_response && onVendorResponse && (
            <Button variant="outline" size="sm" onClick={() => setShowVendorResponse(!showVendorResponse)}>
              <Reply className="w-4 h-4 mr-1" />
              Respond
            </Button>
          )}
        </div>

        {/* Vendor Response Form */}
        {showVendorResponse && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <textarea
              value={vendorResponseText}
              onChange={(e) => setVendorResponseText(e.target.value)}
              placeholder="Write a professional response to this review..."
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">{vendorResponseText.length}/500</span>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowVendorResponse(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleVendorResponse}
                  disabled={!vendorResponseText.trim() || isSubmittingResponse}
                >
                  {isSubmittingResponse ? "Posting..." : "Post Response"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Vendor Response */}
        {review.vendor_response && (
          <>
            <Separator className="my-4" />
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">Vendor Response</Badge>
                <span className="text-sm text-gray-600">
                  {new Date(review.vendor_response.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.vendor_response.comment}</p>
              <p className="text-sm text-gray-600 mt-2">
                - {review.vendor_response.user.first_name} {review.vendor_response.user.last_name}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
