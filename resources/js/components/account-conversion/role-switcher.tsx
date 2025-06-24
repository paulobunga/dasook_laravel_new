"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Store, ShoppingBag, ChevronDown, CheckCircle } from "lucide-react"

interface RoleSwitcherProps {
  currentRole: "customer" | "vendor"
  availableRoles: ("customer" | "vendor")[]
  onRoleSwitch: (role: "customer" | "vendor") => void
  vendorStatus?: "pending" | "approved" | "suspended" | "rejected"
}

export function RoleSwitcher({ currentRole, availableRoles, onRoleSwitch, vendorStatus }: RoleSwitcherProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSwitch = async (role: "customer" | "vendor") => {
    if (role === currentRole) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      onRoleSwitch(role)
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleIcon = (role: "customer" | "vendor") => {
    return role === "customer" ? <ShoppingBag className="w-4 h-4" /> : <Store className="w-4 h-4" />
  }

  const getRoleLabel = (role: "customer" | "vendor") => {
    return role === "customer" ? "Customer" : "Vendor"
  }

  const getVendorStatusBadge = () => {
    if (!vendorStatus) return null

    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      approved: { color: "bg-green-100 text-green-800", label: "Active" },
      suspended: { color: "bg-red-100 text-red-800", label: "Suspended" },
      rejected: { color: "bg-gray-100 text-gray-800", label: "Rejected" },
    }

    const config = statusConfig[vendorStatus]
    return (
      <Badge className={`${config.color} ml-2`}>
        {vendorStatus === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
        {config.label}
      </Badge>
    )
  }

  if (availableRoles.length <= 1) {
    return (
      <div className="flex items-center space-x-2">
        {getRoleIcon(currentRole)}
        <span className="font-medium">{getRoleLabel(currentRole)}</span>
        {currentRole === "vendor" && getVendorStatusBadge()}
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2" disabled={isLoading}>
          {getRoleIcon(currentRole)}
          <span>{getRoleLabel(currentRole)}</span>
          {currentRole === "vendor" && getVendorStatusBadge()}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium text-gray-700">Switch Role</div>
        <DropdownMenuSeparator />

        {availableRoles.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => handleRoleSwitch(role)}
            className={`flex items-center space-x-2 ${currentRole === role ? "bg-blue-50" : ""}`}
          >
            {getRoleIcon(role)}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span>{getRoleLabel(role)}</span>
                {currentRole === role && <CheckCircle className="w-4 h-4 text-blue-600" />}
              </div>
              <p className="text-xs text-gray-500">
                {role === "customer" ? "Shop and manage orders" : "Manage your store and products"}
              </p>
            </div>
          </DropdownMenuItem>
        ))}

        {!availableRoles.includes("vendor") && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center space-x-2 text-blue-600">
              <Store className="w-4 h-4" />
              <div>
                <div>Become a Vendor</div>
                <p className="text-xs text-gray-500">Start selling on our platform</p>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
