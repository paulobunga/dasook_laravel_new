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

interface Vendor {
  id: number
  user_id: number
  store_name: string
  store_description: string
  store_logo: string
  store_cover_image: string
  store_address: string
  store_phone: string
  store_email: string
  commission_rate: number
  status: "active" | "inactive" | "pending" | "suspended"
  is_featured: boolean
  created_at: string
  updated_at: string
}

interface Props {
  vendor: Vendor
}

export default function EditVendor({ vendor }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    store_name: vendor.store_name,
    store_description: vendor.store_description,
    store_address: vendor.store_address,
    store_phone: vendor.store_phone,
    store_email: vendor.store_email,
    commission_rate: vendor.commission_rate,
    status: vendor.status,
    is_featured: vendor.is_featured,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/vendors/${vendor.id}`)
  }

  return (
    <AdminLayout>
      <Head title="Edit Vendor" />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Vendor</h1>
          <p className="text-muted-foreground">Update vendor information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="store_name">Store Name</Label>
                  <Input
                    id="store_name"
                    value={data.store_name}
                    onChange={(e) => setData("store_name", e.target.value)}
                    error={errors.store_name}
                  />
                </div>

                <div>
                  <Label htmlFor="store_email">Store Email</Label>
                  <Input
                    id="store_email"
                    type="email"
                    value={data.store_email}
                    onChange={(e) => setData("store_email", e.target.value)}
                    error={errors.store_email}
                  />
                </div>

                <div>
                  <Label htmlFor="store_phone">Store Phone</Label>
                  <Input
                    id="store_phone"
                    value={data.store_phone}
                    onChange={(e) => setData("store_phone", e.target.value)}
                    error={errors.store_phone}
                  />
                </div>

                <div>
                  <Label htmlFor="commission_rate">Commission Rate (%)</Label>
                  <Input
                    id="commission_rate"
                    type="number"
                    step="0.01"
                    value={data.commission_rate}
                    onChange={(e) => setData("commission_rate", Number.parseFloat(e.target.value))}
                    error={errors.commission_rate}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="store_description">Store Description</Label>
                <Textarea
                  id="store_description"
                  value={data.store_description}
                  onChange={(e) => setData("store_description", e.target.value)}
                  error={errors.store_description}
                />
              </div>

              <div>
                <Label htmlFor="store_address">Store Address</Label>
                <Textarea
                  id="store_address"
                  value={data.store_address}
                  onChange={(e) => setData("store_address", e.target.value)}
                  error={errors.store_address}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={data.status} onValueChange={(value) => setData("status", value as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={data.is_featured}
                    onCheckedChange={(checked) => setData("is_featured", checked)}
                  />
                  <Label htmlFor="is_featured">Featured Vendor</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={processing}>
                  {processing ? "Updating..." : "Update Vendor"}
                </Button>
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
