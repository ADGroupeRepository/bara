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
  // Rémunération
  salaireBase: string
  devise: string
  frequencePaiement: string
  methodesPaiement: PaymentMethod[]
  indemniteTransport: string
  primeLogement: string
  // Documents
  numeroCni: string
  dateExpirationCni: string
  numeroSecuriteSociale: string
  numeroFiscal: string
  documents: EmployeeDocument[]
  // Formation
  niveauEtudes: string
  diplome: string
  etablissement: string
  anneeObtention: string
  competences: string[]
  langues: string[]
  certifications: string[]
  // Notes
  notesInternes: string
  aptitudeMedicale: string
  handicapDeclare: boolean
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
    salaireBase: "2 500 000",
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
    indemniteTransport: "100 000",
    primeLogement: "250 000",
    numeroCni: "CI-1985-0315-ABI-001",
    dateExpirationCni: "15/03/2030",
    numeroSecuriteSociale: "CNPS-1234567890",
    numeroFiscal: "IFU-CI-2020-00456",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Sylla_Siaka.pdf", fileSize: "2.1 Mo", uploadedAt: "01/01/2020" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Sylla.pdf", fileSize: "1.4 Mo", uploadedAt: "01/01/2020" },
      { id: "diploma", label: "Diplôme", fileName: "Master_Management_CESAG.pdf", fileSize: "3.2 Mo", uploadedAt: "01/01/2020" },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Management des Organisations",
    etablissement: "CESAG – Dakar",
    anneeObtention: "2010",
    competences: ["Leadership", "Management stratégique", "Gestion de projet", "Finances publiques"],
    langues: ["Français", "Anglais", "Dioula"],
    certifications: ["PMP (Project Management Professional)", "ITIL v4 Foundation"],
    notesInternes: "Collaborateur exemplaire avec une forte capacité de leadership. A mené avec succès la transformation digitale de l'organisation en 2023. Envisagé pour un programme de formation continue en 2025.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
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
    salaireBase: "1 200 000",
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
    indemniteTransport: "50 000",
    primeLogement: "100 000",
    numeroCni: "CI-1990-0722-BKE-002",
    dateExpirationCni: "22/07/2028",
    numeroSecuriteSociale: "CNPS-0987654321",
    numeroFiscal: "IFU-CI-2021-00789",
    documents: [
      { id: "cv", label: "Curriculum Vitae", fileName: "CV_Dupont_Jean.pdf", fileSize: "1.8 Mo", uploadedAt: "15/03/2021" },
      { id: "id-doc", label: "Pièce d'identité", fileName: "CNI_Dupont.pdf", fileSize: "1.1 Mo", uploadedAt: "15/03/2021" },
    ],
    niveauEtudes: "Bac+5",
    diplome: "Master en Informatique",
    etablissement: "INP-HB Yamoussoukro",
    anneeObtention: "2015",
    competences: ["Architecture logicielle", "DevOps", "Cloud AWS", "React", "Node.js"],
    langues: ["Français", "Anglais"],
    certifications: ["AWS Solutions Architect", "Scrum Master"],
    notesInternes: "Très bon technicien, fiable et autonome. Pilote la migration vers le cloud.",
    aptitudeMedicale: "Apte",
    handicapDeclare: false,
  },
}

export function getEmployee(id: string): EmployeeProfile | undefined {
  return MOCK_EMPLOYEES[id]
}
