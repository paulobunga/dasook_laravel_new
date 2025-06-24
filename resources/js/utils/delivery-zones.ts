export interface DeliveryZone {
  id: number
  name: string
  description: string
  postal_codes: string[]
  delivery_fee: number
  min_order_amount: number
  max_delivery_time: number
  is_active: boolean
  priority: number
  restrictions?: {
    no_weekend_delivery?: boolean
    no_evening_delivery?: boolean
    requires_signature?: boolean
    fragile_items_only?: boolean
  }
}

export interface ZoneValidationResult {
  isValid: boolean
  zone?: DeliveryZone
  message: string
  alternativeZones?: DeliveryZone[]
}

// Mock delivery zones data
export const deliveryZones: DeliveryZone[] = [
  {
    id: 1,
    name: "Downtown Core",
    description: "Central business district with premium delivery",
    postal_codes: ["10001", "10002", "10003", "10004", "10005"],
    delivery_fee: 5.99,
    min_order_amount: 25.0,
    max_delivery_time: 120, // 2 hours
    is_active: true,
    priority: 1,
    restrictions: {
      requires_signature: true,
    },
  },
  {
    id: 2,
    name: "Metropolitan Area",
    description: "Standard delivery zone covering most of the city",
    postal_codes: ["10006", "10007", "10008", "10009", "10010", "10011", "10012", "10013", "10014", "10015"],
    delivery_fee: 9.99,
    min_order_amount: 35.0,
    max_delivery_time: 240, // 4 hours
    is_active: true,
    priority: 2,
  },
  {
    id: 3,
    name: "Suburban Zone",
    description: "Extended delivery area with longer delivery times",
    postal_codes: ["10016", "10017", "10018", "10019", "10020", "10021", "10022", "10023", "10024", "10025"],
    delivery_fee: 14.99,
    min_order_amount: 50.0,
    max_delivery_time: 480, // 8 hours
    is_active: true,
    priority: 3,
    restrictions: {
      no_weekend_delivery: true,
    },
  },
  {
    id: 4,
    name: "Extended Area",
    description: "Outer delivery zone with next-day delivery only",
    postal_codes: ["10026", "10027", "10028", "10029", "10030", "10031", "10032", "10033", "10034", "10035"],
    delivery_fee: 19.99,
    min_order_amount: 75.0,
    max_delivery_time: 1440, // 24 hours
    is_active: true,
    priority: 4,
    restrictions: {
      no_weekend_delivery: true,
      no_evening_delivery: true,
    },
  },
  {
    id: 5,
    name: "Premium Express Zone",
    description: "Ultra-fast delivery for premium customers",
    postal_codes: ["10001", "10002", "10003"], // Overlaps with downtown for express option
    delivery_fee: 15.99,
    min_order_amount: 100.0,
    max_delivery_time: 60, // 1 hour
    is_active: true,
    priority: 0, // Highest priority
    restrictions: {
      requires_signature: true,
    },
  },
]

export function validateDeliveryAddress(postalCode: string, orderAmount = 0): ZoneValidationResult {
  // Find all zones that serve this postal code
  const availableZones = deliveryZones
    .filter((zone) => zone.is_active && zone.postal_codes.includes(postalCode))
    .sort((a, b) => a.priority - b.priority)

  if (availableZones.length === 0) {
    // Check for nearby zones
    const nearbyZones = findNearbyZones(postalCode)
    return {
      isValid: false,
      message: `Sorry, we don't deliver to postal code ${postalCode}. Please check nearby areas.`,
      alternativeZones: nearbyZones,
    }
  }

  // Find the best zone based on order amount and priority
  const eligibleZones = availableZones.filter((zone) => orderAmount >= zone.min_order_amount)

  if (eligibleZones.length === 0) {
    const lowestMinOrder = Math.min(...availableZones.map((z) => z.min_order_amount))
    return {
      isValid: false,
      message: `Minimum order amount for delivery to ${postalCode} is $${lowestMinOrder.toFixed(2)}`,
      zone: availableZones[0],
    }
  }

  return {
    isValid: true,
    zone: eligibleZones[0],
    message: `Delivery available to ${postalCode}`,
    alternativeZones: eligibleZones.slice(1),
  }
}

export function findNearbyZones(postalCode: string): DeliveryZone[] {
  // Simple logic to find nearby postal codes (in real app, use geolocation API)
  const codeNum = Number.parseInt(postalCode)
  const nearbyZones: DeliveryZone[] = []

  deliveryZones.forEach((zone) => {
    zone.postal_codes.forEach((zoneCode) => {
      const zoneNum = Number.parseInt(zoneCode)
      if (Math.abs(codeNum - zoneNum) <= 5 && !nearbyZones.includes(zone)) {
        nearbyZones.push(zone)
      }
    })
  })

  return nearbyZones.slice(0, 3) // Return top 3 nearby zones
}

export function calculateDeliveryOptions(postalCode: string, orderAmount: number) {
  const availableZones = deliveryZones
    .filter((zone) => zone.is_active && zone.postal_codes.includes(postalCode))
    .filter((zone) => orderAmount >= zone.min_order_amount)
    .sort((a, b) => a.priority - b.priority)

  return availableZones.map((zone) => ({
    ...zone,
    estimated_delivery: formatDeliveryTime(zone.max_delivery_time),
    is_eligible: orderAmount >= zone.min_order_amount,
    savings: orderAmount >= zone.min_order_amount + 25 ? zone.delivery_fee * 0.1 : 0, // 10% discount for large orders
  }))
}

export function formatDeliveryTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60)
    return `${hours} hour${hours > 1 ? "s" : ""}`
  } else {
    const days = Math.floor(minutes / 1440)
    return `${days} day${days > 1 ? "s" : ""}`
  }
}

export function getDeliveryRestrictions(zone: DeliveryZone): string[] {
  const restrictions: string[] = []

  if (zone.restrictions?.no_weekend_delivery) {
    restrictions.push("No weekend delivery")
  }
  if (zone.restrictions?.no_evening_delivery) {
    restrictions.push("No evening delivery (after 6 PM)")
  }
  if (zone.restrictions?.requires_signature) {
    restrictions.push("Signature required")
  }
  if (zone.restrictions?.fragile_items_only) {
    restrictions.push("Fragile items only")
  }

  return restrictions
}
