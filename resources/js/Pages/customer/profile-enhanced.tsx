"use client"

import type React from "react"
import { useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { ProfileHeader } from "@/components/profile/profile-header"
import { DeviceManagement } from "@/components/profile/device-management"
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
import { Shield, Bell, Star, Gift, Truck, Save, AlertCircle, CheckCircle } from "lucide-react"

interface EnhancedCustomerProfileProps {
  user?: any
  preferences?: any
  addresses?: any[]
  paymentMethods?: any[]
}

export default function EnhancedCustomerProfile({
  user,
  preferences,
  addresses,
  paymentMethods,
}: EnhancedCustomerProfileProps) {
  // Mock user data
  const [profile, setProfile] = useState({
    id: 1,
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    date_of_birth: "1992-03-15",
    gender: "female",
    bio: "Love discovering unique products and supporting local businesses.",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "San Francisco, CA",
    language: "en",
    timezone: "America/Los_Angeles",
    role: "customer" as const,
    verified: true,
    premium: true,
    rating: 4.8,
    total_orders: 47,
    member_since: "2022-01-15",
  })

  const [shoppingPreferences, setShoppingPreferences] = useState({
    favorite_categories: ["electronics", "home-decor", "fashion"],
    price_range: "mid-range",
    brand_preferences: ["eco-friendly", "local-brands"],
    delivery_preferences: {
      preferred_time: "evening",
      special_instructions: "Leave at front door",
      eco_packaging: true,
    },
    notification_preferences: {
      price_drops: true,
      back_in_stock: true,
      new_arrivals: false,
      flash_sales: true,
      order_updates: true,
      delivery_updates: true,
      review_reminders: false,
    },
  })

  const [loyaltyInfo, setLoyaltyInfo] = useState({
    tier: "Gold",
    points: 2450,
    next_tier_points: 500,
    lifetime_savings: 245.5,
    referrals: 8,
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
    <CustomerLayout>
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
            <TabsTrigger value="preferences">Shopping</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Enhanced Profile Tab */}
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

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio || ""}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                        rows={3}
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
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Email Verification</span>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Phone Verification</span>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Premium Status</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Premium
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Orders</span>
                      <span className="font-medium">{profile.total_orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Customer Rating</span>
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

          {/* Shopping Preferences Tab */}
          <TabsContent value="preferences">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shopping Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Favorite Categories</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["electronics", "fashion", "home-decor", "books", "sports", "beauty"].map((category) => (
                        <Badge
                          key={category}
                          variant={shoppingPreferences.favorite_categories.includes(category) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            setShoppingPreferences((prev) => ({
                              ...prev,
                              favorite_categories: prev.favorite_categories.includes(category)
                                ? prev.favorite_categories.filter((c) => c !== category)
                                : [...prev.favorite_categories, category],
                            }))
                          }}
                        >
                          {category.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Price Range Preference</Label>
                    <Select
                      value={shoppingPreferences.price_range}
                      onValueChange={(value) => setShoppingPreferences((prev) => ({ ...prev, price_range: value }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget-friendly</SelectItem>
                        <SelectItem value="mid-range">Mid-range</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Brand Preferences</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["eco-friendly", "local-brands", "premium-brands", "budget-brands"].map((brand) => (
                        <Badge
                          key={brand}
                          variant={shoppingPreferences.brand_preferences.includes(brand) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            setShoppingPreferences((prev) => ({
                              ...prev,
                              brand_preferences: prev.brand_preferences.includes(brand)
                                ? prev.brand_preferences.filter((b) => b !== brand)
                                : [...prev.brand_preferences, brand],
                            }))
                          }}
                        >
                          {brand.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Delivery Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Preferred Delivery Time</Label>
                    <Select
                      value={shoppingPreferences.delivery_preferences.preferred_time}
                      onValueChange={(value) =>
                        setShoppingPreferences((prev) => ({
                          ...prev,
                          delivery_preferences: { ...prev.delivery_preferences, preferred_time: value },
                        }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                        <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Special Instructions</Label>
                    <Textarea
                      value={shoppingPreferences.delivery_preferences.special_instructions}
                      onChange={(e) =>
                        setShoppingPreferences((prev) => ({
                          ...prev,
                          delivery_preferences: { ...prev.delivery_preferences, special_instructions: e.target.value },
                        }))
                      }
                      placeholder="e.g., Leave at front door, Ring doorbell twice..."
                      rows={3}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Eco-Friendly Packaging</Label>
                      <p className="text-sm text-gray-600">Use sustainable packaging when available</p>
                    </div>
                    <Switch
                      checked={shoppingPreferences.delivery_preferences.eco_packaging}
                      onCheckedChange={(checked) =>
                        setShoppingPreferences((prev) => ({
                          ...prev,
                          delivery_preferences: { ...prev.delivery_preferences, eco_packaging: checked },
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Loyalty Program Tab */}
          <TabsContent value="loyalty">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5" />
                    <span>Loyalty Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-semibold">{loyaltyInfo.tier} Member</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Current Points</span>
                      <span className="font-semibold">{loyaltyInfo.points.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Points to Next Tier</span>
                      <span className="font-semibold">{loyaltyInfo.next_tier_points}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lifetime Savings</span>
                      <span className="font-semibold text-green-600">${loyaltyInfo.lifetime_savings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Successful Referrals</span>
                      <span className="font-semibold">{loyaltyInfo.referrals}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to Platinum</span>
                      <span>
                        {loyaltyInfo.points}/{loyaltyInfo.points + loyaltyInfo.next_tier_points}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-600 h-2 rounded-full"
                        style={{
                          width: `${(loyaltyInfo.points / (loyaltyInfo.points + loyaltyInfo.next_tier_points)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rewards & Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-green-800">Free Shipping</h4>
                        <p className="text-sm text-green-600">On all orders over $50</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-800">Early Access</h4>
                        <p className="text-sm text-blue-600">To sales and new products</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-purple-800">Birthday Bonus</h4>
                        <p className="text-sm text-purple-600">Special discount on your birthday</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">Priority Support</h4>
                        <p className="text-sm text-gray-600">Faster customer service response</p>
                      </div>
                      <span className="text-sm text-gray-500">Platinum Tier</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Gift className="w-4 h-4 mr-2" />
                    Redeem Points
                  </Button>
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
                    <span>Password & Authentication</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Backup Codes</h4>
                      <p className="text-sm text-gray-600">Generate backup codes for account recovery</p>
                    </div>
                    <Button variant="outline">Generate Codes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Device Management Tab */}
          <TabsContent value="devices">
            <DeviceManagement />
          </TabsContent>

          {/* Enhanced Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Shopping Notifications</h3>
                  <div className="space-y-4">
                    {Object.entries(shoppingPreferences.notification_preferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label>{key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</Label>
                          <p className="text-sm text-gray-600">
                            {key === "price_drops" && "Get notified when items in your wishlist go on sale"}
                            {key === "back_in_stock" && "Alert when out-of-stock items become available"}
                            {key === "new_arrivals" && "Notifications about new products in your favorite categories"}
                            {key === "flash_sales" && "Limited-time offers and flash sales"}
                            {key === "order_updates" && "Updates about your order status"}
                            {key === "delivery_updates" && "Real-time delivery tracking notifications"}
                            {key === "review_reminders" && "Reminders to review your purchases"}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setShoppingPreferences((prev) => ({
                              ...prev,
                              notification_preferences: { ...prev.notification_preferences, [key]: checked },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Privacy Tab */}
          <TabsContent value="privacy">
            <AdvancedPrivacySettings />
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
