import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CloudUpload, FileText, Loader2, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/candidate/upload")({
  head: () => ({
    meta: [
      { title: "Resume Upload — SkillMatch AI" },
      {
        name: "description",
        content: "Drag and drop your resume to start AI parsing, scoring and job matching instantly.",
      },
      { property: "og:title", content: "Resume Upload — SkillMatch AI" },
      { property: "og:description", content: "Upload a resume and watch the AI parse and score it." },
    ],
  }),
  component: UploadPage,
});

const stages = [
  "Extracting text & layout",
  "Detecting sections",
  "Normalising skills taxonomy",
  "Embedding projects & experience",
  "Scoring against 5,400 live roles",
];

function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fileName || done) return;
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 4, 100);
        setStage(Math.min(Math.floor(next / 20), stages.length - 1));
        if (next === 100) {
          clearInterval(timer);
          setDone(true);
          toast.success("Resume analysed — score 82/100");
        }
        return next;
      });
    }, 90);
    return () => clearInterval(timer);
  }, [fileName, done]);

  const start = (name: string) => {
    setFileName(name);
    setProgress(0);
    setStage(0);
    setDone(false);
  };

  const reset = () => {
    setFileName(null);
    setProgress(0);
    setStage(0);
    setDone(false);
  };

  return (
    <>
      <PageHeader
        title="Resume upload"
        subtitle="PDF or DOCX up to 5 MB. Parsing usually finishes in under 10 seconds."
      />

      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <Card className="gap-5 p-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              start(e.dataTransfer.files?.[0]?.name ?? "Aarav_Sharma_Resume.pdf");
            }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-all",
              dragging
                ? "border-primary bg-accent shadow-glow"
                : "border-border bg-soft hover:border-primary/50",
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => start(e.target.files?.[0]?.name ?? "resume.pdf")}
            />
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand shadow-glow">
              <CloudUpload className="h-6 w-6 text-primary-foreground" />
            </span>
            <p className="mt-4 font-display text-lg font-bold">Drag & drop your resume</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              or <span className="font-semibold text-primary">browse files</span> from your device
            </p>
            <div className="mt-4 flex gap-2">
              {["PDF", "DOCX", "≤ 5 MB"].map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {fileName && (
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-soft text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-semibold">{fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {done ? "Analysis complete" : `${progress}% · ${stages[stage]}`}
                </p>
              </div>
              {done ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              )}
              <Button size="icon" variant="ghost" onClick={reset} aria-label="Remove file">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>

        <Card className="gap-5 p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-bold">AI analysis</h2>
          </div>

          {!fileName && (
            <div className="flex flex-col items-center justify-center rounded-xl bg-soft px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-card">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </span>
              <p className="mt-4 font-semibold">No resume yet</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Upload a file and the parsing pipeline, score and matches will appear here.
              </p>
            </div>
          )}

          {fileName && !done && (
            <div className="space-y-5">
              <div>
                <Progress value={progress} />
                <p className="mt-2 text-xs text-muted-foreground">{progress}% complete</p>
              </div>
              <ul className="space-y-2.5">
                {stages.map((s, i) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm">
                    {i < stage ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : i === stage ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border" />
                    )}
                    <span className={i <= stage ? "" : "text-muted-foreground"}>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-2/3 shimmer" />
                <Skeleton className="h-4 w-full shimmer" />
                <Skeleton className="h-4 w-5/6 shimmer" />
              </div>
            </div>
          )}

          {done && (
            <div className="space-y-4">
              <div className="rounded-xl bg-soft p-5">
                <p className="text-sm text-muted-foreground">Resume score</p>
                <p className="font-display text-4xl font-extrabold gradient-text">82 / 100</p>
                <p className="mt-1 text-xs text-success">+8 vs your previous version</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li>· 6 technical skills and 5 soft skills detected</li>
                <li>· 3 projects and 2 experience entries parsed</li>
                <li>· 21 job matches and 16 internship matches found</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <Button asChild className="bg-brand hover:opacity-90">
                  <Link to="/candidate/analysis">View full analysis</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/candidate/jobs">See job matches</Link>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
