import * as React from "react"
import { cn } from "@/lib/utils"

export interface KpiSegment {
  readonly id: string
  readonly value: number
  readonly label: string
  readonly colorClass: string
  readonly percentage?: number
}

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
        <span
          className={cn(
            "font-bold tracking-tight text-foreground",
            inlineLabel ? "text-xl" : "text-3xl"
          )}
        >
          {mainValue}
        </span>
        {mainValueLabel && (
          <span
            className={cn(
              "font-medium",
              inlineLabel
                ? "text-sm text-muted-foreground"
                : "mt-0.5 text-[13px] tracking-tight text-muted-foreground/60"
            )}
          >
            {mainValueLabel}
          </span>
        )}
      </div>

      {hasSegments && (
        <div className="mt-4 flex w-full flex-col gap-3">
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted/40 gap-0.5">
            {segments?.map((segment) => {
              const widthPerc = total > 0 ? (segment.value / total) * 100 : 0
              return (
                <div
                  key={segment.id}
                  className={cn(
                    "h-full transition-all duration-500",
                    segment.colorClass
                  )}
                  style={{
                    width: `${widthPerc}%`,
                    minWidth: widthPerc > 0 ? "2px" : "0",
                  }}
                />
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[11px] font-semibold text-muted-foreground">
            {segments?.map((segment) => (
              <div
                key={segment.id}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap"
              >
                <div
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    segment.colorClass
                  )}
                />
                <div className="flex gap-1 items-center">
                  <span className="text-foreground">{segment.value}</span>
                  <span className="text-[10px] opacity-60 font-normal">{segment.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
