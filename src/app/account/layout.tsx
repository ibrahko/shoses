import { Separator } from "@/components/ui/separator"
import { AccountNav } from "./components/account-nav"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-12">
        <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
            <p className="text-muted-foreground">
            Manage your orders, profile, and settings.
            </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
                <AccountNav />
            </aside>
            <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
    </div>
  )
}
