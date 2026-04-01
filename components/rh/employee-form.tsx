"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import {
  User,
  MapPin,
  Briefcase,
  Wallet,
  FileText,
  GraduationCap,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  Save,
  ArrowLeft,
  Upload,
  Plus,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
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
  emailPersonnel: z.string().email("Email invalide").optional().or(z.literal("")),
  emailProfessionnel: z.string().email("Email invalide").optional().or(z.literal("")),
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

// ─── Tab Config ───────────────────────────────────────────────────────────────

const TABS = [
  { id: "personnel", label: "Informations Personnelles", icon: User },
  { id: "coordonnees", label: "Coordonnées", icon: MapPin },
  { id: "professionnel", label: "Professionnel", icon: Briefcase },
  { id: "remuneration", label: "Rémunération", icon: Wallet },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "formation", label: "Formation", icon: GraduationCap },
  { id: "notes", label: "Notes", icon: StickyNote },
] as const

// ─── Helper: FormField ────────────────────────────────────────────────────────

function FormField({
  label,
  error,
  required,
  children,
  className,
}: {
  readonly label: string
  readonly error?: string
  readonly required?: boolean
  readonly children: React.ReactNode
  readonly className?: string
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  )
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
        <Button type="button" variant="outline" size="sm" onClick={addTag} className="h-9 px-3">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 pr-1 text-xs"
            >
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

// ─── Main Component ───────────────────────────────────────────────────────────

export function EmployeeForm() {
  const [activeTab, setActiveTab] = useState("personnel")
  const [competences, setCompetences] = useState<string[]>([])
  const [languesTags, setLanguesTags] = useState<string[]>([])
  const [certificationsTags, setCertificationsTags] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const currentTabIndex = TABS.findIndex((t) => t.id === activeTab)

  function goToTab(direction: "prev" | "next") {
    const newIndex =
      direction === "prev" ? currentTabIndex - 1 : currentTabIndex + 1
    if (newIndex >= 0 && newIndex < TABS.length) {
      setActiveTab(TABS[newIndex].id)
    }
  }

  function onSubmit(data: EmployeeFormData) {
    console.log("Employee data:", {
      ...data,
      competences,
      langues: languesTags,
      certifications: certificationsTags,
    })
  }

  // Select handler helper
  function handleSelectChange(field: keyof EmployeeFormData, value: string) {
    setValue(field, value, { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0">
            <Link href="/rh/employees">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Nouveau Collaborateur
            </h2>
            <p className="text-sm text-muted-foreground">
              Remplissez les informations pour créer un nouveau dossier employé
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/rh/employees">Annuler</Link>
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList variant="line" className="w-full justify-start border-b pb-0">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger key={tab.id} value={tab.id} className="gap-2 pb-3">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <ScrollArea className="h-[calc(100vh-310px)]">
          {/* ═══════════════════════════════════════════════════════════════
              TAB 1 — Informations Personnelles
          ═══════════════════════════════════════════════════════════════ */}
          <TabsContent value="personnel" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
                <CardDescription>
                  Identité et état civil du collaborateur
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FormField
                  label="Civilité"
                  error={errors.civilite?.message}
                  required
                >
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
                </FormField>

                <FormField label="Nom" error={errors.nom?.message} required>
                  <Input
                    placeholder="Nom de famille"
                    {...register("nom")}
                    aria-invalid={!!errors.nom}
                  />
                </FormField>

                <FormField
                  label="Prénom"
                  error={errors.prenom?.message}
                  required
                >
                  <Input
                    placeholder="Prénom(s)"
                    {...register("prenom")}
                    aria-invalid={!!errors.prenom}
                  />
                </FormField>

                <FormField
                  label="Genre"
                  error={errors.genre?.message}
                  required
                >
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
                </FormField>

                <FormField
                  label="Date de naissance"
                  error={errors.dateNaissance?.message}
                  required
                >
                  <Input
                    type="date"
                    {...register("dateNaissance")}
                    aria-invalid={!!errors.dateNaissance}
                  />
                </FormField>

                <FormField label="Lieu de naissance">
                  <Input
                    placeholder="Ville de naissance"
                    {...register("lieuNaissance")}
                  />
                </FormField>

                <FormField
                  label="Nationalité"
                  error={errors.nationalite?.message}
                  required
                >
                  <Input
                    placeholder="Ex: Ivoirienne"
                    {...register("nationalite")}
                    aria-invalid={!!errors.nationalite}
                  />
                </FormField>

                <FormField label="Situation matrimoniale">
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
                </FormField>

                <FormField label="Nombre d'enfants">
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    {...register("nombreEnfants")}
                  />
                </FormField>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════
              TAB 2 — Coordonnées
          ═══════════════════════════════════════════════════════════════ */}
          <TabsContent value="coordonnees" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adresse & Contact</CardTitle>
                <CardDescription>
                  Coordonnées personnelles et professionnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FormField label="Adresse" className="md:col-span-2 lg:col-span-3">
                  <Input
                    placeholder="Rue, quartier, commune…"
                    {...register("adresse")}
                  />
                </FormField>

                <FormField label="Ville">
                  <Input placeholder="Ex: Abidjan" {...register("ville")} />
                </FormField>

                <FormField label="Code postal">
                  <Input placeholder="Ex: 01 BP 1234" {...register("codePostal")} />
                </FormField>

                <FormField label="Pays">
                  <Input
                    placeholder="Ex: Côte d'Ivoire"
                    {...register("pays")}
                  />
                </FormField>

                <Separator className="md:col-span-2 lg:col-span-3" />

                <FormField label="Téléphone personnel">
                  <Input
                    type="tel"
                    placeholder="+225 07 00 00 00"
                    {...register("telephonePersonnel")}
                  />
                </FormField>

                <FormField label="Téléphone professionnel">
                  <Input
                    type="tel"
                    placeholder="+225 27 00 00 00"
                    {...register("telephoneProfessionnel")}
                  />
                </FormField>

                <div />

                <FormField
                  label="Email personnel"
                  error={errors.emailPersonnel?.message}
                >
                  <Input
                    type="email"
                    placeholder="prenom.nom@email.com"
                    {...register("emailPersonnel")}
                    aria-invalid={!!errors.emailPersonnel}
                  />
                </FormField>

                <FormField
                  label="Email professionnel"
                  error={errors.emailProfessionnel?.message}
                >
                  <Input
                    type="email"
                    placeholder="prenom.nom@cnf.ci"
                    {...register("emailProfessionnel")}
                    aria-invalid={!!errors.emailProfessionnel}
                  />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact d&apos;urgence</CardTitle>
                <CardDescription>
                  Personne à contacter en cas d&apos;urgence
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                <FormField label="Nom complet">
                  <Input
                    placeholder="Nom et prénom"
                    {...register("contactUrgenceNom")}
                  />
                </FormField>

                <FormField label="Relation">
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
                </FormField>

                <FormField label="Téléphone">
                  <Input
                    type="tel"
                    placeholder="+225 07 00 00 00"
                    {...register("contactUrgenceTelephone")}
                  />
                </FormField>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════
              TAB 3 — Informations Professionnelles
          ═══════════════════════════════════════════════════════════════ */}
          <TabsContent value="professionnel" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations Professionnelles</CardTitle>
                <CardDescription>
                  Poste, contrat et rattachement hiérarchique
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FormField label="Matricule">
                  <Input
                    placeholder="Auto-généré si vide"
                    {...register("matricule")}
                  />
                </FormField>

                <FormField label="Poste / Intitulé de fonction" error={errors.poste?.message} required>
                  <Input
                    placeholder="Ex: Développeur Full-Stack"
                    {...register("poste")}
                    aria-invalid={!!errors.poste}
                  />
                </FormField>

                <FormField
                  label="Département / Service"
                  error={errors.departement?.message}
                  required
                >
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
                      <SelectItem value="Informatique">Informatique</SelectItem>
                      <SelectItem value="RH">Ressources Humaines</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Communication">Communication</SelectItem>
                      <SelectItem value="Logistique">Logistique</SelectItem>
                      <SelectItem value="Juridique">Juridique</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Supérieur hiérarchique">
                  <Input
                    placeholder="Nom du responsable"
                    {...register("superieurHierarchique")}
                  />
                </FormField>

                <FormField
                  label="Date d'embauche"
                  error={errors.dateEmbauche?.message}
                  required
                >
                  <Input
                    type="date"
                    {...register("dateEmbauche")}
                    aria-invalid={!!errors.dateEmbauche}
                  />
                </FormField>

                <FormField
                  label="Type de contrat"
                  error={errors.typeContrat?.message}
                  required
                >
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
                </FormField>

                <FormField label="Date de fin de contrat">
                  <Input type="date" {...register("dateFinContrat")} />
                </FormField>

                <FormField label="Période d'essai">
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
                      <SelectItem value="Non applicable">Non applicable</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField
                  label="Statut"
                  error={errors.statut?.message}
                  required
                >
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
                </FormField>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════
              TAB 4 — Rémunération
          ═══════════════════════════════════════════════════════════════ */}
          <TabsContent value="remuneration" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Salaire & Primes</CardTitle>
                <CardDescription>
                  Informations de rémunération et avantages
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FormField label="Salaire de base">
                  <Input
                    type="number"
                    placeholder="Ex: 500000"
                    {...register("salaireBase")}
                  />
                </FormField>

                <FormField label="Devise">
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
                </FormField>

                <FormField label="Fréquence de paiement">
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
                      <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Indemnité de transport">
                  <Input
                    type="number"
                    placeholder="Ex: 30000"
                    {...register("indemniteTransport")}
                  />
                </FormField>

                <FormField label="Prime de logement">
                  <Input
                    type="number"
                    placeholder="Ex: 50000"
                    {...register("primeLogement")}
                  />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations Bancaires</CardTitle>
                <CardDescription>
                  Coordonnées bancaires pour le virement du salaire
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FormField label="Mode de paiement">
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
                      <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Banque">
                  <Input
                    placeholder="Nom de la banque"
                    {...register("banque")}
                  />
                </FormField>

                <FormField label="Numéro de compte">
                  <Input
                    placeholder="Numéro de compte"
                    {...register("numeroCompte")}
                  />
                </FormField>

                <FormField label="RIB / IBAN" className="md:col-span-2 lg:col-span-3">
                  <Input
                    placeholder="Ex: CI93 CI00 0000 0000 0000 0000 0000"
                    {...register("rib")}
                  />
                </FormField>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════
              TAB 5 — Documents & Conformité
          ═══════════════════════════════════════════════════════════════ */}
          <TabsContent value="documents" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pièces d&apos;identité</CardTitle>
                <CardDescription>
                  Numéros d&apos;identification officiels
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <FormField label="N° CNI / Passeport">
                  <Input
                    placeholder="Numéro du document"
                    {...register("numeroCni")}
                  />
                </FormField>

                <FormField label="Date d'expiration">
                  <Input type="date" {...register("dateExpirationCni")} />
                </FormField>

                <FormField label="N° Sécurité sociale / CNPS">
                  <Input
                    placeholder="Numéro d'affiliation"
                    {...register("numeroSecuriteSociale")}
                  />
                </FormField>

                <FormField label="Numéro fiscal (IFU)">
                  <Input
                    placeholder="Identifiant fiscal unique"
                    {...register("numeroFiscal")}
                  />
                </FormField>
              </CardContent>
            </Card>

            <Card>
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
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════
              TAB 6 — Formation & Compétences
          ═══════════════════════════════════════════════════════════════ */}
          <TabsContent value="formation" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Parcours Académique</CardTitle>
                <CardDescription>
                  Niveau d&apos;études et diplômes obtenus
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <FormField label="Niveau d'études">
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
                      <SelectItem value="Bac+5">Bac+5 (Master/Ingénieur)</SelectItem>
                      <SelectItem value="Doctorat">Doctorat</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Diplôme le plus élevé">
                  <Input
                    placeholder="Ex: Master en Informatique"
                    {...register("diplome")}
                  />
                </FormField>

                <FormField label="Établissement">
                  <Input
                    placeholder="Nom de l'université ou école"
                    {...register("etablissement")}
                  />
                </FormField>

                <FormField label="Année d'obtention">
                  <Input
                    type="number"
                    min="1970"
                    max="2030"
                    placeholder="Ex: 2020"
                    {...register("anneeObtention")}
                  />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compétences & Langues</CardTitle>
                <CardDescription>
                  Compétences clés, langues parlées et certifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField label="Compétences clés">
                  <TagInput
                    value={competences}
                    onChange={setCompetences}
                    placeholder="Ajouter une compétence…"
                  />
                </FormField>

                <Separator />

                <FormField label="Langues parlées">
                  <TagInput
                    value={languesTags}
                    onChange={setLanguesTags}
                    placeholder="Ajouter une langue…"
                  />
                </FormField>

                <Separator />

                <FormField label="Certifications">
                  <TagInput
                    value={certificationsTags}
                    onChange={setCertificationsTags}
                    placeholder="Ajouter une certification…"
                  />
                </FormField>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════
              TAB 7 — Notes & Observations
          ═══════════════════════════════════════════════════════════════ */}
          <TabsContent value="notes" className="mt-6 space-y-6">
            <Card>
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

            <Card>
              <CardHeader>
                <CardTitle>Santé & Aptitude</CardTitle>
                <CardDescription>
                  Informations médicales et déclaration de handicap
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField label="Aptitude médicale">
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
                </FormField>

                <Separator />

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">
                      Handicap déclaré
                    </Label>
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
          </TabsContent>
        </ScrollArea>

        {/* ── Tab Navigation Footer ── */}
        <div className="flex items-center justify-between border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => goToTab("prev")}
            disabled={currentTabIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>

          <div className="flex items-center gap-1.5">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  i === currentTabIndex
                    ? "w-6 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          {currentTabIndex < TABS.length - 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => goToTab("next")}
            >
              Suivant
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          )}
        </div>
      </Tabs>
    </form>
  )
}
