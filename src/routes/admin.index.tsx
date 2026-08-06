import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Flag, ShieldAlert, UserCheck, Users } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { platformGrowth, reports } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Console — SkillMatch AI" },
      {
        name: "description",
        content:
          "Platform health at a glance: users, candidates, employers, reports and suspicious accounts.",
      },
      { property: "og:title", content: "Admin Console — SkillMatch AI" },
      { property: "og:description", content: "Moderation and platform statistics for SkillMatch AI." },
    ],
  }),
  component: AdminOverview,
});

const severityTone: Record<string, string> = {
  Critical: "bg-destructive/12 text-destructive",
  High: "bg-warning/15 text-warning",
  Low: "bg-muted text-muted-foreground",
};

function AdminOverview() {
  return (
    <>
      <PageHeader
        title="Platform overview"
        subtitle="6,174 accounts · 4 open reports · 2 suspicious accounts flagged today"
        action={
          <Button asChild className="bg-brand hover:opacity-90">
            <Link to="/admin/reports">Review reports</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total users" value="6,174" icon={Users} delta={21} hint="vs last month" />
        <StatCard label="Candidates" value="5,890" icon={UserCheck} delta={27} hint="new signups up" />
        <StatCard label="Employers" value={284} icon={Building2} delta={19} hint="238 verified" />
        <StatCard label="Reports" value={4} icon={Flag} delta={-33} hint="open cases" />
        <StatCard label="Suspicious accounts" value={2} icon={ShieldAlert} delta={-50} hint="auto-flagged" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="gap-4 p-6 lg:col-span-2">
          <div>
            <h2 className="font-display text-lg font-bold">Platform growth</h2>
            <p className="text-sm text-muted-foreground">Candidates and employers, last 6 months</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={platformGrowth} margin={{ left: -12, right: 8, top: 8 }}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="candidates"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="employers"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gap-3 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Latest reports</h2>
            <Button asChild size="sm" variant="ghost">
              <Link to="/admin/reports">All</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {reports.map((r) => (
              <li key={r.id} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{r.target}</p>
                  <Badge variant="secondary" className={`rounded-full ${severityTone[r.severity]}`}>
                    {r.severity}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {r.type} · {r.date}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
