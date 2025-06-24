"use client"

import type React from "react"
import { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { RoleSwitcher } from "@/components/account-conversion/role-switcher"
import { User, ShoppingCart, Heart, Search, MapPin, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UnifiedLayoutProps {
  children: React.ReactNode
}

export default function UnifiedLayout({ children }: UnifiedLayoutProps) {
  const { auth, cart } = usePage().props as any
  const [currentRole, setCurrentRole] = useState<"customer" | "vendor">("customer")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock user data with multiple roles
  const user = {
    ...auth.user,
    roles: ["customer", "vendor"], // User has both roles
    vendor_status: "approved",
    vendor_info: {
      store_name: "TechStore Pro",
      total_sales: 89750.5,
      total_orders: 1247,
    },
  }

  const handleRoleSwitch = (role: "customer" | "vendor") => {
    setCurrentRole(role)
    // In a real app, this would update the session/context
    // and potentially redirect to the appropriate dashboard
    if (role === "vendor") {
      window.location.href = "/vendor"
    } else {
      window.location.href = "/"
    }
  }

  const renderCustomerNav = () => (
    <>
      {/* Search Bar */}
      <div className="flex-1 max-w-lg mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input type="text" placeholder="Search products..." className="pl-10 pr-4 w-full" />
        </div>
      </div>

      {/* Customer Navigation */}
      <div className="flex items-center space-x-4">
        {/* Location */}
        <Button variant="ghost" size="sm" className="hidden md:flex">
          <MapPin className="w-4 h-4 mr-2" />
          Location
        </Button>

        {/* Wishlist */}
        <Link href="/wishlist">
          <Button variant="ghost" size="sm" className="relative">
            <Heart className="w-5 h-5" />
            <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
              0
            </Badge>
          </Button>
        </Link>

        {/* Cart */}
        <Link href="/cart">
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
              {cart?.items_count || 0}
            </Badge>
          </Button>
        </Link>
      </div>
    </>
  )

  const renderVendorNav = () => (
    <>
      {/* Vendor Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input type="text" placeholder="Search orders, products..." className="pl-10 pr-4 w-full" />
        </div>
      </div>

      {/* Vendor Navigation */}
      <div className="flex items-center space-x-4">
        {/* Quick Stats */}
        <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span>${user.vendor_info?.total_sales?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{user.vendor_info?.total_orders || 0} orders</span>
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Dasook</span>
            </Link>

            {/* Role-specific Navigation */}
            {currentRole === "customer" ? renderCustomerNav() : renderVendorNav()}

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Role Switcher */}
              {user.roles?.length > 1 && (
                <RoleSwitcher
                  currentRole={currentRole}
                  availableRoles={user.roles}
                  onRoleSwitch={handleRoleSwitch}
                  vendorStatus={user.vendor_status}
                />
              )}

              {/* User Dropdown */}
              {auth.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span className="hidden md:block">{auth.user.first_name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href={currentRole === "vendor" ? "/vendor/profile" : "/customer/profile"}>My Profile</Link>
                    </DropdownMenuItem>

                    {currentRole === "customer" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/customer/orders">My Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/customer/addresses">My Addresses</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/customer/wishlist">My Wishlist</Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    {currentRole === "vendor" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/vendor/products">My Products</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/vendor/orders">Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/vendor/analytics">Analytics</Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator />

                    {!user.roles?.includes("vendor") && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/account-conversion/become-vendor">Become a Vendor</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    <DropdownMenuItem asChild>
                      <Link href="/support">Support</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/logout" method="post">
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories Navigation - Only for Customer Mode */}
        {currentRole === "customer" && (
          <div className="border-t bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-8 py-3 overflow-x-auto">
                <Link
                  href="/categories"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap"
                >
                  All Categories
                </Link>
                <Link
                  href="/flash-sales"
                  className="text-sm font-medium text-red-600 hover:text-red-700 whitespace-nowrap"
                >
                  Flash Sales
                </Link>
                <Link
                  href="/collections"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap"
                >
                  Collections
                </Link>
                <Link
                  href="/brands"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap"
                >
                  Brands
                </Link>
                <Link
                  href="/vendors"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap"
                >
                  Stores
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer - Only for Customer Mode */}
      {currentRole === "customer" && (
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/help" className="text-gray-300 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-gray-300 hover:text-white">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="/delivery" className="text-gray-300 hover:text-white">
                      Delivery Info
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">About</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-300 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-gray-300 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/press" className="text-gray-300 hover:text-white">
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link href="/sustainability" className="text-gray-300 hover:text-white">
                      Sustainability
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Sell on Dasook</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/account-conversion/become-vendor" className="text-gray-300 hover:text-white">
                      Become a Vendor
                    </Link>
                  </li>
                  <li>
                    <Link href="/vendor/pricing" className="text-gray-300 hover:text-white">
                      Pricing Plans
                    </Link>
                  </li>
                  <li>
                    <Link href="/vendor/resources" className="text-gray-300 hover:text-white">
                      Resources
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-300 hover:text-white">
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-300 hover:text-white">
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-300 hover:text-white">
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-300 hover:text-white">
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Dasook. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
