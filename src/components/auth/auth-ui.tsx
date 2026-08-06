import { Link, useNavigate } from "@tanstack/react-router";
import { Building2, ShieldCheck, User, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Role = "candidate" | "employer" | "admin";

export const roleOptions: { id: Role; label: string; icon: LucideIcon; hint: string; to: string }[] =
  [
    { id: "candidate", label: "Candidate", icon: User, hint: "Find jobs & upskill", to: "/candidate" },
    {
      id: "employer",
      label: "Employer",
      icon: Building2,
      hint: "Hire ranked talent",
      to: "/employer",
    },
    {
      id: "admin",
      label: "Admin",
      icon: ShieldCheck,
      hint: "Moderate the platform",
      to: "/admin",
    },
  ];

export function RoleSelect({ value, onChange }: { value: Role; onChange: (r: Role) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {roleOptions.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onChange(r.id)}
          className={cn(
            "rounded-xl border p-3 text-left transition-all",
            value === r.id
              ? "border-primary bg-accent shadow-glow"
              : "border-border hover:bg-accent/50",
          )}
        >
          <r.icon
            className={cn("h-4 w-4", value === r.id ? "text-primary" : "text-muted-foreground")}
          />
          <p className="mt-2 text-sm font-semibold">{r.label}</p>
          <p className="text-[11px] leading-tight text-muted-foreground">{r.hint}</p>
        </button>
      ))}
    </div>
  );
}

export function useRoleLogin() {
  const navigate = useNavigate();
  return (role: Role, message: string) => {
    const target = roleOptions.find((r) => r.id === role)!;
    toast.success(message);
    navigate({ to: target.to });
  };
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-soft p-10 lg:flex">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />
        <Logo />
        <div className="relative max-w-md">
          <h2 className="font-display text-3xl font-bold leading-tight">
            Screening that reads <span className="gradient-text">context, not keywords.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Join 58,000+ candidates and 284 verified employers using SkillMatch AI to match on real
            skills, projects and outcomes.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "Explained match percentages on every role",
              "Skill gap reports with learn-first priorities",
              "AI organized resume views for recruiters",
            ].map((line) => (
              <p key={line} className="flex items-center gap-2.5 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {line}
              </p>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-muted-foreground">
          Demo product · any credentials will work
        </p>
      </div>

      <div className="flex flex-col px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Logo />
          </div>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md gap-5 border-none bg-transparent p-0 shadow-none sm:border sm:bg-card sm:p-8 sm:shadow-card">
            <div>
              <h1 className="font-display text-2xl font-bold">{title}</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
            <div className="text-center text-sm text-muted-foreground">{footer}</div>
          </Card>
        </div>
        <div className="text-center">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function usePasswordVisibility() {
  return useState(false);
}
