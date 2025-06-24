"use client"

import { useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, ShoppingCart, Trash2, Search, Star, Share2, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WishlistItem {
  id: number
  product_id: number
  product_name: string
  product_image: string
  price: number
  original_price?: number
  rating: number
  reviews_count: number
  vendor_name: string
  in_stock: boolean
  added_date: string
  category: string
  selected: boolean
}

interface WishlistProps {
  wishlistItems?: WishlistItem[]
}

export default function CustomerWishlist({ wishlistItems = [] }: WishlistProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterCategory, setFilterCategory] = useState("all")

  // Mock data for demonstration
  const [items, setItems] = useState<WishlistItem[]>(
    wishlistItems.length > 0
      ? wishlistItems
      : [
          {
            id: 1,
            product_id: 1,
            product_name: "Wireless Bluetooth Headphones",
            product_image: "/placeholder.svg?height=200&width=200",
            price: 199.99,
            original_price: 249.99,
            rating: 4.5,
            reviews_count: 128,
            vendor_name: "TechStore",
            in_stock: true,
            added_date: "2024-01-15",
            category: "Electronics",
            selected: false,
          },
          {
            id: 2,
            product_id: 2,
            product_name: "Premium Coffee Maker",
            product_image: "/placeholder.svg?height=200&width=200",
            price: 299.99,
            rating: 4.8,
            reviews_count: 89,
            vendor_name: "HomeAppliances",
            in_stock: true,
            added_date: "2024-01-10",
            category: "Home & Kitchen",
            selected: false,
          },
          {
            id: 3,
            product_id: 3,
            product_name: "Designer Backpack",
            product_image: "/placeholder.svg?height=200&width=200",
            price: 89.99,
            original_price: 120.0,
            rating: 4.3,
            reviews_count: 45,
            vendor_name: "FashionHub",
            in_stock: false,
            added_date: "2024-01-05",
            category: "Fashion",
            selected: false,
          },
          {
            id: 4,
            product_id: 4,
            product_name: "Fitness Tracker",
            product_image: "/placeholder.svg?height=200&width=200",
            price: 149.99,
            rating: 4.2,
            reviews_count: 203,
            vendor_name: "SportsTech",
            in_stock: true,
            added_date: "2024-01-01",
            category: "Sports",
            selected: false,
          },
        ],
  )

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))]

  const filteredItems = items
    .filter(
      (item) =>
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "all" || item.category === filterCategory),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.added_date).getTime() - new Date(a.added_date).getTime()
        case "oldest":
          return new Date(a.added_date).getTime() - new Date(b.added_date).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.product_name.localeCompare(b.product_name)
        default:
          return 0
      }
    })

  const toggleSelection = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const selectAll = () => {
    const allSelected = filteredItems.every((item) => item.selected)
    setItems(
      items.map((item) =>
        filteredItems.find((filtered) => filtered.id === item.id) ? { ...item, selected: !allSelected } : item,
      ),
    )
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const removeSelected = () => {
    setItems(items.filter((item) => !item.selected))
  }

  const addToCart = (id: number) => {
    // Implementation for adding to cart
    console.log(`Adding item ${id} to cart`)
  }

  const addSelectedToCart = () => {
    const selectedItems = items.filter((item) => item.selected && item.in_stock)
    selectedItems.forEach((item) => addToCart(item.id))
  }

  const selectedCount = filteredItems.filter((item) => item.selected).length

  if (items.length === 0) {
    return (
      <CustomerLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Heart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save items you love to your wishlist</p>
            <Button size="lg">Continue Shopping</Button>
          </div>
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600">{items.length} items saved</p>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search wishlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter */}
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={filteredItems.length > 0 && filteredItems.every((item) => item.selected)}
                  onCheckedChange={selectAll}
                />
                <span className="text-sm">Select All ({filteredItems.length})</span>
              </div>
              {selectedCount > 0 && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addSelectedToCart}
                    disabled={!items.filter((item) => item.selected && item.in_stock).length}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add Selected to Cart ({items.filter((item) => item.selected && item.in_stock).length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={removeSelected}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Selected ({selectedCount})
                  </Button>
                </div>
              )}
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Wishlist
            </Button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group relative overflow-hidden">
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={item.selected}
                  onCheckedChange={() => toggleSelection(item.id)}
                  className="bg-white"
                />
              </div>

              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="aspect-square overflow-hidden">
                <img
                  src={item.product_image || "/placeholder.svg"}
                  alt={item.product_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>

                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.product_name}</h3>

                <p className="text-sm text-gray-600 mb-2">by {item.vendor_name}</p>

                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {item.rating} ({item.reviews_count})
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">${item.price}</span>
                  {item.original_price && item.original_price > item.price && (
                    <span className="text-sm text-gray-500 line-through">${item.original_price}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Button className="w-full" onClick={() => addToCart(item.id)} disabled={!item.in_stock}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.in_stock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-2">Added {new Date(item.added_date).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
