"use client"

import { useState } from "react"
import {
  Search,
  Network,
  Download,
  Maximize2,
  Minimize2,
  Building2,
  Layers,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { KpiCard } from "@/components/ui/kpi-card"
import { cn } from "@/lib/utils"

// --- Types ---
interface OrgNode {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly avatar: string
  readonly department: string
  readonly level: number
  readonly children?: OrgNode[]
}

// --- Mock Data ---
const orgData: OrgNode = {
  id: "1",
  name: "Siaka Sylla",
  role: "Directeur Général",
  avatar: "/homme01.png",
  department: "Direction Générale",
  level: 0,
  children: [
    {
      id: "2",
      name: "Sarah Koné",
      role: "Directrice RH",
      avatar: "/femme02.png",
      department: "Ressources Humaines",
      level: 1,
      children: [
        {
          id: "3",
          name: "Fatou Bamba",
          role: "Responsable Paie",
          avatar: "/femme01.png",
          department: "Ressources Humaines",
          level: 2,
        },
        {
          id: "4",
          name: "Amadou Diallo",
          role: "Chargé Recrutement",
          avatar: "/homme03.png",
          department: "Ressources Humaines",
          level: 2,
        },
      ],
    },
    {
      id: "5",
      name: "Paul Konan",
      role: "Directeur Technique",
      avatar: "/homme02.png",
      department: "Informatique",
      level: 1,
      children: [
        {
          id: "6",
          name: "Oumar Touré",
          role: "Lead Developer",
          avatar: "/homme01.png",
          department: "Informatique",
          level: 2,
        },
        {
          id: "7",
          name: "Jean Dupont",
          role: "Fullstack Dev",
          avatar: "/homme02.png",
          department: "Informatique",
          level: 2,
        },
      ],
    },
  ],
}

function OrgCard({ node, isSelected }: { readonly node: OrgNode; readonly isSelected?: boolean }) {
  const getLevelStyles = (level: number) => {
    switch (level) {
      case 0: return "border-primary bg-primary/5 ring-4 ring-primary/10 shadow-lg shadow-primary/5"
      case 1: return "border-blue-200 bg-blue-50/30"
      default: return "border-border bg-card"
    }
  }

  const getRoleBadge = (level: number) => {
    switch (level) {
      case 0: return "bg-primary text-primary-foreground"
      case 1: return "bg-blue-100 text-blue-700"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getLevelColor = (level: number) => {
    if (level === 0) return "bg-primary"
    if (level === 1) return "bg-blue-500"
    return "bg-muted-foreground/30"
  }

  return (
    <div className={cn(
      "relative group flex flex-col items-center border rounded-2xl p-4 transition-all duration-300 w-[200px] hover:-translate-y-1 hover:shadow-xl",
      getLevelStyles(node.level),
      isSelected && "ring-2 ring-orange-500 border-orange-500 scale-105 z-20"
    )}>
      {/* level indicator dot */}
      <div className={cn("absolute -top-1.5 h-3 w-3 rounded-full border-2 border-background", getLevelColor(node.level))} />
      
      <Avatar className={cn(
        "h-14 w-14 border-2 border-background shadow-sm mb-3 transition-transform duration-300 group-hover:scale-110",
        node.level === 0 && "h-16 w-16"
      )}>
        <AvatarImage src={node.avatar} alt={node.name} />
        <AvatarFallback className="text-lg font-bold">{node.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
      </Avatar>

      <div className="text-center w-full">
        <h4 className="text-sm font-bold text-foreground truncate px-1">{node.name}</h4>
        <div className={cn(
          "mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
          getRoleBadge(node.level)
        )}>
          {node.role}
        </div>
        
        <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 px-1">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-3 w-3 text-muted-foreground/60" />
            <span className="text-[10px] font-medium text-muted-foreground line-clamp-1">{node.department}</span>
          </div>
          <ArrowRight className="h-3 w-3 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  )
}

function OrgTree({ node, searchTerm }: { readonly node: OrgNode; readonly searchTerm: string }) {
  const isMatch = searchTerm && (
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col items-center">
      <OrgCard node={node} isSelected={!!isMatch} />
      
      {node.children && node.children.length > 0 && (
        <div className="relative pt-10 flex items-start gap-4">
          {/* Vertical line from parent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-10 bg-linear-to-b from-border to-border/40" />
          
          {/* Horizontal connecting line wrapping */}
          {node.children.length > 1 && (
            <div className="absolute top-10 left-[100px] right-[100px] h-px bg-border/40" />
          )}

          {node.children.map((child) => (
            <div key={child.id} className="relative pt-0">
              {/* Vertical line to child */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-border/40" />
              <OrgTree node={child} searchTerm={searchTerm} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function OrgChart() {
  const [searchTerm, setSearchTerm] = useState("")
  const [zoom, setZoom] = useState(85)

  const kpis = [
    {
      label: "Effectif Total",
      value: "45",
      segments: [
        { id: "h", label: "Hommes", value: 25, colorClass: "bg-blue-500" },
        { id: "f", label: "Femmes", value: 20, colorClass: "bg-pink-400" },
      ],
    },
    {
      label: "Équipes",
      value: "12",
      segments: [
        { id: "ops", label: "Operations", value: 50, colorClass: "bg-indigo-500" },
        { id: "admin", label: "Admin", value: 50, colorClass: "bg-amber-400" },
      ],
    },
    {
      label: "Niveaux de Hiérarchie",
      value: "04",
      segments: [
        { id: "dir", label: "Direction", value: 25, colorClass: "bg-primary" },
        { id: "emp", label: "Staff", value: 75, colorClass: "bg-primary/10" },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full w-full min-w-0 overflow-hidden space-y-0">
      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            mainValue={kpi.value}
            mainValueLabel={kpi.label}
            segments={kpi.segments}
          />
        ))}
      </div>

      {/* Toolbar - Modern Glass Look */}
      <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Rechercher un talent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full sm:w-[280px] md:w-[360px] pl-10 bg-background/50 border-border/60 hover:border-border transition-all focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-xl p-1 bg-muted/30">
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))} className="h-9 w-9 rounded-lg hover:bg-background">
              <Minimize2 className="h-4 w-4" />
            </Button>
            <div className="px-2">
              <span className="text-[11px] font-bold text-muted-foreground tabular-nums">{zoom}%</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(150, zoom + 10))} className="h-9 w-9 rounded-lg hover:bg-background">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" className="h-11 px-4 gap-2 rounded-xl">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exporter</span>
          </Button>
          <Button className="h-11 px-6 bg-primary gap-2 rounded-xl shadow-lg shadow-primary/20">
            <Network className="h-4 w-4" />
            <span className="hidden sm:inline">Vue Complète</span>
          </Button>
        </div>
      </div>

      {/* Org Chart Drawing Area */}
      <div className="flex-1 min-h-0 h-[calc(100vh-435px)] rounded-3xl border border-border/50 bg-[#FBFBFC] dark:bg-muted/10 relative overflow-auto shadow-inner">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px] opacity-40 pointer-events-none" />
        
        <div 
          className="inline-block min-w-full p-20 transition-all duration-500 ease-out text-center"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          <div className="inline-flex flex-col items-center">
            <OrgTree node={orgData} searchTerm={searchTerm} />
          </div>
        </div>
      </div>

      {/* Modern Legend Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-5 gap-4">
        <div className="flex items-center gap-5 p-1.5 px-4 rounded-full bg-muted/20 border border-border/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Direction</span>
          </div>
          <div className="flex items-center gap-2 border-l border-border/40 pl-5">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Managers</span>
          </div>
          <div className="flex items-center gap-2 border-l border-border/40 pl-5">
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Collaborateurs</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground/60 bg-muted/10 px-3 py-1 rounded-md">
          <Layers className="h-3 w-3" />
          <span>Calcul de la structure en cours...</span>
        </div>
      </div>
    </div>
  )
}
