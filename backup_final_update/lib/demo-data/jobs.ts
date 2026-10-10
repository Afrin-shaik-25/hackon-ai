import { JobPosting, CandidateApplication } from "@/types";

export const DEMO_JOBS: JobPosting[] = [
  {
    id: "job-001",
    companyId: "comp-01",
    companyName: "NexaTech Systems",
    title: "Junior Full-Stack Engineer (React & TypeScript)",
    type: "Full-time",
    location: "Bengaluru, Karnataka (Hybrid)",
    remote: false,
    salary: "₹7.5 - ₹10.5 LPA",
    deadline: "2026-11-15",
    requiredSkills: ["React", "TypeScript", "Node.js", "SQL", "Git"],
    preferredSkills: ["Next.js", "Docker", "Tailwind CSS"],
    experience: "0 - 1 Years (Entry Level / Freshers)",
    description: "Build robust SaaS frontend features, develop REST/GraphQL microservices, and collaborate with product engineering teams.",
    openings: 3,
    status: "Active",
    createdAt: "2026-10-01",
    applicationsCount: 28
  },
  {
    id: "job-002",
    companyId: "comp-02",
    companyName: "CloudMatrix AI Labs",
    title: "Associate Data Scientist & ML Intern",
    type: "Internship",
    location: "Hyderabad, Telangana (Remote)",
    remote: true,
    salary: "₹35,000 / month Stipend",
    deadline: "2026-10-31",
    requiredSkills: ["Python", "Machine Learning", "Pandas", "Scikit-Learn"],
    preferredSkills: ["PyTorch", "FastAPI", "SQL"],
    experience: "Pre-final / Final Year Students",
    description: "Train exploratory data pipelines, fine-tune tabular models, and evaluate inference metrics for enterprise clients.",
    openings: 2,
    status: "Active",
    createdAt: "2026-10-03",
    applicationsCount: 42
  },
  {
    id: "job-003",
    companyId: "comp-03",
    companyName: "FinPulse Global Analytics",
    title: "Software Development Engineer - Backend",
    type: "Full-time",
    location: "Pune, Maharashtra",
    remote: false,
    salary: "₹9.0 - ₹12.0 LPA",
    deadline: "2026-11-20",
    requiredSkills: ["Go", "Distributed Systems", "PostgreSQL", "Kafka"],
    preferredSkills: ["Kubernetes", "Redis", "gRPC"],
    experience: "0 - 2 Years",
    description: "Design fault-tolerant event processing pipelines, optimize low-latency transaction queues, and author system specifications.",
    openings: 2,
    status: "Active",
    createdAt: "2026-10-04",
    applicationsCount: 19
  }
];

export const DEMO_CANDIDATE_APPLICATIONS: CandidateApplication[] = [
  {
    id: "app-001",
    jobId: "job-001",
    jobTitle: "Junior Full-Stack Engineer (React & TypeScript)",
    candidateId: "std-001",
    candidateName: "Aarav Sharma",
    candidateEmail: "aarav.sharma@apex.edu",
    appliedDate: "2026-10-02",
    status: "Shortlisted",
    matchScore: 92,
    matchedSkills: ["React", "TypeScript", "Node.js", "SQL", "Git", "Docker"],
    missingSkills: [],
    recruiterNotes: "Excellent portfolio with verified GitHub repos. High aptitude score. Schedule Technical Screen Round 1.",
    portfolioUrl: "https://github.com/aarav/distributed-queue",
    interviewDate: "2026-10-18 03:00 PM"
  },
  {
    id: "app-002",
    jobId: "job-001",
    jobTitle: "Junior Full-Stack Engineer (React & TypeScript)",
    candidateId: "std-005",
    candidateName: "Devansh Kulkarni",
    candidateEmail: "devansh.k@apex.edu",
    appliedDate: "2026-10-04",
    status: "Applied",
    matchScore: 84,
    matchedSkills: ["React", "Node.js", "SQL", "Git"],
    missingSkills: ["TypeScript (Intermediate)"],
    recruiterNotes: "Impressive IoT controller hackathon winner project. Review code samples.",
    portfolioUrl: "https://github.com/devansh-k"
  },
  {
    id: "app-003",
    jobId: "job-002",
    jobTitle: "Associate Data Scientist & ML Intern",
    candidateId: "std-008",
    candidateName: "Zoya Akhtar",
    candidateEmail: "zoya.a@apex.edu",
    appliedDate: "2026-10-05",
    status: "Interview",
    matchScore: 96,
    matchedSkills: ["Python", "Machine Learning", "Pandas", "Scikit-Learn", "PyTorch", "FastAPI"],
    missingSkills: [],
    recruiterNotes: "Research publication candidate. Exceptional mathematical rigor. Round 1 coding passed.",
    interviewDate: "2026-10-14 11:30 AM"
  },
  {
    id: "app-004",
    jobId: "job-003",
    jobTitle: "Software Development Engineer - Backend",
    candidateId: "std-001",
    candidateName: "Aarav Sharma",
    candidateEmail: "aarav.sharma@apex.edu",
    appliedDate: "2026-10-05",
    status: "Applied",
    matchScore: 88,
    matchedSkills: ["Go", "PostgreSQL", "Redis", "gRPC"],
    missingSkills: ["Kafka"],
    recruiterNotes: "Has built distributed queue in Go. Great match for backend team."
  }
];

export const DEMO_COMPANY_PROFILE = {
  id: "comp-01",
  name: "NexaTech Systems",
  industry: "Enterprise Cloud & EdTech",
  website: "https://nexatech-systems.example.com",
  description: "Building next-generation workflow automation and high-scale analytics engines for educational institutions and tech enterprises.",
  recruiterName: "Vikram Malhotra",
  recruiterEmail: "recruitment@nexatech.example.com",
  verificationStatus: "Verified" as const,
  verifiedDate: "2026-08-15",
  activeJobsCount: 4,
  totalApplicantsCount: 89
};
