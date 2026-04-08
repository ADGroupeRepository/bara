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
  heuresMensuelles: string // Nombre d'heures par mois
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
    heuresMensuelles: "173.33",
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
    heuresMensuelles: "173.33",
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
  EMP003: {
    id: "EMP003",
    civilite: "Mme",
    nom: "Koné",
    prenom: "Marissa",
    dateNaissance: "28/05/1992",
    lieuNaissance: "Yamoussoukro",
    nationalite: "Ivoirienne",
    genre: "Féminin",
    situationMatrimoniale: "Mariée",
    nombreEnfants: 2,
    avatar: "/femme01.png",
    adresse: "Cocody Golf, Rue D15",
    ville: "Abidjan",
    codePostal: "01 BP 5678",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 45 23 89",
    telephoneProfessionnel: "+225 27 22 41 03",
    emailPersonnel: "marissa.kone@gmail.com",
    emailProfessionnel: "m.kone@cnf.ci",
    contactsUrgence: [
      { nom: "Abdoulaye Koné", relation: "Conjoint", telephone: "+225 07 89 34 56" },
      { nom: "Yasmina Koné", relation: "Parent", telephone: "+225 07 12 78 90" },
    ],
    matricule: "MAT-2022-003",
    poste: "Responsable Recrutement",
    departement: "RH",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "01/06/2022",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "Actif",
    salaireBase: "120 000",
    sursalaire: "620 000",
    tauxHoraire: "4 000",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "SGBCI",
        numeroCompte: "CI93 0001 0002 0000 0000 0789",
        rib: "SGBCI CI AB",
        estPrincipal: true,
      },
      {
        mode: "Mobile Money",
        operateur: "MTN Money",
        telephone: "+225 07 45 23 89",
        estPrincipal: false,
      },
    ],
    numeroCni: "CI-1992-0528-YAM-003",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "28/05/2029",
    numeroSecuriteSociale: "CNPS-1122334455",
    numeroFiscal: "IFU-CI-2022-01234",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Kone_Marissa.pdf", fileSize: "1.9 Mo", uploadedAt: "01/06/2022" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Kone.pdf", fileSize: "1.3 Mo", uploadedAt: "01/06/2022" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Kone_Marissa.pdf", fileSize: "0.7 Mo", uploadedAt: "01/06/2022" },
    ],
    folderDocuments: [
      {
        id: "diplomes",
        name: "Diplômes",
        status: "Complet",
        updatedAt: "15/06/2022 à 09:30",
        files: [
          { id: "d-1", label: "Master RH", fileName: "Master_RH_CESAG.pdf", fileSize: "2.2 Mo", uploadedAt: "15/06/2022" },
          { id: "d-2", label: "Licence Gestion", fileName: "Licence_Gestion_CESAG.pdf", fileSize: "1.9 Mo", uploadedAt: "15/06/2022" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "15/06/2022 à 09:45",
        files: [
          { id: "c-1", label: "CNI Recto-Verso", fileName: "CNI_Marissa_Kone.pdf", fileSize: "1.5 Mo", uploadedAt: "15/06/2022" },
        ],
      },
      {
        id: "arrete-emploi",
        name: "Arrêté de nomination dans l'emploi",
        status: "Complet",
        updatedAt: "15/06/2022 à 10:00",
        files: [
          { id: "ae-1", label: "Arrêté Responsable Recrutement", fileName: "Arrete_RH_Kone.pdf", fileSize: "0.8 Mo", uploadedAt: "15/06/2022" },
        ],
      },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Gestion des Ressources Humaines",
    etablissement: "CESAG – Dakar",
    anneeObtention: "2016",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master en Gestion des Ressources Humaines", etablissement: "CESAG - Dakar", domaine: "RH", dateDebut: "2014", dateFin: "2016", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence en Gestion", etablissement: "Université FHB", domaine: "Gestion", dateDebut: "2011", dateFin: "2014", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Responsable Recrutement", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Juin 2022", dateFin: "Présent", description: "Pilotage du recrutement et gestion des talents." },
      { id: "ep-2", poste: "Chargée RH", employeur: "Nestlé CI", lieu: "Abidjan, CI", dateDebut: "Juillet 2017", dateFin: "Mai 2022", description: "Gestion de la paie, recrutement et formation personnel." },
      { id: "ep-3", poste: "Assistante RH", employeur: "Total E&P CI", lieu: "Abidjan, CI", dateDebut: "Septembre 2016", dateFin: "Juin 2017", description: "Support administratif RH et gestion dossiers salariés." },
    ],
    competences: ["Recrutement", "Paie", "Gestion Administrative", "Relations IRP"],
    langues: ["Français", "Anglais"],
    certifications: ["Paie RAFP", "Certification Recrutement"],
    grade: "Manager",
    site: "Siège Social",
    notesInternes: "Excellente responsable recrutement avec forte expérience paie. Très impliquée dans les projets de transformation RH. Recommandée pour formation management général.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "800 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "800 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "800 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP004: {
    id: "EMP004",
    civilite: "M.",
    nom: "Traoré",
    prenom: "Alassane",
    dateNaissance: "10/11/1988",
    lieuNaissance: "Bouaké",
    nationalite: "Ivoirienne",
    genre: "Masculin",
    situationMatrimoniale: "Marié(e)",
    nombreEnfants: 4,
    avatar: "/homme03.png",
    adresse: "Marcory, Rue des Villas",
    ville: "Abidjan",
    codePostal: "01 BP 9876",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 78 56 34",
    telephoneProfessionnel: "+225 27 22 41 04",
    emailPersonnel: "alassane.traore@gmail.com",
    emailProfessionnel: "a.traore@cnf.ci",
    contactsUrgence: [
      { nom: "Oumou Traoré", relation: "Conjoint(e)", telephone: "+225 07 45 67 89" },
      { nom: "Moussa Traoré", relation: "Parent", telephone: "+225 07 23 45 67" },
    ],
    matricule: "MAT-2020-004",
    poste: "Directeur Commercial",
    departement: "Ventes",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "15/02/2020",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "En congé",
    salaireBase: "250 000",
    sursalaire: "1 200 000",
    tauxHoraire: "8 500",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "BICICI",
        numeroCompte: "CI93 0002 0003 0000 0000 1234",
        rib: "BICICI CI AB",
        estPrincipal: true,
      },
    ],
    numeroCni: "CI-1988-1110-BKE-004",
    typeDocumentIdentite: "Passeport",
    dateExpirationCni: "10/11/2032",
    numeroSecuriteSociale: "CNPS-2233445566",
    numeroFiscal: "IFU-CI-2020-02345",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Traore_Alassane.pdf", fileSize: "2.0 Mo", uploadedAt: "15/02/2020" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "Passport_Traore.pdf", fileSize: "1.6 Mo", uploadedAt: "15/02/2020" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Traore_Alassane.pdf", fileSize: "1.0 Mo", uploadedAt: "15/02/2020" },
    ],
    folderDocuments: [
      {
        id: "diplomes",
        name: "Diplômes",
        status: "Complet",
        updatedAt: "01/03/2020 à 14:15",
        files: [
          { id: "d-1", label: "Master Commerce International", fileName: "Master_Commerce_UFHB.pdf", fileSize: "2.3 Mo", uploadedAt: "01/03/2020" },
          { id: "d-2", label: "Licence Commerce", fileName: "Licence_Commerce_UFHB.pdf", fileSize: "2.0 Mo", uploadedAt: "01/03/2020" },
        ],
      },
      {
        id: "passeport",
        name: "Passeport",
        status: "Complet",
        updatedAt: "01/03/2020 à 14:30",
        files: [
          { id: "p-1", label: "Passeport Recto-Verso", fileName: "Passeport_Traore.pdf", fileSize: "1.6 Mo", uploadedAt: "01/03/2020" },
        ],
      },
      {
        id: "arrete-fonction",
        name: "Arrêté de nomination dans la fonction",
        status: "Complet",
        updatedAt: "01/03/2020 à 14:45",
        files: [
          { id: "af-1", label: "Arrêté Directeur Commercial", fileName: "Arrete_Directeur_Ventes.pdf", fileSize: "0.9 Mo", uploadedAt: "01/03/2020" },
        ],
      },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Commerce International",
    etablissement: "Université Félix Houphouët-Boigny",
    anneeObtention: "2012",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master en Commerce International", etablissement: "Université Félix Houphouët-Boigny", domaine: "Commerce", dateDebut: "2010", dateFin: "2012", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence Commerce", etablissement: "Université de Bouaké", domaine: "Commerce", dateDebut: "2007", dateFin: "2010", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Directeur Commercial", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Fév 2020", dateFin: "Présent", description: "Pilotage stratégie commerciale et gestion équipe ventes." },
      { id: "ep-2", poste: "Manager Commercial", employeur: "Unilever CI", lieu: "Abidjan, CI", dateDebut: "Mars 2016", dateFin: "Jan 2020", description: "Management équipe ventes et développement marchés." },
      { id: "ep-3", poste: "Commercial", employeur: "Coca-Cola Côte d'Ivoire", lieu: "Bouaké, CI", dateDebut: "Juin 2012", dateFin: "Fév 2016", description: "Prospection clients et négociation contrats." },
    ],
    competences: ["Ventes", "Négociation", "Management d'équipe", "Stratégie Commerciale"],
    langues: ["Français", "Anglais", "Dioula"],
    certifications: ["Certification Vente & Négociation", "Leadership Commercial"],
    grade: "Senior",
    site: "Siège Social",
    notesInternes: "Excellent directeur commercial avec forte expérience secteur FMCG. Visionnaire en matière de stratégie de marché. Actuellement en congé jusqu'au 15/04/2026.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "1 550 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "1 550 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "1 550 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP005: {
    id: "EMP005",
    civilite: "Mme",
    nom: "Kouassi",
    prenom: "Evelyne",
    dateNaissance: "03/09/1987",
    lieuNaissance: "Abidjan",
    nationalite: "Ivoirienne",
    genre: "Féminin",
    situationMatrimoniale: "Veuve",
    nombreEnfants: 1,
    avatar: "/femme02.png",
    adresse: "Treichville, Avenue Laurent Gbagbo",
    ville: "Abidjan",
    codePostal: "01 BP 4321",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 34 67 89",
    telephoneProfessionnel: "+225 27 22 41 05",
    emailPersonnel: "evelyne.kouassi@gmail.com",
    emailProfessionnel: "e.kouassi@cnf.ci",
    contactsUrgence: [
      { nom: "Josée Kouassi", relation: "Mère", telephone: "+225 07 56 78 90" },
      { nom: "Samuel Kouassi", relation: "Frère", telephone: "+225 07 34 56 78" },
    ],
    matricule: "MAT-2019-005",
    poste: "Chef Comptable",
    departement: "Finance",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "01/10/2019",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "Télétravail",
    salaireBase: "200 000",
    sursalaire: "950 000",
    tauxHoraire: "7 000",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "Coris Bank",
        numeroCompte: "CI93 0003 0001 0000 0000 5678",
        rib: "CORIS CI AB",
        estPrincipal: true,
      },
    ],
    numeroCni: "CI-1987-0903-ABJ-005",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "03/09/2027",
    numeroSecuriteSociale: "CNPS-3344556677",
    numeroFiscal: "IFU-CI-2019-03456",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Kouassi_Evelyne.pdf", fileSize: "1.7 Mo", uploadedAt: "01/10/2019" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Kouassi.pdf", fileSize: "1.2 Mo", uploadedAt: "01/10/2019" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Kouassi_Evelyne.pdf", fileSize: "0.8 Mo", uploadedAt: "01/10/2019" },
    ],
    folderDocuments: [
      {
        id: "diplomes",
        name: "Diplômes",
        status: "Complet",
        updatedAt: "15/10/2019 à 11:20",
        files: [
          { id: "d-1", label: "Diplôme Expert-Comptable", fileName: "DEC_CESAG.pdf", fileSize: "2.4 Mo", uploadedAt: "15/10/2019" },
          { id: "d-2", label: "Licence en Comptabilité", fileName: "License_Comptabilite_CESAG.pdf", fileSize: "2.1 Mo", uploadedAt: "15/10/2019" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "15/10/2019 à 11:35",
        files: [
          { id: "c-1", label: "CNI Recto-Verso", fileName: "CNI_Evelyne_Kouassi.pdf", fileSize: "1.4 Mo", uploadedAt: "15/10/2019" },
        ],
      },
      {
        id: "arrete-emploi",
        name: "Arrêté de nomination dans l'emploi",
        status: "Complet",
        updatedAt: "15/10/2019 à 11:50",
        files: [
          { id: "ae-1", label: "Arrêté Chef Comptable", fileName: "Arrete_Chef_Comptable.pdf", fileSize: "0.8 Mo", uploadedAt: "15/10/2019" },
        ],
      },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Diplôme d'Expert-Comptable",
    etablissement: "CESAG – Dakar",
    anneeObtention: "2013",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Diplôme d'Expert-Comptable", etablissement: "CESAG - Dakar", domaine: "Comptabilité", dateDebut: "2011", dateFin: "2013", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence en Comptabilité", etablissement: "CESAG - Dakar", domaine: "Comptabilité", dateDebut: "2008", dateFin: "2011", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Chef Comptable", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Oct 2019", dateFin: "Présent", description: "Direction générale comptabilité et conformité fiscale SYSCOHADA." },
      { id: "ep-2", poste: "Expert-Comptable", employeur: "Cabinet Audit Plus", lieu: "Abidjan, CI", dateDebut: "Janvier 2016", dateFin: "Septembre 2019", description: "Missions d'audit et conseil en comptabilité pour PME/PMI." },
      { id: "ep-3", poste: "Comptable Senior", employeur: "CFAO Motors", lieu: "Abidjan, CI", dateDebut: "Juillet 2013", dateFin: "Décembre 2015", description: "Tenue comptabilité générale et analytique groupe. Déclarations fiscales." },
    ],
    competences: ["Comptabilité", "Audit", "SYSCOHADA", "Fiscalité Ivoirienne"],
    langues: ["Français", "Anglais"],
    certifications: ["Expert-Comptable Agréé", "Certification Audit Interne"],
    grade: "Senior",
    site: "Télétravail",
    notesInternes: "Excellente chef comptable très rigoreuse et à jour aux normes IFRS et SYSCOHADA. Gère efficacement la relation audit externe et trésorier. Modèle de professionnalisme.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "1 250 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "1 250 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "1 250 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP006: {
    id: "EMP006",
    civilite: "M.",
    nom: "Touré",
    prenom: "Oumar",
    dateNaissance: "12/08/1995",
    lieuNaissance: "Daloa",
    nationalite: "Ivoirienne",
    genre: "Masculin",
    situationMatrimoniale: "Célibataire",
    nombreEnfants: 0,
    avatar: "/homme01.png",
    adresse: "Cocody, Rue D45",
    ville: "Abidjan",
    codePostal: "01 BP 2345",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 06",
    telephoneProfessionnel: "+225 27 22 41 06",
    emailPersonnel: "oumar.toure@gmail.com",
    emailProfessionnel: "o.toure@cnf.ci",
    contactsUrgence: [
      { nom: "Aminata Touré", relation: "Mère", telephone: "+225 07 12 34 56" },
      { nom: "Lassina Touré", relation: "Frère", telephone: "+225 07 23 45 67" },
    ],
    matricule: "MAT-2023-006",
    poste: "Développeur Full-Stack",
    departement: "Informatique",
    superieurHierarchique: "Jean Dupont",
    dateEmbauche: "20/01/2023",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "Télétravail",
    salaireBase: "140 000",
    sursalaire: "700 000",
    tauxHoraire: "4 900",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "BICICI",
        numeroCompte: "CI93 0002 0006 0000 0000 2345",
        rib: "BICICI CI AB",
        estPrincipal: true,
      },
      {
        mode: "Mobile Money",
        operateur: "Orange Money",
        telephone: "+225 07 00 00 06",
        estPrincipal: false,
      },
    ],
    numeroCni: "CI-1995-0812-DLO-006",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "12/08/2030",
    numeroSecuriteSociale: "CNPS-4455667788",
    numeroFiscal: "IFU-CI-2023-04567",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Toure_Oumar.pdf", fileSize: "1.6 Mo", uploadedAt: "20/01/2023" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Toure.pdf", fileSize: "1.1 Mo", uploadedAt: "20/01/2023" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Toure_Oumar.pdf", fileSize: "0.7 Mo", uploadedAt: "20/01/2023" },
    ],
    folderDocuments: [
      {
        id: "diplomes",
        name: "Diplômes",
        status: "Complet",
        updatedAt: "02/02/2023 à 10:15",
        files: [
          { id: "d-1", label: "Master Informatique", fileName: "Master_Informatique_INP.pdf", fileSize: "2.0 Mo", uploadedAt: "02/02/2023" },
          { id: "d-2", label: "Licence Génie Logiciel", fileName: "Licence_GL_INP.pdf", fileSize: "1.8 Mo", uploadedAt: "02/02/2023" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "02/02/2023 à 10:30",
        files: [
          { id: "c-1", label: "CNI Recto-Verso", fileName: "CNI_Oumar_Toure.pdf", fileSize: "1.3 Mo", uploadedAt: "02/02/2023" },
        ],
      },
      {
        id: "arrete-emploi",
        name: "Arrêté de nomination dans l'emploi",
        status: "Complet",
        updatedAt: "02/02/2023 à 10:45",
        files: [
          { id: "ae-1", label: "Arrêté Dev Full-Stack", fileName: "Arrete_Dev_Toure.pdf", fileSize: "0.7 Mo", uploadedAt: "02/02/2023" },
        ],
      },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Informatique",
    etablissement: "INP-HB Yamoussoukro",
    anneeObtention: "2020",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master en Informatique", etablissement: "INP-HB Yamoussoukro", domaine: "Génie Logiciel", dateDebut: "2018", dateFin: "2020", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence Génie Logiciel", etablissement: "INP-HB Yamoussoukro", domaine: "Informatique", dateDebut: "2015", dateFin: "2018", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Développeur Full-Stack", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Jan 2023", dateFin: "Présent", description: "Développement applications web React/Node.js et maintenance infrastructure AWS." },
      { id: "ep-2", poste: "Développeur Junior", employeur: "StartupTech CI", lieu: "Abidjan, CI", dateDebut: "Juillet 2020", dateFin: "Décembre 2022", description: "Développement full-stack et support technique services numériques." },
    ],
    competences: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
    langues: ["Français", "Anglais"],
    certifications: ["AWS Certified Cloud Practitioner", "React Advanced Patterns"],
    grade: "Intermédiaire",
    site: "Télétravail",
    notesInternes: "Développeur prometteur avec fortes compétences full-stack. Très autonome et productif en télétravail. À suivre pour rôles de leadership technique.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "885 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "885 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "885 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP007: {
    id: "EMP007",
    civilite: "Mme",
    nom: "Bamba",
    prenom: "Fatou",
    dateNaissance: "07/02/1988",
    lieuNaissance: "Korhogo",
    nationalite: "Ivoirienne",
    genre: "Féminin",
    situationMatrimoniale: "Mariée",
    nombreEnfants: 3,
    avatar: "/femme01.png",
    adresse: "Plateau, Boulevard Carda",
    ville: "Abidjan",
    codePostal: "01 BP 6789",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 07",
    telephoneProfessionnel: "+225 27 22 41 07",
    emailPersonnel: "fatou.bamba@gmail.com",
    emailProfessionnel: "f.bamba@cnf.ci",
    contactsUrgence: [
      { nom: "Abdoulaye Bamba", relation: "Conjoint", telephone: "+225 07 34 56 78" },
      { nom: "Ina Bamba", relation: "Mère", telephone: "+225 07 45 67 89" },
    ],
    matricule: "MAT-2018-007",
    poste: "Responsable RH",
    departement: "RH",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "12/04/2018",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "Actif",
    salaireBase: "130 000",
    sursalaire: "670 000",
    tauxHoraire: "4 700",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "SGBCI",
        numeroCompte: "CI93 0001 0007 0000 0000 3456",
        rib: "SGBCI CI AB",
        estPrincipal: true,
      },
      {
        mode: "Mobile Money",
        operateur: "MTN Money",
        telephone: "+225 07 00 00 07",
        estPrincipal: false,
      },
    ],
    numeroCni: "CI-1988-0207-KRG-007",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "07/02/2029",
    numeroSecuriteSociale: "CNPS-5566778899",
    numeroFiscal: "IFU-CI-2018-05678",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Bamba_Fatou.pdf", fileSize: "1.7 Mo", uploadedAt: "12/04/2018" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Bamba.pdf", fileSize: "1.2 Mo", uploadedAt: "12/04/2018" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Bamba_Fatou.pdf", fileSize: "0.8 Mo", uploadedAt: "12/04/2018" },
    ],
    folderDocuments: [
      {
        id: "diplomes",
        name: "Diplômes",
        status: "Complet",
        updatedAt: "25/04/2018 à 09:20",
        files: [
          { id: "d-1", label: "Master RH", fileName: "Master_RH_CESAG.pdf", fileSize: "2.1 Mo", uploadedAt: "25/04/2018" },
          { id: "d-2", label: "Licence Gestion", fileName: "Licence_Gestion_FHB.pdf", fileSize: "1.9 Mo", uploadedAt: "25/04/2018" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "25/04/2018 à 09:35",
        files: [
          { id: "c-1", label: "CNI Recto-Verso", fileName: "CNI_Fatou_Bamba.pdf", fileSize: "1.4 Mo", uploadedAt: "25/04/2018" },
        ],
      },
      {
        id: "arrete-emploi",
        name: "Arrêté de nomination dans l'emploi",
        status: "Complet",
        updatedAt: "25/04/2018 à 09:50",
        files: [
          { id: "ae-1", label: "Arrêté Responsable RH", fileName: "Arrete_RH_Bamba.pdf", fileSize: "0.8 Mo", uploadedAt: "25/04/2018" },
        ],
      },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Gestion des Ressources Humaines",
    etablissement: "CESAG – Dakar",
    anneeObtention: "2015",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master en Gestion des Ressources Humaines", etablissement: "CESAG - Dakar", domaine: "RH", dateDebut: "2013", dateFin: "2015", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence en Gestion", etablissement: "Université FHB", domaine: "Gestion", dateDebut: "2010", dateFin: "2013", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Responsable RH", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Avr 2018", dateFin: "Présent", description: "Pilotage stratégie RH, gestion paie et formation personnel." },
      { id: "ep-2", poste: "Chargée RH", employeur: "Société Générale CI", lieu: "Abidjan, CI", dateDebut: "Janvier 2016", dateFin: "Mars 2018", description: "Gestion administrative personnel et relation IRP." },
      { id: "ep-3", poste: "Assistante RH", employeur: "CFAO Motors", lieu: "Abidjan, CI", dateDebut: "Septembre 2015", dateFin: "Décembre 2015", description: "Support administratif et archivage dossiers salariés." },
    ],
    competences: ["Paie RAFP", "Recrutement", "Gestion Administrative", "Relations IRP", "Formations"],
    langues: ["Français", "Anglais"],
    certifications: ["Certification Paie RAFP", "Certification Recrutement"],
    grade: "Manager",
    site: "Siège Social",
    notesInternes: "Responsable RH expérimentée très à jour aux évolutions légales. Gère efficacement la stratégie RH et relations partenaires sociaux. Très impliquée dans les projets transformation.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "839 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "839 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "839 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP008: {
    id: "EMP008",
    civilite: "M.",
    nom: "Konan",
    prenom: "Paul",
    dateNaissance: "25/06/1986",
    lieuNaissance: "Abidjan",
    nationalite: "Ivoirienne",
    genre: "Masculin",
    situationMatrimoniale: "Marié(e)",
    nombreEnfants: 2,
    avatar: "/homme02.png",
    adresse: "Cocody Angré, Rue J10",
    ville: "Abidjan",
    codePostal: "01 BP 7890",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 08",
    telephoneProfessionnel: "+225 27 22 41 08",
    emailPersonnel: "paul.konan@gmail.com",
    emailProfessionnel: "p.konan@cnf.ci",
    contactsUrgence: [
      { nom: "Bernadette Konan", relation: "Conjoint(e)", telephone: "+225 07 56 78 90" },
      { nom: "Georges Konan", relation: "Parent", telephone: "+225 07 34 56 78" },
    ],
    matricule: "MAT-2021-008",
    poste: "Chef de Projet",
    departement: "Direction",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "03/07/2021",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "Actif",
    salaireBase: "160 000",
    sursalaire: "800 000",
    tauxHoraire: "5 500",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "BICICI",
        numeroCompte: "CI93 0002 0008 0000 0000 4567",
        rib: "BICICI CI AB",
        estPrincipal: true,
      },
    ],
    numeroCni: "CI-1986-0625-ABJ-008",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "25/06/2031",
    numeroSecuriteSociale: "CNPS-6677889900",
    numeroFiscal: "IFU-CI-2021-06789",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Konan_Paul.pdf", fileSize: "1.8 Mo", uploadedAt: "03/07/2021" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Konan.pdf", fileSize: "1.2 Mo", uploadedAt: "03/07/2021" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Konan_Paul.pdf", fileSize: "0.9 Mo", uploadedAt: "03/07/2021" },
    ],
    folderDocuments: [
      {
        id: "diplomes",
        name: "Diplômes",
        status: "Complet",
        updatedAt: "20/07/2021 à 14:10",
        files: [
          { id: "d-1", label: "Master Gestion de Projets", fileName: "Master_GP_CESAG.pdf", fileSize: "2.2 Mo", uploadedAt: "20/07/2021" },
          { id: "d-2", label: "Licence Ingénierie", fileName: "Licence_Ing_INP.pdf", fileSize: "2.0 Mo", uploadedAt: "20/07/2021" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "20/07/2021 à 14:25",
        files: [
          { id: "c-1", label: "CNI Recto-Verso", fileName: "CNI_Paul_Konan.pdf", fileSize: "1.4 Mo", uploadedAt: "20/07/2021" },
        ],
      },
      {
        id: "arrete-emploi",
        name: "Arrêté de nomination dans l'emploi",
        status: "Complet",
        updatedAt: "20/07/2021 à 14:40",
        files: [
          { id: "ae-1", label: "Arrêté Chef de Projet", fileName: "Arrete_CP_Konan.pdf", fileSize: "0.8 Mo", uploadedAt: "20/07/2021" },
        ],
      },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Gestion de Projets",
    etablissement: "CESAG – Dakar",
    anneeObtention: "2014",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master en Gestion de Projets", etablissement: "CESAG - Dakar", domaine: "Management", dateDebut: "2012", dateFin: "2014", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence Ingénierie Civile", etablissement: "INP-HB Yamoussoukro", domaine: "Ingénierie", dateDebut: "2009", dateFin: "2012", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Chef de Projet", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Juil 2021", dateFin: "Présent", description: "Pilotage transformations digitales et projets stratégiques multiméthodes." },
      { id: "ep-2", poste: "Chef de Projet Senior", employeur: "SOPARA", lieu: "Abidjan, CI", dateDebut: "Août 2017", dateFin: "Juin 2021", description: "Gestion portefeuille projets infrastructure et télécommunications." },
      { id: "ep-3", poste: "Chef de Projet", employeur: "Sogea-Satom", lieu: "Abidjan, CI", dateDebut: "Janvier 2014", dateFin: "Juillet 2017", description: "Management grands projets construction et travaux publics." },
    ],
    competences: ["PMP", "Agile/Scrum", "MS Project", "Leadership", "Gestion budgétaire", "Risques"],
    langues: ["Français", "Anglais"],
    certifications: ["PMP (Project Management Professional)", "PRINCE2"],
    grade: "Senior",
    site: "Siège Social",
    notesInternes: "Excellent chef de projet très méthodique avec solide expérience infrastructures. Capable de gérer projets complexes multiacteurs. Envisagé pour rôles gouvernance projets.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "1 010 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "1 010 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "1 010 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP009: {
    id: "EMP009",
    civilite: "Mme",
    nom: "Diabaté",
    prenom: "Aïcha",
    dateNaissance: "19/03/1997",
    lieuNaissance: "Ségou",
    nationalite: "Ivoirienne",
    genre: "Féminin",
    situationMatrimoniale: "Célibataire",
    nombreEnfants: 0,
    avatar: "/femme02.png",
    adresse: "Marcory, Rue des Cocotiers",
    ville: "Abidjan",
    codePostal: "01 BP 3210",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 09",
    telephoneProfessionnel: "+225 27 22 41 09",
    emailPersonnel: "aicha.diabate@gmail.com",
    emailProfessionnel: "a.diabate@cnf.ci",
    contactsUrgence: [
      { nom: "Fatoumata Diabaté", relation: "Mère", telephone: "+225 07 23 45 67" },
      { nom: "Seydou Diabaté", relation: "Frère", telephone: "+225 07 45 67 89" },
    ],
    matricule: "MAT-2023-009",
    poste: "Graphiste",
    departement: "Communication",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "18/11/2023",
    typeContrat: "CDD",
    periodeEssai: "2 mois",
    statut: "En congé",
    salaireBase: "90 000",
    sursalaire: "450 000",
    tauxHoraire: "3 700",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "Coris Bank",
        numeroCompte: "CI93 0003 0009 0000 0000 5678",
        rib: "CORIS CI AB",
        estPrincipal: true,
      },
      {
        mode: "Mobile Money",
        operateur: "Orange Money",
        telephone: "+225 07 00 00 09",
        estPrincipal: false,
      },
    ],
    numeroCni: "CI-1997-0319-SGU-009",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "19/03/2032",
    numeroSecuriteSociale: "CNPS-7788990011",
    numeroFiscal: "IFU-CI-2023-07890",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Diabate_Aicha.pdf", fileSize: "1.5 Mo", uploadedAt: "18/11/2023" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Diabate.pdf", fileSize: "1.0 Mo", uploadedAt: "18/11/2023" },
      { id: "portfolio", label: "Portfolio", fileName: "Portfolio_Aicha_Diabate.pdf", fileSize: "3.2 Mo", uploadedAt: "18/11/2023" },
    ],
    folderDocuments: [
      {
        id: "diplomes",
        name: "Diplômes",
        status: "Complet",
        updatedAt: "04/12/2023 à 11:50",
        files: [
          { id: "d-1", label: "Licence Design Graphique", fileName: "Licence_Design_HECM.pdf", fileSize: "1.8 Mo", uploadedAt: "04/12/2023" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "04/12/2023 à 12:05",
        files: [
          { id: "c-1", label: "CNI Recto-Verso", fileName: "CNI_Aicha_Diabate.pdf", fileSize: "1.3 Mo", uploadedAt: "04/12/2023" },
        ],
      },
    ],
    niveauEtudes: "Bac+3",
    diplome: "Licence en Design Graphique",
    etablissement: "HECM – Abidjan",
    anneeObtention: "2019",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Licence en Design Graphique", etablissement: "HECM - Abidjan", domaine: "Design", dateDebut: "2016", dateFin: "2019", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Graphiste", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Nov 2023", dateFin: "Présent", description: "Création identité visuelle, supports marketing et communication interne." },
      { id: "ep-2", poste: "Designer Freelance", employeur: "Indépendant", lieu: "Abidjan, CI", dateDebut: "Juillet 2019", dateFin: "Octobre 2023", description: "Freelance design graphique pour PME et startups numériques." },
    ],
    competences: ["Adobe Creative Suite", "Figma", "Design UI/UX", "Branding", "Illustration"],
    langues: ["Français", "Anglais"],
    certifications: ["Certification Adobe Design", "UX Design Fundamentals"],
    grade: "Junior",
    site: "Siège Social",
    notesInternes: "Graphiste créative avec bon potentiel pour design numérique. Actuellement en congé jusqu'au 15/04/2026. À réintégrer progressivement à son retour.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "583 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "583 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "583 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP010: {
    id: "EMP010",
    civilite: "M.",
    nom: "Aka",
    prenom: "Yves",
    dateNaissance: "14/10/1982",
    lieuNaissance: "Abidjan",
    nationalite: "Ivoirienne",
    genre: "Masculin",
    situationMatrimoniale: "Marié(e)",
    nombreEnfants: 2,
    avatar: "/homme03.png",
    adresse: "Cocody Riviera, Avenue Verte",
    ville: "Abidjan",
    codePostal: "01 BP 8901",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 10",
    telephoneProfessionnel: "+225 27 22 41 10",
    emailPersonnel: "yves.aka@gmail.com",
    emailProfessionnel: "y.aka@cnf.ci",
    contactsUrgence: [
      { nom: "Christelle Aka", relation: "Conjoint(e)", telephone: "+225 07 67 89 01" },
      { nom: "Stanislas Aka", relation: "Parent", telephone: "+225 07 12 34 56" },
    ],
    matricule: "MAT-2020-010",
    poste: "Analyste Financier",
    departement: "Finance",
    superieurHierarchique: "Evelyne Kouassi",
    dateEmbauche: "22/08/2020",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "Actif",
    salaireBase: "150 000",
    sursalaire: "750 000",
    tauxHoraire: "5 200",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "SGBCI",
        numeroCompte: "CI93 0001 0010 0000 0000 6789",
        rib: "SGBCI CI AB",
        estPrincipal: true,
      },
    ],
    numeroCni: "CI-1982-1014-ABJ-010",
    typeDocumentIdentite: "Passeport",
    dateExpirationCni: "14/10/2032",
    numeroSecuriteSociale: "CNPS-8899001122",
    numeroFiscal: "IFU-CI-2020-08901",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Aka_Yves.pdf", fileSize: "1.8 Mo", uploadedAt: "22/08/2020" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "Passeport_Aka.pdf", fileSize: "1.3 Mo", uploadedAt: "22/08/2020" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Aka_Yves.pdf", fileSize: "0.9 Mo", uploadedAt: "22/08/2020" },
    ],
    folderDocuments: [
      {
        id: "diplomes",
        name: "Diplômes",
        status: "Complet",
        updatedAt: "08/09/2020 à 16:20",
        files: [
          { id: "d-1", label: "Master Finance", fileName: "Master_Finance_CESAG.pdf", fileSize: "2.2 Mo", uploadedAt: "08/09/2020" },
          { id: "d-2", label: "Licence Économie", fileName: "Licence_Eco_FHB.pdf", fileSize: "2.0 Mo", uploadedAt: "08/09/2020" },
        ],
      },
      {
        id: "passeport",
        name: "Passeport",
        status: "Complet",
        updatedAt: "08/09/2020 à 16:35",
        files: [
          { id: "p-1", label: "Passeport Recto-Verso", fileName: "Passeport_Yves_Aka.pdf", fileSize: "1.3 Mo", uploadedAt: "08/09/2020" },
        ],
      },
      {
        id: "arrete-emploi",
        name: "Arrêté de nomination dans l'emploi",
        status: "Complet",
        updatedAt: "08/09/2020 à 16:50",
        files: [
          { id: "ae-1", label: "Arrêté Analyste Financier", fileName: "Arrete_AF_Aka.pdf", fileSize: "0.8 Mo", uploadedAt: "08/09/2020" },
        ],
      },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Finance",
    etablissement: "CESAG – Dakar",
    anneeObtention: "2012",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master en Finance", etablissement: "CESAG - Dakar", domaine: "Finance", dateDebut: "2010", dateFin: "2012", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence Économie", etablissement: "Université FHB", domaine: "Économie", dateDebut: "2007", dateFin: "2010", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Analyste Financier", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Août 2020", dateFin: "Présent", description: "Analyses financières consolidées, reporting et gestion prévisions budgétaires." },
      { id: "ep-2", poste: "Analyste Financier", employeur: "Bank of Africa", lieu: "Abidjan, CI", dateDebut: "Juin 2016", dateFin: "Juillet 2020", description: "Analyse crédit, évaluation risques et accompagnement clients." },
      { id: "ep-3", poste: "Trader Junior", employeur: "Société Générale CI", lieu: "Abidjan, CI", dateDebut: "Septembre 2012", dateFin: "Mai 2016", description: "Trading obligations, marché des capitaux et trésorerie." },
    ],
    competences: ["Analyse financière", "Reporting IFRS", "Excel avancé", "SAP", "Risk Management"],
    langues: ["Français", "Anglais"],
    certifications: ["CFA Level III", "Certification Risk Management"],
    grade: "Manager",
    site: "Siège Social",
    notesInternes: "Analyste financier très compétent avec expertise consolidation et trésorier. Très rigoureux et autonome. Membre actif committees audit et investissements.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "950 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "950 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "950 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP011: {
    id: "EMP011",
    civilite: "Mme",
    nom: "Sanogo",
    prenom: "Mariam",
    dateNaissance: "22/07/2003",
    lieuNaissance: "Bamako",
    nationalite: "Ivoirienne",
    genre: "Féminin",
    situationMatrimoniale: "Célibataire",
    nombreEnfants: 0,
    avatar: "/femme01.png",
    adresse: "Cocody, Rue J65",
    ville: "Abidjan",
    codePostal: "01 BP 1122",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 11",
    telephoneProfessionnel: "+225 27 22 41 11",
    emailPersonnel: "mariam.sanogo@gmail.com",
    emailProfessionnel: "m.sanogo@cnf.ci",
    contactsUrgence: [
      { nom: "Fatimata Sanogo", relation: "Mère", telephone: "+225 07 34 56 78" },
      { nom: "Ibrahim Sanogo", relation: "Frère", telephone: "+225 07 45 67 89" },
    ],
    matricule: "MAT-2025-011",
    poste: "Stagiaire IT",
    departement: "Informatique",
    superieurHierarchique: "Jean Dupont",
    dateEmbauche: "15/01/2025",
    typeContrat: "Stage",
    periodeEssai: "N/A",
    statut: "Actif",
    salaireBase: "0",
    sursalaire: "250 000",
    tauxHoraire: "1 500",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Mobile Money",
        operateur: "Orange Money",
        telephone: "+225 07 00 00 11",
        estPrincipal: true,
      },
    ],
    numeroCni: "CI-2003-0722-BAM-011",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "22/07/2033",
    numeroSecuriteSociale: "CNPS-9900112233",
    numeroFiscal: "IFU-CI-2025-09012",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Sanogo_Mariam.pdf", fileSize: "1.2 Mo", uploadedAt: "15/01/2025" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Sanogo.pdf", fileSize: "1.0 Mo", uploadedAt: "15/01/2025" },
      { id: "convention-stage", label: "Convention de stage", fileName: "Convention_Stage_Sanogo.pdf", fileSize: "0.6 Mo", uploadedAt: "15/01/2025" },
    ],
    folderDocuments: [
      {
        id: "documents-etudes",
        name: "Documents d'études",
        status: "Complet",
        updatedAt: "20/01/2025 à 13:45",
        files: [
          { id: "d-1", label: "Carte Étudiant", fileName: "Carte_Etudiant_Sanogo.pdf", fileSize: "1.1 Mo", uploadedAt: "20/01/2025" },
          { id: "d-2", label: "Attestation Inscription", fileName: "Attestation_INP_2024.pdf", fileSize: "0.9 Mo", uploadedAt: "20/01/2025" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "20/01/2025 à 14:00",
        files: [
          { id: "c-1", label: "CNI Recto-Verso", fileName: "CNI_Mariam_Sanogo.pdf", fileSize: "1.2 Mo", uploadedAt: "20/01/2025" },
        ],
      },
    ],
    niveauEtudes: "Bac+4",
    diplome: "Master Informatique (en cours)",
    etablissement: "INP-HB Yamoussoukro",
    anneeObtention: "2026",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master Informatique", etablissement: "INP-HB Yamoussoukro", domaine: "Génie Logiciel", dateDebut: "2024", dateFin: "2026", statut: "En cours", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence Informatique", etablissement: "INP-HB Yamoussoukro", domaine: "Informatique", dateDebut: "2021", dateFin: "2024", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Stagiaire IT", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Jan 2025", dateFin: "Juin 2025", description: "Support technique et développement applications .NET en environnement cloud." },
    ],
    competences: ["C#", ".NET Framework", "SQL Server", "Azure", "Python"],
    langues: ["Français", "Anglais"],
    certifications: [],
    grade: "Stagiaire",
    site: "Siège Social",
    notesInternes: "Stagiaire très motivée et rapide d'apprentissage. Excellentes connaissances académiques en développement. À considérer pour CDI post-stage si performance soutenue.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "250 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Mobile Money" },
      { id: "sal-2", periode: "Février 2024", montantNet: "250 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Mobile Money" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "250 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Mobile Money" },
    ],
  },
  EMP012: {
    id: "EMP012",
    civilite: "M.",
    nom: "Coulibaly",
    prenom: "Ibrahim",
    dateNaissance: "05/04/1980",
    lieuNaissance: "Ouaninou",
    nationalite: "Ivoirienne",
    genre: "Masculin",
    situationMatrimoniale: "Marié(e)",
    nombreEnfants: 5,
    avatar: "/homme01.png",
    adresse: "Treichville, Rue de l'Église",
    ville: "Abidjan",
    codePostal: "01 BP 2233",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 12",
    telephoneProfessionnel: "+225 27 22 41 12",
    emailPersonnel: "ibrahim.coulibaly@gmail.com",
    emailProfessionnel: "i.coulibaly@cnf.ci",
    contactsUrgence: [
      { nom: "Aissatou Coulibaly", relation: "Conjoint(e)", telephone: "+225 07 56 78 90" },
      { nom: "Adama Coulibaly", relation: "Parent", telephone: "+225 07 23 45 67" },
    ],
    matricule: "MAT-2022-012",
    poste: "Agent Logistique",
    departement: "Logistique",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "09/05/2022",
    typeContrat: "CDI",
    periodeEssai: "2 mois",
    statut: "Actif",
    salaireBase: "80 000",
    sursalaire: "380 000",
    tauxHoraire: "3 000",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "BICICI",
        numeroCompte: "CI93 0002 0012 0000 0000 7890",
        rib: "BICICI CI AB",
        estPrincipal: true,
      },
      {
        mode: "Mobile Money",
        operateur: "MTN Money",
        telephone: "+225 07 00 00 12",
        estPrincipal: false,
      },
    ],
    numeroCni: "CI-1980-0405-OUN-012",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "05/04/2030",
    numeroSecuriteSociale: "CNPS-0011223344",
    numeroFiscal: "IFU-CI-2022-10123",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Coulibaly_Ibrahim.pdf", fileSize: "1.4 Mo", uploadedAt: "09/05/2022" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Coulibaly.pdf", fileSize: "1.0 Mo", uploadedAt: "09/05/2022" },
      { id: "permis", label: "Permis de conduire", fileName: "Permis_Coulibaly.pdf", fileSize: "0.9 Mo", uploadedAt: "09/05/2022" },
    ],
    folderDocuments: [
      {
        id: "certificats",
        name: "Certificats et diplômes",
        status: "Complet",
        updatedAt: "25/05/2022 à 09:30",
        files: [
          { id: "c-1", label: "Certificat CAP Logistique", fileName: "CAP_Logistique.pdf", fileSize: "1.2 Mo", uploadedAt: "25/05/2022" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "25/05/2022 à 09:45",
        files: [
          { id: "c-2", label: "CNI Recto-Verso", fileName: "CNI_Ibrahim_Coulibaly.pdf", fileSize: "1.1 Mo", uploadedAt: "25/05/2022" },
        ],
      },
      {
        id: "arrete-emploi",
        name: "Arrêté de nomination dans l'emploi",
        status: "Complet",
        updatedAt: "25/05/2022 à 10:00",
        files: [
          { id: "ae-1", label: "Arrêté Agent Logistique", fileName: "Arrete_Logistique_Coulibaly.pdf", fileSize: "0.7 Mo", uploadedAt: "25/05/2022" },
        ],
      },
    ],
    niveauEtudes: "Bac+2",
    diplome: "CAP Logistique",
    etablissement: "CFP Treichville",
    anneeObtention: "2006",
    parcoursAcademique: [
      { id: "pa-1", diplome: "CAP Logistique", etablissement: "CFP Treichville", domaine: "Logistique", dateDebut: "2005", dateFin: "2006", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Agent Logistique", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Mai 2022", dateFin: "Présent", description: "Gestion stocks, chaîne d'approvisionnement et distribution produits." },
      { id: "ep-2", poste: "Manutentionnaire", employeur: "SOREPCO", lieu: "Treichville, CI", dateDebut: "Janvier 2015", dateFin: "Avril 2022", description: "Chargement/déchargement, entreposage et tri marchandises." },
      { id: "ep-3", poste: "Chauffeur Livreur", employeur: "Express Logistics", lieu: "Abidjan, CI", dateDebut: "Février 2006", dateFin: "Décembre 2014", description: "Livraison colis et gestion petite flotte véhicules." },
    ],
    competences: ["Gestion Stocks", "Incoterms", "Transit Douanier", "SAP", "Sécurité Entrepôt"],
    langues: ["Français"],
    certifications: ["Certificat Manutentionnaire", "Certification SUVA Sécurité"],
    grade: "Opérationnel",
    site: "Siège Social",
    notesInternes: "Agent logistique fiable et expérimenté très formé à la sécurité. Assure efficacement continuité opérationnelle chaîne supply. Support précieux équipe logistique.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "500 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "500 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "500 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP013: {
    id: "EMP013",
    civilite: "Mme",
    nom: "N'Guessan",
    prenom: "Clémence",
    dateNaissance: "30/11/1989",
    lieuNaissance: "Yamoussoukro",
    nationalite: "Ivoirienne",
    genre: "Féminin",
    situationMatrimoniale: "Mariée",
    nombreEnfants: 1,
    avatar: "/femme02.png",
    adresse: "Cocody Golf, Rue C20",
    ville: "Abidjan",
    codePostal: "01 BP 3344",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 13",
    telephoneProfessionnel: "+225 27 22 41 13",
    emailPersonnel: "clemence.nguessan@gmail.com",
    emailProfessionnel: "c.nguessan@cnf.ci",
    contactsUrgence: [
      { nom: "Henri N'Guessan", relation: "Conjoint", telephone: "+225 07 67 89 01" },
      { nom: "Jacqueline N'Guessan", relation: "Mère", telephone: "+225 07 12 34 56" },
    ],
    matricule: "MAT-2021-013",
    poste: "Juriste",
    departement: "Direction",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "14/02/2021",
    typeContrat: "CDI",
    periodeEssai: "3 mois",
    statut: "Télétravail",
    salaireBase: "170 000",
    sursalaire: "850 000",
    tauxHoraire: "5 700",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Virement bancaire",
        banque: "SGBCI",
        numeroCompte: "CI93 0001 0013 0000 0000 8901",
        rib: "SGBCI CI AB",
        estPrincipal: true,
      },
    ],
    numeroCni: "CI-1989-1130-YAM-013",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "30/11/2029",
    numeroSecuriteSociale: "CNPS-1122334455",
    numeroFiscal: "IFU-CI-2021-11234",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Nguessan_Clemence.pdf", fileSize: "1.7 Mo", uploadedAt: "14/02/2021" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Nguessan.pdf", fileSize: "1.1 Mo", uploadedAt: "14/02/2021" },
      { id: "motivation", label: "Lettre de motivation", fileName: "LM_Nguessan_Clemence.pdf", fileSize: "0.8 Mo", uploadedAt: "14/02/2021" },
    ],
    folderDocuments: [
      {
        id: "diplomes",
        name: "Diplômes et certifications",
        status: "Complet",
        updatedAt: "01/03/2021 à 15:20",
        files: [
          { id: "d-1", label: "Master Droit des Affaires", fileName: "Master_Droit_Affaires_FHB.pdf", fileSize: "2.2 Mo", uploadedAt: "01/03/2021" },
          { id: "d-2", label: "Licence Droit Privé", fileName: "Licence_Droit_FHB.pdf", fileSize: "2.0 Mo", uploadedAt: "01/03/2021" },
          { id: "c-1", label: "Certificat Droit Commercial OHADA", fileName: "Cert_Droit_Commercial.pdf", fileSize: "1.3 Mo", uploadedAt: "01/03/2021" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "01/03/2021 à 15:35",
        files: [
          { id: "c-2", label: "CNI Recto-Verso", fileName: "CNI_Clemence_Nguessan.pdf", fileSize: "1.4 Mo", uploadedAt: "01/03/2021" },
        ],
      },
      {
        id: "inscription-barreau",
        name: "Inscription au barreau",
        status: "Complet",
        updatedAt: "01/03/2021 à 15:50",
        files: [
          { id: "ib-1", label: "Certificat Barreau CI", fileName: "Inscription_Barreau_2021.pdf", fileSize: "0.9 Mo", uploadedAt: "01/03/2021" },
        ],
      },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Droit des Affaires",
    etablissement: "Université Félix Houphouët-Boigny",
    anneeObtention: "2016",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master en Droit des Affaires", etablissement: "Université FHB", domaine: "Droit", dateDebut: "2014", dateFin: "2016", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence en Droit Privé", etablissement: "Université FHB", domaine: "Droit", dateDebut: "2011", dateFin: "2014", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Juriste", employeur: "CNF", lieu: "Télétravail", dateDebut: "Fév 2021", dateFin: "Présent", description: "Gestion contentieux, conformité légale et négociations contrats stratégiques." },
      { id: "ep-2", poste: "Juriste d'Entreprise", employeur: "Bolloré Logistics CI", lieu: "Abidjan, CI", dateDebut: "Septembre 2018", dateFin: "Janvier 2021", description: "Gestion contrats commerce international et droit douanier." },
      { id: "ep-3", poste: "Juriste Junior", employeur: "Cabinet Droit DK", lieu: "Abidjan, CI", dateDebut: "Janvier 2016", dateFin: "Août 2018", description: "Support juridique entreprises et assistance rédaction contrats." },
    ],
    competences: ["Droit Contrats", "Droit du Travail", "OHADA", "Droit Douanier", "Conformité légale"],
    langues: ["Français", "Anglais"],
    certifications: ["Barreau de Côte d'Ivoire", "Certification Droit Commercial OHADA"],
    grade: "Manager",
    site: "Télétravail",
    notesInternes: "Excellente juriste très rigoureuse et excellente pédagogue en droit. Inscrite au barreau. Gère avec excellence contentieux et partenariats stratégiques. Très à jour législation OHADA.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "1 074 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-2", periode: "Février 2024", montantNet: "1 074 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Virement bancaire" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "1 074 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Virement bancaire" },
    ],
  },
  EMP014: {
    id: "EMP014",
    civilite: "M.",
    nom: "Konaté",
    prenom: "Moussa",
    dateNaissance: "17/12/1975",
    lieuNaissance: "Bouaké",
    nationalite: "Ivoirienne",
    genre: "Masculin",
    situationMatrimoniale: "Marié(e)",
    nombreEnfants: 6,
    avatar: "/homme03.png",
    adresse: "Courcourelli, Rue des Fleurs",
    ville: "Abidjan",
    codePostal: "01 BP 4455",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 14",
    telephoneProfessionnel: "+225 27 22 41 14",
    emailPersonnel: "moussa.konate@gmail.com",
    emailProfessionnel: "m.konate@cnf.ci",
    contactsUrgence: [
      { nom: "Oumou Konaté", relation: "Conjoint(e)", telephone: "+225 07 78 90 12" },
      { nom: "Bala Konaté", relation: "Parent", telephone: "+225 07 34 56 78" },
    ],
    matricule: "MAT-2023-014",
    poste: "Chauffeur",
    departement: "Logistique",
    superieurHierarchique: "Siaka Sylla",
    dateEmbauche: "01/09/2023",
    typeContrat: "CDD",
    dateFinContrat: "01/09/2024",
    periodeEssai: "2 mois",
    statut: "Actif",
    salaireBase: "70 000",
    sursalaire: "300 000",
    tauxHoraire: "2 500",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Mobile Money",
        operateur: "MTN Money",
        telephone: "+225 07 00 00 14",
        estPrincipal: true,
      },
      {
        mode: "Virement bancaire",
        banque: "Coris Bank",
        numeroCompte: "CI93 0003 0014 0000 0000 9012",
        rib: "CORIS CI AB",
        estPrincipal: false,
      },
    ],
    numeroCni: "CI-1975-1217-BKE-014",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "17/12/2030",
    numeroSecuriteSociale: "CNPS-2233445566",
    numeroFiscal: "IFU-CI-2023-12345",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Konate_Moussa.pdf", fileSize: "1.3 Mo", uploadedAt: "01/09/2023" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Konate.pdf", fileSize: "1.0 Mo", uploadedAt: "01/09/2023" },
      { id: "permis", label: "Permis de conduire catégorie C", fileName: "Permis_C_Konate.pdf", fileSize: "1.1 Mo", uploadedAt: "01/09/2023" },
    ],
    folderDocuments: [
      {
        id: "permis-categorie",
        name: "Permis de conduire",
        status: "Complet",
        updatedAt: "15/09/2023 à 10:30",
        files: [
          { id: "p-1", label: "Permis Catégorie C", fileName: "Permis_C_Moussa_Konate.pdf", fileSize: "1.1 Mo", uploadedAt: "15/09/2023" },
          { id: "p-2", label: "Visite médicale conducteur", fileName: "Visite_Medicale_Conducteur.pdf", fileSize: "0.7 Mo", uploadedAt: "15/09/2023" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "15/09/2023 à 10:45",
        files: [
          { id: "c-1", label: "CNI Recto-Verso", fileName: "CNI_Moussa_Konate.pdf", fileSize: "1.0 Mo", uploadedAt: "15/09/2023" },
        ],
      },
    ],
    niveauEtudes: "Secondaire",
    diplome: "Certificat d'Études Secondaires",
    etablissement: "Lycée de Bouaké",
    anneeObtention: "1993",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Certificat d'Études Secondaires", etablissement: "Lycée de Bouaké", domaine: "Général", dateDebut: "1990", dateFin: "1993", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Chauffeur", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Sep 2023", dateFin: "Présent", description: "Transport cadres et marchandises en sécurité. Maintenance véhicules." },
      { id: "ep-2", poste: "Chauffeur", employeur: "SETAO", lieu: "Abidjan, CI", dateDebut: "Février 2018", dateFin: "Août 2023", description: "Transport commercial longues distances and short routes." },
      { id: "ep-3", poste: "Chauffeur-Livreur", employeur: "SOS Transport", lieu: "Bouaké, CI", dateDebut: "Janvier 2005", dateFin: "Janvier 2018", description: "Livraisons colis & marchandises villes régionales." },
    ],
    competences: ["Conduite", "Mécanique automobile", "Sécurité routière", "GPS/Navigation"],
    langues: ["Français", "Dioula"],
    certifications: ["Permis Catégorie C+E", "Certificat Sécurité Routière"],
    grade: "Opérationnel",
    site: "Siège Social",
    notesInternes: "Chauffeur expérimenté très ponctuel et sûr. Excellentes relations clients. Bon évaluateur mecanique. CDD renouvelé selon performance 2024.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "420 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Mobile Money" },
      { id: "sal-2", periode: "Février 2024", montantNet: "420 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Mobile Money" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "420 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Mobile Money" },
    ],
  },
  EMP015: {
    id: "EMP015",
    civilite: "Mme",
    nom: "Brou",
    prenom: "Elise",
    dateNaissance: "08/02/2004",
    lieuNaissance: "Gagnoa",
    nationalite: "Ivoirienne",
    genre: "Féminin",
    situationMatrimoniale: "Célibataire",
    nombreEnfants: 0,
    avatar: "/femme01.png",
    adresse: "Cocody, Rue K25",
    ville: "Abidjan",
    codePostal: "01 BP 5566",
    pays: "Côte d'Ivoire",
    telephonePersonnel: "+225 07 00 00 15",
    telephoneProfessionnel: "+225 27 22 41 15",
    emailPersonnel: "elise.brou@gmail.com",
    emailProfessionnel: "e.brou@cnf.ci",
    contactsUrgence: [
      { nom: "Jeanne Brou", relation: "Mère", telephone: "+225 07 45 67 89" },
      { nom: "Laurent Brou", relation: "Frère", telephone: "+225 07 23 45 67" },
    ],
    matricule: "MAT-2025-015",
    poste: "Stagiaire Finance",
    departement: "Finance",
    superieurHierarchique: "Evelyne Kouassi",
    dateEmbauche: "10/03/2025",
    typeContrat: "Stage",
    periodeEssai: "N/A",
    statut: "Actif",
    salaireBase: "0",
    sursalaire: "230 000",
    tauxHoraire: "1 400",
    heuresMensuelles: "173.33",
    devise: "XOF",
    frequencePaiement: "Mensuel",
    methodesPaiement: [
      {
        mode: "Mobile Money",
        operateur: "Orange Money",
        telephone: "+225 07 00 00 15",
        estPrincipal: true,
      },
    ],
    numeroCni: "CI-2004-0208-GGN-015",
    typeDocumentIdentite: "CNI (Carte Nationale d'Identité)",
    dateExpirationCni: "08/02/2034",
    numeroSecuriteSociale: "CNPS-3344556677",
    numeroFiscal: "IFU-CI-2025-13456",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Brou_Elise.pdf", fileSize: "1.1 Mo", uploadedAt: "10/03/2025" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Brou.pdf", fileSize: "0.9 Mo", uploadedAt: "10/03/2025" },
      { id: "convention-stage", label: "Convention de stage", fileName: "Convention_Stage_Brou.pdf", fileSize: "0.6 Mo", uploadedAt: "10/03/2025" },
    ],
    folderDocuments: [
      {
        id: "documents-etudes",
        name: "Documents d'études",
        status: "Complet",
        updatedAt: "17/03/2025 à 14:20",
        files: [
          { id: "d-1", label: "Carte Étudiant", fileName: "Carte_Etudiant_Brou.pdf", fileSize: "1.0 Mo", uploadedAt: "17/03/2025" },
          { id: "d-2", label: "Attestation Inscription CESAG", fileName: "Attestation_CESAG_2025.pdf", fileSize: "0.8 Mo", uploadedAt: "17/03/2025" },
        ],
      },
      {
        id: "cni",
        name: "Carte nationale d'identité",
        status: "Complet",
        updatedAt: "17/03/2025 à 14:35",
        files: [
          { id: "c-1", label: "CNI Recto-Verso", fileName: "CNI_Elise_Brou.pdf", fileSize: "1.1 Mo", uploadedAt: "17/03/2025" },
        ],
      },
    ],
    niveauEtudes: "Bac+4",
    diplome: "Master Finance (en cours)",
    etablissement: "CESAG – Dakar",
    anneeObtention: "2026",
    parcoursAcademique: [
      { id: "pa-1", diplome: "Master Finance", etablissement: "CESAG - Dakar", domaine: "Finance", dateDebut: "2024", dateFin: "2026", statut: "En cours", documentUrl: "/Courrier.pdf" },
      { id: "pa-2", diplome: "Licence Comptabilité Finance", etablissement: "CESAG - Dakar", domaine: "Finance", dateDebut: "2021", dateFin: "2024", statut: "Obtenu", documentUrl: "/Courrier.pdf" },
    ],
    experiencesProfessionnelles: [
      { id: "ep-1", poste: "Stagiaire Finance", employeur: "CNF", lieu: "Abidjan, CI", dateDebut: "Mar 2025", dateFin: "Août 2025", description: "Trésorerie, reconciliation bancaire et analyse rapports financiers consolidés." },
    ],
    competences: ["Excel", "Comptabilité SYSCOHADA", "Analyse financière", "IFRS fondamentaux"],
    langues: ["Français", "Anglais"],
    certifications: [],
    grade: "Stagiaire",
    site: "Siège Social",
    notesInternes: "Stagiaire très sérieuse et consciencieuse. Excellentes bases comptables et analytiques. À fort potentiel pour carrière finance. À considérer pour programme développement post-stage.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
    historiqueSalaires: [
      { id: "sal-1", periode: "Mars 2024", montantNet: "230 000", datePaiement: "28/03/2024", statut: "Payé", mode: "Mobile Money" },
      { id: "sal-2", periode: "Février 2024", montantNet: "230 000", datePaiement: "26/02/2024", statut: "Payé", mode: "Mobile Money" },
      { id: "sal-3", periode: "Janvier 2024", montantNet: "230 000", datePaiement: "29/01/2024", statut: "Payé", mode: "Mobile Money" },
    ],
  },
}

export function getEmployee(id: string): EmployeeProfile | undefined {
  return MOCK_EMPLOYEES[id]
}
