"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaUserSecret } from "react-icons/fa6"
import { GoLog, GoPackage, GoPackageDependencies } from "react-icons/go"
import { HiShoppingCart } from "react-icons/hi2"
import { MdDashboard, MdSettings } from "react-icons/md"


const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: MdDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: GoPackageDependencies,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: HiShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: FaUserSecret,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: MdSettings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-muted/40 border-r min-h-screen p-4">
      <div className="flex items-center mb-8 px-2">
        <GoPackage className="h-6 w-6 mr-2" />
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 px-3 py-2">
        <button className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
          <GoLog className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
