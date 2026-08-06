import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { jobs } from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/jobs")({
  head: () => ({
    meta: [
      { title: "Job Recommendations — SkillMatch AI" },
      {
        name: "description",
        content:
          "Explore AI-ranked job recommendations with match percentages, salary bands, matched skills and missing skills.",
      },
      { property: "og:title", content: "Job Recommendations — SkillMatch AI" },
      {
        property: "og:description",
        content: "AI-ranked jobs with explained match percentages and skill gaps.",
      },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"match" | "recent">("match");

  const filtered = jobs
    .filter(
      (j) =>
        j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.company.toLowerCase().includes(query.toLowerCase()) ||
        j.matched.some((s) => s.toLowerCase().includes(query.toLowerCase())),
    )
    .sort((a, b) => (sort === "match" ? b.match - a.match : 0));

  return (
    <>
      <PageHeader
        title="Job recommendations"
        subtitle={`${jobs.length} strong matches based on your resume, projects and target roles.`}
        action={
          <div className="flex gap-2">
            <Button
              variant={sort === "match" ? "default" : "outline"}
              size="sm"
              className={sort === "match" ? "bg-brand" : ""}
              onClick={() => setSort("match")}
            >
              <SlidersHorizontal className="h-4 w-4" /> Best match
            </Button>
            <Button
              variant={sort === "recent" ? "default" : "outline"}
              size="sm"
              className={sort === "recent" ? "bg-brand" : ""}
              onClick={() => setSort("recent")}
            >
              Most recent
            </Button>
          </div>
        }
      />

      <div className="relative mb-5 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search role, company or skill…"
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="items-center gap-3 p-14 text-center">
          <div className="w-full max-w-sm space-y-2">
            <Skeleton className="mx-auto h-4 w-1/2 shimmer" />
            <Skeleton className="mx-auto h-4 w-2/3 shimmer" />
          </div>
          <p className="mt-2 font-display text-lg font-bold">No roles match “{query}”</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try a broader keyword, or clear the search to see all AI-ranked recommendations.
          </p>
          <Button variant="outline" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </Card>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  );
}
