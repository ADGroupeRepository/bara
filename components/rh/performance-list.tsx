"use client"

import { useState, useMemo } from "react"
import {
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Star,
  Target,
  TrendingUp,
  Calendar,
  X,
  FileText,
  Plus,
  ArrowUpRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { KpiCard } from "@/components/ui/kpi-card"
import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"

// --- Types ---
interface PerformanceRecord {
  readonly id: string
  readonly employeeName: string
  readonly employeeAvatar: string
  readonly department: string
  readonly score: number // 1-5
  readonly status: "Excellent" | "En progression" | "À améliorer" | "Nouvelle recrue"
  readonly objectivesProgress: number // 0-100
  readonly lastReview: string
  readonly nextReview: string | null
}

type SortKey = "employeeName" | "score" | "objectivesProgress"
type SortDirection = "asc" | "desc"

function SortableHeader({
  label,
  sortKeyName,
  sortKey,
  sortDirection,
  onSort,
}: {
  readonly label: string
  readonly sortKeyName: SortKey
  readonly sortKey: SortKey
  readonly sortDirection: SortDirection
  readonly onSort: (key: SortKey) => void
}) {
  const isActive = sortKey === sortKeyName
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
      onClick={() => onSort(sortKeyName)}
    >
      {label}
      {isActive && sortDirection === "asc" && <ChevronUp className="h-3.5 w-3.5" />}
      {isActive && sortDirection === "desc" && <ChevronDown className="h-3.5 w-3.5" />}
      {!isActive && <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />}
    </button>
  )
}

function RatingStars({ rating }: { readonly rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            "h-3.5 w-3.5",
            s <= Math.round(rating)
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          )}
        />
      ))}
      <span className="ml-1.5 text-xs font-semibold">{rating.toFixed(1)}</span>
    </div>
  )
}

function ProgressBar({ progress }: { readonly progress: number }) {
  const isEmerald = progress >= 75
  const isAmber = progress < 40
  const color = isEmerald ? "bg-emerald-500" : isAmber ? "bg-amber-500" : "bg-primary"
  return (
    <div className="flex w-full items-center gap-2">
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full transition-all", color)} style={{ width: `${progress}%` }} />
      </div>
      <span className="text-[10px] font-medium text-muted-foreground w-8">{progress}%</span>
    </div>
  )
}

// --- Mock Data ---
const performanceRecords: PerformanceRecord[] = [
  {
    id: "PERF001",
    employeeName: "Siaka Sylla",
    employeeAvatar: "/homme01.png",
    department: "Direction",
    score: 4.8,
    status: "Excellent",
    objectivesProgress: 95,
    lastReview: "15 Janv. 2024",
    nextReview: "15 Juil. 2024",
  },
  {
    id: "PERF002",
    employeeName: "Jean Dupont",
    employeeAvatar: "/homme02.png",
    department: "Informatique",
    score: 4.2,
    status: "En progression",
    objectivesProgress: 75,
    lastReview: "20 Fév. 2024",
    nextReview: "20 Août 2024",
  },
  {
    id: "PERF003",
    employeeName: "Marie Kouao",
    employeeAvatar: "/femme01.png",
    department: "Communication",
    score: 3.5,
    status: "À améliorer",
    objectivesProgress: 45,
    lastReview: "10 Mars 2024",
    nextReview: "10 Sept. 2024",
  },
  {
    id: "PERF004",
    employeeName: "Amadou Diallo",
    employeeAvatar: "/homme03.png",
    department: "Finance",
    score: 4.5,
    status: "Excellent",
    objectivesProgress: 88,
    lastReview: "05 Janv. 2024",
    nextReview: "05 Juil. 2024",
  },
  {
    id: "PERF005",
    employeeName: "Sarah Koné",
    employeeAvatar: "/femme02.png",
    department: "RH",
    score: 4,
    status: "En progression",
    objectivesProgress: 60,
    lastReview: "25 Janv. 2024",
    nextReview: "25 Juil. 2024",
  },
  {
    id: "PERF006",
    employeeName: "Oumar Touré",
    employeeAvatar: "/homme01.png",
    department: "Informatique",
    score: 4.7,
    status: "Excellent",
    objectivesProgress: 92,
    lastReview: "12 Fév. 2024",
    nextReview: "12 Août 2024",
  },
  {
    id: "PERF007",
    employeeName: "Fatou Bamba",
    employeeAvatar: "/femme01.png",
    department: "RH",
    score: 3.8,
    status: "En progression",
    objectivesProgress: 55,
    lastReview: "02 Mars 2024",
    nextReview: "02 Sept. 2024",
  },
  {
    id: "PERF008",
    employeeName: "Paul Konan",
    employeeAvatar: "/homme02.png",
    department: "Direction",
    score: 4.3,
    status: "En progression",
    objectivesProgress: 80,
    lastReview: "18 Janv. 2024",
    nextReview: "18 Juil. 2024",
  },
  {
    id: "PERF009",
    employeeName: "Aïcha Diabaté",
    employeeAvatar: "/femme02.png",
    department: "Communication",
    score: 0,
    status: "Nouvelle recrue",
    objectivesProgress: 10,
    lastReview: "N/A",
    nextReview: "30 Juin 2024",
  },
  {
    id: "PERF010",
    employeeName: "Yves Aka",
    employeeAvatar: "/homme03.png",
    department: "Finance",
    score: 4.1,
    status: "En progression",
    objectivesProgress: 70,
    lastReview: "22 Fév. 2024",
    nextReview: "22 Août 2024",
  },
]

const ITEMS_PER_PAGE = 8
const ALL_DEPARTMENTS = ["Direction", "Informatique", "RH", "Finance", "Communication"]
const ALL_STATUSES = ["Excellent", "En progression", "À améliorer", "Nouvelle recrue"]

