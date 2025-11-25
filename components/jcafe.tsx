"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Coffee, Plus } from "lucide-react"
import { JCafeCart, type CartItem } from "./jcafe-cart"

const PRODUCTS = [
  {
    id: "p1",
    name: "Cold Coffee",
    price: 120,
    description: "Chilled brewed coffee with milk and sugar",
    image: "🧋",
  },
  {
    id: "p2",
    name: "Veg Sandwich",
    price: 80,
    description: "Fresh vegetables with cheese in toasted bread",
    image: "🥪",
  },
  {
    id: "p3",
    name: "Chocolate Muffin",
    price: 90,
    description: "Rich chocolate muffin with choco chips",
    image: "🧁",
  },
  {
    id: "p4",
    name: "Masala Chai",
    price: 40,
    description: "Traditional Indian spiced tea",
    image: "☕",
  },
]

export default function JCafe() {
  const { toast } = useToast()
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("edusync_cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from local storage", e)
      }
    }
  }, [])

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("edusync_cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }]
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    })
  }

  return (
    <div className="h-[calc(100vh-8rem)] grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products Grid */}
      <div className="lg:col-span-2 overflow-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-4xl mb-4">{product.image}</div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription className="mt-2">{product.description}</CardDescription>
                  </div>
                  <div className="text-xl font-bold text-primary">₹{product.price}</div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => addToCart(product)} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="lg:col-span-1 h-full">
        <JCafeCart items={cart} onRemove={removeFromCart} onClear={clearCart} />
      </div>
    </div>
  )
}
