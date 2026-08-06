import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Download,
  FolderGit2,
  GraduationCap,
  Lightbulb,
  Sparkles,
  ThumbsUp,
  TriangleAlert,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { MatchRing } from "@/components/match-ring";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { resumeAnalysis } from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/analysis")({
  head: () => ({
    meta: [
      { title: "Resume Analysis — SkillMatch AI" },
      {
        name: "description",
        content:
          "See your resume score, technical and soft skills, education, projects, certifications, strengths, weaknesses and AI suggestions.",
      },
      { property: "og:title", content: "Resume Analysis — SkillMatch AI" },
      {
        property: "og:description",
        content: "A full AI breakdown of your resume with prioritised suggestions.",
      },
    ],
  }),
  component: AnalysisPage,
});

function AnalysisPage() {
  const a = resumeAnalysis;

  return (
    <>
      <PageHeader
        title="Resume analysis"
        subtitle={`${a.fileName} · last analysed ${a.updated}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export report
            </Button>
            <Button asChild className="bg-brand hover:opacity-90">
              <Link to="/candidate/upload">Re-upload</Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="gap-4 bg-soft p-6">
          <h2 className="font-display text-lg font-bold">Resume score</h2>
          <div className="flex items-center gap-5">
            <MatchRing value={a.score} size={116} label="score" />
            <div className="text-sm">
              <p className="font-semibold">Strong, with clear gaps</p>
              <p className="mt-1 text-muted-foreground">
                Top 18% of CS graduates in our index. Closing two cloud skills would push you past
                90.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              ["Clarity", 88],
              ["Impact", 74],
              ["Relevance", 84],
            ].map(([label, value]) => (
              <div key={label as string}>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-display text-lg font-bold">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="gap-4 p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-bold">Technical skills</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {a.technicalSkills.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground">{s.level}%</span>
                </div>
                <Progress value={s.level} className="mt-2" />
              </div>
            ))}
          </div>
          <div className="pt-2">
            <p className="text-sm font-semibold">Soft skills</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {a.softSkills.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-full">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="gap-4 p-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-bold">Education</h2>
          </div>
          <ul className="space-y-4">
            {a.education.map((e) => (
              <li key={e.degree} className="border-l-2 border-primary/40 pl-4">
                <p className="text-sm font-semibold">{e.degree}</p>
                <p className="text-sm text-muted-foreground">{e.org}</p>
                <p className="text-xs text-muted-foreground">
                  {e.period} · {e.detail}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="gap-4 p-6">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-bold">Projects</h2>
          </div>
          <ul className="space-y-4">
            {a.projects.map((p) => (
              <li key={p.name}>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.detail}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="gap-4 p-6">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-bold">Certifications</h2>
          </div>
          <ul className="space-y-3">
            {a.certifications.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                {c}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card className="gap-4 p-6">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-success" />
            <h2 className="font-display text-lg font-bold">Strengths</h2>
          </div>
          <ul className="space-y-3">
            {a.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2.5 rounded-xl bg-success/8 p-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="gap-4 p-6">
          <div className="flex items-center gap-2">
            <TriangleAlert className="h-4 w-4 text-warning" />
            <h2 className="font-display text-lg font-bold">Weaknesses</h2>
          </div>
          <ul className="space-y-3">
            {a.weaknesses.map((s) => (
              <li key={s} className="flex items-start gap-2.5 rounded-xl bg-warning/10 p-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-5">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-bold">AI suggestions</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {a.suggestions.map((s) => (
            <Card key={s.title} className="hover-lift gap-2.5 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{s.title}</h3>
                </div>
                <Badge
                  variant={s.priority === "High" ? "default" : "secondary"}
                  className={s.priority === "High" ? "rounded-full bg-brand" : "rounded-full"}
                >
                  {s.priority}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
