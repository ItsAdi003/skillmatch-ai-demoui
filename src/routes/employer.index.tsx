import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, CalendarCheck, Star, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { applicantFunnel, candidates, employerJobs } from "@/lib/mock-data";

export const Route = createFileRoute("/employer/")({
  head: () => ({
    meta: [
      { title: "Employer Dashboard — SkillMatch AI" },
      {
        name: "description",
        content:
          "Monitor active jobs, applicants, shortlists and interviews with AI-ranked candidate pipelines.",
      },
      { property: "og:title", content: "Employer Dashboard — SkillMatch AI" },
      {
        property: "og:description",
        content: "Active jobs, applicants, shortlisted candidates and interview pipeline.",
      },
    ],
  }),
  component: EmployerOverview,
});

const statusTone: Record<string, string> = {
  Active: "bg-success/12 text-success",
  Paused: "bg-warning/15 text-warning",
  Closed: "bg-muted text-muted-foreground",
};

function EmployerOverview() {
  return (
    <>
      <PageHeader
        title="Hiring overview"
        subtitle="Your pipeline across 5 postings, ranked by AI match score."
        action={
          <Button asChild className="bg-brand hover:opacity-90">
            <Link to="/employer/create-job">
              Post a job <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active jobs" value={3} icon={BriefcaseBusiness} delta={1} hint="1 added this week" />
        <StatCard label="Total applicants" value={552} icon={Users} delta={18} hint="vs last month" />
        <StatCard label="Shortlisted" value={54} icon={Star} delta={9} hint="AI-assisted" />
        <StatCard label="Interviews" value={21} icon={CalendarCheck} delta={-4} hint="6 scheduled today" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="gap-4 p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Applicant funnel</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicantFunnel} layout="vertical" margin={{ left: 14, right: 16 }}>
                <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tickLine={false}
                  axisLine={false}
                  width={82}
                  fontSize={12}
                  stroke="var(--color-muted-foreground)"
                />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="var(--color-chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gap-3 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Top ranked</h2>
            <Button asChild size="sm" variant="ghost">
              <Link to="/employer/candidates">See all</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {candidates.slice(0, 4).map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-primary-foreground">
                  {c.initials}
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.role}</p>
                </div>
                <span className="text-sm font-bold text-success">{c.match}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-5 gap-0 overflow-hidden p-0">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="font-display text-lg font-bold">Your job postings</h2>
          <Button asChild size="sm" variant="outline">
            <Link to="/employer/jobs">Manage</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Shortlisted</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employerJobs.map((j) => (
              <TableRow key={j.id}>
                <TableCell className="font-semibold">{j.title}</TableCell>
                <TableCell className="text-muted-foreground">{j.posted}</TableCell>
                <TableCell>{j.applicants}</TableCell>
                <TableCell>{j.shortlisted}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className={`rounded-full ${statusTone[j.status]}`}>
                    {j.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
