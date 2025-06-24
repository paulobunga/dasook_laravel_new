import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Star, Package } from "lucide-react"
import { Link } from "@inertiajs/react"

interface Product {
  id: number
  name: string
  sku: string
  price: number
  sale_price?: number
  stock_quantity: number
  status: "draft" | "published" | "archived"
  is_featured: boolean
  vendor: {
    store_name: string
  }
  category: {
    name: string
  }
  brand?: {
    name: string
  }
  average_rating?: number
  reviews_count: number
  created_at: string
}

interface ProductsPageProps {
  products: {
    data: Product[]
    links: any[]
    meta: any
  }
  filters: {
    search?: string
    status?: string
    category?: string
    vendor?: string
  }
}

export default function ProductsPage({ products, filters }: ProductsPageProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "default"
      case "draft":
        return "secondary"
      case "archived":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Out of Stock", color: "destructive" }
    if (quantity < 10) return { label: "Low Stock", color: "secondary" }
    return { label: "In Stock", color: "default" }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage all products across vendors</p>
          </div>
          <Button asChild>
            <Link href="/admin/products/create">
              <Package className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {products.data.filter((p) => p.status === "published").length}
              </div>
              <p className="text-sm text-gray-600">Published Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">
                {products.data.filter((p) => p.status === "draft").length}
              </div>
              <p className="text-sm text-gray-600">Draft Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">
                {products.data.filter((p) => p.stock_quantity === 0).length}
              </div>
              <p className="text-sm text-gray-600">Out of Stock</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {products.data.filter((p) => p.is_featured).length}
              </div>
              <p className="text-sm text-gray-600">Featured Products</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search products..." className="pl-10" defaultValue={filters.search} />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.data.map((product) => {
                  const stockStatus = getStockStatus(product.stock_quantity)
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {product.name}
                            {product.is_featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          </div>
                          <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                          {product.brand && <div className="text-sm text-gray-500">{product.brand.name}</div>}
                        </div>
                      </TableCell>
                      <TableCell>{product.vendor.store_name}</TableCell>
                      <TableCell>{product.category.name}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">${product.price}</div>
                          {product.sale_price && (
                            <div className="text-sm text-green-600">Sale: ${product.sale_price}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.stock_quantity}</div>
                          <Badge variant={stockStatus.color as any} className="text-xs">
                            {stockStatus.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(product.status)}>{product.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {product.average_rating ? (
                          <div className="flex items-center">
                            <span>{product.average_rating.toFixed(1)}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                            <span className="text-sm text-gray-500 ml-1">({product.reviews_count})</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">No reviews</span>
                        )}
                      </TableCell>
                      <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product.id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
