# SkillMatch AI

A production-ready AI Resume Screening, Job Recommendation, Internship Recommendation and Career Learning Platform built as a final-year engineering project.

**Live Demo:** [skillmatch-ai-demoui.lovable.app](https://skillmatch-ai-demoui.lovable.app)

---

## What it does

SkillMatch AI helps candidates, employers and admins make better hiring decisions using AI-powered matching and skill-gap analysis.

- **Candidates** upload a resume, get an AI score, see ranked jobs and internships, identify skill gaps, and follow a weekly learning roadmap.
- **Employers** post jobs, view AI-ranked candidates, and see an AI-organized resume view for every applicant.
- **Admins** monitor platform activity, verify users and employers, and review reported accounts.

---

## Features

### Candidate Experience
- Semantic resume upload with drag-and-drop
- AI resume analysis: score, skills, strengths, weaknesses and suggestions
- Ranked job and internship recommendations with match percentages
- Skill gap analysis with priority learning order
- 4-week interactive learning roadmap
- Application pipeline tracking

### Employer Experience
- Hiring dashboard with applicant funnel charts
- Create and manage job postings
- AI-ranked candidate shortlists
- AI-organized resume view based on a specific job description

### Admin Experience
- Platform analytics and growth charts
- User, candidate and employer management
- Employer verification and reported accounts

---

## Tech Stack

- **Framework:** React 19 + TanStack Start / TanStack Router
- **Styling:** Tailwind CSS v4 with custom design tokens
- **UI Components:** shadcn/ui
- **Charts:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Vite 7
- **Generated with:** [Lovable](https://lovable.dev)

---

## Project Structure

```text
src/
  routes/           # All pages (landing, auth, candidate, employer, admin)
  components/       # Reusable UI components and dashboard shell
  lib/              # Mock data, theme, utilities
  styles.css        # Global design tokens and animations
```

---

## Getting Started

You need [Node.js](https://nodejs.org) installed. Then run:

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

The app will open at `http://localhost:8080`.

---

## Notes

- This project uses mock/dummy data only. No real backend or database is required to run it locally.
- The live demo is deployed and hosted via Lovable.
- Want to keep editing? Open the project in the [Lovable editor](https://lovable.dev/projects/70726183-1b87-49bd-a383-bbccd3314ed1).

---

Built with [Lovable](https://lovable.dev).
