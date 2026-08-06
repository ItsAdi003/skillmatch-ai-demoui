import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { employerJobs } from "@/lib/mock-data";

export const Route = createFileRoute("/employer/jobs")({
  head: () => ({
    meta: [
      { title: "My Job Postings — SkillMatch AI" },
      {
        name: "description",
        content: "Manage your active, paused and closed postings with applicant and shortlist counts.",
      },
      { property: "og:title", content: "My Job Postings — SkillMatch AI" },
      { property: "og:description", content: "Manage postings and shortlist conversion rates." },
    ],
  }),
  component: EmployerJobsPage,
});

const statusTone: Record<string, string> = {
  Active: "bg-success/12 text-success",
  Paused: "bg-warning/15 text-warning",
  Closed: "bg-muted text-muted-foreground",
};

function EmployerJobsPage() {
  return (
    <>
      <PageHeader
        title="My job postings"
        subtitle="5 postings · 552 total applicants"
        action={
          <Button asChild className="bg-brand hover:opacity-90">
            <Link to="/employer/create-job">
              <Plus className="h-4 w-4" /> New job
            </Link>
          </Button>
        }
      />

      <Card className="gap-0 overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead className="w-48">Shortlist rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employerJobs.map((j) => {
              const rate = Math.round((j.shortlisted / j.applicants) * 100);
              return (
                <TableRow key={j.id}>
                  <TableCell className="font-semibold">{j.title}</TableCell>
                  <TableCell className="text-muted-foreground">{j.posted}</TableCell>
                  <TableCell>{j.applicants}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={rate} className="w-24" />
                      <span className="text-xs text-muted-foreground">{rate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`rounded-full ${statusTone[j.status]}`}>
                      {j.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/employer/candidates">Ranking</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
