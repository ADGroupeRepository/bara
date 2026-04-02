"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import {
  User,
  Briefcase,
  FileText,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  Save,
  ArrowLeft,
  Upload,
  Plus,
  X,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { cn } from "@/lib/utils"

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const employeeSchema = z.object({
  // ── Informations Personnelles ──
  civilite: z.string().min(1, "La civilité est requise"),
  nom: z.string().min(2, "Le nom est requis (min. 2 caractères)"),
  prenom: z.string().min(2, "Le prénom est requis (min. 2 caractères)"),
  dateNaissance: z.string().min(1, "La date de naissance est requise"),
  lieuNaissance: z.string().optional(),
  nationalite: z.string().min(1, "La nationalité est requise"),
  situationMatrimoniale: z.string().optional(),
  nombreEnfants: z.string().optional(),
  genre: z.string().min(1, "Le genre est requis"),

  // ── Coordonnées ──
  adresse: z.string().optional(),
  ville: z.string().optional(),
  codePostal: z.string().optional(),
  pays: z.string().optional(),
  telephonePersonnel: z.string().optional(),
  telephoneProfessionnel: z.string().optional(),
  emailPersonnel: z
    .string()
    .email("Email invalide")
    .optional()
    .or(z.literal("")),
  emailProfessionnel: z
    .string()
    .email("Email invalide")
    .optional()
    .or(z.literal("")),
  contactUrgenceNom: z.string().optional(),
  contactUrgenceRelation: z.string().optional(),
  contactUrgenceTelephone: z.string().optional(),

  // ── Informations Professionnelles ──
  matricule: z.string().optional(),
  poste: z.string().min(1, "Le poste est requis"),
  departement: z.string().min(1, "Le département est requis"),
  superieurHierarchique: z.string().optional(),
  dateEmbauche: z.string().min(1, "La date d'embauche est requise"),
  typeContrat: z.string().min(1, "Le type de contrat est requis"),
  dateFinContrat: z.string().optional(),
  periodeEssai: z.string().optional(),
  statut: z.string().min(1, "Le statut est requis"),

  // ── Rémunération ──
  salaireBase: z.string().optional(),
  devise: z.string().optional(),
  frequencePaiement: z.string().optional(),
  modePaiement: z.string().optional(),
  rib: z.string().optional(),
  banque: z.string().optional(),
  numeroCompte: z.string().optional(),
  indemniteTransport: z.string().optional(),
  primeLogement: z.string().optional(),

  // ── Documents ──
  numeroCni: z.string().optional(),
  dateExpirationCni: z.string().optional(),
  numeroSecuriteSociale: z.string().optional(),
  numeroFiscal: z.string().optional(),

  // ── Formation ──
  niveauEtudes: z.string().optional(),
  diplome: z.string().optional(),
  etablissement: z.string().optional(),
  anneeObtention: z.string().optional(),
  langues: z.string().optional(),
  certifications: z.string().optional(),

  // ── Notes ──
  notesInternes: z.string().optional(),
  aptitudeMedicale: z.string().optional(),
  handicapDeclare: z.boolean().optional(),
})

type EmployeeFormData = z.infer<typeof employeeSchema>

// ─── Steps Config ─────────────────────────────────────────────────────────────

const STEPS = [
  { id: "identite", label: "Identité & Contact", icon: User },
  { id: "contrat", label: "Contrat & Salaire", icon: Briefcase },
  { id: "dossier", label: "Dossier & Formation", icon: FileText },
  { id: "notes", label: "Notes & Santé", icon: StickyNote },
] as const

// Fields to validate per step (only required fields)
const STEP_FIELDS: Record<number, (keyof EmployeeFormData)[]> = {
  0: ["civilite", "nom", "prenom", "dateNaissance", "nationalite", "genre"],
  1: ["poste", "departement", "dateEmbauche", "typeContrat", "statut"],
  2: [], // Documents & Formation — all optional
  3: [], // Notes — all optional
}

// ─── Competence Tags ──────────────────────────────────────────────────────────

