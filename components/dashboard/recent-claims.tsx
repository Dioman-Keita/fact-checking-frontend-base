"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"
import type { Claim } from "@/lib/types"

interface RecentClaimsProps {
  claims: Claim[]
}

const priorityColors = {
  urgent: "bg-destructive/15 text-destructive border-destructive/20",
  high: "bg-disputed/15 text-disputed border-disputed/20",
  medium: "bg-pending/15 text-pending border-pending/20",
  low: "bg-muted text-muted-foreground border-border",
}

export function RecentClaims({ claims }: RecentClaimsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-medium">Recent Claims</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/claims" className="text-muted-foreground hover:text-foreground">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-1 p-0">
        {claims.map((claim, index) => (
          <Link
            key={claim.id}
            href={`/dashboard/claims/${claim.id}`}
            className={cn(
              "flex items-start gap-4 px-6 py-4 transition-colors hover:bg-muted/50",
              index !== claims.length - 1 && "border-b border-border"
            )}
          >
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-sm font-medium leading-tight line-clamp-2 pr-2">
                  {claim.title}
                </h4>
                <StatusBadge status={claim.status} size="sm" />
              </div>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={claim.submittedBy.avatar} />
                    <AvatarFallback className="text-[8px]">
                      {claim.submittedBy.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{claim.submittedBy.name}</span>
                </div>
                <span className="text-muted-foreground/50">•</span>
                <span>{formatDistanceToNow(claim.createdAt, { addSuffix: true, locale: fr })}</span>
                <span className="text-muted-foreground/50">•</span>
                <span className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  {claim.source}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={cn("text-[10px] px-1.5 py-0", priorityColors[claim.priority])}
                >
                  {claim.priority}
                </Badge>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {claim.category}
                </Badge>
                {claim.assignedTo && claim.assignedTo.length > 0 && (
                  <div className="flex items-center -space-x-1.5 ml-auto">
                    {claim.assignedTo.slice(0, 3).map((user) => (
                      <Avatar key={user.id} className="h-5 w-5 border-2 border-background">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-[8px] bg-muted">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {claim.assignedTo.length > 3 && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-muted text-[8px] font-medium">
                        +{claim.assignedTo.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
