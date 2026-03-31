"use client"

import Link from "next/link"
import Image from "next/image"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavLinks from "./nav-links"

import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"

export default function SideNav() {
  const { isOpen } = useSidebar()

  return (
    <>
      {/* Spacer that pushes content, transitions width */}
      <div 
        className={cn(
          "h-screen shrink-0 transition-[width,min-width,opacity] duration-300 ease-in-out",
          isOpen ? "w-[250px] min-w-[250px]" : "w-0 min-w-0 opacity-0"
        )} 
      />

      <nav 
        className={cn(
          "fixed left-[72px] top-0 z-50 h-screen overflow-hidden border-r bg-background transition-[width,min-width,padding,opacity] duration-300 ease-in-out",
          isOpen ? "w-[250px] min-w-[250px] px-4 opacity-100" : "w-0 min-w-0 px-0 opacity-0 border-r-0"
        )}
      >
        <div className="flex h-full flex-col w-[218px] py-4">
          <Link href="/courrier" className="flex items-center gap-x-2">
            <Image
              src="/logo.png"
              width={160}
              height={160}
              alt="Commission Nationale de la Francophonie"
              priority
              className="h-auto w-auto max-w-[160px]"
            />
          </Link>

          <div className="py-4">
            <Link href="/courrier/register">
              <Button size="lg" className="h-11 w-full font-semibold">
                <PlusCircle className="size-5 shrink-0" />
                <span className="truncate">Nouveau Courrier</span>
              </Button>
            </Link>
          </div>

          <NavLinks />
        </div>
      </nav>
    </>
  )
}
