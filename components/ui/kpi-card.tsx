import * as React from "react"
import { cn } from "@/lib/utils"

export interface KpiSegment {
  readonly id: string
  readonly value: number
  readonly label: string
  readonly colorClass?: string
  readonly percentage?: number
}

const KPI_COLORS = ["#6366f1", "#2fb6d4", "#ef4445"]

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly mainValue: React.ReactNode
  readonly mainValueLabel?: React.ReactNode
  readonly inlineLabel?: boolean
  readonly segments?: KpiSegment[]
}

export function KpiCard(props: Readonly<KpiCardProps>) {
  const {
    mainValue,
    mainValueLabel,
    inlineLabel = false,
    segments,
    className,
    ...rest
  } = props
  const hasSegments = segments && segments.length > 0
  const total = segments ? segments.reduce((acc, seg) => acc + seg.value, 0) : 0

  return (
    <div
      className={cn(
        "flex flex-col justify-center rounded-xl border bg-card p-5 transition-all hover:bg-muted/5",
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          "flex",
          inlineLabel
            ? "items-baseline gap-1.5"
            : "flex-col items-start justify-center"
        )}
      >
        {mainValueLabel && (
          <span
            className={cn(
              "",
              inlineLabel
                ? "text-sm text-muted-foreground"
                : "mb-0.5 text-sm text-muted-foreground"
            )}
          >
            {mainValueLabel}
          </span>
        )}

        <span
          className={cn(
            "font-bold tracking-tight text-foreground",
            inlineLabel ? "text-xl" : "text-3xl"
          )}
        >
          {mainValue}
        </span>
      </div>

      {hasSegments && (
        <div className="mt-3 flex w-full flex-col gap-3">
          <div className="flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-muted/40">
            {segments?.map((segment, index) => {
              const widthPerc = total > 0 ? (segment.value / total) * 100 : 0
              return (
                <div
                  key={segment.id}
                  className={cn(
                    "h-full transition-all duration-500"
                  )}
                  style={{
                    width: `${widthPerc}%`,
                    minWidth: widthPerc > 0 ? "2px" : "0",
                    backgroundColor: KPI_COLORS[index % KPI_COLORS.length],
                  }}
                />
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[11px] font-semibold text-muted-foreground">
            {segments?.map((segment, index) => (
              <div
                key={segment.id}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap"
              >
                <div
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full"
                  )}
                  style={{ backgroundColor: KPI_COLORS[index % KPI_COLORS.length] }}
                />
                <div className="flex items-center gap-1">
                  <span className="text-foreground">{segment.value}</span>
                  <span className="text-[10px] font-normal opacity-60">
                    {segment.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
