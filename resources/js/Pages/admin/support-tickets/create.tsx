"use client"

import type React from "react"
import { Head, useForm } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { Link } from "@inertiajs/react"

interface User {
  id: number
  name: string
  email: string
  type: "customer" | "vendor"
}

interface Props {
  users: User[]
}

export default function SupportTicketsCreate({ users }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: "",
    subject: "",
    category: "",
    priority: "medium",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/support-tickets")
  }

  return (
    <AdminLayout>
      <Head title="Create Support Ticket" />

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/support-tickets">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tickets
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create Support Ticket</h1>
            <p className="text-muted-foreground">Create a new support ticket on behalf of a user</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="user_id">User</Label>
                    <Select value={data.user_id} onValueChange={(value) => setData("user_id", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id.toString()}>
                            {user.name} ({user.email}) - {user.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.user_id && <p className="text-sm text-red-600">{errors.user_id}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of the issue"
                      value={data.subject}
                      onChange={(e) => setData("subject", e.target.value)}
                    />
                    {errors.subject && <p className="text-sm text-red-600">{errors.subject}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={data.category} onValueChange={(value) => setData("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="account">Account</SelectItem>
                          <SelectItem value="order">Order Issue</SelectItem>
                          <SelectItem value="product">Product Issue</SelectItem>
                          <SelectItem value="shipping">Shipping</SelectItem>
                          <SelectItem value="refund">Refund Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={data.priority} onValueChange={(value) => setData("priority", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.priority && <p className="text-sm text-red-600">{errors.priority}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the issue..."
                      rows={6}
                      value={data.description}
                      onChange={(e) => setData("description", e.target.value)}
                    />
                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={processing}>
                      {processing ? "Creating..." : "Create Ticket"}
                    </Button>
                    <Link href="/admin/support-tickets">
                      <Button variant="outline">Cancel</Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ticket Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <h4 className="font-medium mb-2">Priority Levels:</h4>
                  <ul className="space-y-1">
                    <li>
                      • <strong>Low:</strong> General inquiries
                    </li>
                    <li>
                      • <strong>Medium:</strong> Standard issues
                    </li>
                    <li>
                      • <strong>High:</strong> Business impact
                    </li>
                    <li>
                      • <strong>Urgent:</strong> Critical issues
                    </li>
                  </ul>
                </div>
                <div className="text-sm text-muted-foreground">
                  <h4 className="font-medium mb-2">Response Times:</h4>
                  <ul className="space-y-1">
                    <li>• Urgent: 1 hour</li>
                    <li>• High: 4 hours</li>
                    <li>• Medium: 24 hours</li>
                    <li>• Low: 48 hours</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
