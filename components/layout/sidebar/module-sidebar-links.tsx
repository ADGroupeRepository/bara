"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import clsx from "clsx"
import { motion, AnimatePresence } from "motion/react"
import { Icons } from "./icons"
import type { ModuleConfig, SidebarLink } from "@/lib/modules"

// Generic sidebar icons using Lucide-style (reuse existing Icons where possible, fallback to Lucide)
import {
  Folder,
  Share2,
  Clock,
  Calendar,
  CheckSquare,
  Building2,
  Tag,
  ArrowLeftRight,
  ShoppingCart,
  FileText,
  Receipt,
  Wallet,
  Package,
  BarChart3,
  LayoutGrid,
  MapPin,
  Map,
  UserPlus,
  Network,
  Banknote,
  GraduationCap,
  TrendingUp,
  Files,
  ChevronDown,
} from "lucide-react"

// Map icon strings to actual components
const iconMap: Record<string, React.ElementType> = {
  Home: Icons.Home,
  Inbox: Icons.Inbox,
  Drafts: Icons.Drafts,
  Sent: Icons.Sent,
  Favorites: Icons.Favorites,
  Trash: Icons.Trash,
  Archives: Icons.Archives,
  People: Icons.People,
  Message: Icons.Message,
  Settings: Icons.Settings,
  Folder: Folder,
  Share: Share2,
  Clock: Clock,
  Calendar: Calendar,
  Check: CheckSquare,
  Building: Building2,
  Tag: Tag,
  Transfer: ArrowLeftRight,
  Cart: ShoppingCart,
  FileText: FileText,
  Receipt: Receipt,
  Wallet: Wallet,
  Package: Package,
  Chart: BarChart3,
  Kanban: LayoutGrid,
  MapPin: MapPin,
  Map: Map,
  UserPlus: UserPlus,
  Structure: Network,
  Payroll: Banknote,
  Training: GraduationCap,
  Performance: TrendingUp,
  Documents: Files,
  Expenses: Receipt,
}

interface ModuleSidebarLinksProps {
  module: ModuleConfig
}

export function ModuleSidebarLinks({ module }: ModuleSidebarLinksProps) {
  const pathname = usePathname()
  const [openMenuName, setOpenMenuName] = useState<string | null>(null)
  const [manuallyToggled, setManuallyToggled] = useState(false)

  // Initialize open menu based on active pathname if not manually toggled
  const currentActiveMenu = module.sidebarLinks.find(
    (link) => link.items?.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
  )?.name

  const effectiveOpenMenu = manuallyToggled ? openMenuName : (openMenuName || currentActiveMenu)

  // Toggle state
  const toggleMenu = (name: string) => {
    setManuallyToggled(true)
    setOpenMenuName((prev) => (prev === name ? null : name))
  }

  const renderLink = (link: SidebarLink) => {
    const hasItems = link.items && link.items.length > 0
    const IconComponent = iconMap[link.icon] || Icons.Home

    // If it has children, it's a toggleable menu
    if (hasItems) {
      const isOpen = effectiveOpenMenu === link.name
      const isAnyChildActive = link.items?.some(
        (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
      )

      return (
        <div key={link.name} className="flex flex-col">
          <button
            onClick={() => toggleMenu(link.name)}
            className={clsx(
              "flex items-center w-full px-2 py-2 text-[13px] rounded-lg transition-colors group",
              isOpen || isAnyChildActive
                ? "bg-sky-100 text-sky-800 font-medium"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <IconComponent
              className={clsx(
                "mr-2 h-5 w-5 shrink-0 stroke-[1.2]",
                isOpen || isAnyChildActive ? "text-sky-800" : "text-slate-400 group-hover:text-slate-500"
              )}
            />
            <span className="flex-1 text-left">{link.name}</span>
            <ChevronDown
              className={clsx(
                "ml-2 h-4 w-4 transition-transform duration-200 text-slate-400",
                isOpen && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="ml-4 flex flex-col gap-y-0.5 border-l border-slate-100 pl-3 my-0.5">
                  {link.items?.map((item) => {
                    const isSubActive =
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          "block rounded-md px-2 py-1.5 text-[12.5px] transition-colors",
                          { "bg-sky-50 text-sky-700 font-medium": isSubActive },
                          { "text-slate-500 hover:text-slate-900 hover:bg-slate-50": !isSubActive }
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    // Normal link
    const isActive =
      link.href === `/${module.slug}`
        ? pathname === link.href
        : pathname === link.href || (link.href && pathname.startsWith(`${link.href}/`))

    return (
      <Link
        key={link.name}
        href={link.href || "#"}
        className={clsx(
          "flex items-center gap-x-2 rounded-lg px-2 py-2 text-[13px] transition-colors",
          { "bg-sky-100 text-sky-800 font-medium": isActive },
          { "text-slate-600 hover:bg-slate-100": !isActive }
        )}
      >
        <IconComponent className="w-5 stroke-[1.2]" />
        {link.name}
      </Link>
    )
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="space-y-1">{module.sidebarLinks.map(renderLink)}</div>

      {module.sidebarBottomLinks && module.sidebarBottomLinks.length > 0 && (
        <div className="space-y-1 mt-4 pt-4 border-t border-slate-100">
          {module.sidebarBottomLinks.map(renderLink)}
        </div>
      )}
    </div>
  )
}
