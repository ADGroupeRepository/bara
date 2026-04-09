"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { EmployeeProfile } from "../mock-data"
import { EditableInfoRow } from "../editable-info-row"
import { EditableCardHeader } from "../editable-card-header"
import { useCardEditing } from "../use-card-editing"

type TabOverviewProps = {
  readonly employee: EmployeeProfile
}

const CIVILITE_OPTIONS = [
  { value: "M.", label: "M." },
  { value: "Mme", label: "Mme" },
  { value: "Mlle", label: "Mlle" },
]

const GENRE_OPTIONS = [
  { value: "Masculin", label: "Masculin" },
  { value: "Féminin", label: "Féminin" },
]

const STATUT_OPTIONS = [
  { value: "Actif", label: "Actif" },
  { value: "En congé", label: "En congé" },
  { value: "Télétravail", label: "Télétravail" },
  { value: "Suspendu", label: "Suspendu" },
]

const TYPE_CONTRAT_OPTIONS = [
  { value: "CDI", label: "CDI" },
  { value: "CDD", label: "CDD" },
  { value: "Stage", label: "Stage" },
  { value: "Alternance", label: "Alternance" },
  { value: "Freelance", label: "Freelance" },
]

const GRADE_OPTIONS = [
  { value: "Junior", label: "Junior" },
  { value: "Confirmé", label: "Confirmé" },
  { value: "Sénior", label: "Sénior" },
  { value: "Manager", label: "Manager" },
  { value: "Directeur", label: "Directeur" },
]

const MANAGERS = [
  { value: "Siaka Sylla", label: "Siaka Sylla", avatar: "/homme01.png" },
  { value: "Jean Dupont", label: "Jean Dupont", avatar: "/homme02.png" },
  { value: "Marissa Koné", label: "Marissa Koné", avatar: "/femme01.png" },
  { value: "Alassane Traoré", label: "Alassane Traoré", avatar: "/homme03.png" },
  { value: "Evelyne Kouassi", label: "Evelyne Kouassi", avatar: "/femme02.png" },
]

const VILLE_OPTIONS = [
  { value: "Abidjan", label: "Abidjan" },
  { value: "Bouaké", label: "Bouaké" },
  { value: "Daloa", label: "Daloa" },
  { value: "Yamoussoukro", label: "Yamoussoukro" },
  { value: "San Pedro", label: "San Pedro" },
  { value: "Korhogo", label: "Korhogo" },
  { value: "Man", label: "Man" },
]

const NATIONALITE_OPTIONS = [
  { value: "Ivoirienne", label: "Ivoirienne" },
  { value: "Sénégalaise", label: "Sénégalaise" },
  { value: "Malienne", label: "Malienne" },
  { value: "Burkinabé", label: "Burkinabé" },
  { value: "Française", label: "Française" },
  { value: "Ghanéenne", label: "Ghanéenne" },
]

export function TabOverview({ employee }: TabOverviewProps) {
  return (
    <div className="grid gap-6 pb-6 lg:grid-cols-2">
      <PersonalInfoCard employee={employee} />
      <ProfessionalInfoCard employee={employee} />
    </div>
  )
}

