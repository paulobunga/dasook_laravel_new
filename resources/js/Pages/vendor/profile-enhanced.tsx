"use client"

import type React from "react"
import { useState } from "react"
import VendorLayout from "@/layouts/vendor-layout"
import { ProfileHeader } from "@/components/profile/profile-header"
import { DeviceManagement } from "@/components/profile/device-management"
import { LoginHistory } from "@/components/profile/login-history"
import { AdvancedPrivacySettings } from "@/components/profile/advanced-privacy-settings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Store,
  Shield,
  Bell,
  Star,
  TrendingUp,
  Package,
  DollarSign,
  Save,
  AlertCircle,
  CheckCircle,
  Globe,
  Clock,
  Award,
} from "lucide-react"

export default function EnhancedVendorProfile() {
  const [profile, setProfile] = useState({
    id: 1,
    first_name: "Michael",
    last_name: "Chen",
    email: "michael.chen@techstore.com",
    phone: "+1 (555) 987-6543",
    role: "vendor" as const,
    verified: true,
    premium: true,
    rating: 4.9,
    total_orders: 1247,
    member_since: "2021-06-15",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [businessInfo, setBusinessInfo] = useState({
    business_name: "TechStore Pro",
    business_type: "electronics",
    business_description: "Premium electronics and gadgets with expert customer service.",
    business_address: "123 Tech Street, San Francisco, CA 94105",
    business_phone: "+1 (555) 123-TECH",
    business_email: "support@techstore.com",
    website: "https://techstore.com",
    tax_id: "12-3456789",
    business_hours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "12:00", close: "16:00", closed: false },
    },
  })

  const [vendorStats, setVendorStats] = useState({
    total_products: 156,
    active_products: 142,
    total_sales: 89750.5,
    monthly_revenue: 12450.75,
    customer_rating: 4.9,
    total_reviews: 324,
    response_rate: 98,
    fulfillment_rate: 99.2,
    return_rate: 2.1,
  })

  const [businessPreferences, setBusinessPreferences] = useState({
    auto_accept_orders: true,
    vacation_mode: false,
    international_shipping: true,
    bulk_discounts: true,
    minimum_order_amount: 25,
    processing_time: "1-2",
    return_policy: "30-day",
    notification_preferences: {
      new_orders: true,
      low_inventory: true,
      customer_messages: true,
      reviews: true,
      payment_updates: true,
      policy_updates: false,
      marketing_tips: true,
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setMessage({ type: "success", text: "Profile updated successfully!" })
      setIsLoading(false)
      setTimeout(() => setMessage(null), 3000)
    }, 1000)
  }

  const handleAvatarChange = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <VendorLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={profile} onAvatarChange={handleAvatarChange} />

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{message.text}</span>
          </div>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Personal Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">First Name *</Label>
                        <Input
                          id="first_name"
                          value={profile.first_name}
                          onChange={(e) => setProfile((prev) => ({ ...prev, first_name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name *</Label>
                        <Input
                          id="last_name"
                          value={profile.last_name}
                          onChange={(e) => setProfile((prev) => ({ ...prev, last_name: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vendor Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Account Status</span>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Verification Status</span>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Subscription Plan</span>
                    <Badge className="bg-purple-100 text-purple-800">
                      <Award className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Sales</span>
                      <span className="font-medium">{profile.total_orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Vendor Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{profile.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Member Since</span>
                      <span className="font-medium">{new Date(profile.member_since).getFullYear()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Business Information Tab */}
          <TabsContent value="business">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Store className="w-5 h-5" />
                    <span>Business Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="business_name">Business Name *</Label>
                    <Input
                      id="business_name"
                      value={businessInfo.business_name}
                      onChange={(e) => setBusinessInfo((prev) => ({ ...prev, business_name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="business_type">Business Type</Label>
                    <Select
                      value={businessInfo.business_type}
                      onValueChange={(value) => setBusinessInfo((prev) => ({ ...prev, business_type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="home-garden">Home & Garden</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="sports">Sports & Outdoors</SelectItem>
                        <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="business_description">Business Description</Label>
                    <Textarea
                      id="business_description"
                      value={businessInfo.business_description}
                      onChange={(e) => setBusinessInfo((prev) => ({ ...prev, business_description: e.target.value }))}
                      placeholder="Describe your business..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="website"
                        type="url"
                        value={businessInfo.website}
                        onChange={(e) => setBusinessInfo((prev) => ({ ...prev, website: e.target.value }))}
                        className="pl-10"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tax_id">Tax ID</Label>
                    <Input
                      id="tax_id"
                      value={businessInfo.tax_id}
                      onChange={(e) => setBusinessInfo((prev) => ({ ...prev, tax_id: e.target.value }))}
                      placeholder="12-3456789"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Business Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(businessInfo.business_hours).map(([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="w-20">
                        <Label className="capitalize">{day}</Label>
                      </div>
                      <Switch
                        checked={!hours.closed}
                        onCheckedChange={(checked) =>
                          setBusinessInfo((prev) => ({
                            ...prev,
                            business_hours: {
                              ...prev.business_hours,
                              [day]: { ...hours, closed: !checked },
                            },
                          }))
                        }
                      />
                      {!hours.closed && (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="time"
                            value={hours.open}
                            onChange={(e) =>
                              setBusinessInfo((prev) => ({
                                ...prev,
                                business_hours: {
                                  ...prev.business_hours,
                                  [day]: { ...hours, open: e.target.value },
                                },
                              }))
                            }
                            className="w-24"
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            value={hours.close}
                            onChange={(e) =>
                              setBusinessInfo((prev) => ({
                                ...prev,
                                business_hours: {
                                  ...prev.business_hours,
                                  [day]: { ...hours, close: e.target.value },
                                },
                              }))
                            }
                            className="w-24"
                          />
                        </div>
                      )}
                      {hours.closed && <span className="text-gray-500">Closed</span>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Analytics Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold">{vendorStats.total_products}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold">${vendorStats.monthly_revenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Customer Rating</p>
                      <p className="text-2xl font-bold">{vendorStats.customer_rating}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-600 fill-current" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Response Rate</p>
                      <p className="text-2xl font-bold">{vendorStats.response_rate}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Fulfillment Rate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${vendorStats.fulfillment_rate}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{vendorStats.fulfillment_rate}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Response Rate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${vendorStats.response_rate}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{vendorStats.response_rate}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Return Rate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${vendorStats.return_rate * 10}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{vendorStats.return_rate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sales</span>
                    <span className="font-semibold">${vendorStats.total_sales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Products</span>
                    <span className="font-semibold">{vendorStats.active_products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-semibold">{vendorStats.total_reviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{vendorStats.customer_rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Business Preferences Tab */}
          <TabsContent value="preferences">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Accept Orders</Label>
                      <p className="text-sm text-gray-600">Automatically accept orders without manual review</p>
                    </div>
                    <Switch
                      checked={businessPreferences.auto_accept_orders}
                      onCheckedChange={(checked) =>
                        setBusinessPreferences((prev) => ({ ...prev, auto_accept_orders: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Vacation Mode</Label>
                      <p className="text-sm text-gray-600">Temporarily pause new orders</p>
                    </div>
                    <Switch
                      checked={businessPreferences.vacation_mode}
                      onCheckedChange={(checked) =>
                        setBusinessPreferences((prev) => ({ ...prev, vacation_mode: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>International Shipping</Label>
                      <p className="text-sm text-gray-600">Accept orders from international customers</p>
                    </div>
                    <Switch
                      checked={businessPreferences.international_shipping}
                      onCheckedChange={(checked) =>
                        setBusinessPreferences((prev) => ({ ...prev, international_shipping: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Bulk Discounts</Label>
                      <p className="text-sm text-gray-600">Offer discounts for bulk orders</p>
                    </div>
                    <Switch
                      checked={businessPreferences.bulk_discounts}
                      onCheckedChange={(checked) =>
                        setBusinessPreferences((prev) => ({ ...prev, bulk_discounts: checked }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Minimum Order Amount ($)</Label>
                    <Input
                      type="number"
                      value={businessPreferences.minimum_order_amount}
                      onChange={(e) =>
                        setBusinessPreferences((prev) => ({
                          ...prev,
                          minimum_order_amount: Number.parseInt(e.target.value),
                        }))
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Processing Time</Label>
                    <Select
                      value={businessPreferences.processing_time}
                      onValueChange={(value) => setBusinessPreferences((prev) => ({ ...prev, processing_time: value }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="same-day">Same Day</SelectItem>
                        <SelectItem value="1-2">1-2 Business Days</SelectItem>
                        <SelectItem value="3-5">3-5 Business Days</SelectItem>
                        <SelectItem value="1-week">1 Week</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Return Policy</Label>
                    <Select
                      value={businessPreferences.return_policy}
                      onValueChange={(value) => setBusinessPreferences((prev) => ({ ...prev, return_policy: value }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-returns">No Returns</SelectItem>
                        <SelectItem value="7-day">7 Days</SelectItem>
                        <SelectItem value="14-day">14 Days</SelectItem>
                        <SelectItem value="30-day">30 Days</SelectItem>
                        <SelectItem value="60-day">60 Days</SelectItem>
                        <SelectItem value="90-day">90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(businessPreferences.notification_preferences).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <Label>{key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</Label>
                        <p className="text-sm text-gray-600">
                          {key === "new_orders" && "Get notified when you receive new orders"}
                          {key === "low_inventory" && "Alert when product inventory is running low"}
                          {key === "customer_messages" && "Notifications for customer inquiries"}
                          {key === "reviews" && "New customer reviews and ratings"}
                          {key === "payment_updates" && "Payment and payout notifications"}
                          {key === "policy_updates" && "Platform policy and terms updates"}
                          {key === "marketing_tips" && "Tips and insights to grow your business"}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) =>
                          setBusinessPreferences((prev) => ({
                            ...prev,
                            notification_preferences: { ...prev.notification_preferences, [key]: checked },
                          }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Account Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-gray-600">Last changed 2 months ago</p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Secure your vendor account with 2FA</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">API Keys</h4>
                      <p className="text-sm text-gray-600">Manage API access for integrations</p>
                    </div>
                    <Button variant="outline">Manage Keys</Button>
                  </div>
                </CardContent>
              </Card>

              <LoginHistory />
            </div>
          </TabsContent>

          {/* Device Management Tab */}
          <TabsContent value="devices">
            <DeviceManagement />
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <AdvancedPrivacySettings />
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  )
}
