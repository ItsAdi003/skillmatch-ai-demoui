import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { platformGrowth, topSkillsDemand } from "@/lib/mock-data";
import { Activity, FileText, Percent, Timer } from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics & Platform Statistics — SkillMatch AI Admin" },
      {
        name: "description",
        content:
          "Growth, in-demand skills, screening throughput and match quality statistics for the whole platform.",
      },
      { property: "og:title", content: "Analytics & Platform Statistics — SkillMatch AI Admin" },
      { property: "og:description", content: "Platform-wide growth and screening analytics." },
    ],
  }),
  component: AnalyticsPage,
});

const chartTooltip = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
} as const;

function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" subtitle="Platform statistics for the last 6 months" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Resumes screened" value="58,412" icon={FileText} delta={24} hint="all time" />
        <StatCard label="Avg match accuracy" value="91.4%" icon={Percent} delta={3} hint="human-validated" />
        <StatCard label="Avg parse time" value="6.8s" icon={Timer} delta={-12} hint="faster than last month" />
        <StatCard label="Weekly active users" value="12,730" icon={Activity} delta={16} hint="vs last week" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="gap-4 p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Growth</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={platformGrowth} margin={{ left: -12, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="candFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="empFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={chartTooltip} />
                <Area
                  type="monotone"
                  dataKey="candidates"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  fill="url(#candFill)"
                />
                <Area
                  type="monotone"
                  dataKey="employers"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2.5}
                  fill="url(#empFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gap-4 p-6">
          <h2 className="font-display text-lg font-bold">Most requested skills</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSkillsDemand} layout="vertical" margin={{ left: 8, right: 12 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="skill"
                  tickLine={false}
                  axisLine={false}
                  width={86}
                  fontSize={12}
                  stroke="var(--color-muted-foreground)"
                />
                <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={chartTooltip} />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="var(--color-chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card className="gap-4 p-6">
          <h2 className="font-display text-lg font-bold">Screening quality</h2>
          {[
            ["Shortlist precision", 88],
            ["Recruiter agreement with AI rank", 91],
            ["Candidates finishing roadmap week 1", 64],
            ["Employers verified within 24h", 79],
          ].map(([label, value]) => (
            <div key={label as string}>
              <div className="flex items-center justify-between text-sm">
                <span>{label}</span>
                <span className="font-semibold text-muted-foreground">{value}%</span>
              </div>
              <Progress value={value as number} className="mt-2" />
            </div>
          ))}
        </Card>

        <Card className="gap-4 p-6">
          <h2 className="font-display text-lg font-bold">Platform statistics</h2>
          <dl className="grid grid-cols-2 gap-5">
            {[
              ["Jobs posted", "5,412"],
              ["Internships posted", "1,908"],
              ["Applications submitted", "141k"],
              ["Offers reported", "3,204"],
              ["Colleges represented", "612"],
              ["Cities covered", "94"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-display text-2xl font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </>
  );
}
