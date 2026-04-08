"use client"

import { useState, useMemo } from "react"
import { Save, Check, Plus, Trash2, AlertCircle, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import type { EmployeeProfile } from "../mock-data"

type Slot = {
  id: string
  start: string
  end: string
  location: string
}

type DaySchedule = {
  active: boolean
  slots: Slot[]
}

type ScheduleTemplate = {
  id: string
  label: string
  schedule: Record<string, DaySchedule>
}

const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
]

const TIMEZONES = [
  { value: "Africa/Abidjan", label: "(GMT+00:00) Abidjan" },
  { value: "Africa/Dakar", label: "(GMT+00:00) Dakar" },
  { value: "Europe/Paris", label: "(GMT+01:00) Paris" },
  { value: "Europe/London", label: "(GMT+00:00) Londres" },
  { value: "America/New_York", label: "(GMT-05:00) New York" },
  { value: "Asia/Dubai", label: "(GMT+04:00) Dubaï" },
]

const SCHEDULE_TEMPLATES: ScheduleTemplate[] = [
  {
    id: "standard",
    label: "Semaine standard (08h00 - 17h00)",
    schedule: {
      Lundi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "12:00", location: "Siège Social" },
          { id: "s2", start: "13:00", end: "17:00", location: "Siège Social" },
        ],
      },
      Mardi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "12:00", location: "Siège Social" },
          { id: "s2", start: "13:00", end: "17:00", location: "Siège Social" },
        ],
      },
      Mercredi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "12:00", location: "Siège Social" },
          { id: "s2", start: "13:00", end: "17:00", location: "Siège Social" },
        ],
      },
      Jeudi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "12:00", location: "Siège Social" },
          { id: "s2", start: "13:00", end: "17:00", location: "Siège Social" },
        ],
      },
      Vendredi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "12:00", location: "Siège Social" },
          { id: "s2", start: "13:00", end: "17:00", location: "Siège Social" },
        ],
      },
      Samedi: { active: false, slots: [] },
      Dimanche: { active: false, slots: [] },
    },
  },
  {
    id: "continuous",
    label: "Service continu (08h00 - 16h00)",
    schedule: {
      Lundi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "16:00", location: "Siège Social" },
        ],
      },
      Mardi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "16:00", location: "Siège Social" },
        ],
      },
      Mercredi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "16:00", location: "Siège Social" },
        ],
      },
      Jeudi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "16:00", location: "Siège Social" },
        ],
      },
      Vendredi: {
        active: true,
        slots: [
          { id: "s1", start: "08:00", end: "16:00", location: "Siège Social" },
        ],
      },
      Samedi: { active: false, slots: [] },
      Dimanche: { active: false, slots: [] },
    },
  },
]

const toMinutes = (time: string) => {
  if (!time) return 0
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

const formatDuration = (totalMinutes: number) => {
  if (totalMinutes <= 0) return "0h"
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

type TabScheduleProps = {
  readonly employee: EmployeeProfile
}

// Vérifie si deux créneaux se chevauchent
const checkOverlap = (slots: Slot[]) => {
  const sorted = [...slots]
    .filter((s) => s.start && s.end)
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start))

  for (let i = 0; i < sorted.length - 1; i++) {
    if (toMinutes(sorted[i].end) > toMinutes(sorted[i + 1].start)) {
      return true
    }
  }
  return false
}

