"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X, Star, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { mockCategories } from "@/data/mock-data"

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

interface SearchFiltersSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
  className?: string
}

const mockBrands = [
  { id: "1", name: "Apple", count: 45 },
  { id: "2", name: "Samsung", count: 38 },
  { id: "3", name: "Sony", count: 29 },
  { id: "4", name: "Nike", count: 67 },
  { id: "5", name: "Adidas", count: 52 },
  { id: "6", name: "LEGO", count: 23 },
  { id: "7", name: "Dell", count: 31 },
  { id: "8", name: "HP", count: 28 },
  { id: "9", name: "Canon", count: 19 },
  { id: "10", name: "Microsoft", count: 25 },
]

export function SearchFiltersSidebar({
  filters,
  onFiltersChange,
  onClearFilters,
  className,
}: SearchFiltersSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    rating: true,
    features: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId]

    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleBrandToggle = (brandId: string) => {
    const newBrands = filters.brands.includes(brandId)
      ? filters.brands.filter((id) => id !== brandId)
      : [...filters.brands, brandId]

    onFiltersChange({ ...filters, brands: newBrands })
  }

  const handlePriceChange = (value: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: value })
  }

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating: filters.rating === rating ? 0 : rating })
  }

  const handleFeatureToggle = (
    feature: keyof Pick<FilterState, "inStock" | "onSale" | "featured" | "freeShipping">,
  ) => {
    onFiltersChange({ ...filters, [feature]: !filters[feature] })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categories.length) count += filters.categories.length
    if (filters.brands.length) count += filters.brands.length
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++
    if (filters.rating > 0) count++
    if (filters.inStock || filters.onSale || filters.featured || filters.freeShipping) {
      count += [filters.inStock, filters.onSale, filters.featured, filters.freeShipping].filter(Boolean).length
    }
    return count
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Categories */}
        <Collapsible open={expandedSections.categories} onOpenChange={() => toggleSection("categories")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <Label className="font-medium">Categories</Label>
              {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {mockCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.id.toString())}
                    onCheckedChange={() => handleCategoryToggle(category.id.toString())}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="text-sm flex items-center justify-between w-full"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </span>
                    <span className="text-gray-500">({category.products.length})</span>
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Brands */}
        <Collapsible open={expandedSections.brands} onOpenChange={() => toggleSection("brands")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <Label className="font-medium">Brands</Label>
              {expandedSections.brands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {mockBrands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={filters.brands.includes(brand.id)}
                    onCheckedChange={() => handleBrandToggle(brand.id)}
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="text-sm flex items-center justify-between w-full">
                    <span>{brand.name}</span>
                    <span className="text-gray-500">({brand.count})</span>
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Price Range */}
        <Collapsible open={expandedSections.price} onOpenChange={() => toggleSection("price")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <Label className="font-medium">Price Range</Label>
              {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                max={1000}
                step={10}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange([0, 50])}
                  className={filters.priceRange[0] === 0 && filters.priceRange[1] === 50 ? "bg-blue-50" : ""}
                >
                  Under $50
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange([50, 200])}
                  className={filters.priceRange[0] === 50 && filters.priceRange[1] === 200 ? "bg-blue-50" : ""}
                >
                  $50-$200
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange([200, 1000])}
                  className={filters.priceRange[0] === 200 && filters.priceRange[1] === 1000 ? "bg-blue-50" : ""}
                >
                  $200+
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Rating */}
        <Collapsible open={expandedSections.rating} onOpenChange={() => toggleSection("rating")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <Label className="font-medium">Customer Rating</Label>
              {expandedSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating === rating}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center text-sm cursor-pointer">
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
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Features */}
        <Collapsible open={expandedSections.features} onOpenChange={() => toggleSection("features")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <Label className="font-medium">Features</Label>
              {expandedSections.features ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock}
                  onCheckedChange={() => handleFeatureToggle("inStock")}
                />
                <Label htmlFor="in-stock" className="text-sm">
                  In Stock Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="on-sale" checked={filters.onSale} onCheckedChange={() => handleFeatureToggle("onSale")} />
                <Label htmlFor="on-sale" className="text-sm">
                  On Sale
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={filters.featured}
                  onCheckedChange={() => handleFeatureToggle("featured")}
                />
                <Label htmlFor="featured" className="text-sm">
                  Featured Products
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free-shipping"
                  checked={filters.freeShipping}
                  onCheckedChange={() => handleFeatureToggle("freeShipping")}
                />
                <Label htmlFor="free-shipping" className="text-sm">
                  Free Shipping
                </Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Active Filters Summary */}
        {getActiveFiltersCount() > 0 && (
          <>
            <Separator />
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="font-medium">Active Filters</Label>
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {filters.categories.map((categoryId) => {
                  const category = mockCategories.find((c) => c.id.toString() === categoryId)
                  return (
                    <Badge key={categoryId} variant="secondary" className="text-xs">
                      {category?.name}
                    </Badge>
                  )
                })}
                {filters.brands.map((brandId) => {
                  const brand = mockBrands.find((b) => b.id === brandId)
                  return (
                    <Badge key={brandId} variant="secondary" className="text-xs">
                      {brand?.name}
                    </Badge>
                  )
                })}
                {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                  <Badge variant="secondary" className="text-xs">
                    ${filters.priceRange[0]}-${filters.priceRange[1]}
                  </Badge>
                )}
                {filters.rating > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.rating}+ ⭐
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
