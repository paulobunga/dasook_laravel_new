"use client"

import FrontendLayout from "@/layouts/frontend-layout"
import { ProductCarousel } from "@/components/product-carousel"
import { CollectionsGrid } from "@/components/collections-grid"
import { AdBanner } from "@/components/ad-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@inertiajs/react"
import { Truck, Shield, Headphones, RotateCcw, Star, ArrowRight } from "lucide-react"
import { mockCategories, mockCollections, mockAds } from "@/data/mock-data"

export default function HomePage() {
  // Randomly place ads throughout the page (max 4)
  const shuffledAds = [...mockAds].sort(() => Math.random() - 0.5).slice(0, 4)

  return (
    <FrontendLayout>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg my-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Products</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Shop from thousands of trusted vendors and find everything you need in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/products">Shop Now</Link>
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

        {/* Features */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <Headphones className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">Always here to help</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <RotateCcw className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ad Banner 1 */}
        {shuffledAds[0] && (
          <section className="py-4">
            <AdBanner ad={shuffledAds[0]} className="h-48" />
          </section>
        )}

        {/* Category Carousels */}
        {mockCategories.map((category, index) => (
          <div key={category.id}>
            <ProductCarousel
              title={`${category.icon} ${category.name}`}
              products={category.products}
              viewAllLink={`/categories/${category.slug}`}
            />

            {/* Insert ads randomly between carousels */}
            {index === 2 && shuffledAds[1] && (
              <section className="py-4">
                <AdBanner ad={shuffledAds[1]} className="h-32" />
              </section>
            )}

            {index === 5 && shuffledAds[2] && (
              <section className="py-4">
                <AdBanner ad={shuffledAds[2]} className="h-40" />
              </section>
            )}
          </div>
        ))}

        {/* Collections Section */}
        <CollectionsGrid collections={mockCollections} />

        {/* Ad Banner 2 */}
        {shuffledAds[3] && (
          <section className="py-4">
            <AdBanner ad={shuffledAds[3]} className="h-36" />
          </section>
        )}

        {/* Featured Vendors */}
        <section className="py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Vendors</h2>
            <p className="text-gray-600">Discover top-rated vendors in our marketplace</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "TechWorld", logo: "/placeholder.svg?height=80&width=80", rating: 4.8, products: 1250 },
              { name: "FashionForward", logo: "/placeholder.svg?height=80&width=80", rating: 4.7, products: 890 },
              { name: "HomeDecor", logo: "/placeholder.svg?height=80&width=80", rating: 4.9, products: 567 },
              { name: "SportsPro", logo: "/placeholder.svg?height=80&width=80", rating: 4.6, products: 432 },
              { name: "BeautyHub", logo: "/placeholder.svg?height=80&width=80", rating: 4.8, products: 678 },
              { name: "BookWorld", logo: "/placeholder.svg?height=80&width=80", rating: 4.5, products: 1100 },
            ].map((vendor, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={vendor.logo || "/placeholder.svg"}
                    alt={vendor.name}
                    className="w-16 h-16 mx-auto mb-4 rounded-full"
                  />
                  <h3 className="font-semibold mb-2">{vendor.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm">{vendor.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">{vendor.products} products</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 bg-gray-50 rounded-lg my-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
              offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button>
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </FrontendLayout>
  )
}
