export interface SidebarLink {
  name: string
  href?: string
  icon: string // icon key from the module's icon set
  items?: { name: string; href: string }[]
}

export interface ModuleConfig {
  slug: string
  label: string
  navbarTitle: string
  description: string
  accentColor: string // tailwind color class
  sidebarLinks: SidebarLink[]
  sidebarBottomLinks?: SidebarLink[]
  primaryAction?: {
    label: string
    href: string
  }
}

export const modules: ModuleConfig[] = [
  {
    slug: "courrier",
    label: "Courrier",
    navbarTitle: "Gestion de Courriers",
    description: "Gestion et suivi du courrier entrant et sortant",
    accentColor: "sky",
    primaryAction: {
      label: "Nouveau Courrier",
      href: "/courrier/register",
    },
    sidebarLinks: [
      { name: "Accueil", href: "/courrier", icon: "Home" },
      { name: "Boîte de réception", href: "/courrier/inbox", icon: "Inbox" },
      { name: "Brouillons", href: "/courrier/drafts", icon: "Drafts" },
      { name: "Envoyés", href: "/courrier/sent", icon: "Sent" },
      { name: "Favoris", href: "/courrier/favorites", icon: "Favorites" },
      { name: "Corbeille", href: "/courrier/trash", icon: "Trash" },
      { name: "Archives", href: "/courrier/archive", icon: "Archives" },
      { name: "Partenaires", href: "/courrier/correspondent", icon: "People" },
      { name: "Discussions", href: "/courrier/discussions", icon: "Message" },
    ],
    sidebarBottomLinks: [
      { name: "Paramètres", href: "/courrier/settings", icon: "Settings" },
    ],
  },
  {
    slug: "ged",
    label: "GED",
    navbarTitle: "Gestion Documentaire",
    description: "Gestion électronique des documents",
    accentColor: "emerald",
    primaryAction: {
      label: "Nouveau Document",
      href: "/ged/upload",
    },
    sidebarLinks: [
      { name: "Accueil", href: "/ged", icon: "Home" },
      { name: "Mes Documents", href: "/ged/documents", icon: "Folder" },
      { name: "Partagés", href: "/ged/shared", icon: "Share" },
      { name: "Récents", href: "/ged/recent", icon: "Clock" },
      { name: "Favoris", href: "/ged/favorites", icon: "Favorites" },
      { name: "Corbeille", href: "/ged/trash", icon: "Trash" },
    ],
    sidebarBottomLinks: [
      { name: "Paramètres", href: "/ged/settings", icon: "Settings" },
    ],
  },
  {
    slug: "rh",
    label: "RH",
    navbarTitle: "Ressources Humaines",
    description: "Gestion du personnel et des ressources humaines",
    accentColor: "violet",
    primaryAction: {
      label: "Nouveau Collaborateur",
      href: "/rh/employees/new",
    },
    sidebarLinks: [
      { name: "Accueil", href: "/rh", icon: "Home" },
      {
        name: "Organisation",
        icon: "Building",
        items: [
          { name: "Collaborateurs", href: "/rh/employees" },
          { name: "Équipes", href: "/rh/teams" },
          { name: "Entreprise", href: "/rh/company" },
          { name: "Organigramme", href: "/rh/org-chart" },
        ],
      },
      {
        name: "Présences",
        icon: "Check",
        items: [
          { name: "Présences", href: "/rh/attendance" },
          { name: "Outil de présence", href: "/rh/attendance-tool" },
          { name: "Demande de présence", href: "/rh/attendance-request" },
          { name: "Importer présences", href: "/rh/upload-attendance" },
          { name: "Pointage collaborateur", href: "/rh/employee-checkin" },
          { name: "Présence automatique", href: "/rh/auto-attendance" },
          { name: "Intégration Biométrique", href: "/rh/biometric-integration" },
        ],
      },
      {
        name: "Plannings",
        icon: "Clock",
        items: [
          { name: "Gestion des horaires", href: "/rh/shift-management" },
          { name: "Types d'horaires", href: "/rh/shift-type" },
          { name: "Lieux de travail", href: "/rh/shift-location" },
          { name: "Demandes d'horaires", href: "/rh/shift-request" },
          { name: "Assignations", href: "/rh/shift-assignment" },
          { name: "Emplois du temps", href: "/rh/shift-schedule" },
          { name: "Attributions d'emploi", href: "/rh/shift-schedule-assignment" },
          { name: "Outil d'attribution", href: "/rh/shift-assignment-tool" },
          { name: "Roster", href: "/rh/roster" },
        ],
      },
      {
        name: "Gestion des Congés",
        icon: "Calendar",
        items: [
          { name: "Congés", href: "/rh/leaves" },
          { name: "Ajustements", href: "/rh/leave-adjustment" },
          { name: "Jours fériés", href: "/rh/holiday-list" },
          { name: "Assignation jours fériés", href: "/rh/holiday-list-assignment" },
          { name: "Types de congés", href: "/rh/leave-type" },
          { name: "Périodes", href: "/rh/leave-period" },
          { name: "Politiques", href: "/rh/leave-policy" },
          { name: "Assignation politiques", href: "/rh/leave-policy-assignment" },
          { name: "Panneau de contrôle", href: "/rh/leave-control-panel" },
          { name: "Demandes de congés", href: "/rh/leave-application" },
          { name: "Congés compensatoires", href: "/rh/compensatory-leave-request" },
          { name: "Monétisation", href: "/rh/leave-encashment" },
          { name: "Périodes bloquées", href: "/rh/leave-block-list" },
          { name: "Allocations", href: "/rh/leave-allocation" },
          { name: "Congés acquis", href: "/rh/earned-leaves" },
          { name: "Saisie de registre", href: "/rh/leave-ledger-entry" },
          { name: "Rapport de registre", href: "/rh/leave-ledger-report" },
        ],
      },
      {
        name: "Paie",
        icon: "Payroll",
        items: [
          { name: "Paramètres de paie", href: "/rh/payroll/setup" },
          { name: "Gestion de la paie", href: "/rh/payroll/management" },
          { name: "Périodes de paie", href: "/rh/payroll/period" },
          { name: "Barèmes d'impôts", href: "/rh/payroll/tax-slab" },
          { name: "Éléments de salaire", href: "/rh/payroll/components" },
          { name: "Structures salariales", href: "/rh/payroll/structures" },
          { name: "Assignations", href: "/rh/payroll/assignments" },
          { name: "Outil d'assignation", href: "/rh/payroll/assignment-tool" },
          { name: "Bulletins de paie", href: "/rh/payroll/slips" },
          { name: "Écritures de paie", href: "/rh/payroll/entries" },
          { name: "Salaires additionnels", href: "/rh/payroll/additional" },
          { name: "Primes de rétention", href: "/rh/payroll/retention-bonus" },
          { name: "Primes d'incitation", href: "/rh/payroll/incentives" },
        ],
      },
      {
        name: "Performances",
        icon: "Performance",
        items: [
          { name: "Modèles d'évaluation", href: "/rh/performance/appraisal-template" },
          { name: "Cycles d'évaluation", href: "/rh/performance/appraisal-cycle" },
          { name: "Évaluations", href: "/rh/performance/appraisals" },
          { name: "Feedback collaborateur", href: "/rh/performance/feedback" },
          { name: "Objectifs", href: "/rh/performance/goals" },
          { name: "Rapport d'ensemble", href: "/rh/performance/overview" },
        ],
      },
      {
        name: "Formations",
        icon: "Training",
        items: [
          { name: "Programmes", href: "/rh/training/programs" },
          { name: "Événements", href: "/rh/training/events" },
          { name: "Résultats", href: "/rh/training/results" },
          { name: "Feedback", href: "/rh/training/feedback" },
        ],
      },
      { name: "Documents", href: "/rh/documents", icon: "Documents" },
      {
        name: "Recrutement",
        icon: "UserPlus",
        items: [
          { name: "Plan d'effectifs", href: "/rh/recruitment/staffing-plan" },
          { name: "Demande de poste", href: "/rh/recruitment/requisition" },
          { name: "Offre d'emploi", href: "/rh/recruitment/opening" },
          { name: "Portail d'emploi", href: "/rh/recruitment/portal" },
          { name: "Candidats", href: "/rh/recruitment/applicants" },
          { name: "Gestion des entretiens", href: "/rh/recruitment/interviews" },
          { name: "Types d'entretien", href: "/rh/recruitment/interview-types" },
          { name: "Tableaux d'offre", href: "/rh/recruitment/job-offer" },
          { name: "Lettres de nomination", href: "/rh/recruitment/appointment-letter" },
          { name: "Cooptation", href: "/rh/recruitment/referral" },
        ],
      },
      {
        name: "Cycle de vie",
        icon: "UserPlus",
        items: [
          { name: "Gestion du cycle de vie", href: "/rh/lifecycle" },
          { name: "Onboarding", href: "/rh/lifecycle/onboarding" },
          { name: "Promotions", href: "/rh/lifecycle/promotion" },
          { name: "Départs / Séparations", href: "/rh/lifecycle/separation" },
          { name: "Transferts", href: "/rh/lifecycle/transfer" },
          { name: "Compétences (Skill Map)", href: "/rh/lifecycle/skills" },
          { name: "Entretien de départ", href: "/rh/lifecycle/exit-interview" },
          { name: "Solde de tout compte", href: "/rh/lifecycle/final-statement" },
        ],
      },
      {
        name: "Frais & Déplacements",
        icon: "Expenses",
        items: [
          { name: "Avances sur salaire", href: "/rh/expenses/advance" },
          { name: "Notes de frais", href: "/rh/expenses/claims" },
          { name: "Multi-devises", href: "/rh/expenses/multi-currency" },
          { name: "Demandes de voyage", href: "/rh/expenses/travel" },
        ],
      },
      { name: "Paramètres", href: "/rh/settings", icon: "Settings" },
    ],
    sidebarBottomLinks: [],
  },

  {
    slug: "referentiel",
    label: "Référentiel",
    navbarTitle: "Référentiel de Données",
    description: "Base de données et référentiels centralisés",
    accentColor: "amber",
    sidebarLinks: [
      { name: "Accueil", href: "/referentiel", icon: "Home" },
      { name: "Contacts", href: "/referentiel/contacts", icon: "People" },
      { name: "Organisations", href: "/referentiel/organizations", icon: "Building" },
      { name: "Catégories", href: "/referentiel/categories", icon: "Tag" },
      { name: "Import / Export", href: "/referentiel/import-export", icon: "Transfer" },
    ],
    sidebarBottomLinks: [
      { name: "Paramètres", href: "/referentiel/settings", icon: "Settings" },
    ],
  },
  {
    slug: "achats",
    label: "Achats",
    navbarTitle: "Gestion des Achats",
    description: "Suivi des achats et commandes fournisseurs",
    accentColor: "orange",
    primaryAction: {
      label: "Nouvelle Commande",
      href: "/achats/new",
    },
    sidebarLinks: [
      { name: "Accueil", href: "/achats", icon: "Home" },
      { name: "Commandes", href: "/achats/orders", icon: "Cart" },
      { name: "Fournisseurs", href: "/achats/suppliers", icon: "Building" },
      { name: "Bons de commande", href: "/achats/purchase-orders", icon: "FileText" },
      { name: "Factures", href: "/achats/invoices", icon: "Receipt" },
      { name: "Budget", href: "/achats/budget", icon: "Wallet" },
    ],
    sidebarBottomLinks: [
      { name: "Paramètres", href: "/achats/settings", icon: "Settings" },
    ],
  },
  {
    slug: "ventes",
    label: "Ventes",
    navbarTitle: "Gestion des Ventes",
    description: "Suivi commercial et gestion des ventes",
    accentColor: "rose",
    primaryAction: {
      label: "Nouvelle Vente",
      href: "/ventes/new",
    },
    sidebarLinks: [
      { name: "Accueil", href: "/ventes", icon: "Home" },
      { name: "Devis", href: "/ventes/quotes", icon: "FileText" },
      { name: "Factures", href: "/ventes/invoices", icon: "Receipt" },
      { name: "Clients", href: "/ventes/clients", icon: "People" },
      { name: "Produits", href: "/ventes/products", icon: "Package" },
      { name: "Statistiques", href: "/ventes/stats", icon: "Chart" },
    ],
    sidebarBottomLinks: [
      { name: "Paramètres", href: "/ventes/settings", icon: "Settings" },
    ],
  },
  {
    slug: "projets",
    label: "Projets",
    navbarTitle: "Gestion de Projets",
    description: "Planification et suivi des projets",
    accentColor: "indigo",
    primaryAction: {
      label: "Nouveau Projet",
      href: "/projets/new",
    },
    sidebarLinks: [
      { name: "Accueil", href: "/projets", icon: "Home" },
      { name: "Mes Projets", href: "/projets/list", icon: "Kanban" },
      { name: "Tâches", href: "/projets/tasks", icon: "Check" },
      { name: "Calendrier", href: "/projets/calendar", icon: "Calendar" },
      { name: "Équipes", href: "/projets/teams", icon: "People" },
      { name: "Rapports", href: "/projets/reports", icon: "Chart" },
    ],
    sidebarBottomLinks: [
      { name: "Paramètres", href: "/projets/settings", icon: "Settings" },
    ],
  },
  {
    slug: "visites",
    label: "Visites",
    navbarTitle: "Gestion des Visites",
    description: "Planification et suivi des visites terrain",
    accentColor: "teal",
    primaryAction: {
      label: "Nouvelle Visite",
      href: "/visites/new",
    },
    sidebarLinks: [
      { name: "Accueil", href: "/visites", icon: "Home" },
      { name: "Planning", href: "/visites/planning", icon: "Calendar" },
      { name: "En cours", href: "/visites/active", icon: "MapPin" },
      { name: "Historique", href: "/visites/history", icon: "Clock" },
      { name: "Rapports", href: "/visites/reports", icon: "FileText" },
      { name: "Lieux", href: "/visites/locations", icon: "Map" },
    ],
    sidebarBottomLinks: [
      { name: "Paramètres", href: "/visites/settings", icon: "Settings" },
    ],
  },
]

export function getModuleBySlug(slug: string): ModuleConfig | undefined {
  return modules.find((m) => m.slug === slug)
}

export function getModuleFromPathname(pathname: string): ModuleConfig | undefined {
  // Extract the first segment after /
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return modules[0] // default to Courrier
  return modules.find((m) => m.slug === segments[0]) || modules[0]
}
