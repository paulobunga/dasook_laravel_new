"use client"

import type React from "react"
import { useState } from "react"
import AdminLayout from "@/layouts/admin-layout"
import { ProfileHeader } from "@/components/profile/profile-header"
import { DeviceManagement } from "@/components/profile/device-management"
import { LoginHistory } from "@/components/profile/login-history"
import { AdvancedPrivacySettings } from "@/components/profile/advanced-privacy-settings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Bell,
  Settings,
  Users,
  BarChart3,
  Database,
  Save,
  AlertCircle,
  CheckCircle,
  Crown,
  Activity,
} from "lucide-react"

export default function EnhancedAdminProfile() {
  const [profile, setProfile] = useState({
    id: 1,
    first_name: "Admin",
    last_name: "User",
    email: "admin@dasook.com",
    phone: "+1 (555) 000-0001",
    role: "admin" as const,
    verified: true,
    premium: true,
    rating: 5.0,
    total_orders: 0,
    member_since: "2020-01-01",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [adminSettings, setAdminSettings] = useState({
    system_notifications: {
      new_vendor_registrations: true,
      high_value_transactions: true,
      system_errors: true,
      security_alerts: true,
      performance_alerts: true,
      backup_status: true,
      user_reports: true,
    },
    dashboard_preferences: {
      default_view: "overview",
      auto_refresh: true,
      refresh_interval: 30,
      show_advanced_metrics: true,
      compact_mode: false,
    },
    security_settings: {
      session_timeout: 60,
      require_2fa: true,
      ip_whitelist_enabled: false,
      audit_log_retention: 365,
      failed_login_lockout: 5,
    },
    system_preferences: {
      maintenance_mode: false,
      debug_mode: false,
      api_rate_limiting: true,
      email_notifications: true,
      sms_notifications: false,
    },
  })

  const [systemStats, setSystemStats] = useState({
    total_users: 15420,
    active_vendors: 1247,
    total_orders: 89750,
    system_uptime: 99.9,
    storage_used: 78.5,
    api_calls_today: 125000,
    pending_approvals: 23,
    security_incidents: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setMessage({ type: "success", text: "Admin profile updated successfully!" })
      setIsLoading(false)
      setTimeout(() => setMessage(null), 3000)
    }, 1000)
  }

  const handleAvatarChange = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={profile} onAvatarChange={handleAvatarChange} />

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{message.text}</span>
          </div>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Admin Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Administrator Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">First Name *</Label>
                        <Input
                          id="first_name"
                          value={profile.first_name}
                          onChange={(e) => setProfile((prev) => ({ ...prev, first_name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name *</Label>
                        <Input
                          id="last_name"
                          value={profile.last_name}
                          onChange={(e) => setProfile((prev) => ({ ...prev, last_name: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Admin Privileges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Super Admin</span>
                    <Badge variant="destructive">
                      <Crown className="w-3 h-3 mr-1" />
                      Full Access
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>System Access</span>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Granted
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Database Access</span>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Granted
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Login</span>
                      <span className="font-medium">Today, 10:30 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Admin Since</span>
                      <span className="font-medium">{new Date(profile.member_since).getFullYear()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Actions Today</span>
                      <span className="font-medium">47</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Overview Tab */}
          <TabsContent value="system">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold">{systemStats.total_users.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                      <p className="text-2xl font-bold">{systemStats.active_vendors.toLocaleString()}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">System Uptime</p>
                      <p className="text-2xl font-bold">{systemStats.system_uptime}%</p>
                    </div>
                    <Activity className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                      <p className="text-2xl font-bold">{systemStats.pending_approvals}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>System Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-600">Put the system in maintenance mode</p>
                    </div>
                    <Switch
                      checked={adminSettings.system_preferences.maintenance_mode}
                      onCheckedChange={(checked) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          system_preferences: { ...prev.system_preferences, maintenance_mode: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-gray-600">Enable detailed error logging</p>
                    </div>
                    <Switch
                      checked={adminSettings.system_preferences.debug_mode}
                      onCheckedChange={(checked) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          system_preferences: { ...prev.system_preferences, debug_mode: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>API Rate Limiting</Label>
                      <p className="text-sm text-gray-600">Enforce API rate limits</p>
                    </div>
                    <Switch
                      checked={adminSettings.system_preferences.api_rate_limiting}
                      onCheckedChange={(checked) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          system_preferences: { ...prev.system_preferences, api_rate_limiting: checked },
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Storage Usage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${systemStats.storage_used}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{systemStats.storage_used}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">API Calls Today</span>
                    <span className="font-semibold">{systemStats.api_calls_today.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Incidents</span>
                    <Badge variant={systemStats.security_incidents === 0 ? "outline" : "destructive"}>
                      {systemStats.security_incidents}
                    </Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">System Uptime</span>
                    <Badge variant="outline" className="text-green-600">
                      {systemStats.system_uptime}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dashboard Preferences Tab */}
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Default Dashboard View</Label>
                  <Select
                    value={adminSettings.dashboard_preferences.default_view}
                    onValueChange={(value) =>
                      setAdminSettings((prev) => ({
                        ...prev,
                        dashboard_preferences: { ...prev.dashboard_preferences, default_view: value },
                      }))
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">Overview</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="users">User Management</SelectItem>
                      <SelectItem value="vendors">Vendor Management</SelectItem>
                      <SelectItem value="orders">Order Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Refresh Dashboard</Label>
                    <p className="text-sm text-gray-600">Automatically refresh dashboard data</p>
                  </div>
                  <Switch
                    checked={adminSettings.dashboard_preferences.auto_refresh}
                    onCheckedChange={(checked) =>
                      setAdminSettings((prev) => ({
                        ...prev,
                        dashboard_preferences: { ...prev.dashboard_preferences, auto_refresh: checked },
                      }))
                    }
                  />
                </div>

                {adminSettings.dashboard_preferences.auto_refresh && (
                  <div>
                    <Label>Refresh Interval (seconds)</Label>
                    <Input
                      type="number"
                      value={adminSettings.dashboard_preferences.refresh_interval}
                      onChange={(e) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          dashboard_preferences: {
                            ...prev.dashboard_preferences,
                            refresh_interval: Number.parseInt(e.target.value),
                          },
                        }))
                      }
                      className="mt-2"
                      min="10"
                      max="300"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Advanced Metrics</Label>
                    <p className="text-sm text-gray-600">Display detailed system metrics</p>
                  </div>
                  <Switch
                    checked={adminSettings.dashboard_preferences.show_advanced_metrics}
                    onCheckedChange={(checked) =>
                      setAdminSettings((prev) => ({
                        ...prev,
                        dashboard_preferences: { ...prev.dashboard_preferences, show_advanced_metrics: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-gray-600">Use compact layout for more information</p>
                  </div>
                  <Switch
                    checked={adminSettings.dashboard_preferences.compact_mode}
                    onCheckedChange={(checked) =>
                      setAdminSettings((prev) => ({
                        ...prev,
                        dashboard_preferences: { ...prev.dashboard_preferences, compact_mode: checked },
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={adminSettings.security_settings.session_timeout}
                      onChange={(e) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          security_settings: {
                            ...prev.security_settings,
                            session_timeout: Number.parseInt(e.target.value),
                          },
                        }))
                      }
                      className="mt-2"
                      min="15"
                      max="480"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Mandatory 2FA for all admin accounts</p>
                    </div>
                    <Switch
                      checked={adminSettings.security_settings.require_2fa}
                      onCheckedChange={(checked) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          security_settings: { ...prev.security_settings, require_2fa: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>IP Whitelist</Label>
                      <p className="text-sm text-gray-600">Restrict admin access to specific IP addresses</p>
                    </div>
                    <Switch
                      checked={adminSettings.security_settings.ip_whitelist_enabled}
                      onCheckedChange={(checked) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          security_settings: { ...prev.security_settings, ip_whitelist_enabled: checked },
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Audit Log Retention (days)</Label>
                    <Input
                      type="number"
                      value={adminSettings.security_settings.audit_log_retention}
                      onChange={(e) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          security_settings: {
                            ...prev.security_settings,
                            audit_log_retention: Number.parseInt(e.target.value),
                          },
                        }))
                      }
                      className="mt-2"
                      min="30"
                      max="2555"
                    />
                  </div>

                  <div>
                    <Label>Failed Login Lockout Threshold</Label>
                    <Input
                      type="number"
                      value={adminSettings.security_settings.failed_login_lockout}
                      onChange={(e) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          security_settings: {
                            ...prev.security_settings,
                            failed_login_lockout: Number.parseInt(e.target.value),
                          },
                        }))
                      }
                      className="mt-2"
                      min="3"
                      max="10"
                    />
                  </div>
                </CardContent>
              </Card>

              <LoginHistory />
            </div>
          </TabsContent>

          {/* Device Management Tab */}
          <TabsContent value="devices">
            <DeviceManagement />
          </TabsContent>

          {/* Admin Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>System Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(adminSettings.system_notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <Label>{key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</Label>
                      <p className="text-sm text-gray-600">
                        {key === "new_vendor_registrations" && "Get notified when new vendors register"}
                        {key === "high_value_transactions" && "Alert for transactions above threshold"}
                        {key === "system_errors" && "Critical system error notifications"}
                        {key === "security_alerts" && "Security incidents and threats"}
                        {key === "performance_alerts" && "System performance issues"}
                        {key === "backup_status" && "Database backup status updates"}
                        {key === "user_reports" && "User-reported issues and complaints"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setAdminSettings((prev) => ({
                          ...prev,
                          system_notifications: { ...prev.system_notifications, [key]: checked },
                        }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <AdvancedPrivacySettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
