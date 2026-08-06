import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

const columns = [
  {
    title: "Product",
    items: [
      { label: "Candidate dashboard", to: "/candidate" },
      { label: "Employer dashboard", to: "/employer" },
      { label: "Admin console", to: "/admin" },
      { label: "Learning roadmap", to: "/candidate/roadmap" },
    ],
  },
  {
    title: "Discover",
    items: [
      { label: "Jobs", to: "/candidate/jobs" },
      { label: "Internships", to: "/candidate/internships" },
      { label: "Skill gap analysis", to: "/candidate/skill-gap" },
      { label: "Resume analysis", to: "/candidate/analysis" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Log in", to: "/login" },
      { label: "Create account", to: "/register" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-soft">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            AI-powered resume screening, job and internship matching, and personalised career
            roadmaps — beyond keyword matching.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SkillMatch AI. All data shown is demo data.</p>
          <p>Built as a final year engineering project.</p>
        </div>
      </div>
    </footer>
  );
}
