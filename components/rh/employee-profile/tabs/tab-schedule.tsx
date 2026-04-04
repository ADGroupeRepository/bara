"use client"

import { useState, useMemo } from "react"
import {
  Globe,
  Save,
  Check,
  LayoutTemplate,
  Clock,
  Coffee,
  Plus,
  Trash2,
  Settings2,
  CopyCheck,
} from "lucide-react"

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import type { EmployeeProfile } from "../mock-data"

type Break = {
  id: string
  start: string
  end: string
}

type DaySchedule = {
  active: boolean
  start: string
  end: string
  breaks: Break[]
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
        start: "08:00",
        end: "17:00",
        breaks: [{ id: "b1", start: "12:00", end: "13:00" }],
      },
      Mardi: {
        active: true,
        start: "08:00",
        end: "17:00",
        breaks: [{ id: "b1", start: "12:00", end: "13:00" }],
      },
      Mercredi: {
        active: true,
        start: "08:00",
        end: "17:00",
        breaks: [{ id: "b1", start: "12:00", end: "13:00" }],
      },
      Jeudi: {
        active: true,
        start: "08:00",
        end: "17:00",
        breaks: [{ id: "b1", start: "12:00", end: "13:00" }],
      },
      Vendredi: {
        active: true,
        start: "08:00",
        end: "17:00",
        breaks: [{ id: "b1", start: "12:00", end: "13:00" }],
      },
      Samedi: { active: false, start: "09:00", end: "12:00", breaks: [] },
      Dimanche: { active: false, start: "00:00", end: "00:00", breaks: [] },
    },
  },
  {
    id: "interrupted",
    label: "Service continu (08h00 - 16h00)",
    schedule: {
      Lundi: { active: true, start: "08:00", end: "16:00", breaks: [] },
      Mardi: { active: true, start: "08:00", end: "16:00", breaks: [] },
      Mercredi: { active: true, start: "08:00", end: "16:00", breaks: [] },
      Jeudi: { active: true, start: "08:00", end: "16:00", breaks: [] },
      Vendredi: { active: true, start: "08:00", end: "16:00", breaks: [] },
      Samedi: { active: false, start: "09:00", end: "12:00", breaks: [] },
      Dimanche: { active: false, start: "00:00", end: "00:00", breaks: [] },
    },
  },
  {
    id: "morning",
    label: "Matinées (08h00 - 13h00)",
    schedule: {
      Lundi: { active: true, start: "08:00", end: "13:00", breaks: [] },
      Mardi: { active: true, start: "08:00", end: "13:00", breaks: [] },
      Mercredi: { active: true, start: "08:00", end: "13:00", breaks: [] },
      Jeudi: { active: true, start: "08:00", end: "13:00", breaks: [] },
      Vendredi: { active: true, start: "08:00", end: "13:00", breaks: [] },
      Samedi: { active: true, start: "08:00", end: "12:00", breaks: [] },
      Dimanche: { active: false, start: "00:00", end: "00:00", breaks: [] },
    },
  },
]

type TabScheduleProps = {
  readonly employee: EmployeeProfile
}

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

