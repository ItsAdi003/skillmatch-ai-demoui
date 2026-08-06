import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Check, MapPin, Wallet, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MatchRing } from "@/components/match-ring";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Job } from "@/lib/mock-data";

export function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="hover-lift gap-4 p-5">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand font-display text-xs font-bold text-primary-foreground">
            {job.logo}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-base font-bold">{job.title}</h3>
            <p className="text-sm text-muted-foreground">
              {job.company} · {job.type}
            </p>
          </div>
          <MatchRing value={job.match} size={62} label="match" tone={job.match >= 85 ? "success" : "primary"} />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5" /> {job.salary}
          </span>
          <span>{job.posted}</span>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {job.matched.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="gap-1 rounded-full bg-success/12 text-success"
              >
                <Check className="h-3 w-3" />
                {s}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {job.missing.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="gap-1 rounded-full border-destructive/30 text-destructive"
              >
                <X className="h-3 w-3" />
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            className="bg-brand hover:opacity-90"
            disabled={applied}
            onClick={() => {
              setApplied(true);
              toast.success(`Application sent to ${job.company}`);
            }}
          >
            {applied ? "Applied" : "Apply"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSaved((v) => !v);
              toast(saved ? "Removed from saved" : "Saved for later");
            }}
          >
            {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {saved ? "Saved" : "Save"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
            View Details
          </Button>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {job.title} · {job.company}
            </DialogTitle>
            <DialogDescription>
              {job.location} · {job.salary} · posted {job.posted}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
          <div className="rounded-xl bg-soft p-4">
            <p className="text-sm font-semibold">Why you match {job.match}%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              You cover {job.matched.length} of {job.matched.length + job.missing.length} required
              skills. Closing {job.missing[0] ?? "the remaining gaps"} would push you above 95%.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-brand" onClick={() => toast.success("Application sent")}>
              Apply now
            </Button>
            <Button variant="outline" asChild>
              <Link to="/candidate/skill-gap">See skill gap</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
