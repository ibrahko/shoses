"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
    { href: "/account/orders", label: "My Orders" },
    { href: "/account/profile", label: "Profile" },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant={pathname === item.href ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  )
}
