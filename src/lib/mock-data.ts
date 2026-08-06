export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  match: number;
  salary: string;
  posted: string;
  matched: string[];
  missing: string[];
  description: string;
};

export const jobs: Job[] = [
  {
    id: "j1",
    title: "Backend Engineer",
    company: "Stripe",
    logo: "ST",
    location: "Bengaluru · Hybrid",
    type: "Full-time",
    match: 94,
    salary: "₹18–26 LPA",
    posted: "2 days ago",
    matched: ["Python", "PostgreSQL", "Docker", "REST APIs"],
    missing: ["Kafka", "Terraform"],
    description:
      "Build and scale payment infrastructure APIs handling millions of requests per day.",
  },
  {
    id: "j2",
    title: "Full Stack Developer",
    company: "Notion",
    logo: "NO",
    location: "Remote (India)",
    type: "Full-time",
    match: 89,
    salary: "₹15–22 LPA",
    posted: "4 days ago",
    matched: ["React", "TypeScript", "Node.js"],
    missing: ["GraphQL", "Redis"],
    description: "Own end-to-end feature delivery across the web app and internal tooling.",
  },
  {
    id: "j3",
    title: "Data Engineer",
    company: "Swiggy",
    logo: "SW",
    location: "Hyderabad · On-site",
    type: "Full-time",
    match: 81,
    salary: "₹14–20 LPA",
    posted: "1 week ago",
    matched: ["SQL", "Python", "Airflow"],
    missing: ["Spark", "dbt", "Snowflake"],
    description: "Design batch and streaming pipelines powering demand forecasting models.",
  },
  {
    id: "j4",
    title: "ML Engineer",
    company: "Vercel",
    logo: "VE",
    location: "Remote",
    type: "Contract",
    match: 74,
    salary: "₹12–18 LPA",
    posted: "3 days ago",
    matched: ["Python", "Pandas", "scikit-learn"],
    missing: ["PyTorch", "MLflow", "Vector DBs"],
    description: "Ship retrieval and ranking models for developer search experiences.",
  },
  {
    id: "j5",
    title: "Platform Engineer",
    company: "Linear",
    logo: "LI",
    location: "Pune · Hybrid",
    type: "Full-time",
    match: 70,
    salary: "₹16–24 LPA",
    posted: "6 days ago",
    matched: ["Docker", "CI/CD", "Linux"],
    missing: ["Kubernetes", "Go", "Observability"],
    description: "Improve build, deploy and developer experience across all product teams.",
  },
];

export const internships: Job[] = [
  {
    id: "i1",
    title: "Backend Development Intern",
    company: "Razorpay",
    logo: "RZ",
    location: "Bengaluru · Hybrid",
    type: "Internship",
    match: 96,
    salary: "₹40,000 / month",
    posted: "1 day ago",
    matched: ["Python", "Flask", "SQL"],
    missing: ["Celery"],
    description: "Work with the payments core team on internal APIs and reconciliation jobs.",
  },
  {
    id: "i2",
    title: "Frontend Intern",
    company: "Zoho",
    logo: "ZO",
    location: "Chennai · On-site",
    type: "Internship",
    match: 88,
    salary: "₹25,000 / month",
    posted: "3 days ago",
    matched: ["React", "JavaScript", "CSS"],
    missing: ["Testing Library"],
    description: "Build UI components for the CRM suite with a strong design-systems focus.",
  },
  {
    id: "i3",
    title: "Data Analyst Intern",
    company: "Zomato",
    logo: "ZM",
    location: "Gurugram · Hybrid",
    type: "Internship",
    match: 79,
    salary: "₹30,000 / month",
    posted: "5 days ago",
    matched: ["SQL", "Excel", "Python"],
    missing: ["Power BI", "Statistics"],
    description: "Support the growth team with cohort analysis and experiment reporting.",
  },
  {
    id: "i4",
    title: "Cloud Engineering Intern",
    company: "Freshworks",
    logo: "FR",
    location: "Remote",
    type: "Internship",
    match: 72,
    salary: "₹35,000 / month",
    posted: "1 week ago",
    matched: ["Linux", "Git"],
    missing: ["AWS", "Terraform", "Kubernetes"],
    description: "Assist in migrating internal services to a managed container platform.",
  },
];

