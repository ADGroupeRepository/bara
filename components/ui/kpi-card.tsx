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
        "flex flex-col justify-center rounded-xl border bg-white p-6",
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          "flex",
          inlineLabel
            ? "items-baseline gap-1.5"
            : "flex-col items-center justify-center"
        )}
      >
        <span
          className={cn(
            "font-semibold text-slate-900",
            inlineLabel ? "text-[22px]" : "text-5xl"
          )}
        >
          {mainValue}
        </span>
        {mainValueLabel && (
          <span
            className={cn(
              "font-medium",
              inlineLabel
                ? "text-[15px] text-slate-700"
                : "mt-2 text-[13px] text-slate-500"
            )}
          >
            {mainValueLabel}
          </span>
        )}
      </div>

      {hasSegments && (
        <div className="mt-5 flex w-full flex-col gap-3.5">
          <div className="flex h-[6px] w-full gap-0.5">
            {segments?.map((segment) => {
              const widthPerc = total > 0 ? (segment.value / total) * 100 : 0
              return (
                <div
                  key={segment.id}
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    segment.colorClass
                  )}
                  style={{
                    width: `${widthPerc}%`,
                    minWidth: widthPerc > 0 ? "4px" : "0",
                  }}
                />
              )
            })}
          </div>

          <div className="flex flex-nowrap items-center gap-x-2.5 gap-y-2 text-[12px] font-medium text-slate-500">
            {segments?.map((segment) => (
              <div
                key={segment.id}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap"
              >
                <div
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full",
                    segment.colorClass
                  )}
                />
                <span className="font-semibold text-slate-800">
                  {segment.value}
                </span>
                {segment.percentage !== undefined && (
                  <span className="font-semibold text-slate-800">
                    ({segment.percentage}%)
                  </span>
                )}
                <span>{segment.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
