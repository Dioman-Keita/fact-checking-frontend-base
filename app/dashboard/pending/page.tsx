"use client"

import Link from "next/link"
import {
  Clock,
  ArrowRight,
  User,
  Calendar,
  AlertCircle,
  ChevronRight,
  Filter,
  SlidersHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"
import type { Priority } from "@/lib/types"

const pendingClaims = [
  {
    id: "CLM-1235",
    title: "Study claims 50% reduction in carbon emissions by 2030 is achievable",
    source: "Reuters",
    priority: "medium" as Priority,
    category: "Environment",
    waitingTime: "3 hours",
    urgencyScore: 65,
    assignee: { name: "Sophie Bernard" },
    requiredExperts: 2,
    currentExperts: 1,
  },
  {
    id: "CLM-1238",
    title: "Tech company claims breakthrough in quantum computing",
    source: "TechCrunch",
    priority: "low" as Priority,
    category: "Technology",
    waitingTime: "8 hours",
    urgencyScore: 35,
    assignee: { name: "Alice Chen" },
    requiredExperts: 2,
    currentExperts: 1,
  },
  {
    id: "CLM-1240",
    title: "New study links sleep patterns to productivity",
    source: "Science Daily",
    priority: "medium" as Priority,
    category: "Health",
    waitingTime: "2 hours",
    urgencyScore: 55,
    assignee: null,
    requiredExperts: 2,
    currentExperts: 0,
  },
  {
    id: "CLM-1241",
    title: "Report suggests AI could replace 40% of jobs by 2030",
    source: "Bloomberg",
    priority: "high" as Priority,
    category: "Technology",
    waitingTime: "1 hour",
    urgencyScore: 85,
    assignee: { name: "Pierre Leroy" },
    requiredExperts: 3,
    currentExperts: 1,
  },
  {
    id: "CLM-1242",
    title: "City announces new public transport expansion plan",
    source: "Local News",
    priority: "low" as Priority,
    category: "Infrastructure",
    waitingTime: "12 hours",
    urgencyScore: 25,
    assignee: null,
    requiredExperts: 1,
    currentExperts: 0,
  },
]

const queueStats = {
  total: 8,
  highPriority: 2,
  avgWaitTime: "4.5 hours",
  unassigned: 3,
}

const priorityStyles: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-pending/15 text-pending",
  high: "bg-disputed/15 text-disputed",
  urgent: "bg-destructive/15 text-destructive",
}

export default function PendingPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pending Review</h1>
          <p className="text-sm text-muted-foreground">
            Claims waiting for verification by experts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="urgency">
            <SelectTrigger className="w-40 h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgency">Urgency Score</SelectItem>
              <SelectItem value="waiting">Waiting Time</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2 h-9">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Queue stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{queueStats.total}</p>
                <p className="text-xs text-muted-foreground">Total in Queue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-disputed/15">
                <AlertCircle className="h-5 w-5 text-disputed" />
              </div>
              <div>
                <p className="text-2xl font-bold">{queueStats.highPriority}</p>
                <p className="text-xs text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{queueStats.avgWaitTime}</p>
                <p className="text-xs text-muted-foreground">Avg Wait Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pending/15">
                <User className="h-5 w-5 text-pending" />
              </div>
              <div>
                <p className="text-2xl font-bold">{queueStats.unassigned}</p>
                <p className="text-xs text-muted-foreground">Unassigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending claims list */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">Review Queue</h2>
        
        <div className="space-y-3">
          {pendingClaims.map((claim) => (
            <Card key={claim.id} className="group hover:border-muted-foreground/25 transition-colors">
              <CardContent className="p-0">
                <Link 
                  href={`/dashboard/claims/${claim.id}`}
                  className="flex items-center gap-4 p-4"
                >
                  {/* Urgency indicator */}
                  <div className="shrink-0">
                    <div className="relative h-12 w-12">
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
                          strokeDasharray={`${claim.urgencyScore}, 100`}
                          className={cn(
                            claim.urgencyScore >= 70 ? "text-disputed" :
                            claim.urgencyScore >= 50 ? "text-pending" :
                            "text-verified"
                          )}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold">{claim.urgencyScore}</span>
                      </div>
                    </div>
                  </div>

                  {/* Claim info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{claim.id}</span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase",
                          priorityStyles[claim.priority]
                        )}
                      >
                        {claim.priority}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {claim.category}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-medium truncate group-hover:text-foreground transition-colors">
                      {claim.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{claim.source}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Waiting {claim.waitingTime}
                      </span>
                    </div>
                  </div>

                  {/* Assignment status */}
                  <div className="shrink-0 text-right hidden sm:block">
                    <div className="flex items-center gap-2 mb-2 justify-end">
                      {claim.assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">
                              {claim.assignee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{claim.assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-pending">Unassigned</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {claim.currentExperts}/{claim.requiredExperts} experts
                      </span>
                      <Progress 
                        value={(claim.currentExperts / claim.requiredExperts) * 100} 
                        className="w-16 h-1.5"
                      />
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
          <CardDescription>Common tasks for managing the review queue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Auto-assign Experts
          </Button>
          <Button variant="outline" size="sm">
            Send Reminders
          </Button>
          <Button variant="outline" size="sm">
            Export Queue
          </Button>
          <Button variant="outline" size="sm">
            View Statistics
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