export const resumeAnalysis = {
  score: 82,
  fileName: "Aarav_Sharma_Resume.pdf",
  updated: "Aug 4, 2026",
  technicalSkills: [
    { name: "Python", level: 88 },
    { name: "React", level: 82 },
    { name: "SQL", level: 64 },
    { name: "Docker", level: 58 },
    { name: "Node.js", level: 71 },
    { name: "Git", level: 90 },
  ],
  softSkills: ["Communication", "Ownership", "Collaboration", "Problem solving", "Adaptability"],
  education: [
    {
      degree: "B.E. Computer Science",
      org: "PSG College of Technology",
      period: "2022 – 2026",
      detail: "CGPA 8.7 / 10",
    },
    {
      degree: "Higher Secondary (CBSE)",
      org: "Delhi Public School",
      period: "2020 – 2022",
      detail: "94.2%",
    },
  ],
  projects: [
    {
      name: "SmartMed — Appointment Platform",
      detail: "React + Flask + PostgreSQL app with role-based access and reminder emails.",
    },
    {
      name: "TrafficVision",
      detail: "YOLOv8 based vehicle counter deployed on a Raspberry Pi with a live dashboard.",
    },
    {
      name: "DevNotes CLI",
      detail: "Open-source note manager in Python with 400+ GitHub stars.",
    },
  ],
  certifications: [
    "AWS Certified Cloud Practitioner",
    "Meta Front-End Developer",
    "Google Data Analytics",
  ],
  strengths: [
    "Strong project portfolio with production-style deployments",
    "Solid Python and API fundamentals backed by measurable outcomes",
    "Clear, quantified bullet points in experience section",
  ],
  weaknesses: [
    "No cloud infrastructure or IaC experience mentioned",
    "Missing system design or scalability signals",
    "Resume is 2 pages — recruiters skim only the first",
  ],
  suggestions: [
    {
      title: "Add measurable impact to project bullets",
      body: "Replace 'built a dashboard' with 'cut reporting time 40% for 120 weekly users'.",
      priority: "High",
    },
    {
      title: "Surface SQL and data modelling",
      body: "72% of your matched roles ask for advanced SQL. Move it into your top-3 skills.",
      priority: "High",
    },
    {
      title: "Compress to a single page",
      body: "Merge coursework and hobbies; keep only the 3 strongest projects.",
      priority: "Medium",
    },
    {
      title: "Add a cloud deployment story",
      body: "Deploy one project on AWS/GCP and mention the stack explicitly.",
      priority: "Medium",
    },
  ],
};

export const applicationStatus = [
  { name: "Applied", value: 18, fill: "var(--color-chart-1)" },
  { name: "In review", value: 7, fill: "var(--color-chart-2)" },
  { name: "Interview", value: 4, fill: "var(--color-chart-3)" },
  { name: "Offer", value: 1, fill: "var(--color-chart-5)" },
  { name: "Rejected", value: 6, fill: "var(--color-chart-4)" },
];

export const skillProgress = [
  { month: "Mar", score: 48 },
  { month: "Apr", score: 55 },
  { month: "May", score: 61 },
  { month: "Jun", score: 68 },
  { month: "Jul", score: 76 },
  { month: "Aug", score: 82 },
];

export const skillGap = {
  required: ["SQL", "REST APIs", "Docker", "AWS", "Kubernetes", "Kafka", "System Design", "Python"],
  existing: ["Python", "REST APIs", "Docker", "Git", "React"],
  missing: [
    { skill: "Advanced SQL", priority: "High", demand: 78, weeks: 2 },
    { skill: "AWS Fundamentals", priority: "High", demand: 71, weeks: 3 },
    { skill: "Kubernetes", priority: "Medium", demand: 54, weeks: 4 },
    { skill: "Kafka", priority: "Medium", demand: 46, weeks: 3 },
    { skill: "System Design", priority: "High", demand: 66, weeks: 6 },
  ],
  readiness: 68,
};

