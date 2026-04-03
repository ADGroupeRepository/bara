"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  MapPin,
  Users,
  X,
  MoreVertical,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { TeamDialog } from "./team-dialog"

// --- Types ---
interface Team {
  readonly id: string
  readonly name: string
  readonly manager: {
    readonly name: string
    readonly avatar: string
    readonly role: string
  }
  readonly membersCount: number
  readonly location: string
  readonly status: "Actif" | "En pause"
  readonly lastActivity: string
}

type SortKey = "name" | "membersCount" | "location" | "lastActivity"
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
      {isActive && sortDirection === "asc" && (
        <ChevronUp className="h-3.5 w-3.5" />
      )}
      {isActive && sortDirection === "desc" && (
        <ChevronDown className="h-3.5 w-3.5" />
      )}
      {!isActive && <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />}
    </button>
  )
}

// --- Mock Data ---
const teams: Team[] = [
  {
    id: "TEAM001",
    name: "Développement Frontend",
    manager: {
      name: "Jean Dupont",
      role: "Responsable IT",
      avatar: "/homme02.png",
    },
    membersCount: 8,
    location: "Abidjan - Plateau",
    status: "Actif",
    lastActivity: "Aujourd'hui",
  },
  {
    id: "TEAM002",
    name: "Ressources Humaines",
    manager: {
      name: "Fatou Bamba",
      role: "Responsable RH",
      avatar: "/femme01.png",
    },
    membersCount: 5,
    location: "Abidjan - Cocody",
    status: "Actif",
    lastActivity: "Aujourd'hui",
  },
  {
    id: "TEAM003",
    name: "Finance & Comptabilité",
    manager: {
      name: "Amadou Diallo",
      role: "Comptable Principal",
      avatar: "/homme03.png",
    },
    membersCount: 12,
    location: "Abidjan - Plateau",
    status: "Actif",
    lastActivity: "Hier",
  },
  {
    id: "TEAM004",
    name: "Communication & Marketing",
    manager: {
      name: "Marie Kouao",
      role: "Chargée de Communication",
      avatar: "/femme01.png",
    },
    membersCount: 6,
    location: "Abidjan - Cocody",
    status: "Actif",
    lastActivity: "Il y a 2 jours",
  },
  {
    id: "TEAM005",
    name: "Logistique & Transport",
    manager: {
      name: "Ibrahim Coulibaly",
      role: "Agent Logistique",
      avatar: "/homme01.png",
    },
    membersCount: 15,
    location: "San Pedro",
    status: "Actif",
    lastActivity: "Aujourd'hui",
  },
  {
    id: "TEAM006",
    name: "Infrastructure Cloud",
    manager: {
      name: "Oumar Touré",
      role: "Développeur Full-Stack",
      avatar: "/homme01.png",
    },
    membersCount: 4,
    location: "Télétravail",
    status: "En pause",
    lastActivity: "Il y a 1 semaine",
  },
]

const ITEMS_PER_PAGE = 8
const ALL_LOCATIONS = [...new Set(teams.map((t) => t.location))]

export function TeamsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLocation, setFilterLocation] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const hasActiveFilters = filterLocation || searchTerm

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  function clearFilters() {
    setFilterLocation(null)
    setSearchTerm("")
    setCurrentPage(1)
  }

  const processedTeams = useMemo(() => {
    let result = [...teams]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.manager.name.toLowerCase().includes(term) ||
          t.location.toLowerCase().includes(term)
      )
    }

    if (filterLocation) {
      result = result.filter((t) => t.location === filterLocation)
    }

    result.sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]

      if (typeof valA === "string" && typeof valB === "string") {
        const cmp = valA.toLowerCase().localeCompare(valB.toLowerCase())
        return sortDirection === "asc" ? cmp : -cmp
      }
      
      const cmp = (valA as number) - (valB as number)
      return sortDirection === "asc" ? cmp : -cmp
    })

    return result
  }, [searchTerm, filterLocation, sortKey, sortDirection])

  const paginatedTeams = processedTeams.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const kpis = [
    {
      label: "Total Équipes",
      value: String(teams.length),
      segments: [
        { id: "a", label: "Actives", value: teams.filter(t => t.status === "Actif").length, colorClass: "bg-primary" },
        { id: "p", label: "En pause", value: teams.filter(t => t.status === "En pause").length, colorClass: "bg-primary/30" },
      ],
    },
    {
      label: "Effectif des Équipes",
      value: String(teams.reduce((acc, t) => acc + t.membersCount, 0)),
      segments: [
        { id: "p", label: "Abidjan", value: teams.filter(t => t.location.includes("Abidjan")).reduce((acc, t) => acc + t.membersCount, 0), colorClass: "bg-primary" },
        { id: "o", label: "Autres", value: teams.filter(t => !t.location.includes("Abidjan")).reduce((acc, t) => acc + t.membersCount, 0), colorClass: "bg-primary/40" },
      ],
    },
    {
      label: "Taille Moyenne",
      value: (teams.reduce((acc, t) => acc + t.membersCount, 0) / teams.length).toFixed(1),
      segments: [
        { id: "m", label: "Moyenne", value: 100, colorClass: "bg-primary/50" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="h-10 w-[380px]">
          <InputGroupAddon>
            <Search className="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Rechercher une équipe ou un manager..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </InputGroup>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-10 text-muted-foreground"
            >
              <X className="h-4 w-4" />
              Réinitialiser
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-10 px-4",
                  filterLocation && "border-foreground/30"
                )}
              >
                {filterLocation ?? "Localisation"}
                <ChevronDown className="ml-1.5 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filtrer par lieu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_LOCATIONS.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => {
                    setFilterLocation(loc)
                    setCurrentPage(1)
                  }}
                >
                  {loc}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <TeamDialog />
        </div>
      </div>

      {/* Table Section */}
      <ScrollArea className="h-[calc(100vh-415px)] overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px] font-semibold text-foreground pl-4">
                <SortableHeader
                  label="Équipe"
                  sortKeyName="name"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Responsable
              </TableHead>
              <TableHead className="font-semibold text-foreground text-center">
                <SortableHeader
                  label="Membres"
                  sortKeyName="membersCount"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                <SortableHeader
                  label="Localisation"
                  sortKeyName="location"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Statut
              </TableHead>
              <TableHead className="text-right font-semibold text-foreground pr-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTeams.map((team) => (
              <TableRow key={team.id} className="group transition-colors">
                <TableCell className="pl-4 font-medium text-foreground">
                  {team.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7 border border-border">
                      <AvatarImage src={team.manager.avatar} alt={team.manager.name} />
                      <AvatarFallback className="text-[10px] bg-muted">
                        {team.manager.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">{team.manager.name}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5">{team.manager.role}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="px-2.5 py-0.5 h-6">
                    {team.membersCount} membres
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-sm">{team.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        team.status === "Actif" ? "bg-primary" : "bg-muted-foreground/30"
                      )}
                    />
                    <span className={cn(
                      "text-sm font-medium",
                      team.status === "Actif" ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {team.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-4">
                  <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {processedTeams.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
             <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Aucune équipe trouvée</h3>
          <p className="text-muted-foreground max-w-xs mt-1">
            Ajustez vos filtres ou effectuez une nouvelle recherche pour trouver ce que vous cherchez.
          </p>
        </div>
      )}
    </div>
  )
}
