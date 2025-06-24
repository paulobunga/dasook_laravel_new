"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Wallet, Plus, Lock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PaymentMethod {
  id: number
  type: "card" | "digital_wallet" | "bank_transfer"
  name: string
  details: string
  last_four?: string
  brand?: string
  is_default: boolean
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[]
  selectedPaymentId?: number
  onPaymentSelect: (paymentId: number) => void
  onPaymentAdd: (payment: Omit<PaymentMethod, "id">) => void
}

export function PaymentMethods({
  paymentMethods,
  selectedPaymentId,
  onPaymentSelect,
  onPaymentAdd,
}: PaymentMethodsProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPayment, setNewPayment] = useState({
    type: "card" as const,
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    isDefault: false,
  })

  const getPaymentIcon = (type: string, brand?: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="w-5 h-5" />
      case "digital_wallet":
        return <Smartphone className="w-5 h-5" />
      case "bank_transfer":
        return <Wallet className="w-5 h-5" />
      default:
        return <CreditCard className="w-5 h-5" />
    }
  }

  const handleAddPayment = () => {
    const payment: Omit<PaymentMethod, "id"> = {
      type: "card",
      name: `${newPayment.cardholderName}'s Card`,
      details: `**** **** **** ${newPayment.cardNumber.slice(-4)}`,
      last_four: newPayment.cardNumber.slice(-4),
      brand: "Visa", // This would be determined by card number
      is_default: newPayment.isDefault,
    }
    onPaymentAdd(payment)
    setNewPayment({
      type: "card",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: "",
      isDefault: false,
    })
    setShowAddForm(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Payment Method</h3>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>Add a new payment method to your account.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={newPayment.cardNumber}
                  onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth">Month</Label>
                  <Select
                    value={newPayment.expiryMonth}
                    onValueChange={(value) => setNewPayment({ ...newPayment, expiryMonth: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                          {String(i + 1).padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryYear">Year</Label>
                  <Select
                    value={newPayment.expiryYear}
                    onValueChange={(value) => setNewPayment({ ...newPayment, expiryYear: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                          {String(new Date().getFullYear() + i).slice(-2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={newPayment.cvv}
                    onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  value={newPayment.cardholderName}
                  onChange={(e) => setNewPayment({ ...newPayment, cardholderName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPayment}>Add Payment Method</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <RadioGroup
        value={selectedPaymentId?.toString()}
        onValueChange={(value) => onPaymentSelect(Number.parseInt(value))}
      >
        <div className="grid gap-4">
          {paymentMethods.map((payment) => (
            <Card
              key={payment.id}
              className={`cursor-pointer transition-colors ${selectedPaymentId === payment.id ? "ring-2 ring-blue-600" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={payment.id.toString()} />
                  <div className="flex items-center space-x-3 flex-1">
                    {getPaymentIcon(payment.type, payment.brand)}
                    <div>
                      <p className="font-medium">{payment.name}</p>
                      <p className="text-sm text-gray-600">{payment.details}</p>
                    </div>
                    {payment.is_default && (
                      <Badge variant="outline" className="ml-auto">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>

      {/* Digital Wallet Options */}
      <div className="space-y-2">
        <h4 className="font-medium">Quick Payment Options</h4>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12">
            <img src="/placeholder.svg?height=24&width=60" alt="Apple Pay" className="h-6" />
          </Button>
          <Button variant="outline" className="h-12">
            <img src="/placeholder.svg?height=24&width=60" alt="Google Pay" className="h-6" />
          </Button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <Lock className="w-4 h-4 text-green-600" />
        <span>Your payment information is encrypted and secure</span>
      </div>
    </div>
  )
}
