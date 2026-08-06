import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { applicationStatus, jobs } from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/applications")({
  head: () => ({
    meta: [
      { title: "My Applications — SkillMatch AI" },
      {
        name: "description",
        content: "Track every application, its stage and the AI match score in one modern table.",
      },
      { property: "og:title", content: "My Applications — SkillMatch AI" },
      { property: "og:description", content: "Application pipeline tracking with match scores." },
    ],
  }),
  component: ApplicationsPage,
});

const rows = [
  { company: "Stripe", role: "Backend Engineer", stage: "Interview", applied: "Aug 1, 2026", match: 94 },
  { company: "Notion", role: "Full Stack Developer", stage: "In review", applied: "Jul 30, 2026", match: 89 },
  { company: "Razorpay", role: "Backend Intern", stage: "Offer", applied: "Jul 22, 2026", match: 96 },
  { company: "Swiggy", role: "Data Engineer", stage: "Applied", applied: "Jul 28, 2026", match: 81 },
  { company: "Vercel", role: "ML Engineer", stage: "Rejected", applied: "Jul 12, 2026", match: 74 },
  { company: "Zoho", role: "Frontend Intern", stage: "In review", applied: "Aug 3, 2026", match: 88 },
];

const stageTone: Record<string, string> = {
  Offer: "bg-success/12 text-success",
  Interview: "bg-primary/12 text-primary",
  "In review": "bg-warning/15 text-warning",
  Applied: "bg-muted text-muted-foreground",
  Rejected: "bg-destructive/12 text-destructive",
};

function ApplicationsPage() {
  return (
    <>
      <PageHeader title="Applications" subtitle="36 applications · 4 active interviews · 1 offer" />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="gap-4 p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Pipeline by stage</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationStatus} margin={{ left: -20, right: 8, top: 8 }}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="var(--color-chart-1)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gap-3 p-6">
          <h2 className="font-display text-lg font-bold">Saved for later</h2>
          <ul className="space-y-3">
            {jobs.slice(2, 5).map((j) => (
              <li key={j.id} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-[10px] font-bold text-primary-foreground">
                  {j.logo}
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-sm font-semibold">{j.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{j.company}</p>
                </div>
                <span className="text-sm font-bold text-primary">{j.match}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-5 gap-0 overflow-hidden p-0">
        <div className="p-6 pb-4">
          <h2 className="font-display text-lg font-bold">All applications</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Match</TableHead>
              <TableHead className="text-right">Stage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={`${r.company}-${r.role}`}>
                <TableCell className="font-semibold">{r.company}</TableCell>
                <TableCell className="text-muted-foreground">{r.role}</TableCell>
                <TableCell className="text-muted-foreground">{r.applied}</TableCell>
                <TableCell className="font-semibold">{r.match}%</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className={`rounded-full ${stageTone[r.stage]}`}>
                    {r.stage}
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
