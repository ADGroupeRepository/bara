"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import clsx from "clsx"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { Icons } from "./icons"
import type { ModuleConfig, SidebarLink } from "@/lib/modules"

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
  Folder: Icons.Folder,
  Share: Icons.Share,
  Clock: Icons.Clock,
  Calendar: Icons.Calendar,
  CalendarRemove: Icons.CalendarRemove,
  Building: Icons.Building,
  Tag: Icons.Tag,
  Transfer: Icons.Transfer,
  Cart: Icons.Cart,
  FileText: Icons.FileText,
  Receipt: Icons.Receipt,
  Wallet: Icons.Wallet,
  Package: Icons.Package,
  Chart: Icons.Chart,
  Kanban: Icons.Kanban,
  MapPin: Icons.MapPin,
  Map: Icons.Map,
  UserSearch: Icons.UserSearch,
  Refresh: Icons.Refresh,
  Structure: Icons.Structure,
  Dollar: Icons.Dollar,
  Training: Icons.Training,
  Documents: Icons.Documents,
}

interface ModuleSidebarLinksProps {
  module: ModuleConfig
}

export function ModuleSidebarLinks({ module }: ModuleSidebarLinksProps) {
  const pathname = usePathname()
  const [openMenuName, setOpenMenuName] = useState<string | null>(null)
  const [manuallyToggled, setManuallyToggled] = useState(false)

  // Initialize open menu based on active pathname if not manually toggled
  const currentActiveMenu = module.sidebarLinks.find((link) =>
    link.items?.some(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
    )
  )?.name

  const effectiveOpenMenu = manuallyToggled
    ? openMenuName
    : openMenuName || currentActiveMenu

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
              "group flex w-full items-center rounded-lg px-2 py-2 text-[13px] transition-colors",
              isOpen || isAnyChildActive
                ? "bg-sky-100 font-medium text-sky-800"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <IconComponent
              className={clsx(
                "mr-2 h-5 w-5 shrink-0 stroke-[1.2]",
                isOpen || isAnyChildActive
                  ? "text-sky-800"
                  : "group-hover:text-slate-500"
              )}
            />
            <span className="flex-1 text-left">{link.name}</span>
            <ChevronDown
              className={clsx(
                "ml-2 h-4 w-4 text-slate-400 transition-transform duration-200",
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
                <div className="my-0.5 ml-4 flex flex-col gap-y-0.5 border-l border-slate-100 pl-3">
                  {link.items?.map((item) => {
                    const isSubActive =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          "block rounded-md px-2 py-1.5 text-[12.5px] transition-colors",
                          { "bg-sky-50 font-medium text-sky-700": isSubActive },
                          {
                            "text-slate-500 hover:bg-slate-50 hover:text-slate-900":
                              !isSubActive,
                          }
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
        : pathname === link.href ||
          (link.href && pathname.startsWith(`${link.href}/`))

    return (
      <Link
        key={link.name}
        href={link.href || "#"}
        className={clsx(
          "flex items-center gap-x-2 rounded-lg px-2 py-2 text-[13px] transition-colors",
          { "bg-sky-100 font-medium text-sky-800": isActive },
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
        <div className="mt-4 space-y-1 border-t border-slate-100 pt-4">
          {module.sidebarBottomLinks.map(renderLink)}
        </div>
      )}
    </div>
  )
}