export const roadmap = [
  {
    week: "Week 1",
    title: "Learn SQL",
    detail: "Joins, window functions, indexing and query plans. Solve 40 problems on StrataScratch.",
    progress: 100,
    resources: ["Mode SQL Tutorial", "Use The Index, Luke"],
  },
  {
    week: "Week 2",
    title: "Learn REST APIs",
    detail: "Design resources, status codes, pagination, auth and versioning. Build a FastAPI service.",
    progress: 72,
    resources: ["FastAPI docs", "REST API Design Rulebook"],
  },
  {
    week: "Week 3",
    title: "Build CRUD Project",
    detail: "Ship a full CRUD app with auth, tests and Postgres. Write a README with architecture notes.",
    progress: 25,
    resources: ["Postgres tutorial", "Pytest crash course"],
  },
  {
    week: "Week 4",
    title: "Deploy on Cloud",
    detail: "Containerise, push to a registry, deploy on AWS ECS with CI/CD and basic monitoring.",
    progress: 0,
    resources: ["AWS ECS workshop", "GitHub Actions docs"],
  },
];

export type Candidate = {
  id: string;
  name: string;
  role: string;
  match: number;
  resumeScore: number;
  experience: string;
  location: string;
  skills: string[];
  missing: string[];
  status: "Shortlisted" | "In review" | "New" | "Interview";
  initials: string;
  relevantProjects: { name: string; detail: string }[];
  relevantExperience: { role: string; org: string; period: string; detail: string }[];
  otherSections: { title: string; items: string[] }[];
  summary: string;
};

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Aarav Sharma",
    role: "Backend Engineer",
    match: 94,
    resumeScore: 82,
    experience: "1.5 yrs + internships",
    location: "Bengaluru",
    skills: ["Python", "PostgreSQL", "Docker", "REST APIs", "Redis"],
    missing: ["Kafka"],
    status: "Shortlisted",
    initials: "AS",
    summary:
      "Backend-leaning full stack engineer with production Python experience and strong API design fundamentals.",
    relevantProjects: [
      {
        name: "SmartMed — Appointment Platform",
        detail: "Flask + PostgreSQL API serving 12k monthly bookings, 99.9% uptime on Docker.",
      },
      {
        name: "Rate-limited Payments Sandbox",
        detail: "Idempotent REST endpoints with Redis token buckets and full pytest coverage.",
      },
    ],
    relevantExperience: [
      {
        role: "Backend Intern",
        org: "Razorpay",
        period: "May 2025 – Nov 2025",
        detail: "Built reconciliation jobs processing 2M rows/day; cut runtime 38%.",
      },
      {
        role: "Software Engineer (Part-time)",
        org: "Kudos Labs",
        period: "Dec 2025 – present",
        detail: "Owns the billing service: Python, PostgreSQL, Docker, GitHub Actions.",
      },
    ],
    otherSections: [
      { title: "Extracurricular", items: ["College football team captain", "Hackathon volunteer"] },
      { title: "Interests", items: ["Chess", "Cycling", "Photography"] },
    ],
  },
  {
    id: "c2",
    name: "Priya Nair",
    role: "Full Stack Developer",
    match: 91,
    resumeScore: 88,
    experience: "2 yrs",
    location: "Kochi",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    missing: ["Docker"],
    status: "Interview",
    initials: "PN",
    summary: "Product-minded full stack developer with design-system and GraphQL depth.",
    relevantProjects: [
      { name: "Design System @ Scale", detail: "48 components, adopted by 6 product teams." },
      { name: "Realtime Dashboards", detail: "GraphQL subscriptions with optimistic UI updates." },
    ],
    relevantExperience: [
      {
        role: "Frontend Engineer",
        org: "Freshworks",
        period: "2024 – present",
        detail: "Reduced bundle size 34% and improved LCP from 3.4s to 1.6s.",
      },
    ],
    otherSections: [{ title: "Interests", items: ["Illustration", "Trail running"] }],
  },
  {
    id: "c3",
    name: "Rohit Verma",
    role: "Data Engineer",
    match: 84,
    resumeScore: 76,
    experience: "1 yr",
    location: "Hyderabad",
    skills: ["SQL", "Python", "Airflow", "Spark"],
    missing: ["dbt", "Snowflake"],
    status: "In review",
    initials: "RV",
    summary: "Data engineer focused on batch pipelines and warehouse modelling.",
    relevantProjects: [
      { name: "Retail ETL", detail: "Airflow DAGs ingesting 60 sources into Postgres warehouse." },
    ],
    relevantExperience: [
      {
        role: "Data Engineering Intern",
        org: "Swiggy",
        period: "2025",
        detail: "Built Spark job cutting nightly aggregation from 90 to 22 minutes.",
      },
    ],
    otherSections: [{ title: "Interests", items: ["Cricket statistics", "Cooking"] }],
  },
  {
    id: "c4",
    name: "Sneha Iyer",
    role: "ML Engineer",
    match: 78,
    resumeScore: 81,
    experience: "1.5 yrs",
    location: "Remote",
    skills: ["Python", "PyTorch", "Pandas", "MLflow"],
    missing: ["Kubernetes", "Ranking systems"],
    status: "New",
    initials: "SI",
    summary: "Applied ML engineer with NLP and recommendation experience.",
    relevantProjects: [
      { name: "ResumeRank", detail: "Sentence-transformer ranker with 0.81 NDCG@10." },
    ],
    relevantExperience: [
      {
        role: "ML Intern",
        org: "Sarvam AI",
        period: "2025",
        detail: "Fine-tuned multilingual embeddings for search relevance.",
      },
    ],
    otherSections: [{ title: "Interests", items: ["Kathak", "Open-source"] }],
  },
  {
    id: "c5",
    name: "Karan Mehta",
    role: "Platform Engineer",
    match: 71,
    resumeScore: 69,
    experience: "3 yrs",
    location: "Pune",
    skills: ["Docker", "Linux", "CI/CD", "Bash"],
    missing: ["Kubernetes", "Go", "Terraform"],
    status: "New",
    initials: "KM",
    summary: "Infrastructure generalist with strong CI/CD and Linux troubleshooting skills.",
    relevantProjects: [
      { name: "Build Cache Service", detail: "Cut average CI time from 14 to 6 minutes." },
    ],
    relevantExperience: [
      {
        role: "DevOps Engineer",
        org: "Tata Elxsi",
        period: "2023 – present",
        detail: "Maintains 40+ pipelines and container build tooling.",
      },
    ],
    otherSections: [{ title: "Interests", items: ["Motorcycles", "Home labs"] }],
  },
];

