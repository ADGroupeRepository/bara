"use client"

import { ChevronLeft, ChevronRight, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { STEPS } from "./schema"

type FormNavigationProps = {
  readonly currentStep: number
  readonly isLastStep: boolean
  readonly goToPrevStep: () => void
  readonly goToNextStep: () => void
}

export function FormNavigation({
  currentStep,
  isLastStep,
  goToPrevStep,
  goToNextStep,
}: FormNavigationProps) {
  return (
    <div className="fixed bottom-0 z-10 flex w-[calc(100vw-322px)] flex-row items-center justify-between gap-4 border-t bg-background px-8 py-4">
      <Button
        type="button"
        variant="outline"
        onClick={goToPrevStep}
        disabled={currentStep === 0}
        className="w-full sm:w-auto"
      >
        <ChevronLeft className="h-4 w-4" />
        Précédent
      </Button>

      <div className="order-first text-sm font-medium text-muted-foreground sm:order-0">
        Étape {currentStep + 1} / {STEPS.length}
      </div>

      {isLastStep ? (
        <Button type="submit" className="w-full sm:w-auto">
          <Save className="h-4 w-4" />
          Enregistrer le profil
        </Button>
      ) : (
        <Button
          type="button"
          onClick={goToNextStep}
          className="w-full sm:w-auto"
        >
          Étape suivante
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
