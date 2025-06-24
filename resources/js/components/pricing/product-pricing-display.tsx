"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Gavel, Phone, Mail } from "lucide-react"
import { ContactVendorDialog } from "./contact-vendor-dialog"
import { MakeOfferDialog } from "./make-offer-dialog"
import { useState } from "react"

export interface ProductPricing {
  type: "fixed" | "contact" | "offer"
  price?: number
  sale_price?: number
  contact_message?: string
  min_offer?: number
  offer_instructions?: string
}

interface Vendor {
  id: number
  store_name: string
  phone?: string
  email: string
  response_time?: string
}

interface ProductPricingDisplayProps {
  pricing: ProductPricing
  vendor: Vendor
  productId: number
  productName: string
  size?: "sm" | "md" | "lg"
  showVendorInfo?: boolean
}

export function ProductPricingDisplay({
  pricing,
  vendor,
  productId,
  productName,
  size = "md",
  showVendorInfo = true,
}: ProductPricingDisplayProps) {
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [showOfferDialog, setShowOfferDialog] = useState(false)

  const isSmall = size === "sm"
  const isMedium = size === "md"
  const isLarge = size === "lg"

  if (pricing.type === "fixed") {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {pricing.sale_price ? (
            <div className="flex items-center gap-2">
              <span className={`font-bold text-red-600 ${isLarge ? "text-2xl" : isMedium ? "text-xl" : "text-lg"}`}>
                ${pricing.sale_price.toFixed(2)}
              </span>
              <span className={`text-muted-foreground line-through ${isLarge ? "text-lg" : "text-sm"}`}>
                ${pricing.price?.toFixed(2)}
              </span>
              <Badge variant="destructive" className="text-xs">
                Sale
              </Badge>
            </div>
          ) : (
            <span className={`font-bold ${isLarge ? "text-2xl" : isMedium ? "text-xl" : "text-lg"}`}>
              ${pricing.price?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    )
  }

  if (pricing.type === "contact") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <span className={`font-semibold text-blue-600 ${isLarge ? "text-lg" : "text-base"}`}>Contact for Price</span>
        </div>

        {pricing.contact_message && !isSmall && (
          <p className="text-sm text-muted-foreground">{pricing.contact_message}</p>
        )}

        <div className="flex flex-col gap-2">
          <Button onClick={() => setShowContactDialog(true)} className="w-full" size={isSmall ? "sm" : "default"}>
            <Mail className="w-4 h-4 mr-2" />
            Contact Vendor
          </Button>

          {showVendorInfo && vendor.phone && !isSmall && (
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${vendor.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>
          )}
        </div>

        {showVendorInfo && vendor.response_time && !isSmall && (
          <p className="text-xs text-muted-foreground">Typical response time: {vendor.response_time}</p>
        )}

        <ContactVendorDialog
          open={showContactDialog}
          onOpenChange={setShowContactDialog}
          vendor={vendor}
          productId={productId}
          productName={productName}
        />
      </div>
    )
  }

  if (pricing.type === "offer") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Gavel className="w-5 h-5 text-purple-600" />
          <span className={`font-semibold text-purple-600 ${isLarge ? "text-lg" : "text-base"}`}>Make an Offer</span>
        </div>

        {pricing.min_offer && (
          <p className="text-sm text-muted-foreground">Minimum offer: ${pricing.min_offer.toFixed(2)}</p>
        )}

        {pricing.offer_instructions && !isSmall && (
          <p className="text-sm text-muted-foreground">{pricing.offer_instructions}</p>
        )}

        <Button onClick={() => setShowOfferDialog(true)} className="w-full" size={isSmall ? "sm" : "default"}>
          <Gavel className="w-4 h-4 mr-2" />
          Make an Offer
        </Button>

        <MakeOfferDialog
          open={showOfferDialog}
          onOpenChange={setShowOfferDialog}
          vendor={vendor}
          productId={productId}
          productName={productName}
          minOffer={pricing.min_offer}
          instructions={pricing.offer_instructions}
        />
      </div>
    )
  }

  return null
}
