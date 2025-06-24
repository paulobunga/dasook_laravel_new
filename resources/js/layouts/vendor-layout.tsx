"use client"

import type React from "react"
import { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Tag,
  Truck,
  MessageSquare,
  Star,
  DollarSign,
  Users,
  Zap,
  ImageIcon,
  FileText,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { RoleSwitcher } from "@/components/account-conversion/role-switcher"

interface VendorLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/vendor", icon: LayoutDashboard },
  { name: "Products", href: "/vendor/products", icon: Package },
  { name: "Orders", href: "/vendor/orders", icon: ShoppingCart },
  { name: "Collections", href: "/vendor/collections", icon: Tag },
  { name: "Flash Sales", href: "/vendor/flash-sales", icon: Zap },
  { name: "Coupons", href: "/vendor/coupons", icon: Tag },
  { name: "Delivery", href: "/vendor/delivery", icon: Truck },
  { name: "Reviews", href: "/vendor/reviews", icon: Star },
  { name: "Customers", href: "/vendor/customers", icon: Users },
  { name: "Messages", href: "/vendor/messages", icon: MessageSquare },
  { name: "Media", href: "/vendor/media", icon: ImageIcon },
  { name: "Reports", href: "/vendor/reports", icon: FileText },
  { name: "Payouts", href: "/vendor/payouts", icon: CreditCard },
  { name: "Analytics", href: "/vendor/analytics", icon: BarChart3 },
  { name: "Store Settings", href: "/vendor/settings", icon: Settings },
]

export default function VendorLayout({ children }: VendorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { auth, vendor, url } = usePage().props as any

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{vendor?.store_name?.charAt(0) || "V"}</span>
              </div>
              <span className="text-sm font-bold text-gray-900 truncate">{vendor?.store_name || "Vendor Panel"}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = url === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    isActive ? "bg-green-100 text-green-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{vendor?.store_name?.charAt(0) || "V"}</span>
              </div>
              <span className="text-sm font-bold text-gray-900 truncate">{vendor?.store_name || "Vendor Panel"}</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = url === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    isActive ? "bg-green-100 text-green-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="ml-4 lg:ml-0">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input type="text" placeholder="Search..." className="pl-10 pr-4 w-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Store Status */}
              <div className="hidden md:flex items-center space-x-2">
                <Badge variant={vendor?.status === "approved" ? "default" : "secondary"}>
                  {vendor?.status || "Pending"}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${vendor?.total_sales?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ShoppingCart className="w-4 h-4" />
                  <span>{vendor?.total_orders || 0}</span>
                </div>
              </div>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                  2
                </Badge>
              </Button>

              {/* Role Switcher */}
              <RoleSwitcher
                currentRole="vendor"
                availableRoles={["customer", "vendor"]}
                onRoleSwitch={(role) => {
                  if (role === "customer") {
                    window.location.href = "/"
                  }
                }}
                vendorStatus={vendor?.status}
              />

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  {auth.user?.first_name} {auth.user?.last_name}
                </span>
                <Link href="/logout" method="post">
                  <Button variant="ghost" size="sm">
                    Logout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Store Status Banner */}
        {vendor?.status !== "approved" && vendor?.status && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Bell className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-800">
                    {vendor?.status === "pending" &&
                      "Your store is pending approval. Complete your profile to get approved faster."}
                    {vendor?.status === "suspended" &&
                      "Your store has been suspended. Please contact support for assistance."}
                    {vendor?.status === "rejected" &&
                      "Your store application was rejected. Please review and resubmit."}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link href="/vendor/settings">
                  <Button size="sm" variant="outline">
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
