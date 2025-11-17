"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
})

export default function CheckoutPage() {
  const { items, totalPrice, totalQuantity, isHydrated, clearCart } = useCart()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postal, setPostal] = useState("")
  const [country, setCountry] = useState("")

  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")

  const [errors, setErrors] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate() {
    if (!fullName.trim() || !email.trim() || !address.trim() || !city.trim() || !postal.trim() || !country.trim()) {
      return "Please complete all shipping fields."
    }
    if (cardNumber.replace(/\s/g, "").length < 12) return "Enter a valid card number."
    if (expiry.length < 3) return "Enter a valid expiry date."
    if (cvc.length < 3) return "Enter a valid CVC."
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate()
    if (err) {
      setErrors(err)
      return
    }

    setErrors(null)
    setSubmitting(true)

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1000))

    setSubmitting(false)
    setSuccess(true)
    clearCart()
  }

  if (!isHydrated) {
    return (
      <div className="w-full py-12 px-4">
        <div className="mx-auto w-full max-w-3xl text-center">Loading cart…</div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="w-full py-12 px-4">
        <div className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-card p-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Thank you — your order is placed!</h1>
          <p className="text-muted-foreground">We've emailed your receipt and will send shipping updates shortly.</p>
          <Button className="mt-6" onClick={() => (window.location.href = "/shop")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-12 px-4">
      <div className="mx-auto flex w-full max-w-6xl gap-8 md:flex-row flex-col">
        <main className="w-full md:w-2/3">
          <header className="space-y-3 mb-6">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Enter your shipping and payment details to complete the purchase.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <Input placeholder="Postal code" value={postal} onChange={(e) => setPostal(e.target.value)} />
                <Input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Payment</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="Card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                <Input placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                <Input placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
              </div>
            </section>

            {errors && <div className="text-destructive">{errors}</div>}

            <div className="flex items-center justify-between">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Processing…" : "Pay now"}
              </Button>
            </div>
          </form>
        </main>

        <aside className="w-full md:w-1/3">
          <div className="rounded-xl border border-border bg-card p-6">
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
                <span className="text-primary">Free</span>
              </div>
            </div>

            <div className="my-6 border-t border-border" />

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-md bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-muted-foreground">{item.quantity} × {item.price}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-border" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total Due</span>
              <span>{currencyFormatter.format(totalPrice)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
