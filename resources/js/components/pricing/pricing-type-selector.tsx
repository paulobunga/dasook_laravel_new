"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, MessageCircle, Gavel } from "lucide-react"

export type PricingType = "fixed" | "contact" | "offer"

interface PricingTypeSelectorProps {
  value: PricingType
  onChange: (type: PricingType) => void
  price?: number
  onPriceChange?: (price: number) => void
  contactMessage?: string
  onContactMessageChange?: (message: string) => void
  minOffer?: number
  onMinOfferChange?: (amount: number) => void
  offerInstructions?: string
  onOfferInstructionsChange?: (instructions: string) => void
}

export function PricingTypeSelector({
  value,
  onChange,
  price,
  onPriceChange,
  contactMessage,
  onContactMessageChange,
  minOffer,
  onMinOfferChange,
  offerInstructions,
  onOfferInstructionsChange,
}: PricingTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">Pricing Type</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Choose how customers will see and interact with your product pricing
        </p>
      </div>

      <RadioGroup value={value} onValueChange={(value) => onChange(value as PricingType)} className="space-y-4">
        {/* Fixed Price */}
        <Card className={`cursor-pointer transition-colors ${value === "fixed" ? "ring-2 ring-primary" : ""}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="fixed" id="fixed" />
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <CardTitle className="text-base">Fixed Price</CardTitle>
                <CardDescription>Set a specific price for your product</CardDescription>
              </div>
            </div>
          </CardHeader>
          {value === "fixed" && (
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={price || ""}
                    onChange={(e) => onPriceChange?.(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Contact for Price */}
        <Card className={`cursor-pointer transition-colors ${value === "contact" ? "ring-2 ring-primary" : ""}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="contact" id="contact" />
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <div>
                <CardTitle className="text-base">Contact for Price</CardTitle>
                <CardDescription>Customers contact you directly for pricing information</CardDescription>
              </div>
            </div>
          </CardHeader>
          {value === "contact" && (
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact-message">Contact Message (Optional)</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="e.g., Contact us for bulk pricing, custom quotes, or special offers..."
                    value={contactMessage || ""}
                    onChange={(e) => onContactMessageChange?.(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This message will be shown to customers along with your contact information
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Make an Offer */}
        <Card className={`cursor-pointer transition-colors ${value === "offer" ? "ring-2 ring-primary" : ""}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="offer" id="offer" />
              <Gavel className="w-5 h-5 text-purple-600" />
              <div>
                <CardTitle className="text-base">Make an Offer</CardTitle>
                <CardDescription>Allow customers to make offers on your product</CardDescription>
              </div>
            </div>
          </CardHeader>
          {value === "offer" && (
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="min-offer">Minimum Offer Amount ($) (Optional)</Label>
                  <Input
                    id="min-offer"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={minOffer || ""}
                    onChange={(e) => onMinOfferChange?.(Number.parseFloat(e.target.value) || 0)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Set a minimum amount for offers (leave empty for no minimum)
                  </p>
                </div>
                <div>
                  <Label htmlFor="offer-instructions">Offer Instructions (Optional)</Label>
                  <Textarea
                    id="offer-instructions"
                    placeholder="e.g., Please include your best offer. Serious inquiries only..."
                    value={offerInstructions || ""}
                    onChange={(e) => onOfferInstructionsChange?.(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Provide guidance to customers on making offers</p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </RadioGroup>
    </div>
  )
}
