"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ShoppingCart } from "lucide-react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface JCafeCartProps {
  items: CartItem[]
  onRemove: (id: string) => void
  onClear: () => void
}

export function JCafeCart({ items, onRemove, onClear }: JCafeCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Your Cart
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <div className="flex-1 overflow-auto space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ₹{item.price} x {item.quantity}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-bold">₹{item.price * item.quantity}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(item.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={onClear}>
                Clear Cart
              </Button>
              <Button>Checkout</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
