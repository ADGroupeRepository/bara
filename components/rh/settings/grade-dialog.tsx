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
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"

export function GradeDialog() {
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
          Nouveau Grade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouveau Grade</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau grade pour classifier l&apos;expérience de vos collaborateurs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <Field>
            <FieldLabel htmlFor="name">
              Nom du Grade
            </FieldLabel>
            <FieldContent>
              <Input
                id="name"
                placeholder="Ex: Senior"
                required
                className="h-10"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="level">Niveau (Optionnel)</FieldLabel>
            <FieldContent>
              <Input
                id="level"
                type="number"
                placeholder="Ex: 5"
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
              {loading ? "Création en cours..." : "Créer le grade"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
