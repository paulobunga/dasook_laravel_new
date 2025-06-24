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
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, MapPin } from "lucide-react"

interface DeliveryZone {
  id: number
  name: string
  description: string
  postal_codes: string[]
  delivery_fee: number
  min_order_amount: number
  max_delivery_time: number
  is_active: boolean
  created_at: string
  orders_count: number
}

interface Props {
  delivery_zones: {
    data: DeliveryZone[]
    current_page: number
    last_page: number
    total: number
  }
  filters: {
    search?: string
    status?: string
  }
}

export default function DeliveryZonesIndex({ delivery_zones, filters }: Props) {
  const [search, setSearch] = useState(filters.search || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.get("/admin/delivery-zones", { search }, { preserveState: true })
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this delivery zone?")) {
      router.delete(`/admin/delivery-zones/${id}`)
    }
  }

  const toggleStatus = (id: number, currentStatus: boolean) => {
    router.patch(`/admin/delivery-zones/${id}/toggle-status`, {
      is_active: !currentStatus,
    })
  }

  return (
    <AdminLayout>
      <Head title="Delivery Zones" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Delivery Zones</h1>
            <p className="text-muted-foreground">Manage delivery zones and coverage areas</p>
          </div>
          <Link href="/admin/delivery-zones/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Zone
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Zones Overview</CardTitle>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search zones..."
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
                  <TableHead>Zone Name</TableHead>
                  <TableHead>Postal Codes</TableHead>
                  <TableHead>Delivery Fee</TableHead>
                  <TableHead>Min Order</TableHead>
                  <TableHead>Max Time</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {delivery_zones.data.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {zone.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{zone.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {zone.postal_codes.slice(0, 3).map((code, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {code}
                          </Badge>
                        ))}
                        {zone.postal_codes.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{zone.postal_codes.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>${zone.delivery_fee}</TableCell>
                    <TableCell>${zone.min_order_amount}</TableCell>
                    <TableCell>{zone.max_delivery_time} mins</TableCell>
                    <TableCell>{zone.orders_count}</TableCell>
                    <TableCell>
                      <Badge
                        variant={zone.is_active ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleStatus(zone.id, zone.is_active)}
                      >
                        {zone.is_active ? "Active" : "Inactive"}
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
                            <Link href={`/admin/delivery-zones/${zone.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/delivery-zones/${zone.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(zone.id)} className="text-red-600">
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
