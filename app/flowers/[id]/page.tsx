import Link from "next/link"
import Image from "next/image"
import { flowers } from "@/data/flowers"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import AddToCartButton from "@/components/add-to-cart-button"

interface Props {
  params: Promise<{ id: string }>
}

export default async function FlowerDetail({ params }: Props) {
  const { id } = await params
  const flower = flowers.find((f) => f.id === Number.parseInt(id))

  if (!flower) {
    notFound()
  }

  const relatedFlowers = flowers.filter((f) => f.category === flower.category && f.id !== flower.id).slice(0, 3)

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="px-4 py-4 border-b border-border bg-background">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{flower.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative h-96 md:h-full min-h-96 rounded-xl overflow-hidden bg-muted border border-border">
            <Image src={flower.image || "/placeholder.svg"} alt={flower.name} fill className="object-cover" priority />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-primary font-medium mb-2">{flower.category}</p>
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{flower.name}</h1>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-primary">{flower.price}</span>
              <span className="text-muted-foreground">Available for immediate delivery</span>
            </div>

            <div className="prose prose-sm max-w-none mb-8">
              <p className="text-foreground/90 leading-relaxed text-balance">{flower.description}</p>
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-t border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Quality</p>
                <p className="text-foreground">Premium Grade</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Freshness Guarantee</p>
                <p className="text-foreground">7 Days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Delivery</p>
                <p className="text-foreground">Same Day Available</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Care Instructions</p>
                <p className="text-foreground">Included</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-6">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Buy Now
              </Button>
              <AddToCartButton flower={flower} />
            </div>

            {/* Info Box */}
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-foreground/80">
                Custom arrangements available. Contact us for personalized options and bulk orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedFlowers.length > 0 && (
        <section className="py-16 px-4 bg-muted/20 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-balance">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedFlowers.map((related) => (
                <Link href={`/flowers/${related.id}`} key={related.id}>
                  <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={related.image || "/placeholder.svg"}
                        alt={related.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 text-balance">{related.name}</h3>
                      <p className="text-lg font-bold text-primary">{related.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">Need a Custom Arrangement?</h2>
          <p className="mb-6 text-primary-foreground/90 text-balance">
            Our florists can create a custom arrangement tailored to your needs
          </p>
          <Link href="/contact">
            <Button variant="secondary">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
