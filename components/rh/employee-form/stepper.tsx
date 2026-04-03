"use client"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { STEPS, type StepConfig } from "./schema"

type StepperProps = {
  readonly currentStep: number
  readonly completedSteps: Set<number>
  readonly onStepClick: (index: number) => void
}

export function Stepper({ currentStep, completedSteps, onStepClick }: StepperProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-center gap-3">
        {STEPS.map((step: StepConfig, index: number) => {
          const Icon = step.icon
          const isCompleted = completedSteps.has(index)
          const isActive = index === currentStep
          const isClickable = isCompleted || index < currentStep

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => isClickable && onStepClick(index)}
              disabled={!isClickable && !isActive}
              className={cn(
                "flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : isCompleted
                    ? "border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                    : "border-transparent bg-muted text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  isActive
                    ? "bg-primary-foreground/20"
                    : isCompleted
                      ? "bg-primary/10"
                      : "bg-muted"
                )}
              >
                {isCompleted && !isActive ? (
                  <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </div>
              <span>{step.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