export function TabSchedule({ employee }: TabScheduleProps) {
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(
    structuredClone(SCHEDULE_TEMPLATES[0].schedule)
  )
  const [selectedTemplate, setSelectedTemplate] = useState<string>("standard")
  const [timezone, setTimezone] = useState("Africa/Abidjan")
  const [isSaved, setIsSaved] = useState(false)

  const handleToggle = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], active: !prev[day].active },
    }))
    setSelectedTemplate("custom")
  }

  const handleTimeChange = (
    day: string,
    field: "start" | "end",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
    setSelectedTemplate("custom")
  }

  const handleBreakChange = (
    day: string,
    breakId: string,
    field: "start" | "end",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        breaks: prev[day].breaks.map((b) =>
          b.id === breakId ? { ...b, [field]: value } : b
        ),
      },
    }))
    setSelectedTemplate("custom")
  }

  const addBreak = (day: string) => {
    const newId = Math.random().toString(36).substring(2, 9)
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        breaks: [
          ...prev[day].breaks,
          { id: newId, start: "12:00", end: "13:00" },
        ],
      },
    }))
    setSelectedTemplate("custom")
  }

  const removeBreak = (day: string, breakId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        breaks: prev[day].breaks.filter((b) => b.id !== breakId),
      },
    }))
    setSelectedTemplate("custom")
  }

  const copyBreaksToAllDays = (sourceDay: string) => {
    const breaksToCopy = structuredClone(schedule[sourceDay].breaks)
    const newSchedule = { ...schedule }
    DAYS.forEach((day) => {
      if (day !== sourceDay && newSchedule[day].active) {
        newSchedule[day] = {
          ...newSchedule[day],
          breaks: structuredClone(breaksToCopy),
        }
      }
    })
    setSchedule(newSchedule)
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
    const grossMin = toMinutes(dayShed.end) - toMinutes(dayShed.start)
    const breaksMin = dayShed.breaks.reduce(
      (sum, b) => sum + (toMinutes(b.end) - toMinutes(b.start)),
      0
    )
    return Math.max(0, grossMin - breaksMin)
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
            Configurez les horaires de travail de {employee.prenom}{" "}
            {employee.nom}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleSave}
            className={cn(
              "h-10 px-6 font-medium transition-all",
              isSaved ? "bg-green-600 text-white hover:bg-green-700" : ""
            )}
          >
            {isSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Enregistré
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Paramètres globaux (Fuseau + Modèle) */}
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-border/50 bg-muted/30 p-6 sm:grid-cols-2">
        <div className="space-y-2.5">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-4 w-4" /> Fuseau horaire
          </Label>
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
          <Label className="flex items-center gap-2 text-muted-foreground">
            <LayoutTemplate className="h-4 w-4" /> Modèle de planning
          </Label>
          <Select value={selectedTemplate} onValueChange={onTemplateChange}>
            <SelectTrigger className="h-10 border-border/80 bg-background transition-colors hover:bg-accent/50 focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="font-medium text-muted-foreground">
                  Prédéfinis
                </SelectLabel>
                {SCHEDULE_TEMPLATES.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="font-medium text-muted-foreground">
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
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground">
              Détail de la semaine
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Temps effectif total :</span>
            <span className="text-xl font-bold tracking-tight text-primary">
              {formatDuration(weekTotal)}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          {DAYS.map((day) => {
            const dayShed = schedule[day]
            const dayTotal = calculateDayDuration(dayShed)
            const hasBreaks = dayShed.breaks.length > 0

            return (
              <div
                key={day}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-4 transition-colors",
                  dayShed.active
                    ? "border-border/80 bg-card"
                    : "border-transparent bg-muted/40 opacity-70 grayscale-[0.2]"
                )}
              >
                <div className="flex w-40 shrink-0 items-center gap-4">
                  <Switch
                    checked={dayShed.active}
                    onCheckedChange={() => handleToggle(day)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <span className="text-sm font-medium">{day}</span>
                </div>

                <div className="mx-2 flex flex-1 items-center gap-3 border-r border-l border-border/40 px-6">
                  <Input
                    type="time"
                    value={dayShed.start}
                    onChange={(e) =>
                      handleTimeChange(day, "start", e.target.value)
                    }
                    disabled={!dayShed.active}
                    className="h-9 max-w-[110px] border-border/50 bg-transparent text-center transition-colors hover:bg-muted/30 focus:bg-background"
                  />
                  <span className="px-1 text-sm text-muted-foreground/60">
                    -
                  </span>
                  <Input
                    type="time"
                    value={dayShed.end}
                    onChange={(e) =>
                      handleTimeChange(day, "end", e.target.value)
                    }
                    disabled={!dayShed.active}
                    className="h-9 max-w-[110px] border-border/50 bg-transparent text-center transition-colors hover:bg-muted/30 focus:bg-background"
                  />

                  {/* Bouton de configuration des Pauses (Drawer Trigger) */}
                  <div className="ml-auto">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant={hasBreaks ? "secondary" : "ghost"}
                          size="sm"
                          disabled={!dayShed.active}
                          className={cn(
                            "h-9 px-3 transition-colors",
                            !hasBreaks &&
                              "text-muted-foreground hover:bg-muted/50"
                          )}
                        >
                          {hasBreaks ? (
                            <>
                              <Coffee className="mr-2 h-3.5 w-3.5 text-black" />{" "}
                              {dayShed.breaks.length} Pause
                              {dayShed.breaks.length > 1 ? "s" : ""}
                            </>
                          ) : (
                            <>
                              <Plus className="mr-1 h-3.5 w-3.5" /> Ajouter
                              pause
                            </>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="flex w-[400px] flex-col border-l p-0 shadow-2xl sm:w-[540px]">
                        <div className="border-b bg-muted/10 p-6">
                          <SheetHeader>
                            <SheetTitle className="flex items-center gap-2 text-xl">
                              <Coffee className="h-5 w-5 text-muted-foreground" />
                              Pauses du {day}
                            </SheetTitle>
                            <SheetDescription className="text-sm">
                              Configurez les interruptions de la journée. Le
                              temps de pause sera automatiquement déduit du
                              total d&apos;heures travaillées.
                            </SheetDescription>
                          </SheetHeader>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto p-6">
                          {dayShed.breaks.length === 0 ? (
                            <div className="flex h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-muted/10">
                              <Coffee className="mb-2 h-8 w-8 text-muted-foreground/40" />
                              <p className="text-sm text-muted-foreground">
                                Aucune pause configurée
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {dayShed.breaks.map((b) => (
                                <div
                                  key={b.id}
                                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3"
                                >
                                  <div className="flex flex-1 items-center gap-3">
                                    <div className="w-full space-y-1">
                                      <Label className="ml-1 text-[10px] text-muted-foreground">
                                        Heure de début
                                      </Label>
                                      <Input
                                        type="time"
                                        value={b.start}
                                        onChange={(e) =>
                                          handleBreakChange(
                                            day,
                                            b.id,
                                            "start",
                                            e.target.value
                                          )
                                        }
                                        className="bg-background focus:ring-primary/20"
                                      />
                                    </div>
                                    <div className="w-full space-y-1">
                                      <Label className="ml-1 text-[10px] text-muted-foreground">
                                        Heure de fin
                                      </Label>
                                      <Input
                                        type="time"
                                        value={b.end}
                                        onChange={(e) =>
                                          handleBreakChange(
                                            day,
                                            b.id,
                                            "end",
                                            e.target.value
                                          )
                                        }
                                        className="bg-background focus:ring-primary/20"
                                      />
                                    </div>
                                  </div>
                                  <div className="shrink-0 pt-5">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                            onClick={() =>
                                              removeBreak(day, b.id)
                                            }
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="text-xs">
                                          Supprimer cette pause
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <Button
                            variant="outline"
                            className="h-11 w-full border-dashed text-muted-foreground hover:text-foreground"
                            onClick={() => addBreak(day)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            {dayShed.breaks.length === 0
                              ? "Ajouter une première pause"
                              : "Ajouter une autre pause"}
                          </Button>
                        </div>

                        <div className="mt-auto border-t bg-background p-6">
                          <Button
                            variant="secondary"
                            className="h-11 w-full bg-primary/10 font-medium text-primary hover:bg-primary/20"
                            onClick={() => copyBreaksToAllDays(day)}
                            disabled={dayShed.breaks.length === 0}
                          >
                            <CopyCheck className="mr-2 h-4 w-4" /> Appliquer ces
                            pauses à toute la semaine
                          </Button>
                          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-muted-foreground">
                            <Settings2 className="h-3 w-3" />
                            Les modifications s&apos;appliquent en temps réel et
                            basculent le modèle en &quot;Personnalisé&quot;.
                          </p>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                <div className="w-24 shrink-0 px-2 text-right">
                  <span
                    className={cn(
                      "text-sm font-semibold tabular-nums",
                      dayTotal > 0 ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {formatDuration(dayTotal)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
