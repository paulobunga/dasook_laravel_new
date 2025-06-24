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

interface Vendor {
  id: number
  store_name: string
  pending_balance: number
}

interface Props {
  vendors: Vendor[]
}

export default function PayoutsCreate({ vendors }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    vendor_id: "",
    amount: "",
    payout_method: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/payouts")
  }

  return (
    <AdminLayout>
      <Head title="Process Payout" />

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/payouts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Payouts
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Process Payout</h1>
            <p className="text-muted-foreground">Create a new payout for a vendor</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payout Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="vendor_id">Vendor</Label>
                    <Select value={data.vendor_id} onValueChange={(value) => setData("vendor_id", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id.toString()}>
                            {vendor.store_name} - ${vendor.pending_balance.toFixed(2)} pending
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.vendor_id && <p className="text-sm text-red-600">{errors.vendor_id}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={data.amount}
                      onChange={(e) => setData("amount", e.target.value)}
                    />
                    {errors.amount && <p className="text-sm text-red-600">{errors.amount}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payout_method">Payout Method</Label>
                    <Select value={data.payout_method} onValueChange={(value) => setData("payout_method", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payout method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.payout_method && <p className="text-sm text-red-600">{errors.payout_method}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any notes about this payout..."
                      value={data.notes}
                      onChange={(e) => setData("notes", e.target.value)}
                    />
                    {errors.notes && <p className="text-sm text-red-600">{errors.notes}</p>}
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={processing}>
                      {processing ? "Processing..." : "Process Payout"}
                    </Button>
                    <Link href="/admin/payouts">
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
                <CardTitle>Payout Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>• Payouts are processed within 1-3 business days</p>
                  <p>• Bank transfers may take 3-5 business days</p>
                  <p>• PayPal transfers are usually instant</p>
                  <p>• All payouts are subject to verification</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
