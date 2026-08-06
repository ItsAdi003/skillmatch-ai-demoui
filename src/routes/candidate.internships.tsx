import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { JobCard } from "@/components/job-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { internships } from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/internships")({
  head: () => ({
    meta: [
      { title: "Internship Recommendations — SkillMatch AI" },
      {
        name: "description",
        content:
          "AI-matched internships with stipend, location, matched skills and the gaps worth closing first.",
      },
      { property: "og:title", content: "Internship Recommendations — SkillMatch AI" },
      {
        property: "og:description",
        content: "Ranked internships matched to your resume and projects.",
      },
    ],
  }),
  component: InternshipsPage,
});

function InternshipsPage() {
  return (
    <>
      <PageHeader
        title="Internship recommendations"
        subtitle="Ranked by semantic fit with your projects, coursework and available start date."
        action={
          <Badge variant="secondary" className="rounded-full px-3 py-1.5">
            Available from Sept 2026
          </Badge>
        }
      />

      <Card className="mb-5 gap-1 bg-soft p-5">
        <p className="text-sm font-semibold">Why these internships?</p>
        <p className="text-sm text-muted-foreground">
          Your Flask + PostgreSQL projects and 8.7 CGPA place you in the top band for backend
          internships. Two of these convert to full-time offers over 60% of the time.
        </p>
      </Card>

      <div className="grid gap-5 xl:grid-cols-2">
        {internships.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}