function TagInput({
  value,
  onChange,
  placeholder,
}: {
  readonly value: string[]
  readonly onChange: (tags: string[]) => void
  readonly placeholder: string
}) {
  const [input, setInput] = useState("")

  function addTag() {
    const tag = input.trim()
    if (tag && !value.includes(tag)) {
      onChange([...value, tag])
      setInput("")
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag))
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addTag()
            }
          }}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addTag}
          className="h-9 px-3"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 pr-1 text-xs">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

function Stepper({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: {
  readonly steps: typeof STEPS
  readonly currentStep: number
  readonly completedSteps: Set<number>
  readonly onStepClick: (index: number) => void
}) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-center gap-3">
        {steps.map((step, index) => {
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

// ─── Main Component ───────────────────────────────────────────────────────────

export function EmployeeForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [competences, setCompetences] = useState<string[]>([])
  const [languesTags, setLanguesTags] = useState<string[]>([])
  const [certificationsTags, setCertificationsTags] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      civilite: "",
      genre: "",
      nationalite: "",
      typeContrat: "",
      statut: "Actif",
      devise: "XOF",
      frequencePaiement: "Mensuel",
      modePaiement: "",
      niveauEtudes: "",
      aptitudeMedicale: "Apte",
      handicapDeclare: false,
      pays: "Côte d'Ivoire",
      situationMatrimoniale: "",
      periodeEssai: "",
    },
  })

  // Select handler helper
  function handleSelectChange(field: keyof EmployeeFormData, value: string) {
    setValue(field, value, { shouldValidate: true })
  }

  // Validate current step and go next
  async function goToNextStep() {
    const fieldsToValidate = STEP_FIELDS[currentStep] || []

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate)
      if (!isValid) return
    }

    // Mark current step as completed
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

  function onSubmit(data: EmployeeFormData) {
    // Mark final step as completed
    setCompletedSteps((prev) => new Set([...prev, currentStep]))
    console.log("Employee data:", {
      ...data,
      competences,
      langues: languesTags,
      certifications: certificationsTags,
    })
  }

  const isLastStep = currentStep === STEPS.length - 1

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-[calc(100vh-100px)] max-w-full flex-1 flex-col pt-36"
    >
      {/* Header */}
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
            {/* <p className="mt-0.5 text-sm text-muted-foreground">
              Renseignez le profil complet en naviguant étape par étape
            </p> */}
          </div>
        </div>

        {/* Stepper Container - Sticky below header */}
        <div className="sticky top-[72px] z-20 flex justify-center bg-background pl-14">
          <Stepper
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex w-full flex-1 flex-col gap-8">
        {/* Step Content Container */}
        <div className="flex min-w-0 flex-1 flex-col gap-8 px-8 pb-24">
          {/* ═══════════════════════════════════════════════════════════════
            STEP 1 — Identité & Contact
        ═══════════════════════════════════════════════════════════════ */}
          {currentStep === 0 && (
            <div className="space-y-8">
              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Informations Personnelles</CardTitle>
                  <CardDescription>
                    Identité et état civil du collaborateur
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Field data-invalid={!!errors.civilite}>
                    <FieldLabel>
                      Civilité <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Select
                      value={watch("civilite")}
                      onValueChange={(v) => handleSelectChange("civilite", v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M.">M.</SelectItem>
                        <SelectItem value="Mme">Mme</SelectItem>
                        <SelectItem value="Mlle">Mlle</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError>{errors.civilite?.message}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.nom}>
                    <FieldLabel>
                      Nom <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      placeholder="Nom de famille"
                      {...register("nom")}
                      aria-invalid={!!errors.nom}
                    />
                    <FieldError>{errors.nom?.message}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.prenom}>
                    <FieldLabel>
                      Prénom <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      placeholder="Prénom(s)"
                      {...register("prenom")}
                      aria-invalid={!!errors.prenom}
                    />
                    <FieldError>{errors.prenom?.message}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.genre}>
                    <FieldLabel>
                      Genre <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Select
                      value={watch("genre")}
                      onValueChange={(v) => handleSelectChange("genre", v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculin">Masculin</SelectItem>
                        <SelectItem value="Féminin">Féminin</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError>{errors.genre?.message}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.dateNaissance}>
                    <FieldLabel>
                      Date de naissance{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      type="date"
                      {...register("dateNaissance")}
                      aria-invalid={!!errors.dateNaissance}
                    />
                    <FieldError>{errors.dateNaissance?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Lieu de naissance</FieldLabel>
                    <Input
                      placeholder="Ville de naissance"
                      {...register("lieuNaissance")}
                    />
                  </Field>

                  <Field data-invalid={!!errors.nationalite}>
                    <FieldLabel>
                      Nationalité <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      placeholder="Ex: Ivoirienne"
                      {...register("nationalite")}
                      aria-invalid={!!errors.nationalite}
                    />
                    <FieldError>{errors.nationalite?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Situation matrimoniale</FieldLabel>
                    <Select
                      value={watch("situationMatrimoniale")}
                      onValueChange={(v) =>
                        handleSelectChange("situationMatrimoniale", v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Célibataire">Célibataire</SelectItem>
                        <SelectItem value="Marié(e)">Marié(e)</SelectItem>
                        <SelectItem value="Divorcé(e)">Divorcé(e)</SelectItem>
                        <SelectItem value="Veuf/Veuve">Veuf/Veuve</SelectItem>
                        <SelectItem value="Pacsé(e)">Pacsé(e)</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Nombre d&apos;enfants</FieldLabel>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      {...register("nombreEnfants")}
                    />
                  </Field>
                </CardContent>
              </Card>

              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Adresse & Contact</CardTitle>
                  <CardDescription>
                    Coordonnées personnelles et professionnelles
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Field className="md:col-span-2 lg:col-span-3">
                    <FieldLabel>Adresse</FieldLabel>
                    <Input
                      placeholder="Rue, quartier, commune…"
                      {...register("adresse")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Ville</FieldLabel>
                    <Input placeholder="Ex: Abidjan" {...register("ville")} />
                  </Field>

                  <Field>
                    <FieldLabel>Code postal</FieldLabel>
                    <Input
                      placeholder="Ex: 01 BP 1234"
                      {...register("codePostal")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Pays</FieldLabel>
                    <Input
                      placeholder="Ex: Côte d'Ivoire"
                      {...register("pays")}
                    />
                  </Field>

                  <Separator className="md:col-span-2 lg:col-span-3" />

                  <Field>
                    <FieldLabel>Téléphone personnel</FieldLabel>
                    <Input
                      type="tel"
                      placeholder="+225 07 00 00 00"
                      {...register("telephonePersonnel")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Téléphone professionnel</FieldLabel>
                    <Input
                      type="tel"
                      placeholder="+225 27 00 00 00"
                      {...register("telephoneProfessionnel")}
                    />
                  </Field>

                  <div />

                  <Field data-invalid={!!errors.emailPersonnel}>
                    <FieldLabel>Email personnel</FieldLabel>
                    <Input
                      type="email"
                      placeholder="prenom.nom@email.com"
                      {...register("emailPersonnel")}
                      aria-invalid={!!errors.emailPersonnel}
                    />
                    <FieldError>{errors.emailPersonnel?.message}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.emailProfessionnel}>
                    <FieldLabel>Email professionnel</FieldLabel>
                    <Input
                      type="email"
                      placeholder="prenom.nom@cnf.ci"
                      {...register("emailProfessionnel")}
                      aria-invalid={!!errors.emailProfessionnel}
                    />
                    <FieldError>
                      {errors.emailProfessionnel?.message}
                    </FieldError>
                  </Field>
                </CardContent>
              </Card>

              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Contact d&apos;urgence</CardTitle>
                  <CardDescription>
                    Personne à contacter en cas d&apos;urgence
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-3">
                  <Field>
                    <FieldLabel>Nom complet</FieldLabel>
                    <Input
                      placeholder="Nom et prénom"
                      {...register("contactUrgenceNom")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Relation</FieldLabel>
                    <Select
                      value={watch("contactUrgenceRelation")}
                      onValueChange={(v) =>
                        handleSelectChange("contactUrgenceRelation", v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Conjoint(e)">Conjoint(e)</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Frère/Sœur">Frère/Sœur</SelectItem>
                        <SelectItem value="Enfant">Enfant</SelectItem>
                        <SelectItem value="Ami(e)">Ami(e)</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Téléphone</FieldLabel>
                    <Input
                      type="tel"
                      placeholder="+225 07 00 00 00"
                      {...register("contactUrgenceTelephone")}
                    />
                  </Field>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
            STEP 2 — Contrat & Salaire
        ═══════════════════════════════════════════════════════════════ */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Informations Professionnelles</CardTitle>
                  <CardDescription>
                    Poste, contrat et rattachement hiérarchique
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Field>
                    <FieldLabel>Matricule</FieldLabel>
                    <Input
                      placeholder="Auto-généré si vide"
                      {...register("matricule")}
                    />
                  </Field>

                  <Field data-invalid={!!errors.poste}>
                    <FieldLabel>
                      Poste / Intitulé de fonction{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      placeholder="Ex: Développeur Full-Stack"
                      {...register("poste")}
                      aria-invalid={!!errors.poste}
                    />
                    <FieldError>{errors.poste?.message}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.departement}>
                    <FieldLabel>
                      Département / Service{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Select
                      value={watch("departement")}
                      onValueChange={(v) =>
                        handleSelectChange("departement", v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direction">Direction</SelectItem>
                        <SelectItem value="Informatique">
                          Informatique
                        </SelectItem>
                        <SelectItem value="RH">Ressources Humaines</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Communication">
                          Communication
                        </SelectItem>
                        <SelectItem value="Logistique">Logistique</SelectItem>
                        <SelectItem value="Juridique">Juridique</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError>{errors.departement?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Supérieur hiérarchique</FieldLabel>
                    <Input
                      placeholder="Nom du responsable"
                      {...register("superieurHierarchique")}
                    />
                  </Field>

                  <Field data-invalid={!!errors.dateEmbauche}>
                    <FieldLabel>
                      Date d&apos;embauche{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      type="date"
                      {...register("dateEmbauche")}
                      aria-invalid={!!errors.dateEmbauche}
                    />
                    <FieldError>{errors.dateEmbauche?.message}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.typeContrat}>
                    <FieldLabel>
                      Type de contrat{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Select
                      value={watch("typeContrat")}
                      onValueChange={(v) =>
                        handleSelectChange("typeContrat", v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CDI">CDI</SelectItem>
                        <SelectItem value="CDD">CDD</SelectItem>
                        <SelectItem value="Stage">Stage</SelectItem>
                        <SelectItem value="Alternance">Alternance</SelectItem>
                        <SelectItem value="Intérim">Intérim</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError>{errors.typeContrat?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Date de fin de contrat</FieldLabel>
                    <Input type="date" {...register("dateFinContrat")} />
                  </Field>

                  <Field>
                    <FieldLabel>Période d&apos;essai</FieldLabel>
                    <Select
                      value={watch("periodeEssai")}
                      onValueChange={(v) =>
                        handleSelectChange("periodeEssai", v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 mois">1 mois</SelectItem>
                        <SelectItem value="2 mois">2 mois</SelectItem>
                        <SelectItem value="3 mois">3 mois</SelectItem>
                        <SelectItem value="6 mois">6 mois</SelectItem>
                        <SelectItem value="Non applicable">
                          Non applicable
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field data-invalid={!!errors.statut}>
                    <FieldLabel>
                      Statut <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Select
                      value={watch("statut")}
                      onValueChange={(v) => handleSelectChange("statut", v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Actif">Actif</SelectItem>
                        <SelectItem value="En attente">En attente</SelectItem>
                        <SelectItem value="Suspendu">Suspendu</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError>{errors.statut?.message}</FieldError>
                  </Field>
                </CardContent>
              </Card>

              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Salaire & Primes</CardTitle>
                  <CardDescription>
                    Informations de rémunération et avantages
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Field>
                    <FieldLabel>Salaire de base</FieldLabel>
                    <Input
                      type="number"
                      placeholder="Ex: 500000"
                      {...register("salaireBase")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Devise</FieldLabel>
                    <Select
                      value={watch("devise")}
                      onValueChange={(v) => handleSelectChange("devise", v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="XOF">XOF (FCFA)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Fréquence de paiement</FieldLabel>
                    <Select
                      value={watch("frequencePaiement")}
                      onValueChange={(v) =>
                        handleSelectChange("frequencePaiement", v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mensuel">Mensuel</SelectItem>
                        <SelectItem value="Bimensuel">Bimensuel</SelectItem>
                        <SelectItem value="Hebdomadaire">
                          Hebdomadaire
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Indemnité de transport</FieldLabel>
                    <Input
                      type="number"
                      placeholder="Ex: 30000"
                      {...register("indemniteTransport")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Prime de logement</FieldLabel>
                    <Input
                      type="number"
                      placeholder="Ex: 50000"
                      {...register("primeLogement")}
                    />
                  </Field>
                </CardContent>
              </Card>

              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Informations Bancaires</CardTitle>
                  <CardDescription>
                    Coordonnées bancaires pour le virement du salaire
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Field>
                    <FieldLabel>Mode de paiement</FieldLabel>
                    <Select
                      value={watch("modePaiement")}
                      onValueChange={(v) =>
                        handleSelectChange("modePaiement", v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Virement bancaire">
                          Virement bancaire
                        </SelectItem>
                        <SelectItem value="Chèque">Chèque</SelectItem>
                        <SelectItem value="Espèces">Espèces</SelectItem>
                        <SelectItem value="Mobile Money">
                          Mobile Money
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Banque</FieldLabel>
                    <Input
                      placeholder="Nom de la banque"
                      {...register("banque")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Numéro de compte</FieldLabel>
                    <Input
                      placeholder="Numéro de compte"
                      {...register("numeroCompte")}
                    />
                  </Field>

                  <Field className="md:col-span-2 lg:col-span-3">
                    <FieldLabel>RIB / IBAN</FieldLabel>
                    <Input
                      placeholder="Ex: CI93 CI00 0000 0000 0000 0000 0000"
                      {...register("rib")}
                    />
                  </Field>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
            STEP 3 — Dossier & Formation
        ═══════════════════════════════════════════════════════════════ */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Pièces d&apos;identité</CardTitle>
                  <CardDescription>
                    Numéros d&apos;identification officiels
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <Field>
                    <FieldLabel>N° CNI / Passeport</FieldLabel>
                    <Input
                      placeholder="Numéro du document"
                      {...register("numeroCni")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Date d&apos;expiration</FieldLabel>
                    <Input type="date" {...register("dateExpirationCni")} />
                  </Field>

                  <Field>
                    <FieldLabel>N° Sécurité sociale / CNPS</FieldLabel>
                    <Input
                      placeholder="Numéro d'affiliation"
                      {...register("numeroSecuriteSociale")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Numéro fiscal (IFU)</FieldLabel>
                    <Input
                      placeholder="Identifiant fiscal unique"
                      {...register("numeroFiscal")}
                    />
                  </Field>
                </CardContent>
              </Card>

              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Documents à joindre</CardTitle>
                  <CardDescription>
                    Téléchargez les documents obligatoires du dossier
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { label: "Curriculum Vitae (CV)", id: "cv" },
                      { label: "Pièce d'identité", id: "id-doc" },
                      { label: "Diplôme le plus élevé", id: "diploma" },
                    ].map((doc) => (
                      <div
                        key={doc.id}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center transition-colors hover:border-primary/40 hover:bg-muted/50"
                      >
                        <div className="rounded-full bg-muted p-3">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {doc.label}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            PDF, JPG ou PNG — Max 5 Mo
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-1"
                        >
                          Parcourir
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Parcours Académique</CardTitle>
                  <CardDescription>
                    Niveau d&apos;études et diplômes obtenus
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <Field>
                    <FieldLabel>Niveau d&apos;études</FieldLabel>
                    <Select
                      value={watch("niveauEtudes")}
                      onValueChange={(v) =>
                        handleSelectChange("niveauEtudes", v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bac">Baccalauréat</SelectItem>
                        <SelectItem value="Bac+2">Bac+2 (BTS/DUT)</SelectItem>
                        <SelectItem value="Bac+3">Bac+3 (Licence)</SelectItem>
                        <SelectItem value="Bac+4">Bac+4 (Maîtrise)</SelectItem>
                        <SelectItem value="Bac+5">
                          Bac+5 (Master/Ingénieur)
                        </SelectItem>
                        <SelectItem value="Doctorat">Doctorat</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Diplôme le plus élevé</FieldLabel>
                    <Input
                      placeholder="Ex: Master en Informatique"
                      {...register("diplome")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Établissement</FieldLabel>
                    <Input
                      placeholder="Nom de l'université ou école"
                      {...register("etablissement")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Année d&apos;obtention</FieldLabel>
                    <Input
                      type="number"
                      min="1970"
                      max="2030"
                      placeholder="Ex: 2020"
                      {...register("anneeObtention")}
                    />
                  </Field>
                </CardContent>
              </Card>

              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Compétences & Langues</CardTitle>
                  <CardDescription>
                    Compétences clés, langues parlées et certifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Field>
                    <FieldLabel>Compétences clés</FieldLabel>
                    <TagInput
                      value={competences}
                      onChange={setCompetences}
                      placeholder="Ajouter une compétence…"
                    />
                  </Field>

                  <Separator />

                  <Field>
                    <FieldLabel>Langues parlées</FieldLabel>
                    <TagInput
                      value={languesTags}
                      onChange={setLanguesTags}
                      placeholder="Ajouter une langue…"
                    />
                  </Field>

                  <Separator />

                  <Field>
                    <FieldLabel>Certifications</FieldLabel>
                    <TagInput
                      value={certificationsTags}
                      onChange={setCertificationsTags}
                      placeholder="Ajouter une certification…"
                    />
                  </Field>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
            STEP 4 — Notes & Santé
          ═══════════════════════════════════════════════════════════════ */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Notes Internes</CardTitle>
                  <CardDescription>
                    Commentaires et observations sur le collaborateur
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Ajoutez des notes internes, observations ou commentaires sur le collaborateur…"
                    className="min-h-[150px]"
                    {...register("notesInternes")}
                  />
                </CardContent>
              </Card>

              <Card className="bg-muted ring-0">
                <CardHeader>
                  <CardTitle>Santé & Aptitude</CardTitle>
                  <CardDescription>
                    Informations médicales et déclaration de handicap
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Field>
                    <FieldLabel>Aptitude médicale</FieldLabel>
                    <Select
                      value={watch("aptitudeMedicale")}
                      onValueChange={(v) =>
                        handleSelectChange("aptitudeMedicale", v)
                      }
                    >
                      <SelectTrigger className="w-full max-w-xs">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apte">Apte</SelectItem>
                        <SelectItem value="Inapte">Inapte</SelectItem>
                        <SelectItem value="Apte avec réserves">
                          Apte avec réserves
                        </SelectItem>
                        <SelectItem value="En attente de visite">
                          En attente de visite médicale
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator />

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Handicap déclaré</p>
                      <p className="text-xs text-muted-foreground">
                        Le collaborateur a-t-il déclaré un handicap reconnu ?
                      </p>
                    </div>
                    <Switch
                      checked={watch("handicapDeclare")}
                      onCheckedChange={(checked) =>
                        setValue("handicapDeclare", !!checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        {/* ── Sticky Navigation Footer ── */}
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
      </div>
    </form>
  )
}
