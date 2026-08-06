import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Briefcase,
  FileSearch,
  GraduationCap,
  LayoutDashboard,
  Route as RouteIcon,
  Target,
  Upload,
} from "lucide-react";
import { DashShell, type NavItem } from "@/components/dashboard/dash-shell";

export const Route = createFileRoute("/candidate")({
  component: CandidateLayout,
});

const items: NavItem[] = [
  { label: "Overview", to: "/candidate", icon: LayoutDashboard },
  { label: "Resume Upload", to: "/candidate/upload", icon: Upload },
  { label: "Resume Analysis", to: "/candidate/analysis", icon: FileSearch },
  { label: "Job Matches", to: "/candidate/jobs", icon: Briefcase },
  { label: "Internships", to: "/candidate/internships", icon: GraduationCap },
  { label: "Skill Gap", to: "/candidate/skill-gap", icon: Target },
  { label: "Learning Roadmap", to: "/candidate/roadmap", icon: RouteIcon },
  { label: "Applications", to: "/candidate/applications", icon: BarChart3 },
];

function CandidateLayout() {
  return <DashShell items={items} role="Candidate" user="Aarav Sharma" initials="AS" />;
}
