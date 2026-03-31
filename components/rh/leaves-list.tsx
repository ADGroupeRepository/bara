"use client"

import { useState, useMemo } from "react"
import {
  MoreHorizontal,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Calendar,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
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
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { KpiCard } from "@/components/ui/kpi-card"
import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"

// --- Types ---
interface LeaveRequest {
  id: string
  employeeName: string
  employeeAvatar: string
  type: "Congé Payé" | "Congé Maladie" | "RTT" | "Exceptionnel"
  startDate: string
  endDate: string
  duration: number
  status: "Approuvé" | "En attente" | "Refusé"
  department: string
}

type SortKey = "employeeName" | "type" | "startDate" | "duration" | "status"
type SortDirection = "asc" | "desc"

// --- Standalone Components ---
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
      {isActive ? (
        sortDirection === "asc" ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
      )}
    </button>
  )
}

// --- Mock Data ---
const leaveRequests: LeaveRequest[] = [
  {
    id: "LR001",
    employeeName: "Siaka Sylla",
    employeeAvatar: "/homme01.png",
    type: "Congé Payé",
    startDate: "2024-04-10",
    endDate: "2024-04-24",
    duration: 10,
    status: "Approuvé",
    department: "Direction",
  },
  {
    id: "LR002",
    employeeName: "Marie Kouao",
    employeeAvatar: "/femme01.png",
    type: "Congé Maladie",
    startDate: "2024-03-25",
    endDate: "2024-03-28",
    duration: 3,
    status: "Approuvé",
    department: "Communication",
  },
  {
    id: "LR003",
    employeeName: "Jean Dupont",
    employeeAvatar: "/homme02.png",
    type: "RTT",
    startDate: "2024-04-05",
    endDate: "2024-04-05",
    duration: 1,
    status: "En attente",
    department: "Informatique",
  },
  {
    id: "LR004",
    employeeName: "Sarah Koné",
    employeeAvatar: "/femme02.png",
    type: "Congé Payé",
    startDate: "2024-05-01",
    endDate: "2024-05-15",
    duration: 10,
    status: "En attente",
    department: "RH",
  },
  {
    id: "LR005",
    employeeName: "Amadou Diallo",
    employeeAvatar: "/homme03.png",
    type: "Exceptionnel",
    startDate: "2024-03-20",
    endDate: "2024-03-22",
    duration: 2,
    status: "Refusé",
    department: "Finance",
  },
  {
    id: "LR006",
    employeeName: "Oumar Touré",
    employeeAvatar: "/homme01.png",
    type: "RTT",
    startDate: "2024-04-12",
    endDate: "2024-04-12",
    duration: 1,
    status: "En attente",
    department: "Informatique",
  },
  {
    id: "LR007",
    employeeName: "Fatou Bamba",
    employeeAvatar: "/femme01.png",
    type: "Congé Payé",
    startDate: "2024-06-15",
    endDate: "2024-06-30",
    duration: 11,
    status: "Approuvé",
    department: "RH",
  },
  {
    id: "LR008",
    employeeName: "Paul Konan",
    employeeAvatar: "/homme02.png",
    type: "Congé Maladie",
    startDate: "2024-04-01",
    endDate: "2024-04-03",
    duration: 2,
    status: "Approuvé",
    department: "Direction",
  },
  {
    id: "LR009",
    employeeName: "Aïcha Diabaté",
    employeeAvatar: "/femme02.png",
    type: "Congé Payé",
    startDate: "2024-07-10",
    endDate: "2024-07-24",
    duration: 10,
    status: "En attente",
    department: "Communication",
  },
  {
    id: "LR010",
    employeeName: "Yves Aka",
    employeeAvatar: "/homme03.png",
    type: "RTT",
    startDate: "2024-04-20",
    endDate: "2024-04-20",
    duration: 1,
    status: "En attente",
    department: "Finance",
  },
]

const ITEMS_PER_PAGE = 8

const ALL_TYPES: LeaveRequest["type"][] = [
  "Congé Payé",
  "Congé Maladie",
  "RTT",
  "Exceptionnel",
]
const ALL_STATUSES: LeaveRequest["status"][] = [
  "Approuvé",
  "En attente",
  "Refusé",
]

