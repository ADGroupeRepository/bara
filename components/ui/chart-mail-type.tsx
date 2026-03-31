"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface MailTypeData {
  type: string
  label: string
  count: number
  percentage: number
  fill: string
  colorClass: string
}

const mailTypeData: MailTypeData[] = [
  {
    type: "arrivee",
    label: "Courrier Arrivée",
    count: 285,
    percentage: 55.9,
    fill: "var(--color-arrivee)",
    colorClass: "bg-violet-500",
  },
  {
    type: "depart",
    label: "Courrier Départ",
    count: 138,
    percentage: 27.1,
    fill: "var(--color-depart)",
    colorClass: "bg-sky-500",
  },
  {
    type: "interne",
    label: "Note Interne",
    count: 87,
    percentage: 17.1,
    fill: "var(--color-interne)",
    colorClass: "bg-teal-400",
  },
]

const chartConfig = {
  count: {
    label: "Courriers",
  },
  arrivee: {
    label: "Courrier Arrivée",
    color: "oklch(0.585 0.233 277.117)",
  },
  depart: {
    label: "Courrier Départ",
    color: "oklch(0.685 0.169 237.323)",
  },
  interne: {
    label: "Note Interne",
    color: "oklch(0.777 0.152 181.912)",
  },
} satisfies ChartConfig

export function ChartMailType({ className }: { className?: string }) {
  const totalMails = React.useMemo(
    () => mailTypeData.reduce((acc, curr) => acc + curr.count, 0),
    []
  )

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border bg-white p-6",
        className
      )}
    >
      {/* Header */}
      <div className="mb-1">
        <h3 className="text-[15px] font-semibold text-slate-900">
          Types de Courrier
        </h3>
      </div>

      {/* Donut Chart */}
      <div className="flex flex-1 items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[180px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={mailTypeData}
              dataKey="count"
              nameKey="type"
              innerRadius={55}
              outerRadius={80}
              strokeWidth={3}
              stroke="white"
              paddingAngle={3}
              cornerRadius={6}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) - 8}
                          className="fill-slate-900 text-[28px] font-bold"
                        >
                          {totalMails}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 14}
                          className="fill-slate-500 text-[11px]"
                        >
                          Courriers
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-col gap-2.5">
        {mailTypeData.map((item) => (
          <div
            key={item.type}
            className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "h-5 w-1 rounded-full",
                  item.colorClass
                )}
              />
              <span className="text-[13px] font-medium text-slate-700">
                {item.label}
              </span>
            </div>
            <span className="text-[13px] font-semibold text-slate-900">
              {item.count}{" "}
              <span className="font-normal text-slate-500">
                ({item.percentage}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
