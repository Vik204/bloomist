"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { flowers } from "@/data/flowers"

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...new Set(flowers.map((f) => f.category))]

  const filteredFlowers = useMemo(() => {
    return flowers.filter((flower) => {
      const matchesSearch = flower.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || flower.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Collection</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Explore our beautiful selection of fresh flowers and arrangements
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Search Flowers</label>
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? "bg-primary text-primary-foreground" : ""}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredFlowers.length} of {flowers.length} flowers
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredFlowers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFlowers.map((flower) => (
                <div
                  key={flower.id}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <Image
                      src={flower.image || "/placeholder.svg"}
                      alt={flower.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-primary font-medium mb-2">{flower.category}</p>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-balance">{flower.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{flower.price}</span>
                      <Link href={`/flowers/${flower.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No flowers found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
