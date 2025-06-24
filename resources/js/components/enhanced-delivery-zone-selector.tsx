"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Truck,
  Info,
  Navigation,
  TrendingUp,
} from "lucide-react"
import {
  validateDeliveryAddress,
  calculateDeliveryOptions,
  getDeliveryRestrictions,
  type DeliveryZone,
} from "@/utils/delivery-zones"
import { calculateSurgePrice, type SurgePricingResult } from "@/utils/surge-pricing"
import { SurgePricingIndicator } from "@/components/surge-pricing-indicator"

interface EnhancedDeliveryZoneSelectorProps {
  postalCode: string
  orderAmount: number
  selectedZoneId?: number
  onZoneSelect: (zone: DeliveryZone, pricingResult: SurgePricingResult) => void
  onPostalCodeChange: (postalCode: string) => void
}

export function EnhancedDeliveryZoneSelector({
  postalCode,
  orderAmount,
  selectedZoneId,
  onZoneSelect,
  onPostalCodeChange,
}: EnhancedDeliveryZoneSelectorProps) {
  const [inputPostalCode, setInputPostalCode] = useState(postalCode)
  const [validationResult, setValidationResult] = useState<any>(null)
  const [deliveryOptions, setDeliveryOptions] = useState<any[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [pricingResults, setPricingResults] = useState<Record<number, SurgePricingResult>>({})

  useEffect(() => {
    if (postalCode) {
      validateAndCalculateOptions(postalCode)
    }
  }, [postalCode, orderAmount])

  const validateAndCalculateOptions = async (code: string) => {
    setIsValidating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const validation = validateDeliveryAddress(code, orderAmount)
    const options = calculateDeliveryOptions(code, orderAmount)

    setValidationResult(validation)
    setDeliveryOptions(options)

    // Calculate surge pricing for each option
    const newPricingResults: Record<number, SurgePricingResult> = {}
    options.forEach((option) => {
      const pricingResult = calculateSurgePrice(option.delivery_fee, option.id)
      newPricingResults[option.id] = pricingResult
    })
    setPricingResults(newPricingResults)

    setIsValidating(false)

    // Auto-select the best option if available
    if (options.length > 0 && !selectedZoneId) {
      const bestOption = options[0]
      const bestPricing = newPricingResults[bestOption.id]
      onZoneSelect(bestOption, bestPricing)
    }
  }

  const handlePostalCodeSubmit = () => {
    if (inputPostalCode.trim()) {
      onPostalCodeChange(inputPostalCode.trim())
      validateAndCalculateOptions(inputPostalCode.trim())
    }
  }

  const handleZoneSelect = (zoneId: string) => {
    const zone = deliveryOptions.find((z) => z.id === Number.parseInt(zoneId))
    const pricingResult = pricingResults[Number.parseInt(zoneId)]
    if (zone && pricingResult) {
      onZoneSelect(zone, pricingResult)
    }
  }

  const handlePricingUpdate = (zoneId: number, result: SurgePricingResult) => {
    setPricingResults((prev) => ({
      ...prev,
      [zoneId]: result,
    }))

    // Update selected zone if this is the current selection
    if (selectedZoneId === zoneId) {
      const zone = deliveryOptions.find((z) => z.id === zoneId)
      if (zone) {
        onZoneSelect(zone, result)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Postal Code Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Check Delivery Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="postal-code">Postal Code</Label>
              <Input
                id="postal-code"
                value={inputPostalCode}
                onChange={(e) => setInputPostalCode(e.target.value)}
                placeholder="Enter your postal code"
                onKeyPress={(e) => e.key === "Enter" && handlePostalCodeSubmit()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handlePostalCodeSubmit} disabled={isValidating}>
                {isValidating ? "Checking..." : "Check"}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Navigation className="w-4 h-4" />
            <span>Or use your current location</span>
            <Button variant="link" size="sm" className="p-0 h-auto">
              Detect Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      {validationResult && (
        <div className="space-y-4">
          {!validationResult.isValid ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {validationResult.message}
                {validationResult.alternativeZones && validationResult.alternativeZones.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Try these nearby areas:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {validationResult.alternativeZones.map((zone: DeliveryZone) => (
                        <Badge key={zone.id} variant="outline" className="text-xs">
                          {zone.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Great! We deliver to your area. Choose your preferred delivery option below.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Delivery Options with Surge Pricing */}
      {deliveryOptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Available Delivery Options</span>
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Live Pricing
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedZoneId?.toString()} onValueChange={handleZoneSelect}>
              <div className="space-y-6">
                {deliveryOptions.map((option) => {
                  const pricingResult = pricingResults[option.id]

                  return (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-colors ${
                        selectedZoneId === option.id ? "ring-2 ring-blue-600" : ""
                      } ${pricingResult?.is_surge_active ? "border-orange-200" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value={option.id.toString()} className="mt-1" />
                          <div className="flex-1 space-y-4">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-blue-600" />
                                <h4 className="font-medium">{option.name}</h4>
                                {option.priority === 0 && (
                                  <Badge variant="default" className="bg-purple-600">
                                    Premium
                                  </Badge>
                                )}
                                {pricingResult?.is_surge_active && (
                                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Surge Active
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600">{option.description}</p>

                            {/* Surge Pricing Indicator */}
                            {pricingResult && (
                              <SurgePricingIndicator
                                basePrice={option.delivery_fee}
                                zoneId={option.id}
                                zoneName={option.name}
                                onPriceUpdate={(result) => handlePricingUpdate(option.id, result)}
                                showDetails={selectedZoneId === option.id}
                              />
                            )}

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>Delivery in {option.estimated_delivery}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-gray-400" />
                                <span>Min. order ${option.min_order_amount.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{option.postal_codes.length} postal codes</span>
                              </div>
                            </div>

                            {/* Restrictions */}
                            {getDeliveryRestrictions(option).length > 0 && (
                              <div className="space-y-2">
                                <Separator />
                                <div className="flex items-start gap-2">
                                  <Info className="w-4 h-4 text-amber-500 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-medium text-amber-700">Delivery Restrictions:</p>
                                    <ul className="text-xs text-amber-600 list-disc list-inside">
                                      {getDeliveryRestrictions(option).map((restriction, index) => (
                                        <li key={index}>{restriction}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Order Amount Check */}
                            {orderAmount < option.min_order_amount && (
                              <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription className="text-xs">
                                  Add ${(option.min_order_amount - orderAmount).toFixed(2)} more to qualify for this
                                  delivery option.
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Zone Coverage Map Placeholder */}
      {postalCode && (
        <Card>
          <CardHeader>
            <CardTitle>Delivery Coverage Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Interactive delivery zone map</p>
              <p className="text-sm text-gray-500">Showing coverage for postal code: {postalCode}</p>
              <p className="text-xs text-orange-600 mt-2">🔥 Real-time surge pricing active in highlighted areas</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
