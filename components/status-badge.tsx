"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search,
  XCircle,
  HelpCircle
} from "lucide-react"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      status: {
        verified: "bg-verified/15 text-verified",
        pending: "bg-pending/15 text-pending",
        disputed: "bg-disputed/15 text-disputed",
        investigating: "bg-investigating/15 text-investigating",
        false: "bg-destructive/15 text-destructive",
        unverified: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      status: "unverified",
      size: "md",
    },
  }
)

const statusIcons = {
  verified: CheckCircle2,
  pending: Clock,
  disputed: AlertTriangle,
  investigating: Search,
  false: XCircle,
  unverified: HelpCircle,
}

const statusLabels = {
  verified: "Verified",
  pending: "Pending",
  disputed: "Disputed",
  investigating: "Investigating",
  false: "False",
  unverified: "Unverified",
}

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  showIcon?: boolean
  showLabel?: boolean
  customLabel?: string
}

export function StatusBadge({
  className,
  status,
  size,
  showIcon = true,
  showLabel = true,
  customLabel,
  ...props
}: StatusBadgeProps) {
  const Icon = statusIcons[status || "unverified"]
  const label = customLabel || statusLabels[status || "unverified"]

  return (
    <div
      className={cn(statusBadgeVariants({ status, size }), className)}
      {...props}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {showLabel && <span>{label}</span>}
    </div>
  )
}

export { statusBadgeVariants }
