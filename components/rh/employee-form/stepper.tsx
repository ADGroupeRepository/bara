"use client"

import React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { STEPS, type StepConfig } from "./schema"

type StepperProps = {
  readonly currentStep: number
  readonly completedSteps: Set<number>
  readonly onStepClick: (index: number) => void
}

export function Stepper({
  currentStep,
  completedSteps,
  onStepClick,
}: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        {STEPS.map((step: StepConfig, index: number) => {
          const isCompleted = completedSteps.has(index)
          const isActive = index === currentStep
          const isClickable = isCompleted || index < currentStep

          // Capitalize first letter of EACH word
          const capitalizedLabel = step.label
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")

          // Determine button and circle styles to fix nested ternary lint
          let buttonStyles = "text-muted-foreground/60"
          let circleStyles = "border-muted-foreground/30"

          if (isActive) {
            buttonStyles = "bg-primary/5 text-primary ring-[1px] ring-primary/20"
            circleStyles =
              "bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/20"
          } else if (isClickable) {
            buttonStyles = "text-primary hover:bg-primary/5"
            if (isCompleted) {
              circleStyles = "bg-primary/10 border-primary/30 text-primary"
            }
          }

          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable && !isActive}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-300",
                  buttonStyles
                )}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-500",
                    circleStyles
                  )}
                >
                  {isCompleted && !isActive ? (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-[13px] font-medium tracking-tight transition-all",
                    isActive ? "opacity-100" : "opacity-80"
                  )}
                >
                  {capitalizedLabel}
                </span>
              </button>

              {index < STEPS.length - 1 && (
                <div className="mx-1 h-px w-4 bg-muted-foreground/20 md:mx-2 md:w-8" />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
