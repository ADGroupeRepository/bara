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
interface Employee {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly department: string
  readonly email: string
  readonly phone: string
  readonly status: "Actif" | "En congé" | "Télétravail"
  readonly contract: "CDI" | "CDD" | "Stage"
  readonly joinDate: string
  readonly avatar: string
}

type SortKey = "name" | "department" | "contract" | "joinDate"
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

// --- Mock Data (15 employees) ---
const employees: Employee[] = [
  {
    id: "EMP001",
    name: "Siaka Sylla",
    role: "Directeur Général",
    department: "Direction",
    email: "s.sylla@cnf.ci",
    phone: "+225 07 00 00 01",
    status: "Actif",
    contract: "CDI",
    joinDate: "01/01/2020",
    avatar: "/homme01.png",
  },
  {
    id: "EMP002",
    name: "Jean Dupont",
    role: "Responsable IT",
    department: "Informatique",
    email: "j.dupont@cnf.ci",
    phone: "+225 07 00 00 02",
    status: "Actif",
    contract: "CDI",
    joinDate: "15/03/2021",
    avatar: "/homme02.png",
  },
  {
    id: "EMP003",
    name: "Marie Kouao",
    role: "Chargée de Communication",
    department: "Communication",
    email: "m.kouao@cnf.ci",
    phone: "+225 07 00 00 03",
    status: "En congé",
    contract: "CDD",
    joinDate: "10/06/2022",
    avatar: "/femme01.png",
  },
  {
    id: "EMP004",
    name: "Amadou Diallo",
    role: "Comptable Principal",
    department: "Finance",
    email: "a.diallo@cnf.ci",
    phone: "+225 07 00 00 04",
    status: "Actif",
    contract: "CDI",
    joinDate: "05/09/2019",
    avatar: "/homme03.png",
  },
  {
    id: "EMP005",
    name: "Sarah Koné",
    role: "Assistante RH",
    department: "RH",
    email: "s.kone@cnf.ci",
    phone: "+225 07 00 00 05",
    status: "Actif",
    contract: "Stage",
    joinDate: "01/02/2024",
    avatar: "/femme02.png",
  },
  {
    id: "EMP006",
    name: "Oumar Touré",
    role: "Développeur Full-Stack",
    department: "Informatique",
    email: "o.toure@cnf.ci",
    phone: "+225 07 00 00 06",
    status: "Télétravail",
    contract: "CDI",
    joinDate: "20/01/2023",
    avatar: "/homme01.png",
  },
  {
    id: "EMP007",
    name: "Fatou Bamba",
    role: "Responsable RH",
    department: "RH",
    email: "f.bamba@cnf.ci",
    phone: "+225 07 00 00 07",
    status: "Actif",
    contract: "CDI",
    joinDate: "12/04/2018",
    avatar: "/femme01.png",
  },
  {
    id: "EMP008",
    name: "Paul Konan",
    role: "Chef de Projet",
    department: "Direction",
    email: "p.konan@cnf.ci",
    phone: "+225 07 00 00 08",
    status: "Actif",
    contract: "CDI",
    joinDate: "03/07/2021",
    avatar: "/homme02.png",
  },
  {
    id: "EMP009",
    name: "Aïcha Diabaté",
    role: "Graphiste",
    department: "Communication",
    email: "a.diabate@cnf.ci",
    phone: "+225 07 00 00 09",
    status: "En congé",
    contract: "CDD",
    joinDate: "18/11/2023",
    avatar: "/femme02.png",
  },
  {
    id: "EMP010",
    name: "Yves Aka",
    role: "Analyste Financier",
    department: "Finance",
    email: "y.aka@cnf.ci",
    phone: "+225 07 00 00 10",
    status: "Actif",
    contract: "CDI",
    joinDate: "22/08/2020",
    avatar: "/homme03.png",
  },
  {
    id: "EMP011",
    name: "Mariam Sanogo",
    role: "Stagiaire IT",
    department: "Informatique",
    email: "m.sanogo@cnf.ci",
    phone: "+225 07 00 00 11",
    status: "Actif",
    contract: "Stage",
    joinDate: "15/01/2025",
    avatar: "/femme01.png",
  },
  {
    id: "EMP012",
    name: "Ibrahim Coulibaly",
    role: "Agent Logistique",
    department: "Logistique",
    email: "i.coulibaly@cnf.ci",
    phone: "+225 07 00 00 12",
    status: "Actif",
    contract: "CDI",
    joinDate: "09/05/2022",
    avatar: "/homme01.png",
  },
  {
    id: "EMP013",
    name: "Clémence N'Guessan",
    role: "Juriste",
    department: "Direction",
    email: "c.nguessan@cnf.ci",
    phone: "+225 07 00 00 13",
    status: "Télétravail",
    contract: "CDI",
    joinDate: "14/02/2021",
    avatar: "/femme02.png",
  },
  {
    id: "EMP014",
    name: "Moussa Konaté",
    role: "Chauffeur",
    department: "Logistique",
    email: "m.konate@cnf.ci",
    phone: "+225 07 00 00 14",
    status: "Actif",
    contract: "CDD",
    joinDate: "01/09/2023",
    avatar: "/homme03.png",
  },
  {
    id: "EMP015",
    name: "Elise Brou",
    role: "Stagiaire Finance",
    department: "Finance",
    email: "e.brou@cnf.ci",
    phone: "+225 07 00 00 15",
    status: "Actif",
    contract: "Stage",
    joinDate: "10/03/2025",
    avatar: "/femme01.png",
  },
]

