import {
  Mail,
  Zap,
  Archive,
  Users,
  Database,
  ShieldCheck,
  Share2,
  Search,
  Calendar,
  DollarSign,
  LineChart,
  Layers,
  Globe,
  RefreshCw,
  FileDown,
  ShoppingCart,
  Truck,
  FileText,
  Wallet,
  Store,
  BadgeDollarSign,
  Package,
  BarChart,
  Kanban,
  Clock,
  CheckCircle,
  MapPin,
  History,
  ClipboardList,
  LucideIcon,
} from "lucide-react"

export interface Benefit {
  readonly title: string
  readonly description: string
  readonly icon: LucideIcon
}

export interface ModuleLandingContent {
  readonly moduleName: string
  readonly description: string
  readonly benefits: readonly Benefit[]
  readonly accentColor?: string
}

export const moduleLandingData: Record<string, ModuleLandingContent> = {
  courrier: {
    moduleName: "Gestion de Courriers",
    description: "Centralisez et optimisez le traitement de vos courriers entrants et sortants pour une traçabilité totale.",
    accentColor: "sky",
    benefits: [
      {
        title: "Traitement Centralisé",
        description: "Gérez tous vos courriers depuis une interface unique et intuitive.",
        icon: Mail,
      },
      {
        title: "Suivi en Temps Réel",
        description: "Suivez l'état d'avancement et les responsabilités pour chaque pli.",
        icon: Zap,
      },
      {
        title: "Archivage Intelligent",
        description: "Conservez une trace numérique sécurisée de tous vos échanges officiels.",
        icon: Archive,
      },
      {
        title: "Collaboration Fluide",
        description: "Assignez des tâches et communiquez directement sur les dossiers de courrier.",
        icon: Users,
      },
    ],
  },
  ged: {
    moduleName: "Gestion Documentaire",
    description: "La solution complète pour stocker, partager et sécuriser l'ensemble de vos documents institutionnels.",
    accentColor: "emerald",
    benefits: [
      {
        title: "Stockage Centralisé",
        description: "Organisez vos fichiers dans une structure claire et accessible partout.",
        icon: Database,
      },
      {
        title: "Sécurité & Contrôle",
        description: "Gestion fine des droits d'accès et traçabilité des modifications.",
        icon: ShieldCheck,
      },
      {
        title: "Partage Collaboratif",
        description: "Travaillez ensemble sur les documents avec un workflow de validation.",
        icon: Share2,
      },
      {
        title: "Recherche Avancée",
        description: "Retrouvez n'importe quel document instantanément grâce à l'indexation intelligente.",
        icon: Search,
      },
    ],
  },
  rh: {
    moduleName: "Ressources Humaines",
    description: "Optimisez la gestion de votre capital humain avec une solution complète, intuitive et performante.",
    accentColor: "violet",
    benefits: [
      {
        title: "Gestion du Personnel",
        description: "Centralisez les dossiers employés, contrats et documents administratifs.",
        icon: Users,
      },
      {
        title: "Suivi des Congés",
        description: "Simplifiez le processus de demande et de validation des absences.",
        icon: Calendar,
      },
      {
        title: "Gestion de la Paie",
        description: "Automatez vos calculs salariaux et générez des bulletins de paie conformes.",
        icon: DollarSign,
      },
      {
        title: "Performance",
        description: "Pilotez les entretiens annuels et suivez l'évolution des compétences.",
        icon: LineChart,
      },
    ],
  },
  referentiel: {
    moduleName: "Référentiel de Données",
    description: "Maîtrisez vos données de base pour assurer la cohérence de l'information dans tout le système.",
    accentColor: "amber",
    benefits: [
      {
        title: "Base Centralisée",
        description: "Un point de vérité unique pour vos contacts, organisations et catégories.",
        icon: Layers,
      },
      {
        title: "Gouvernance des Données",
        description: "Maintenez la qualité et l'intégrité de vos référentiels critiques.",
        icon: Globe,
      },
      {
        title: "Synchronisation",
        description: "Propajez automatiquement les mises à jour aux autres modules.",
        icon: RefreshCw,
      },
      {
        title: "Import/Export",
        description: "Outil puissant pour intégrer des données externes ou exporter vos listes.",
        icon: FileDown,
      },
    ],
  },
  achats: {
    moduleName: "Gestion des Achats",
    description: "Pilotez vos dépenses et optimisez vos relations fournisseurs pour une meilleure rentabilité.",
    accentColor: "orange",
    benefits: [
      {
        title: "Cycle d'Achat",
        description: "De la demande de prix à la réception des commandes fournisseurs.",
        icon: ShoppingCart,
      },
      {
        title: "Suivi Logistique",
        description: "Gardez le contrôle sur les livraisons et les délais d'approvisionnement.",
        icon: Truck,
      },
      {
        title: "Gestion Budgétaire",
        description: "Surveillez vos enveloppes et évitez les dépassements de coûts.",
        icon: Wallet,
      },
      {
        title: "Base Fournisseurs",
        description: "Centralisez toutes les informations et contrats de vos partenaires commerciaux.",
        icon: FileText,
      },
    ],
  },
  ventes: {
    moduleName: "Gestion des Ventes",
    description: "Accélérez votre cycle commercial et développez votre activité avec nos outils de suivi des ventes.",
    accentColor: "rose",
    benefits: [
      {
        title: "Gestion des Devis",
        description: "Créez et envoyez des offres professionnelles en quelques secondes.",
        icon: Store,
      },
      {
        title: "Facturation Rapide",
        description: "Transformez vos commandes en factures et suivez les paiements.",
        icon: BadgeDollarSign,
      },
      {
        title: "Catalogue Produits",
        description: "Gérez vos articles, services et tarifs de manière centralisée.",
        icon: Package,
      },
      {
        title: "Analyse des Ventes",
        description: "Tableaux de bord pour suivre votre chiffre d'affaires et vos objectifs.",
        icon: BarChart,
      },
    ],
  },
  projets: {
    moduleName: "Gestion de Projets",
    description: "Planifiez, collaborez et livrez vos projets à temps grâce à des outils de suivi visuels.",
    accentColor: "indigo",
    benefits: [
      {
        title: "Planification Kanban",
        description: "Visualisez l'avancement de vos tâches avec des tableaux interactifs.",
        icon: Kanban,
      },
      {
        title: "Calendriers Partagés",
        description: "Respectez vos échéances avec une vue globale des jalons du projet.",
        icon: Clock,
      },
      {
        title: "Collaboration Équipe",
        description: "Partagez des ressources et communiquez au sein des équipes de projet.",
        icon: Users,
      },
      {
        title: "Suivi des Objectifs",
        description: "Mesurez le succès de vos projets avec des indicateurs de performance clairs.",
        icon: CheckCircle,
      },
    ],
  },
  visites: {
    moduleName: "Gestion des Visites",
    description: "Organisez vos déplacements terrain et assurez un suivi rigoureux de vos missions extérieurs.",
    accentColor: "teal",
    benefits: [
      {
        title: "Planning Terrain",
        description: "Optimisez vos tournées et planifiez vos interventions à l'avance.",
        icon: MapPin,
      },
      {
        title: "Calendrier de Mission",
        description: "Gérez l'agenda de vos agents terrain en toute simplicité.",
        icon: Calendar,
      },
      {
        title: "Historique Complet",
        description: "Conservez une trace de toutes les visites effectuées et de leurs résultats.",
        icon: History,
      },
      {
        title: "Rapports de Visite",
        description: "Saisissez vos comptes-rendus directement depuis le terrain.",
        icon: ClipboardList,
      },
    ],
  },
}
