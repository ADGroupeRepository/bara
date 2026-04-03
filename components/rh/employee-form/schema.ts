import { z } from "zod"
import {
  User,
  Briefcase,
  FileText,
  StickyNote,
  type LucideIcon,
} from "lucide-react"
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Control,
  FieldErrors,
} from "react-hook-form"

// ─── Zod Schema ───────────────────────────────────────────────────────────────

export const employeeSchema = z.object({
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
  contactsUrgence: z.array(
    z.object({
      nom: z.string().optional(),
      relation: z.string().optional(),
      telephone: z.string().optional(),
    })
  ),

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
  methodesPaiement: z.array(
    z.object({
      mode: z.string().min(1, "Mode requis"),
      banque: z.string().optional(),
      numeroCompte: z.string().optional(),
      rib: z.string().optional(),
      telephone: z.string().optional(),
      operateur: z.string().optional(),
      estPrincipal: z.boolean(),
    })
  ),
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

export type EmployeeFormData = z.infer<typeof employeeSchema>

// ─── Steps Config ─────────────────────────────────────────────────────────────

export type StepConfig = {
  readonly id: string
  readonly label: string
  readonly icon: LucideIcon
}

export const STEPS: readonly StepConfig[] = [
  { id: "identite", label: "Identité & Contact", icon: User },
  { id: "contrat", label: "Contrat & Salaire", icon: Briefcase },
  { id: "dossier", label: "Dossier & Formation", icon: FileText },
  { id: "notes", label: "Notes & Santé", icon: StickyNote },
]

export const STEP_FIELDS: Record<number, (keyof EmployeeFormData)[]> = {
  0: ["civilite", "nom", "prenom", "dateNaissance", "nationalite", "genre"],
  1: ["poste", "departement", "dateEmbauche", "typeContrat", "statut"],
  2: [],
  3: [],
}

// ─── Document Types ───────────────────────────────────────────────────────────

export type DocumentSlot = {
  id: string
  label: string
  file: File | null
}

export const INITIAL_DOCUMENTS: DocumentSlot[] = [
  { id: "cv", label: "Curriculum Vitae (CV)", file: null },
  { id: "id-doc", label: "Pièce d'identité", file: null },
  { id: "diploma", label: "Diplôme le plus élevé", file: null },
]

// ─── Shared Step Props ────────────────────────────────────────────────────────

export type StepFormProps = {
  register: UseFormRegister<EmployeeFormData>
  errors: FieldErrors<EmployeeFormData>
  watch: UseFormWatch<EmployeeFormData>
  setValue: UseFormSetValue<EmployeeFormData>
  control: Control<EmployeeFormData, unknown, EmployeeFormData>
  handleSelectChange: (field: keyof EmployeeFormData, value: string) => void
}