export function LeavesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("startDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterType || filterStatus

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
    setCurrentPage(1)
  }

  function clearFilters() {
    setFilterType(null)
    setFilterStatus(null)
    setCurrentPage(1)
  }

  const processedLeaves = useMemo(() => {
    let result = [...leaveRequests]

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (lr) =>
          lr.employeeName.toLowerCase().includes(term) ||
          lr.type.toLowerCase().includes(term) ||
          lr.department.toLowerCase().includes(term)
      )
    }

    // Filters
    if (filterType) result = result.filter((lr) => lr.type === filterType)
    if (filterStatus) result = result.filter((lr) => lr.status === filterStatus)

    // Sort
    result.sort((a, b) => {
      const valA = String(a[sortKey]).toLowerCase()
      const valB = String(b[sortKey]).toLowerCase()
      const cmp = valA.localeCompare(valB)
      return sortDirection === "asc" ? cmp : -cmp
    })

    return result
  }, [searchTerm, filterType, filterStatus, sortKey, sortDirection])

  const totalPages = Math.max(
    1,
    Math.ceil(processedLeaves.length / ITEMS_PER_PAGE)
  )
  const paginatedLeaves = processedLeaves.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const kpis = [
    {
      label: "Demandes en attente",
      value: String(
        leaveRequests.filter((l) => l.status === "En attente").length
      ),
      segments: [
        {
          id: "pending",
          label: "Attente",
          value: leaveRequests.filter((l) => l.status === "En attente").length,
          colorClass: "bg-primary",
        },
        {
          id: "approved",
          label: "Traitées",
          value: leaveRequests.filter((l) => l.status !== "En attente").length,
          colorClass: "bg-primary/20",
        },
      ],
    },
    {
      label: "Absences aujourd\u2019hui",
      value: "4",
      segments: [
        { id: "cp", label: "Congé Payé", value: 3, colorClass: "bg-primary" },
        { id: "cm", label: "Maladie", value: 1, colorClass: "bg-primary/50" },
      ],
    },
    {
      label: "Solde moyen (jours)",
      value: "22",
      segments: [
        { id: "used", label: "Pris", value: 8, colorClass: "bg-primary/60" },
        { id: "rem", label: "Restant", value: 22, colorClass: "bg-primary/10" },
      ],
    },
  ]

  return (
    <div>
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
        <Input
          placeholder="Rechercher une demande..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="h-11 w-[380px] px-4"
        />
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-11 text-muted-foreground"
            >
              <X className="h-4 w-4" />
              Réinitialiser
            </Button>
          )}

          {/* Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-11 px-4",
                  filterType && "border-foreground/30"
                )}
              >
                {filterType ?? "Type"}
                <ChevronDown className="ml-1.5 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Type de congé</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_TYPES.map((t) => (
                <DropdownMenuItem
                  key={t}
                  onClick={() => {
                    setFilterType(t)
                    setCurrentPage(1)
                  }}
                >
                  {t}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-11 px-4",
                  filterStatus && "border-foreground/30"
                )}
              >
                {filterStatus ?? "Statut"}
                <ChevronDown className="ml-1.5 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Statut</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_STATUSES.map((s) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() => {
                    setFilterStatus(s)
                    setCurrentPage(1)
                  }}
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-11 px-4">Nouvelle Demande</Button>
        </div>
      </div>

      {/* Table Section */}
      <ScrollArea className="h-[calc(100vh-415px)] overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[280px] font-semibold text-foreground">
                <SortableHeader
                  label="Collaborateur"
                  sortKeyName="employeeName"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                <SortableHeader
                  label="Type"
                  sortKeyName="type"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                <SortableHeader
                  label="Période"
                  sortKeyName="startDate"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                <SortableHeader
                  label="Durée"
                  sortKeyName="duration"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                <SortableHeader
                  label="Statut"
                  sortKeyName="status"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="text-right font-semibold text-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeaves.map((lr) => (
              <TableRow key={lr.id} className="group transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage
                        src={lr.employeeAvatar}
                        alt={lr.employeeName}
                      />
                      <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                        {lr.employeeName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm leading-none font-medium text-foreground">
                        {lr.employeeName}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        {lr.department}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-xs font-medium text-slate-700"
                  >
                    {lr.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="text-sm">
                      {new Date(lr.startDate).toLocaleDateString("fr-FR")} -{" "}
                      {new Date(lr.endDate).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{lr.duration} j.</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {lr.status === "Approuvé" && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                    {lr.status === "En attente" && (
                      <Clock className="h-3.5 w-3.5 text-amber-500" />
                    )}
                    {lr.status === "Refusé" && (
                      <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        lr.status === "Approuvé" && "text-emerald-700",
                        lr.status === "En attente" && "text-amber-600",
                        lr.status === "Refusé" && "text-destructive"
                      )}
                    >
                      {lr.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Voir détails</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="font-medium text-emerald-600">
                        Approuver
                      </DropdownMenuItem>
                      <DropdownMenuItem className="font-medium text-destructive">
                        Refuser
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Pagination & Info */}
      <div className="flex items-center justify-between pt-5 text-sm text-muted-foreground">
        <span>
          {processedLeaves.length === 0
            ? "Aucun résultat"
            : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}\u2013${Math.min(currentPage * ITEMS_PER_PAGE, processedLeaves.length)} sur ${processedLeaves.length} demande${processedLeaves.length > 1 ? "s" : ""}`}
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="icon-sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {processedLeaves.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Aucun résultat
          </h3>
          <p className="mt-1 max-w-[280px] text-muted-foreground">
            Aucune demande de congé ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  )
}
