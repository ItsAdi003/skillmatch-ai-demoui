import { createFileRoute } from "@tanstack/react-router";
import { Ban, Eye, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { reports } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: "Reported Accounts — SkillMatch AI Admin" },
      {
        name: "description",
        content: "Triage fraud reports, plagiarised resumes and spam accounts by severity.",
      },
      { property: "og:title", content: "Reported Accounts — SkillMatch AI Admin" },
      { property: "og:description", content: "Triage and action reported accounts." },
    ],
  }),
  component: ReportsPage,
});

const severityTone: Record<string, string> = {
  Critical: "bg-destructive/12 text-destructive",
  High: "bg-warning/15 text-warning",
  Low: "bg-muted text-muted-foreground",
};

function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reported accounts"
        subtitle="4 open cases · 2 critical · median resolution 9 hours"
      />

      <Card className="gap-0 overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reported account</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Reported by</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-semibold">{r.target}</TableCell>
                <TableCell className="text-muted-foreground">{r.type}</TableCell>
                <TableCell className="text-muted-foreground">{r.reporter}</TableCell>
                <TableCell className="text-muted-foreground">{r.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`rounded-full ${severityTone[r.severity]}`}>
                    {r.severity}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <Button size="sm" variant="ghost" onClick={() => toast("Case opened")}>
                      <Eye className="h-4 w-4" /> Review
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.success("Report dismissed")}>
                      <ShieldCheck className="h-4 w-4" /> Dismiss
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => toast.error(`${r.target} suspended`)}
                    >
                      <Ban className="h-4 w-4" /> Suspend
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
