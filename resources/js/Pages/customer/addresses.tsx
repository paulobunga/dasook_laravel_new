"use client"

import type React from "react"

import { useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Plus, Edit, Trash2, Home, Building, Star, Phone, User } from "lucide-react"

interface Address {
  id: number
  type: "home" | "work" | "other"
  is_default: boolean
  recipient_name: string
  phone: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  landmark?: string
}

interface AddressesProps {
  addresses?: Address[]
}

export default function CustomerAddresses({ addresses = [] }: AddressesProps) {
  // Mock data for demonstration
  const [addressList, setAddressList] = useState<Address[]>(
    addresses.length > 0
      ? addresses
      : [
          {
            id: 1,
            type: "home",
            is_default: true,
            recipient_name: "John Doe",
            phone: "+1 (555) 123-4567",
            address_line_1: "123 Main Street",
            address_line_2: "Apt 4B",
            city: "New York",
            state: "NY",
            postal_code: "10001",
            country: "United States",
            landmark: "Near Central Park",
          },
          {
            id: 2,
            type: "work",
            is_default: false,
            recipient_name: "John Doe",
            phone: "+1 (555) 987-6543",
            address_line_1: "456 Business Ave",
            city: "New York",
            state: "NY",
            postal_code: "10002",
            country: "United States",
          },
        ],
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState<Partial<Address>>({
    type: "home",
    is_default: false,
    recipient_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "United States",
    landmark: "",
  })

  const handleInputChange = (field: keyof Address, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAddress) {
      // Update existing address
      setAddressList((prev) =>
        prev.map((addr) => (addr.id === editingAddress.id ? ({ ...addr, ...formData } as Address) : addr)),
      )
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now(),
        ...(formData as Address),
      }
      setAddressList((prev) => [...prev, newAddress])
    }

    // If this is set as default, remove default from others
    if (formData.is_default) {
      setAddressList((prev) =>
        prev.map((addr) => (addr.id !== (editingAddress?.id || Date.now()) ? { ...addr, is_default: false } : addr)),
      )
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      type: "home",
      is_default: false,
      recipient_name: "",
      phone: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "United States",
      landmark: "",
    })
    setEditingAddress(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setFormData(address)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setAddressList((prev) => prev.filter((addr) => addr.id !== id))
  }

  const setAsDefault = (id: number) => {
    setAddressList((prev) =>
      prev.map((addr) => ({
        ...addr,
        is_default: addr.id === id,
      })),
    )
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />
      case "work":
        return <Building className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const getAddressTypeColor = (type: string) => {
    switch (type) {
      case "home":
        return "bg-blue-100 text-blue-800"
      case "work":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
            <p className="text-gray-600">Manage your delivery addresses</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingAddress(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipient_name">Full Name *</Label>
                    <Input
                      id="recipient_name"
                      value={formData.recipient_name || ""}
                      onChange={(e) => handleInputChange("recipient_name", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address_line_1">Address Line 1 *</Label>
                  <Input
                    id="address_line_1"
                    value={formData.address_line_1 || ""}
                    onChange={(e) => handleInputChange("address_line_1", e.target.value)}
                    placeholder="Street address, P.O. box, company name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address_line_2">Address Line 2</Label>
                  <Input
                    id="address_line_2"
                    value={formData.address_line_2 || ""}
                    onChange={(e) => handleInputChange("address_line_2", e.target.value)}
                    placeholder="Apartment, suite, unit, building, floor, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city || ""}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state || ""}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="postal_code">Postal Code *</Label>
                    <Input
                      id="postal_code"
                      value={formData.postal_code || ""}
                      onChange={(e) => handleInputChange("postal_code", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={formData.country || "United States"}
                      onValueChange={(value) => handleInputChange("country", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Address Type</Label>
                    <Select value={formData.type || "home"} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    value={formData.landmark || ""}
                    onChange={(e) => handleInputChange("landmark", e.target.value)}
                    placeholder="Nearby landmark for easy delivery"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_default"
                    checked={formData.is_default || false}
                    onCheckedChange={(checked) => handleInputChange("is_default", checked as boolean)}
                  />
                  <Label htmlFor="is_default">Set as default address</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingAddress ? "Update Address" : "Add Address"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {addressList.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
              <p className="text-gray-600 mb-6">Add your first delivery address to get started</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addressList.map((address) => (
              <Card key={address.id} className="relative">
                {address.is_default && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      Default
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    {getAddressIcon(address.type)}
                    <span className="capitalize">{address.type}</span>
                    <Badge className={getAddressTypeColor(address.type)}>
                      {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                    </Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{address.recipient_name}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{address.phone}</span>
                  </div>

                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="text-sm text-gray-600">
                      <p>{address.address_line_1}</p>
                      {address.address_line_2 && <p>{address.address_line_2}</p>}
                      <p>
                        {address.city}, {address.state} {address.postal_code}
                      </p>
                      <p>{address.country}</p>
                      {address.landmark && <p className="text-gray-500 italic">Near {address.landmark}</p>}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(address)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(address.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>

                    {!address.is_default && (
                      <Button variant="ghost" size="sm" onClick={() => setAsDefault(address.id)}>
                        <Star className="w-4 h-4 mr-1" />
                        Set Default
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
