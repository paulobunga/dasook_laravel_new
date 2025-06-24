"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "@inertiajs/react"
import { useState, useRef } from "react"
import type { Vendor } from "@/data/mock-data"
import { ProductPricingDisplay } from "@/components/pricing/product-pricing-display"

interface ProductCarouselProps {
  title: string
  products: Product[]
  viewAllLink?: string
}

interface Product {
  id: number
  name: string
  slug: string
  image_url?: string
  rating: number
  reviews_count: number
  is_featured: boolean
  in_stock: boolean
  vendor: Vendor
  pricing: {
    type: "fixed" | "contact" | "offer"
    price?: number
    sale_price?: number
    contact_message?: string
    min_offer?: number
    offer_instructions?: string
  }
}

export function ProductCarousel({ title, products, viewAllLink }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320 // Width of one card plus gap
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })

      // Update scroll button states
      setTimeout(() => {
        if (scrollRef.current) {
          setCanScrollLeft(scrollRef.current.scrollLeft > 0)
          setCanScrollRight(
            scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
          )
        }
      }, 300)
    }
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          {viewAllLink && (
            <Button variant="outline" asChild>
              <Link href={viewAllLink}>View All</Link>
            </Button>
          )}
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={() => scroll("left")} disabled={!canScrollLeft}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => scroll("right")} disabled={!canScrollRight}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <Card key={product.id} className="flex-shrink-0 w-80 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.is_featured && <Badge className="bg-yellow-500 text-xs">Featured</Badge>}
                  {product.sale_price && <Badge className="bg-red-500 text-xs">Sale</Badge>}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
                </Link>
                <Link href={`/vendors/${product.vendor.slug}`}>
                  <p className="text-sm text-gray-600 hover:text-blue-600">{product.vendor.store_name}</p>
                </Link>

                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews_count})
                  </span>
                </div>

                <ProductPricingDisplay
                  pricing={product.pricing}
                  vendor={product.vendor}
                  productId={product.id}
                  productName={product.name}
                  size="sm"
                  showVendorInfo={false}
                />
                <Button size="sm" disabled={!product.in_stock}>
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {product.in_stock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
