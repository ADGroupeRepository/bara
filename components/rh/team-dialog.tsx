"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"

const MANAGERS = [
  "Siaka Sylla",
  "Jean Dupont",
  "Fatou Bamba",
  "Amadou Diallo",
  "Paul Konan",
]

const LOCATIONS = [
  "Abidjan - Plateau",
  "Abidjan - Cocody",
  "Yamoussoukro",
  "Bouaké",
  "San Pedro",
  "Télétravail",
]

export function TeamDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 shadow-none">
          <Plus className="size-4" />
          Nouvelle Équipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle Équipe</DialogTitle>
          <DialogDescription>
            Créez une nouvelle unité organisationnelle ou équipe projet.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <Field>
            <FieldLabel htmlFor="name">Nom de l&apos;équipe</FieldLabel>
            <FieldContent>
              <Input
                id="name"
                placeholder="Ex: Équipe Développement Frontend"
                required
                className="h-10"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="manager">Responsable / Manager</FieldLabel>
            <FieldContent>
              <Select required>
                <SelectTrigger id="manager" className="h-10 w-full text-left">
                  <SelectValue placeholder="Sélectionner un responsable..." />
                </SelectTrigger>
                <SelectContent>
                  {MANAGERS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="location">Localisation</FieldLabel>
            <FieldContent>
              <Select required>
                <SelectTrigger id="location" className="h-10 w-full text-left">
                  <SelectValue placeholder="Sélectionner un lieu..." />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <FieldContent>
              <Textarea
                id="description"
                placeholder="Objectifs et missions de l'équipe..."
                className="min-h-[80px] resize-none"
              />
            </FieldContent>
          </Field>

          <DialogFooter className="mt-8 gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              type="button"
              className="h-10"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" className="h-10" disabled={loading}>
              {loading ? "Création en cours..." : "Créer l'équipe"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
