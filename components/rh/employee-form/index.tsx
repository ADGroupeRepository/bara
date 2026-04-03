"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useEmployeeForm } from "./use-employee-form"
import { Stepper } from "./stepper"
import { FormNavigation } from "./form-navigation"
import { StepIdentity } from "./steps/step-identity"
import { StepContract } from "./steps/step-contract"
import { StepDocuments } from "./steps/step-documents"
import { StepNotes } from "./steps/step-notes"
import type { StepFormProps } from "./schema"

export function EmployeeForm() {
  const form = useEmployeeForm()

  const stepFormProps: StepFormProps = {
    register: form.register,
    errors: form.errors,
    watch: form.watch,
    setValue: form.setValue,
    control: form.control as unknown as StepFormProps["control"],
    handleSelectChange: form.handleSelectChange,
  }

  return (
    <form
      onSubmit={form.onFormSubmit}
      className="flex min-h-[calc(100vh-100px)] max-w-full flex-1 flex-col pt-36"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="fixed top-0 z-10 mb-8 flex w-[calc(100vw-322px)] flex-wrap items-center justify-between gap-2 border-b bg-background px-4 pt-3 pb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="h-10 w-10 rounded-full"
          >
            <Link href="/rh/employees">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Nouveau Collaborateur
            </h2>
          </div>
        </div>

        <div className="sticky top-[72px] z-20 flex justify-center bg-background pl-14">
          <Stepper
            currentStep={form.currentStep}
            completedSteps={form.completedSteps}
            onStepClick={form.handleStepClick}
          />
        </div>
      </div>

      {/* ── Step Content ───────────────────────────────────────────────────── */}
      <div className="flex w-full flex-1 flex-col gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-8 px-8 pb-24">
          {form.currentStep === 0 && (
            <StepIdentity
              {...stepFormProps}
              contactFields={form.contactFields}
              appendContact={form.appendContact}
              removeContact={form.removeContact}
            />
          )}

          {form.currentStep === 1 && (
            <StepContract
              {...stepFormProps}
              paymentFields={form.paymentFields}
              appendPayment={form.appendPayment}
              removePayment={form.removePayment}
            />
          )}

          {form.currentStep === 2 && (
            <StepDocuments
              {...stepFormProps}
              competences={form.competences}
              setCompetences={form.setCompetences}
              languesTags={form.languesTags}
              setLanguesTags={form.setLanguesTags}
              certificationsTags={form.certificationsTags}
              setCertificationsTags={form.setCertificationsTags}
              documents={form.documents}
              handleFileSelect={form.handleFileSelect}
              handleFileRemove={form.handleFileRemove}
            />
          )}

          {form.currentStep === 3 && <StepNotes {...stepFormProps} />}
        </div>

        {/* ── Navigation Footer ──────────────────────────────────────────── */}
        <FormNavigation
          currentStep={form.currentStep}
          isLastStep={form.isLastStep}
          goToPrevStep={form.goToPrevStep}
          goToNextStep={form.goToNextStep}
        />
      </div>
    </form>
  )
}
