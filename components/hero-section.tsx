"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
  <section className="relative h-screen md:h-96 bg-linear-to-r from-secondary via-background to-accent overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
              Fresh Flowers for Every Moment
            </h1>
            <p className="text-lg text-foreground opacity-80 mb-8 text-pretty max-w-md">
              Discover our premium collection of hand-picked flowers, expertly arranged by our talented florists.
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:opacity-90 rounded-xl px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Shop Now
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block">
            <div className="relative w-full h-[420px]">
              <Image
                src="/hero-bouquet.svg"
                alt="Hero Flowers"
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover rounded-2xl shadow-2xl animate-fade-in"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
