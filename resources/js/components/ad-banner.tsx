"use client"

import { Card } from "@/components/ui/card"
import { Link } from "@inertiajs/react"
import type { Ad } from "@/data/mock-data"

interface AdBannerProps {
  ad: Ad
  className?: string
}

export function AdBanner({ ad, className = "" }: AdBannerProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      <Link href={ad.link}>
        <div className="relative">
          <img src={ad.image_url || "/placeholder.svg"} alt={ad.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <h3 className="text-white text-xl font-bold text-center px-4">{ad.title}</h3>
          </div>
        </div>
      </Link>
    </Card>
  )
}
