import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { AuthLayout, RoleSelect, useRoleLogin, type Role } from "@/components/auth/auth-ui";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — SkillMatch AI" },
      {
        name: "description",
        content:
          "Register on SkillMatch AI as a candidate, employer or admin and start matching on real skills.",
      },
      { property: "og:title", content: "Create your account — SkillMatch AI" },
      {
        property: "og:description",
        content: "Register as a candidate, employer or admin on SkillMatch AI.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [role, setRole] = useState<Role>("candidate");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useRoleLogin();

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free forever plan, no card required."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            login(role, "Account created — welcome to SkillMatch AI");
          }, 1100);
        }}
      >
        <div className="space-y-2">
          <Label>Account type</Label>
          <RoleSelect value={role} onChange={setRole} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first">
              {role === "employer" ? "Company name" : "Full name"}
            </Label>
            <Input id="first" placeholder={role === "employer" ? "Acme Inc." : "Aarav Sharma"} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">
              {role === "candidate" ? "College" : role === "employer" ? "Industry" : "Team"}
            </Label>
            <Input
              id="location"
              placeholder={
                role === "candidate" ? "PSG College of Technology" : role === "employer" ? "SaaS" : "Trust & Safety"
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" placeholder="you@example.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              placeholder="At least 8 characters"
              required
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Toggle password visibility"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <Checkbox defaultChecked className="mt-0.5" /> I agree to the terms of service and privacy
          policy.
        </label>

        <Button type="submit" className="w-full bg-brand hover:opacity-90" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
