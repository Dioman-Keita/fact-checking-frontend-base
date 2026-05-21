"use client"

import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { DashboardStats } from "@/lib/types"

interface StatsCardsProps {
  stats: DashboardStats
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ElementType
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  iconClassName?: string
}

function StatCard({ title, value, icon: Icon, trend, className, iconClassName }: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-semibold tracking-tight">{value}</p>
              {trend && (
                <span className={cn(
                  "flex items-center text-xs font-medium",
                  trend.isPositive ? "text-verified" : "text-disputed"
                )}>
                  {trend.isPositive ? (
                    <TrendingUp className="mr-0.5 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-0.5 h-3 w-3" />
                  )}
                  {trend.value}%
                </span>
              )}
            </div>
          </div>
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            iconClassName || "bg-muted"
          )}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Claims",
      value: stats.totalClaims,
      icon: FileText,
      trend: { value: 12, isPositive: true },
      iconClassName: "bg-primary/10 text-primary",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: Clock,
      trend: { value: 8, isPositive: false },
      iconClassName: "bg-pending/15 text-pending",
    },
    {
      title: "Verified Today",
      value: stats.verifiedToday,
      icon: CheckCircle2,
      trend: { value: 24, isPositive: true },
      iconClassName: "bg-verified/15 text-verified",
    },
    {
      title: "Active Investigations",
      value: stats.activeInvestigations,
      icon: Search,
      iconClassName: "bg-investigating/15 text-investigating",
    },
    {
      title: "Disputed Claims",
      value: stats.disputedClaims,
      icon: AlertTriangle,
      trend: { value: 5, isPositive: false },
      iconClassName: "bg-disputed/15 text-disputed",
    },
    {
      title: "Team Members",
      value: stats.teamMembers,
      icon: Users,
      iconClassName: "bg-muted text-muted-foreground",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          trend={card.trend}
          iconClassName={card.iconClassName}
        />
      ))}
    </div>
  )
}
