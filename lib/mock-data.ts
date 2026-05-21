// Mock data for VeriFact platform
import type { 
  Claim, 
  Report, 
  User, 
  Evidence, 
  Comment, 
  TimelineEvent, 
  DashboardStats, 
  Notification,
  VerificationStatus,
  Priority,
  UserRole
} from './types'

// Mock Users
export const mockUsers: User[] = [
  {
    id: "usr_1",
    name: "Marie Dupont",
    email: "marie@verifact.com",
    avatar: "",
    role: "expert",
    reputation: 94,
    expertise: ["Politics", "Economics"],
    verified: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "usr_2",
    name: "Jean Martin",
    email: "jean@lemonde.fr",
    avatar: "",
    role: "journalist",
    reputation: 87,
    expertise: ["International", "Security"],
    verified: true,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "usr_3",
    name: "Sophie Bernard",
    email: "sophie@verifact.com",
    avatar: "",
    role: "expert",
    reputation: 91,
    expertise: ["Health", "Science"],
    verified: true,
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "usr_4",
    name: "Pierre Leclerc",
    email: "pierre@figaro.fr",
    avatar: "",
    role: "journalist",
    reputation: 78,
    expertise: ["Technology", "Business"],
    verified: true,
    createdAt: new Date("2024-04-05"),
  },
  {
    id: "usr_5",
    name: "Claire Moreau",
    email: "claire@verifact.com",
    avatar: "",
    role: "admin",
    reputation: 99,
    expertise: ["Management", "Operations"],
    verified: true,
    createdAt: new Date("2023-12-01"),
  },
  {
    id: "usr_6",
    name: "Lucas Petit",
    email: "lucas@liberation.fr",
    avatar: "",
    role: "journalist",
    reputation: 82,
    expertise: ["Environment", "Climate"],
    verified: true,
    createdAt: new Date("2024-05-15"),
  },
]

