"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
})

export default function CartSummary() {
  const { items, totalPrice, totalQuantity, isHydrated, updateQuantity, removeItem, clearCart } = useCart()

  if (!isHydrated) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
        Loading cart…
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <ShoppingBag className="mx-auto mb-4 size-10 text-muted-foreground" aria-hidden="true" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Browse our collection to add something lovely.</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-card p-4">
            <div className="relative h-32 w-full sm:w-40 overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                sizes="(min-width: 640px) 160px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground text-balance">{item.name}</h3>
                <p className="text-muted-foreground">{item.price}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1">
                  <button
                    type="button"
                    className="p-1 text-muted-foreground transition hover:text-foreground"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <span className="min-w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    className="p-1 text-muted-foreground transition hover:text-foreground"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start text-destructive hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <aside className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items</span>
            <span>{totalQuantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{currencyFormatter.format(totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-primary">Free today</span>
          </div>
        </div>
        <div className="my-6 border-t border-border" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total Due</span>
          <span>{currencyFormatter.format(totalPrice)}</span>
        </div>
        <Button className="mt-6 w-full">Checkout</Button>
        <Button variant="ghost" className="mt-3 w-full" onClick={clearCart}>
          Clear Cart
        </Button>
      </aside>
    </div>
  )
}
