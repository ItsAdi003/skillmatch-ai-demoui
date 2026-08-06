import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  Check,
  FileSearch,
  GraduationCap,
  LayoutDashboard,
  Quote,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
} from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillMatch AI — AI Resume Screening & Job Matching" },
      {
        name: "description",
        content:
          "SkillMatch AI scores resumes beyond keyword matching, recommends jobs and internships, maps your skill gaps and builds a weekly learning roadmap.",
      },
      { property: "og:title", content: "SkillMatch AI — AI Resume Screening & Job Matching" },
      {
        property: "og:description",
        content:
          "AI-powered resume screening, job and internship recommendations, skill gap analysis and career roadmaps.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: FileSearch,
    title: "Semantic resume screening",
    body: "Embeddings compare meaning, not keywords, so 'built REST services' matches 'API development'.",
  },
  {
    icon: Target,
    title: "Match scoring you can trust",
    body: "Every score is explained: skills matched, skills missing and how much each one moves the needle.",
  },
  {
    icon: Briefcase,
    title: "Jobs & internships in one feed",
    body: "Ranked opportunities with salary or stipend, location and live match percentages.",
  },
  {
    icon: BarChart3,
    title: "Skill gap analytics",
    body: "See required vs existing skills, market demand and what to learn first.",
  },
  {
    icon: RouteIcon,
    title: "Weekly learning roadmap",
    body: "A four-week plan with resources and completion tracking, regenerated as you improve.",
  },
  {
    icon: ShieldCheck,
    title: "Verified employers",
    body: "Admin verification, fraud reports and suspicious-account detection keep the pool clean.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload your resume",
    body: "Drop a PDF or DOCX. Parsing takes seconds and nothing is shared without you.",
  },
  {
    icon: Brain,
    title: "AI analyses & scores",
    body: "Skills, projects, education and impact signals are extracted and scored out of 100.",
  },
  {
    icon: LayoutDashboard,
    title: "Get matches & gaps",
    body: "Ranked jobs and internships arrive with matched skills and missing skills spelled out.",
  },
  {
    icon: GraduationCap,
    title: "Follow your roadmap",
    body: "Close the gaps week by week and watch your match scores climb.",
  },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    body: "Everything a student needs to start applying.",
    perks: [
      "1 resume analysis per month",
      "10 job & internship matches",
      "Basic skill gap report",
      "Community learning resources",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Premium",
    price: "₹499",
    period: "per month",
    body: "For candidates in an active job hunt.",
    perks: [
      "Unlimited resume analyses & versions",
      "Unlimited ranked matches",
      "Deep skill gap + priority ordering",
      "Personalised 4-week roadmaps",
      "AI organized resume for every job",
      "Application tracking & reminders",
    ],
    cta: "Go Premium",
    highlight: true,
  },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden bg-soft">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-violet/20 blur-3xl" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div className="animate-fade-up">
            <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Now with AI organized resume views
            </Badge>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              AI-powered Resume Screening{" "}
              <span className="gradient-text">Beyond Keyword Matching.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              SkillMatch AI reads resumes the way a great recruiter does — understanding context,
              projects and impact. Candidates get explained matches and a learning roadmap;
              employers get ranked shortlists in minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-brand shadow-glow hover:opacity-90">
                <Link to="/register">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/candidate/jobs">Explore Jobs</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["58k+", "Resumes screened"],
                ["284", "Verified employers"],
                ["3.4x", "Faster shortlisting"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl font-bold">{value}</dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="SkillMatch AI dashboard showing resume match scores and skill analytics"
              width={1280}
              height={960}
              className="w-full rounded-3xl border shadow-glow"
            />
            <Card className="absolute -bottom-6 left-4 hidden w-52 gap-1 p-4 sm:block glass">
              <p className="text-xs text-muted-foreground">Resume score</p>
              <p className="font-display text-2xl font-bold gradient-text">82 / 100</p>
              <p className="text-xs text-success">+14 after roadmap week 1</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            One platform for screening, matching and upskilling
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="hover-lift gap-3 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="how" className="scroll-mt-20 border-y bg-soft">
        <div className="mx-auto w-full max-w-6xl px-5 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              From resume to offer in four steps
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Loved by</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Students and hiring teams, same platform
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover-lift gap-4 p-6">
              <Quote className="h-6 w-6 text-primary/50" />
              <p className="text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-auto flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-brand text-xs font-bold text-primary-foreground">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 border-t bg-soft">
        <div className="mx-auto w-full max-w-5xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Free to start, premium when you're serious
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={
                  p.highlight
                    ? "relative gap-5 border-primary/40 p-7 shadow-glow"
                    : "gap-5 p-7 hover-lift"
                }
              >
                {p.highlight && (
                  <Badge className="absolute right-6 top-6 rounded-full bg-brand">
                    Most popular
                  </Badge>
                )}
                <div>
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                </div>
                <p className="flex items-end gap-1.5">
                  <span className="font-display text-4xl font-extrabold">{p.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">{p.period}</span>
                </p>
                <ul className="space-y-2.5">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={p.highlight ? "bg-brand hover:opacity-90" : ""}
                  variant={p.highlight ? "default" : "outline"}
                >
                  <Link to="/register">{p.cta}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
