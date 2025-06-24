"use client"

import type React from "react"

import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Key } from "lucide-react"
import { Link, useForm } from "@inertiajs/react"

interface Admin {
  id: number
  first_name: string
  last_name: string
  email: string
  status: string
  roles: Array<{
    id: number
    name: string
  }>
  created_at: string
  last_login?: string
}

interface Role {
  id: number
  name: string
  description: string
  permissions: Array<{
    id: number
    name: string
    description: string
  }>
}

interface EditAdminProps {
  admin: Admin
  roles: Role[]
}

export default function EditAdmin({ admin, roles }: EditAdminProps) {
  const { data, setData, put, processing, errors } = useForm({
    first_name: admin.first_name,
    last_name: admin.last_name,
    email: admin.email,
    status: admin.status,
    roles: admin.roles.map((role) => role.id),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/admins/${admin.id}`)
  }

  const handleRoleChange = (roleId: number, checked: boolean) => {
    if (checked) {
      setData("roles", [...data.roles, roleId])
    } else {
      setData(
        "roles",
        data.roles.filter((id) => id !== roleId),
      )
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/admins">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admins
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Admin: {admin.first_name} {admin.last_name}
            </h1>
            <p className="text-gray-600">Update administrator information and permissions</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        error={errors.first_name}
                        required
                      />
                      {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        error={errors.last_name}
                        required
                      />
                      {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      error={errors.email}
                      required
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={data.status} onValueChange={(value) => setData("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <Button type="button" variant="outline" asChild>
                      <Link href={`/admin/admins/${admin.id}/reset-password`}>
                        <Key className="w-4 h-4 mr-2" />
                        Reset Password
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Account Info & Roles */}
            <div className="space-y-6">
              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Admin ID</Label>
                    <p className="text-sm text-gray-600">#{admin.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Created</Label>
                    <p className="text-sm text-gray-600">{new Date(admin.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Last Login</Label>
                    <p className="text-sm text-gray-600">
                      {admin.last_login ? new Date(admin.last_login).toLocaleDateString() : "Never"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Current Status</Label>
                    <Badge variant={admin.status === "active" ? "default" : "secondary"} className="mt-1">
                      {admin.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Roles & Permissions */}
              <Card>
                <CardHeader>
                  <CardTitle>Roles & Permissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.id} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${role.id}`}
                          checked={data.roles.includes(role.id)}
                          onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                        />
                        <Label htmlFor={`role-${role.id}`} className="font-medium">
                          {role.name}
                        </Label>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{role.description}</p>
                      <div className="ml-6 space-y-1">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <p key={permission.id} className="text-xs text-gray-500">
                            • {permission.name}
                          </p>
                        ))}
                        {role.permissions.length > 3 && (
                          <p className="text-xs text-gray-500">• +{role.permissions.length - 3} more permissions</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {errors.roles && <p className="text-sm text-red-600">{errors.roles}</p>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/admins">Cancel</Link>
            </Button>
            <Button type="submit" disabled={processing}>
              <Save className="w-4 h-4 mr-2" />
              {processing ? "Updating..." : "Update Admin"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
