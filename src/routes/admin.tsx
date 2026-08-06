import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  BarChart3,
  Building2,
  Flag,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { DashShell, type NavItem } from "@/components/dashboard/dash-shell";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const items: NavItem[] = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "User Management", to: "/admin/users", icon: Users },
  { label: "Employer Verification", to: "/admin/employers", icon: Building2 },
  { label: "Candidate Verification", to: "/admin/candidates", icon: BadgeCheck },
  { label: "Reported Accounts", to: "/admin/reports", icon: Flag },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
];

function AdminLayout() {
  return <DashShell items={items} role="Admin" user="Meera Krishnan" initials="MK" />;
}
