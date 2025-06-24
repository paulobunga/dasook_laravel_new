"use client"

import type React from "react"

import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save } from "lucide-react"
import { Link, useForm } from "@inertiajs/react"

interface SubscriptionPlan {
  id: number
  name: string
  price: number
  features: string[]
}

interface CreateVendorProps {
  subscriptionPlans: SubscriptionPlan[]
}

export default function CreateVendor({ subscriptionPlans }: CreateVendorProps) {
  const { data, setData, post, processing, errors } = useForm({
    // User Information
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",

    // Store Information
    store_name: "",
    store_email: "",
    store_phone: "",
    store_description: "",
    store_address: "",
    store_city: "",
    store_state: "",
    store_postal_code: "",
    store_country: "",

    // Business Information
    business_name: "",
    business_type: "",
    tax_id: "",
    business_license: "",

    // Settings
    status: "pending",
    subscription_plan_id: "",
    commission_rate: 15,
    auto_approve: false,
    send_welcome_email: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/vendors")
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/vendors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Vendors
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Vendor</h1>
            <p className="text-gray-600">Add a new vendor to the marketplace</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* User Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Owner Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        error={errors.first_name}
                        required
                      />
                      {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        error={errors.last_name}
                        required
                      />
                      {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                        required
                      />
                      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        error={errors.phone}
                      />
                      {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                        required
                      />
                      {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                    </div>
                    <div>
                      <Label htmlFor="password_confirmation">Confirm Password</Label>
                      <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        error={errors.password_confirmation}
                        required
                      />
                      {errors.password_confirmation && (
                        <p className="text-sm text-red-600 mt-1">{errors.password_confirmation}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Store Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="store_name">Store Name</Label>
                      <Input
                        id="store_name"
                        value={data.store_name}
                        onChange={(e) => setData("store_name", e.target.value)}
                        error={errors.store_name}
                        required
                      />
                      {errors.store_name && <p className="text-sm text-red-600 mt-1">{errors.store_name}</p>}
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
                      {errors.store_email && <p className="text-sm text-red-600 mt-1">{errors.store_email}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="store_description">Store Description</Label>
                    <Textarea
                      id="store_description"
                      value={data.store_description}
                      onChange={(e) => setData("store_description", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="store_address">Store Address</Label>
                    <Input
                      id="store_address"
                      value={data.store_address}
                      onChange={(e) => setData("store_address", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="store_city">City</Label>
                      <Input
                        id="store_city"
                        value={data.store_city}
                        onChange={(e) => setData("store_city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="store_state">State/Province</Label>
                      <Input
                        id="store_state"
                        value={data.store_state}
                        onChange={(e) => setData("store_state", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="store_postal_code">Postal Code</Label>
                      <Input
                        id="store_postal_code"
                        value={data.store_postal_code}
                        onChange={(e) => setData("store_postal_code", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="business_name">Business Name</Label>
                      <Input
                        id="business_name"
                        value={data.business_name}
                        onChange={(e) => setData("business_name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="business_type">Business Type</Label>
                      <Select value={data.business_type} onValueChange={(value) => setData("business_type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="llc">LLC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tax_id">Tax ID</Label>
                      <Input id="tax_id" value={data.tax_id} onChange={(e) => setData("tax_id", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="business_license">Business License</Label>
                      <Input
                        id="business_license"
                        value={data.business_license}
                        onChange={(e) => setData("business_license", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Settings */}
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
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="commission_rate">Commission Rate (%)</Label>
                    <Input
                      id="commission_rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={data.commission_rate}
                      onChange={(e) => setData("commission_rate", Number.parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="auto_approve"
                        checked={data.auto_approve}
                        onCheckedChange={(checked) => setData("auto_approve", checked as boolean)}
                      />
                      <Label htmlFor="auto_approve">Auto-approve products</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="send_welcome_email"
                        checked={data.send_welcome_email}
                        onCheckedChange={(checked) => setData("send_welcome_email", checked as boolean)}
                      />
                      <Label htmlFor="send_welcome_email">Send welcome email</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="subscription_plan_id">Plan</Label>
                    <Select
                      value={data.subscription_plan_id}
                      onValueChange={(value) => setData("subscription_plan_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {subscriptionPlans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id.toString()}>
                            {plan.name} - ${plan.price}/month
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/vendors">Cancel</Link>
            </Button>
            <Button type="submit" disabled={processing}>
              <Save className="w-4 h-4 mr-2" />
              {processing ? "Creating..." : "Create Vendor"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
