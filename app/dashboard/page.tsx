"use client"

import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"
import type { VerificationStatus, Priority } from "@/lib/types"

// Mock data for dashboard
const stats = [
  {
    title: "Total Claims",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
    description: "from last month",
  },
  {
    title: "Pending Review",
    value: "156",
    change: "-8.2%",
    trend: "down",
    icon: Clock,
    description: "awaiting verification",
  },
  {
    title: "Verified Today",
    value: "42",
    change: "+23.1%",
    trend: "up",
    icon: CheckCircle2,
    description: "claims verified",
  },
  {
    title: "Active Investigations",
    value: "18",
    change: "+4.3%",
    trend: "up",
    icon: Search,
    description: "ongoing reviews",
  },
]

const recentClaims: {
  id: string
  title: string
  source: string
  status: VerificationStatus
  priority: Priority
  assignee: { name: string; avatar?: string }
  time: string
}[] = [
  {
    id: "CLM-1234",
    title: "Government announces new climate policy measures for 2025",
    source: "Le Monde",
    status: "investigating",
    priority: "high",
    assignee: { name: "Jean Martin" },
    time: "2h ago",
  },
  {
    id: "CLM-1235",
    title: "Study claims 50% reduction in carbon emissions by 2030 is achievable",
    source: "Reuters",
    status: "pending",
    priority: "medium",
    assignee: { name: "Sophie Bernard" },
    time: "3h ago",
  },
  {
    id: "CLM-1236",
    title: "New vaccine shows 95% efficacy in clinical trials",
    source: "Nature",
    status: "verified",
    priority: "high",
    assignee: { name: "Marie Dupont" },
    time: "5h ago",
  },
  {
    id: "CLM-1237",
    title: "Economic report predicts 3% GDP growth in Q4",
    source: "Financial Times",
    status: "disputed",
    priority: "medium",
    assignee: { name: "Pierre Leroy" },
    time: "6h ago",
  },
  {
    id: "CLM-1238",
    title: "Tech company claims breakthrough in quantum computing",
    source: "TechCrunch",
    status: "pending",
    priority: "low",
    assignee: { name: "Alice Chen" },
    time: "8h ago",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "verification",
    user: { name: "Marie Dupont", avatar: "" },
    action: "verified claim",
    target: "CLM-1236",
    time: "5 min ago",
  },
  {
    id: 2,
    type: "comment",
    user: { name: "Jean Martin", avatar: "" },
    action: "commented on",
    target: "CLM-1234",
    time: "12 min ago",
  },
  {
    id: 3,
    type: "assignment",
    user: { name: "Sophie Bernard", avatar: "" },
    action: "was assigned to",
    target: "CLM-1235",
    time: "25 min ago",
  },
  {
    id: 4,
    type: "evidence",
    user: { name: "Pierre Leroy", avatar: "" },
    action: "added evidence to",
    target: "CLM-1237",
    time: "1 hour ago",
  },
  {
    id: 5,
    type: "status",
    user: { name: "Alice Chen", avatar: "" },
    action: "changed status of",
    target: "CLM-1238",
    time: "2 hours ago",
  },
]

const priorityStyles: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-pending/15 text-pending",
  high: "bg-disputed/15 text-disputed",
  urgent: "bg-destructive/15 text-destructive",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your fact-checking activities and recent claims
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span
                  className={cn(
                    "flex items-center",
                    stat.trend === "up" ? "text-verified" : "text-disputed"
                  )}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent claims - 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Recent Claims</CardTitle>
              <CardDescription>Latest claims requiring attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/claims">
                View all
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {claim.id}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase",
                            priorityStyles[claim.priority]
                          )}
                        >
                          {claim.priority}
                        </span>
                      </div>
                      <Link
                        href={`/dashboard/claims/${claim.id}`}
                        className="text-sm font-medium hover:underline truncate"
                      >
                        {claim.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{claim.source}</span>
                        <span>•</span>
                        <span>{claim.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={claim.status} size="sm" />
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={claim.assignee.avatar} />
                      <AvatarFallback className="text-[10px]">
                        {claim.assignee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity feed - 1 column */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Activity</CardTitle>
              <CardDescription>Recent team activity</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 px-6 py-3"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback className="text-[10px]">
                      {activity.user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <Link
                        href={`/dashboard/claims/${activity.target}`}
                        className="font-mono text-xs text-foreground hover:underline"
                      >
                        {activity.target}
                      </Link>
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Verification Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[87%] rounded-full bg-verified" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              +5.2% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 experts</div>
            <div className="mt-2 flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Avatar key={i} className="h-7 w-7 border-2 border-background">
                  <AvatarFallback className="text-[10px]">U{i}</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                +19
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              3 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Disputed Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="mt-2 flex gap-1">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 flex-1 rounded-sm bg-disputed/20 first:rounded-l last:rounded-r"
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i + 12}
                  className="h-6 flex-1 rounded-sm bg-muted first:rounded-l last:rounded-r"
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Requires expert review
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
