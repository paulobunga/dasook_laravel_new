"use client"

import { useState } from "react"
import FrontendLayout from "@/layouts/frontend-layout"
import { SearchFiltersSidebar } from "@/components/search-filters-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Star, Heart, ShoppingCart, Grid, List, Search, Filter, X } from "lucide-react"
import { Link, router } from "@inertiajs/react"
import { mockCategories, type Product } from "@/data/mock-data"

interface SearchPageProps {
  query?: string
  results: {
    data: Product[]
    total: number
    per_page: number
    current_page: number
    last_page: number
  }
  filters: {
    categories?: string[]
    brands?: string[]
    min_price?: number
    max_price?: number
    rating?: number
    in_stock?: boolean
    on_sale?: boolean
    featured?: boolean
    free_shipping?: boolean
    sort?: string
  }
  suggestions?: string[]
}

interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
  onSale: boolean
  featured: boolean
  freeShipping: boolean
}

export default function SearchPage({ query = "", results, filters = {}, suggestions = [] }: SearchPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState(query)
  const [sortBy, setSortBy] = useState(filters.sort || "relevance")

  const [filterState, setFilterState] = useState<FilterState>({
    categories: filters.categories || [],
    brands: filters.brands || [],
    priceRange: [filters.min_price || 0, filters.max_price || 1000],
    rating: filters.rating || 0,
    inStock: filters.in_stock || false,
    onSale: filters.on_sale || false,
    featured: filters.featured || false,
    freeShipping: filters.free_shipping || false,
  })

  // Mock results if none provided
  const mockResults = results || {
    data: mockCategories.flatMap((cat) => cat.products).slice(0, 20),
    total: 100,
    per_page: 20,
    current_page: 1,
    last_page: 5,
  }

  const handleSearch = () => {
    const searchParams = new URLSearchParams()

    if (searchQuery) searchParams.set("q", searchQuery)
    if (filterState.categories.length) searchParams.set("categories", filterState.categories.join(","))
    if (filterState.brands.length) searchParams.set("brands", filterState.brands.join(","))
    if (filterState.priceRange[0] > 0) searchParams.set("min_price", filterState.priceRange[0].toString())
    if (filterState.priceRange[1] < 1000) searchParams.set("max_price", filterState.priceRange[1].toString())
    if (filterState.rating > 0) searchParams.set("rating", filterState.rating.toString())
    if (filterState.inStock) searchParams.set("in_stock", "1")
    if (filterState.onSale) searchParams.set("on_sale", "1")
    if (filterState.featured) searchParams.set("featured", "1")
    if (filterState.freeShipping) searchParams.set("free_shipping", "1")
    if (sortBy !== "relevance") searchParams.set("sort", sortBy)

    router.get(`/search?${searchParams.toString()}`)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    const searchParams = new URLSearchParams(window.location.search)
    if (value === "relevance") {
      searchParams.delete("sort")
    } else {
      searchParams.set("sort", value)
    }
    router.get(`/search?${searchParams.toString()}`)
  }

  const clearAllFilters = () => {
    setFilterState({
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      rating: 0,
      inStock: false,
      onSale: false,
      featured: false,
      freeShipping: false,
    })
    setSearchQuery("")
    setSortBy("relevance")
    router.get("/search")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filterState.categories.length) count += filterState.categories.length
    if (filterState.brands.length) count += filterState.brands.length
    if (filterState.priceRange[0] > 0 || filterState.priceRange[1] < 1000) count++
    if (filterState.rating > 0) count++
    if (filterState.inStock || filterState.onSale || filterState.featured || filterState.freeShipping) {
      count += [filterState.inStock, filterState.onSale, filterState.featured, filterState.freeShipping].filter(
        Boolean,
      ).length
    }
    return count
  }

  return (
    <FrontendLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-4 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
            <Button onClick={handleSearch} size="lg" className="px-8">
              Search
            </Button>
          </div>

          {query && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Search results for:</span>
              <Badge variant="outline" className="font-medium">
                "{query}"
              </Badge>
              {mockResults.total > 0 && <span>({mockResults.total.toLocaleString()} results found)</span>}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <SearchFiltersSidebar
              filters={filterState}
              onFiltersChange={setFilterState}
              onClearFilters={clearAllFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowMobileFilters(true)} className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {getActiveFiltersCount() > 0 && <Badge className="ml-2 bg-blue-600">{getActiveFiltersCount()}</Badge>}
                </Button>

                <span className="text-sm text-gray-600">{mockResults.total.toLocaleString()} products</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Best Match</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="discount">Biggest Discount</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-lg">
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

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-blue-900">Active Filters ({getActiveFiltersCount()})</span>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-blue-700">
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterState.categories.map((categoryId) => {
                    const category = mockCategories.find((c) => c.id.toString() === categoryId)
                    return (
                      <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                        {category?.name}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() =>
                            setFilterState((prev) => ({
                              ...prev,
                              categories: prev.categories.filter((id) => id !== categoryId),
                            }))
                          }
                        />
                      </Badge>
                    )
                  })}
                  {/* Add other active filter badges similarly */}
                </div>
              </div>
            )}

            {/* Results */}
            {mockResults.data.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {mockResults.data.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className={viewMode === "grid" ? "p-4" : "p-4 flex gap-4"}>
                      {/* Product Image */}
                      <div
                        className={
                          viewMode === "grid"
                            ? "aspect-square bg-gray-200 rounded-lg mb-4 relative"
                            : "w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 relative"
                        }
                      >
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {product.is_featured && <Badge className="absolute top-2 left-2 bg-yellow-500">Featured</Badge>}
                        {product.sale_price && <Badge className="absolute top-2 right-2 bg-red-500">Sale</Badge>}
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute bottom-2 right-2 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="space-y-2">
                          <Link href={`/products/${product.slug}`}>
                            <h3 className="font-semibold hover:text-blue-600 transition-colors line-clamp-2">
                              {product.name}
                            </h3>
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

                          <div className="flex items-center justify-between">
                            <div>
                              {product.sale_price ? (
                                <div>
                                  <span className="text-lg font-bold text-red-600">${product.sale_price}</span>
                                  <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold">${product.price}</span>
                              )}
                            </div>
                            <Button size="sm" disabled={!product.in_stock}>
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              {product.in_stock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {mockResults.last_page > 1 && (
              <div className="flex items-center justify-center mt-8 space-x-2">
                <Button variant="outline" disabled={mockResults.current_page === 1}>
                  Previous
                </Button>
                {Array.from({ length: Math.min(5, mockResults.last_page) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button key={page} variant={page === mockResults.current_page ? "default" : "outline"} size="sm">
                      {page}
                    </Button>
                  )
                })}
                <Button variant="outline" disabled={mockResults.current_page === mockResults.last_page}>
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
            <div className="fixed inset-y-0 left-0 w-80 bg-white overflow-y-auto">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <SearchFiltersSidebar
                  filters={filterState}
                  onFiltersChange={setFilterState}
                  onClearFilters={clearAllFilters}
                />
              </div>
              <div className="p-4 border-t">
                <Button
                  className="w-full"
                  onClick={() => {
                    handleSearch()
                    setShowMobileFilters(false)
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </FrontendLayout>
  )
}
