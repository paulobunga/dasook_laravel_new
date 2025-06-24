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
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, CreditCard, Settings } from "lucide-react"

interface PaymentMethod {
  id: number
  name: string
  type: "card" | "bank_transfer" | "digital_wallet" | "cash_on_delivery"
  provider: string
  description: string
  is_active: boolean
  processing_fee: number
  min_amount: number
  max_amount: number
  supported_currencies: string[]
  orders_count: number
  total_processed: number
  created_at: string
}

interface Props {
  payment_methods: {
    data: PaymentMethod[]
    current_page: number
    last_page: number
    total: number
  }
  filters: {
    search?: string
    type?: string
  }
}

export default function PaymentMethodsIndex({ payment_methods, filters }: Props) {
  const [search, setSearch] = useState(filters.search || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.get("/admin/payment-methods", { search }, { preserveState: true })
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this payment method?")) {
      router.delete(`/admin/payment-methods/${id}`)
    }
  }

  const toggleStatus = (id: number, currentStatus: boolean) => {
    router.patch(`/admin/payment-methods/${id}/toggle-status`, {
      is_active: !currentStatus,
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "card":
        return "default"
      case "bank_transfer":
        return "secondary"
      case "digital_wallet":
        return "outline"
      case "cash_on_delivery":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "bank_transfer":
        return <Settings className="h-4 w-4" />
      case "digital_wallet":
        return <CreditCard className="h-4 w-4" />
      case "cash_on_delivery":
        return <Settings className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <AdminLayout>
      <Head title="Payment Methods" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Payment Methods</h1>
            <p className="text-muted-foreground">Manage payment methods and processing options</p>
          </div>
          <Link href="/admin/payment-methods/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods Overview</CardTitle>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search payment methods..."
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
                  <TableHead>Method</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Processing Fee</TableHead>
                  <TableHead>Limits</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Processed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payment_methods.data.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getTypeIcon(method.type)}
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">{method.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTypeColor(method.type)}>{method.type.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell>{method.provider}</TableCell>
                    <TableCell>{method.processing_fee}%</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Min: ${method.min_amount}</div>
                        <div>Max: ${method.max_amount === -1 ? "No limit" : method.max_amount}</div>
                      </div>
                    </TableCell>
                    <TableCell>{method.orders_count}</TableCell>
                    <TableCell>${method.total_processed.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={method.is_active ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleStatus(method.id, method.is_active)}
                      >
                        {method.is_active ? "Active" : "Inactive"}
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
                            <Link href={`/admin/payment-methods/${method.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/payment-methods/${method.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(method.id)} className="text-red-600">
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
