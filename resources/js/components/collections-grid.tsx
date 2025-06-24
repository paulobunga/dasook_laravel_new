"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Link } from "@inertiajs/react"
import type { Collection } from "@/data/mock-data"

interface CollectionsGridProps {
  collections: Collection[]
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Collections</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated collections featuring the best products across different categories
        </p>
      </div>

      <div className="space-y-12">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-gray-50 rounded-lg p-8">
            <div className="grid lg:grid-cols-3 gap-8 items-center mb-8">
              <div className="lg:col-span-1">
                <img
                  src={collection.image_url || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{collection.name}</h3>
                <p className="text-gray-600 mb-6">{collection.description}</p>
                <Button asChild>
                  <Link href={`/collections/${collection.id}`}>View Collection</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {collection.products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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
                        <h4 className="font-semibold hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                      </Link>
                      <Link href={`/vendors/${product.vendor.slug}`}>
                        <p className="text-sm text-gray-600 hover:text-blue-600">{product.vendor.store_name}</p>
                      </Link>

                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          {product.sale_price ? (
                            <div>
                              <span className="text-sm font-bold text-red-600">${product.sale_price}</span>
                              <span className="text-xs text-gray-500 line-through ml-1">${product.price}</span>
                            </div>
                          ) : (
                            <span className="text-sm font-bold">${product.price}</span>
                          )}
                        </div>
                        <Button size="sm" disabled={!product.in_stock}>
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
