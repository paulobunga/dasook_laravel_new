"use client"

import type React from "react"
import { Head, useForm } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  PricingTypeSelector,
  type PricingType,
} from "@/components/pricing/pricing-type-selector"

interface Product {
  id: number
  name: string
  description: string
  short_description: string
  sku: string
  price: number
  compare_price: number
  cost_price: number
  stock_quantity: number
  min_stock_level: number
  category_id: number
  vendor_id: number
  status: "active" | "inactive" | "draft"
  is_featured: boolean
  is_digital: boolean
  track_inventory: boolean
  pricing_type: "fixed" | "contact" | "offer"
  price_ranges: { min_quantity: number; price: number }[] | null
  contact_message?: string
  min_offer?: number
  offer_instructions?: string
}

interface Category {
  id: number
  name: string
}

interface Vendor {
  id: number
  store_name: string
}

interface Props {
  product: Product
  categories: Category[]
  vendors: Vendor[]
}

export default function EditProduct({ product, categories, vendors }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name,
    description: product.description,
    short_description: product.short_description,
    sku: product.sku,
    price: product.price,
    compare_price: product.compare_price,
    cost_price: product.cost_price,
    stock_quantity: product.stock_quantity,
    min_stock_level: product.min_stock_level,
    category_id: product.category_id,
    vendor_id: product.vendor_id,
    status: product.status,
    is_featured: product.is_featured,
    is_digital: product.is_digital,
    track_inventory: product.track_inventory,
    pricing_type: product.pricing_type || "fixed",
    price_ranges: product.price_ranges || [],
    contact_message: product.contact_message || "",
    min_offer: product.min_offer,
    offer_instructions: product.offer_instructions || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/products/${product.id}`)
  }

  return (
    <AdminLayout>
      <Head title="Edit Product" />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">Update product information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  error={errors.name}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  error={errors.description}
                />
              </div>

              <div>
                <Label htmlFor="short_description">Short Description</Label>
                <Textarea
                  id="short_description"
                  value={data.short_description}
                  onChange={(e) => setData("short_description", e.target.value)}
                  error={errors.short_description}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category_id">Category</Label>
                  <Select
                    value={data.category_id.toString()}
                    onValueChange={(value) => setData("category_id", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="vendor_id">Vendor</Label>
                  <Select
                    value={data.vendor_id.toString()}
                    onValueChange={(value) => setData("vendor_id", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id.toString()}>
                          {vendor.store_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PricingTypeSelector
                value={data.pricing_type}
                onChange={(value) => setData("pricing_type", value)}
                price={data.price}
                onPriceChange={(value) => setData("price", value)}
                contactMessage={data.contact_message}
                onContactMessageChange={(value) =>
                  setData("contact_message", value)
                }
                minOffer={data.min_offer}
                onMinOfferChange={(value) => setData("min_offer", value)}
                offerInstructions={data.offer_instructions}
                onOfferInstructionsChange={(value) =>
                  setData("offer_instructions", value)
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={data.sku}
                    onChange={(e) => setData("sku", e.target.value)}
                    error={errors.sku}
                  />
                </div>

                <div>
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    value={data.stock_quantity}
                    onChange={(e) => setData("stock_quantity", Number.parseInt(e.target.value))}
                    error={errors.stock_quantity}
                  />
                </div>

                <div>
                  <Label htmlFor="min_stock_level">Min Stock Level</Label>
                  <Input
                    id="min_stock_level"
                    type="number"
                    value={data.min_stock_level}
                    onChange={(e) => setData("min_stock_level", Number.parseInt(e.target.value))}
                    error={errors.min_stock_level}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={data.status} onValueChange={(value) => setData("status", value as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={data.is_featured}
                    onCheckedChange={(checked) => setData("is_featured", checked)}
                  />
                  <Label htmlFor="is_featured">Featured Product</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_digital"
                    checked={data.is_digital}
                    onCheckedChange={(checked) => setData("is_digital", checked)}
                  />
                  <Label htmlFor="is_digital">Digital Product</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="track_inventory"
                    checked={data.track_inventory}
                    onCheckedChange={(checked) => setData("track_inventory", checked)}
                  />
                  <Label htmlFor="track_inventory">Track Inventory</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button type="submit" disabled={processing}>
              {processing ? "Updating..." : "Update Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
