"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Upload, X, CheckCircle, AlertCircle } from "lucide-react"

interface ProductReviewFormProps {
  product: {
    id: number
    name: string
    image_url?: string
    vendor: {
      store_name: string
    }
  }
  order?: {
    id: number
    order_number: string
    purchased_at: string
  }
  existingReview?: {
    id: number
    rating: number
    title: string
    comment: string
    images?: string[]
  }
  onSubmit: (reviewData: any) => void
  onCancel?: () => void
}

export function ProductReviewForm({ product, order, existingReview, onSubmit, onCancel }: ProductReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState(existingReview?.title || "")
  const [comment, setComment] = useState(existingReview?.comment || "")
  const [images, setImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState(existingReview?.images || [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 5) {
      setErrors({ images: "Maximum 5 images allowed" })
      return
    }
    setImages([...images, ...files])
    setErrors({ ...errors, images: "" })
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    if (rating === 0) newErrors.rating = "Please select a rating"
    if (!title.trim()) newErrors.title = "Please enter a review title"
    if (!comment.trim()) newErrors.comment = "Please write a review"
    if (comment.length < 10) newErrors.comment = "Review must be at least 10 characters"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("product_id", product.id.toString())
      formData.append("rating", rating.toString())
      formData.append("title", title)
      formData.append("comment", comment)

      if (order) {
        formData.append("order_id", order.id.toString())
      }

      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image)
      })

      if (existingReview) {
        formData.append("existing_images", JSON.stringify(existingImages))
      }

      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting review:", error)
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
        return "Select Rating"
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>{existingReview ? "Edit Review" : "Write a Review"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Product Info */}
        <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
            {product.image_url && (
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">by {product.vendor.store_name}</p>
            {order && (
              <Badge variant="outline" className="mt-1">
                Order #{order.order_number}
              </Badge>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium">Overall Rating *</Label>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-lg font-medium text-gray-700">{getRatingText(hoverRating || rating)}</span>
            </div>
            {errors.rating && (
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.rating}
              </p>
            )}
          </div>

          {/* Review Title */}
          <div>
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience..."
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
              placeholder="Tell others about your experience with this product..."
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

          {/* Image Upload */}
          <div>
            <Label>Add Photos (Optional)</Label>
            <p className="text-sm text-gray-600 mb-2">Help others by showing the product</p>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Review image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New Images */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {images.length + existingImages.length < 5 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload images ({images.length + existingImages.length}/5)
                  </p>
                </label>
              </div>
            )}

            {errors.images && (
              <p className="text-sm text-red-600 mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.images}
              </p>
            )}
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