const ITEMS_PER_PAGE = 8

const ALL_DEPARTMENTS = [...new Set(employees.map((e) => e.department))]
const ALL_CONTRACTS: Employee["contract"][] = ["CDI", "CDD", "Stage"]
const ALL_STATUSES: Employee["status"][] = ["Actif", "En congé", "Télétravail"]

export function EmployeesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null)
  const [filterContract, setFilterContract] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterDepartment || filterContract || filterStatus

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
    setFilterDepartment(null)
    setFilterContract(null)
    setFilterStatus(null)
    setCurrentPage(1)
  }

  const processedEmployees = useMemo(() => {
    let result = [...employees]

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (emp) =>
          emp.name.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term) ||
          emp.role.toLowerCase().includes(term) ||
          emp.department.toLowerCase().includes(term)
      )
    }

    // Filters
    if (filterDepartment)
      result = result.filter((e) => e.department === filterDepartment)
    if (filterContract)
      result = result.filter((e) => e.contract === filterContract)
    if (filterStatus) result = result.filter((e) => e.status === filterStatus)

    // Sort
    result.sort((a, b) => {
      const valA = a[sortKey].toLowerCase()
      const valB = b[sortKey].toLowerCase()
      const cmp = valA.localeCompare(valB)
      return sortDirection === "asc" ? cmp : -cmp
    })

    return result
  }, [
    searchTerm,
    filterDepartment,
    filterContract,
    filterStatus,
    sortKey,
    sortDirection,
  ])

  const totalPages = Math.max(
    1,
    Math.ceil(processedEmployees.length / ITEMS_PER_PAGE)
  )
  const paginatedEmployees = processedEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // KPIs use full dataset
  const kpis = [
    {
      label: "Effectif Total",
      value: String(employees.length),
      segments: [
        {
          id: "cdi",
          label: "CDI",
          value: employees.filter((e) => e.contract === "CDI").length,
          colorClass: "bg-primary",
        },
        {
          id: "cdd",
          label: "CDD",
          value: employees.filter((e) => e.contract === "CDD").length,
          colorClass: "bg-primary/55",
        },
        {
          id: "stage",
          label: "Stage",
          value: employees.filter((e) => e.contract === "Stage").length,
          colorClass: "bg-primary/30",
        },
      ],
    },
    {
      label: "Présents aujourd\u2019hui",
      value: `${Math.round((employees.filter((e) => e.status === "Actif" || e.status === "Télétravail").length / employees.length) * 100)}%`,
      segments: [
        {
          id: "p",
          label: "Présents",
          value: employees.filter((e) => e.status === "Actif").length,
          colorClass: "bg-primary",
        },
        {
          id: "t",
          label: "Télétravail",
          value: employees.filter((e) => e.status === "Télétravail").length,
          colorClass: "bg-primary/55",
        },
        {
          id: "a",
          label: "Absents",
          value: employees.filter((e) => e.status === "En congé").length,
          colorClass: "bg-primary/25",
        },
      ],
    },
    {
      label: "Congés en cours",
      value: String(employees.filter((e) => e.status === "En congé").length),
      segments: [
        {
          id: "cp",
          label: "En congé",
          value: employees.filter((e) => e.status === "En congé").length,
          colorClass: "bg-primary/60",
        },
        {
          id: "act",
          label: "Actifs",
          value: employees.filter((e) => e.status !== "En congé").length,
          colorClass: "bg-primary/20",
        },
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
          placeholder="Rechercher un collaborateur..."
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

          {/* Department Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-11 px-4",
                  filterDepartment && "border-foreground/30"
                )}
              >
                {filterDepartment ?? "Département"}
                <ChevronDown className="ml-1.5 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Département</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_DEPARTMENTS.map((dep) => (
                <DropdownMenuItem
                  key={dep}
                  onClick={() => {
                    setFilterDepartment(dep)
                    setCurrentPage(1)
                  }}
                >
                  {dep}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Contract Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-11 px-4",
                  filterContract && "border-foreground/30"
                )}
              >
                {filterContract ?? "Contrat"}
                <ChevronDown className="ml-1.5 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[140px]">
              <DropdownMenuLabel>Type de contrat</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_CONTRACTS.map((c) => (
                <DropdownMenuItem
                  key={c}
                  onClick={() => {
                    setFilterContract(c)
                    setCurrentPage(1)
                  }}
                >
                  {c}
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

          <Button className="h-11 px-4 shadow-none">Nouvel Employé</Button>
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
                  sortKeyName="name"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Poste & Service
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                <SortableHeader
                  label="Contrat"
                  sortKeyName="contract"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Statut
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                <SortableHeader
                  label="Ancienneté"
                  sortKeyName="joinDate"
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
            {paginatedEmployees.map((employee) => (
              <TableRow key={employee.id} className="group transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm leading-none font-medium text-foreground">
                        {employee.name}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        {employee.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">
                      {employee.role}
                    </span>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      {employee.department}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs font-medium",
                      employee.contract === "CDI" &&
                        "bg-primary/10 text-primary",
                      employee.contract === "CDD" && "bg-teal-50 text-teal-700",
                      employee.contract === "Stage" &&
                        "bg-slate-100 text-slate-600"
                    )}
                  >
                    {employee.contract}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        employee.status === "Actif" && "bg-emerald-500",
                        employee.status === "En congé" && "bg-amber-400",
                        employee.status === "Télétravail" && "bg-sky-400"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        employee.status === "Actif" && "text-emerald-700",
                        employee.status === "En congé" && "text-amber-600",
                        employee.status === "Télétravail" && "text-sky-600"
                      )}
                    >
                      {employee.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="text-sm">{employee.joinDate}</span>
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
                      <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="font-medium text-destructive">
                        Supprimer
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
          {processedEmployees.length === 0
            ? "Aucun résultat"
            : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}\u2013${Math.min(currentPage * ITEMS_PER_PAGE, processedEmployees.length)} sur ${processedEmployees.length} collaborateur${processedEmployees.length > 1 ? "s" : ""}`}
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

      {processedEmployees.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Aucun résultat
          </h3>
          <p className="mt-1 max-w-[280px] text-muted-foreground">
            Aucun collaborateur ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  )
}
