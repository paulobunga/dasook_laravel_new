"use client"

import FrontendLayout from "@/layouts/frontend-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Grid, List, Star, Heart, ShoppingCart } from "lucide-react"
import { Link } from "@inertiajs/react"
import { useState } from "react"
import ProductPricingDisplay from "@/components/product-pricing-display"

interface Product {
  id: number
  name: string
  slug: string
  price: number
  sale_price?: number
  image_url?: string
  vendor: {
    store_name: string
    slug: string
  }
  category: {
    name: string
    slug: string
  }
  rating?: number
  reviews_count: number
  is_featured: boolean
  pricing: {
    price: number
    compare_at_price: number | null
    currency: string
  }
}

interface ProductsIndexProps {
  products: {
    data: Product[]
    links: any[]
    meta: any
  }
  categories: any[]
  brands: any[]
  filters: {
    search?: string
    category?: string
    brand?: string
    min_price?: number
    max_price?: number
    sort?: string
  }
}

export default function ProductsIndex({ products, categories, brands, filters }: ProductsIndexProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([filters.min_price || 0, filters.max_price || 1000])

  return (
    <FrontendLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover amazing products from our trusted vendors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>

                {/* Search */}
                <div className="mb-6">
                  <Label htmlFor="search">Search Products</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input id="search" placeholder="Search..." className="pl-10" defaultValue={filters.search} />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Categories</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox id={`category-${category.id}`} />
                        <Label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name} ({category.products_count})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Brands</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${brand.id}`} />
                        <Label htmlFor={`brand-${brand.id}`} className="text-sm">
                          {brand.name} ({brand.products_count})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                  <div className="px-2">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="mb-4" />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Rating</Label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center text-sm">
                          <div className="flex items-center">
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            {Array.from({ length: 5 - rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-gray-300" />
                            ))}
                          </div>
                          <span className="ml-2">& Up</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  Showing {products.data.length} of {products.meta?.total || 0} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select defaultValue={filters.sort || "newest"}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {products.data.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {products.data.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className={viewMode === "grid" ? "p-4" : "p-4 flex gap-4"}>
                      {/* Product Image */}
                      <div
                        className={
                          viewMode === "grid"
                            ? "aspect-square bg-gray-200 rounded-lg mb-4"
                            : "w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0"
                        }
                      >
                        {product.is_featured && <Badge className="absolute top-2 left-2 bg-yellow-500">Featured</Badge>}
                        {product.sale_price && <Badge className="absolute top-2 right-2 bg-red-500">Sale</Badge>}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <Link href={`/products/${product.slug}`}>
                              <h3 className="font-semibold hover:text-blue-600 transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                            </Link>
                            <Link href={`/vendors/${product.vendor.slug}`}>
                              <p className="text-sm text-gray-600 hover:text-blue-600">{product.vendor.store_name}</p>
                            </Link>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{product.rating?.toFixed(1) || "4.5"}</span>
                            <span className="text-sm text-gray-500 ml-1">({product.reviews_count})</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <ProductPricingDisplay
                            price={product.pricing.price}
                            compareAtPrice={product.pricing.compare_at_price}
                            currency={product.pricing.currency}
                          />
                          <Button size="sm">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria</p>
                <Button variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {products.links && (
              <div className="flex items-center justify-center mt-8 space-x-2">
                {products.links.map((link, index) => (
                  <Button
                    key={index}
                    variant={link.active ? "default" : "outline"}
                    size="sm"
                    disabled={!link.url}
                    asChild={!!link.url}
                  >
                    {link.url ? (
                      <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </FrontendLayout>
  )
}
