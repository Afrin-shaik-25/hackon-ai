import { Student } from "@/types";

export const DEMO_STUDENTS: Student[] = [
  {
    id: "std-001",
    studentId: "2023CS101",
    name: "Arav Sharma",
    email: "arav.sharma@apex.edu",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    department: "Computer Science",
    studentType: "Undergraduate",
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    year: 3,
    semester: 5,
    section: "A",
    successScore: 89,
    previousScore: 86,
    trend: "up",
    scoreBreakdown: {
      academic: { rawScore: 88, weight: 0.30, weightedScore: 26.4, status: "complete", description: "Consistent A-grade across Theory & Practicals" },
      attendance: { rawScore: 92, weight: 0.20, weightedScore: 18.4, status: "complete", description: "92% overall attendance (well above 75% minimum)" },
      assessment: { rawScore: 85, weight: 0.20, weightedScore: 17.0, status: "complete", description: "Scored 42/50 on Mid-term Algorithm Challenge" },
      lmsEngagement: { rawScore: 90, weight: 0.15, weightedScore: 13.5, status: "complete", description: "Regular video lectures watched and quiz submissions" },
      skillsProjects: { rawScore: 91, weight: 0.15, weightedScore: 13.65, status: "complete", description: "2 verified GitHub repositories and deployed capstone" },
    },
    riskLevel: "low",
    reviewStatus: "good_standing",
    riskIndicators: [],
    dataCompleteness: { percent: 100, missingSources: [], lastUpdated: "Today, 09:30 AM" },
    attendancePercentage: 92,
    subjects: [
      { code: "CS501", name: "Design & Analysis of Algorithms", internal: 27, external: 63, total: 90, max: 100, grade: "A+", attendance: 94, credits: 4, semester: 5 },
      { code: "CS502", name: "Database Management Systems", internal: 26, external: 60, total: 86, max: 100, grade: "A", attendance: 90, credits: 4, semester: 5 },
      { code: "CS503", name: "Operating Systems", internal: 28, external: 61, total: 89, max: 100, grade: "A+", attendance: 92, credits: 4, semester: 5 },
      { code: "CS504", name: "Computer Networks", internal: 25, external: 58, total: 83, max: 100, grade: "A", attendance: 89, credits: 3, semester: 5 },
      { code: "CS505", name: "Artificial Intelligence Foundations", internal: 29, external: 65, total: 94, max: 100, grade: "O", attendance: 96, credits: 4, semester: 5 }
    ],
    attendanceRecords: [
      { id: "att-1", date: "2026-10-08", subject: "Design & Analysis of Algorithms", status: "Present", topic: "Dynamic Programming: Knapsack" },
      { id: "att-2", date: "2026-10-08", subject: "Database Management Systems", status: "Present", topic: "B+ Tree Indexing" },
      { id: "att-3", date: "2026-10-07", subject: "Operating Systems", status: "Present", topic: "Virtual Memory Paging" },
      { id: "att-4", date: "2026-10-06", subject: "Computer Networks", status: "Present", topic: "TCP Congestion Control" },
      { id: "att-5", date: "2026-10-05", subject: "Artificial Intelligence Foundations", status: "Present", topic: "A* Search Heuristics" }
    ],
    assessments: [
      { id: "as-1", title: "Algorithms Mid-Term Exam", category: "MCQ", subject: "CS501", score: 45, maxScore: 50, date: "2026-09-28", status: "Completed", feedback: "Excellent graph traversal logic." },
      { id: "as-2", title: "SQL & Query Optimization Lab Test", category: "Coding", subject: "CS502", score: 48, maxScore: 50, date: "2026-10-02", status: "Completed", feedback: "Clean schema and optimal joins." },
      { id: "as-3", title: "OS Kernel Threads Quiz", category: "Assignment", subject: "CS503", score: 19, maxScore: 20, date: "2026-10-05", status: "Completed" }
    ],
    projects: [
      { id: "proj-1", title: "Distributed Task Scheduler", description: "High-throughput asynchronous task worker queue using Go and Redis.", tech: ["Go", "Redis", "Docker", "gRPC"], verified: true, verifiedBy: "Dr. K. Raman", githubUrl: "https://github.com/aarav/distributed-queue", date: "Sep 2026" },
      { id: "proj-2", title: "StudyLens Visualizer Extension", description: "Browser tool for visualizing active study blocks and note-taking bookmarks.", tech: ["TypeScript", "React", "Chrome Extension"], verified: true, verifiedBy: "Prof. S. Iyer", githubUrl: "https://github.com/aarav/studylens-ext", date: "Aug 2026" }
    ],
    tasks: [
      { id: "tsk-1", title: "Prepare Seminar on Distributed Consensus", dueDate: "2026-10-15", priority: "high", category: "Academic", completed: false },
      { id: "tsk-2", title: "Submit DBMS Project Phase 2 Report", dueDate: "2026-10-18", priority: "medium", category: "Project", completed: false },
      { id: "tsk-3", title: "Complete LeetCode Biweekly Contest", dueDate: "2026-10-11", priority: "medium", category: "Career", completed: true }
    ],
    exams: [
      { id: "ex-1", subject: "Design & Analysis of Algorithms", code: "CS501", date: "2026-11-12", time: "09:30 AM", venue: "Hall A-102", type: "End-Semester" },
      { id: "ex-2", subject: "Database Management Systems", code: "CS502", date: "2026-11-16", time: "09:30 AM", venue: "Hall A-104", type: "End-Semester" },
      { id: "ex-3", subject: "Operating Systems", code: "CS503", date: "2026-11-20", time: "02:00 PM", venue: "Hall B-201", type: "End-Semester" }
    ],
    activities: [
      { id: "act-1", title: "HacXLerate 2026 Hackathon", category: "Hackathon", date: "2026-10-24", role: "Team Lead", status: "Registered", organization: "State Innovation Council" },
      { id: "act-2", title: "IEEE Computer Society Workshop", category: "Workshop", date: "2026-09-15", role: "Attendee", status: "Completed", organization: "IEEE Student Branch" }
    ]
  },
  {
    id: "std-002",
    studentId: "2023CS109",
    name: "Priya Patel",
    email: "priya.patel@apex.edu",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    department: "Computer Science",
    year: 3,
    semester: 5,
    section: "A",
    successScore: 56,
    previousScore: 68,
    trend: "down",
    scoreBreakdown: {
      academic: { rawScore: 61, weight: 0.30, weightedScore: 18.3, status: "complete", description: "Midterm average fell below 65%; OS score at 52%" },
      attendance: { rawScore: 62, weight: 0.20, weightedScore: 12.4, status: "complete", description: "62% overall attendance — below the mandatory 75% bar" },
      assessment: { rawScore: 54, weight: 0.20, weightedScore: 10.8, status: "complete", description: "Missed 1 lab assessment and scored 24/50 on MCQ" },
      lmsEngagement: { rawScore: 50, weight: 0.15, weightedScore: 7.5, status: "complete", description: "No portal logins in past 10 days" },
      skillsProjects: { rawScore: 47, weight: 0.15, weightedScore: 7.05, status: "complete", description: "No approved project submissions for current semester" }
    },
    riskLevel: "high",
    reviewStatus: "needs_review",
    riskIndicators: [
      { id: "ri-1", category: "Attendance", reason: "Attendance dropped to 62% in last 3 weeks", metric: "62% (Threshold: 75%)", severity: "critical", period: "Sep 15 - Oct 08", actionSuggestion: "Schedule academic advising to check for personal or health constraints" },
      { id: "ri-2", category: "Academic", reason: "Operating Systems mid-term score decreased by 22%", metric: "52/100 (Prior: 74)", severity: "warning", period: "Mid-Term 1", actionSuggestion: "Recommend remedial lab sessions with peer tutor" },
      { id: "ri-3", category: "Engagement", reason: "Zero LMS activity detected during active assignment week", metric: "0 hrs (Avg: 6.4 hrs)", severity: "warning", period: "Past 10 Days", actionSuggestion: "Trigger counselor check-in notification" }
    ],
    dataCompleteness: { percent: 100, missingSources: [], lastUpdated: "Today, 10:15 AM" },
    attendancePercentage: 62,
    subjects: [
      { code: "CS501", name: "Design & Analysis of Algorithms", internal: 19, external: 48, total: 67, max: 100, grade: "B", attendance: 65, credits: 4, semester: 5 },
      { code: "CS502", name: "Database Management Systems", internal: 21, external: 51, total: 72, max: 100, grade: "B+", attendance: 68, credits: 4, semester: 5 },
      { code: "CS503", name: "Operating Systems", internal: 15, external: 37, total: 52, max: 100, grade: "C", attendance: 58, credits: 4, semester: 5 },
      { code: "CS504", name: "Computer Networks", internal: 18, external: 42, total: 60, max: 100, grade: "B", attendance: 60, credits: 3, semester: 5 },
      { code: "CS505", name: "Artificial Intelligence Foundations", internal: 19, external: 45, total: 64, max: 100, grade: "B", attendance: 61, credits: 4, semester: 5 }
    ],
    attendanceRecords: [
      { id: "att-6", date: "2026-10-08", subject: "Design & Analysis of Algorithms", status: "Absent", topic: "Dynamic Programming" },
      { id: "att-7", date: "2026-10-08", subject: "Database Management Systems", status: "Late", topic: "B+ Tree Indexing" },
      { id: "att-8", date: "2026-10-07", subject: "Operating Systems", status: "Absent", topic: "Virtual Memory Paging" },
      { id: "att-9", date: "2026-10-06", subject: "Computer Networks", status: "Absent", topic: "TCP Congestion Control" }
    ],
    assessments: [
      { id: "as-4", title: "Algorithms Mid-Term Exam", category: "MCQ", subject: "CS501", score: 28, maxScore: 50, date: "2026-09-28", status: "Completed", feedback: "Needs review in divide-and-conquer recurrences." },
      { id: "as-5", title: "SQL Lab Assignment", category: "Coding", subject: "CS502", score: 26, maxScore: 50, date: "2026-10-02", status: "Completed", feedback: "Incomplete index constraints." }
    ],
    projects: [
      { id: "proj-3", title: "Campus Food Delivery App", description: "Android app concept for hostel cafeteria orders.", tech: ["Flutter", "Firebase"], verified: false, date: "May 2026", feedback: "Awaiting faculty code verification." }
    ],
    tasks: [
      { id: "tsk-4", title: "Submit Doctor's Medical Certificate for Leave", dueDate: "2026-10-12", priority: "high", category: "Academic", completed: false },
      { id: "tsk-5", title: "Complete OS Remedial Worksheet #2", dueDate: "2026-10-14", priority: "high", category: "Academic", completed: false }
    ],
    exams: [
      { id: "ex-4", subject: "Operating Systems Remedial", code: "CS503", date: "2026-10-25", time: "02:00 PM", venue: "Lab 3", type: "Practical" }
    ],
    activities: []
  },
  {
    id: "std-003",
    studentId: "2023DS204",
    name: "Rohan Gupta",
    email: "rohan.gupta@apex.edu",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    department: "Data Science",
    year: 3,
    semester: 5,
    section: "B",
    successScore: 64,
    previousScore: 65,
    trend: "stable",
    scoreBreakdown: {
      academic: { rawScore: 78, weight: 0.30, weightedScore: 23.4, status: "complete", description: "Good foundational grades in Statistics and Linear Algebra" },
      attendance: { rawScore: 82, weight: 0.20, weightedScore: 16.4, status: "complete", description: "82% attendance, consistent in lectures" },
      assessment: { rawScore: 71, weight: 0.20, weightedScore: 14.2, status: "complete", description: "Average performance in weekly quizzes" },
      lmsEngagement: { rawScore: 0, weight: 0.15, weightedScore: 0, status: "missing", description: "Canvas LMS sync pending; provisional zero adjustment" },
      skillsProjects: { rawScore: 68, weight: 0.15, weightedScore: 10.2, status: "complete", description: "1 unverified GitHub repository in Python Data Science" }
    },
    riskLevel: "incomplete_data",
    reviewStatus: "needs_review",
    riskIndicators: [
      { id: "ri-4", category: "Data Completeness", reason: "LMS Engagement data source has not been uploaded for Fall 2026", metric: "0% Coverage (LMS)", severity: "info", period: "Semester 5", actionSuggestion: "Upload latest Canvas/Moodle CSV import to compute accurate score" }
    ],
    dataCompleteness: { percent: 80, missingSources: ["LMS Engagement Records"], lastUpdated: "Yesterday, 04:12 PM" },
    attendancePercentage: 82,
    subjects: [
      { code: "DS501", name: "Machine Learning Principles", internal: 24, external: 55, total: 79, max: 100, grade: "A", attendance: 85, credits: 4, semester: 5 },
      { code: "DS502", name: "Data Engineering with PySpark", internal: 23, external: 52, total: 75, max: 100, grade: "B+", attendance: 80, credits: 4, semester: 5 },
      { code: "DS503", name: "Applied Multivariate Statistics", internal: 26, external: 56, total: 82, max: 100, grade: "A", attendance: 82, credits: 3, semester: 5 }
    ],
    attendanceRecords: [
      { id: "att-10", date: "2026-10-08", subject: "Machine Learning Principles", status: "Present", topic: "Gradient Descent Optimization" }
    ],
    assessments: [
      { id: "as-6", title: "ML Scikit-Learn Pipeline Quiz", category: "MCQ", subject: "DS501", score: 36, maxScore: 50, date: "2026-10-01", status: "Completed" }
    ],
    projects: [
      { id: "proj-4", title: "Housing Price Predictor API", description: "FastAPI endpoint with regression model and Dockerfile.", tech: ["Python", "FastAPI", "Scikit-Learn"], verified: false, date: "Aug 2026" }
    ],
    tasks: [
      { id: "tsk-6", title: "Sync Canvas LMS login credentials", dueDate: "2026-10-14", priority: "medium", category: "Academic", completed: false }
    ],
    exams: [
      { id: "ex-5", subject: "Machine Learning Principles", code: "DS501", date: "2026-11-14", time: "09:30 AM", venue: "Hall C-101", type: "End-Semester" }
    ],
    activities: []
  },
  {
    id: "std-004",
    studentId: "2023CS115",
    name: "Ananya Verma",
    email: "ananya.verma@apex.edu",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    department: "Computer Science",
    year: 3,
    semester: 5,
    section: "A",
    successScore: 52,
    previousScore: 54,
    trend: "down",
    scoreBreakdown: {
      academic: { rawScore: 55, weight: 0.30, weightedScore: 16.5, status: "complete", description: "Failed Mid-term 1 in Data Structures and DBMS" },
      attendance: { rawScore: 58, weight: 0.20, weightedScore: 11.6, status: "complete", description: "Attendance 58%, repeated morning absences" },
      assessment: { rawScore: 48, weight: 0.20, weightedScore: 9.6, status: "complete", description: "Aptitude and reasoning practice scores lagging" },
      lmsEngagement: { rawScore: 44, weight: 0.15, weightedScore: 6.6, status: "complete", description: "Minimal resource downloads" },
      skillsProjects: { rawScore: 51, weight: 0.15, weightedScore: 7.65, status: "complete", description: "Draft repository with no commits in 45 days" }
    },
    riskLevel: "high",
    reviewStatus: "under_intervention",
    riskIndicators: [
      { id: "ri-5", category: "Academic", reason: "Scored <40% on Midterm assessment in DBMS", metric: "19/50", severity: "critical", period: "Sep 2026", actionSuggestion: "Follow up on scheduled weekly tutoring with Prof. Verma" },
      { id: "ri-6", category: "Attendance", reason: "Consecutive absences on Mondays and Fridays", metric: "58% Overall", severity: "critical", period: "Past 4 Weeks", actionSuggestion: "Parent-faculty notification dispatched" }
    ],
    dataCompleteness: { percent: 100, missingSources: [], lastUpdated: "Today, 08:45 AM" },
    attendancePercentage: 58,
    subjects: [
      { code: "CS501", name: "Design & Analysis of Algorithms", internal: 16, external: 39, total: 55, max: 100, grade: "C", attendance: 58, credits: 4, semester: 5 },
      { code: "CS502", name: "Database Management Systems", internal: 14, external: 35, total: 49, max: 100, grade: "D", attendance: 56, credits: 4, semester: 5 }
    ],
    attendanceRecords: [
      { id: "att-11", date: "2026-10-07", subject: "Database Management Systems", status: "Absent", topic: "Normalization" }
    ],
    assessments: [
      { id: "as-7", title: "DBMS Mid-Term Test", category: "MCQ", subject: "CS502", score: 19, maxScore: 50, date: "2026-09-25", status: "Completed" }
    ],
    projects: [],
    tasks: [
      { id: "tsk-7", title: "Attend remedial tutorial with Faculty Mentor", dueDate: "2026-10-12", priority: "high", category: "Academic", completed: false }
    ],
    exams: [
      { id: "ex-6", subject: "Database Management Systems Improvement", code: "CS502", date: "2026-10-30", time: "11:00 AM", venue: "Tutorial Room 2", type: "Practical" }
    ],
    activities: []
  },
  {
    id: "std-005",
    studentId: "2023CS128",
    name: "Devansh Kulkarni",
    email: "devansh.k@apex.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    department: "Computer Science",
    year: 3,
    semester: 5,
    section: "B",
    successScore: 78,
    previousScore: 75,
    trend: "up",
    scoreBreakdown: {
      academic: { rawScore: 74, weight: 0.30, weightedScore: 22.2, status: "complete", description: "Solid B+/A grades across core systems subjects" },
      attendance: { rawScore: 81, weight: 0.20, weightedScore: 16.2, status: "complete", description: "81% attendance, solid consistency" },
      assessment: { rawScore: 75, weight: 0.20, weightedScore: 15.0, status: "complete", description: "Strong coding scores (44/50), moderate MCQ scores" },
      lmsEngagement: { rawScore: 72, weight: 0.15, weightedScore: 10.8, status: "complete", description: "Regular resource viewing" },
      skillsProjects: { rawScore: 94, weight: 0.15, weightedScore: 14.1, status: "complete", description: "Winner of State Hackathon; verified full-stack project" }
    },
    riskLevel: "low",
    reviewStatus: "good_standing",
    riskIndicators: [],
    dataCompleteness: { percent: 100, missingSources: [], lastUpdated: "Today, 11:20 AM" },
    attendancePercentage: 81,
    subjects: [
      { code: "CS501", name: "Design & Analysis of Algorithms", internal: 23, external: 54, total: 77, max: 100, grade: "B+", attendance: 82, credits: 4, semester: 5 },
      { code: "CS502", name: "Database Management Systems", internal: 24, external: 56, total: 80, max: 100, grade: "A", attendance: 80, credits: 4, semester: 5 }
    ],
    attendanceRecords: [],
    assessments: [],
    projects: [
      { id: "proj-5", title: "Smart City Traffic Signal IoT Controller", description: "Real-time edge compute simulation with MQTT and React telemetry.", tech: ["React", "MQTT", "Python", "Raspberry Pi"], verified: true, verifiedBy: "Prof. S. Iyer", date: "Aug 2026" }
    ],
    tasks: [],
    exams: [],
    activities: [
      { id: "act-3", title: "State Hackathon 2026", category: "Hackathon", date: "2026-08-14", role: "1st Place Winner", status: "Completed", organization: "Govt. Innovation Cell" }
    ]
  },
  {
    id: "std-006",
    studentId: "2023EC104",
    name: "Meera Nambiar",
    email: "meera.n@apex.edu",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    department: "Electronics & Comm",
    year: 3,
    semester: 5,
    section: "A",
    successScore: 82,
    previousScore: 80,
    trend: "up",
    scoreBreakdown: {
      academic: { rawScore: 84, weight: 0.30, weightedScore: 25.2, status: "complete", description: "Top 5% in Embedded Systems and Signals" },
      attendance: { rawScore: 88, weight: 0.20, weightedScore: 17.6, status: "complete", description: "88% consistent attendance" },
      assessment: { rawScore: 80, weight: 0.20, weightedScore: 16.0, status: "complete", description: "High scores on practical labs" },
      lmsEngagement: { rawScore: 78, weight: 0.15, weightedScore: 11.7, status: "complete", description: "Active participant in forums" },
      skillsProjects: { rawScore: 79, weight: 0.15, weightedScore: 11.85, status: "complete", description: "Hardware-in-the-loop firmware project verified" }
    },
    riskLevel: "low",
    reviewStatus: "good_standing",
    riskIndicators: [],
    dataCompleteness: { percent: 100, missingSources: [], lastUpdated: "Today, 09:00 AM" },
    attendancePercentage: 88,
    subjects: [
      { code: "EC501", name: "Embedded Systems Architecture", internal: 27, external: 60, total: 87, max: 100, grade: "A+", attendance: 90, credits: 4, semester: 5 },
      { code: "EC502", name: "Digital Signal Processing", internal: 25, external: 57, total: 82, max: 100, grade: "A", attendance: 86, credits: 4, semester: 5 }
    ],
    attendanceRecords: [],
    assessments: [],
    projects: [
      { id: "proj-6", title: "Automated ECG Signal Filter FPGA", description: "Verilog implementation of FIR bandpass filter for bio-signals.", tech: ["Verilog", "Xilinx Vivado", "MATLAB"], verified: true, verifiedBy: "Dr. P. Hegde", date: "Jul 2026" }
    ],
    tasks: [],
    exams: [],
    activities: []
  },
  {
    id: "std-007",
    studentId: "2023CS132",
    name: "Kabir Sengupta",
    email: "kabir.s@apex.edu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    department: "Computer Science",
    year: 3,
    semester: 5,
    section: "B",
    successScore: 61,
    previousScore: 63,
    trend: "down",
    scoreBreakdown: {
      academic: { rawScore: 66, weight: 0.30, weightedScore: 19.8, status: "complete", description: "Passing marks but struggles in Mathematical foundations" },
      attendance: { rawScore: 71, weight: 0.20, weightedScore: 14.2, status: "complete", description: "71% attendance — borders the warning threshold" },
      assessment: { rawScore: 60, weight: 0.20, weightedScore: 12.0, status: "complete", description: "Average assessment results" },
      lmsEngagement: { rawScore: 54, weight: 0.15, weightedScore: 8.1, status: "complete", description: "Below average LMS login counts" },
      skillsProjects: { rawScore: 52, weight: 0.15, weightedScore: 7.8, status: "complete", description: "No verified portfolio items uploaded" }
    },
    riskLevel: "moderate",
    reviewStatus: "needs_review",
    riskIndicators: [
      { id: "ri-7", category: "Attendance", reason: "Attendance at 71% (below 75% target threshold)", metric: "71%", severity: "warning", period: "Semester 5 to date", actionSuggestion: "Send advisory reminder regarding mandatory minimum attendance" }
    ],
    dataCompleteness: { percent: 100, missingSources: [], lastUpdated: "Yesterday, 06:00 PM" },
    attendancePercentage: 71,
    subjects: [
      { code: "CS501", name: "Design & Analysis of Algorithms", internal: 20, external: 46, total: 66, max: 100, grade: "B", attendance: 70, credits: 4, semester: 5 }
    ],
    attendanceRecords: [],
    assessments: [],
    projects: [],
    tasks: [],
    exams: [],
    activities: []
  },
  {
    id: "std-008",
    studentId: "2023DS210",
    name: "Zoya Akhtar",
    email: "zoya.a@apex.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    department: "Data Science",
    year: 3,
    semester: 5,
    section: "A",
    successScore: 92,
    previousScore: 90,
    trend: "up",
    scoreBreakdown: {
      academic: { rawScore: 94, weight: 0.30, weightedScore: 28.2, status: "complete", description: "Dean's list candidate, 9.4 CGPA" },
      attendance: { rawScore: 96, weight: 0.20, weightedScore: 19.2, status: "complete", description: "96% exemplary attendance" },
      assessment: { rawScore: 91, weight: 0.20, weightedScore: 18.2, status: "complete", description: "Rank 1 in departmental coding challenges" },
      lmsEngagement: { rawScore: 89, weight: 0.15, weightedScore: 13.35, status: "complete", description: "Consistently engages in LMS reading lists" },
      skillsProjects: { rawScore: 90, weight: 0.15, weightedScore: 13.5, status: "complete", description: "Research publication in review + verified ML projects" }
    },
    riskLevel: "low",
    reviewStatus: "good_standing",
    riskIndicators: [],
    dataCompleteness: { percent: 100, missingSources: [], lastUpdated: "Today, 10:45 AM" },
    attendancePercentage: 96,
    subjects: [
      { code: "DS501", name: "Machine Learning Principles", internal: 29, external: 66, total: 95, max: 100, grade: "O", attendance: 98, credits: 4, semester: 5 },
      { code: "DS502", name: "Data Engineering with PySpark", internal: 28, external: 64, total: 92, max: 100, grade: "O", attendance: 95, credits: 4, semester: 5 }
    ],
    attendanceRecords: [],
    assessments: [],
    projects: [
      { id: "proj-7", title: "Federated Learning on Edge Health Sensors", description: "Privacy-preserving machine learning prototype using PySyft.", tech: ["Python", "PyTorch", "PySyft", "Docker"], verified: true, verifiedBy: "Dr. K. Raman", date: "Sep 2026" }
    ],
    tasks: [],
    exams: [],
    activities: [
      { id: "act-4", title: "ACM-W Student Chapter", category: "Club", date: "2026-09-01", role: "Vice Chair", status: "Completed", organization: "ACM Student Branch" }
    ]
  }
];
