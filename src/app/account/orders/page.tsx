import { orders } from "@/lib/placeholder-data"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Order History</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="space-y-1">
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>Date: {new Date(order.date).toLocaleDateString()}</CardDescription>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}>
                        {order.status}
                    </Badge>
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="mb-4" />
                <div className="space-y-4">
                    {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                            <Image src={item.product.image.src} alt={item.product.image.alt} width={60} height={45} className="rounded-md object-cover" data-ai-hint={item.product.image.hint} />
                            <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link href={`/account/orders/${order.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
