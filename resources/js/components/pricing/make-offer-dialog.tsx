"use client"

import type React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useForm } from "@inertiajs/react"
import { Gavel, Store, Info, DollarSign } from "lucide-react"

interface Vendor {
  id: number
  store_name: string
  phone?: string
  email: string
  response_time?: string
}

interface MakeOfferDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendor: Vendor
  productId: number
  productName: string
  minOffer?: number
  instructions?: string
}

export function MakeOfferDialog({
  open,
  onOpenChange,
  vendor,
  productId,
  productName,
  minOffer,
  instructions,
}: MakeOfferDialogProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    offer_amount: "",
    message: "",
    expires_at: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/products/${productId}/make-offer`, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      },
    })
  }

  const offerAmount = Number.parseFloat(data.offer_amount) || 0
  const isValidOffer = !minOffer || offerAmount >= minOffer

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gavel className="w-5 h-5" />
            Make an Offer
          </DialogTitle>
          <DialogDescription>
            Submit your offer for "{productName}" to {vendor.store_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Vendor Info */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Store className="w-4 h-4" />
              <span className="font-medium">{vendor.store_name}</span>
            </div>
            {vendor.response_time && (
              <Badge variant="secondary" className="text-xs">
                Responds in {vendor.response_time}
              </Badge>
            )}
          </div>

          {/* Instructions */}
          {instructions && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>{instructions}</AlertDescription>
            </Alert>
          )}

          {/* Minimum Offer Alert */}
          {minOffer && (
            <Alert>
              <DollarSign className="h-4 w-4" />
              <AlertDescription>
                Minimum offer amount: <strong>${minOffer.toFixed(2)}</strong>
              </AlertDescription>
            </Alert>
          )}

          {/* Offer Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  error={errors.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  error={errors.email}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Your Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                error={errors.phone}
              />
            </div>

            <div>
              <Label htmlFor="offer_amount">Your Offer Amount ($)</Label>
              <Input
                id="offer_amount"
                type="number"
                step="0.01"
                min={minOffer || 0}
                placeholder="0.00"
                value={data.offer_amount}
                onChange={(e) => setData("offer_amount", e.target.value)}
                error={errors.offer_amount}
                required
              />
              {minOffer && offerAmount > 0 && !isValidOffer && (
                <p className="text-sm text-red-600 mt-1">Offer must be at least ${minOffer.toFixed(2)}</p>
              )}
            </div>

            <div>
              <Label htmlFor="expires_at">Offer Valid Until (Optional)</Label>
              <Input
                id="expires_at"
                type="date"
                value={data.expires_at}
                onChange={(e) => setData("expires_at", e.target.value)}
                error={errors.expires_at}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Any additional details about your offer..."
                value={data.message}
                onChange={(e) => setData("message", e.target.value)}
                error={errors.message}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={processing || !isValidOffer} className="flex-1">
                {processing ? "Submitting..." : "Submit Offer"}
              </Button>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
