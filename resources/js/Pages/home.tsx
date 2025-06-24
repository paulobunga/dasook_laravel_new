"use client"

import FrontendLayout from "@/layouts/frontend-layout"
import { ProductCarousel } from "@/components/product-carousel"
import { CollectionsGrid } from "@/components/collections-grid"
import { AdBanner } from "@/components/ad-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "@inertiajs/react"
import { Truck, Shield, Headphones, RotateCcw, Star, ArrowRight, ShoppingCart } from "lucide-react" // Added ShoppingCart
import { mockCategories, mockCollections, mockAds, mockFeaturedProducts, mockFlashSales } from "@/data/mock-data" // Assuming mock data is extended or available

// Interface for props if we were to pass them from backend (good for future reference)
interface HomePageProps {
  featuredProducts?: any[]
  categories?: any[]
  flashSales?: any[]
  collections?: any[]
  ads?: any[]
  // sliders?: any[]; // Sliders were mentioned in index.tsx but not implemented
}

export default function HomePage({
  // Defaulting to mock data for now
  featuredProducts = mockFeaturedProducts, // Using mock data
  categories = mockCategories,             // Using mock data
  flashSales = mockFlashSales,               // Using mock data
  collections = mockCollections,           // Using mock data
  ads = mockAds,                           // Using mock data
}: HomePageProps) {
  // Randomly place ads throughout the page (max 4)
  const shuffledAds = [...ads].sort(() => Math.random() - 0.5).slice(0, 4)

  return (
    <FrontendLayout>
      <div className="container mx-auto px-4">
        {/* Hero Section (from home.tsx, using Inertia Link) */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg my-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Products</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Shop from thousands of trusted vendors and find everything you need in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/products">
                  <ShoppingCart className="mr-2 w-5 h-5" /> Shop Now
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/vendor-onboarding">Become a Vendor</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section (Combined, using Card style from home.tsx) */}
        <section className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className="font-semibold mb-2">Quality Products</h3>
                <p className="text-sm text-gray-600">Verified vendors & products</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Headphones className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">Always here to help</p>
              </CardContent>
            </Card>
            {/* Removed Easy Returns as it's less common than Quality Products, can be added back if needed */}
          </div>
        </section>

        {/* Ad Banner 1 (from home.tsx) */}
        {shuffledAds[0] && (
          <section className="py-4">
            <AdBanner ad={shuffledAds[0]} className="h-48" />
          </section>
        )}

        {/* Featured Products (from index.tsx, adapted) */}
        <section className="py-16 bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our most popular items</p>
          </div>
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product: any) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                       {/* Placeholder for image, or use product.image if available */}
                       <img src={product.image || `https://via.placeholder.com/300x300.png?text=${product.name}`} alt={product.name} className="max-h-full max-w-full rounded-lg" />
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">${product.price}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating || "4.5"}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                        <Link href={`/products/${product.slug || product.id}`}>View Product</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured products available at the moment.</p>
            </div>
          )}
        </section>

        {/* Category Carousels (from home.tsx) */}
        {categories && categories.map((category: any, index: number) => (
          <div key={category.id}>
            <ProductCarousel
              title={`${category.icon || '🛍️'} ${category.name}`}
              products={category.products || []} // Ensure products array exists
              viewAllLink={`/categories/${category.slug || category.id}`}
            />
            {/* Insert ads randomly between carousels */}
            {index === 1 && shuffledAds[1] && ( // Adjusted index for ad placement
              <section className="py-4">
                <AdBanner ad={shuffledAds[1]} className="h-32" />
              </section>
            )}
          </div>
        ))}

        {/* Flash Sales (from index.tsx, adapted) */}
        {flashSales && flashSales.length > 0 && (
          <section className="py-16 bg-red-50">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-red-700 mb-4">⚡ Flash Sales</h2>
              <p className="text-gray-600">Limited time offers, grab them before they're gone!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSales.slice(0, 4).map((sale: any) => (
                <Card key={sale.id} className="border-red-300 hover:shadow-xl transition-shadow">
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-red-600 hover:bg-red-700">Flash Sale</Badge>
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        {/* Placeholder for image, or use sale.image if available */}
                       <img src={sale.image || `https://via.placeholder.com/300x300.png?text=${sale.name}`} alt={sale.name} className="max-h-full max-w-full rounded-lg" />
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{sale.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xl font-bold text-red-600">${sale.sale_price}</span>
                        {sale.original_price && (
                          <span className="text-sm text-gray-500 line-through ml-2">${sale.original_price}</span>
                        )}
                      </div>
                      {/* Optional: Countdown Timer */}
                    </div>
                    <Button variant="destructive" size="sm" className="w-full mt-3" asChild>
                        <Link href={`/products/${sale.slug || sale.id}`}>View Deal</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Collections Section (from home.tsx) */}
        {collections && <CollectionsGrid collections={collections} />}

        {/* Ad Banner 2 & 3 (from home.tsx, adjusted placement) */}
        {shuffledAds[2] && (
          <section className="py-4">
            <AdBanner ad={shuffledAds[2]} className="h-40" />
          </section>
        )}
        {shuffledAds[3] && (
          <section className="py-4">
            <AdBanner ad={shuffledAds[3]} className="h-36" />
          </section>
        )}

        {/* Featured Vendors (from home.tsx, using mock for now) */}
        <section className="py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Vendors</h2>
            <p className="text-gray-600">Discover top-rated vendors in our marketplace</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { id: "v1", name: "TechWorld", logo: "/placeholder.svg?height=80&width=80", rating: 4.8, products: 1250 },
              { id: "v2", name: "FashionForward", logo: "/placeholder.svg?height=80&width=80", rating: 4.7, products: 890 },
              { id: "v3", name: "HomeDecor", logo: "/placeholder.svg?height=80&width=80", rating: 4.9, products: 567 },
              { id: "v4", name: "SportsPro", logo: "/placeholder.svg?height=80&width=80", rating: 4.6, products: 432 },
              { id: "v5", name: "BeautyHub", logo: "/placeholder.svg?height=80&width=80", rating: 4.8, products: 678 },
              { id: "v6", name: "BookWorld", logo: "/placeholder.svg?height=80&width=80", rating: 4.5, products: 1100 },
            ].map((vendor) => (
              <Card key={vendor.id} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={vendor.logo || "/placeholder.svg"}
                    alt={vendor.name}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200" // Added bg for placeholder visibility
                  />
                  <h3 className="font-semibold mb-2">{vendor.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm">{vendor.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">{vendor.products} products</p>
                   <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                        <Link href={`/vendors/${vendor.id}`}>Visit Store</Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup (from home.tsx) */}
        <section className="py-12 bg-gray-100 rounded-lg my-8"> {/* Slightly changed bg for visual separation */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
              offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button type="submit">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </section>
      </div>
    </FrontendLayout>
  )
}

// Ensure mock data is comprehensive enough for the merged component.
// You might need to add/update fields in your `mock-data.ts` for:
// - mockFeaturedProducts: id, name, price, rating, image, slug (optional)
// - mockCategories: id, name, icon, products (array of product objects), slug
// - mockFlashSales: id, name, sale_price, original_price, image, slug (optional)
// - mockCollections: (as needed by CollectionsGrid)
// - mockAds: (as needed by AdBanner)
// - mockVendors: id, name, logo, rating, products_count, slug (optional for link)
// If `mock-data.ts` is not structured this way, this component will have errors or missing data.
// For example, `mockCategories` in the original `home.tsx` had products,
// but `categories` in `index.tsx` was a flat list. The merged version assumes categories can have products for the carousel.
// Similarly, `featuredProducts` and `flashSales` now have image placeholders and links.
