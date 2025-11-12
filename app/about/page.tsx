import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function About() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">About Bloomery</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Crafting beautiful moments through the art of floristry
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image src="/florist-arranging-flowers.png" alt="Our story" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-balance">Our Story</h2>
            <p className="text-foreground/90 mb-4 leading-relaxed">
              Founded in 2010, Bloomery began as a small neighborhood florist with a passion for creating beautiful
              arrangements that brighten people's days.
            </p>
            <p className="text-foreground/90 mb-4 leading-relaxed">
              What started as a dream has blossomed into a full-service online and retail florist, serving thousands of
              happy customers with fresh, hand-arranged flowers.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              Today, we continue to source the finest flowers and dedicate ourselves to the art of floristry, one
              bouquet at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 bg-accent/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-balance">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Quality",
                description:
                  "We source only the freshest flowers directly from trusted growers to ensure exceptional quality.",
              },
              {
                title: "Creativity",
                description:
                  "Our talented florists push creative boundaries to craft unique and stunning arrangements.",
              },
              {
                title: "Customer Care",
                description: "Every customer interaction is an opportunity to create a lasting positive impression.",
              },
            ].map((value) => (
              <div key={value.title} className="p-6 bg-card rounded-lg border border-border text-center">
                <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-balance">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Same-Day Delivery", emoji: "🚚" },
              { title: "Custom Arrangements", emoji: "🎨" },
              { title: "Subscription Plans", emoji: "🔄" },
              { title: "Corporate Events", emoji: "🏢" },
              { title: "Wedding Services", emoji: "💒" },
              { title: "Event Consultations", emoji: "📋" },
            ].map((service) => (
              <div key={service.title} className="p-6 bg-card rounded-lg border border-border">
                <div className="text-4xl mb-3">{service.emoji}</div>
                <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Ready to Order?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 text-balance">
            Explore our beautiful collection and send smiles today
          </p>
          <Link href="/shop">
            <Button variant="secondary" size="lg">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
