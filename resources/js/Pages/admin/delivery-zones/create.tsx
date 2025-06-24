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
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X } from "lucide-react"

export default function CreateDeliveryZone() {
  const [postalCodes, setPostalCodes] = useState<string[]>([""])
  const [newPostalCode, setNewPostalCode] = useState("")

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    postal_codes: [""],
    delivery_fee: "",
    min_order_amount: "",
    max_delivery_time: "",
    is_active: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/delivery-zones", {
      ...data,
      postal_codes: postalCodes.filter((code) => code.trim() !== ""),
    })
  }

  const addPostalCode = () => {
    if (newPostalCode.trim() && !postalCodes.includes(newPostalCode.trim())) {
      setPostalCodes([...postalCodes, newPostalCode.trim()])
      setNewPostalCode("")
    }
  }

  const removePostalCode = (index: number) => {
    const newCodes = postalCodes.filter((_, i) => i !== index)
    setPostalCodes(newCodes)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addPostalCode()
    }
  }

  return (
    <AdminLayout>
      <Head title="Create Delivery Zone" />

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/delivery-zones">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create Delivery Zone</h1>
            <p className="text-muted-foreground">Add a new delivery zone and coverage area</p>
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
                  <Label htmlFor="name">Zone Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                    placeholder="e.g., Downtown Area"
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    placeholder="Zone description..."
                    rows={3}
                  />
                  {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData("is_active", checked)}
                  />
                  <Label htmlFor="is_active">Active Zone</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="delivery_fee">Delivery Fee ($)</Label>
                  <Input
                    id="delivery_fee"
                    type="number"
                    step="0.01"
                    value={data.delivery_fee}
                    onChange={(e) => setData("delivery_fee", e.target.value)}
                    error={errors.delivery_fee}
                    placeholder="5.99"
                  />
                  {errors.delivery_fee && <p className="text-sm text-red-600 mt-1">{errors.delivery_fee}</p>}
                </div>

                <div>
                  <Label htmlFor="min_order_amount">Minimum Order Amount ($)</Label>
                  <Input
                    id="min_order_amount"
                    type="number"
                    step="0.01"
                    value={data.min_order_amount}
                    onChange={(e) => setData("min_order_amount", e.target.value)}
                    error={errors.min_order_amount}
                    placeholder="25.00"
                  />
                  {errors.min_order_amount && <p className="text-sm text-red-600 mt-1">{errors.min_order_amount}</p>}
                </div>

                <div>
                  <Label htmlFor="max_delivery_time">Max Delivery Time (minutes)</Label>
                  <Input
                    id="max_delivery_time"
                    type="number"
                    value={data.max_delivery_time}
                    onChange={(e) => setData("max_delivery_time", e.target.value)}
                    error={errors.max_delivery_time}
                    placeholder="45"
                  />
                  {errors.max_delivery_time && <p className="text-sm text-red-600 mt-1">{errors.max_delivery_time}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Coverage Area</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="postal_code">Add Postal Codes</Label>
                <div className="flex gap-2">
                  <Input
                    id="postal_code"
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter postal code..."
                    className="flex-1"
                  />
                  <Button type="button" onClick={addPostalCode} disabled={!newPostalCode.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {postalCodes.length > 0 && postalCodes.some((code) => code.trim()) && (
                <div>
                  <Label>Postal Codes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {postalCodes.map(
                      (code, index) =>
                        code.trim() && (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            {code}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => removePostalCode(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ),
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/admin/delivery-zones">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? "Creating..." : "Create Zone"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
