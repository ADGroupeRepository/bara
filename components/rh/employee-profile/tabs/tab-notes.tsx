"use client"

import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/layout/sidebar/icons"
import { Pencil } from "lucide-react"

import type {
  EmployeeProfile,
  ParcoursAcademique,
  ExperienceProfessionnelle,
} from "../mock-data"
import { EditableInfoRow } from "../editable-info-row"
import { EditableCardHeader } from "../editable-card-header"
import { useCardEditing } from "../use-card-editing"

type TabNotesProps = {
  readonly employee: EmployeeProfile
}

const APTITUDE_OPTIONS = [
  { value: "Apte", label: "Apte" },
  { value: "Inapte", label: "Inapte" },
  { value: "Apte avec réserves", label: "Apte avec réserves" },
]

const DOC_TYPE_OPTIONS = [
  { value: "CNI (Carte Nationale d'Identité)", label: "CNI" },
  { value: "Passeport", label: "Passeport" },
  { value: "Permis de conduire", label: "Permis de conduire" },
  { value: "Titre de séjour", label: "Titre de séjour" },
]

const STATUT_DIPLOME_OPTIONS = [
  { value: "Obtenu", label: "Obtenu" },
  { value: "En cours", label: "En cours" },
  { value: "Abandonné", label: "Abandonné" },
]

