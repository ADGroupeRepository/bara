"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const activityData = [
  { day: "Lun", arrivee: 12, depart: 5, interne: 3 },
  { day: "Mar", arrivee: 18, depart: 8, interne: 6 },
  { day: "Mer", arrivee: 9, depart: 12, interne: 4 },
  { day: "Jeu", arrivee: 22, depart: 7, interne: 8 },
  { day: "Ven", arrivee: 15, depart: 10, interne: 5 },
  { day: "Sam", arrivee: 4, depart: 2, interne: 1 },
  { day: "Dim", arrivee: 1, depart: 0, interne: 0 },
]

const chartConfig = {
  arrivee: {
    label: "Arrivée",
    color: "oklch(0.585 0.233 277.117)",
  },
  depart: {
    label: "Départ",
    color: "oklch(0.685 0.169 237.323)",
  },
  interne: {
    label: "Interne",
    color: "oklch(0.777 0.152 181.912)",
  },
} satisfies ChartConfig

const totalWeek = activityData.reduce(
  (acc, d) => acc + d.arrivee + d.depart + d.interne,
  0
)

export function ChartActivity({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border bg-white p-6",
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">
            Activité (7 derniers jours)
          </h3>
          <p className="mt-0.5 text-[12px] text-slate-500">
            {totalWeek} courriers traités cette semaine
          </p>
        </div>
        <span className="text-[22px] font-bold text-slate-900">
          {totalWeek}
        </span>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <ChartContainer config={chartConfig} className="h-[160px] w-full">
          <LineChart
            accessibilityLayer
            data={activityData}
            margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              width={28}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="arrivee"
              type="monotone"
              stroke="var(--color-arrivee)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "var(--color-arrivee)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="depart"
              type="monotone"
              stroke="var(--color-depart)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "var(--color-depart)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="interne"
              type="monotone"
              stroke="var(--color-interne)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "var(--color-interne)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-[12px]">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
          <span className="text-slate-600">Arrivée</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-sky-500" />
          <span className="text-slate-600">Départ</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-teal-400" />
          <span className="text-slate-600">Interne</span>
        </div>
      </div>
    </div>
  )
}
