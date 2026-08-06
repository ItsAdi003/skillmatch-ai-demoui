import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Target, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { MatchRing } from "@/components/match-ring";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { skillGap } from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/skill-gap")({
  head: () => ({
    meta: [
      { title: "Skill Gap Analysis — SkillMatch AI" },
      {
        name: "description",
        content:
          "Compare required, existing and missing skills with market demand and a learn-first priority order.",
      },
      { property: "og:title", content: "Skill Gap Analysis — SkillMatch AI" },
      {
        property: "og:description",
        content: "Required vs existing skills, priorities and estimated time to close each gap.",
      },
    ],
  }),
  component: SkillGapPage,
});

function SkillGapPage() {
  return (
    <>
      <PageHeader
        title="Skill gap analysis"
        subtitle="Based on 5,400 live roles matching your target titles."
        action={
          <Button asChild className="bg-brand hover:opacity-90">
            <Link to="/candidate/roadmap">
              Generate roadmap <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-4">
        <Card className="items-center gap-3 bg-soft p-6 text-center">
          <MatchRing value={skillGap.readiness} size={120} label="ready" tone="violet" />
          <p className="font-display text-base font-bold">Overall readiness</p>
          <p className="text-sm text-muted-foreground">
            {skillGap.existing.length} of {skillGap.required.length} required skills covered
          </p>
        </Card>

        <Card className="gap-4 p-6">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h2 className="font-display text-base font-bold">Required skills</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillGap.required.map((s) => (
              <Badge key={s} variant="secondary" className="rounded-full">
                {s}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="gap-4 p-6">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <h2 className="font-display text-base font-bold">Existing skills</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillGap.existing.map((s) => (
              <Badge key={s} className="rounded-full bg-success/12 text-success" variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="gap-4 p-6">
          <div className="flex items-center gap-2">
            <X className="h-4 w-4 text-destructive" />
            <h2 className="font-display text-base font-bold">Missing skills</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillGap.missing.map((s) => (
              <Badge
                key={s.skill}
                variant="outline"
                className="rounded-full border-destructive/30 text-destructive"
              >
                {s.skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <h2 className="mb-4 mt-8 font-display text-lg font-bold">Priority to learn</h2>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skillGap.missing.map((s) => (
          <Card key={s.skill} className="hover-lift gap-4 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-base font-bold">{s.skill}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  ~{s.weeks} weeks to job-ready
                </p>
              </div>
              <MatchRing
                value={s.demand}
                size={62}
                label="demand"
                tone={s.priority === "High" ? "destructive" : "warning"}
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Priority</span>
                <Badge
                  variant={s.priority === "High" ? "default" : "secondary"}
                  className={s.priority === "High" ? "rounded-full bg-brand" : "rounded-full"}
                >
                  {s.priority}
                </Badge>
              </div>
              <Progress value={s.demand} className="mt-3" />
              <p className="mt-2 text-xs text-muted-foreground">
                Requested in {s.demand}% of your matched roles
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
