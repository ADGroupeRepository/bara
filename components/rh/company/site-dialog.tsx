"use client"

import { useState } from "react"
import { Plus, MapPin } from "lucide-react"

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
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"

const SITE_TYPES = [
  "Siège social",
  "Agence commerciale",
  "Bureau administratif",
  "Entrepôt / Logistique",
  "Usine de production",
  "Point de vente",
]

export function SiteDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 gap-2">
          <Plus className="size-4" />
          Nouveau Site
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>Nouveau Site</DialogTitle>
              <DialogDescription>
                Ajoutez un nouvel établissement à votre organisation.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <Field>
            <FieldLabel htmlFor="name">Nom du site</FieldLabel>
            <FieldContent>
              <Input
                id="name"
                placeholder="Ex: Agence Plateau"
                required
                className="h-10"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="type">Type d&apos;établissement</FieldLabel>
            <FieldContent>
              <Select required>
                <SelectTrigger id="type" className="h-10 w-full text-left font-normal border-slate-200">
                  <SelectValue placeholder="Sélectionner un type..." />
                </SelectTrigger>
                <SelectContent className="z-100">
                  {SITE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="address">Adresse complète</FieldLabel>
            <FieldContent>
              <Input
                id="address"
                placeholder="Rue, Immeuble, Ville..."
                required
                className="h-10"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="manager">Responsable du site</FieldLabel>
            <FieldContent>
              <Input
                id="manager"
                placeholder="Nom du responsable"
                className="h-10"
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
              {loading ? "Création..." : "Créer le site"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