export function TabSchedule({ employee }: TabScheduleProps) {
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(
    structuredClone(SCHEDULE_TEMPLATES[0].schedule)
  )
  const [selectedTemplate, setSelectedTemplate] = useState<string>("standard")
  const [timezone, setTimezone] = useState("Africa/Abidjan")
  const [isSaved, setIsSaved] = useState(false)

  const handleToggle = (day: string) => {
    setSchedule((prev) => {
      const dayShed = prev[day]
      const newActive = !dayShed.active
      // Si on active un jour vide, on lui met un créneau par défaut
      const newSlots =
        newActive && dayShed.slots.length === 0
          ? [
              {
                id: Math.random().toString(36).substring(2, 9),
                start: "08:00",
                end: "17:00",
                location: "Siège Social",
              },
            ]
          : dayShed.slots

      return {
        ...prev,
        [day]: { ...dayShed, active: newActive, slots: newSlots },
      }
    })
    setSelectedTemplate("custom")
  }

  const addSlot = (day: string) => {
    const newId = Math.random().toString(36).substring(2, 9)
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [
          ...prev[day].slots,
          { id: newId, start: "12:00", end: "13:00", location: "Siège Social" },
        ],
      },
    }))
    setSelectedTemplate("custom")
  }

  const removeSlot = (day: string, slotId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((s) => s.id !== slotId),
      },
    }))
    setSelectedTemplate("custom")
  }

  const updateSlot = (
    day: string,
    slotId: string,
    field: keyof Slot,
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((s) =>
          s.id === slotId ? { ...s, [field]: value } : s
        ),
      },
    }))
    setSelectedTemplate("custom")
  }

  const onTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    if (templateId === "custom") return

    const template = SCHEDULE_TEMPLATES.find((t) => t.id === templateId)
    if (template) {
      setSchedule(structuredClone(template.schedule))
    }
  }

  const calculateDayDuration = (dayShed: DaySchedule) => {
    if (!dayShed.active) return 0
    return dayShed.slots.reduce((sum, s) => {
      const dur = toMinutes(s.end) - toMinutes(s.start)
      return sum + Math.max(0, dur)
    }, 0)
  }

  const weekTotal = useMemo(() => {
    return Object.values(schedule).reduce(
      (sum, day) => sum + calculateDayDuration(day),
      0
    )
  }, [schedule])

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      {/* En-tête principal */}
      <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Emploi du temps
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Planifiez les créneaux de travail de {employee.prenom}{" "}
            {employee.nom}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleSave}
            className={cn(
              "px-4 transition-all",
              isSaved ? "bg-green-600 text-white hover:bg-green-700" : ""
            )}
          >
            {isSaved ? (
              <>
                <Check className="h-4 w-4" /> Enregistré
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Enregistrer
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Paramètres globaux (Fuseau + Modèle) */}
      <div className="grid grid-cols-1 gap-6 rounded-xl bg-muted p-6 sm:grid-cols-2">
        <div className="space-y-2.5">
          <Label>Fuseau horaire</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="h-10 border-border/80 bg-background transition-colors hover:bg-accent/50 focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2.5">
          <Label>Modèle de planning</Label>
          <Select value={selectedTemplate} onValueChange={onTemplateChange}>
            <SelectTrigger className="h-10 border-border/80 bg-background transition-colors hover:bg-accent/50 focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-[11px] font-medium text-muted-foreground">
                  Prédéfinis
                </SelectLabel>
                {SCHEDULE_TEMPLATES.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-[11px] font-medium text-muted-foreground">
                  Options
                </SelectLabel>
                <SelectItem value="custom">
                  Configuration personnalisée
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Détail de la semaine */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-medium text-foreground">Détail de la semaine</h3>
          <div className="flex items-center gap-3 rounded-full bg-muted px-4 py-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Volume hebdomadaire :
              </span>
              <span className="text-lg font-bold tracking-tight text-primary tabular-nums">
                {formatDuration(weekTotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {DAYS.map((day) => {
            const dayShed = schedule[day]
            const dayTotal = calculateDayDuration(dayShed)
            const isOverlap = checkOverlap(dayShed.slots)

            return (
              <div
                key={day}
                className={cn(
                  "flex flex-col gap-4 rounded-lg border p-4 transition-all duration-200",
                  dayShed.active
                    ? cn(
                        "border-border bg-card",
                        isOverlap &&
                          "border-destructive/40 ring-1 ring-destructive/20"
                      )
                    : "border-transparent bg-muted/40 opacity-70"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={dayShed.active}
                      onCheckedChange={() => handleToggle(day)}
                    />
                    <span className="text-sm font-semibold">{day}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {isOverlap && (
                      <div className="flex animate-pulse items-center gap-1.5 text-[10px] font-medium text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        Chevauchement détecté
                      </div>
                    )}
                    <div
                      className={cn(
                        "group flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-bold tabular-nums transition-colors",
                        dayTotal > 0
                          ? "bg-muted text-primary"
                          : "border border-transparent bg-muted text-muted-foreground"
                      )}
                    >
                      {formatDuration(dayTotal)}
                    </div>
                  </div>
                </div>

                {dayShed.active && (
                  <div className="space-y-1 pl-12">
                    {dayShed.slots.length > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-28 text-[11px] font-medium tracking-tight text-muted-foreground">
                            Début
                          </span>
                          <span className="invisible w-3 text-center">à</span>
                          <span className="w-28 text-[11px] font-medium tracking-tight text-muted-foreground">
                            Fin
                          </span>
                        </div>
                        <span className="w-32 text-[11px] font-medium tracking-tight text-muted-foreground">
                          Lieu de travail
                        </span>
                      </div>
                    )}
                    {dayShed.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="group flex items-center gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={slot.start}
                            onChange={(e) =>
                              updateSlot(day, slot.id, "start", e.target.value)
                            }
                            className="h-8 w-28 bg-transparent text-center text-xs"
                          />
                          <span className="text-muted-foreground">à</span>
                          <Input
                            type="time"
                            value={slot.end}
                            onChange={(e) =>
                              updateSlot(day, slot.id, "end", e.target.value)
                            }
                            className="h-8 w-28 bg-transparent text-center text-xs"
                          />
                        </div>

                        <Select
                          value={slot.location}
                          onValueChange={(v) =>
                            updateSlot(day, slot.id, "location", v)
                          }
                        >
                          <SelectTrigger className="h-8 w-32 border-border/40 bg-transparent text-[10px] focus:ring-0">
                            <SelectValue placeholder="Lieu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="Télétravail"
                              className="text-[10px]"
                            >
                              Télétravail
                            </SelectItem>
                            <SelectGroup>
                              <SelectLabel className="px-2 py-1 text-[9px] leading-none font-bold text-muted-foreground/60 uppercase">
                                Sites & Établissements
                              </SelectLabel>
                              <SelectItem
                                value="Siège Social"
                                className="text-[10px]"
                              >
                                Siège Social
                              </SelectItem>
                              <SelectItem
                                value="Antenne Plateau"
                                className="text-[10px]"
                              >
                                Antenne Plateau
                              </SelectItem>
                              <SelectItem
                                value="Agence Cocody"
                                className="text-[10px]"
                              >
                                Agence Cocody
                              </SelectItem>
                              <SelectItem
                                value="Site Industriel"
                                className="text-[10px]"
                              >
                                Site Industriel
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeSlot(day, slot.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-1 h-8 gap-1.5 border-dashed text-[11px] text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary"
                      onClick={() => addSlot(day)}
                    >
                      <Plus className="h-3 w-3" />
                      Ajouter un créneau
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
