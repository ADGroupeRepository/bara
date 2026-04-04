"use client"

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
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel } from "@/components/ui/field"

import type { StepFormProps } from "../schema"

type StepNotesProps = StepFormProps

export function StepNotes({
  register,
  watch,
  setValue,
  handleSelectChange,
}: StepNotesProps) {
  return (
    <div className="space-y-8">
      {/* ── Notes Internes ────────────────────────────────────────────────── */}
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

      {/* ── Santé & Aptitude ──────────────────────────────────────────────── */}
      <Card>
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
              onValueChange={(v) => handleSelectChange("aptitudeMedicale", v)}
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
  )
}
