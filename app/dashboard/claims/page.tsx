"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  ChevronDown,
  ArrowUpDown,
  SlidersHorizontal,
  Download,
  Trash2,
  Eye,
  Edit,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"
import type { VerificationStatus, Priority } from "@/lib/types"

const mockClaims: {
  id: string
  title: string
  content: string
  source: string
  sourceUrl: string
  status: VerificationStatus
  priority: Priority
  category: string
  assignee: { name: string; avatar?: string }
  submittedBy: { name: string }
  createdAt: string
  updatedAt: string
  verificationCount: number
  commentCount: number
}[] = [
  {
    id: "CLM-1234",
    title: "Government announces new climate policy measures for 2025",
    content: "The government has announced a comprehensive set of climate policy measures targeting net-zero emissions by 2025...",
    source: "Le Monde",
    sourceUrl: "https://lemonde.fr/article/123",
    status: "investigating",
    priority: "high",
    category: "Politics",
    assignee: { name: "Jean Martin" },
    submittedBy: { name: "Admin" },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:22:00Z",
    verificationCount: 3,
    commentCount: 8,
  },
  {
    id: "CLM-1235",
    title: "Study claims 50% reduction in carbon emissions by 2030 is achievable",
    content: "A new peer-reviewed study published in Nature suggests that achieving a 50% reduction in global carbon emissions...",
    source: "Reuters",
    sourceUrl: "https://reuters.com/article/456",
    status: "pending",
    priority: "medium",
    category: "Environment",
    assignee: { name: "Sophie Bernard" },
    submittedBy: { name: "Marie Dupont" },
    createdAt: "2024-01-15T09:15:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
    verificationCount: 0,
    commentCount: 2,
  },
  {
    id: "CLM-1236",
    title: "New vaccine shows 95% efficacy in clinical trials",
    content: "Phase 3 clinical trials of a new vaccine have demonstrated 95% efficacy against the target disease...",
    source: "Nature",
    sourceUrl: "https://nature.com/article/789",
    status: "verified",
    priority: "high",
    category: "Health",
    assignee: { name: "Marie Dupont" },
    submittedBy: { name: "Jean Martin" },
    createdAt: "2024-01-14T16:45:00Z",
    updatedAt: "2024-01-15T11:30:00Z",
    verificationCount: 5,
    commentCount: 12,
  },
  {
    id: "CLM-1237",
    title: "Economic report predicts 3% GDP growth in Q4",
    content: "The latest economic forecast from the Ministry of Finance predicts a robust 3% GDP growth...",
    source: "Financial Times",
    sourceUrl: "https://ft.com/article/101",
    status: "disputed",
    priority: "medium",
    category: "Economy",
    assignee: { name: "Pierre Leroy" },
    submittedBy: { name: "Sophie Bernard" },
    createdAt: "2024-01-14T11:20:00Z",
    updatedAt: "2024-01-15T08:45:00Z",
    verificationCount: 4,
    commentCount: 15,
  },
  {
    id: "CLM-1238",
    title: "Tech company claims breakthrough in quantum computing",
    content: "A leading technology company has announced what they describe as a major breakthrough in quantum computing...",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com/article/112",
    status: "pending",
    priority: "low",
    category: "Technology",
    assignee: { name: "Alice Chen" },
    submittedBy: { name: "Admin" },
    createdAt: "2024-01-13T14:30:00Z",
    updatedAt: "2024-01-13T14:30:00Z",
    verificationCount: 1,
    commentCount: 3,
  },
  {
    id: "CLM-1239",
    title: "Social media post claims water fluoridation causes health issues",
    content: "A viral social media post claims that water fluoridation is linked to various health problems...",
    source: "Twitter",
    sourceUrl: "https://twitter.com/status/123",
    status: "false",
    priority: "urgent",
    category: "Health",
    assignee: { name: "Marie Dupont" },
    submittedBy: { name: "Pierre Leroy" },
    createdAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-14T16:20:00Z",
    verificationCount: 6,
    commentCount: 24,
  },
]

