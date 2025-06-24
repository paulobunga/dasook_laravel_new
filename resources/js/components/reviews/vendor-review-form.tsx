"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Store, CheckCircle, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface VendorReviewFormProps {
  vendor: {
    id: number
    store_name: string
    store_logo?: string
    user: {
      first_name: string
      last_name: string
    }
  }
  order?: {
    id: number
    order_number: string
    purchased_at: string
  }
  existingReview?: {
    id: number
    communication_rating: number
    shipping_rating: number
    service_rating: number
    overall_rating: number
    title: string
    comment: string
  }
  onSubmit: (reviewData: any) => void
  onCancel?: () => void
}

export function VendorReviewForm({ vendor, order, existingReview, onSubmit, onCancel }: VendorReviewFormProps) {
  const [ratings, setRatings] = useState({
    communication: existingReview?.communication_rating || 0,
    shipping: existingReview?.shipping_rating || 0,
    service: existingReview?.service_rating || 0,
    overall: existingReview?.overall_rating || 0,
  })
  const [hoverRatings, setHoverRatings] = useState({
    communication: 0,
    shipping: 0,
    service: 0,
    overall: 0,
  })
  const [title, setTitle] = useState(existingReview?.title || "")
  const [comment, setComment] = useState(existingReview?.comment || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const ratingCategories = [
    {
      key: "communication" as keyof typeof ratings,
      label: "Communication",
      description: "How well did the vendor communicate?",
    },
    {
      key: "shipping" as keyof typeof ratings,
      label: "Shipping & Packaging",
      description: "How was the shipping speed and packaging?",
    },
    {
      key: "service" as keyof typeof ratings,
      label: "Customer Service",
      description: "How was the overall customer service?",
    },
    {
      key: "overall" as keyof typeof ratings,
      label: "Overall Experience",
      description: "Your overall experience with this vendor",
    },
  ]

  const handleRatingChange = (category: keyof typeof ratings, rating: number) => {
    setRatings({ ...ratings, [category]: rating })
  }

  const handleHoverChange = (category: keyof typeof hoverRatings, rating: number) => {
    setHoverRatings({ ...hoverRatings, [category]: rating })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    if (ratings.overall === 0) newErrors.overall = "Please provide an overall rating"
    if (!title.trim()) newErrors.title = "Please enter a review title"
    if (!comment.trim()) newErrors.comment = "Please write a review"
    if (comment.length < 10) newErrors.comment = "Review must be at least 10 characters"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const reviewData = {
        vendor_id: vendor.id,
        communication_rating: ratings.communication,
        shipping_rating: ratings.shipping,
        service_rating: ratings.service,
        overall_rating: ratings.overall,
        title,
        comment,
        order_id: order?.id,
      }

      await onSubmit(reviewData)
    } catch (error) {
      console.error("Error submitting vendor review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Very Good"
      case 5:
        return "Excellent"
      default:
        return "Not Rated"
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Store className="w-5 h-5" />
          <span>{existingReview ? "Edit Vendor Review" : "Review Vendor"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Vendor Info */}
        <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <Avatar className="w-16 h-16">
            <AvatarImage src={vendor.store_logo || "/placeholder.svg"} alt={vendor.store_name} />
            <AvatarFallback>{vendor.store_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{vendor.store_name}</h3>
            <p className="text-sm text-gray-600">
              Owner: {vendor.user.first_name} {vendor.user.last_name}
            </p>
            {order && (
              <Badge variant="outline" className="mt-1">
                Order #{order.order_number}
              </Badge>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Categories */}
          <div className="space-y-6">
            {ratingCategories.map((category) => (
              <div key={category.key}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Label className="text-base font-medium">{category.label}</Label>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {getRatingText(hoverRatings[category.key] || ratings[category.key])}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1"
                      onMouseEnter={() => handleHoverChange(category.key, star)}
                      onMouseLeave={() => handleHoverChange(category.key, 0)}
                      onClick={() => handleRatingChange(category.key, star)}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRatings[category.key] || ratings[category.key])
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {category.key === "overall" && errors.overall && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.overall}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Review Title */}
          <div>
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience with this vendor..."
              className="mt-2"
              maxLength={100}
            />
            <div className="flex justify-between mt-1">
              {errors.title && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
              <p className="text-sm text-gray-500 ml-auto">{title.length}/100</p>
            </div>
          </div>

          {/* Review Comment */}
          <div>
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details about your experience with this vendor's service, communication, and overall experience..."
              className="mt-2 min-h-[120px]"
              maxLength={1000}
            />
            <div className="flex justify-between mt-1">
              {errors.comment && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.comment}
                </p>
              )}
              <p className="text-sm text-gray-500 ml-auto">{comment.length}/1000</p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {existingReview ? "Updating..." : "Submitting..."}
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {existingReview ? "Update Review" : "Submit Review"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
