"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  User,
  MessageSquare,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Send,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Link2,
  Bookmark,
  Share2,
  Flag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"
import type { VerificationStatus, Priority } from "@/lib/types"

// Mock data for the claim detail
const mockClaim = {
  id: "CLM-1234",
  title: "Government announces new climate policy measures for 2025",
  content: `The government has announced a comprehensive set of climate policy measures targeting net-zero emissions by 2025. According to the official press release, these measures include:

1. A 40% reduction in industrial carbon emissions
2. Mandatory renewable energy usage for all public buildings
3. €50 billion investment in green infrastructure
4. New electric vehicle subsidies

The announcement was made during a press conference attended by the Minister of Environment and several key stakeholders from the energy sector.`,
  source: "Le Monde",
  sourceUrl: "https://lemonde.fr/article/123",
  status: "investigating" as VerificationStatus,
  priority: "high" as Priority,
  category: "Politics",
  tags: ["Climate", "Policy", "Government", "Environment"],
  assignees: [
    { name: "Jean Martin", role: "Expert" },
    { name: "Sophie Bernard", role: "Journalist" },
  ],
  submittedBy: { name: "Admin", role: "Moderator" },
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:22:00Z",
}

const evidence = [
  {
    id: 1,
    type: "source",
    title: "Official Government Press Release",
    description: "Original press release from the Ministry of Environment",
    url: "https://gov.fr/press/climate-2025",
    submittedBy: { name: "Jean Martin" },
    credibility: 95,
    createdAt: "2024-01-15T11:00:00Z",
    supports: true,
  },
  {
    id: 2,
    type: "expert_opinion",
    title: "Climate Scientist Analysis",
    description: "Dr. Pierre Durand confirms the feasibility of the 40% reduction target",
    submittedBy: { name: "Sophie Bernard" },
    credibility: 88,
    createdAt: "2024-01-15T12:30:00Z",
    supports: true,
  },
  {
    id: 3,
    type: "data",
    title: "Historical Emission Data",
    description: "Data showing current emission levels and required reduction trajectory",
    url: "https://data.gov.fr/emissions",
    submittedBy: { name: "Marie Dupont" },
    credibility: 92,
    createdAt: "2024-01-15T13:15:00Z",
    supports: null,
  },
]

const timeline = [
  {
    id: 1,
    type: "status_change",
    title: "Status changed to Investigating",
    user: { name: "Jean Martin" },
    timestamp: "2024-01-15T11:00:00Z",
  },
  {
    id: 2,
    type: "evidence_added",
    title: "Added evidence: Official Government Press Release",
    user: { name: "Jean Martin" },
    timestamp: "2024-01-15T11:00:00Z",
  },
  {
    id: 3,
    type: "comment",
    title: "Initial review completed",
    description: "The claim appears to be based on official sources. Proceeding with verification.",
    user: { name: "Sophie Bernard" },
    timestamp: "2024-01-15T11:30:00Z",
  },
  {
    id: 4,
    type: "evidence_added",
    title: "Added expert opinion from Dr. Pierre Durand",
    user: { name: "Sophie Bernard" },
    timestamp: "2024-01-15T12:30:00Z",
  },
  {
    id: 5,
    type: "assignment",
    title: "Marie Dupont joined the investigation",
    user: { name: "System" },
    timestamp: "2024-01-15T13:00:00Z",
  },
]

const comments = [
  {
    id: 1,
    content: "I have verified the original source and it matches the claim. The press release is authentic.",
    author: { name: "Jean Martin", role: "Expert" },
    createdAt: "2024-01-15T11:15:00Z",
    reactions: { like: 3, dislike: 0 },
  },
  {
    id: 2,
    content: "The 40% reduction target seems ambitious. I am reaching out to climate experts for additional context.",
    author: { name: "Sophie Bernard", role: "Journalist" },
    createdAt: "2024-01-15T11:45:00Z",
    reactions: { like: 2, dislike: 0 },
  },
  {
    id: 3,
    content: "I have added historical emission data for comparison. The target is challenging but not unprecedented based on similar policies in other countries.",
    author: { name: "Marie Dupont", role: "Expert" },
    createdAt: "2024-01-15T13:30:00Z",
    reactions: { like: 5, dislike: 1 },
  },
]

const priorityStyles: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-pending/15 text-pending",
  high: "bg-disputed/15 text-disputed",
  urgent: "bg-destructive/15 text-destructive",
}

