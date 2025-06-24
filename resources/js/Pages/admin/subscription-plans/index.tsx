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
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

interface SubscriptionPlan {
  id: number
  name: string
  description: string
  price: number
  duration_months: number
  features: string[]
  max_products: number
  commission_rate: number
  is_active: boolean
  created_at: string
  subscribers_count: number
}

interface Props {
  subscription_plans: {
    data: SubscriptionPlan[]
    current_page: number
    last_page: number
    total: number
  }
  filters: {
    search?: string
    status?: string
  }
}

export default function SubscriptionPlansIndex({ subscription_plans, filters }: Props) {
  const [search, setSearch] = useState(filters.search || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.get("/admin/subscription-plans", { search }, { preserveState: true })
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this subscription plan?")) {
      router.delete(`/admin/subscription-plans/${id}`)
    }
  }

  const toggleStatus = (id: number, currentStatus: boolean) => {
    router.patch(`/admin/subscription-plans/${id}/toggle-status`, {
      is_active: !currentStatus,
    })
  }

  return (
    <AdminLayout>
      <Head title="Subscription Plans" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Subscription Plans</h1>
            <p className="text-muted-foreground">Manage vendor subscription plans and pricing</p>
          </div>
          <Link href="/admin/subscription-plans/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Plan
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Plans Overview</CardTitle>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search plans..."
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
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Max Products</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Subscribers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscription_plans.data.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>${plan.price}</TableCell>
                    <TableCell>{plan.duration_months} months</TableCell>
                    <TableCell>{plan.max_products === -1 ? "Unlimited" : plan.max_products}</TableCell>
                    <TableCell>{plan.commission_rate}%</TableCell>
                    <TableCell>{plan.subscribers_count}</TableCell>
                    <TableCell>
                      <Badge
                        variant={plan.is_active ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleStatus(plan.id, plan.is_active)}
                      >
                        {plan.is_active ? "Active" : "Inactive"}
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
                            <Link href={`/admin/subscription-plans/${plan.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/subscription-plans/${plan.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(plan.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
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
