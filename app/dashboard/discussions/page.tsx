"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  MessageSquare,
  Clock,
  User,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Pin,
  CheckCircle2,
  Filter,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Discussion {
  id: string
  title: string
  preview: string
  claim?: { id: string; title: string }
  author: { name: string; avatar?: string; role: string }
  participants: { name: string; avatar?: string }[]
  replies: number
  likes: number
  lastActivity: string
  createdAt: string
  isPinned?: boolean
  isResolved?: boolean
  tags: string[]
}

const mockDiscussions: Discussion[] = [
  {
    id: "disc_1",
    title: "Methodology for verifying climate statistics",
    preview: "I propose we establish a standardized methodology for verifying climate-related claims. This would include cross-referencing with official datasets from IPCC, NASA, and NOAA...",
    author: { name: "Marie Dupont", role: "Expert" },
    participants: [
      { name: "Jean Martin" },
      { name: "Sophie Bernard" },
      { name: "Pierre Leroy" },
    ],
    replies: 12,
    likes: 8,
    lastActivity: "10 min ago",
    createdAt: "2024-01-14",
    isPinned: true,
    tags: ["methodology", "climate", "guidelines"],
  },
  {
    id: "disc_2",
    title: "Review needed: Conflicting expert opinions on CLM-1237",
    preview: "We have received conflicting assessments from two experts on the economic growth claim. Dr. Lambert suggests the methodology is flawed, while Prof. Mercier supports the findings...",
    claim: { id: "CLM-1237", title: "Economic report predicts 3% GDP growth in Q4" },
    author: { name: "Jean Martin", role: "Journalist" },
    participants: [
      { name: "Marie Dupont" },
      { name: "Alice Chen" },
    ],
    replies: 7,
    likes: 3,
    lastActivity: "1 hour ago",
    createdAt: "2024-01-15",
    tags: ["review", "economy", "expert-opinion"],
  },
  {
    id: "disc_3",
    title: "Best practices for handling viral misinformation",
    preview: "After dealing with several high-volume viral claims this week, I think we need to discuss our prioritization process. Should we have a dedicated rapid-response team?",
    author: { name: "Sophie Bernard", role: "Expert" },
    participants: [
      { name: "Marie Dupont" },
      { name: "Jean Martin" },
      { name: "Pierre Leroy" },
      { name: "Alice Chen" },
    ],
    replies: 23,
    likes: 15,
    lastActivity: "2 hours ago",
    createdAt: "2024-01-13",
    isPinned: true,
    tags: ["process", "viral", "best-practices"],
  },
  {
    id: "disc_4",
    title: "Source verification for CLM-1239",
    preview: "The original source appears to be a satirical account, but the claim has been reshared without context. Should we contact the original poster for clarification?",
    claim: { id: "CLM-1239", title: "Social media post claims water fluoridation causes health issues" },
    author: { name: "Alice Chen", role: "Expert" },
    participants: [
      { name: "Marie Dupont" },
    ],
    replies: 5,
    likes: 2,
    lastActivity: "3 hours ago",
    createdAt: "2024-01-15",
    isResolved: true,
    tags: ["source-verification", "health"],
  },
  {
    id: "disc_5",
    title: "Weekly team sync notes - January 15",
    preview: "Sharing notes from today team sync. Key topics: new verification guidelines, upcoming training session, and Q1 goals review...",
    author: { name: "Admin", role: "Moderator" },
    participants: [
      { name: "Marie Dupont" },
      { name: "Jean Martin" },
      { name: "Sophie Bernard" },
      { name: "Pierre Leroy" },
      { name: "Alice Chen" },
    ],
    replies: 3,
    likes: 6,
    lastActivity: "5 hours ago",
    createdAt: "2024-01-15",
    tags: ["team", "meeting-notes"],
  },
  {
    id: "disc_6",
    title: "Question about EMA approval process verification",
    preview: "For CLM-1235, I need help understanding the standard EMA approval timeline. Does anyone have contacts at the agency who could provide official documentation?",
    claim: { id: "CLM-1235", title: "Study claims 50% reduction in carbon emissions by 2030 is achievable" },
    author: { name: "Pierre Leroy", role: "Journalist" },
    participants: [
      { name: "Sophie Bernard" },
    ],
    replies: 4,
    likes: 1,
    lastActivity: "6 hours ago",
    createdAt: "2024-01-15",
    tags: ["question", "ema", "regulatory"],
  },
]

export default function DiscussionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredDiscussions = mockDiscussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.preview.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === "pinned") return matchesSearch && discussion.isPinned
    if (activeTab === "resolved") return matchesSearch && discussion.isResolved
    if (activeTab === "claims") return matchesSearch && discussion.claim
    return matchesSearch
  })

  // Sort: pinned first, then by lastActivity
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Discussions</h1>
          <p className="text-sm text-muted-foreground">
            Collaborate with your team on claims and verification processes
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Discussion
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="h-9">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="pinned" className="text-xs">Pinned</TabsTrigger>
            <TabsTrigger value="claims" className="text-xs">Claim Related</TabsTrigger>
            <TabsTrigger value="resolved" className="text-xs">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 sm:ml-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9"
            />
          </div>
        </div>
      </div>

      {/* Discussions list */}
      <div className="space-y-3">
        {sortedDiscussions.map((discussion) => (
          <Card key={discussion.id} className={cn(
            "transition-colors hover:bg-muted/50",
            discussion.isPinned && "border-investigating/30 bg-investigating/5"
          )}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={discussion.author.avatar} />
                  <AvatarFallback>
                    {discussion.author.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {discussion.isPinned && (
                          <Pin className="h-3 w-3 text-investigating" />
                        )}
                        {discussion.isResolved && (
                          <CheckCircle2 className="h-3 w-3 text-verified" />
                        )}
                        <Link
                          href={`/dashboard/discussions/${discussion.id}`}
                          className="font-medium hover:underline line-clamp-1"
                        >
                          {discussion.title}
                        </Link>
                      </div>
                      
                      {discussion.claim && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            <MessageSquare className="h-2.5 w-2.5 mr-1" />
                            {discussion.claim.id}
                          </Badge>
                          <span className="text-xs text-muted-foreground truncate max-w-[300px]">
                            {discussion.claim.title}
                          </span>
                        </div>
                      )}
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {discussion.preview}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {discussion.author.name}
                          <Badge variant="secondary" className="text-[9px] ml-1">
                            {discussion.author.role}
                          </Badge>
                        </span>
                        <span className="flex items-center gap-1">
                          <Reply className="h-3 w-3" />
                          {discussion.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {discussion.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {discussion.lastActivity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 shrink-0">
                      <div className="flex -space-x-2">
                        {discussion.participants.slice(0, 3).map((participant, i) => (
                          <Avatar key={i} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback className="text-[8px]">
                              {participant.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {discussion.participants.length > 3 && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[9px] font-medium">
                            +{discussion.participants.length - 3}
                          </div>
                        )}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pin className="mr-2 h-4 w-4" />
                            {discussion.isPinned ? "Unpin" : "Pin"} discussion
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as {discussion.isResolved ? "unresolved" : "resolved"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete discussion
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    {discussion.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedDiscussions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium">No discussions found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {sortedDiscussions.length} of {mockDiscussions.length} discussions</span>
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