export default function ClaimDetailPage() {
  const params = useParams()
  const [newComment, setNewComment] = useState("")

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/claims">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-muted-foreground">{mockClaim.id}</span>
              <StatusBadge status={mockClaim.status} />
              <span
                className={cn(
                  "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase",
                  priorityStyles[mockClaim.priority]
                )}
              >
                {mockClaim.priority}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Claim</DropdownMenuItem>
              <DropdownMenuItem>Assign Expert</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                Report Issue
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 p-6 lg:grid-cols-3">
        {/* Left column - Claim details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Claim content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">{mockClaim.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <Link2 className="h-3 w-3" />
                  <a
                    href={mockClaim.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {mockClaim.source}
                  </a>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(mockClaim.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{mockClaim.content}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {mockClaim.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Evidence, Timeline, Discussion */}
          <Tabs defaultValue="evidence">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="evidence" className="gap-2">
                <FileText className="h-4 w-4" />
                Evidence ({evidence.length})
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="discussion" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussion ({comments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="evidence" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Supporting Evidence</h3>
                <Button size="sm" variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Evidence
                </Button>
              </div>
              <div className="space-y-3">
                {evidence.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs capitalize">
                              {item.type.replace("_", " ")}
                            </Badge>
                            {item.supports !== null && (
                              <span
                                className={cn(
                                  "flex items-center gap-1 text-xs",
                                  item.supports ? "text-verified" : "text-destructive"
                                )}
                              >
                                {item.supports ? (
                                  <ThumbsUp className="h-3 w-3" />
                                ) : (
                                  <ThumbsDown className="h-3 w-3" />
                                )}
                                {item.supports ? "Supports" : "Contradicts"}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-investigating hover:underline mt-2"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Source
                            </a>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-bold text-verified">{item.credibility}%</div>
                          <span className="text-xs text-muted-foreground">Credibility</span>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Added by {item.submittedBy.name}</span>
                        <span>
                          {new Date(item.createdAt).toLocaleString("fr-FR", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                {timeline.map((event) => (
                  <div key={event.id} className="relative">
                    <div className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-background border-2 border-muted-foreground" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{event.title}</span>
                      </div>
                      {event.description && (
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{event.user.name}</span>
                        <span>•</span>
                        <span>
                          {new Date(event.timestamp).toLocaleString("fr-FR", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discussion" className="mt-4 space-y-4">
              {/* Comments */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {comment.author.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.author.name}</span>
                            <Badge variant="secondary" className="text-[10px]">
                              {comment.author.role}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.createdAt).toLocaleString("fr-FR", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                              <ThumbsUp className="h-3 w-3" />
                              {comment.reactions.like}
                            </button>
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                              <ThumbsDown className="h-3 w-3" />
                              {comment.reactions.dislike}
                            </button>
                            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Add comment */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">MD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-20 resize-none"
                      />
                      <div className="flex justify-end">
                        <Button size="sm" className="gap-2">
                          <Send className="h-4 w-4" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          {/* Verification Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Verification Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full gap-2 bg-verified hover:bg-verified/90 text-verified-foreground">
                <CheckCircle2 className="h-4 w-4" />
                Mark as Verified
              </Button>
              <Button variant="outline" className="w-full gap-2 text-disputed hover:text-disputed">
                <AlertTriangle className="h-4 w-4" />
                Mark as Disputed
              </Button>
              <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive">
                <XCircle className="h-4 w-4" />
                Mark as False
              </Button>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Category</span>
                <p className="text-sm font-medium">{mockClaim.category}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Submitted by</span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[8px]">
                      {mockClaim.submittedBy.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{mockClaim.submittedBy.name}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Last Updated</span>
                <p className="text-sm">
                  {new Date(mockClaim.updatedAt).toLocaleString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Team */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Assigned Team</CardTitle>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockClaim.assignees.map((assignee) => (
                <div key={assignee.name} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {assignee.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{assignee.name}</p>
                    <p className="text-xs text-muted-foreground">{assignee.role}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full gap-2 mt-2">
                <Plus className="h-4 w-4" />
                Add Reviewer
              </Button>
            </CardContent>
          </Card>

          {/* Credibility Score */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Credibility Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-muted"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="78, 100"
                      className="text-verified"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">78%</span>
                    <span className="text-xs text-muted-foreground">Score</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                Based on {evidence.length} pieces of evidence and {comments.length} expert reviews
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
