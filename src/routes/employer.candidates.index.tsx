import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { MatchRing } from "@/components/match-ring";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { candidates } from "@/lib/mock-data";

export const Route = createFileRoute("/employer/candidates/")({
  head: () => ({
    meta: [
      { title: "Candidate Ranking — SkillMatch AI" },
      {
        name: "description",
        content:
          "Candidates ranked by AI match score with skills, experience and resume score at a glance.",
      },
      { property: "og:title", content: "Candidate Ranking — SkillMatch AI" },
      { property: "og:description", content: "AI-ranked shortlist for your open role." },
    ],
  }),
  component: CandidateRanking,
});

const statusTone: Record<string, string> = {
  Shortlisted: "bg-success/12 text-success",
  Interview: "bg-primary/12 text-primary",
  "In review": "bg-warning/15 text-warning",
  New: "bg-muted text-muted-foreground",
};

function CandidateRanking() {
  const [query, setQuery] = useState("");
  const list = candidates
    .filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(query.toLowerCase())),
    )
    .sort((a, b) => b.match - a.match);

  return (
    <>
      <PageHeader
        title="Candidate ranking"
        subtitle="Backend Engineer · 128 applicants · sorted by AI match score"
      />

      <div className="relative mb-5 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search candidate or skill…"
          className="pl-9"
        />
      </div>

      {list.length === 0 ? (
        <Card className="items-center gap-3 p-14 text-center">
          <p className="font-display text-lg font-bold">No candidates found</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Nobody in this pool matches “{query}”. Try a different skill or clear the search.
          </p>
          <Button variant="outline" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </Card>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {list.map((c, i) => (
            <Card key={c.id} className="hover-lift gap-4 p-5">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-primary-foreground">
                    {c.initials}
                  </span>
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border bg-card text-[10px] font-bold">
                    {i + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-base font-bold">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {c.role} · {c.experience}
                  </p>
                  <p className="text-xs text-muted-foreground">{c.location}</p>
                </div>
                <MatchRing value={c.match} size={62} label="match" tone={c.match >= 85 ? "success" : "primary"} />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Resume score</span>
                  <span className="font-semibold">{c.resumeScore}/100</span>
                </div>
                <Progress value={c.resumeScore} className="mt-2" />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {c.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full">
                    {s}
                  </Badge>
                ))}
                {c.missing.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="rounded-full border-destructive/30 text-destructive"
                  >
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={`rounded-full ${statusTone[c.status]}`}>
                  {c.status}
                </Badge>
                <Button asChild size="sm" className="ml-auto bg-brand hover:opacity-90">
                  <Link to="/employer/candidates/$candidateId" params={{ candidateId: c.id }}>
                    View profile <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
