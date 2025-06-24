"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Truck, Clock, Search, Navigation } from "lucide-react"

interface PickupLocation {
  id: number
  name: string
  address: string
  city: string
  state: string
  postal_code: string
  phone: string
  hours: string
  distance?: string
  available_slots: string[]
}

interface DeliveryMethodSelectorProps {
  selectedMethod: "pickup" | "delivery"
  selectedPickupLocationId?: number
  onMethodChange: (method: "pickup" | "delivery") => void
  onPickupLocationSelect: (locationId: number) => void
}

export function DeliveryMethodSelector({
  selectedMethod,
  selectedPickupLocationId,
  onMethodChange,
  onPickupLocationSelect,
}: DeliveryMethodSelectorProps) {
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")

  const pickupLocations: PickupLocation[] = [
    {
      id: 1,
      name: "Downtown Store",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      postal_code: "10001",
      phone: "(555) 123-4567",
      hours: "Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM",
      distance: "0.5 miles",
      available_slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"],
    },
    {
      id: 2,
      name: "Mall Location",
      address: "456 Shopping Center Blvd",
      city: "New York",
      state: "NY",
      postal_code: "10002",
      phone: "(555) 234-5678",
      hours: "Mon-Sat: 10AM-9PM, Sun: 11AM-7PM",
      distance: "1.2 miles",
      available_slots: ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"],
    },
    {
      id: 3,
      name: "Airport Branch",
      address: "789 Airport Road",
      city: "Queens",
      state: "NY",
      postal_code: "11430",
      phone: "(555) 345-6789",
      hours: "Daily: 6AM-10PM",
      distance: "8.5 miles",
      available_slots: ["8:00 AM", "12:00 PM", "4:00 PM", "8:00 PM"],
    },
  ]

  const filteredLocations = pickupLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      location.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
      location.city.toLowerCase().includes(searchLocation.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Delivery Method</h3>
        <RadioGroup value={selectedMethod} onValueChange={(value: "pickup" | "delivery") => onMethodChange(value)}>
          <div className="grid gap-4">
            {/* Delivery Option */}
            <Card
              className={`cursor-pointer transition-colors ${selectedMethod === "delivery" ? "ring-2 ring-blue-600" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="delivery" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium">Home Delivery</h4>
                      <Badge variant="secondary">$9.99</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Get your order delivered to your doorstep within 5-7 business days.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        5-7 business days
                      </span>
                      <span>Free delivery on orders over $50</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Option */}
            <Card
              className={`cursor-pointer transition-colors ${selectedMethod === "pickup" ? "ring-2 ring-blue-600" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="pickup" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium">Store Pickup</h4>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        FREE
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Pick up your order from one of our convenient store locations.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Ready in 2-4 hours
                      </span>
                      <span>Available at {pickupLocations.length} locations</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </RadioGroup>
      </div>

      {/* Pickup Location Selection */}
      {selectedMethod === "pickup" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Select Pickup Location</h4>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              Use My Location
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by location name or address..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Location List */}
          <RadioGroup
            value={selectedPickupLocationId?.toString()}
            onValueChange={(value) => onPickupLocationSelect(Number.parseInt(value))}
          >
            <div className="space-y-3">
              {filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  className={`cursor-pointer transition-colors ${selectedPickupLocationId === location.id ? "ring-2 ring-blue-600" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={location.id.toString()} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{location.name}</h5>
                          {location.distance && (
                            <Badge variant="outline" className="text-xs">
                              {location.distance}
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{location.address}</p>
                          <p>
                            {location.city}, {location.state} {location.postal_code}
                          </p>
                          <p className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {location.hours}
                          </p>
                          <p>📞 {location.phone}</p>
                        </div>

                        {/* Time Slot Selection */}
                        {selectedPickupLocationId === location.id && (
                          <div className="mt-4 pt-4 border-t">
                            <h6 className="font-medium mb-2">Select Pickup Time</h6>
                            <div className="grid grid-cols-3 gap-2">
                              {location.available_slots.map((slot) => (
                                <Button
                                  key={slot}
                                  variant={selectedTimeSlot === slot ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedTimeSlot(slot)}
                                  className="text-xs"
                                >
                                  {slot}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </RadioGroup>

          {filteredLocations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No pickup locations found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
