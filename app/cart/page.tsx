import CartSummary from "@/components/cart-summary"

export const metadata = {
  title: "Your Cart | Bloomery",
  description: "Review your selected blooms before checkout.",
}

export default function CartPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-bold text-balance">Your Cart</h1>
          <p className="text-muted-foreground text-pretty">
            Review your selections and adjust quantities before completing your order.
          </p>
        </header>
        <CartSummary />
      </div>
    </div>
  )
}