export function PerformanceList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDept, setFilterDept] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("employeeName")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterDept || filterStatus || searchTerm

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  function clearFilters() {
    setFilterDept(null)
    setFilterStatus(null)
    setSearchTerm("")
  }

  const processedRecords = useMemo(() => {
    let result = [...performanceRecords]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (r) =>
          r.employeeName.toLowerCase().includes(term) ||
          r.department.toLowerCase().includes(term)
      )
    }

    if (filterDept) result = result.filter((r) => r.department === filterDept)
    if (filterStatus) result = result.filter((r) => r.status === filterStatus)

    result.sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      
      if (typeof valA === "string" && typeof valB === "string") {
        const strA = valA.toLowerCase()
        const strB = valB.toLowerCase()
        if (strA < strB) return sortDirection === "asc" ? -1 : 1
        if (strA > strB) return sortDirection === "asc" ? 1 : -1
      } else {
        if ((valA as number) < (valB as number)) return sortDirection === "asc" ? -1 : 1
        if ((valA as number) > (valB as number)) return sortDirection === "asc" ? 1 : -1
      }
      return 0
    })

    return result
  }, [searchTerm, filterDept, filterStatus, sortKey, sortDirection])

  const totalPages = Math.ceil(processedRecords.length / ITEMS_PER_PAGE)
  const paginatedRecords = processedRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const kpis = [
    {
      label: "Performance Moyenne",
      value: "4.2/5",
      segments: [
        { id: "score", label: "Global", value: 84, colorClass: "bg-primary" },
        { id: "gap", label: "Marge", value: 16, colorClass: "bg-primary/10" },
      ],
    },
    {
      label: "Objectifs Atteints",
      value: "78%",
      segments: [
        { id: "done", label: "Fait", value: 78, colorClass: "bg-emerald-500" },
        { id: "todo", label: "Reste", value: 22, colorClass: "bg-primary/20" },
      ],
    },
    {
      label: "Entretiens à jour",
      value: "85%",
      segments: [
        { id: "ok", label: "Réalisés", value: 85, colorClass: "bg-primary" },
        { id: "miss", label: "Retard", value: 15, colorClass: "bg-destructive/40" },
      ],
    },
  ]

  return (
    <div className="space-y-0">
      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            mainValue={kpi.value}
            mainValueLabel={kpi.label}
            segments={kpi.segments}
          />
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Rechercher un collaborateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-[380px] px-4"
          />
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="h-11 text-muted-foreground">
              <X className="mr-2 h-4 w-4" />
              Réinitialiser
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 px-4">
                {filterDept ?? "Département"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Département</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_DEPARTMENTS.map((d) => (
                <DropdownMenuItem key={d} onClick={() => setFilterDept(d)}>
                  {d}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 px-4">
                {filterStatus ?? "Évaluation"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Statut Performance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_STATUSES.map((s) => (
                <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)}>
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-11 px-4 bg-primary gap-2">
            <Plus className="h-4 w-4" />
            Lancer Campagne
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <ScrollArea className="h-[calc(100vh-415px)] overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent text-foreground">
              <TableHead className="w-[280px] font-semibold">
                <SortableHeader label="Collaborateur" sortKeyName="employeeName" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold">
                <SortableHeader label="Score Global" sortKeyName="score" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold text-center">Évaluation</TableHead>
              <TableHead className="w-[180px] font-semibold">
                <SortableHeader label="Objectifs" sortKeyName="objectivesProgress" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
              </TableHead>
              <TableHead className="font-semibold">Bilan Précédent</TableHead>
              <TableHead className="font-semibold">Prochain RDV</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRecords.map((record) => (
              <TableRow key={record.id} className="group transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={record.employeeAvatar} alt={record.employeeName} />
                      <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                        {record.employeeName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{record.employeeName}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{record.department}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <RatingStars rating={record.score} />
                </TableCell>
                <TableCell className="text-center">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    record.status === "Excellent" && "bg-emerald-50 text-emerald-700 border border-emerald-200",
                    record.status === "En progression" && "bg-blue-50 text-blue-700 border border-blue-200",
                    record.status === "À améliorer" && "bg-amber-50 text-amber-700 border border-amber-200",
                    record.status === "Nouvelle recrue" && "bg-slate-50 text-slate-700 border border-slate-200"
                  )}>
                    {record.status}
                  </span>
                </TableCell>
                <TableCell>
                  <ProgressBar progress={record.objectivesProgress} />
                </TableCell>
                <TableCell>
                  <span className="text-xs text-muted-foreground font-medium">{record.lastReview}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {record.nextReview ? (
                      <>
                        <Calendar className="h-3 w-3 text-primary opacity-60" />
                        <span className="text-xs font-semibold text-primary">{record.nextReview}</span>
                      </>
                    ) : (
                      <span className="text-xs text-slate-300">Non planifié</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" title="Voir le Scorecard">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                          <FileText className="h-4 w-4" />
                          Consulter rapport
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-primary font-medium">
                          <Calendar className="h-4 w-4" />
                          Fixer entretien
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Target className="h-4 w-4" />
                          Éditer objectifs
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Pagination & Info */}
      <div className="flex items-center justify-between pt-5 text-sm text-muted-foreground font-medium">
        <span>
          {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, processedRecords.length)} sur {processedRecords.length} collaborateurs
        </span>
        <div className="flex items-center gap-2">
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon-sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon-sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button variant="outline" className="h-9 px-4 gap-2">
            <TrendingUp className="h-4 w-4" />
            Rapport Équipe
          </Button>
        </div>
      </div>
    </div>
  )
}
