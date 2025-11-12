"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

interface CartItem {
  id: number
  name: string
  price: string
  image: string
  quantity: number
}

interface CartItemInput {
  id: number
  name: string
  price: string
  image: string
}

interface CartContextValue {
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
  isHydrated: boolean
  addItem: (item: CartItemInput, quantity?: number) => void
  updateQuantity: (id: number, quantity: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "bloomery-cart"

function parsePrice(price: string) {
  const cleaned = price.replace(/[^0-9.,]/g, "")
  const normalised = cleaned.replace(/,/g, "")
  const value = Number.parseFloat(normalised)
  return Number.isNaN(value) ? 0 : value
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch (error) {
      console.error("Failed to restore cart from storage", error)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error("Failed to persist cart to storage", error)
    }
  }, [items, isHydrated])

  const addItem = useCallback((item: CartItemInput, quantity = 1) => {
    setItems((previous) => {
      const existing = previous.find((entry) => entry.id === item.id)
      if (existing) {
        return previous.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: Math.min(entry.quantity + quantity, 99) }
            : entry
        )
      }

      return [
        ...previous,
        {
          ...item,
          quantity: Math.max(quantity, 1),
        },
      ]
    })
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setItems((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.min(Math.max(quantity, 1), 99) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems((previous) => previous.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totals = useMemo(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)
    return { totalQuantity, totalPrice }
  }, [items])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalQuantity: totals.totalQuantity,
      totalPrice: totals.totalPrice,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, totals.totalQuantity, totals.totalPrice, isHydrated, addItem, updateQuantity, removeItem, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
