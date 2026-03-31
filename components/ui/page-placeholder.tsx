"use client"

import { BoxReveal } from "@/components/magicui/box-reveal"
import { GridPattern } from "@/components/ui/grid-pattern"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface PagePlaceholderProps {
  readonly title: string
  readonly description: string
  readonly icon: LucideIcon
}

export function PagePlaceholder({
  title,
  description,
  icon: Icon,
}: PagePlaceholderProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "mask-[radial-gradient(600px_circle_at_center,white,transparent)] opacity-40"
          )}
        />
      </div>

      <div className="z-10 flex flex-col items-center gap-6 px-4 text-center max-w-2xl">
        <BoxReveal duration={0.5}>
          <div className={cn(
            "flex h-20 w-20 items-center justify-center rounded-3xl transition-all duration-500",
            "bg-primary/10 text-primary",
            "hover:scale-110"
          )}>
            <Icon className="h-10 w-10" />
          </div>
        </BoxReveal>

        <div className="space-y-4">
          <BoxReveal duration={0.5}>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
          </BoxReveal>
          <BoxReveal duration={0.5}>
            <p className="text-muted-foreground mx-auto max-w-lg text-lg leading-relaxed">
              {description}
            </p>
          </BoxReveal>
        </div>

        <BoxReveal duration={0.5}>
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse" />{" "}
              En cours de développement
            </div>
            <p className="text-[13px] text-muted-foreground font-medium">
              Cette fonctionnalité sera bientôt disponible dans votre espace de travail.
            </p>
          </div>
        </BoxReveal>
      </div>
    </div>
  )
}
