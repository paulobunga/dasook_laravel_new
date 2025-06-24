"use client"

import { useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckoutProgress } from "@/components/checkout-progress"
import { PaymentMethods } from "@/components/payment-methods"
import { ArrowLeft, ArrowRight, Truck, Shield, Clock, Tag, MapPin } from "lucide-react"
import { DeliveryMethodSelector } from "@/components/delivery-method-selector"
import { EnhancedAddressSelector } from "@/components/enhanced-address-selector"
import type { DeliveryZone } from "@/utils/delivery-zones"
import { EnhancedDeliveryZoneSelector } from "@/components/enhanced-delivery-zone-selector"

interface CheckoutItem {
  id: number
  product_name: string
  product_image: string
  price: number
  quantity: number
  vendor_name: string
}

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
}

interface PaymentMethod {
  id: number
  type: "card" | "digital_wallet" | "bank_transfer"
  name: string
  details: string
  last_four?: string
  brand?: string
  is_default: boolean
}

interface PickupLocation {
  id: number
  name: string
  address: string
  city: string
  state: string
  postal_code: string
}

interface SurgePricingResult {
  zone_id: number
  base_price: number
  surge_multiplier: number
  surge_price: number
}

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAddressId, setSelectedAddressId] = useState<number>(1)
  const [selectedPaymentId, setSelectedPaymentId] = useState<number>(1)
  const [deliveryInstructions, setDeliveryInstructions] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("delivery")
  const [selectedPickupLocationId, setSelectedPickupLocationId] = useState<number>()
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<DeliveryZone>()
  const [surgePricingResult, setSurgePricingResult] = useState<SurgePricingResult>()
  const [customerPostalCode, setCustomerPostalCode] = useState("")

  const steps = ["Delivery", "Shipping", "Payment", "Review", "Confirmation"]

  // Mock data
  const cartItems: CheckoutItem[] = [
    {
      id: 1,
      product_name: "Wireless Bluetooth Headphones",
      product_image: "/placeholder.svg?height=80&width=80",
      price: 199.99,
      quantity: 1,
      vendor_name: "TechStore",
    },
    {
      id: 2,
      product_name: "Smartphone Case",
      product_image: "/placeholder.svg?height=80&width=80",
      price: 29.99,
      quantity: 2,
      vendor_name: "AccessoryHub",
    },
  ]

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "home",
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      address_line_1: "123 Main Street",
      address_line_2: "Apt 4B",
      city: "New York",
      state: "NY",
      postal_code: "10001",
      country: "US",
      landmark: "Near Central Park",
      is_default: true,
    },
    {
      id: 2,
      type: "work",
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      address_line_1: "456 Business Ave",
      city: "New York",
      state: "NY",
      postal_code: "10002",
      country: "US",
      is_default: false,
    },
  ])

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: "card",
      name: "Visa ending in 1234",
      details: "**** **** **** 1234",
      last_four: "1234",
      brand: "Visa",
      is_default: true,
    },
    {
      id: 2,
      type: "card",
      name: "Mastercard ending in 5678",
      details: "**** **** **** 5678",
      last_four: "5678",
      brand: "Mastercard",
      is_default: false,
    },
  ])

  const [pickupLocations, setPickupLocations] = useState<PickupLocation[]>([
    {
      id: 1,
      name: "Main Store",
      address: "789 Oak Street",
      city: "New York",
      state: "NY",
      postal_code: "10003",
    },
    {
      id: 2,
      name: "Downtown Branch",
      address: "101 Pine Avenue",
      city: "New York",
      state: "NY",
      postal_code: "10004",
    },
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping =
    deliveryMethod === "pickup" ? 0 : surgePricingResult?.surge_price || selectedDeliveryZone?.delivery_fee || 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleNext = () => {
    if (currentStep === 0 && deliveryMethod === "pickup") {
      setCurrentStep(2) // Skip shipping, go to payment
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setCurrentStep(4) // Move to confirmation step
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Delivery Method
        return (
          <DeliveryMethodSelector
            selectedMethod={deliveryMethod}
            selectedPickupLocationId={selectedPickupLocationId}
            onMethodChange={setDeliveryMethod}
            onPickupLocationSelect={setSelectedPickupLocationId}
            pickupLocations={pickupLocations}
          />
        )

      case 1: // Shipping (only show if delivery is selected)
        if (deliveryMethod === "pickup") {
          // Skip to payment step for pickup
          setCurrentStep(2)
          return null
        }
        return (
          <div className="space-y-6">
            {deliveryMethod === "delivery" && (
              <EnhancedDeliveryZoneSelector
                postalCode={customerPostalCode}
                orderAmount={subtotal}
                selectedZoneId={selectedDeliveryZone?.id}
                onZoneSelect={(zone, pricingResult) => {
                  setSelectedDeliveryZone(zone)
                  setSurgePricingResult(pricingResult)
                }}
                onPostalCodeChange={setCustomerPostalCode}
              />
            )}
            <EnhancedAddressSelector
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              orderAmount={subtotal}
              onAddressSelect={setSelectedAddressId}
              onAddressAdd={(address) => setAddresses([...addresses, { ...address, id: Date.now() }])}
            />
            <div className="space-y-2">
              <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
              <Textarea
                id="instructions"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="Any special delivery instructions..."
                rows={3}
              />
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Standard Delivery</p>
                    <p className="text-sm text-gray-600">5-7 business days • $9.99</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 2: // Payment
        return (
          <PaymentMethods
            paymentMethods={paymentMethods}
            selectedPaymentId={selectedPaymentId}
            onPaymentSelect={setSelectedPaymentId}
            onPaymentAdd={(payment) => setPaymentMethods([...paymentMethods, { ...payment, id: Date.now() }])}
          />
        )

      case 3: // Review
        return (
          <div className="space-y-6">
            {/* Delivery Method Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Delivery Method</h3>
              <Card>
                <CardContent className="p-4">
                  {deliveryMethod === "delivery" ? (
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Home Delivery</p>
                        <p className="text-sm text-gray-600">5-7 business days • $9.99</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Store Pickup</p>
                        <p className="text-sm text-gray-600">Ready in 2-4 hours • FREE</p>
                        {selectedPickupLocationId && (
                          <p className="text-sm text-gray-600 mt-1">
                            {pickupLocations.find((l) => l.id === selectedPickupLocationId)?.name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.product_image || "/placeholder.svg"}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product_name}</h4>
                      <p className="text-sm text-gray-600">by {item.vendor_name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {deliveryMethod === "delivery" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <p className="font-medium">{addresses.find((a) => a.id === selectedAddressId)?.name}</p>
                      <p className="text-sm text-gray-600">
                        {addresses.find((a) => a.id === selectedAddressId)?.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        {addresses.find((a) => a.id === selectedAddressId)?.address_line_1}
                        {addresses.find((a) => a.id === selectedAddressId)?.address_line_2 &&
                          `, ${addresses.find((a) => a.id === selectedAddressId)?.address_line_2}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {addresses.find((a) => a.id === selectedAddressId)?.city},{" "}
                        {addresses.find((a) => a.id === selectedAddressId)?.state}{" "}
                        {addresses.find((a) => a.id === selectedAddressId)?.postal_code}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="font-medium">{paymentMethods.find((p) => p.id === selectedPaymentId)?.name}</p>
                  <p className="text-sm text-gray-600">
                    {paymentMethods.find((p) => p.id === selectedPaymentId)?.details}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 4: // Confirmation
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Order Number:</span>
                    <span className="font-medium">#ORD-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <span className="font-medium">5-7 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-bold text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">Track Order</Button>
              <Button>Continue Shopping</Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <CheckoutProgress currentStep={currentStep} steps={steps} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep]}</CardTitle>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
            </Card>

            {/* Navigation */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentStep === 3 ? (
                  <Button onClick={handlePlaceOrder} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Place Order"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.product_image || "/placeholder.svg"}
                        alt={item.product_name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product_name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>30-Day Return Policy</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Tag className="w-4 h-4 text-purple-600" />
                    <span>Price Match Guarantee</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  )
}