// Mock Claims
export const mockClaims: Claim[] = [
  {
    id: "clm_1",
    title: "Le taux de chômage a atteint un record historique en France",
    content: "Selon une publication virale sur les réseaux sociaux, le taux de chômage en France aurait atteint un niveau record de 15% au premier trimestre 2024.",
    source: "Twitter/X",
    sourceUrl: "https://x.com/example/status/123",
    status: "pending",
    priority: "high",
    submittedBy: mockUsers[1],
    assignedTo: [mockUsers[0], mockUsers[2]],
    createdAt: new Date("2024-05-20T10:30:00"),
    updatedAt: new Date("2024-05-21T14:20:00"),
    category: "Economics",
    tags: ["unemployment", "statistics", "france"],
    verificationCount: 3,
    disputeCount: 1,
  },
  {
    id: "clm_2",
    title: "Un nouveau vaccin approuvé sans essais cliniques complets",
    content: "Une information circulant sur plusieurs sites affirme qu'un nouveau vaccin a été approuvé par l'EMA sans avoir complété tous les essais cliniques de phase 3.",
    source: "Facebook",
    sourceUrl: "https://facebook.com/post/456",
    status: "investigating",
    priority: "urgent",
    submittedBy: mockUsers[3],
    assignedTo: [mockUsers[2]],
    createdAt: new Date("2024-05-19T08:15:00"),
    updatedAt: new Date("2024-05-21T11:45:00"),
    category: "Health",
    tags: ["vaccine", "ema", "clinical-trials"],
    verificationCount: 5,
    disputeCount: 2,
  },
  {
    id: "clm_3",
    title: "Le gouvernement prévoit une taxe de 30% sur les véhicules électriques",
    content: "Un article partagé sur LinkedIn suggère que le gouvernement français envisage d'introduire une taxe de 30% sur les véhicules électriques d'ici 2025.",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/post/789",
    status: "verified",
    priority: "medium",
    submittedBy: mockUsers[5],
    assignedTo: [mockUsers[0]],
    createdAt: new Date("2024-05-18T16:00:00"),
    updatedAt: new Date("2024-05-20T09:30:00"),
    category: "Politics",
    tags: ["electric-vehicles", "tax", "government"],
    verificationCount: 8,
    disputeCount: 0,
  },
  {
    id: "clm_4",
    title: "Une étude révèle que le café augmente la durée de vie de 10 ans",
    content: "Une publication virale cite une étude selon laquelle boire 5 tasses de café par jour augmenterait l'espérance de vie de 10 ans.",
    source: "Instagram",
    sourceUrl: "https://instagram.com/p/abc",
    status: "false",
    priority: "low",
    submittedBy: mockUsers[1],
    assignedTo: [mockUsers[2]],
    createdAt: new Date("2024-05-17T12:00:00"),
    updatedAt: new Date("2024-05-19T15:00:00"),
    category: "Health",
    tags: ["coffee", "health", "longevity"],
    verificationCount: 12,
    disputeCount: 0,
  },
  {
    id: "clm_5",
    title: "L'IA va remplacer 80% des emplois dans les 5 prochaines années",
    content: "Un rapport largement partagé affirme que l'intelligence artificielle remplacera 80% des emplois actuels d'ici 2029.",
    source: "Blog Medium",
    sourceUrl: "https://medium.com/@author/ai-jobs",
    status: "disputed",
    priority: "medium",
    submittedBy: mockUsers[3],
    assignedTo: [mockUsers[0], mockUsers[4]],
    createdAt: new Date("2024-05-16T09:00:00"),
    updatedAt: new Date("2024-05-21T16:30:00"),
    category: "Technology",
    tags: ["ai", "employment", "future-of-work"],
    verificationCount: 6,
    disputeCount: 4,
  },
  {
    id: "clm_6",
    title: "La France a signé un accord secret avec la Russie",
    content: "Un article de blog prétend que la France aurait signé un accord commercial secret avec la Russie malgré les sanctions européennes.",
    source: "Blog personnel",
    sourceUrl: "https://example-blog.com/france-russia",
    status: "investigating",
    priority: "high",
    submittedBy: mockUsers[5],
    assignedTo: [mockUsers[1], mockUsers[0]],
    createdAt: new Date("2024-05-21T07:00:00"),
    updatedAt: new Date("2024-05-21T18:00:00"),
    category: "International",
    tags: ["france", "russia", "diplomacy", "sanctions"],
    verificationCount: 2,
    disputeCount: 1,
  },
  {
    id: "clm_7",
    title: "Les émissions de CO2 ont diminué de 50% en Europe",
    content: "Une infographie circulant sur les réseaux sociaux affirme que les émissions de CO2 en Europe ont diminué de 50% depuis 2020.",
    source: "Twitter/X",
    sourceUrl: "https://x.com/climate/status/456",
    status: "pending",
    priority: "medium",
    submittedBy: mockUsers[5],
    assignedTo: [],
    createdAt: new Date("2024-05-21T11:00:00"),
    updatedAt: new Date("2024-05-21T11:00:00"),
    category: "Environment",
    tags: ["climate", "co2", "europe", "emissions"],
    verificationCount: 0,
    disputeCount: 0,
  },
  {
    id: "clm_8",
    title: "Un nouveau traitement guérit le cancer en 3 jours",
    content: "Un site web promeut un traitement miracle qui guérirait tous les types de cancer en seulement 3 jours sans effets secondaires.",
    source: "Site web commercial",
    sourceUrl: "https://miracle-cure.example.com",
    status: "false",
    priority: "urgent",
    submittedBy: mockUsers[3],
    assignedTo: [mockUsers[2]],
    createdAt: new Date("2024-05-15T14:30:00"),
    updatedAt: new Date("2024-05-18T10:00:00"),
    category: "Health",
    tags: ["cancer", "scam", "health-misinformation"],
    verificationCount: 15,
    disputeCount: 0,
  },
]

