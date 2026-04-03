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
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"

export function CategoryDialog() {
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
        <Button size="sm" className="h-9 gap-2">
          <Plus className="size-4" />
          Nouvelle Catégorie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle Catégorie</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle catégorie pour classifier vos types de collaborateurs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <Field>
            <FieldLabel htmlFor="name">
              Nom de la Catégorie
            </FieldLabel>
            <FieldContent>
              <Input
                id="name"
                placeholder="Ex: Consultant"
                required
                className="h-10"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description (Optionnelle)</FieldLabel>
            <FieldContent>
              <Textarea
                id="description"
                placeholder="Description du rôle ou de la catégorie..."
                className="min-h-[100px] resize-none"
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
              {loading ? "Création en cours..." : "Créer la catégorie"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
