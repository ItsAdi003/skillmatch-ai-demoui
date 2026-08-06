import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarCheck,
  FolderGit2,
  Mail,
  Sparkles,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { MatchRing } from "@/components/match-ring";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { candidates, type Candidate } from "@/lib/mock-data";

export const Route = createFileRoute("/employer/candidates/$candidateId")({
  loader: ({ params }): { candidate: Candidate } => {
    const candidate = candidates.find((c) => c.id === params.candidateId);
    if (!candidate) throw notFound();
    return { candidate };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Candidate unavailable — SkillMatch AI" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.candidate.name} — AI Organized Resume`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.candidate.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.candidate.summary },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: CandidateProfile,
});

function CandidateProfile() {
  const { candidateId } = Route.useParams();
  const c: Candidate = candidates.find((x) => x.id === candidateId) ?? candidates[0]!;

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground">
        <Link to="/employer/candidates">
          <ArrowLeft className="h-4 w-4" /> Back to ranking
        </Link>
      </Button>

      <Card className="mb-5 gap-5 p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand font-display text-lg font-bold text-primary-foreground shadow-glow">
            {c.initials}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-bold">{c.name}</h1>
            <p className="text-sm text-muted-foreground">
              {c.role} · {c.experience} · {c.location}
            </p>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{c.summary}</p>
          </div>
          <div className="flex items-center gap-6">
            <MatchRing value={c.match} size={84} label="match" tone="success" />
            <div>
              <p className="text-xs text-muted-foreground">Resume score</p>
              <p className="font-display text-2xl font-bold">{c.resumeScore}</p>
              <Progress value={c.resumeScore} className="mt-2 w-24" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-brand hover:opacity-90" onClick={() => toast.success("Candidate shortlisted")}>
            <Star className="h-4 w-4" /> Shortlist
          </Button>
          <Button variant="outline" onClick={() => toast("Interview invite drafted")}>
            <CalendarCheck className="h-4 w-4" /> Schedule interview
          </Button>
          <Button variant="ghost" onClick={() => toast("Message window opened")}>
            <Mail className="h-4 w-4" /> Message
          </Button>
        </div>
      </Card>

      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-soft px-4 py-3">
        <Badge className="gap-1.5 rounded-full bg-brand">
          <Sparkles className="h-3.5 w-3.5" /> AI Organized View based on Job Description.
        </Badge>
        <p className="text-xs text-muted-foreground">
          Sections most relevant to “Backend Engineer” are surfaced first; everything else is moved
          below.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="gap-4 p-6">
          <h2 className="font-display text-lg font-bold">Relevant skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {c.skills.map((s) => (
              <Badge key={s} className="rounded-full bg-success/12 text-success" variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
          {c.missing.length > 0 && (
            <div>
              <p className="text-sm font-semibold">Gaps vs job description</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
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
            </div>
          )}
        </Card>

        <Card className="gap-4 p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-bold">Relevant projects</h2>
          </div>
          <ul className="space-y-4">
            {c.relevantProjects.map((p) => (
              <li key={p.name} className="rounded-xl border p-4">
                <p className="font-semibold">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-5 gap-4 p-6">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-bold">Relevant experience</h2>
        </div>
        <ol className="space-y-5">
          {c.relevantExperience.map((e) => (
            <li key={`${e.role}-${e.org}`} className="border-l-2 border-primary/40 pl-4">
              <p className="font-semibold">
                {e.role} · <span className="text-muted-foreground">{e.org}</span>
              </p>
              <p className="text-xs text-muted-foreground">{e.period}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{e.detail}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold text-muted-foreground">
          Less relevant to this role
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {c.otherSections.map((s) => (
            <Card key={s.title} className="gap-2 border-dashed bg-muted/30 p-5 shadow-none">
              <h3 className="text-sm font-semibold text-muted-foreground">{s.title}</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {s.items.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
