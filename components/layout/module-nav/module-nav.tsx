"use client"

import { useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { modules } from "@/lib/modules"
import { ModuleIcons } from "./module-icons"
import { cn } from "@/lib/utils"
import { Bell, ChevronDown, ChevronUp, PanelLeft } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { UserNav } from "./user-nav"
import { useSidebar } from "../sidebar/sidebar-context"

export function ModuleNav() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const { isOpen, toggle } = useSidebar()

  const activeModule = (() => {
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) return "courrier"
    return modules.find((m) => m.slug === segments[0])?.slug || "courrier"
  })()

  const renderModule = (mod: (typeof modules)[0]) => {
    const isActive = activeModule === mod.slug
    const Icon = ModuleIcons[mod.slug]

    return (
      <Link
        key={mod.slug}
        href={`/${mod.slug}`}
        className={cn(
          "group relative flex w-full flex-col items-center gap-1 rounded-xl px-1 py-1 transition-all duration-300",
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <div
          className={cn(
            "flex h-9 w-14 items-center justify-center rounded-full transition-all duration-300",
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-transparent group-hover:bg-accent/50"
          )}
        >
          {Icon && (
            <Icon
              className={cn(
                "h-[22px] w-[22px] shrink-0 transition-transform duration-300",
                isActive ? "scale-100" : "scale-95 group-hover:scale-100"
              )}
            />
          )}
        </div>
        <span
          className={cn(
            "line-clamp-1 px-1 text-center text-[10px] leading-tight transition-all duration-300",
            isActive ? "font-semibold" : "font-medium"
          )}
        >
          {mod.label}
        </span>
      </Link>
    )
  }

  return (
    <>
      {/* Spacer for fixed nav */}
      <div className="h-screen w-[72px] shrink-0" />

      <nav className="fixed top-0 left-0 z-40 flex h-screen w-[72px] flex-col items-center border-r bg-muted py-4">
        {/* Logo compact */}
        <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={toggle}
                  aria-label={
                    isOpen
                      ? "Fermer la barre latérale"
                      : "Ouvrir la barre latérale"
                  }
                  className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-accent text-accent-foreground transition-all hover:bg-accent/80 active:scale-95"
                >
                  <PanelLeft
                    className={cn(
                      "h-5 w-5 transition-transform duration-300",
                      !isOpen && "rotate-180"
                    )}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="z-100">
                {isOpen
                  ? "Fermer la barre latérale"
                  : "Ouvrir la barre latérale"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Module links */}
        <ScrollArea className="min-h-0 w-full flex-1">
          <div className="flex w-full flex-col gap-1 pt-2 pb-2">
            {/* Direct visible items */}
            {modules.slice(0, 4).map(renderModule)}

            {/* Accordion smooth expansion */}
            <div
              className={cn(
                "grid w-full transition-[grid-template-rows] duration-500 ease-in-out",
                isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="flex w-full flex-col gap-1 overflow-hidden">
                {modules.slice(4).map(renderModule)}
              </div>
            </div>

            {/* Toggle Plus/Moins */}
            {modules.length > 4 && (
              <div className="flex w-full justify-center px-2 pt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group flex w-full cursor-pointer flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="flex h-6 w-full items-center justify-center rounded-md bg-white transition-colors group-hover:bg-white">
                    {isExpanded ? (
                      <ChevronUp className="h-[14px] w-[14px]" />
                    ) : (
                      <ChevronDown className="h-[14px] w-[14px]" />
                    )}
                  </div>
                  <span className="text-[9px] font-semibold tracking-wider uppercase">
                    {isExpanded ? "Moins" : "Plus"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Bottom actions (Notifications & Profile) */}
        <div className="mt-auto flex shrink-0 flex-col items-center gap-3 pt-4 pb-2">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-2xl text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                >
                  <Bell className="size-[22px]" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="z-100">
                Notifications
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <UserNav />
        </div>
      </nav>
    </>
  )
}