export const employerJobs = [
  { id: "ej1", title: "Backend Engineer", applicants: 128, shortlisted: 14, status: "Active", posted: "Jul 28, 2026" },
  { id: "ej2", title: "Frontend Engineer", applicants: 96, shortlisted: 9, status: "Active", posted: "Jul 30, 2026" },
  { id: "ej3", title: "Data Analyst Intern", applicants: 214, shortlisted: 22, status: "Active", posted: "Aug 1, 2026" },
  { id: "ej4", title: "SRE II", applicants: 41, shortlisted: 3, status: "Paused", posted: "Jun 19, 2026" },
  { id: "ej5", title: "Product Designer", applicants: 73, shortlisted: 6, status: "Closed", posted: "May 12, 2026" },
];

export const applicantFunnel = [
  { stage: "Applied", count: 552 },
  { stage: "Screened", count: 288 },
  { stage: "Shortlisted", count: 54 },
  { stage: "Interviewed", count: 21 },
  { stage: "Offered", count: 6 },
];

export const users = [
  { id: "u1", name: "Aarav Sharma", email: "aarav@example.com", role: "Candidate", status: "Active", joined: "Feb 2, 2026", flags: 0 },
  { id: "u2", name: "Priya Nair", email: "priya@example.com", role: "Candidate", status: "Active", joined: "Mar 14, 2026", flags: 0 },
  { id: "u3", name: "Stripe India", email: "talent@stripe.com", role: "Employer", status: "Verified", joined: "Jan 8, 2026", flags: 0 },
  { id: "u4", name: "Quick Hire Co", email: "hr@quickhire.biz", role: "Employer", status: "Pending", joined: "Aug 1, 2026", flags: 3 },
  { id: "u5", name: "Rohit Verma", email: "rohit@example.com", role: "Candidate", status: "Suspended", joined: "Apr 22, 2026", flags: 5 },
  { id: "u6", name: "Notion Labs", email: "careers@notion.so", role: "Employer", status: "Verified", joined: "Dec 3, 2025", flags: 0 },
  { id: "u7", name: "Sneha Iyer", email: "sneha@example.com", role: "Candidate", status: "Active", joined: "Jun 9, 2026", flags: 1 },
  { id: "u8", name: "Admin — Meera", email: "meera@skillmatch.ai", role: "Admin", status: "Active", joined: "Nov 1, 2025", flags: 0 },
];

