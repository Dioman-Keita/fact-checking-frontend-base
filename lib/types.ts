// Core types for the VeriFact platform

export type VerificationStatus = 
  | "verified" 
  | "pending" 
  | "disputed" 
  | "investigating" 
  | "false" 
  | "unverified"

export type UserRole = "journalist" | "expert" | "admin" | "moderator"

export type Priority = "low" | "medium" | "high" | "urgent"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  reputation: number
  expertise?: string[]
  verified: boolean
  createdAt: Date
}

export interface Claim {
  id: string
  title: string
  content: string
  source: string
  sourceUrl?: string
  status: VerificationStatus
  priority: Priority
  submittedBy: User
  assignedTo?: User[]
  createdAt: Date
  updatedAt: Date
  category: string
  tags: string[]
  verificationCount: number
  disputeCount: number
}

export interface Report {
  id: string
  title: string
  summary: string
  claims: Claim[]
  status: VerificationStatus
  author: User
  reviewers: User[]
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Evidence {
  id: string
  claimId: string
  type: "source" | "document" | "expert_opinion" | "data"
  title: string
  content: string
  url?: string
  submittedBy: User
  credibilityScore: number
  createdAt: Date
}

export interface Comment {
  id: string
  content: string
  author: User
  claimId?: string
  reportId?: string
  parentId?: string
  createdAt: Date
  updatedAt: Date
  reactions: Record<string, number>
}

export interface TimelineEvent {
  id: string
  type: "status_change" | "comment" | "evidence_added" | "assignment" | "review"
  title: string
  description?: string
  user: User
  timestamp: Date
  metadata?: Record<string, unknown>
}

export interface DashboardStats {
  totalClaims: number
  pendingReviews: number
  verifiedToday: number
  disputedClaims: number
  activeInvestigations: number
  teamMembers: number
}

export interface Notification {
  id: string
  type: "assignment" | "mention" | "status_change" | "comment" | "system"
  title: string
  message: string
  read: boolean
  createdAt: Date
  link?: string
}
