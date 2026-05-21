"use client"

import Link from "next/link"
import {
  Search,
  Plus,
  MoreHorizontal,
  Shield,
  Mail,
  Star,
  CheckCircle2,
  Clock,
  Filter,
  Grid,
  List,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const experts = [
  {
    id: 1,
    name: "Dr. Marie Dupont",
    email: "marie.dupont@verifact.com",
    avatar: "",
    role: "Senior Expert",
    expertise: ["Health", "Science", "Research"],
    reputation: 98,
    verified: true,
    stats: {
      verifications: 245,
      accuracy: 97,
      avgResponseTime: 2.4,
      activeInvestigations: 3,
    },
    status: "active",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    name: "Jean Martin",
    email: "jean.martin@verifact.com",
    avatar: "",
    role: "Expert",
    expertise: ["Politics", "Government", "Policy"],
    reputation: 94,
    verified: true,
    stats: {
      verifications: 189,
      accuracy: 94,
      avgResponseTime: 3.1,
      activeInvestigations: 5,
    },
    status: "active",
    lastActive: "15 min ago",
  },
  {
    id: 3,
    name: "Sophie Bernard",
    email: "sophie.bernard@verifact.com",
    avatar: "",
    role: "Expert",
    expertise: ["Environment", "Climate", "Energy"],
    reputation: 96,
    verified: true,
    stats: {
      verifications: 167,
      accuracy: 96,
      avgResponseTime: 2.8,
      activeInvestigations: 2,
    },
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "Pierre Leroy",
    email: "pierre.leroy@verifact.com",
    avatar: "",
    role: "Expert",
    expertise: ["Economy", "Finance", "Markets"],
    reputation: 91,
    verified: true,
    stats: {
      verifications: 134,
      accuracy: 91,
      avgResponseTime: 3.5,
      activeInvestigations: 4,
    },
    status: "busy",
    lastActive: "30 min ago",
  },
  {
    id: 5,
    name: "Alice Chen",
    email: "alice.chen@verifact.com",
    avatar: "",
    role: "Junior Expert",
    expertise: ["Technology", "AI", "Startups"],
    reputation: 88,
    verified: true,
    stats: {
      verifications: 78,
      accuracy: 92,
      avgResponseTime: 2.2,
      activeInvestigations: 1,
    },
    status: "active",
    lastActive: "5 min ago",
  },
  {
    id: 6,
    name: "Dr. Thomas Laurent",
    email: "thomas.laurent@verifact.com",
    avatar: "",
    role: "Senior Expert",
    expertise: ["Medicine", "Pharmaceuticals", "Clinical Research"],
    reputation: 99,
    verified: true,
    stats: {
      verifications: 312,
      accuracy: 99,
      avgResponseTime: 4.2,
      activeInvestigations: 2,
    },
    status: "away",
    lastActive: "3 hours ago",
  },
]

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-verified/15", text: "text-verified", label: "Active" },
  busy: { bg: "bg-pending/15", text: "text-pending", label: "Busy" },
  away: { bg: "bg-muted", text: "text-muted-foreground", label: "Away" },
}

export default function ExpertsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Experts</h1>
          <p className="text-sm text-muted-foreground">
            Manage and collaborate with verification experts
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Invite Expert
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-verified/15">
                <Shield className="h-5 w-5 text-verified" />
              </div>
              <div>
                <p className="text-2xl font-bold">{experts.length}</p>
                <p className="text-xs text-muted-foreground">Total Experts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-verified/15">
                <CheckCircle2 className="h-5 w-5 text-verified" />
              </div>
              <div>
                <p className="text-2xl font-bold">{experts.filter(e => e.status === "active").length}</p>
                <p className="text-xs text-muted-foreground">Active Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Star className="h-5 w-5 text-pending" />
              </div>
              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-xs text-muted-foreground">Avg. Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">2.9h</p>
                <p className="text-xs text-muted-foreground">Avg. Response</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search experts..." className="pl-8 h-9" />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder="Expertise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="politics">Politics</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="economy">Economy</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="active">
            <SelectTrigger className="w-28 h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="away">Away</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Experts grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {experts.map((expert) => (
          <Card key={expert.id} className="group hover:border-muted-foreground/25 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={expert.avatar} />
                      <AvatarFallback>
                        {expert.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {expert.verified && (
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-background flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-verified" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground">{expert.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Assign Claim</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {expert.expertise.map((area) => (
                  <Badge key={area} variant="secondary" className="text-[10px]">
                    {area}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Verifications</p>
                  <p className="text-lg font-semibold">{expert.stats.verifications}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <p className="text-lg font-semibold text-verified">{expert.stats.accuracy}%</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Reputation Score</span>
                  <span className="font-medium">{expert.reputation}/100</span>
                </div>
                <Progress value={expert.reputation} className="h-1.5" />
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                      statusStyles[expert.status].bg,
                      statusStyles[expert.status].text
                    )}
                  >
                    {statusStyles[expert.status].label}
                  </span>
                  <span className="text-xs text-muted-foreground">{expert.lastActive}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  Profile
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Performers</CardTitle>
          <CardDescription>Experts ranked by verification accuracy this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experts
              .sort((a, b) => b.stats.accuracy - a.stats.accuracy)
              .slice(0, 5)
              .map((expert, index) => (
                <div
                  key={expert.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                      index === 0 ? "bg-pending text-pending-foreground" :
                      index === 1 ? "bg-muted text-foreground" :
                      index === 2 ? "bg-disputed/20 text-disputed" :
                      "bg-muted text-muted-foreground"
                    )}
                  >
                    {index + 1}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {expert.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{expert.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {expert.stats.verifications} verifications
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-verified">{expert.stats.accuracy}%</p>
                    <p className="text-xs text-muted-foreground">accuracy</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
