// ─── Types ────────────────────────────────────────────────────────────────────

export type EmployeeContact = {
  nom: string
  relation: string
  telephone: string
}

export type PaymentMethod = {
  mode: string
  banque?: string
  numeroCompte?: string
  rib?: string
  telephone?: string
  operateur?: string
  estPrincipal: boolean
}

export type EmployeeDocument = {
  id: string
  label: string
  fileName: string
  fileSize: string
  uploadedAt: string
}

export type FolderDocument = {
  id: string
  name: string
  status: "Complet" | "Incomplet"
  updatedAt: string
  files: EmployeeDocument[]
}

export type ParcoursAcademique = {
  id: string
  diplome: string
  etablissement: string
  domaine: string
  dateDebut: string
  dateFin: string
  statut: "Obtenu" | "En cours" | "Abandonné"
  documentUrl?: string
}

export type ExperienceProfessionnelle = {
  id: string
  poste: string
  employeur: string
  lieu: string
  dateDebut: string
  dateFin: string
  description: string
}

export type SalaryRecord = {
  id: string
  periode: string
  montantNet: string
  datePaiement: string
  statut: "Payé" | "En attente" | "Annulé"
  mode: string
}

export type EmployeeProfile = {
  id: string
  // Identité
  civilite: string
  nom: string
  prenom: string
  dateNaissance: string
  lieuNaissance: string
  nationalite: string
  genre: string
  situationMatrimoniale: string
  nombreEnfants: number
  avatar: string
  // Coordonnées
  adresse: string
  ville: string
  codePostal: string
  pays: string
  telephonePersonnel: string
  telephoneProfessionnel: string
  emailPersonnel: string
  emailProfessionnel: string
  contactsUrgence: EmployeeContact[]
  // Professionnel
  matricule: string
  poste: string
  departement: string
  superieurHierarchique: string
  dateEmbauche: string
  typeContrat: string
  dateFinContrat?: string
  periodeEssai: string
  statut: "Actif" | "En congé" | "Télétravail" | "Suspendu"
  // Rémunération (Standard Ivoirien)
  salaireBase: string // Salaire de base (Catégoriel / Grille)
  sursalaire: string   // Sursalaire (Négocié)
  tauxHoraire: string   // Base horaire
  devise: string
  frequencePaiement: string
  methodesPaiement: PaymentMethod[]
  // Documents
  typeDocumentIdentite: string
  numeroCni: string
  dateExpirationCni: string
  numeroSecuriteSociale: string
  numeroFiscal: string
  documents: EmployeeDocument[]
  folderDocuments: FolderDocument[]
  // Formation
  niveauEtudes: string
  diplome: string
  etablissement: string
  anneeObtention: string
  parcoursAcademique: ParcoursAcademique[]
  experiencesProfessionnelles: ExperienceProfessionnelle[]
  competences: string[]
  langues: string[]
  certifications: string[]
  // Company & Organisation
  grade: string
  site: string
  // Notes
  notesInternes: string
  aptitudeMedicale: string
  handicapDeclare: boolean
  historiqueSalaires: SalaryRecord[]
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MOCK_EMPLOYEES: Record<string, EmployeeProfile> = {
  EMP001: {
    id: "EMP001",
    civilite: "M.",
    nom: "Sylla",
    prenom: "Siaka",
    dateNaissance: "15/03/1985",
    lieuNaissance: "Abidjan",
    nationalite: "Ivoirienne",
    genre: "Masculin",
    situationMatrimoniale: "Marié(e)",
    nombreEnfants: 3,
    avatar: "/homme01.png",
    adresse: "Cocody Riviera Palmeraie, Rue J15",
    ville: "Abidjan",
    codePostal: "01 BP 3456",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 89 45 12",
    telephoneProfessionnel: "+225 27 22 41 00",
    emailPersonnel: "siaka.sylla@gmail.com",
    emailProfessionnel: "s.sylla@cnf.ci",
    contactsUrgence: [
      { nom: "Aminata Sylla", relation: "Conjoint(e)", telephone: "+225 07 56 78 90" },
      { nom: "Moussa Sylla", relation: "Parent", telephone: "+225 07 12 34 56" },
    ],
    matricule: "MAT-2020-001",
    poste: "Directeur Général",
    departement: "Direction",
    superieurHierarchique: "Conseil d'Administration",
    dateEmbauche: "01/01/2020",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "Actif",
    // Rémunération
    salaireBase: "450 000",
    sursalaire: "1 500 000",
    tauxHoraire: "12 500",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "SGBCI",
        numeroCompte: "CI93 0001 0001 0000 0000 0123",
        rib: "SGBCI CI AB",
        estPrincipal: true,
      },
      {
        mode: "Mobile Money",
        operateur: "Orange Money",
        telephone: "+225 07 89 45 12",
        estPrincipal: false,
      },
    ],
    numeroCni: "CI-1985-0315-ABI-001",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "15/03/2030",
    numeroSecuriteSociale: "CNPS-1234567890",
    numeroFiscal: "IFU-CI-2020-00456",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Sylla_Siaka.pdf", fileSize: "2.1 Mo", uploadedAt: "01/01/2020" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Sylla.pdf", fileSize: "1.4 Mo", uploadedAt: "01/01/2020" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Sylla_Siaka.pdf", fileSize: "0.8 Mo", uploadedAt: "01/01/2020" },
    ],
    folderDocuments: [
      { 
        id: "extrait-naissance", 
        name: "Extrait d'acte de naissance des enfants", 
        status: "Incomplet", 
        updatedAt: "02/03/2026 à 11:53",
        files: [
          { id: "en-1", label: "Extrait Naissance Enfant 1", fileName: "naissance_1.pdf", fileSize: "1.2 Mo", uploadedAt: "02/03/2026" },
        ]
      },
      { 
        id: "diplomes", 
        name: "Diplômes", 
        status: "Incomplet", 
        updatedAt: "09/01/2026 à 14:37",
        files: [
          { id: "pa-1", label: "Master Management", fileName: "Master_Management.pdf", fileSize: "2.1 Mo", uploadedAt: "09/01/2026" },
          { id: "pa-2", label: "Licence Économie", fileName: "Licence_Eco.pdf", fileSize: "1.8 Mo", uploadedAt: "09/01/2026" },
        ]
      },
      { 
        id: "cni", 
        name: "Carte nationale d'identité", 
        status: "Incomplet", 
        updatedAt: "09/01/2026 à 14:38",
        files: [
          { id: "cni-1", label: "CNI Recto-Verso", fileName: "CNI_Siaka_Sylla.pdf", fileSize: "1.4 Mo", uploadedAt: "09/01/2026" },
        ]
      },
      { 
        id: "arrete-fonction", 
        name: "Arrêté de nomination dans la fonction", 
        status: "Incomplet", 
        updatedAt: "09/01/2026 à 14:37",
        files: []
      },
      { 
        id: "arrete-emploi", 
        name: "Arrêté de nomination dans l'emploi", 
        status: "Complet", 
        updatedAt: "09/01/2026 à 14:39",
        files: [
          { id: "ae-1", label: "Arrêté Nomination DG", fileName: "Arrete_DG_Sylla.pdf", fileSize: "0.9 Mo", uploadedAt: "09/01/2026" },
        ]
      },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Management des Organisations",
    etablissement: "CESAG – Dakar",
    anneeObtention: "2010",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master en Management des Organisations", etablissement: "CESAG - Dakar", domaine: "Management", dateDebut: "2008", dateFin: "2010", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence en Économie", etablissement: "Université FHB", domaine: "Économie", dateDebut: "2005", dateFin: "2008", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Directeur Général", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Jan 2020", dateFin: "Présent", description: "Direction de l'entreprise et gestion stratégique." },
      { id: "ep-2", poste: "Manager Stratégie", employeur: "KPMG", lieu: "Dakar, Sénégal", dateDebut: "Fév 2015", dateFin: "Déc 2019", description: "Conseil en stratégie pour de grands groupes africains." },
      { id: "ep-3", poste: "Consultant Junior", employeur: "Deloitte", lieu: "Abidjan, CI", dateDebut: "Août 2010", dateFin: "Jan 2015", description: "Audit et conseil en gestion." },
    ],
    competences: ["Leadership", "Management stratégique", "Gestion de projet", "Finances publiques"],
    langues: ["Français", "Anglais", "Dioula"],
    certifications: ["PMP (Project Management Professional)", "ITIL v4 Foundation"],
    grade: "Sénior",
    site: "Siège Social",
    notesInternes: "Collaborateur exemplaire avec une forte capacité de leadership. A mené avec succès la transformation digitale de l'organisation en 2023. Envisagé pour un programme de formation continue en 2025.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "2 250 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "2 250 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "2 250 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP002: {
    id: "EMP002",
    civilite: "M.",
    nom: "Dupont",
    prenom: "Jean",
    dateNaissance: "22/07/1990",
    lieuNaissance: "Bouaké",
    nationalite: "Ivoirienne",
    genre: "Masculin",
    situationMatrimoniale: "Célibataire",
    nombreEnfants: 0,
    avatar: "/homme02.png",
    adresse: "Plateau, Avenue Terrasson de Fougères",
    ville: "Abidjan",
    codePostal: "01 BP 1234",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 05 67 89 01",
    telephoneProfessionnel: "+225 27 22 41 02",
    emailPersonnel: "jean.dupont@gmail.com",
    emailProfessionnel: "j.dupont@cnf.ci",
    contactsUrgence: [
      { nom: "Pierre Dupont", relation: "Parent", telephone: "+225 07 23 45 67" },
    ],
    matricule: "MAT-2021-002",
    poste: "Responsable IT",
    departement: "Informatique",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "15/03/2021",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "Actif",
    // Rémunération
    salaireBase: "180 000",
    sursalaire: "850 000",
    tauxHoraire: "5 000",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "BICICI",
        numeroCompte: "CI93 0002 0001 0000 0000 0456",
        rib: "BICICI CI AB",
        estPrincipal: true,
      },
    ],
    numeroCni: "CI-1990-0722-BKE-002",
    typeDocumentIdentite: "Passeport",
    dateExpirationCni: "22/07/2028",
    numeroSecuriteSociale: "CNPS-0987654321",
    numeroFiscal: "IFU-CI-2021-00789",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Dupont_Jean.pdf", fileSize: "1.8 Mo", uploadedAt: "15/03/2021" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Dupont.pdf", fileSize: "1.1 Mo", uploadedAt: "15/03/2021" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Dupont_Jean.pdf", fileSize: "0.9 Mo", uploadedAt: "15/03/2021" },
    ],
    folderDocuments: [
      { id: "fd-1", name: "Extrait d'acte de naissance", status: "Complet", updatedAt: "01/01/2026 à 10:00", files: [] },
      { id: "fd-2", name: "Diplômes", status: "Complet", updatedAt: "01/01/2026 à 10:00", files: [] },
      { id: "fd-3", name: "Carte d'identité", status: "Complet", updatedAt: "01/01/2026 à 10:00", files: [] },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Informatique",
    etablissement: "INP-HB Yamoussoukro",
    anneeObtention: "2015",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master en Informatique", etablissement: "INP-HB Yamoussoukro", domaine: "Génie Logiciel", dateDebut: "2013", dateFin: "2015", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence Maths Info", etablissement: "Université de Bouaké", domaine: "Informatique", dateDebut: "2010", dateFin: "2013", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Responsable IT", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Mar 2021", dateFin: "Présent", description: "Gestion de l'infrastructure IT et cloud AWS." },
      { id: "ep-2", poste: "Ingénieur Système", employeur: "Orange CI", lieu: "Abidjan, CI", dateDebut: "Juin 2016", dateFin: "Fév 2021", description: "Administration des serveurs et réseaux." },
    ],
    competences: ["Architecture logicielle", "DevOps", "Cloud AWS", "React", "Node.js"],
    langues: ["Français", "Anglais"],
    certifications: ["AWS Solutions Architect", "Scrum Master"],
    grade: "Manager",
    site: "Antenne Plateau",
    notesInternes: "Très bon technicien, fiable et autonome. Pilote la migration vers le cloud.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "1 050 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "1 050 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "1 050 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
}

export function getEmployee(id: string): EmployeeProfile | undefined {
  return MOCK_EMPLOYEES[id]
}
