import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileCheck2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { MatchRing } from "@/components/match-ring";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { candidateVerifications } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/candidates")({
  head: () => ({
    meta: [
      { title: "Candidate Verification — SkillMatch AI Admin" },
      {
        name: "description",
        content:
          "Review candidate documents with AI authenticity confidence scores before approving profiles.",
      },
      { property: "og:title", content: "Candidate Verification — SkillMatch AI Admin" },
      { property: "og:description", content: "Approve or reject candidate document submissions." },
    ],
  }),
  component: CandidateVerification,
});

function CandidateVerification() {
  return (
    <>
      <PageHeader
        title="Candidate verification"
        subtitle="Documents scored by the authenticity model — anything under 60% needs manual review."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {candidateVerifications.map((c) => (
          <Card key={c.id} className="hover-lift gap-4 p-5">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft text-primary">
                <FileCheck2 className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-base font-bold">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.document}</p>
                <p className="text-xs text-muted-foreground">Submitted {c.submitted}</p>
              </div>
              <MatchRing
                value={c.confidence}
                size={62}
                label="trust"
                tone={c.confidence >= 75 ? "success" : c.confidence >= 60 ? "warning" : "destructive"}
              />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-brand hover:opacity-90"
                onClick={() => toast.success(`${c.name} verified`)}
              >
                <CheckCircle2 className="h-4 w-4" /> Approve
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast.error("Marked for re-upload")}>
                <XCircle className="h-4 w-4" /> Request again
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
