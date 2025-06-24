export interface SurgePricingFactors {
  base_multiplier: number
  time_multiplier: number
  demand_multiplier: number
  weather_multiplier: number
  capacity_multiplier: number
  holiday_multiplier: number
  zone_multiplier: number
}

export interface DemandData {
  zone_id: number
  current_orders: number
  available_drivers: number
  average_delivery_time: number
  completion_rate: number
  timestamp: Date
}

export interface SurgePricingResult {
  original_price: number
  surge_price: number
  surge_multiplier: number
  factors: SurgePricingFactors
  is_surge_active: boolean
  surge_reason: string[]
  estimated_duration: string
  next_price_check: Date
}

export interface WeatherCondition {
  condition: "clear" | "rain" | "snow" | "storm" | "fog"
  severity: "light" | "moderate" | "heavy"
  temperature: number
  visibility: number
}

// Mock real-time demand data
export const mockDemandData: Record<number, DemandData> = {
  1: {
    zone_id: 1,
    current_orders: 45,
    available_drivers: 8,
    average_delivery_time: 180, // 3 hours
    completion_rate: 0.85,
    timestamp: new Date(),
  },
  2: {
    zone_id: 2,
    current_orders: 32,
    available_drivers: 12,
    average_delivery_time: 150,
    completion_rate: 0.92,
    timestamp: new Date(),
  },
  3: {
    zone_id: 3,
    current_orders: 18,
    available_drivers: 15,
    average_delivery_time: 120,
    completion_rate: 0.95,
    timestamp: new Date(),
  },
  4: {
    zone_id: 4,
    current_orders: 8,
    available_drivers: 20,
    average_delivery_time: 90,
    completion_rate: 0.98,
    timestamp: new Date(),
  },
  5: {
    zone_id: 5,
    current_orders: 25,
    available_drivers: 5,
    average_delivery_time: 200,
    completion_rate: 0.78,
    timestamp: new Date(),
  },
}

// Mock weather data
export const mockWeatherData: WeatherCondition = {
  condition: "rain",
  severity: "moderate",
  temperature: 15,
  visibility: 5,
}

export function calculateTimeMultiplier(): number {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()
  const isWeekend = day === 0 || day === 6

  // Peak hours: 11AM-2PM (lunch) and 5PM-9PM (dinner)
  const isLunchRush = hour >= 11 && hour <= 14
  const isDinnerRush = hour >= 17 && hour <= 21
  const isLateNight = hour >= 22 || hour <= 6

  let multiplier = 1.0

  if (isLunchRush) multiplier += 0.3
  if (isDinnerRush) multiplier += 0.5
  if (isLateNight) multiplier += 0.2
  if (isWeekend) multiplier += 0.15

  return Math.min(multiplier, 2.5) // Cap at 2.5x
}

export function calculateDemandMultiplier(demandData: DemandData): number {
  const { current_orders, available_drivers, completion_rate } = demandData

  // Calculate demand-to-capacity ratio
  const demandRatio = current_orders / Math.max(available_drivers, 1)

  // Base multiplier on demand ratio
  let multiplier = 1.0

  if (demandRatio > 5)
    multiplier += 0.8 // Very high demand
  else if (demandRatio > 3)
    multiplier += 0.5 // High demand
  else if (demandRatio > 2)
    multiplier += 0.3 // Moderate demand
  else if (demandRatio > 1.5) multiplier += 0.15 // Slight demand

  // Adjust based on completion rate
  if (completion_rate < 0.8) multiplier += 0.2
  else if (completion_rate < 0.9) multiplier += 0.1

  return Math.min(multiplier, 3.0) // Cap at 3x
}

export function calculateWeatherMultiplier(weather: WeatherCondition): number {
  let multiplier = 1.0

  switch (weather.condition) {
    case "rain":
      multiplier += weather.severity === "heavy" ? 0.4 : weather.severity === "moderate" ? 0.25 : 0.15
      break
    case "snow":
      multiplier += weather.severity === "heavy" ? 0.6 : weather.severity === "moderate" ? 0.4 : 0.25
      break
    case "storm":
      multiplier += 0.8
      break
    case "fog":
      multiplier += weather.visibility < 2 ? 0.3 : 0.15
      break
  }

  // Temperature adjustments
  if (weather.temperature < 0) multiplier += 0.2
  else if (weather.temperature > 35) multiplier += 0.15

  return Math.min(multiplier, 2.0) // Cap at 2x
}

