"use client"

import { useState } from "react"
import { Check, Loader2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Flower } from "@/data/flowers"
import { useCart } from "@/components/cart-provider"

interface AddToCartButtonProps {
  flower: Flower
}

export default function AddToCartButton({ flower }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = async () => {
    try {
      setIsProcessing(true)
      addItem({
        id: flower.id,
        name: flower.name,
        price: flower.price,
        image: flower.image,
      })
      setIsAdded(true)
      window.setTimeout(() => setIsAdded(false), 1800)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button
      size="lg"
      className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
      disabled={isProcessing}
      onClick={handleAddToCart}
    >
      {isProcessing ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Adding...
        </>
      ) : isAdded ? (
        <>
          <Check className="size-4" aria-hidden="true" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="size-4" aria-hidden="true" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
