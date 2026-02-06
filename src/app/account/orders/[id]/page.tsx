import { notFound } from "next/navigation";
import { orders } from "@/lib/placeholder-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Truck, Package, Home, CheckCircle } from "lucide-react";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    notFound();
  }

  const getStatusStep = (status: typeof order.status) => {
    switch (status) {
        case 'Processing': return 1;
        case 'Shipped': return 2;
        case 'Delivered': return 3;
        default: return 0;
    }
  }

  const currentStep = getStatusStep(order.status);
  const timelineSteps = [
    { name: "Processing", icon: Package, step: 1 },
    { name: "Shipped", icon: Truck, step: 2 },
    { name: "Delivered", icon: Home, step: 3 },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Order #{order.id}</CardTitle>
          <CardDescription>
            Placed on {new Date(order.date).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative flex justify-between items-center w-full">
                <div className="absolute left-0 top-1/2 w-full h-0.5 bg-muted -translate-y-1/2" />
                <div className="absolute left-0 top-1/2 h-0.5 bg-primary -translate-y-1/2" style={{width: `${((currentStep-1)/2)*100}%`}} />

                {timelineSteps.map(step => (
                     <div key={step.name} className="relative z-10 flex flex-col items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= step.step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                           <step.icon className="w-5 h-5" />
                        </div>
                        <p className={`mt-2 text-sm font-medium ${currentStep >= step.step ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</p>
                    </div>
                ))}
            </div>
            {order.trackingNumber && <p className="text-center mt-4 text-sm">Tracking: <a href="#" className="font-medium text-primary underline">{order.trackingNumber}</a></p>}
          </div>
          
          <Separator className="my-6" />

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <address className="not-italic text-muted-foreground">
                {order.shippingAddress.name}<br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.zip}<br />
                {order.shippingAddress.country}
              </address>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${order.total.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>$5.00</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Taxes</span><span>${(order.total * 0.08).toFixed(2)}</span></div>
                    <Separator/>
                    <div className="flex justify-between font-semibold"><span>Grand Total</span><span>${(order.total + 5 + (order.total * 0.08)).toFixed(2)}</span></div>
                </div>
            </div>
          </div>
          
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Items in this Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {order.items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image src={item.product.image.src} alt={item.product.image.alt} width={60} height={45} className="rounded-md object-cover" data-ai-hint={item.product.image.hint}/>
                        <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
        </CardContent>
      </Card>

    </div>
  );
}
