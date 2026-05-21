"use client"

import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { 
  GitCommit, 
  MessageSquare, 
  FileCheck, 
  UserPlus, 
  AlertCircle,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { TimelineEvent } from "@/lib/types"

interface ActivityFeedProps {
  events: TimelineEvent[]
}

const eventIcons = {
  status_change: GitCommit,
  comment: MessageSquare,
  evidence_added: FileCheck,
  assignment: UserPlus,
  review: AlertCircle,
}

const eventColors = {
  status_change: "bg-verified/15 text-verified",
  comment: "bg-investigating/15 text-investigating",
  evidence_added: "bg-pending/15 text-pending",
  assignment: "bg-primary/10 text-primary",
  review: "bg-muted text-muted-foreground",
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/activity" className="text-muted-foreground hover:text-foreground">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[31px] top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-0">
            {events.map((event, index) => {
              const Icon = eventIcons[event.type]
              const colorClass = eventColors[event.type]
              
              return (
                <div
                  key={event.id}
                  className={cn(
                    "relative flex items-start gap-4 px-6 py-4",
                    index !== events.length - 1 && "border-b border-border"
                  )}
                >
                  {/* Icon */}
                  <div className={cn(
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full",
                    colorClass
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{event.title}</span>
                    </div>
                    {event.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={event.user.avatar} />
                        <AvatarFallback className="text-[8px]">
                          {event.user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{event.user.name}</span>
                      <span className="text-muted-foreground/50">•</span>
                      <span>
                        {formatDistanceToNow(event.timestamp, { addSuffix: true, locale: fr })}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
