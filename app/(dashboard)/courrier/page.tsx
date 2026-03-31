"use client"

import { BoxReveal } from "@/components/magicui/box-reveal"
import { KpiCard } from "@/components/ui/kpi-card"
import { ChartMailType } from "@/components/ui/chart-mail-type"
import { ChartActivity } from "@/components/ui/chart-activity"
import { GridPattern } from "@/components/ui/grid-pattern"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"

export default function Page() {
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
            <span>Courrier</span>
          </BoxReveal>
        </div>

        <BoxReveal duration={0.5}>
          <p className="text-muted-foreground text-center max-w-md">
            Gérez vos courriers entrants, sortants et internes
          </p>
        </BoxReveal>

        <div className="relative mt-8">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Rechercher un courrier..."
              className="h-[55px] w-[50vw] rounded-full bg-background pl-14 text-lg"
            />
            <SearchIcon className="absolute top-[50%] left-5 h-5 w-5 translate-y-[-50%] text-muted-foreground" />
          </div>
        </div>

        <div className="mt-12 grid w-full max-w-[1600px] grid-cols-1 gap-3 px-4 md:grid-cols-3">
          <KpiCard
            mainValue="510"
            mainValueLabel="courrier(s) enregistré(s)"
            className="h-full"
          />
          <KpiCard
            mainValue="142"
            mainValueLabel="courrier(s) en cours"
            inlineLabel
            className="h-full"
            segments={[
              { id: "normal", value: 87, percentage: 61.3, label: "normal(aux)", colorClass: "bg-violet-500" },
              { id: "urgent", value: 55, percentage: 38.7, label: "urgent(s)", colorClass: "bg-sky-400" },
            ]}
          />
          <KpiCard
            mainValue="72%"
            mainValueLabel="des courriers sont clôturés"
            inlineLabel
            className="h-full"
            segments={[
              { id: "cloture", value: 368, label: "clôturé(s)", colorClass: "bg-teal-400" },
              { id: "en-cours", value: 142, label: "en cours", colorClass: "bg-red-500" },
            ]}
          />
        </div>

        <div className="mt-4 grid w-full max-w-[1600px] grid-cols-1 gap-3 px-4 md:grid-cols-3">
          <ChartMailType className="h-full" />
          <ChartActivity className="h-full md:col-span-2" />
        </div>
      </div>
    </div>
  )
}
