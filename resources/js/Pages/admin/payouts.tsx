import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, CheckCircle, XCircle, DollarSign, Clock } from "lucide-react"
import { Link } from "@inertiajs/react"

interface Payout {
  id: number
  vendor: {
    store_name: string
    user: {
      first_name: string
      last_name: string
    }
  }
  amount: number
  currency: string
  status: "pending" | "processing" | "completed" | "failed"
  payout_method: "bank_transfer" | "paypal" | "stripe"
  transaction_id?: string
  notes?: string
  processed_at?: string
  created_at: string
}

interface PayoutsPageProps {
  payouts: {
    data: Payout[]
    links: any[]
    meta: any
  }
  filters: {
    search?: string
    status?: string
    method?: string
  }
  stats: {
    totalPending: number
    totalProcessing: number
    totalCompleted: number
    totalAmount: number
  }
}

export default function PayoutsPage({ payouts, filters, stats }: PayoutsPageProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "processing":
        return "secondary"
      case "pending":
        return "outline"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getMethodBadge = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Bank Transfer"
      case "paypal":
        return "PayPal"
      case "stripe":
        return "Stripe"
      default:
        return method
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendor Payouts</h1>
            <p className="text-gray-600">Manage vendor payment requests and transactions</p>
          </div>
          <Button asChild>
            <Link href="/admin/payouts/bulk-process">Process Bulk Payouts</Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalPending}</div>
                  <p className="text-sm text-gray-600">Pending Payouts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalProcessing}</div>
                  <p className="text-sm text-gray-600">Processing</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalCompleted}</div>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">${stats.totalAmount.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                </div>
              </div>
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
                  <Input placeholder="Search payouts..." className="pl-10" defaultValue={filters.search} />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payouts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Processed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.data.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payout.vendor.store_name}</div>
                        <div className="text-sm text-gray-500">
                          {payout.vendor.user.first_name} {payout.vendor.user.last_name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {payout.currency} {payout.amount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getMethodBadge(payout.payout_method)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(payout.status)}>{payout.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {payout.transaction_id ? (
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{payout.transaction_id}</code>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{new Date(payout.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {payout.processed_at ? new Date(payout.processed_at).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/payouts/${payout.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          {payout.status === "pending" && (
                            <>
                              <DropdownMenuItem>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve & Process
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
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
