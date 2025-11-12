"use client"

import Image from "next/image"
import Link from "next/link"
import type { Flower } from "@/data/flowers"
import { Button } from "@/components/ui/button"

interface FlowerCardProps {
  flower: Flower
}

export default function FlowerCard({ flower }: FlowerCardProps) {
  return (
    <Link href={`/flowers/${flower.id}`}>
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer group">
        {/* Image Container */}
        <div className="relative overflow-hidden h-64 bg-muted">
          <Image
            src={flower.image || "/placeholder.svg"}
            alt={flower.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
            {flower.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{flower.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{flower.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{flower.price}</span>
            <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-opacity-90 rounded-lg">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
