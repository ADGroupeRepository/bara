"use client"

import { useState, useMemo } from "react"
import {
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  Laptop,
  Building2,
  Calendar,
  X,
  Download,
  Plus,
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
interface AttendanceRecord {
  readonly id: string
  readonly employeeName: string
  readonly employeeAvatar: string
  readonly department: string
  readonly date: string
  readonly checkIn: string | null
  readonly checkOut: string | null
  readonly duration: string | null
  readonly status: "Présent" | "Retard" | "Absent" | "Télétravail"
  readonly location: "Bureau" | "Maison" | null
}

type SortKey = "employeeName" | "checkIn" | "status"
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
const attendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT001",
    employeeName: "Siaka Sylla",
    employeeAvatar: "/homme01.png",
    department: "Direction",
    date: "31 Mars 2024",
    checkIn: "07:55",
    checkOut: "18:30",
    duration: "10h 35m",
    status: "Présent",
    location: "Bureau",
  },
  {
    id: "ATT002",
    employeeName: "Jean Dupont",
    employeeAvatar: "/homme02.png",
    department: "Informatique",
    date: "31 Mars 2024",
    checkIn: "08:15",
    checkOut: "17:45",
    duration: "9h 30m",
    status: "Retard",
    location: "Bureau",
  },
  {
    id: "ATT003",
    employeeName: "Marie Kouao",
    employeeAvatar: "/femme01.png",
    department: "Communication",
    date: "31 Mars 2024",
    checkIn: "08:00",
    checkOut: null,
    duration: null,
    status: "Télétravail",
    location: "Maison",
  },
  {
    id: "ATT004",
    employeeName: "Amadou Diallo",
    employeeAvatar: "/homme03.png",
    department: "Finance",
    date: "31 Mars 2024",
    checkIn: null,
    checkOut: null,
    duration: null,
    status: "Absent",
    location: null,
  },
  {
    id: "ATT005",
    employeeName: "Sarah Koné",
    employeeAvatar: "/femme02.png",
    department: "RH",
    date: "31 Mars 2024",
    checkIn: "07:45",
    checkOut: "16:30",
    duration: "8h 45m",
    status: "Présent",
    location: "Bureau",
  },
  {
    id: "ATT006",
    employeeName: "Oumar Touré",
    employeeAvatar: "/homme01.png",
    department: "Informatique",
    date: "31 Mars 2024",
    checkIn: "08:10",
    checkOut: null,
    duration: null,
    status: "Retard",
    location: "Bureau",
  },
  {
    id: "ATT007",
    employeeName: "Fatou Bamba",
    employeeAvatar: "/femme01.png",
    department: "RH",
    date: "31 Mars 2024",
    checkIn: "08:05",
    checkOut: "17:15",
    duration: "9h 10m",
    status: "Retard",
    location: "Bureau",
  },
  {
    id: "ATT008",
    employeeName: "Paul Konan",
    employeeAvatar: "/homme02.png",
    department: "Direction",
    date: "31 Mars 2024",
    checkIn: "07:50",
    checkOut: "18:15",
    duration: "10h 25m",
    status: "Présent",
    location: "Bureau",
  },
  {
    id: "ATT009",
    employeeName: "Aïcha Diabaté",
    employeeAvatar: "/femme02.png",
    department: "Communication",
    date: "31 Mars 2024",
    checkIn: "09:00",
    checkOut: "18:00",
    duration: "9h 00m",
    status: "Télétravail",
    location: "Maison",
  },
  {
    id: "ATT010",
    employeeName: "Yves Aka",
    employeeAvatar: "/homme03.png",
    department: "Finance",
    date: "31 Mars 2024",
    checkIn: "07:58",
    checkOut: null,
    duration: null,
    status: "Présent",
    location: "Bureau",
  },
]

const ITEMS_PER_PAGE = 8
const ALL_STATUSES = ["Présent", "Retard", "Absent", "Télétravail"]
const DEPARTMENTS = [
  "Direction",
  "Informatique",
  "RH",
  "Finance",
  "Communication",
]

