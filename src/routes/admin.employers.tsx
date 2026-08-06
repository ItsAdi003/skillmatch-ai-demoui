import { createFileRoute } from "@tanstack/react-router";
import { Building2, CheckCircle2, ExternalLink, XCircle } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { employerVerifications } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/employers")({
  head: () => ({
    meta: [
      { title: "Employer Verification — SkillMatch AI Admin" },
      {
        name: "description",
        content: "Review employer GST details, domains and fraud-risk scores before approval.",
      },
      { property: "og:title", content: "Employer Verification — SkillMatch AI Admin" },
      { property: "og:description", content: "Approve or reject pending employer accounts." },
    ],
  }),
  component: EmployerVerification,
});

const riskTone: Record<string, string> = {
  High: "bg-destructive/12 text-destructive",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-success/12 text-success",
};

function EmployerVerification() {
  return (
    <>
      <PageHeader
        title="Employer verification"
        subtitle="3 pending requests · average review time 4 hours"
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {employerVerifications.map((e) => (
          <Card key={e.id} className="hover-lift gap-4 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft text-primary">
                <Building2 className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-base font-bold">{e.company}</h3>
                <p className="text-xs text-muted-foreground">Submitted {e.submitted}</p>
              </div>
              <Badge variant="secondary" className={`rounded-full ${riskTone[e.risk]}`}>
                {e.risk} risk
              </Badge>
            </div>

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">GST number</dt>
                <dd className="font-medium">{e.gst}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Domain</dt>
                <dd className="inline-flex items-center gap-1 font-medium">
                  {e.domain} <ExternalLink className="h-3 w-3" />
                </dd>
              </div>
            </dl>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-brand hover:opacity-90"
                onClick={() => toast.success(`${e.company} verified`)}
              >
                <CheckCircle2 className="h-4 w-4" /> Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.error(`${e.company} rejected`)}
              >
                <XCircle className="h-4 w-4" /> Reject
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
