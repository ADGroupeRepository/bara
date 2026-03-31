"use client"

import { SearchIcon } from "lucide-react"
import { BoxReveal } from "@/components/magicui/box-reveal"
import { GridPattern } from "@/components/ui/grid-pattern"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ModuleHomepageProps {
  moduleName: string
  searchPlaceholder: string
  description: string
  accentColor?: string
}

export function ModuleHomepage({
  moduleName,
  searchPlaceholder,
  description,
  accentColor = "sky",
}: ModuleHomepageProps) {
  return (
    <div className="relative min-h-full pb-8">
      <div className="absolute h-[250px] w-full">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "mask-[radial-gradient(800px_circle_at_center,white,transparent)] opacity-70"
          )}
        />
      </div>

      <div className="flex flex-col items-center pt-20 pb-16">
        <div className="pt-2 pb-3 text-center text-4xl font-medium">
          <BoxReveal duration={0.5}>
            <span>{moduleName}</span>
          </BoxReveal>
        </div>

        <BoxReveal duration={0.5}>
          <p className="text-muted-foreground text-center max-w-md">
            {description}
          </p>
        </BoxReveal>

        <div className="relative mt-8">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="h-[55px] w-[50vw] max-w-[600px] rounded-full bg-background pl-14 text-lg"
            />
            <SearchIcon className="absolute top-[50%] left-5 h-5 w-5 translate-y-[-50%] text-muted-foreground" />
          </div>
        </div>

        {/* Placeholder content */}
        <div className="mt-16 flex flex-col items-center gap-3 text-muted-foreground">
          <div className={cn(
            "flex h-20 w-20 items-center justify-center rounded-2xl",
            `bg-${accentColor}-50`
          )}>
            <span className="text-3xl">🚧</span>
          </div>
          <p className="text-sm font-medium">Module en cours de développement</p>
          <p className="text-xs">Ce module sera bientôt disponible</p>
        </div>
      </div>
    </div>
  )
}
