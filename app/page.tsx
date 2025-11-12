import Link from "next/link"
import Image from "next/image"
import HeroSection from "@/components/hero-section"
import { Button } from "@/components/ui/button"

export default function Home() {
  const featuredFlowers = [
    {
      id: 1,
      name: "Red Roses Bouquet",
      price: "$25",
      image: "/red-roses-bouquet.png",
      category: "Bouquets",
    },
    {
      id: 2,
      name: "Sunflower Bundle",
      price: "$18",
      image: "/sunflower-bundle.jpg",
      category: "Seasonal",
    },
    {
      id: 3,
      name: "Orchid Arrangement",
      price: "$40",
      image: "/orchid-arrangement.jpg",
      category: "Gifts",
    },
  ]

  return (
    <div className="w-full">
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Bouquets", icon: "🌹" },
              { name: "Seasonal Flowers", icon: "🌼" },
              { name: "Gifts & Arrangements", icon: "🌺" },
            ].map((category) => (
              <Link href="/shop" key={category.name}>
                <div className="group p-8 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 cursor-pointer text-center">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                  <p className="text-muted-foreground mt-2">Explore our collection</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Flowers */}
      <section className="py-16 px-4 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">Featured Flowers</h2>
          <p className="text-center text-muted-foreground mb-12 text-balance">Handpicked selections from our garden</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredFlowers.map((flower) => (
              <Link href={`/flowers/${flower.id}`} key={flower.id}>
                <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
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
                    <h3 className="text-lg font-semibold text-foreground mb-2 text-balance">{flower.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{flower.price}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Special Occasion? We've Got You Covered</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 text-balance">
            From weddings to birthdays, our florists create custom arrangements for every moment
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Get a Custom Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
