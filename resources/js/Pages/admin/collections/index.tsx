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
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Package } from "lucide-react"

interface Collection {
  id: number
  name: string
  description: string
  slug: string
  image_url: string
  is_featured: boolean
  is_active: boolean
  products_count: number
  sort_order: number
  created_at: string
}

interface Props {
  collections: {
    data: Collection[]
    current_page: number
    last_page: number
    total: number
  }
  filters: {
    search?: string
    status?: string
  }
}

export default function CollectionsIndex({ collections, filters }: Props) {
  const [search, setSearch] = useState(filters.search || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.get("/admin/collections", { search }, { preserveState: true })
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this collection?")) {
      router.delete(`/admin/collections/${id}`)
    }
  }

  const toggleStatus = (id: number, currentStatus: boolean) => {
    router.patch(`/admin/collections/${id}/toggle-status`, {
      is_active: !currentStatus,
    })
  }

  const toggleFeatured = (id: number, currentStatus: boolean) => {
    router.patch(`/admin/collections/${id}/toggle-featured`, {
      is_featured: !currentStatus,
    })
  }

  return (
    <AdminLayout>
      <Head title="Collections" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Collections</h1>
            <p className="text-muted-foreground">Manage product collections and categories</p>
          </div>
          <Link href="/admin/collections/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Collection
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Collections Overview</CardTitle>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search collections..."
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
                  <TableHead>Collection</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Sort Order</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collections.data.map((collection) => (
                  <TableRow key={collection.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {collection.image_url ? (
                          <img
                            src={collection.image_url || "/placeholder.svg"}
                            alt={collection.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{collection.name}</div>
                          <div className="text-sm text-muted-foreground">{collection.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{collection.slug}</code>
                    </TableCell>
                    <TableCell>{collection.products_count}</TableCell>
                    <TableCell>{collection.sort_order}</TableCell>
                    <TableCell>
                      <Badge
                        variant={collection.is_featured ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleFeatured(collection.id, collection.is_featured)}
                      >
                        {collection.is_featured ? "Featured" : "Regular"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={collection.is_active ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleStatus(collection.id, collection.is_active)}
                      >
                        {collection.is_active ? "Active" : "Inactive"}
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
                            <Link href={`/admin/collections/${collection.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/collections/${collection.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(collection.id)} className="text-red-600">
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
