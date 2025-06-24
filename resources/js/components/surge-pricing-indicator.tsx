"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TrendingUp, Clock, CloudRain, Users, MapPin, Calendar, Info, RefreshCw, AlertTriangle } from "lucide-react"
import { calculateSurgePrice, getSurgeLevel, getSurgeLevelColor, type SurgePricingResult } from "@/utils/surge-pricing"

interface SurgePricingIndicatorProps {
  basePrice: number
  zoneId: number
  zoneName: string
  onPriceUpdate: (result: SurgePricingResult) => void
  showDetails?: boolean
}

export function SurgePricingIndicator({
  basePrice,
  zoneId,
  zoneName,
  onPriceUpdate,
  showDetails = true,
}: SurgePricingIndicatorProps) {
  const [pricingResult, setPricingResult] = useState<SurgePricingResult>()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>()

  useEffect(() => {
    updatePricing()
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(updatePricing, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [basePrice, zoneId])

  const updatePricing = async () => {
    setIsRefreshing(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const result = calculateSurgePrice(basePrice, zoneId)
    setPricingResult(result)
    setLastUpdated(new Date())
    onPriceUpdate(result)
    setIsRefreshing(false)
  }

  const handleRefresh = () => {
    updatePricing()
  }

  if (!pricingResult) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const surgeLevel = getSurgeLevel(pricingResult.surge_multiplier)
  const levelColor = getSurgeLevelColor(surgeLevel)

  return (
    <div className="space-y-4">
      {/* Main Pricing Display */}
      <Card className={pricingResult.is_surge_active ? "border-orange-200 bg-orange-50/30" : ""}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">{zoneName}</span>
              {pricingResult.is_surge_active && (
                <Badge className={levelColor}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {surgeLevel.toUpperCase()} SURGE
                </Badge>
              )}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh pricing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                {pricingResult.is_surge_active ? (
                  <>
                    <span className="text-lg font-bold text-orange-600">${pricingResult.surge_price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">
                      ${pricingResult.original_price.toFixed(2)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {pricingResult.surge_multiplier}x
                    </Badge>
                  </>
                ) : (
                  <span className="text-lg font-bold text-green-600">${pricingResult.surge_price.toFixed(2)}</span>
                )}
              </div>
              {lastUpdated && <p className="text-xs text-gray-500 mt-1">Updated {lastUpdated.toLocaleTimeString()}</p>}
            </div>

            {pricingResult.is_surge_active && (
              <div className="text-right">
                <p className="text-xs text-gray-600">Surge ends in</p>
                <p className="text-sm font-medium text-orange-600">{pricingResult.estimated_duration}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Surge Alert */}
      {pricingResult.is_surge_active && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium text-orange-800">Surge pricing is active due to:</p>
              <ul className="text-sm text-orange-700 list-disc list-inside">
                {pricingResult.surge_reason.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
              <p className="text-xs text-orange-600">Prices may change based on real-time demand and conditions.</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Detailed Breakdown */}
      {showDetails && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Info className="w-4 h-4" />
              Pricing Factors
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Time of day</span>
                </div>
                <span className="font-medium">{pricingResult.factors.time_multiplier.toFixed(2)}x</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>Demand level</span>
                </div>
                <span className="font-medium">{pricingResult.factors.demand_multiplier.toFixed(2)}x</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-gray-500" />
                  <span>Weather</span>
                </div>
                <span className="font-medium">{pricingResult.factors.weather_multiplier.toFixed(2)}x</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>Special events</span>
                </div>
                <span className="font-medium">{pricingResult.factors.holiday_multiplier.toFixed(2)}x</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Zone difficulty</span>
                </div>
                <span className="font-medium">{pricingResult.factors.zone_multiplier.toFixed(2)}x</span>
              </div>
            </div>

            {/* Surge Progress Bar */}
            {pricingResult.is_surge_active && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Surge Level</span>
                  <span>{Math.round((pricingResult.surge_multiplier - 1) * 100)}% increase</span>
                </div>
                <Progress value={Math.min((pricingResult.surge_multiplier - 1) * 50, 100)} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
