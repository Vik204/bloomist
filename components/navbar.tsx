"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { totalQuantity, isHydrated } = useCart()

  const cartCount = useMemo(() => (isHydrated ? totalQuantity : 0), [isHydrated, totalQuantity])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="font-bold text-lg text-primary hidden md:inline">Bloomist</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/shop" className="hidden lg:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Order Now</Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="outline" className="gap-2">
                <ShoppingBag className="size-4" aria-hidden="true" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`block px-4 py-2 rounded-lg transition-colors ${pathname === item.href ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-2 space-y-2">
              <Link href="/shop" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Order Now</Button>
              </Link>
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <ShoppingBag className="size-4" aria-hidden="true" />
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-auto inline-flex min-w-6 items-center justify-center rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