const priorityStyles: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-pending/15 text-pending",
  high: "bg-disputed/15 text-disputed",
  urgent: "bg-destructive/15 text-destructive",
}

const statusFilters: { value: VerificationStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "investigating", label: "Investigating" },
  { value: "verified", label: "Verified" },
  { value: "disputed", label: "Disputed" },
  { value: "false", label: "False" },
]

export default function ClaimsPage() {
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClaims = mockClaims.filter((claim) => {
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter
    const matchesSearch = claim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const toggleSelectAll = () => {
    if (selectedClaims.length === filteredClaims.length) {
      setSelectedClaims([])
    } else {
      setSelectedClaims(filteredClaims.map((c) => c.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedClaims((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Claims</h1>
          <p className="text-sm text-muted-foreground">
            Manage and verify claims from various sources
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Claim
        </Button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
            <TabsList className="h-9">
              {statusFilters.slice(0, 5).map((filter) => (
                <TabsTrigger key={filter.value} value={filter.value} className="text-xs">
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search claims..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-9">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  High Priority
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  My Assignments
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Recent First
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="gap-2 h-9">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedClaims.length > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 text-sm">
            <span className="font-medium">{selectedClaims.length} selected</span>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Assign
              </Button>
              <Button variant="ghost" size="sm">
                Change Status
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Claims list */}
      <Card>
        <CardContent className="p-0">
          {/* Table header */}
          <div className="flex items-center gap-4 border-b px-4 py-3 text-xs font-medium text-muted-foreground">
            <Checkbox
              checked={selectedClaims.length === filteredClaims.length && filteredClaims.length > 0}
              onCheckedChange={toggleSelectAll}
              aria-label="Select all"
            />
            <div className="flex-1 min-w-0">Claim</div>
            <div className="w-24 hidden md:block">Status</div>
            <div className="w-20 hidden lg:block">Priority</div>
            <div className="w-28 hidden lg:block">Category</div>
            <div className="w-24 hidden xl:block">Assignee</div>
            <div className="w-28 hidden xl:block">Updated</div>
            <div className="w-8" />
          </div>

          {/* Table body */}
          <div className="divide-y">
            {filteredClaims.map((claim) => (
              <div
                key={claim.id}
                className={cn(
                  "flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                  selectedClaims.includes(claim.id) && "bg-muted/30"
                )}
              >
                <Checkbox
                  checked={selectedClaims.includes(claim.id)}
                  onCheckedChange={() => toggleSelect(claim.id)}
                  aria-label={`Select ${claim.id}`}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{claim.id}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{claim.source}</span>
                  </div>
                  <Link
                    href={`/dashboard/claims/${claim.id}`}
                    className="text-sm font-medium hover:underline line-clamp-1"
                  >
                    {claim.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{claim.verificationCount} verifications</span>
                    <span>{claim.commentCount} comments</span>
                  </div>
                </div>

                <div className="w-24 hidden md:block">
                  <StatusBadge status={claim.status} size="sm" />
                </div>

                <div className="w-20 hidden lg:block">
                  <span
                    className={cn(
                      "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase",
                      priorityStyles[claim.priority]
                    )}
                  >
                    {claim.priority}
                  </span>
                </div>

                <div className="w-28 hidden lg:block">
                  <span className="text-sm text-muted-foreground">{claim.category}</span>
                </div>

                <div className="w-24 hidden xl:flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={claim.assignee.avatar} />
                    <AvatarFallback className="text-[8px]">
                      {claim.assignee.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground truncate">
                    {claim.assignee.name.split(" ")[0]}
                  </span>
                </div>

                <div className="w-28 hidden xl:block">
                  <span className="text-xs text-muted-foreground">
                    {new Date(claim.updatedAt).toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/claims/${claim.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open Source
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredClaims.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium">No claims found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredClaims.length} of {mockClaims.length} claims</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
