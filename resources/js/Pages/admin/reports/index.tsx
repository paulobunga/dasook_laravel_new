import { Head } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, ShoppingCart, DollarSign, Package, Download, Calendar } from "lucide-react"

interface ReportData {
  sales: {
    total: number
    growth: number
  }
  orders: {
    total: number
    growth: number
  }
  customers: {
    total: number
    growth: number
  }
  products: {
    total: number
    growth: number
  }
}

interface Props {
  reportData: ReportData
}

export default function ReportsIndex({ reportData }: Props) {
  const reports = [
    {
      title: "Sales Report",
      description: "Detailed sales analytics and revenue tracking",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      href: "/admin/reports/sales",
    },
    {
      title: "Order Report",
      description: "Order statistics and fulfillment metrics",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      href: "/admin/reports/orders",
    },
    {
      title: "Customer Report",
      description: "Customer behavior and demographics analysis",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      href: "/admin/reports/customers",
    },
    {
      title: "Product Report",
      description: "Product performance and inventory insights",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      href: "/admin/reports/products",
    },
    {
      title: "Vendor Report",
      description: "Vendor performance and commission tracking",
      icon: BarChart3,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      href: "/admin/reports/vendors",
    },
    {
      title: "Financial Report",
      description: "Revenue, expenses, and profit analysis",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      href: "/admin/reports/financial",
    },
  ]

  return (
    <AdminLayout>
      <Head title="Reports & Analytics" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive business insights and data analysis</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${reportData.sales.total.toLocaleString()}</div>
              <div className="flex items-center gap-1">
                <Badge variant={reportData.sales.growth > 0 ? "default" : "destructive"} className="text-xs">
                  {reportData.sales.growth > 0 ? "+" : ""}
                  {reportData.sales.growth}%
                </Badge>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.orders.total.toLocaleString()}</div>
              <div className="flex items-center gap-1">
                <Badge variant={reportData.orders.growth > 0 ? "default" : "destructive"} className="text-xs">
                  {reportData.orders.growth > 0 ? "+" : ""}
                  {reportData.orders.growth}%
                </Badge>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.customers.total.toLocaleString()}</div>
              <div className="flex items-center gap-1">
                <Badge variant={reportData.customers.growth > 0 ? "default" : "destructive"} className="text-xs">
                  {reportData.customers.growth > 0 ? "+" : ""}
                  {reportData.customers.growth}%
                </Badge>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.products.total.toLocaleString()}</div>
              <div className="flex items-center gap-1">
                <Badge variant={reportData.products.growth > 0 ? "default" : "destructive"} className="text-xs">
                  {reportData.products.growth > 0 ? "+" : ""}
                  {reportData.products.growth}%
                </Badge>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const Icon = report.icon
            return (
              <Card key={report.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${report.bgColor}`}>
                      <Icon className={`h-6 w-6 ${report.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{report.description}</p>
                  <Button variant="outline" className="w-full">
                    View Report
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Monthly Report
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
              <Button variant="outline" className="justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Custom Report Builder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
