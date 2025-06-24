import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Edit, Trash2, Plus, Tag, ArrowRight } from "lucide-react"
import { Link } from "@inertiajs/react"

interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parent_id?: number
  parent?: {
    name: string
  }
  children?: Category[]
  products_count: number
  sort_order: number
  is_active: boolean
  is_featured: boolean
  view_count: number
  created_at: string
}

interface CategoriesPageProps {
  categories: {
    data: Category[]
    links: any[]
    meta: any
  }
  filters: {
    search?: string
    parent?: string
  }
}

export default function CategoriesPage({ categories, filters }: CategoriesPageProps) {
  const renderCategoryRow = (category: Category, level = 0) => {
    const indent = level * 20

    return (
      <TableRow key={category.id}>
        <TableCell>
          <div className="flex items-center" style={{ paddingLeft: `${indent}px` }}>
            {level > 0 && <ArrowRight className="w-4 h-4 text-gray-400 mr-2" />}
            <div>
              <div className="font-medium flex items-center gap-2">
                {category.name}
                {category.is_featured && (
                  <Badge variant="secondary" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-500">{category.slug}</div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          {category.parent ? (
            <Badge variant="outline">{category.parent.name}</Badge>
          ) : (
            <span className="text-gray-400">Root Category</span>
          )}
        </TableCell>
        <TableCell>{category.products_count}</TableCell>
        <TableCell>{category.view_count.toLocaleString()}</TableCell>
        <TableCell>{category.sort_order}</TableCell>
        <TableCell>
          <Badge variant={category.is_active ? "default" : "secondary"}>
            {category.is_active ? "Active" : "Inactive"}
          </Badge>
        </TableCell>
        <TableCell>{new Date(category.created_at).toLocaleDateString()}</TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/categories/${category.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/categories/${category.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/categories/create?parent=${category.id}`}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subcategory
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
  }

  const renderCategoriesWithChildren = (categories: Category[], level = 0): JSX.Element[] => {
    const elements: JSX.Element[] = []

    categories.forEach((category) => {
      elements.push(renderCategoryRow(category, level))
      if (category.children && category.children.length > 0) {
        elements.push(...renderCategoriesWithChildren(category.children, level + 1))
      }
    })

    return elements
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600">Manage product categories and hierarchy</p>
          </div>
          <Button asChild>
            <Link href="/admin/categories/create">
              <Tag className="w-4 h-4 mr-2" />
              Add Category
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {categories.data.filter((c) => !c.parent_id).length}
              </div>
              <p className="text-sm text-gray-600">Root Categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {categories.data.filter((c) => c.parent_id).length}
              </div>
              <p className="text-sm text-gray-600">Subcategories</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {categories.data.filter((c) => c.is_featured).length}
              </div>
              <p className="text-sm text-gray-600">Featured</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">
                {categories.data.reduce((sum, c) => sum + c.products_count, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Products</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search categories..." className="pl-10" defaultValue={filters.search} />
            </div>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Sort Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderCategoriesWithChildren(categories.data)}</TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
