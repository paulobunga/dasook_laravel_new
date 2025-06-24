"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, MapPin, Home, Building, Star, AlertTriangle, CheckCircle } from "lucide-react"
import { validateDeliveryAddress, type DeliveryZone } from "@/utils/delivery-zones"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Address {
  id: number
  type: "home" | "work" | "other"
  name: string
  phone: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  landmark?: string
  is_default: boolean
  delivery_zone?: DeliveryZone
  zone_validation?: any
}

interface EnhancedAddressSelectorProps {
  addresses: Address[]
  selectedAddressId?: number
  orderAmount: number
  onAddressSelect: (addressId: number) => void
  onAddressAdd: (address: Omit<Address, "id">) => void
}

export function EnhancedAddressSelector({
  addresses,
  selectedAddressId,
  orderAmount,
  onAddressSelect,
  onAddressAdd,
}: EnhancedAddressSelectorProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [validatedAddresses, setValidatedAddresses] = useState<Address[]>([])
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    type: "home",
    name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "US",
    landmark: "",
    is_default: false,
  })

  useEffect(() => {
    // Validate all addresses against delivery zones
    const validateAddresses = async () => {
      const validated = await Promise.all(
        addresses.map(async (address) => {
          const validation = validateDeliveryAddress(address.postal_code, orderAmount)
          return {
            ...address,
            zone_validation: validation,
            delivery_zone: validation.zone,
          }
        }),
      )
      setValidatedAddresses(validated)
    }

    validateAddresses()
  }, [addresses, orderAmount])

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

  const handleAddAddress = async () => {
    // Validate the new address before adding
    const validation = validateDeliveryAddress(newAddress.postal_code, orderAmount)

    if (!validation.isValid) {
      alert(validation.message)
      return
    }

    const addressWithZone = {
      ...newAddress,
      delivery_zone: validation.zone,
      zone_validation: validation,
    }

    onAddressAdd(addressWithZone)
    setNewAddress({
      type: "home",
      name: "",
      phone: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
      landmark: "",
      is_default: false,
    })
    setShowAddForm(false)
  }

  const getDeliveryStatusBadge = (address: Address) => {
    if (!address.zone_validation) return null

    if (address.zone_validation.isValid) {
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          Available
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Not Available
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>Add a new delivery address to your account.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address1">Address Line 1</Label>
                <Input
                  id="address1"
                  value={newAddress.address_line_1}
                  onChange={(e) => setNewAddress({ ...newAddress, address_line_1: e.target.value })}
                  placeholder="Street address, P.O. box, company name"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                <Input
                  id="address2"
                  value={newAddress.address_line_2}
                  onChange={(e) => setNewAddress({ ...newAddress, address_line_2: e.target.value })}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  placeholder="Enter city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  placeholder="Enter state"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal">Postal Code</Label>
                <Input
                  id="postal"
                  value={newAddress.postal_code}
                  onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                  placeholder="Enter postal code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={newAddress.country}
                  onValueChange={(value) => setNewAddress({ ...newAddress, country: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Textarea
                  id="landmark"
                  value={newAddress.landmark}
                  onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                  placeholder="Nearby landmark or delivery instructions"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Address Type</Label>
                <Select
                  value={newAddress.type}
                  onValueChange={(value: any) => setNewAddress({ ...newAddress, type: value })}
                >
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
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAddress}>Add Address</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <RadioGroup
        value={selectedAddressId?.toString()}
        onValueChange={(value) => onAddressSelect(Number.parseInt(value))}
      >
        <div className="grid gap-4">
          {validatedAddresses.map((address) => (
            <Card
              key={address.id}
              className={`cursor-pointer transition-colors ${
                selectedAddressId === address.id ? "ring-2 ring-blue-600" : ""
              } ${!address.zone_validation?.isValid ? "opacity-60" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={address.id.toString()}
                    className="mt-1"
                    disabled={!address.zone_validation?.isValid}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getAddressIcon(address.type)}
                      <Badge variant="secondary" className="capitalize">
                        {address.type}
                      </Badge>
                      {address.is_default && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Default
                        </Badge>
                      )}
                      {getDeliveryStatusBadge(address)}
                    </div>

                    <div className="space-y-1">
                      <p className="font-medium">{address.name}</p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                      <p className="text-sm text-gray-600">
                        {address.address_line_1}
                        {address.address_line_2 && `, ${address.address_line_2}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state} {address.postal_code}
                      </p>
                      <p className="text-sm text-gray-600">{address.country}</p>
                      {address.landmark && <p className="text-sm text-gray-500 italic">{address.landmark}</p>}
                    </div>

                    {/* Delivery Zone Information */}
                    {address.delivery_zone && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-blue-900">{address.delivery_zone.name}</p>
                          <p className="text-sm font-bold text-blue-900">
                            ${address.delivery_zone.delivery_fee.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-xs text-blue-700">
                          Delivery in {Math.floor(address.delivery_zone.max_delivery_time / 60)} hours • Min. order $
                          {address.delivery_zone.min_order_amount.toFixed(2)}
                        </p>
                      </div>
                    )}

                    {/* Validation Messages */}
                    {address.zone_validation && !address.zone_validation.isValid && (
                      <Alert variant="destructive" className="mt-3">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-xs">{address.zone_validation.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>

      {validatedAddresses.filter((a) => a.zone_validation?.isValid).length === 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            None of your saved addresses are in our delivery zones. Please add a new address or check our coverage
            areas.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
