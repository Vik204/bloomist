"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { totalQuantity, isHydrated } = useCart()
  const router = useRouter()
  const [user, setUser] = useState<{ firstName?: string; lastName?: string; email?: string } | null>(null)

  const cartCount = useMemo(() => (isHydrated ? totalQuantity : 0), [isHydrated, totalQuantity])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('user')
        if (raw) {
          setUser(JSON.parse(raw))
        } else {
          setUser(null)
        }
      }
    } catch (e) {
      setUser(null)
    }
    // Listen for auth changes in this tab
    const handleAuthChanged = (e: Event) => {
      try {
        // prefer event detail if provided
        // @ts-ignore
        const detail = e && (e as CustomEvent)?.detail
        if (detail && detail.user) {
          setUser(detail.user)
          return
        }
        const raw2 = typeof window !== 'undefined' ? localStorage.getItem('user') : null
        if (raw2) setUser(JSON.parse(raw2))
        else setUser(null)
      } catch (err) {
        setUser(null)
      }
    }

    try {
      window.addEventListener('authChanged', handleAuthChanged)
      // storage event for other tabs
      window.addEventListener('storage', handleAuthChanged)
    } catch (e) {
      // ignore in non-browser environments
    }

    return () => {
      try {
        window.removeEventListener('authChanged', handleAuthChanged)
        window.removeEventListener('storage', handleAuthChanged)
      } catch (e) {
        // ignore
      }
    }
  }, [])

  const signOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      document.cookie = 'auth=; Max-Age=0; path=/'
      document.cookie = 'user=; Max-Age=0; path=/'
    }
    setUser(null)
    router.push('/signin')
  }

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

            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/account" className="text-sm text-muted-foreground hover:text-primary">
                  {user.firstName || user.email || 'My Account'}
                </Link>
                <Button variant="ghost" onClick={signOut}>Sign Out</Button>
              </div>
            ) : (
              <>
                <Link href="/signin" className="text-sm text-muted-foreground hover:text-primary">
                  Sign In
                </Link>

                <Link href="/signup">
                  <Button variant="default" className="ml-1">Sign Up</Button>
                </Link>
              </>
            )}

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

                {user ? (
                  <div className="space-y-2">
                    <Link href="/account" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted">
                      {user.firstName || user.email || 'My Account'}
                    </Link>
                    <button onClick={() => { signOut(); setIsOpen(false); }} className="block w-full text-center px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted">
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/signin" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted">
                      Sign In
                    </Link>

                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}

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
