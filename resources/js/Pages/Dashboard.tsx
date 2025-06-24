import { usePage } from "@inertiajs/react"
import CustomerDashboard from "./customer/dashboard"
import AdminDashboard from "./admin/dashboard"
import VendorDashboard from "./vendor/dashboard"

export default function Dashboard() {
  const { auth, vendor, ...props } = usePage().props as any

  // Determine which dashboard to show based on user role
  if (auth?.user?.roles?.some((role: any) => role.name === "admin")) {
    return <AdminDashboard {...props} />
  }

  if (vendor || auth?.user?.roles?.some((role: any) => role.name === "vendor")) {
    return <VendorDashboard vendor={vendor} {...props} />
  }

  // Default to customer dashboard
  return <CustomerDashboard {...props} />
}