export function AttendanceList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterDept, setFilterDept] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("employeeName")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterStatus || filterDept

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  function clearFilters() {
    setFilterStatus(null)
    setFilterDept(null)
    setSearchTerm("")
  }

  const processedRecords = useMemo(() => {
    let result = [...attendanceRecords]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (r) =>
          r.employeeName.toLowerCase().includes(term) ||
          r.department.toLowerCase().includes(term)
      )
    }

    if (filterStatus) result = result.filter((r) => r.status === filterStatus)
    if (filterDept) result = result.filter((r) => r.department === filterDept)

    result.sort((a, b) => {
      const valA = a[sortKey] ?? ""
      const valB = b[sortKey] ?? ""

      if (valA < valB) return sortDirection === "asc" ? -1 : 1
      if (valA > valB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return result
  }, [searchTerm, filterStatus, filterDept, sortKey, sortDirection])

  const totalPages = Math.ceil(processedRecords.length / ITEMS_PER_PAGE)
  const paginatedRecords = processedRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const kpis = [
    {
      label: "Taux de présence",
      value: "92.5%",
      segments: [
        {
          id: "online",
          label: "Présent",
          value: 92.5,
          colorClass: "bg-primary",
        },
        {
          id: "offline",
          label: "Absent",
          value: 7.5,
          colorClass: "bg-primary/20",
        },
      ],
    },
    {
      label: "Retards cumulés",
      value: "14",
      segments: [
        {
          id: "warn",
          label: "Critique",
          value: 4,
          colorClass: "bg-destructive/60",
        },
        { id: "minor", label: "Mineur", value: 10, colorClass: "bg-amber-400" },
      ],
    },
    {
      label: "Télétravail",
      value: "18%",
      segments: [
        {
          id: "remote",
          label: "Maison",
          value: 18,
          colorClass: "bg-indigo-500",
        },
        {
          id: "office",
          label: "Bureau",
          value: 82,
          colorClass: "bg-primary/20",
        },
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
          <Button variant="outline" className="h-11 px-4">
            <Calendar className="mr-2 h-4 w-4 opacity-50" />
            31 Mars 2024
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-11 text-muted-foreground"
            >
              <X className="mr-2 h-4 w-4" />
              Réinitialiser
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 px-4">
                {filterDept ?? "Département"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filtrer par département</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DEPARTMENTS.map((dept) => (
                <DropdownMenuItem
                  key={dept}
                  onClick={() => setFilterDept(dept)}
                >
                  {dept}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 px-4">
                {filterStatus ?? "Statut"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_STATUSES.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-11 gap-2 px-4">
            <Plus className="h-4 w-4" />
            Pointer Manuel
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <ScrollArea className="h-[calc(100vh-415px)] overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="text-foreground hover:bg-transparent">
              <TableHead className="w-[280px] font-semibold">
                <SortableHeader
                  label="Collaborateur"
                  sortKeyName="employeeName"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold">Service</TableHead>
              <TableHead className="text-center font-semibold">
                Arrivée
              </TableHead>
              <TableHead className="text-center font-semibold">
                Départ
              </TableHead>
              <TableHead className="text-center font-semibold">Durée</TableHead>
              <TableHead className="text-center font-semibold">
                <SortableHeader
                  label="Statut"
                  sortKeyName="status"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold">Localisation</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRecords.map((record) => (
              <TableRow key={record.id} className="group transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage
                        src={record.employeeAvatar}
                        alt={record.employeeName}
                      />
                      <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                        {record.employeeName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {record.employeeName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {record.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {record.department}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        record.status === "Retard"
                          ? "text-amber-600"
                          : "text-foreground"
                      )}
                    >
                      {record.checkIn ?? "--:--"}
                    </span>
                    {record.status === "Retard" && (
                      <span className="text-[10px] font-medium text-amber-500">
                        +15min
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm text-foreground">
                    {record.checkOut ?? "--:--"}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    {record.duration ?? "-"}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {record.status === "Présent" && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                    {record.status === "Retard" && (
                      <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                    )}
                    {record.status === "Absent" && (
                      <XCircle className="h-3.5 w-3.5 text-destructive" />
                    )}
                    {record.status === "Télétravail" && (
                      <Laptop className="h-3.5 w-3.5 text-indigo-500" />
                    )}
                    <span
                      className={cn(
                        "text-xs font-medium",
                        record.status === "Présent" && "text-emerald-700",
                        record.status === "Retard" && "text-amber-700",
                        record.status === "Absent" && "text-destructive",
                        record.status === "Télétravail" && "text-indigo-700"
                      )}
                    >
                      {record.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    {record.location === "Bureau" ? (
                      <Building2 className="h-3.5 w-3.5" />
                    ) : record.location === "Maison" ? (
                      <Laptop className="h-3.5 w-3.5" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5 opacity-30" />
                    )}
                    <span className="text-xs">
                      {record.location ?? "Non défini"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" title="Modifier">
                      <Clock className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          Voir l&apos;historique
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Justifier retard/absence
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="font-medium text-destructive">
                          Signaler anomalie
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
      <div className="flex items-center justify-between pt-5 text-sm text-muted-foreground">
        <span>
          Affichage de {(currentPage - 1) * ITEMS_PER_PAGE + 1} à{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, processedRecords.length)} sur{" "}
          {processedRecords.length} enregistrements
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="ml-2 h-8 gap-2">
            <Download className="h-3.5 w-3.5" />
            Exporter
          </Button>
        </div>
      </div>
    </div>
  )
}
