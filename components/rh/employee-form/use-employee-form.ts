"use client"

import { useState, useCallback } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  employeeSchema,
  STEP_FIELDS,
  STEPS,
  INITIAL_DOCUMENTS,
  type EmployeeFormData,
  type DocumentSlot,
} from "./schema"

export function useEmployeeForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  // Tags state
  const [competences, setCompetences] = useState<string[]>([])
  const [languesTags, setLanguesTags] = useState<string[]>([])
  const [certificationsTags, setCertificationsTags] = useState<string[]>([])

  // Documents state
  const [documents, setDocuments] = useState<DocumentSlot[]>(
    INITIAL_DOCUMENTS.map((d) => ({ ...d }))
  )

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onChange",
    defaultValues: {
      civilite: "",
      genre: "",
      nationalite: "",
      typeContrat: "",
      statut: "Actif",
      devise: "XOF",
      frequencePaiement: "Mensuel",
      niveauEtudes: "",
      aptitudeMedicale: "Apte",
      handicapDeclare: false,
      pays: "Côte d'Ivoire",
      situationMatrimoniale: "",
      periodeEssai: "",
      contactsUrgence: [{ nom: "", relation: "", telephone: "" }],
      methodesPaiement: [
        {
          mode: "Virement bancaire",
          estPrincipal: true,
          banque: "",
          numeroCompte: "",
        },
      ],
    },
  })

  // ── Field Arrays ──────────────────────────────────────────────────────────

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({ control, name: "contactsUrgence" })

  const {
    fields: paymentFields,
    append: appendPayment,
    remove: removePayment,
  } = useFieldArray({ control, name: "methodesPaiement" })

  // ── Helpers ───────────────────────────────────────────────────────────────

  const handleSelectChange = useCallback(
    (field: keyof EmployeeFormData, value: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(field, value as any, { shouldValidate: true })
    },
    [setValue]
  )

  // ── Documents ─────────────────────────────────────────────────────────────

  const handleFileSelect = useCallback((docId: string, file: File) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, file } : d))
    )
  }, [])

  const handleFileRemove = useCallback((docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, file: null } : d))
    )
  }, [])

  // ── Navigation ────────────────────────────────────────────────────────────

  async function goToNextStep() {
    const fieldsToValidate = STEP_FIELDS[currentStep] || []

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate)
      if (!isValid) return
    }

    setCompletedSteps((prev) => new Set([...prev, currentStep]))

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  function goToPrevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  function handleStepClick(index: number) {
    if (completedSteps.has(index) || index < currentStep) {
      setCurrentStep(index)
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  function onSubmit(data: EmployeeFormData) {
    setCompletedSteps((prev) => new Set([...prev, currentStep]))
    console.log("Employee data:", {
      ...data,
      competences,
      langues: languesTags,
      certifications: certificationsTags,
      documents: documents.filter((d) => d.file !== null),
    })
  }

  return {
    // Form utilities
    register,
    errors,
    watch,
    setValue,
    control,
    handleSelectChange,
    onFormSubmit: handleSubmit(onSubmit),

    // Navigation
    currentStep,
    completedSteps,
    goToNextStep,
    goToPrevStep,
    handleStepClick,
    isLastStep: currentStep === STEPS.length - 1,

    // Field arrays — contacts
    contactFields,
    appendContact,
    removeContact,

    // Field arrays — payments
    paymentFields,
    appendPayment,
    removePayment,

    // Tags
    competences,
    setCompetences,
    languesTags,
    setLanguesTags,
    certificationsTags,
    setCertificationsTags,

    // Documents
    documents,
    handleFileSelect,
    handleFileRemove,
  }
}

export type UseEmployeeFormReturn = ReturnType<typeof useEmployeeForm>
