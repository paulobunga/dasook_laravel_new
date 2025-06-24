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
import { PricingTypeSelector, type PricingType } from "@/components/pricing/pricing-type-selector"

interface Category {
  id: number
  name: string
}

interface Vendor {
  id: number
  store_name: string
}

interface Props {
  categories: Category[]
  vendors: Vendor[]
}

export default function CreateProduct({ categories, vendors }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    short_description: "",
    sku: "",
    pricing_type: "fixed" as PricingType,
    price: "",
    compare_price: "",
    cost_price: "",
    contact_message: "",
    min_offer: "",
    offer_instructions: "",
    stock_quantity: "",
    min_stock_level: "",
    weight: "",
    dimensions: "",
    category_id: "",
    vendor_id: "",
    status: "draft",
    is_featured: false,
    is_digital: false,
    track_inventory: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/products")
  }

  return (
    <AdminLayout>
      <Head title="Create Product" />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Product</h1>
          <p className="text-muted-foreground">Add a new product</p>
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
                  <Select value={data.category_id} onValueChange={(value) => setData("category_id", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Select value={data.vendor_id} onValueChange={(value) => setData("vendor_id", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
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
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <PricingTypeSelector
                value={data.pricing_type}
                onChange={(type) => setData("pricing_type", type)}
                price={Number.parseFloat(data.price) || undefined}
                onPriceChange={(price) => setData("price", price.toString())}
                contactMessage={data.contact_message}
                onContactMessageChange={(message) => setData("contact_message", message)}
                minOffer={Number.parseFloat(data.min_offer) || undefined}
                onMinOfferChange={(amount) => setData("min_offer", amount.toString())}
                offerInstructions={data.offer_instructions}
                onOfferInstructionsChange={(instructions) => setData("offer_instructions", instructions)}
              />

              {data.pricing_type === "fixed" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="compare_price">Compare Price</Label>
                    <Input
                      id="compare_price"
                      type="number"
                      step="0.01"
                      value={data.compare_price}
                      onChange={(e) => setData("compare_price", e.target.value)}
                      error={errors.compare_price}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost_price">Cost Price</Label>
                    <Input
                      id="cost_price"
                      type="number"
                      step="0.01"
                      value={data.cost_price}
                      onChange={(e) => setData("cost_price", e.target.value)}
                      error={errors.cost_price}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    onChange={(e) => setData("stock_quantity", e.target.value)}
                    error={errors.stock_quantity}
                  />
                </div>

                <div>
                  <Label htmlFor="min_stock_level">Min Stock Level</Label>
                  <Input
                    id="min_stock_level"
                    type="number"
                    value={data.min_stock_level}
                    onChange={(e) => setData("min_stock_level", e.target.value)}
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
                <Select value={data.status} onValueChange={(value) => setData("status", value)}>
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
              {processing ? "Creating..." : "Create Product"}
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
