"use client"

import { useState, useMemo } from "react"

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
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/layout/sidebar/icons"
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

  // Log employee for development (removes lint as well)
  console.debug("Employee loading for schedule:", employee.nom)

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

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex gap-8">
        {/* Colonne GAUCHE : Détail de la semaine */}
        <div className="w-[50%] space-y-10">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              Paramétrer le rythme de travail
            </h2>
            <p className="text-sm text-muted-foreground">
              Configurez le rythme de travail du collaborateur tel qu&apos;il
              est indiqué dans le contrat.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-foreground">
                Paramètres du planning
              </h3>
            </div>

            <Card className="border-border bg-card shadow-none">
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2.5">
                    <Label>Fuseau horaire</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="w-full">
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
                    <Select
                      value={selectedTemplate}
                      onValueChange={onTemplateChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Prédéfinis</SelectLabel>
                          {SCHEDULE_TEMPLATES.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <Separator className="my-1" />
                        <SelectGroup>
                          <SelectItem value="custom">
                            Configuration personnalisée
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-foreground">
                Détail de la semaine
              </h3>
            </div>

            <div className="space-y-4">
              {DAYS.map((day) => {
                const dayShed = schedule[day]
                const dayTotal = calculateDayDuration(dayShed)
                const isOverlap = checkOverlap(dayShed.slots)

                return (
                  <div
                    key={day}
                    className={cn(
                      "relative overflow-hidden rounded-xl border transition-all duration-200",
                      dayShed.active
                        ? cn(
                            "border-border bg-background",
                            isOverlap &&
                              "border-destructive ring-1 ring-destructive/20"
                          )
                        : "border-border bg-transparent opacity-60"
                    )}
                  >
                    <div className="flex items-center justify-between px-6 py-4 lg:pl-6">
                      <div className="flex w-full items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-sm font-semibold">
                            {day} -
                            <div className="font-normal text-muted-foreground">
                              <span>{formatDuration(dayTotal)}</span> de jours
                              travailler
                            </div>
                          </div>
                          {isOverlap && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-destructive">
                              Chevauchement
                            </span>
                          )}
                        </div>
                      </div>
                      <Switch
                        checked={dayShed.active}
                        onCheckedChange={() => handleToggle(day)}
                        className="scale-125"
                      />
                    </div>

                    {dayShed.active && (
                      <div className="border-t border-border bg-transparent p-4 lg:pl-6">
                        <div className="space-y-3">
                          {dayShed.slots.map((slot, index) => (
                            <div key={slot.id} className="space-y-1.5">
                              <div className="flex items-center px-1">
                                <span className="text-xs text-muted-foreground">
                                  Créneau {index + 1}
                                </span>
                              </div>
                              <div className="group flex items-center gap-3">
                                <div className="flex w-[408px] flex-nowrap items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <div className="relative">
                                      <Input
                                        type="time"
                                        value={slot.start}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                          updateSlot(
                                            day,
                                            slot.id,
                                            "start",
                                            e.target.value
                                          )
                                        }
                                        className="transition-focus h-9 w-[110px] border-border bg-background px-3 text-center text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                                      />
                                    </div>
                                    <span className="font-light text-muted-foreground/40">
                                      —
                                    </span>
                                    <div className="relative">
                                      <Input
                                        type="time"
                                        value={slot.end}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                          updateSlot(
                                            day,
                                            slot.id,
                                            "end",
                                            e.target.value
                                          )
                                        }
                                        className="transition-focus h-9 w-[110px] border-border bg-background px-3 text-center text-xs shadow-none focus-visible:border-primary focus-visible:ring-0"
                                      />
                                    </div>
                                  </div>

                                  <Select
                                    value={slot.location}
                                    onValueChange={(v) =>
                                      updateSlot(day, slot.id, "location", v)
                                    }
                                  >
                                    <SelectTrigger className="h-9 w-40 border-border bg-background text-[11px] shadow-none focus:ring-0">
                                      <SelectValue placeholder="Lieu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem
                                        value="Télétravail"
                                        className="text-[11px]"
                                      >
                                        Télétravail
                                      </SelectItem>
                                      <SelectGroup>
                                        <SelectLabel className="px-2 py-1 text-[11px] font-semibold text-foreground/70">
                                          Sites
                                        </SelectLabel>
                                        <SelectItem
                                          value="Siège Social"
                                          className="text-[11px]"
                                        >
                                          Siège Social
                                        </SelectItem>
                                        <SelectItem
                                          value="Antenne Plateau"
                                          className="text-[11px]"
                                        >
                                          Antenne Plateau
                                        </SelectItem>
                                        <SelectItem
                                          value="Agence Cocody"
                                          className="text-[11px]"
                                        >
                                          Agence Cocody
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="transition-all hover:bg-destructive/10 hover:text-destructive"
                                  onClick={() => removeSlot(day, slot.id)}
                                >
                                  <Icons.Trash className="size-4" />
                                </Button>
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              className="h-10 w-[408px] text-xs font-semibold hover:bg-muted"
                              onClick={() => addSlot(day)}
                            >
                              Ajouter un créneau
                            </Button>
                            <div className="w-9" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Colonne DROITE : Résumé Uniquement */}
        <div className="h-fit w-[50%] space-y-6 lg:sticky lg:top-[148px]">
          <div className="rounded-2xl border p-6">
            <h4 className="flex items-center font-semibold">
              Résumé hebdomadaire
            </h4>

            <div className="mt-6">
              <div className="flex items-center justify-between pb-2 font-semibold">
                <span>Jours de travail</span>
                <span>Heures de travail</span>
              </div>
              <Separator className="mb-2 opacity-50" />
              {DAYS.map((day) => {
                const dayShed = schedule[day]
                const dayDuration = calculateDayDuration(dayShed)
                return (
                  <div
                    key={day}
                    className="flex items-center justify-between border-b border-dashed py-3 text-[13px]"
                  >
                    <span
                      className={cn(
                        "font-medium",
                        dayShed.active
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {day}
                    </span>
                    <span
                      className={cn(
                        "font-bold tabular-nums",
                        dayDuration > 0
                          ? "text-primary"
                          : "text-muted-foreground/60"
                      )}
                    >
                      {dayDuration > 0 ? formatDuration(dayDuration) : "—"}
                    </span>
                  </div>
                )
              })}

              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">Total Semaine</span>
                  <div className="text-right">
                    <span className="block text-2xl font-black tracking-tight text-primary tabular-nums">
                      {formatDuration(weekTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