// Mock Reports
export const mockReports: Report[] = [
  {
    id: "rpt_1",
    title: "Analyse des fausses informations économiques Q1 2024",
    summary: "Ce rapport examine les principales désinformations économiques diffusées au premier trimestre 2024, avec un focus sur les statistiques de l'emploi et l'inflation.",
    claims: [mockClaims[0], mockClaims[2]],
    status: "verified",
    author: mockUsers[0],
    reviewers: [mockUsers[2], mockUsers[4]],
    publishedAt: new Date("2024-04-15"),
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-15"),
  },
  {
    id: "rpt_2",
    title: "Désinformation santé: Les vaccins en 2024",
    summary: "Analyse complète des informations erronées concernant les vaccins et traitements médicaux circulant sur les réseaux sociaux.",
    claims: [mockClaims[1], mockClaims[3], mockClaims[7]],
    status: "pending",
    author: mockUsers[2],
    reviewers: [mockUsers[0]],
    createdAt: new Date("2024-05-10"),
    updatedAt: new Date("2024-05-20"),
  },
  {
    id: "rpt_3",
    title: "L'IA et l'emploi: Démystification des prédictions alarmistes",
    summary: "Examen critique des affirmations exagérées sur l'impact de l'IA sur le marché du travail.",
    claims: [mockClaims[4]],
    status: "investigating",
    author: mockUsers[3],
    reviewers: [mockUsers[0], mockUsers[4]],
    createdAt: new Date("2024-05-18"),
    updatedAt: new Date("2024-05-21"),
  },
]

// Mock Evidence
export const mockEvidence: Evidence[] = [
  {
    id: "evd_1",
    claimId: "clm_1",
    type: "source",
    title: "Données INSEE officielles sur le chômage",
    content: "Selon les données officielles de l'INSEE publiées le 15 mai 2024, le taux de chômage en France s'établit à 7.3% au T1 2024, loin du 15% avancé.",
    url: "https://insee.fr/fr/statistiques/chomage",
    submittedBy: mockUsers[0],
    credibilityScore: 95,
    createdAt: new Date("2024-05-20T14:00:00"),
  },
  {
    id: "evd_2",
    claimId: "clm_2",
    type: "document",
    title: "Communiqué officiel de l'EMA",
    content: "L'EMA confirme que tous les vaccins approuvés ont suivi le protocole complet d'essais cliniques, y compris la phase 3.",
    url: "https://ema.europa.eu/press-release",
    submittedBy: mockUsers[2],
    credibilityScore: 98,
    createdAt: new Date("2024-05-19T16:30:00"),
  },
  {
    id: "evd_3",
    claimId: "clm_3",
    type: "expert_opinion",
    title: "Avis de l'économiste Dr. Lambert",
    content: "Aucun projet de loi ne prévoit une taxe de 30% sur les véhicules électriques. Cette information est sans fondement.",
    submittedBy: mockUsers[0],
    credibilityScore: 88,
    createdAt: new Date("2024-05-19T10:00:00"),
  },
]

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: "cmt_1",
    content: "J'ai vérifié les sources INSEE et les chiffres ne correspondent pas du tout. Le taux réel est autour de 7%.",
    author: mockUsers[0],
    claimId: "clm_1",
    createdAt: new Date("2024-05-20T15:00:00"),
    updatedAt: new Date("2024-05-20T15:00:00"),
    reactions: { "👍": 5, "💡": 2 },
  },
  {
    id: "cmt_2",
    content: "Attention, la source originale mentionne 15% mais c'est pour une région spécifique, pas la moyenne nationale.",
    author: mockUsers[1],
    claimId: "clm_1",
    parentId: "cmt_1",
    createdAt: new Date("2024-05-20T16:30:00"),
    updatedAt: new Date("2024-05-20T16:30:00"),
    reactions: { "👍": 3 },
  },
  {
    id: "cmt_3",
    content: "J'ai contacté l'EMA directement. Ils confirment que tous les protocoles ont été respectés.",
    author: mockUsers[2],
    claimId: "clm_2",
    createdAt: new Date("2024-05-19T18:00:00"),
    updatedAt: new Date("2024-05-19T18:00:00"),
    reactions: { "👍": 8, "🎯": 3 },
  },
]

