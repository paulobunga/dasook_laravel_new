"use client"

import type React from "react"

import { useState } from "react"
import { Head, Link, router } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, RefreshCw } from "lucide-react"

interface VendorSubscription {
  id: number
  vendor: {
    id: number
    store_name: string
    email: string
  }
  subscription_plan: {
    id: number
    name: string
    price: number
  }
  start_date: string
  end_date: string
  status: "active" | "expired" | "cancelled" | "pending"
  auto_renew: boolean
  created_at: string
}

interface Props {
  vendor_subscriptions: {
    data: VendorSubscription[]
    current_page: number
    last_page: number
    total: number
  }
  filters: {
    search?: string
    status?: string
  }
}

export default function VendorSubscriptionsIndex({ vendor_subscriptions, filters }: Props) {
  const [search, setSearch] = useState(filters.search || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.get("/admin/vendor-subscriptions", { search }, { preserveState: true })
  }

  const handleCancel = (id: number) => {
    if (confirm("Are you sure you want to cancel this subscription?")) {
      router.patch(`/admin/vendor-subscriptions/${id}/cancel`)
    }
  }

  const handleRenew = (id: number) => {
    if (confirm("Are you sure you want to renew this subscription?")) {
      router.patch(`/admin/vendor-subscriptions/${id}/renew`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "expired":
        return "destructive"
      case "cancelled":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <AdminLayout>
      <Head title="Vendor Subscriptions" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Vendor Subscriptions</h1>
            <p className="text-muted-foreground">Manage vendor subscription plans and renewals</p>
          </div>
          <Link href="/admin/vendor-subscriptions/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Subscription
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subscriptions Overview</CardTitle>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by vendor or plan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Auto Renew</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendor_subscriptions.data.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{subscription.vendor.store_name}</div>
                        <div className="text-sm text-muted-foreground">{subscription.vendor.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{subscription.subscription_plan.name}</TableCell>
                    <TableCell>${subscription.subscription_plan.price}</TableCell>
                    <TableCell>{new Date(subscription.start_date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(subscription.end_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(subscription.status)}>{subscription.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={subscription.auto_renew ? "default" : "secondary"}>
                        {subscription.auto_renew ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/vendor-subscriptions/${subscription.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/vendor-subscriptions/${subscription.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          {subscription.status === "expired" && (
                            <DropdownMenuItem onClick={() => handleRenew(subscription.id)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Renew
                            </DropdownMenuItem>
                          )}
                          {subscription.status === "active" && (
                            <DropdownMenuItem onClick={() => handleCancel(subscription.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
