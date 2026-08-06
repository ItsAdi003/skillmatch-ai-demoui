import { createFileRoute } from "@tanstack/react-router";
import { Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/employer/create-job")({
  head: () => ({
    meta: [
      { title: "Create a Job — SkillMatch AI" },
      {
        name: "description",
        content:
          "Post a role with required and preferred skills, experience, salary and location, then let the AI rank applicants.",
      },
      { property: "og:title", content: "Create a Job — SkillMatch AI" },
      { property: "og:description", content: "Publish a role and get AI-ranked applicants." },
    ],
  }),
  component: CreateJobPage,
});

function SkillInput({
  label,
  initial,
  tone,
}: {
  label: string;
  initial: string[];
  tone: "primary" | "muted";
}) {
  const [skills, setSkills] = useState(initial);
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a skill and press Add"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (value.trim()) {
                setSkills((s) => [...s, value.trim()]);
                setValue("");
              }
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (value.trim()) {
              setSkills((s) => [...s, value.trim()]);
              setValue("");
            }
          }}
        >
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {skills.map((s) => (
          <Badge
            key={s}
            variant="secondary"
            className={
              tone === "primary"
                ? "gap-1 rounded-full bg-primary/12 text-primary"
                : "gap-1 rounded-full"
            }
          >
            {s}
            <button
              type="button"
              onClick={() => setSkills((list) => list.filter((x) => x !== s))}
              aria-label={`Remove ${s}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}

function CreateJobPage() {
  return (
    <>
      <PageHeader
        title="Create a job"
        subtitle="The AI uses this description to rank and reorganise every applicant's resume."
      />

      <form
        className="grid gap-5 lg:grid-cols-[1.4fr_1fr]"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Job published — AI ranking starts immediately");
        }}
      >
        <Card className="gap-5 p-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job title</Label>
            <Input id="title" placeholder="Backend Engineer" defaultValue="Backend Engineer" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              rows={6}
              placeholder="What will this person own? What does success look like in the first 6 months?"
              defaultValue="You'll own services in our payments core: designing APIs, tuning PostgreSQL queries and shipping to production weekly. We care about clear writing, ownership and pragmatic system design."
            />
          </div>

          <SkillInput label="Required skills" initial={["Python", "PostgreSQL", "REST APIs", "Docker"]} tone="primary" />
          <SkillInput label="Preferred skills" initial={["Kafka", "Terraform", "Go"]} tone="muted" />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Experience</Label>
              <Select defaultValue="1-3">
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intern">Internship</SelectItem>
                  <SelectItem value="0-1">0 – 1 years</SelectItem>
                  <SelectItem value="1-3">1 – 3 years</SelectItem>
                  <SelectItem value="3-5">3 – 5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Work mode</Label>
              <Select defaultValue="hybrid">
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary / stipend</Label>
              <Input id="salary" placeholder="₹18–26 LPA" defaultValue="₹18–26 LPA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loc">Location</Label>
              <Input id="loc" placeholder="Bengaluru, India" defaultValue="Bengaluru, India" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit" className="bg-brand hover:opacity-90">
              Publish job
            </Button>
            <Button type="button" variant="outline" onClick={() => toast("Saved as draft")}>
              Save draft
            </Button>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="gap-3 bg-soft p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="font-display text-base font-bold">AI screening preview</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              With these skills we estimate:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Qualified candidates in pool</span>
                <span className="font-semibold">412</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Expected 85%+ matches</span>
                <span className="font-semibold">38</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Median resume score</span>
                <span className="font-semibold">76 / 100</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Time to first shortlist</span>
                <span className="font-semibold">~2 hours</span>
              </li>
            </ul>
          </Card>

          <Card className="gap-3 p-6">
            <h2 className="font-display text-base font-bold">Writing tips</h2>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>· Keep required skills under 6 — long lists shrink your pool by up to 40%.</li>
              <li>· Mention the tech stack explicitly so semantic matching is accurate.</li>
              <li>· Add salary; posts with a band get 2.3x more qualified applicants.</li>
            </ul>
          </Card>
        </div>
      </form>
    </>
  );
}
