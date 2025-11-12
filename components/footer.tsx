import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <span className="font-bold text-primary">Bloomery</span>
            </div>
            <p className="text-muted-foreground">Crafting beautiful moments through the art of floristry since 2010.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Shop</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-foreground transition">
                  All Flowers
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-foreground transition">
                  Bouquets
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-foreground transition">
                  Gifts
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-foreground transition">
                  Seasonal
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>📍 123 Flower Street, Garden City</li>
              <li>📞 (555) 123-4567</li>
              <li>📧 hello@bloomery.com</li>
              <li className="pt-2">Mon-Fri: 9AM-6PM | Sat: 10AM-4PM</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2025 Bloomery. All rights reserved. Flowers delivered with love.
          </p>
        </div>
      </div>
    </footer>
  )
}
