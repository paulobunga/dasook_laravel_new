import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, Edit, Ban, Mail, ShoppingCart } from "lucide-react"
import { Link } from "@inertiajs/react"

interface Customer {
  id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  status: "active" | "inactive" | "suspended"
  email_verified: boolean
  phone_verified: boolean
  total_orders: number
  total_spent: number
  created_at: string
  last_order_date?: string
}

interface CustomersPageProps {
  customers: {
    data: Customer[]
    links: any[]
    meta: any
  }
  filters: {
    search?: string
    status?: string
  }
}

export default function CustomersPage({ customers, filters }: CustomersPageProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600">Manage customer accounts and activity</p>
          </div>
          <Button asChild>
            <Link href="/admin/customers/export">Export Data</Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {customers.data.filter((c) => c.status === "active").length}
              </div>
              <p className="text-sm text-gray-600">Active Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {customers.data.filter((c) => c.email_verified).length}
              </div>
              <p className="text-sm text-gray-600">Verified Emails</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {customers.data.reduce((sum, c) => sum + c.total_orders, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">
                ${customers.data.reduce((sum, c) => sum + c.total_spent, 0).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Total Revenue</p>
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
                  <Input placeholder="Search customers..." className="pl-10" defaultValue={filters.search} />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.data.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="font-medium">
                        {customer.first_name} {customer.last_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{customer.email}</div>
                        {customer.phone && <div className="text-sm text-gray-500">{customer.phone}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(customer.status)}>{customer.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={customer.email_verified ? "default" : "secondary"} className="text-xs">
                          Email {customer.email_verified ? "✓" : "✗"}
                        </Badge>
                        {customer.phone && (
                          <Badge variant={customer.phone_verified ? "default" : "secondary"} className="text-xs">
                            Phone {customer.phone_verified ? "✓" : "✗"}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{customer.total_orders}</TableCell>
                    <TableCell>${customer.total_spent.toLocaleString()}</TableCell>
                    <TableCell>
                      {customer.last_order_date ? new Date(customer.last_order_date).toLocaleDateString() : "Never"}
                    </TableCell>
                    <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/customers/${customer.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/customers/${customer.id}/orders`}>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              View Orders
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/customers/${customer.id}/edit`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          {customer.status === "active" && (
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend
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
