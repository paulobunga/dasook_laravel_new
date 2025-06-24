"use client"

import type React from "react"

import { useState } from "react"
import { Head, Link, useForm } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, X } from "lucide-react"

export default function CreateSubscriptionPlan() {
  const [features, setFeatures] = useState<string[]>([""])

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    price: "",
    duration_months: "",
    features: [""],
    max_products: "",
    commission_rate: "",
    is_active: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/subscription-plans", {
      ...data,
      features: features.filter((f) => f.trim() !== ""),
    })
  }

  const addFeature = () => {
    setFeatures([...features, ""])
  }

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index)
    setFeatures(newFeatures)
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  return (
    <AdminLayout>
      <Head title="Create Subscription Plan" />

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/subscription-plans">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create Subscription Plan</h1>
            <p className="text-muted-foreground">Add a new subscription plan for vendors</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                    placeholder="e.g., Basic Plan"
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    placeholder="Plan description..."
                    rows={3}
                  />
                  {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={data.price}
                      onChange={(e) => setData("price", e.target.value)}
                      error={errors.price}
                      placeholder="29.99"
                    />
                    {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <Label htmlFor="duration_months">Duration (Months)</Label>
                    <Input
                      id="duration_months"
                      type="number"
                      value={data.duration_months}
                      onChange={(e) => setData("duration_months", e.target.value)}
                      error={errors.duration_months}
                      placeholder="1"
                    />
                    {errors.duration_months && <p className="text-sm text-red-600 mt-1">{errors.duration_months}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Limits & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="max_products">Max Products</Label>
                  <Input
                    id="max_products"
                    type="number"
                    value={data.max_products}
                    onChange={(e) => setData("max_products", e.target.value)}
                    error={errors.max_products}
                    placeholder="100 (or -1 for unlimited)"
                  />
                  {errors.max_products && <p className="text-sm text-red-600 mt-1">{errors.max_products}</p>}
                </div>

                <div>
                  <Label htmlFor="commission_rate">Commission Rate (%)</Label>
                  <Input
                    id="commission_rate"
                    type="number"
                    step="0.01"
                    value={data.commission_rate}
                    onChange={(e) => setData("commission_rate", e.target.value)}
                    error={errors.commission_rate}
                    placeholder="5.00"
                  />
                  {errors.commission_rate && <p className="text-sm text-red-600 mt-1">{errors.commission_rate}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData("is_active", checked)}
                  />
                  <Label htmlFor="is_active">Active Plan</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Plan Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Enter feature..."
                    className="flex-1"
                  />
                  {features.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addFeature} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/admin/subscription-plans">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? "Creating..." : "Create Plan"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
