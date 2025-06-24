"use client"

import type React from "react"

import { useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Calendar, MapPin, Bell, Shield, Eye, EyeOff, Camera, Save, AlertCircle } from "lucide-react"

interface UserProfile {
  id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth?: string
  gender?: string
  bio?: string
  avatar?: string
  location?: string
  language: string
  timezone: string
}

interface NotificationSettings {
  email_orders: boolean
  email_promotions: boolean
  email_newsletter: boolean
  sms_orders: boolean
  sms_promotions: boolean
  push_orders: boolean
  push_promotions: boolean
}

interface PrivacySettings {
  profile_visibility: "public" | "private"
  show_purchase_history: boolean
  show_wishlist: boolean
  allow_reviews_display: boolean
}

interface ProfileProps {
  user?: UserProfile
  notifications?: NotificationSettings
  privacy?: PrivacySettings
}

export default function CustomerProfile({ user, notifications, privacy }: ProfileProps) {
  // Mock data for demonstration
  const [profile, setProfile] = useState<UserProfile>(
    user || {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      date_of_birth: "1990-01-15",
      gender: "male",
      bio: "Love shopping for tech gadgets and home decor.",
      avatar: "/placeholder.svg?height=100&width=100",
      location: "New York, NY",
      language: "en",
      timezone: "America/New_York",
    },
  )

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(
    notifications || {
      email_orders: true,
      email_promotions: false,
      email_newsletter: true,
      sms_orders: true,
      sms_promotions: false,
      push_orders: true,
      push_promotions: false,
    },
  )

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(
    privacy || {
      profile_visibility: "public",
      show_purchase_history: false,
      show_wishlist: true,
      allow_reviews_display: true,
    },
  )

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  })

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setMessage({ type: "success", text: "Profile updated successfully!" })
      setIsLoading(false)
      setTimeout(() => setMessage(null), 3000)
    }, 1000)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.new_password !== passwordData.confirm_password) {
      setMessage({ type: "error", text: "New passwords do not match!" })
      return
    }

    if (passwordData.new_password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters long!" })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setMessage({ type: "success", text: "Password changed successfully!" })
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" })
      setIsLoading(false)
      setTimeout(() => setMessage(null), 3000)
    }, 1000)
  }

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <AlertCircle className="w-5 h-5" />
            <span>{message.text}</span>
          </div>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={profile.avatar || "/placeholder.svg"}
                        alt={`${profile.first_name} ${profile.last_name}`}
                      />
                      <AvatarFallback className="text-lg">
                        {profile.first_name.charAt(0)}
                        {profile.last_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Label htmlFor="avatar" className="cursor-pointer">
                        <div className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                          <Camera className="w-4 h-4" />
                          <span>Change Photo</span>
                        </div>
                      </Label>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="phone"
                          type="tel"
                          value={profile.phone || ""}
                          onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="date_of_birth"
                          type="date"
                          value={profile.date_of_birth || ""}
                          onChange={(e) => setProfile((prev) => ({ ...prev, date_of_birth: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={profile.gender || ""}
                        onValueChange={(value) => setProfile((prev) => ({ ...prev, gender: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="location"
                        value={profile.location || ""}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                        className="pl-10"
                        placeholder="City, State/Country"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio || ""}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us a bit about yourself..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={profile.language}
                        onValueChange={(value) => setProfile((prev) => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={profile.timezone}
                        onValueChange={(value) => setProfile((prev) => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          <SelectItem value="Europe/London">GMT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <Label htmlFor="current_password">Current Password *</Label>
                    <div className="relative">
                      <Input
                        id="current_password"
                        type={showPassword.current ? "text" : "password"}
                        value={passwordData.current_password}
                        onChange={(e) => setPasswordData((prev) => ({ ...prev, current_password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => ({ ...prev, current: !prev.current }))}
                      >
                        {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new_password">New Password *</Label>
                    <div className="relative">
                      <Input
                        id="new_password"
                        type={showPassword.new ? "text" : "password"}
                        value={passwordData.new_password}
                        onChange={(e) => setPasswordData((prev) => ({ ...prev, new_password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => ({ ...prev, new: !prev.new }))}
                      >
                        {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                  </div>

                  <div>
                    <Label htmlFor="confirm_password">Confirm New Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirm_password"
                        type={showPassword.confirm ? "text" : "password"}
                        value={passwordData.confirm_password}
                        onChange={(e) => setPasswordData((prev) => ({ ...prev, confirm_password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))}
                      >
                        {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      <Shield className="w-4 h-4 mr-2" />
                      {isLoading ? "Updating..." : "Change Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
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
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email_orders">Order Updates</Label>
                        <p className="text-sm text-gray-500">Get notified about order status changes</p>
                      </div>
                      <Switch
                        id="email_orders"
                        checked={notificationSettings.email_orders}
                        onCheckedChange={(checked) => handleNotificationChange("email_orders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email_promotions">Promotions & Deals</Label>
                        <p className="text-sm text-gray-500">Receive promotional offers and discounts</p>
                      </div>
                      <Switch
                        id="email_promotions"
                        checked={notificationSettings.email_promotions}
                        onCheckedChange={(checked) => handleNotificationChange("email_promotions", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email_newsletter">Newsletter</Label>
                        <p className="text-sm text-gray-500">Weekly newsletter with new products and tips</p>
                      </div>
                      <Switch
                        id="email_newsletter"
                        checked={notificationSettings.email_newsletter}
                        onCheckedChange={(checked) => handleNotificationChange("email_newsletter", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms_orders">Order Updates</Label>
                        <p className="text-sm text-gray-500">SMS alerts for important order updates</p>
                      </div>
                      <Switch
                        id="sms_orders"
                        checked={notificationSettings.sms_orders}
                        onCheckedChange={(checked) => handleNotificationChange("sms_orders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms_promotions">Flash Sales</Label>
                        <p className="text-sm text-gray-500">Get notified about limited-time offers</p>
                      </div>
                      <Switch
                        id="sms_promotions"
                        checked={notificationSettings.sms_promotions}
                        onCheckedChange={(checked) => handleNotificationChange("sms_promotions", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push_orders">Order Updates</Label>
                        <p className="text-sm text-gray-500">Push notifications for order status</p>
                      </div>
                      <Switch
                        id="push_orders"
                        checked={notificationSettings.push_orders}
                        onCheckedChange={(checked) => handleNotificationChange("push_orders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push_promotions">Deals & Offers</Label>
                        <p className="text-sm text-gray-500">Push notifications for special offers</p>
                      </div>
                      <Switch
                        id="push_promotions"
                        checked={notificationSettings.push_promotions}
                        onCheckedChange={(checked) => handleNotificationChange("push_promotions", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="profile_visibility">Profile Visibility</Label>
                  <Select
                    value={privacySettings.profile_visibility}
                    onValueChange={(value) => handlePrivacyChange("profile_visibility", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                      <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show_purchase_history">Show Purchase History</Label>
                      <p className="text-sm text-gray-500">Allow others to see your purchase history</p>
                    </div>
                    <Switch
                      id="show_purchase_history"
                      checked={privacySettings.show_purchase_history}
                      onCheckedChange={(checked) => handlePrivacyChange("show_purchase_history", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show_wishlist">Show Wishlist</Label>
                      <p className="text-sm text-gray-500">Make your wishlist visible to others</p>
                    </div>
                    <Switch
                      id="show_wishlist"
                      checked={privacySettings.show_wishlist}
                      onCheckedChange={(checked) => handlePrivacyChange("show_wishlist", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow_reviews_display">Display Reviews</Label>
                      <p className="text-sm text-gray-500">Show your reviews with your name</p>
                    </div>
                    <Switch
                      id="allow_reviews_display"
                      checked={privacySettings.allow_reviews_display}
                      onCheckedChange={(checked) => handlePrivacyChange("allow_reviews_display", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
