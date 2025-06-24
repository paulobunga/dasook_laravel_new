import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, Edit, Ban, CheckCircle, XCircle, Plus } from "lucide-react"
import { Link } from "@inertiajs/react"

interface Vendor {
  id: number
  store_name: string
  store_email: string
  user: {
    first_name: string
    last_name: string
    email: string
  }
  status: "pending" | "approved" | "suspended" | "rejected"
  total_sales: number
  total_orders: number
  rating: number
  created_at: string
  subscription?: {
    plan: {
      name: string
    }
    status: string
  }
}

interface VendorsIndexProps {
  vendors: {
    data: Vendor[]
    links: any[]
    meta: any
  }
  filters: {
    search?: string
    status?: string
  }
}

export default function VendorsIndex({ vendors, filters }: VendorsIndexProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "suspended":
        return "destructive"
      case "rejected":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
            <p className="text-gray-600">Manage vendor accounts and applications</p>
          </div>
          <Button asChild>
            <Link href="/admin/vendors/create">
              <Plus className="w-4 h-4 mr-2" />
              Add Vendor
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {vendors.data.filter((v) => v.status === "approved").length}
              </div>
              <p className="text-sm text-gray-600">Active Vendors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">
                {vendors.data.filter((v) => v.status === "pending").length}
              </div>
              <p className="text-sm text-gray-600">Pending Approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">
                {vendors.data.filter((v) => v.status === "suspended").length}
              </div>
              <p className="text-sm text-gray-600">Suspended</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-600">
                {vendors.data.filter((v) => v.status === "rejected").length}
              </div>
              <p className="text-sm text-gray-600">Rejected</p>
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
                  <Input placeholder="Search vendors..." className="pl-10" defaultValue={filters.search} />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vendors Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.data.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vendor.store_name}</div>
                        <div className="text-sm text-gray-500">{vendor.store_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {vendor.user.first_name} {vendor.user.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{vendor.user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                    </TableCell>
                    <TableCell>${vendor.total_sales.toLocaleString()}</TableCell>
                    <TableCell>{vendor.total_orders}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span>{vendor.rating.toFixed(1)}</span>
                        <span className="text-yellow-400 ml-1">★</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {vendor.subscription ? (
                        <div>
                          <div className="text-sm font-medium">{vendor.subscription.plan.name}</div>
                          <Badge variant="outline" className="text-xs">
                            {vendor.subscription.status}
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-gray-400">No subscription</span>
                      )}
                    </TableCell>
                    <TableCell>{new Date(vendor.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/vendors/${vendor.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/vendors/${vendor.id}/edit`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          {vendor.status === "pending" && (
                            <>
                              <DropdownMenuItem>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {vendor.status === "approved" && (
                            <DropdownMenuItem>
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