export function TabNotes({ employee }: TabNotesProps) {
  const identityDoc = employee.documents.find((d) => d.id === "id-doc")

  // Identity documents editing
  const identityEdit = useCardEditing({
    typeDocumentIdentite: employee.typeDocumentIdentite,
    numeroCni: employee.numeroCni,
    dateExpirationCni: employee.dateExpirationCni,
    numeroSecuriteSociale: employee.numeroSecuriteSociale,
  })

  // Health editing
  const healthEdit = useCardEditing({
    aptitudeMedicale: employee.aptitudeMedicale,
    handicapDeclare: employee.handicapDeclare,
  })

  // Notes editing
  const notesEdit = useCardEditing({
    notesInternes: employee.notesInternes,
  })

  // Academic state
  const [editableAcademic, setEditableAcademic] = useState<
    ParcoursAcademique[]
  >(() =>
    employee.parcoursAcademique
      ? structuredClone(employee.parcoursAcademique)
      : []
  )
  const [academicDialogOpen, setAcademicDialogOpen] = useState(false)
  const [academicDialogMode, setAcademicDialogMode] = useState<"add" | "edit">("add")
  const [academicEditIndex, setAcademicEditIndex] = useState<number | null>(null)
  const [academicFormData, setAcademicFormData] = useState<ParcoursAcademique>({
    id: "",
    diplome: "",
    etablissement: "",
    domaine: "",
    dateDebut: "",
    dateFin: "",
    statut: "En cours",
  })

  // Experience state
  const [editableExp, setEditableExp] = useState<ExperienceProfessionnelle[]>(
    () =>
      employee.experiencesProfessionnelles
        ? structuredClone(employee.experiencesProfessionnelles)
        : []
  )
  const [expDialogOpen, setExpDialogOpen] = useState(false)
  const [expDialogMode, setExpDialogMode] = useState<"add" | "edit">("add")
  const [expEditIndex, setExpEditIndex] = useState<number | null>(null)
  const [expFormData, setExpFormData] = useState<ExperienceProfessionnelle>({
    id: "",
    poste: "",
    employeur: "",
    lieu: "",
    dateDebut: "",
    dateFin: "",
    description: "",
  })

  // Academic dialog helpers
  const openAcademicAdd = () => {
    setAcademicDialogMode("add")
    setAcademicEditIndex(null)
    setAcademicFormData({
      id: Math.random().toString(36).substring(2, 9),
      diplome: "",
      etablissement: "",
      domaine: "",
      dateDebut: "",
      dateFin: "",
      statut: "En cours",
    })
    setAcademicDialogOpen(true)
  }

  const openAcademicEdit = (index: number) => {
    setAcademicDialogMode("edit")
    setAcademicEditIndex(index)
    setAcademicFormData(structuredClone(editableAcademic[index]))
    setAcademicDialogOpen(true)
  }

  const saveAcademicDialog = () => {
    if (academicDialogMode === "add") {
      setEditableAcademic((prev) => [...prev, academicFormData])
    } else if (academicEditIndex !== null) {
      setEditableAcademic((prev) => {
        const updated = [...prev]
        updated[academicEditIndex] = academicFormData
        return updated
      })
    }
    setAcademicDialogOpen(false)
  }

  const deleteAcademic = (index: number) => {
    setEditableAcademic((prev) => prev.filter((_, i) => i !== index))
  }

  // Experience dialog helpers
  const openExpAdd = () => {
    setExpDialogMode("add")
    setExpEditIndex(null)
    setExpFormData({
      id: Math.random().toString(36).substring(2, 9),
      poste: "",
      employeur: "",
      lieu: "",
      dateDebut: "",
      dateFin: "",
      description: "",
    })
    setExpDialogOpen(true)
  }

  const openExpEdit = (index: number) => {
    setExpDialogMode("edit")
    setExpEditIndex(index)
    setExpFormData(structuredClone(editableExp[index]))
    setExpDialogOpen(true)
  }

  const saveExpDialog = () => {
    if (expDialogMode === "add") {
      setEditableExp((prev) => [...prev, expFormData])
    } else if (expEditIndex !== null) {
      setEditableExp((prev) => {
        const updated = [...prev]
        updated[expEditIndex] = expFormData
        return updated
      })
    }
    setExpDialogOpen(false)
  }

  const deleteExp = (index: number) => {
    setEditableExp((prev) => prev.filter((_, i) => i !== index))
  }

  // Skills editing
  const [skillsEditing, setSkillsEditing] = useState(false)
  const [editableCompetences, setEditableCompetences] = useState<string[]>(
    () => [...(employee.competences || [])]
  )
  const [editableLangues, setEditableLangues] = useState<string[]>(() => [
    ...(employee.langues || []),
  ])
  const [editableCertifications, setEditableCertifications] = useState<
    string[]
  >(() => [...(employee.certifications || [])])

  return (
    <div className="space-y-6 pb-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Documents d'Identité */}
        <Card className="border-border bg-card shadow-none">
          <EditableCardHeader
            title="Documents d'Identité"
            description="Pièces officielles et numéros fiscaux"
            isEditing={identityEdit.isEditing}
            onEdit={identityEdit.startEditing}
            onCancel={identityEdit.cancelEditing}
            onSave={() => identityEdit.saveEditing()}
          >
            {!identityEdit.isEditing && identityDoc && (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    Voir la pièce
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-full" hideHandle>
                  <div className="flex h-full w-full flex-col">
                    <DrawerHeader className="mt-2 flex flex-row items-center justify-between border-b border-border px-6 py-4">
                      <DrawerTitle className="text-xl font-semibold text-foreground">
                        {identityDoc.label}
                      </DrawerTitle>
                      <DrawerClose asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <span className="text-xs font-bold uppercase transition-colors hover:text-foreground">
                            Fermer
                          </span>
                        </Button>
                      </DrawerClose>
                    </DrawerHeader>
                    <div className="flex-1 overflow-hidden bg-muted/20 px-4 pb-4">
                      <iframe
                        src="/Courrier.pdf"
                        className="h-full w-full rounded-md border border-border bg-background"
                        title={`Document: ${identityDoc.label}`}
                      />
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </EditableCardHeader>
          <CardContent>
            <div className="space-y-4">
              <EditableInfoRow
                label="Type de document"
                value={
                  identityEdit.isEditing
                    ? identityEdit.formData.typeDocumentIdentite
                    : employee.typeDocumentIdentite
                }
                fieldKey="typeDocumentIdentite"
                isEditing={identityEdit.isEditing}
                onChange={identityEdit.updateField}
                options={DOC_TYPE_OPTIONS}
              />
              <EditableInfoRow
                label="Numéro CNI"
                value={
                  identityEdit.isEditing
                    ? identityEdit.formData.numeroCni
                    : employee.numeroCni
                }
                fieldKey="numeroCni"
                isEditing={identityEdit.isEditing}
                onChange={identityEdit.updateField}
              />
              <EditableInfoRow
                label="Date d'expiration"
                value={
                  identityEdit.isEditing
                    ? identityEdit.formData.dateExpirationCni
                    : employee.dateExpirationCni
                }
                fieldKey="dateExpirationCni"
                isEditing={identityEdit.isEditing}
                onChange={identityEdit.updateField}
              />
              <EditableInfoRow
                label="Sécurité Sociale"
                value={
                  identityEdit.isEditing
                    ? identityEdit.formData.numeroSecuriteSociale
                    : employee.numeroSecuriteSociale
                }
                fieldKey="numeroSecuriteSociale"
                isEditing={identityEdit.isEditing}
                onChange={identityEdit.updateField}
              />
            </div>
          </CardContent>
        </Card>

        {/* Santé & Aptitude */}
        <Card className="border-border bg-card shadow-none">
          <EditableCardHeader
            title="Santé & Aptitude"
            description="Aptitude médicale et situation de handicap"
            isEditing={healthEdit.isEditing}
            onEdit={healthEdit.startEditing}
            onCancel={healthEdit.cancelEditing}
            onSave={() => healthEdit.saveEditing()}
          />
          <CardContent>
            <div className="space-y-4">
              <EditableInfoRow
                label="Aptitude médicale"
                value={
                  healthEdit.isEditing
                    ? healthEdit.formData.aptitudeMedicale
                    : employee.aptitudeMedicale
                }
                fieldKey="aptitudeMedicale"
                isEditing={healthEdit.isEditing}
                onChange={healthEdit.updateField}
                options={APTITUDE_OPTIONS}
              />

              <div className="flex flex-col gap-1.5">
                <p className="text-xs">Handicap déclaré</p>
                <div
                  className={cn(
                    "flex items-center justify-between rounded-md border border-border/40 bg-background p-2.5",
                    !healthEdit.isEditing && "border-border/20"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">
                      Reconnu par l&apos;état
                    </span>
                  </div>
                  {healthEdit.isEditing ? (
                    <Switch
                      checked={healthEdit.formData.handicapDeclare as boolean}
                      onCheckedChange={(v) =>
                        healthEdit.updateField("handicapDeclare", v)
                      }
                    />
                  ) : (
                    <Badge
                      variant={employee.handicapDeclare ? "default" : "outline"}
                      className="border-border text-[10px]"
                    >
                      {employee.handicapDeclare ? "Oui" : "Non"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Internes */}
        <Card className="border-border bg-card shadow-none lg:col-span-2">
          <EditableCardHeader
            title="Notes Internes"
            description="Observations et commentaires RH"
            isEditing={notesEdit.isEditing}
            onEdit={notesEdit.startEditing}
            onCancel={notesEdit.cancelEditing}
            onSave={() => notesEdit.saveEditing()}
          />
          <CardContent>
            <div className="relative w-full">
              <textarea
                value={
                  notesEdit.isEditing
                    ? notesEdit.formData.notesInternes
                    : employee.notesInternes
                }
                onChange={(e) =>
                  notesEdit.updateField("notesInternes", e.target.value)
                }
                disabled={!notesEdit.isEditing}
                rows={4}
                className={cn(
                  "w-full min-w-0 rounded-lg border border-border/40 bg-background p-4 text-sm leading-relaxed outline-none focus-visible:border-primary focus-visible:ring-0",
                  !notesEdit.isEditing &&
                    "cursor-default border-border/20 bg-background font-medium opacity-100"
                )}
                placeholder="Ajouter des notes internes..."
              />
              {!notesEdit.isEditing && (
                <div className="absolute inset-0 z-10 cursor-default" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Parcours Académique */}
        <Card className="border-border bg-card shadow-none lg:col-span-2">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground">Parcours Académique</h3>
                <p className="text-sm text-muted-foreground">Historique des formations et diplômes obtenus</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="hidden shrink-0 bg-muted text-muted-foreground sm:inline-flex"
                >
                  Niveau actuel : {employee.niveauEtudes}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openAcademicAdd}
                  className="text-xs font-semibold"
                >
                  Ajouter
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-md border border-border bg-background">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[30%] font-semibold text-foreground">
                      Diplôme / Formation
                    </TableHead>
                    <TableHead className="w-[25%] font-semibold text-foreground">
                      Établissement
                    </TableHead>
                    <TableHead className="w-[20%] font-semibold text-foreground">
                      Période
                    </TableHead>
                    <TableHead className="w-[15%] font-semibold text-foreground">
                      Statut
                    </TableHead>
                    <TableHead className="w-[10%] pr-4 text-right font-semibold text-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editableAcademic.length > 0 ? (
                    editableAcademic.map((parcours, index) => (
                      <TableRow
                        key={parcours.id}
                        className="border-border cursor-pointer transition-colors hover:bg-muted/30"
                        onClick={() => openAcademicEdit(index)}
                      >
                        <TableCell>
                          <div className="text-sm font-medium text-foreground">
                            {parcours.diplome}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {parcours.domaine}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-foreground">
                            {parcours.etablissement}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm whitespace-nowrap text-muted-foreground">
                            {parcours.dateDebut} - {parcours.dateFin}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              parcours.statut === "Obtenu"
                                ? "secondary"
                                : "outline"
                            }
                            className={
                              parcours.statut === "Obtenu"
                                ? "border-none bg-emerald-50 text-emerald-600"
                                : "border-border text-muted-foreground"
                            }
                          >
                            {parcours.statut}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            {parcours.documentUrl && (
                              <Drawer>
                                <DrawerTrigger asChild>
                                  <Button variant="secondary" size="icon">
                                    <Icons.Eye className="size-4" />
                                  </Button>
                                </DrawerTrigger>
                                <DrawerContent className="h-full" hideHandle>
                                  <div className="flex h-full w-full flex-col">
                                    <DrawerHeader className="mt-2 flex flex-row items-center justify-between border-b border-border px-6 py-4">
                                      <DrawerTitle className="text-xl font-semibold text-foreground">
                                        Diplôme : {parcours.diplome}
                                      </DrawerTitle>
                                      <DrawerClose asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                        >
                                          <span className="text-xs font-bold uppercase transition-colors hover:text-foreground">
                                            Fermer
                                          </span>
                                        </Button>
                                      </DrawerClose>
                                    </DrawerHeader>
                                    <div className="flex-1 overflow-hidden bg-muted/20 px-4 pb-4">
                                      <iframe
                                        src={parcours.documentUrl}
                                        className="h-full w-full rounded-md border border-border bg-background"
                                        title={`Diplôme: ${parcours.diplome}`}
                                      />
                                    </div>
                                  </div>
                                </DrawerContent>
                              </Drawer>
                            )}
                            <Button
                              variant="secondary"
                              size="icon"
                              onClick={() => openAcademicEdit(index)}
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => deleteAcademic(index)}
                            >
                              <Icons.Trash className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-muted-foreground italic"
                      >
                        Aucun parcours académique enregistré.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Dialog Parcours Académique */}
        <Dialog open={academicDialogOpen} onOpenChange={setAcademicDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {academicDialogMode === "add" ? "Ajouter un diplôme" : "Modifier le diplôme"}
              </DialogTitle>
              <DialogDescription>
                {academicDialogMode === "add"
                  ? "Renseignez les informations du nouveau diplôme."
                  : "Modifiez les informations du diplôme sélectionné."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Diplôme / Formation</Label>
                <Input
                  value={academicFormData.diplome}
                  onChange={(e) =>
                    setAcademicFormData((prev) => ({ ...prev, diplome: e.target.value }))
                  }
                  placeholder="Ex: Master en Management"
                  className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Domaine</Label>
                <Input
                  value={academicFormData.domaine}
                  onChange={(e) =>
                    setAcademicFormData((prev) => ({ ...prev, domaine: e.target.value }))
                  }
                  placeholder="Ex: Management"
                  className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Établissement</Label>
                <Input
                  value={academicFormData.etablissement}
                  onChange={(e) =>
                    setAcademicFormData((prev) => ({ ...prev, etablissement: e.target.value }))
                  }
                  placeholder="Ex: CESAG - Dakar"
                  className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Année de début</Label>
                  <Input
                    value={academicFormData.dateDebut}
                    onChange={(e) =>
                      setAcademicFormData((prev) => ({ ...prev, dateDebut: e.target.value }))
                    }
                    placeholder="Ex: 2008"
                    className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Année de fin</Label>
                  <Input
                    value={academicFormData.dateFin}
                    onChange={(e) =>
                      setAcademicFormData((prev) => ({ ...prev, dateFin: e.target.value }))
                    }
                    placeholder="Ex: 2010"
                    className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Statut</Label>
                <Select
                  value={academicFormData.statut}
                  onValueChange={(v) =>
                    setAcademicFormData((prev) => ({
                      ...prev,
                      statut: v as ParcoursAcademique["statut"],
                    }))
                  }
                >
                  <SelectTrigger className="h-9 border-border bg-background text-sm shadow-none focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUT_DIPLOME_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAcademicDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button onClick={saveAcademicDialog}>
                {academicDialogMode === "add" ? "Ajouter" : "Enregistrer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Expériences Professionnelles */}
        <Card className="border-border bg-card shadow-none lg:col-span-2">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground">Expériences Professionnelles</h3>
                <p className="text-sm text-muted-foreground">Historique du parcours professionnel</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={openExpAdd}
                className="text-xs font-semibold"
              >
                Ajouter
              </Button>
            </div>
            <div className="overflow-hidden rounded-md border border-border bg-background">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[35%] font-semibold text-foreground">
                      Poste / Rôle
                    </TableHead>
                    <TableHead className="w-[35%] font-semibold text-foreground">
                      Employeur
                    </TableHead>
                    <TableHead className="w-[20%] font-semibold text-foreground">
                      Période
                    </TableHead>
                    <TableHead className="w-[10%] pr-4 text-right font-semibold text-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editableExp.length > 0 ? (
                    editableExp.map((exp, index) => (
                      <TableRow
                        key={exp.id}
                        className="border-border cursor-pointer transition-colors hover:bg-muted/30"
                        onClick={() => openExpEdit(index)}
                      >
                        <TableCell className="align-top">
                          <div className="text-sm font-medium text-foreground">
                            {exp.poste}
                          </div>
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="text-sm text-foreground">
                            {exp.employeur}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {exp.lieu}
                          </div>
                        </TableCell>
                        <TableCell className="align-top">
                          <span className="text-sm whitespace-nowrap text-muted-foreground">
                            {exp.dateDebut} - {exp.dateFin}
                          </span>
                        </TableCell>
                        <TableCell className="pr-4 text-right align-top" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="secondary"
                              size="icon"
                              onClick={() => openExpEdit(index)}
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => deleteExp(index)}
                            >
                              <Icons.Trash className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="h-24 text-center text-muted-foreground italic"
                      >
                        Aucune expérience professionnelle enregistrée.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Dialog Expériences Professionnelles */}
        <Dialog open={expDialogOpen} onOpenChange={setExpDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {expDialogMode === "add" ? "Ajouter une expérience" : "Modifier l'expérience"}
              </DialogTitle>
              <DialogDescription>
                {expDialogMode === "add"
                  ? "Renseignez les informations de la nouvelle expérience."
                  : "Modifiez les informations de l'expérience sélectionnée."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Poste / Rôle</Label>
                <Input
                  value={expFormData.poste}
                  onChange={(e) =>
                    setExpFormData((prev) => ({ ...prev, poste: e.target.value }))
                  }
                  placeholder="Ex: Directeur Général"
                  className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Employeur</Label>
                  <Input
                    value={expFormData.employeur}
                    onChange={(e) =>
                      setExpFormData((prev) => ({ ...prev, employeur: e.target.value }))
                    }
                    placeholder="Ex: CNF"
                    className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Lieu</Label>
                  <Input
                    value={expFormData.lieu}
                    onChange={(e) =>
                      setExpFormData((prev) => ({ ...prev, lieu: e.target.value }))
                    }
                    placeholder="Ex: Abidjan, CI"
                    className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Date de début</Label>
                  <Input
                    value={expFormData.dateDebut}
                    onChange={(e) =>
                      setExpFormData((prev) => ({ ...prev, dateDebut: e.target.value }))
                    }
                    placeholder="Ex: Jan 2020"
                    className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Date de fin</Label>
                  <Input
                    value={expFormData.dateFin}
                    onChange={(e) =>
                      setExpFormData((prev) => ({ ...prev, dateFin: e.target.value }))
                    }
                    placeholder="Ex: Présent"
                    className="h-9 border-border bg-background text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Description des missions</Label>
                <textarea
                  value={expFormData.description}
                  onChange={(e) =>
                    setExpFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  rows={3}
                  placeholder="Décrivez les missions et responsabilités..."
                  className="w-full min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-primary focus-visible:ring-0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setExpDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button onClick={saveExpDialog}>
                {expDialogMode === "add" ? "Ajouter" : "Enregistrer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Aptitudes & Certifications */}
        <Card className="border-border bg-card shadow-none lg:col-span-2">
          <EditableCardHeader
            title="Aptitudes & Certifications"
            description="Compétences clés, langues parlées et certifications professionnelles"
            isEditing={skillsEditing}
            onEdit={() => {
              setEditableCompetences([...employee.competences])
              setEditableLangues([...employee.langues])
              setEditableCertifications([...employee.certifications])
              setSkillsEditing(true)
            }}
            onCancel={() => {
              setEditableCompetences([...employee.competences])
              setEditableLangues([...employee.langues])
              setEditableCertifications([...employee.certifications])
              setSkillsEditing(false)
            }}
            onSave={() => setSkillsEditing(false)}
          />
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Compétences */}
              <TagSection
                label="Compétences"
                tags={
                  skillsEditing ? editableCompetences : employee.competences
                }
                isEditing={skillsEditing}
                onRemove={(index) =>
                  setEditableCompetences((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onAdd={(tag) =>
                  setEditableCompetences((prev) => [...prev, tag])
                }
              />

              {/* Langues */}
              <TagSection
                label="Langues parlées"
                tags={skillsEditing ? editableLangues : employee.langues}
                isEditing={skillsEditing}
                variant="outline"
                onRemove={(index) =>
                  setEditableLangues((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onAdd={(tag) => setEditableLangues((prev) => [...prev, tag])}
              />

              {/* Certifications */}
              <TagSection
                label="Certifications"
                tags={
                  skillsEditing
                    ? editableCertifications
                    : employee.certifications
                }
                isEditing={skillsEditing}
                onRemove={(index) =>
                  setEditableCertifications((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onAdd={(tag) => setEditableCertifications((prev) => [...prev, tag])}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Reusable tag section component
function TagSection({
  label,
  tags,
  isEditing,
  variant = "secondary",
  onRemove,
  onAdd,
}: {
  readonly label: string
  readonly tags: string[]
  readonly isEditing: boolean
  readonly variant?: "secondary" | "outline"
  readonly onRemove: (index: number) => void
  readonly onAdd: (tag: string) => void
}) {
  const [newTag, setNewTag] = useState("")

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((c, index) => (
            <Badge
              key={`${c}-${index}`}
              variant={variant}
              className={
                variant === "outline"
                  ? "border-border bg-muted/20 text-muted-foreground"
                  : "border-none bg-muted text-muted-foreground"
              }
            >
              {c}
              {isEditing && (
                <button
                  onClick={() => onRemove(index)}
                  className="ml-1 rounded-sm px-1 text-[8px] font-bold uppercase hover:bg-destructive/10 hover:text-destructive"
                >
                  Supprimer
                </button>
              )}
            </Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground italic">
            Non renseigné
          </span>
        )}
      </div>
      {isEditing && (
        <div className="flex items-center gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTag.trim()) {
                e.preventDefault()
                onAdd(newTag.trim())
                setNewTag("")
              }
            }}
            placeholder={`Ajouter...`}
            className="h-7 w-36 border-border/60 bg-background text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
          />
          <Button
            variant="ghost"
            className="h-7 px-2 text-[10px] font-bold uppercase transition-all hover:text-primary"
            onClick={() => {
              if (newTag.trim()) {
                onAdd(newTag.trim())
                setNewTag("")
              }
            }}
          >
            Ajouter
          </Button>
        </div>
      )}
    </div>
  )
}
