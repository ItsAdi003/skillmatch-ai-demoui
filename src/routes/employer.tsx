import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, LayoutDashboard, PlusCircle, Users } from "lucide-react";
import { DashShell, type NavItem } from "@/components/dashboard/dash-shell";

export const Route = createFileRoute("/employer")({
  component: EmployerLayout,
});

const items: NavItem[] = [
  { label: "Overview", to: "/employer", icon: LayoutDashboard },
  { label: "Create Job", to: "/employer/create-job", icon: PlusCircle },
  { label: "My Jobs", to: "/employer/jobs", icon: BriefcaseBusiness },
  { label: "Candidate Ranking", to: "/employer/candidates", icon: Users },
];

function EmployerLayout() {
  return <DashShell items={items} role="Employer" user="Stripe India" initials="ST" />;
}
