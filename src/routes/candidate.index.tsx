import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  FileText,
  GraduationCap,
  SendHorizonal,
  Target,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { MatchRing } from "@/components/match-ring";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  applicationStatus,
  jobs,
  resumeAnalysis,
  roadmap,
  skillGap,
  skillProgress,
} from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/")({
  head: () => ({
    meta: [
      { title: "Candidate Dashboard — SkillMatch AI" },
      {
        name: "description",
        content:
          "Track your resume score, job and internship matches, skill gaps and application pipeline in one dashboard.",
      },
      { property: "og:title", content: "Candidate Dashboard — SkillMatch AI" },
      {
        property: "og:description",
        content: "Resume score, matches, skill gaps and applications at a glance.",
      },
    ],
  }),
  component: CandidateOverview,
});

function CandidateOverview() {
  const nextTask = roadmap.find((r) => r.progress < 100) ?? roadmap[0]!;

  return (
    <>
      <PageHeader
        title="Welcome back, Aarav"
        subtitle="Your resume improved 6 points this week. Here's what to do next."
        action={
          <Button asChild className="bg-brand hover:opacity-90">
            <Link to="/candidate/upload">
              Update resume <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Resume score" value={`${resumeAnalysis.score}/100`} icon={FileText} delta={8} hint="vs last version" />
        <StatCard label="Job matches" value={jobs.length * 5} icon={Briefcase} delta={12} hint="new this week" />
        <StatCard label="Internship matches" value={16} icon={GraduationCap} delta={5} hint="new this week" />
        <StatCard label="Skill gap" value={`${skillGap.missing.length} skills`} icon={Target} delta={-2} hint="closed 2 gaps" />
        <StatCard label="Applications" value={36} icon={SendHorizonal} delta={4} hint="4 active interviews" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="gap-4 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold">Skill progress</h2>
              <p className="text-sm text-muted-foreground">Composite score across all tracked skills</p>
            </div>
            <Badge variant="secondary" className="rounded-full">6 months</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={skillProgress} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  fill="url(#scoreFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gap-4 p-6">
          <div>
            <h2 className="font-display text-lg font-bold">Application status</h2>
            <p className="text-sm text-muted-foreground">36 applications this season</p>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  stroke="none"
                >
                  {applicationStatus.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5">
            {applicationStatus.map((s) => (
              <li key={s.name} className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full" style={{ background: s.fill }} />
                <span className="flex-1 text-muted-foreground">{s.name}</span>
                <span className="font-semibold">{s.value}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="gap-4 p-6">
          <h2 className="font-display text-lg font-bold">Readiness</h2>
          <div className="flex items-center gap-5">
            <MatchRing value={skillGap.readiness} size={104} label="ready" tone="violet" />
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                You're job-ready for {skillGap.readiness}% of your target roles.
              </p>
              <Button asChild size="sm" variant="outline">
                <Link to="/candidate/skill-gap">View skill gap</Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="gap-4 p-6">
          <h2 className="font-display text-lg font-bold">Next in roadmap</h2>
          <div>
            <Badge variant="secondary" className="rounded-full">{nextTask.week}</Badge>
            <p className="mt-3 font-semibold">{nextTask.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{nextTask.detail}</p>
            <Progress value={nextTask.progress} className="mt-4" />
            <p className="mt-2 text-xs text-muted-foreground">{nextTask.progress}% complete</p>
          </div>
          <Button asChild size="sm" variant="outline" className="w-fit">
            <Link to="/candidate/roadmap">Open roadmap</Link>
          </Button>
        </Card>

        <Card className="gap-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Top matches</h2>
            <Button asChild size="sm" variant="ghost">
              <Link to="/candidate/jobs">See all</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {jobs.slice(0, 3).map((j) => (
              <li key={j.id} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-[10px] font-bold text-primary-foreground">
                  {j.logo}
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-sm font-semibold">{j.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{j.company}</p>
                </div>
                <span className="text-sm font-bold text-success">{j.match}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
