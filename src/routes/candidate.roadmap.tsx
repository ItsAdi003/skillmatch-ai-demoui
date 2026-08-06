import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Check, CircleDot, Lock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { MatchRing } from "@/components/match-ring";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { roadmap } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/candidate/roadmap")({
  head: () => ({
    meta: [
      { title: "Learning Roadmap — SkillMatch AI" },
      {
        name: "description",
        content:
          "A four-week personalised learning roadmap with resources and completion tracking to close your skill gaps.",
      },
      { property: "og:title", content: "Learning Roadmap — SkillMatch AI" },
      {
        property: "og:description",
        content: "Week-by-week plan from SQL to cloud deployment, with progress tracking.",
      },
    ],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const overall = Math.round(roadmap.reduce((s, r) => s + r.progress, 0) / roadmap.length);

  return (
    <>
      <PageHeader
        title="Learning roadmap"
        subtitle="Generated from your skill gap report. Regenerates whenever your resume changes."
        action={<Button variant="outline">Regenerate plan</Button>}
      />

      <Card className="mb-6 flex-row items-center gap-6 bg-soft p-6">
        <MatchRing value={overall} size={104} label="done" />
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-lg font-bold">4-week backend readiness track</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Finish week 2 by Sunday to stay on pace for the Razorpay internship deadline.
          </p>
          <Progress value={overall} className="mt-4 max-w-md" />
        </div>
      </Card>

      <ol className="relative space-y-5 before:absolute before:left-[19px] before:top-3 before:h-[calc(100%-2rem)] before:w-px before:bg-border">
        {roadmap.map((step) => {
          const state = step.progress === 100 ? "done" : step.progress > 0 ? "active" : "locked";
          return (
            <li key={step.week} className="relative pl-14">
              <span
                className={cn(
                  "absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border",
                  state === "done" && "border-transparent bg-success text-success-foreground",
                  state === "active" && "border-transparent bg-brand text-primary-foreground shadow-glow",
                  state === "locked" && "bg-card text-muted-foreground",
                )}
              >
                {state === "done" ? (
                  <Check className="h-5 w-5" />
                ) : state === "active" ? (
                  <CircleDot className="h-5 w-5" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </span>

              <Card className="hover-lift gap-3 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="rounded-full">
                    {step.week}
                  </Badge>
                  <h3 className="font-display text-base font-bold">{step.title}</h3>
                  <span className="ml-auto text-sm font-semibold text-muted-foreground">
                    {step.progress}%
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                <Progress value={step.progress} />
                <div className="flex flex-wrap gap-2 pt-1">
                  {step.resources.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs"
                    >
                      <BookOpen className="h-3 w-3" /> {r}
                    </span>
                  ))}
                </div>
              </Card>
            </li>
          );
        })}
      </ol>
    </>
  );
}