function PersonalInfoCard({
  employee,
}: {
  readonly employee: EmployeeProfile
}) {
  const personalEdit = useCardEditing({
    nom: employee.nom,
    prenom: employee.prenom,
    dateEmbauche: employee.dateEmbauche,
    statut: employee.statut,
    civilite: employee.civilite,
    genre: employee.genre,
    lieuNaissance: employee.lieuNaissance || "Abidjan",
    nationalite: employee.nationalite || "Ivoirienne",
  })

  return (
    <Card className="border-border bg-card shadow-none">
      <EditableCardHeader
        title="Informations Personnelles"
        description="Identité et accès plateforme"
        isEditing={personalEdit.isEditing}
        onEdit={personalEdit.startEditing}
        onCancel={personalEdit.cancelEditing}
        onSave={() => personalEdit.saveEditing()}
      />
      <CardContent>
        <div className="space-y-4">
          <EditableInfoRow
            label="Nom"
            value={
              personalEdit.isEditing ? personalEdit.formData.nom : employee.nom
            }
            fieldKey="nom"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
          />
          <EditableInfoRow
            label="Prénom"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.prenom
                : employee.prenom
            }
            fieldKey="prenom"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
          />
          <EditableInfoRow
            label="Date d'adhésion"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.dateEmbauche
                : employee.dateEmbauche
            }
            fieldKey="dateEmbauche"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            type="date"
          />
          <EditableInfoRow
            label="Statut"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.statut
                : employee.statut
            }
            fieldKey="statut"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            options={STATUT_OPTIONS}
            badge={!personalEdit.isEditing}
            badgeVariant={employee.statut === "Actif" ? "default" : "secondary"}
            layout="horizontal"
          />
          <EditableInfoRow
            label="Civilité"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.civilite
                : employee.civilite
            }
            fieldKey="civilite"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            options={CIVILITE_OPTIONS}
          />
          <EditableInfoRow
            label="Genre"
            value={
              personalEdit.isEditing
                ? personalEdit.formData.genre
                : employee.genre
            }
            fieldKey="genre"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            options={GENRE_OPTIONS}
          />
          <EditableInfoRow
            label="Lieu de naissance"
            value={
              (personalEdit.isEditing
                ? personalEdit.formData.lieuNaissance
                : employee.lieuNaissance) || "Abidjan"
            }
            fieldKey="lieuNaissance"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            options={VILLE_OPTIONS}
            placeholder="Abidjan"
          />
          <EditableInfoRow
            label="Nationalité"
            value={
              (personalEdit.isEditing
                ? personalEdit.formData.nationalite
                : employee.nationalite) || "Ivoirienne"
            }
            fieldKey="nationalite"
            isEditing={personalEdit.isEditing}
            onChange={personalEdit.updateField}
            options={NATIONALITE_OPTIONS}
            placeholder="Ivoirienne"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ProfessionalInfoCard({
  employee,
}: {
  readonly employee: EmployeeProfile
}) {
  const proEdit = useCardEditing({
    matricule: employee.matricule,
    poste: employee.poste,
    site: employee.site,
    departement: employee.departement,
    superieurHierarchique: employee.superieurHierarchique,
    grade: employee.grade,
    typeContrat: employee.typeContrat,
    periodeEssai: employee.periodeEssai,
  })

  return (
    <Card className="border-border bg-card shadow-none">
      <EditableCardHeader
        title="Informations professionnelles"
        description="Poste, structure et contrat"
        isEditing={proEdit.isEditing}
        onEdit={proEdit.startEditing}
        onCancel={proEdit.cancelEditing}
        onSave={() => proEdit.saveEditing()}
      />
      <CardContent>
        <div className="space-y-4">
          <EditableInfoRow
            label="Entreprise"
            value="CNF - Compagnie Nationale"
            fieldKey="entreprise"
            isEditing={false}
            onChange={() => {}}
          />
          <EditableInfoRow
            label="Matricule"
            value={
              proEdit.isEditing
                ? proEdit.formData.matricule
                : employee.matricule
            }
            fieldKey="matricule"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />
          <EditableInfoRow
            label="Rôle / Poste"
            value={proEdit.isEditing ? proEdit.formData.poste : employee.poste}
            fieldKey="poste"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />
          <EditableInfoRow
            label="Branche / Site"
            value={proEdit.isEditing ? proEdit.formData.site : employee.site}
            fieldKey="site"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />
          <EditableInfoRow
            label="Département"
            value={
              proEdit.isEditing
                ? proEdit.formData.departement
                : employee.departement
            }
            fieldKey="departement"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />

          {/* Supérieur hiérarchique */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs">Supérieur hiérarchique</p>
            <div className="w-full">
              {proEdit.isEditing ? (
                <Select
                  value={proEdit.formData.superieurHierarchique}
                  onValueChange={(value) =>
                    proEdit.updateField("superieurHierarchique", value)
                  }
                >
                  <SelectTrigger className="h-10 w-full border-border/40 bg-background text-xs focus:ring-0 focus:ring-offset-0 px-2">
                    <SelectValue placeholder="Sélectionner un manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {MANAGERS.map((manager) => (
                      <SelectItem key={manager.value} value={manager.value}>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-5 border border-border/10">
                            <AvatarImage
                              src={manager.avatar}
                              alt={manager.label}
                            />
                            <AvatarFallback className="text-[8px] bg-muted/50">
                              {manager.label
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{manager.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex h-10 w-full items-center gap-2 rounded-md border border-input bg-transparent px-2 text-xs font-medium text-foreground/70 opacity-70">
                  <Avatar className="size-6 border border-border/20">
                    <AvatarImage
                      src={
                        MANAGERS.find(
                          (m) => m.value === employee.superieurHierarchique
                        )?.avatar
                      }
                      alt={employee.superieurHierarchique}
                    />
                    <AvatarFallback className="text-[8px] bg-muted/30">
                      {employee.superieurHierarchique
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  {employee.superieurHierarchique}
                </div>
              )}
            </div>
          </div>

          <EditableInfoRow
            label="Grade"
            value={proEdit.isEditing ? proEdit.formData.grade : employee.grade}
            fieldKey="grade"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
            options={GRADE_OPTIONS}
          />
          <EditableInfoRow
            label="Type de contrat"
            value={
              proEdit.isEditing
                ? proEdit.formData.typeContrat
                : employee.typeContrat
            }
            fieldKey="typeContrat"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
            options={TYPE_CONTRAT_OPTIONS}
          />
          <EditableInfoRow
            label="Période d'essai"
            value={
              proEdit.isEditing
                ? proEdit.formData.periodeEssai
                : employee.periodeEssai
            }
            fieldKey="periodeEssai"
            isEditing={proEdit.isEditing}
            onChange={proEdit.updateField}
          />
        </div>
      </CardContent>
    </Card>
  )
}
