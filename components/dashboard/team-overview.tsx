"use client"

import Link from "next/link"
import { Shield, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { User } from "@/lib/types"

interface TeamOverviewProps {
  users: User[]
}

const roleColors = {
  admin: "bg-primary/10 text-primary border-primary/20",
  expert: "bg-verified/15 text-verified border-verified/20",
  journalist: "bg-investigating/15 text-investigating border-investigating/20",
  moderator: "bg-pending/15 text-pending border-pending/20",
}

export function TeamOverview({ users }: TeamOverviewProps) {
  // Sort by reputation
  const topUsers = [...users].sort((a, b) => b.reputation - a.reputation).slice(0, 5)
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-medium">Top Contributors</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/team" className="text-muted-foreground hover:text-foreground">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {topUsers.map((user, index) => (
          <div key={user.id} className="flex items-center gap-3">
            <span className="w-4 text-xs text-muted-foreground font-medium">
              {index + 1}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xs bg-muted">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">{user.name}</span>
                {user.verified && (
                  <Shield className="h-3 w-3 text-verified" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={user.reputation} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground">{user.reputation}</span>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={`text-[10px] capitalize ${roleColors[user.role]}`}
            >
              {user.role}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
