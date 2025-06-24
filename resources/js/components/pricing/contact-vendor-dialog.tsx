"use client"

import type React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useForm } from "@inertiajs/react"
import { Mail, Phone, Clock, Store } from "lucide-react"

interface Vendor {
  id: number
  store_name: string
  phone?: string
  email: string
  response_time?: string
}

interface ContactVendorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendor: Vendor
  productId: number
  productName: string
}

export function ContactVendorDialog({ open, onOpenChange, vendor, productId, productName }: ContactVendorDialogProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    message: "",
    inquiry_type: "pricing",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/products/${productId}/contact-vendor`, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Vendor</DialogTitle>
          <DialogDescription>
            Get in touch with {vendor.store_name} about "{productName}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Vendor Info */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              <span className="font-medium">{vendor.store_name}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>{vendor.email}</span>
            </div>

            {vendor.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{vendor.phone}</span>
              </div>
            )}

            {vendor.response_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <Badge variant="secondary" className="text-xs">
                  Responds in {vendor.response_time}
                </Badge>
              </div>
            )}
          </div>

          {/* Contact Form */}
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
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Hi, I'm interested in this product and would like to know more about pricing and availability..."
                value={data.message}
                onChange={(e) => setData("message", e.target.value)}
                error={errors.message}
                rows={4}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={processing} className="flex-1">
                {processing ? "Sending..." : "Send Message"}
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
