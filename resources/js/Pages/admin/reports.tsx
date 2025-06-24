import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Star,
  FileText,
  Download,
  Calendar,
  Eye,
} from "lucide-react"
import { Link } from "@inertiajs/react"

interface ReportsPageProps {
  reportStats: {
    totalSales: number
    totalOrders: number
    totalCustomers: number
    totalVendors: number
    averageOrderValue: number
    conversionRate: number
  }
}

export default function ReportsPage({ reportStats }: ReportsPageProps) {
  const reportCategories = [
    {
      title: "Sales Reports",
      description: "Revenue, sales trends, and financial analytics",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      reports: [
        { name: "Sales Overview", description: "Daily, weekly, monthly sales data", href: "/admin/reports/sales" },
        { name: "Revenue Analytics", description: "Revenue trends and forecasting", href: "/admin/reports/revenue" },
        { name: "Payment Methods", description: "Payment method usage statistics", href: "/admin/reports/payments" },
        { name: "Refunds & Returns", description: "Return and refund analytics", href: "/admin/reports/refunds" },
      ],
    },
    {
      title: "Order Reports",
      description: "Order analytics and fulfillment metrics",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      reports: [
        { name: "Order Analytics", description: "Order volume and trends", href: "/admin/reports/orders" },
        {
          name: "Fulfillment Report",
          description: "Delivery and shipping metrics",
          href: "/admin/reports/fulfillment",
        },
        { name: "Cart Abandonment", description: "Abandoned cart analysis", href: "/admin/reports/cart-abandonment" },
        { name: "Order Status", description: "Order status distribution", href: "/admin/reports/order-status" },
      ],
    },
    {
      title: "Customer Reports",
      description: "Customer behavior and demographics",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      reports: [
        {
          name: "Customer Analytics",
          description: "Customer acquisition and retention",
          href: "/admin/reports/customers",
        },
        { name: "Customer Lifetime Value", description: "CLV analysis and segmentation", href: "/admin/reports/clv" },
        { name: "Geographic Report", description: "Customer location analytics", href: "/admin/reports/geographic" },
        {
          name: "Customer Behavior",
          description: "Shopping patterns and preferences",
          href: "/admin/reports/behavior",
        },
      ],
    },
    {
      title: "Product Reports",
      description: "Product performance and inventory analytics",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      reports: [
        {
          name: "Product Performance",
          description: "Best and worst selling products",
          href: "/admin/reports/products",
        },
        { name: "Inventory Report", description: "Stock levels and turnover", href: "/admin/reports/inventory" },
        { name: "Category Analytics", description: "Category performance metrics", href: "/admin/reports/categories" },
        { name: "Product Reviews", description: "Review and rating analytics", href: "/admin/reports/reviews" },
      ],
    },
    {
      title: "Vendor Reports",
      description: "Multi-vendor marketplace analytics",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      reports: [
        { name: "Vendor Performance", description: "Vendor sales and metrics", href: "/admin/reports/vendors" },
        {
          name: "Commission Report",
          description: "Commission calculations and payouts",
          href: "/admin/reports/commissions",
        },
        {
          name: "Vendor Onboarding",
          description: "Vendor registration analytics",
          href: "/admin/reports/vendor-onboarding",
        },
        {
          name: "Subscription Analytics",
          description: "Vendor subscription metrics",
          href: "/admin/reports/subscriptions",
        },
      ],
    },
    {
      title: "Marketing Reports",
      description: "Marketing campaign and promotion analytics",
      icon: Star,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      reports: [
        { name: "Campaign Performance", description: "Marketing campaign ROI", href: "/admin/reports/campaigns" },
        { name: "Coupon Usage", description: "Discount and coupon analytics", href: "/admin/reports/coupons" },
        { name: "Flash Sales", description: "Flash sale performance metrics", href: "/admin/reports/flash-sales" },
        { name: "Email Marketing", description: "Email campaign analytics", href: "/admin/reports/email" },
      ],
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive business intelligence and reporting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">${reportStats.totalSales.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{reportStats.totalOrders.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{reportStats.totalCustomers.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Customers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{reportStats.totalVendors.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Vendors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">${reportStats.averageOrderValue.toFixed(2)}</div>
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-pink-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{reportStats.conversionRate.toFixed(1)}%</div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reportCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.bgColor}`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <p className="text-sm text-gray-600 font-normal">{category.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.reports.map((report, reportIndex) => (
                    <div
                      key={reportIndex}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={report.href}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/admin/reports/custom">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  Create Custom Report
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/admin/reports/scheduled">
                  <Calendar className="w-6 h-6 mb-2" />
                  Schedule Reports
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/admin/reports/export">
                  <Download className="w-6 h-6 mb-2" />
                  Bulk Export
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
