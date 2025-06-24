"use client"

import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Shield, Star, Verified, Crown, Users } from "lucide-react"

interface ProfileHeaderProps {
  user: {
    id: number
    first_name: string
    last_name: string
    email: string
    avatar?: string
    role: "customer" | "vendor" | "admin"
    verified?: boolean
    premium?: boolean
    rating?: number
    total_orders?: number
    member_since?: string
  }
  onAvatarChange?: (file: File) => void
}

export function ProfileHeader({ user, onAvatarChange }: ProfileHeaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onAvatarChange) {
      onAvatarChange(file)
    }
  }

  const getRoleBadge = () => {
    switch (user.role) {
      case "admin":
        return (
          <Badge variant="destructive" className="flex items-center space-x-1">
            <Crown className="w-3 h-3" />
            <span>Admin</span>
          </Badge>
        )
      case "vendor":
        return (
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Vendor</span>
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Customer</span>
          </Badge>
        )
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar Section */}
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.first_name} ${user.last_name}`} />
              <AvatarFallback className="text-2xl">
                {user.first_name.charAt(0)}
                {user.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors"
            >
              <Camera className="w-4 h-4" />
            </label>
            <input id="avatar-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.first_name} {user.last_name}
              </h1>
              {user.verified && (
                <div className="flex items-center space-x-1 text-blue-600">
                  <Verified className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              )}
              {user.premium && (
                <div className="flex items-center space-x-1 text-yellow-600">
                  <Crown className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium">Premium</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 mb-3">{user.email}</p>

            <div className="flex flex-wrap items-center gap-3">
              {getRoleBadge()}

              {user.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{user.rating.toFixed(1)}</span>
                </div>
              )}

              {user.total_orders && (
                <Badge variant="outline">
                  {user.total_orders} {user.role === "vendor" ? "Sales" : "Orders"}
                </Badge>
              )}

              {user.member_since && (
                <span className="text-sm text-gray-500">Member since {new Date(user.member_since).getFullYear()}</span>
              )}
            </div>
          </div>

          {/* Security Status */}
          <div className="flex items-center space-x-2 text-green-600">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Account Secure</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
