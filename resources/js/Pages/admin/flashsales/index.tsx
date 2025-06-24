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
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Zap, Clock } from "lucide-react"

interface FlashSale {
  id: number
  name: string
  description: string
  discount_percentage: number
  start_date: string
  end_date: string
  is_active: boolean
  products_count: number
  orders_count: number
  total_revenue: number
  created_at: string
  status: "upcoming" | "active" | "expired"
}

interface Props {
  flashsales: {
    data: FlashSale[]
    current_page: number
    last_page: number
    total: number
  }
  filters: {
    search?: string
    status?: string
  }
}

export default function FlashSalesIndex({ flashsales, filters }: Props) {
  const [search, setSearch] = useState(filters.search || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.get("/admin/flashsales", { search }, { preserveState: true })
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this flash sale?")) {
      router.delete(`/admin/flashsales/${id}`)
    }
  }

  const toggleStatus = (id: number, currentStatus: boolean) => {
    router.patch(`/admin/flashsales/${id}/toggle-status`, {
      is_active: !currentStatus,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "upcoming":
        return "outline"
      case "expired":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getTimeRemaining = (endDate: string) => {
    const now = new Date()
    const end = new Date(endDate)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Expired"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  return (
    <AdminLayout>
      <Head title="Flash Sales" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Flash Sales</h1>
            <p className="text-muted-foreground">Manage flash sales and promotional campaigns</p>
          </div>
          <Link href="/admin/flashsales/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Flash Sale
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Flash Sales Overview</CardTitle>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search flash sales..."
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
                  <TableHead>Sale Name</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flashsales.data.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <div>
                          <div className="font-medium">{sale.name}</div>
                          <div className="text-sm text-muted-foreground">{sale.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{sale.discount_percentage}% OFF</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(sale.start_date).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">to {new Date(sale.end_date).toLocaleDateString()}</div>
                        {sale.status === "active" && (
                          <div className="flex items-center gap-1 text-orange-600 mt-1">
                            <Clock className="h-3 w-3" />
                            {getTimeRemaining(sale.end_date)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{sale.products_count}</TableCell>
                    <TableCell>{sale.orders_count}</TableCell>
                    <TableCell>${sale.total_revenue.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(sale.status)}>{sale.status}</Badge>
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
                            <Link href={`/admin/flashsales/${sale.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/flashsales/${sale.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(sale.id)} className="text-red-600">
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