export function calculateHolidayMultiplier(): number {
  const now = new Date()
  const month = now.getMonth()
  const date = now.getDate()
  const day = now.getDay()

  // Major holidays and events
  const holidays = [
    { month: 11, date: 25 }, // Christmas
    { month: 0, date: 1 }, // New Year
    { month: 6, date: 4 }, // Independence Day
    { month: 10, date: 22 }, // Thanksgiving (approximate)
  ]

  const isHoliday = holidays.some((h) => h.month === month && Math.abs(h.date - date) <= 1)
  const isBlackFriday = month === 10 && date >= 23 && date <= 29 && day === 5
  const isValentines = month === 1 && date === 14
  const isMothersDay = month === 4 && day === 0 && date >= 8 && date <= 14

  if (isHoliday) return 1.5
  if (isBlackFriday) return 1.8
  if (isValentines || isMothersDay) return 1.3

  return 1.0
}

export function calculateZoneMultiplier(zoneId: number): number {
  // Zone-specific multipliers based on difficulty/distance
  const zoneMultipliers: Record<number, number> = {
    1: 1.0, // Downtown - easy access
    2: 1.1, // Metropolitan - moderate
    3: 1.25, // Suburban - longer distance
    4: 1.4, // Extended - difficult access
    5: 0.9, // Premium Express - optimized routes
  }

  return zoneMultipliers[zoneId] || 1.0
}

export function calculateSurgePrice(
  basePrice: number,
  zoneId: number,
  demandData?: DemandData,
  weather?: WeatherCondition,
): SurgePricingResult {
  const currentDemand = demandData || mockDemandData[zoneId]
  const currentWeather = weather || mockWeatherData

  const factors: SurgePricingFactors = {
    base_multiplier: 1.0,
    time_multiplier: calculateTimeMultiplier(),
    demand_multiplier: calculateDemandMultiplier(currentDemand),
    weather_multiplier: calculateWeatherMultiplier(currentWeather),
    capacity_multiplier: 1.0, // Reserved for future capacity-based pricing
    holiday_multiplier: calculateHolidayMultiplier(),
    zone_multiplier: calculateZoneMultiplier(zoneId),
  }

  // Calculate total multiplier
  const totalMultiplier = Object.values(factors).reduce((acc, val) => acc * val, 1)
  const surgePrice = basePrice * totalMultiplier
  const isSurgeActive = totalMultiplier > 1.15 // 15% threshold for surge activation

  // Generate surge reasons
  const surgeReasons: string[] = []
  if (factors.time_multiplier > 1.1) surgeReasons.push("Peak hours")
  if (factors.demand_multiplier > 1.2) surgeReasons.push("High demand")
  if (factors.weather_multiplier > 1.1) surgeReasons.push("Weather conditions")
  if (factors.holiday_multiplier > 1.1) surgeReasons.push("Holiday/Special event")
  if (factors.zone_multiplier > 1.2) surgeReasons.push("Extended delivery area")

  // Estimate surge duration
  let estimatedDuration = "15-30 minutes"
  if (factors.demand_multiplier > 2) estimatedDuration = "1-2 hours"
  else if (factors.weather_multiplier > 1.3) estimatedDuration = "2-4 hours"
  else if (factors.holiday_multiplier > 1.2) estimatedDuration = "4-8 hours"

  return {
    original_price: basePrice,
    surge_price: Math.round(surgePrice * 100) / 100,
    surge_multiplier: Math.round(totalMultiplier * 100) / 100,
    factors,
    is_surge_active: isSurgeActive,
    surge_reason: surgeReasons,
    estimated_duration: estimatedDuration,
    next_price_check: new Date(Date.now() + 5 * 60 * 1000), // Next check in 5 minutes
  }
}

export function getSurgeLevel(multiplier: number): "low" | "medium" | "high" | "extreme" {
  if (multiplier >= 2.5) return "extreme"
  if (multiplier >= 2.0) return "high"
  if (multiplier >= 1.5) return "medium"
  return "low"
}

export function getSurgeLevelColor(level: string): string {
  switch (level) {
    case "extreme":
      return "text-red-600 bg-red-50"
    case "high":
      return "text-orange-600 bg-orange-50"
    case "medium":
      return "text-yellow-600 bg-yellow-50"
    case "low":
      return "text-blue-600 bg-blue-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

// Historical demand tracking for analytics
export interface DemandHistory {
  timestamp: Date
  zone_id: number
  demand_level: number
  surge_multiplier: number
  weather_condition: string
  orders_completed: number
}

export function trackDemandHistory(
  zoneId: number,
  demandLevel: number,
  surgeMultiplier: number,
  weatherCondition: string,
  ordersCompleted: number,
): DemandHistory {
  return {
    timestamp: new Date(),
    zone_id: zoneId,
    demand_level: demandLevel,
    surge_multiplier: surgeMultiplier,
    weather_condition: weatherCondition,
    orders_completed: ordersCompleted,
  }
}
