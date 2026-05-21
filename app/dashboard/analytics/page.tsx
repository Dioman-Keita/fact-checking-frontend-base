"use client"

import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Users,
  FileText,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Mock data for charts
const verificationTrend = [
  { date: "Jan 1", verified: 45, disputed: 8, false: 3 },
  { date: "Jan 8", verified: 52, disputed: 12, false: 5 },
  { date: "Jan 15", verified: 61, disputed: 7, false: 4 },
  { date: "Jan 22", verified: 58, disputed: 15, false: 6 },
  { date: "Jan 29", verified: 72, disputed: 9, false: 3 },
  { date: "Feb 5", verified: 68, disputed: 11, false: 4 },
  { date: "Feb 12", verified: 85, disputed: 8, false: 2 },
]

const categoryDistribution = [
  { name: "Politics", value: 35, fill: "var(--color-chart-1)" },
  { name: "Health", value: 25, fill: "var(--color-chart-2)" },
  { name: "Technology", value: 20, fill: "var(--color-chart-3)" },
  { name: "Economy", value: 12, fill: "var(--color-chart-4)" },
  { name: "Environment", value: 8, fill: "var(--color-chart-5)" },
]

const sourceReliability = [
  { source: "Reuters", score: 95, claims: 124 },
  { source: "Le Monde", score: 92, claims: 98 },
  { source: "Nature", score: 98, claims: 45 },
  { source: "Financial Times", score: 90, claims: 67 },
  { source: "TechCrunch", score: 78, claims: 89 },
  { source: "Twitter", score: 42, claims: 234 },
]

const teamPerformance = [
  { name: "Marie Dupont", verified: 45, disputed: 3, avgTime: 2.4 },
  { name: "Jean Martin", verified: 38, disputed: 5, avgTime: 3.1 },
  { name: "Sophie Bernard", verified: 42, disputed: 2, avgTime: 2.8 },
  { name: "Pierre Leroy", verified: 35, disputed: 4, avgTime: 3.5 },
  { name: "Alice Chen", verified: 29, disputed: 1, avgTime: 2.2 },
]

const weeklyActivity = [
  { day: "Mon", claims: 23, verifications: 18 },
  { day: "Tue", claims: 31, verifications: 25 },
  { day: "Wed", claims: 28, verifications: 22 },
  { day: "Thu", claims: 35, verifications: 29 },
  { day: "Fri", claims: 27, verifications: 24 },
  { day: "Sat", claims: 12, verifications: 8 },
  { day: "Sun", claims: 8, verifications: 5 },
]

const stats = [
  {
    title: "Verification Accuracy",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: CheckCircle2,
  },
  {
    title: "Avg. Response Time",
    value: "2.8h",
    change: "-15%",
    trend: "up",
    icon: Clock,
  },
  {
    title: "Total Verifications",
    value: "1,247",
    change: "+18%",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Active Experts",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Users,
  },
]

const chartConfig: ChartConfig = {
  verified: {
    label: "Verified",
    color: "var(--color-verified)",
  },
  disputed: {
    label: "Disputed",
    color: "var(--color-disputed)",
  },
  false: {
    label: "False",
    color: "var(--color-destructive)",
  },
  claims: {
    label: "Claims",
    color: "var(--color-chart-1)",
  },
  verifications: {
    label: "Verifications",
    color: "var(--color-chart-2)",
  },
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Insights and metrics for your fact-checking operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32 h-9">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2 h-9">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p
                    className={cn(
                      "text-xs flex items-center gap-1 mt-1",
                      stat.trend === "up" ? "text-verified" : "text-disputed"
                    )}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change} from last period
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Verification trend chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Verification Trend</CardTitle>
            <CardDescription>Weekly verification outcomes over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={verificationTrend}>
                <defs>
                  <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-verified)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-verified)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDisputed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-disputed)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-disputed)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" tick={{ fill: 'var(--color-muted-foreground)' }} />
                <YAxis className="text-xs" tick={{ fill: 'var(--color-muted-foreground)' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="verified"
                  stroke="var(--color-verified)"
                  fillOpacity={1}
                  fill="url(#colorVerified)"
                />
                <Area
                  type="monotone"
                  dataKey="disputed"
                  stroke="var(--color-disputed)"
                  fillOpacity={1}
                  fill="url(#colorDisputed)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Category Distribution</CardTitle>
            <CardDescription>Claims by topic category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {categoryDistribution.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 text-xs">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: cat.fill }}
                  />
                  <span className="text-muted-foreground">{cat.name}</span>
                  <span className="font-medium">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Source reliability */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Source Reliability</CardTitle>
            <CardDescription>Accuracy score by news source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceReliability.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{source.source}</span>
                    <span
                      className={cn(
                        "font-bold",
                        source.score >= 90
                          ? "text-verified"
                          : source.score >= 70
                          ? "text-pending"
                          : "text-disputed"
                      )}
                    >
                      {source.score}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        source.score >= 90
                          ? "bg-verified"
                          : source.score >= 70
                          ? "bg-pending"
                          : "bg-disputed"
                      )}
                      style={{ width: `${source.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {source.claims} claims verified
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Activity</CardTitle>
            <CardDescription>Claims submitted vs. verified by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" tick={{ fill: 'var(--color-muted-foreground)' }} />
                <YAxis className="text-xs" tick={{ fill: 'var(--color-muted-foreground)' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="claims" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="verifications" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team performance table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team Performance</CardTitle>
          <CardDescription>Individual expert verification metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-3 px-4 font-medium">Expert</th>
                  <th className="text-right py-3 px-4 font-medium">Verified</th>
                  <th className="text-right py-3 px-4 font-medium">Disputed</th>
                  <th className="text-right py-3 px-4 font-medium">Accuracy</th>
                  <th className="text-right py-3 px-4 font-medium">Avg. Time</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((member) => {
                  const accuracy = Math.round(
                    (member.verified / (member.verified + member.disputed)) * 100
                  )
                  return (
                    <tr key={member.name} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{member.name}</td>
                      <td className="py-3 px-4 text-right text-verified">{member.verified}</td>
                      <td className="py-3 px-4 text-right text-disputed">{member.disputed}</td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={cn(
                            "font-medium",
                            accuracy >= 95 ? "text-verified" : accuracy >= 85 ? "text-pending" : "text-disputed"
                          )}
                        >
                          {accuracy}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-muted-foreground">
                        {member.avgTime}h
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
