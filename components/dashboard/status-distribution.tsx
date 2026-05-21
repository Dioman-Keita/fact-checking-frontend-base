"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatusDistributionProps {
  data: { status: string; count: number }[]
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  verified: { 
    label: "Verified", 
    color: "bg-verified", 
    bgColor: "bg-verified/15" 
  },
  pending: { 
    label: "Pending", 
    color: "bg-pending", 
    bgColor: "bg-pending/15" 
  },
  disputed: { 
    label: "Disputed", 
    color: "bg-disputed", 
    bgColor: "bg-disputed/15" 
  },
  investigating: { 
    label: "Investigating", 
    color: "bg-investigating", 
    bgColor: "bg-investigating/15" 
  },
  false: { 
    label: "False", 
    color: "bg-destructive", 
    bgColor: "bg-destructive/15" 
  },
  unverified: { 
    label: "Unverified", 
    color: "bg-muted-foreground", 
    bgColor: "bg-muted" 
  },
}

export function StatusDistribution({ data }: StatusDistributionProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)
  const sortedData = [...data].sort((a, b) => b.count - a.count)
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual bar representation */}
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
          {sortedData.map((item) => {
            const config = statusConfig[item.status]
            const percentage = total > 0 ? (item.count / total) * 100 : 0
            if (percentage === 0) return null
            
            return (
              <div
                key={item.status}
                className={cn("h-full transition-all", config?.color || "bg-muted-foreground")}
                style={{ width: `${percentage}%` }}
              />
            )
          })}
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-3">
          {sortedData.map((item) => {
            const config = statusConfig[item.status]
            const percentage = total > 0 ? ((item.count / total) * 100).toFixed(0) : 0
            
            return (
              <div key={item.status} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2.5 w-2.5 rounded-full", config?.color || "bg-muted-foreground")} />
                  <span className="text-sm text-muted-foreground">
                    {config?.label || item.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">{item.count}</span>
                  <span className="text-xs text-muted-foreground">({percentage}%)</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