export const employerVerifications = [
  { id: "ev1", company: "Quick Hire Co", gst: "27AAECQ1234F1Z5", domain: "quickhire.biz", submitted: "Aug 1, 2026", risk: "High" },
  { id: "ev2", company: "Northwind Tech", gst: "29AABCN9876K1Z2", domain: "northwind.tech", submitted: "Jul 29, 2026", risk: "Low" },
  { id: "ev3", company: "Orbit Analytics", gst: "07AAGCO4567P1Z9", domain: "orbitanalytics.io", submitted: "Jul 25, 2026", risk: "Medium" },
];

export const candidateVerifications = [
  { id: "cv1", name: "Rohit Verma", document: "Degree certificate", submitted: "Aug 2, 2026", confidence: 46 },
  { id: "cv2", name: "Ishita Roy", document: "Internship letter", submitted: "Jul 31, 2026", confidence: 91 },
  { id: "cv3", name: "Dev Patel", document: "Government ID", submitted: "Jul 30, 2026", confidence: 78 },
];

export const reports = [
  { id: "r1", target: "Quick Hire Co", type: "Fake job posting", reporter: "aarav@example.com", severity: "Critical", date: "Aug 3, 2026" },
  { id: "r2", target: "Rohit Verma", type: "Plagiarised resume", reporter: "talent@stripe.com", severity: "High", date: "Aug 2, 2026" },
  { id: "r3", target: "Bright Future Jobs", type: "Payment request", reporter: "sneha@example.com", severity: "Critical", date: "Jul 30, 2026" },
  { id: "r4", target: "Dev Patel", type: "Spam applications", reporter: "hr@notion.so", severity: "Low", date: "Jul 28, 2026" },
];

export const platformGrowth = [
  { month: "Mar", candidates: 1200, employers: 84 },
  { month: "Apr", candidates: 1860, employers: 112 },
  { month: "May", candidates: 2540, employers: 148 },
  { month: "Jun", candidates: 3410, employers: 191 },
  { month: "Jul", candidates: 4620, employers: 238 },
  { month: "Aug", candidates: 5890, employers: 284 },
];

export const topSkillsDemand = [
  { skill: "Python", count: 412 },
  { skill: "React", count: 388 },
  { skill: "SQL", count: 356 },
  { skill: "AWS", count: 291 },
  { skill: "Docker", count: 247 },
  { skill: "Kubernetes", count: 168 },
];

export const testimonials = [
  {
    name: "Ananya Gupta",
    role: "SDE-1 at Atlassian",
    quote:
      "The skill gap report told me exactly what to learn. Four weeks later I cleared three backend interviews.",
    initials: "AG",
  },
  {
    name: "Vikram Rao",
    role: "Talent Lead, Northwind Tech",
    quote:
      "The AI organized resume view is the feature we didn't know we needed. Screening time dropped by 60%.",
    initials: "VR",
  },
  {
    name: "Meera Krishnan",
    role: "Final year, NIT Trichy",
    quote:
      "It matched me with internships I'd never have found, and the roadmap kept me honest every week.",
    initials: "MK",
  },
];
