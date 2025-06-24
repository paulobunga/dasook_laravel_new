"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockCategories } from "@/data/mock-data"
import { router } from "@inertiajs/react"

interface SearchFilters {
  query: string
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  rating: number
  location: string
  inStock: boolean
  onSale: boolean
  featured: boolean
  freeShipping: boolean
  sortBy: string
}

interface AdvancedSearchProps {
  isOpen: boolean
  onClose: () => void
  initialFilters?: Partial<SearchFilters>
}

const mockBrands = [
  { id: 1, name: "Apple", count: 45 },
  { id: 2, name: "Samsung", count: 38 },
  { id: 3, name: "Sony", count: 29 },
  { id: 4, name: "Nike", count: 67 },
  { id: 5, name: "Adidas", count: 52 },
  { id: 6, name: "LEGO", count: 23 },
  { id: 7, name: "Dell", count: 31 },
  { id: 8, name: "HP", count: 28 },
]

const mockSuggestions = [
  "iPhone 15 Pro Max",
  "MacBook Pro",
  "Samsung Galaxy",
  "Nike Air Jordan",
  "Sony Headphones",
  "LEGO Architecture",
  "Dell XPS",
  "iPad Air",
]

export function AdvancedSearch({ isOpen, onClose, initialFilters }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    rating: 0,
    location: "",
    inStock: false,
    onSale: false,
    featured: false,
    freeShipping: false,
    sortBy: "relevance",
    ...initialFilters,
  })

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (filters.query.length > 2) {
      const filtered = mockSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(filters.query.toLowerCase()),
      )
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [filters.query])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleCategoryToggle = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }))
  }

  const handleBrandToggle = (brandId: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brandId) ? prev.brands.filter((id) => id !== brandId) : [...prev.brands, brandId],
    }))
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      rating: 0,
      location: "",
      inStock: false,
      onSale: false,
      featured: false,
      freeShipping: false,
      sortBy: "relevance",
    })
  }

  const applyFilters = () => {
    const searchParams = new URLSearchParams()

    if (filters.query) searchParams.set("q", filters.query)
    if (filters.categories.length) searchParams.set("categories", filters.categories.join(","))
    if (filters.brands.length) searchParams.set("brands", filters.brands.join(","))
    if (filters.priceRange[0] > 0) searchParams.set("min_price", filters.priceRange[0].toString())
    if (filters.priceRange[1] < 1000) searchParams.set("max_price", filters.priceRange[1].toString())
    if (filters.rating > 0) searchParams.set("rating", filters.rating.toString())
    if (filters.location) searchParams.set("location", filters.location)
    if (filters.inStock) searchParams.set("in_stock", "1")
    if (filters.onSale) searchParams.set("on_sale", "1")
    if (filters.featured) searchParams.set("featured", "1")
    if (filters.freeShipping) searchParams.set("free_shipping", "1")
    if (filters.sortBy !== "relevance") searchParams.set("sort", filters.sortBy)

    router.get(`/search?${searchParams.toString()}`)
    onClose()
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categories.length) count++
    if (filters.brands.length) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++
    if (filters.rating > 0) count++
    if (filters.location) count++
    if (filters.inStock || filters.onSale || filters.featured || filters.freeShipping) count++
    return count
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Advanced Search</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Search Query */}
            <div className="relative">
              <Label htmlFor="search-query">Search Products</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  ref={searchRef}
                  id="search-query"
                  placeholder="Search for products, brands, or keywords..."
                  className="pl-10"
                  value={filters.query}
                  onChange={(e) => handleFilterChange("query", e.target.value)}
                  onFocus={() => setShowSuggestions(filters.query.length > 2)}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b last:border-b-0"
                        onClick={() => {
                          handleFilterChange("query", suggestion)
                          setShowSuggestions(false)
                        }}
                      >
                        <Search className="w-4 h-4 inline mr-2 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Categories</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={filters.categories.includes(category.id.toString())}
                        onCheckedChange={() => handleCategoryToggle(category.id.toString())}
                      />
                      <Label htmlFor={`category-${category.id}`} className="text-sm flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                        <span className="ml-auto text-gray-500">({category.products.length})</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Brands</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {mockBrands.map((brand) => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={filters.brands.includes(brand.id.toString())}
                        onCheckedChange={() => handleBrandToggle(brand.id.toString())}
                      />
                      <Label htmlFor={`brand-${brand.id}`} className="text-sm flex items-center justify-between w-full">
                        <span>{brand.name}</span>
                        <span className="text-gray-500">({brand.count})</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Rating */}
              <div className="space-y-4">
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => handleFilterChange("priceRange", value)}
                      max={1000}
                      step={10}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={filters.rating === rating}
                          onCheckedChange={() => handleFilterChange("rating", filters.rating === rating ? 0 : rating)}
                        />
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
              </div>
            </div>

            <Separator />

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Enter city or zip code"
                    className="pl-10"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Sort By</Label>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="discount">Biggest Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Quick Filters</Label>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock}
                    onCheckedChange={(checked) => handleFilterChange("inStock", checked)}
                  />
                  <Label htmlFor="in-stock" className="text-sm">
                    In Stock Only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="on-sale"
                    checked={filters.onSale}
                    onCheckedChange={(checked) => handleFilterChange("onSale", checked)}
                  />
                  <Label htmlFor="on-sale" className="text-sm">
                    On Sale
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={filters.featured}
                    onCheckedChange={(checked) => handleFilterChange("featured", checked)}
                  />
                  <Label htmlFor="featured" className="text-sm">
                    Featured Products
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="free-shipping"
                    checked={filters.freeShipping}
                    onCheckedChange={(checked) => handleFilterChange("freeShipping", checked)}
                  />
                  <Label htmlFor="free-shipping" className="text-sm">
                    Free Shipping
                  </Label>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">Active Filters ({getActiveFiltersCount()})</Label>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.categories.map((categoryId) => {
                    const category = mockCategories.find((c) => c.id.toString() === categoryId)
                    return (
                      <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                        {category?.name}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryToggle(categoryId)} />
                      </Badge>
                    )
                  })}
                  {filters.brands.map((brandId) => {
                    const brand = mockBrands.find((b) => b.id.toString() === brandId)
                    return (
                      <Badge key={brandId} variant="secondary" className="flex items-center gap-1">
                        {brand?.name}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => handleBrandToggle(brandId)} />
                      </Badge>
                    )
                  })}
                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => handleFilterChange("priceRange", [0, 1000])}
                      />
                    </Badge>
                  )}
                  {filters.rating > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.rating}+ Stars
                      <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterChange("rating", 0)} />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={applyFilters}>
                  Search Products
                  {getActiveFiltersCount() > 0 && (
                    <Badge className="ml-2 bg-white text-blue-600">{getActiveFiltersCount()}</Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
