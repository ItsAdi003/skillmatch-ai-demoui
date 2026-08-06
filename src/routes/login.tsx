import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { AuthLayout, RoleSelect, useRoleLogin, type Role } from "@/components/auth/auth-ui";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — SkillMatch AI" },
      {
        name: "description",
        content: "Log in to SkillMatch AI as a candidate, employer or admin to access your dashboard.",
      },
      { property: "og:title", content: "Log in — SkillMatch AI" },
      { property: "og:description", content: "Access your SkillMatch AI dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [role, setRole] = useState<Role>("candidate");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useRoleLogin();

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue where you left off."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
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
            login(role, "Logged in to the demo workspace");
          }, 900);
        }}
      >
        <div className="space-y-2">
          <Label>Account type</Label>
          <RoleSelect value={role} onChange={setRole} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" defaultValue="aarav@example.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              placeholder="••••••••"
              defaultValue="demo1234"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox defaultChecked /> Remember me
          </label>
          <span className="text-sm font-medium text-primary">Forgot password?</span>
        </div>

        <Button type="submit" className="w-full bg-brand hover:opacity-90" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Signing in…" : "Log in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