// Mock Timeline Events
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "evt_1",
    type: "status_change",
    title: "Statut changé à Vérifié",
    description: "La réclamation a été vérifiée comme fausse après analyse des données INSEE.",
    user: mockUsers[0],
    timestamp: new Date("2024-05-20T17:00:00"),
    metadata: { previousStatus: "investigating", newStatus: "verified" },
  },
  {
    id: "evt_2",
    type: "evidence_added",
    title: "Nouvelle preuve ajoutée",
    description: "Document officiel de l'EMA ajouté comme preuve.",
    user: mockUsers[2],
    timestamp: new Date("2024-05-19T16:30:00"),
    metadata: { evidenceId: "evd_2" },
  },
  {
    id: "evt_3",
    type: "assignment",
    title: "Assigné à Sophie Bernard",
    description: "La réclamation a été assignée pour vérification experte.",
    user: mockUsers[4],
    timestamp: new Date("2024-05-19T09:00:00"),
    metadata: { assigneeId: "usr_3" },
  },
  {
    id: "evt_4",
    type: "comment",
    title: "Nouveau commentaire",
    description: "Marie Dupont a ajouté un commentaire sur l'analyse des sources.",
    user: mockUsers[0],
    timestamp: new Date("2024-05-20T15:00:00"),
  },
  {
    id: "evt_5",
    type: "review",
    title: "Révision complétée",
    description: "Révision par pair complétée avec approbation.",
    user: mockUsers[2],
    timestamp: new Date("2024-05-20T18:00:00"),
  },
]

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalClaims: 156,
  pendingReviews: 23,
  verifiedToday: 8,
  disputedClaims: 12,
  activeInvestigations: 15,
  teamMembers: 24,
}

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "ntf_1",
    type: "assignment",
    title: "Nouvelle assignation",
    message: "Vous avez été assigné à la vérification de 'Le taux de chômage a atteint un record'",
    read: false,
    createdAt: new Date("2024-05-21T09:00:00"),
    link: "/dashboard/claims/clm_1",
  },
  {
    id: "ntf_2",
    type: "mention",
    title: "Mention dans un commentaire",
    message: "Jean Martin vous a mentionné dans un commentaire",
    read: false,
    createdAt: new Date("2024-05-21T08:30:00"),
    link: "/dashboard/claims/clm_2",
  },
  {
    id: "ntf_3",
    type: "status_change",
    title: "Statut mis à jour",
    message: "La réclamation 'Nouveau vaccin approuvé' est passée à 'En investigation'",
    read: true,
    createdAt: new Date("2024-05-20T18:00:00"),
    link: "/dashboard/claims/clm_2",
  },
  {
    id: "ntf_4",
    type: "comment",
    title: "Nouveau commentaire",
    message: "Sophie Bernard a commenté sur une réclamation que vous suivez",
    read: true,
    createdAt: new Date("2024-05-20T16:30:00"),
    link: "/dashboard/claims/clm_1",
  },
  {
    id: "ntf_5",
    type: "system",
    title: "Rappel de révision",
    message: "Vous avez 3 réclamations en attente de révision depuis plus de 48h",
    read: false,
    createdAt: new Date("2024-05-21T07:00:00"),
    link: "/dashboard/pending",
  },
]

// Helper functions
export function getClaimsByStatus(status: VerificationStatus): Claim[] {
  return mockClaims.filter(claim => claim.status === status)
}

export function getClaimsByPriority(priority: Priority): Claim[] {
  return mockClaims.filter(claim => claim.priority === priority)
}

export function getUsersByRole(role: UserRole): User[] {
  return mockUsers.filter(user => user.role === role)
}

export function getRecentClaims(limit: number = 5): Claim[] {
  return [...mockClaims]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
}

export function getUnreadNotifications(): Notification[] {
  return mockNotifications.filter(n => !n.read)
}

// Status distribution for charts
export function getStatusDistribution() {
  const distribution: Record<VerificationStatus, number> = {
    verified: 0,
    pending: 0,
    disputed: 0,
    investigating: 0,
    false: 0,
    unverified: 0,
  }
  
  mockClaims.forEach(claim => {
    distribution[claim.status]++
  })
  
  return Object.entries(distribution).map(([status, count]) => ({
    status,
    count,
  }))
}

// Activity data for charts (last 7 days)
export function getActivityData() {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  return days.map((day, i) => ({
    day,
    submitted: Math.floor(Math.random() * 15) + 5,
    verified: Math.floor(Math.random() * 10) + 3,
    disputed: Math.floor(Math.random() * 5) + 1,
  }))
}
