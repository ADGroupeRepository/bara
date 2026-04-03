"use client"

import { Input } from "@/components/ui/input"
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
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel } from "@/components/ui/field"

import type { StepFormProps, DocumentSlot } from "../schema"
import { FileUploadZone } from "../file-upload-zone"
import { TagInput } from "../tag-input"

type StepDocumentsProps = StepFormProps & {
  // Tags
  competences: string[]
  setCompetences: (tags: string[]) => void
  languesTags: string[]
  setLanguesTags: (tags: string[]) => void
  certificationsTags: string[]
  setCertificationsTags: (tags: string[]) => void
  // Documents
  documents: DocumentSlot[]
  handleFileSelect: (docId: string, file: File) => void
  handleFileRemove: (docId: string) => void
}

export function StepDocuments({
  register,
  watch,
  handleSelectChange,
  competences,
  setCompetences,
  languesTags,
  setLanguesTags,
  certificationsTags,
  setCertificationsTags,
  documents,
  handleFileSelect,
  handleFileRemove,
}: StepDocumentsProps) {
  return (
    <div className="space-y-8">
      {/* ── Pièces d'identité ─────────────────────────────────────────────── */}
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

      {/* ── Documents à joindre ───────────────────────────────────────────── */}
      <Card className="bg-muted ring-0">
        <CardHeader>
          <CardTitle>Documents à joindre</CardTitle>
          <CardDescription>
            Téléchargez les documents obligatoires du dossier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {documents.map((doc) => (
              <FileUploadZone
                key={doc.id}
                document={doc}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Parcours Académique ───────────────────────────────────────────── */}
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
              onValueChange={(v) => handleSelectChange("niveauEtudes", v)}
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

      {/* ── Compétences & Langues ─────────────────────────────────────────── */}
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
  )
}
