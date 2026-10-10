'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth/auth-context';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import {
  BookOpen,
  FileText,
  Video,
  Download,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  Code2,
  ChevronRight,
  ShieldAlert,
  Terminal,
  BookmarkCheck
} from 'lucide-react';

interface ModuleUnit {
  unitNumber: number;
  title: string;
  topics: string[];
  hours: number;
}

interface SubjectDetail {
  code: string;
  name: string;
  semester: number;
  credits: number;
  instructor: string;
  attendance: number;
  progressPercent: number;
  units: ModuleUnit[];
  textbooks: string[];
  notes: { title: string; size: string; type: string }[];
  videoLectures: { title: string; duration: string; platform: string }[];
}

const SEMESTER_SUBJECTS_DATA: Record<number, SubjectDetail[]> = {
  5: [
    {
      code: 'CS501',
      name: 'Design & Analysis of Algorithms',
      semester: 5,
      credits: 4,
      instructor: 'Dr. K. Raman',
      attendance: 94,
      progressPercent: 78,
      units: [
        {
          unitNumber: 1,
          title: 'Asymptotic Analysis & Recurrences',
          topics: ['Big-O, Omega, Theta notations', 'Master Theorem for divide-and-conquer', 'Substitution and recursion-tree methods'],
          hours: 9
        },
        {
          unitNumber: 2,
          title: 'Divide & Conquer and Sorting Algorithms',
          topics: ['Merge Sort and Quick Sort analysis', 'Lower bounds for comparison sorting', 'Order statistics and median finding'],
          hours: 10
        },
        {
          unitNumber: 3,
          title: 'Greedy Strategy & Dynamic Programming',
          topics: ['Activity selection problem', 'Huffman coding', '0/1 Knapsack & Matrix Chain Multiplication', 'Longest Common Subsequence (LCS)'],
          hours: 12
        },
        {
          unitNumber: 4,
          title: 'Graph Algorithms & Shortest Paths',
          topics: ['Breadth-First and Depth-First Search', 'Dijkstra and Bellman-Ford algorithms', 'Floyd-Warshall all-pairs shortest paths', 'Minimum Spanning Trees (Prim & Kruskal)'],
          hours: 11
        },
        {
          unitNumber: 5,
          title: 'Intractability & NP-Completeness',
          topics: ['Classes P, NP, NP-Hard, and NP-Complete', 'Polynomial-time reductions', 'Circuit-SAT, 3-SAT, and Vertex Cover'],
          hours: 8
        }
      ],
      textbooks: [
        'Introduction to Algorithms (4th Ed.) - Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
        'Algorithm Design - Jon Kleinberg, Éva Tardos'
      ],
      notes: [
        { title: 'Unit 1 & 2 Complete Lecture Slides (PDF)', size: '4.8 MB', type: 'Handout' },
        { title: 'Dynamic Programming Formula & State Recurrences', size: '2.1 MB', type: 'Cheat Sheet' },
        { title: 'Graph Traversal & Shortest Path Lab Code Examples', size: '1.4 MB', type: 'Source Code' }
      ],
      videoLectures: [
        { title: 'Lecture 14: Dynamic Programming & Matrix Chain', duration: '54 mins', platform: 'Institutional LMS' },
        { title: 'Lecture 18: Dijkstra Shortest Paths Walkthrough', duration: '48 mins', platform: 'Institutional LMS' }
      ]
    },
    {
      code: 'CS502',
      name: 'Database Management Systems',
      semester: 5,
      credits: 4,
      instructor: 'Prof. S. Iyer',
      attendance: 90,
      progressPercent: 82,
      units: [
        {
          unitNumber: 1,
          title: 'Data Modeling & ER Diagrams',
          topics: ['Entity-Relationship models', 'Extended ER constructs', 'Relational data model mappings'],
          hours: 8
        },
        {
          unitNumber: 2,
          title: 'Relational Algebra & SQL Standards',
          topics: ['Tuple relational calculus', 'Complex joins, subqueries, and window functions', 'Views, triggers, and stored procedures'],
          hours: 11
        },
        {
          unitNumber: 3,
          title: 'Normalization & Schema Refinement',
          topics: ['Functional dependencies', '1NF, 2NF, 3NF, and BCNF decomposition', 'Lossless join & dependency preservation'],
          hours: 10
        },
        {
          unitNumber: 4,
          title: 'Indexing, B+ Trees & Query Optimization',
          topics: ['Primary and secondary indexing', 'B-Trees and B+ Trees insertion/deletion', 'Cost-based query evaluation plans'],
          hours: 12
        },
        {
          unitNumber: 5,
          title: 'Transactions & Concurrency Control',
          topics: ['ACID properties', 'Two-Phase Locking (2PL)', 'Timestamp ordering & Deadlock handling', 'WAL Crash recovery'],
          hours: 9
        }
      ],
      textbooks: [
        'Database System Concepts (7th Ed.) - Silberschatz, Korth, Sudarshan',
        'Fundamentals of Database Systems - Elmasri, Navathe'
      ],
      notes: [
        { title: 'B+ Tree Indexing & Search Walkthrough Notes', size: '3.6 MB', type: 'Handout' },
        { title: 'SQL Practice Queries & Lab Schema Dumps', size: '1.2 MB', type: 'SQL Scripts' },
        { title: 'Normalization Step-by-Step Solved Problems', size: '2.9 MB', type: 'Handout' }
      ],
      videoLectures: [
        { title: 'Session 09: BCNF vs 3NF Decomposition Practice', duration: '51 mins', platform: 'Institutional LMS' },
        { title: 'Session 15: Concurrency Control & 2PL Locks', duration: '46 mins', platform: 'Institutional LMS' }
      ]
    },
    {
      code: 'CS503',
      name: 'Operating Systems',
      semester: 5,
      credits: 4,
      instructor: 'Dr. N. Sharma',
      attendance: 92,
      progressPercent: 74,
      units: [
        {
          unitNumber: 1,
          title: 'OS Structures & Process Concepts',
          topics: ['System calls and kernel architectures', 'Process Control Block (PCB)', 'Context switching and fork()'],
          hours: 8
        },
        {
          unitNumber: 2,
          title: 'CPU Scheduling & Threading',
          topics: ['FCFS, SJF, Round Robin, and Priority scheduling', 'Multi-level feedback queues', 'POSIX threads and kernel threads'],
          hours: 10
        },
        {
          unitNumber: 3,
          title: 'Process Synchronization & Deadlocks',
          topics: ['Critical section problem', 'Semaphores and Mutex locks', 'Peterson solution', "Banker's Algorithm for deadlock avoidance"],
          hours: 12
        },
        {
          unitNumber: 4,
          title: 'Memory Management & Virtual Memory',
          topics: ['Paging and segmentation', 'Page tables and TLB', 'Page replacement algorithms (FIFO, LRU, Optimal)', 'Thrashing prevention'],
          hours: 11
        },
        {
          unitNumber: 5,
          title: 'File Systems & I/O Systems',
          topics: ['File allocation methods (contiguous, linked, indexed)', 'Disk scheduling algorithms (SSTF, SCAN, C-LOOK)', 'RAID architectures'],
          hours: 9
        }
      ],
      textbooks: [
        'Operating System Concepts (10th Ed.) - Silberschatz, Galvin, Gagne',
        'Modern Operating Systems - Andrew S. Tanenbaum, Herbert Bos'
      ],
      notes: [
        { title: 'Virtual Memory Paging & TLB Hit/Miss Calculations', size: '2.7 MB', type: 'Handout' },
        { title: 'Producer-Consumer Synchronization using POSIX Semaphores', size: '1.1 MB', type: 'C Source' },
        { title: "Banker's Algorithm Safe State Worked Out Examples", size: '1.8 MB', type: 'Cheat Sheet' }
      ],
      videoLectures: [
        { title: 'Lecture 12: Virtual Memory & Page Fault Replacement', duration: '58 mins', platform: 'Institutional LMS' }
      ]
    },
    {
      code: 'CS504',
      name: 'Computer Networks',
      semester: 5,
      credits: 3,
      instructor: 'Dr. M. Verma',
      attendance: 89,
      progressPercent: 70,
      units: [
        {
          unitNumber: 1,
          title: 'Network Layering & Physical Layer',
          topics: ['OSI 7-layer and TCP/IP protocol stacks', 'Bandwidth and latency metrics', 'Packet switching vs circuit switching'],
          hours: 7
        },
        {
          unitNumber: 2,
          title: 'Data Link Layer & Error Control',
          topics: ['Framing and error detection (CRC)', 'Sliding window protocols (Go-Back-N, Selective Repeat)', 'Ethernet & CSMA/CD'],
          hours: 9
        },
        {
          unitNumber: 3,
          title: 'Network Layer & IP Routing',
          topics: ['IPv4 and IPv6 addressing and CIDR subnets', 'Routing protocols (Distance Vector, Link State / OSPF)', 'BGP inter-domain routing'],
          hours: 11
        },
        {
          unitNumber: 4,
          title: 'Transport Layer Protocols',
          topics: ['UDP datagrams vs TCP byte streams', 'TCP 3-way handshake and termination', 'TCP congestion control (Slow Start, AIMD)'],
          hours: 10
        },
        {
          unitNumber: 5,
          title: 'Application Layer Services',
          topics: ['DNS resolution hierarchy', 'HTTP/1.1 vs HTTP/2 and HTTP/3', 'TLS/SSL cryptography handshake basics'],
          hours: 8
        }
      ],
      textbooks: [
        'Computer Networking: A Top-Down Approach (8th Ed.) - Kurose, Ross',
        'Computer Networks - Andrew S. Tanenbaum, David J. Wetherall'
      ],
      notes: [
        { title: 'Subnetting & CIDR Network Masking Quick Guide', size: '1.9 MB', type: 'Cheat Sheet' },
        { title: 'Wireshark Packet Trace Lab Analysis (TCP & HTTP)', size: '3.4 MB', type: 'Lab Manual' }
      ],
      videoLectures: [
        { title: 'Lecture 10: TCP Congestion Window & Tahoe vs Reno', duration: '52 mins', platform: 'Institutional LMS' }
      ]
    },
    {
      code: 'CS505',
      name: 'Artificial Intelligence Foundations',
      semester: 5,
      credits: 4,
      instructor: 'Prof. A. Sen',
      attendance: 96,
      progressPercent: 86,
      units: [
        {
          unitNumber: 1,
          title: 'Intelligent Agents & Problem Formulation',
          topics: ['Agent architectures & PEAS definitions', 'Environment characterization', 'State space search graphs'],
          hours: 8
        },
        {
          unitNumber: 2,
          title: 'Informed & Uninformed Search Strategies',
          topics: ['BFS, DFS, Uniform-Cost Search', 'A* Search and heuristic admissibility', 'Greedy Best-First search', 'IDA* algorithms'],
          hours: 11
        },
        {
          unitNumber: 3,
          title: 'Adversarial Search & Game Playing',
          topics: ['Minimax decision rule for two-player games', 'Alpha-Beta pruning optimization', 'Evaluation functions in Chess/Checkers'],
          hours: 9
        },
        {
          unitNumber: 4,
          title: 'Constraint Satisfaction & Logic',
          topics: ['Constraint Satisfaction Problems (CSP)', 'Arc consistency (AC-3)', 'Propositional logic and First-Order Predicate Calculus', 'Resolution refutation'],
          hours: 11
        },
        {
          unitNumber: 5,
          title: 'Knowledge Representation & Intro to ML',
          topics: ['Ontologies and semantic nets', 'Bayesian networks and conditional independence', 'Supervised learning overview'],
          hours: 9
        }
      ],
      textbooks: [
        'Artificial Intelligence: A Modern Approach (4th Ed.) - Stuart Russell, Peter Norvig'
      ],
      notes: [
        { title: 'A* Search Heuristic Admissibility & Monotonicity Proofs', size: '2.5 MB', type: 'Handout' },
        { title: 'Alpha-Beta Pruning Step-by-Step Tree Examples', size: '2.0 MB', type: 'Handout' },
        { title: 'Python Search Algorithms Lab Implementation', size: '1.5 MB', type: 'Python Code' }
      ],
      videoLectures: [
        { title: 'Session 08: A* Search Proofs & Heuristic Design', duration: '55 mins', platform: 'Institutional LMS' }
      ]
    }
  ],
  4: [
    {
      code: 'CS401',
      name: 'Discrete Mathematical Structures',
      semester: 4,
      credits: 4,
      instructor: 'Dr. V. Rao',
      attendance: 91,
      progressPercent: 100,
      units: [
        { unitNumber: 1, title: 'Set Theory, Relations & Functions', topics: ['Equivalence relations', 'Partial orders and lattices'], hours: 8 },
        { unitNumber: 2, title: 'Mathematical Induction & Combinatorics', topics: ['Pigeonhole principle', 'Permutations & combinations'], hours: 9 }
      ],
      textbooks: ['Discrete Mathematics and Its Applications - Kenneth H. Rosen'],
      notes: [{ title: 'Discrete Math Complete Revision Pack', size: '5.2 MB', type: 'Handout' }],
      videoLectures: [{ title: 'Lecture Recap: Recurrence Relations', duration: '45 mins', platform: 'Institutional LMS' }]
    },
    {
      code: 'CS402',
      name: 'Computer Organization & Architecture',
      semester: 4,
      credits: 4,
      instructor: 'Prof. R. Menon',
      attendance: 93,
      progressPercent: 100,
      units: [
        { unitNumber: 1, title: 'Instruction Set Architecture & MIPS', topics: ['ALU design', 'MIPS assembly programming'], hours: 10 },
        { unitNumber: 2, title: 'Pipelining & Cache Memory', topics: ['Pipeline hazards (structural, data, control)', 'Cache hit/miss analysis'], hours: 11 }
      ],
      textbooks: ['Computer Organization and Design - Patterson, Hennessy'],
      notes: [{ title: 'MIPS Pipelining & Hazard Resolution Notes', size: '4.1 MB', type: 'Handout' }],
      videoLectures: [{ title: 'Lecture Recap: Direct Mapped vs Associative Cache', duration: '50 mins', platform: 'Institutional LMS' }]
    }
  ]
};

export default function StudentSubjectsPage() {
  const { user } = useAuth();
  const student = DEMO_STUDENTS[0];

  const currentDegree = user?.degree || student.degree || 'B.Tech';
  const currentBranch = user?.branch || student.branch || 'Computer Science & Engineering';
  const currentCollege = user?.college || student.college || 'Apex Institute of Technology';
  const studentType = user?.studentType || student.studentType || 'Undergraduate';

  const [selectedSem, setSelectedSem] = useState<number>(5);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('CS501');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const subjectsForSem = SEMESTER_SUBJECTS_DATA[selectedSem] || SEMESTER_SUBJECTS_DATA[5];
  const activeSubject = subjectsForSem.find((s) => s.code === selectedSubjectCode) || subjectsForSem[0];

  const filteredSubjects = subjectsForSem.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Academic Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Semester Subjects &amp; Learning Content
              </h1>
              <Badge variant="indigo">{studentType}</Badge>
              <Badge variant="neutral">Verified Curriculum</Badge>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              <strong className="text-slate-800">{currentDegree}</strong> &bull; {currentBranch} &bull; {currentCollege}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/student/coding">
              <Button variant="outline" size="sm" className="gap-1.5 shadow-xs text-xs">
                <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                <span>Coding Playground</span>
              </Button>
            </Link>
            <Link href="/student/academics">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-xs text-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>View Marks &amp; Grades</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Data Disclaimer */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold flex items-center gap-2">
              <span>Sample Academic Demo Data Notice</span>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-amber-200/70 text-amber-900">
                AI/ERP Readiness
              </span>
            </p>
            <p className="leading-relaxed text-[11px] text-amber-900/90">
              The syllabus units, lecture notes, and textbook citations below represent <strong>sample demonstration curriculum data</strong> tailored for {currentBranch} students. College-specific institutional syllabi and departmental customizations will be dynamically ingested once your university ERP is synchronized.
            </p>
          </div>
        </div>

        {/* Semester Selector & Search Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <button
                key={sem}
                onClick={() => {
                  setSelectedSem(sem);
                  const firstInSem = SEMESTER_SUBJECTS_DATA[sem]?.[0];
                  if (firstInSem) setSelectedSubjectCode(firstInSem.code);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSem === sem
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sem {sem} {sem === 5 ? '(Current)' : sem < 5 ? '(Passed)' : '(Upcoming)'}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search subject or course code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Main Content: Left Subject List & Right Subject Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Subject Cards List (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Enrolled Courses &mdash; Semester {selectedSem}
            </h2>

            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((sub) => {
                const isSelected = activeSubject?.code === sub.code;
                return (
                  <div
                    key={sub.code}
                    onClick={() => setSelectedSubjectCode(sub.code)}
                    className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-indigo-600 shadow-sm ring-1 ring-indigo-600'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono font-bold text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {sub.code}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {sub.credits} Credits
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mt-2">{sub.name}</h3>
                    <p className="text-[11px] text-slate-500 mt-1">Instructor: {sub.instructor}</p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">
                        Attendance: <strong className="text-emerald-600">{sub.attendance}%</strong>
                      </span>
                      <span className="text-indigo-600 font-semibold flex items-center gap-0.5">
                        {sub.units.length} Units <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                No subjects found matching your search.
              </div>
            )}
          </div>

          {/* Right Column: Detailed Units, Syllabus & Materials (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            {activeSubject ? (
              <>
                {/* Subject Overview Banner */}
                <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50/40 via-white to-blue-50/40">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                          {activeSubject.code}
                        </span>
                        <Badge variant="success">Core Subject</Badge>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {activeSubject.credits} Academic Credits &bull; Semester {activeSubject.semester}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 mt-1">
                      {activeSubject.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Faculty In-Charge: <strong className="text-slate-700">{activeSubject.instructor}</strong> &bull; Current Lecture Attendance: <strong className="text-emerald-700">{activeSubject.attendance}%</strong>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3 text-xs pt-2 border-t border-indigo-100">
                      <div className="flex-1">
                        <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                          <span>Syllabus Completion</span>
                          <span className="font-bold text-indigo-700">{activeSubject.progressPercent}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{ width: `${activeSubject.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Units & Syllabus Topics */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>Unit-Wise Detailed Syllabus</span>
                    </CardTitle>
                    <CardDescription>
                      Approved course curriculum, learning outcomes, and lecture unit splits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 divide-y divide-slate-100 text-xs">
                    {activeSubject.units.map((unit) => (
                      <div key={unit.unitNumber} className="p-4 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center">
                              {unit.unitNumber}
                            </span>
                            <h4 className="font-bold text-slate-900 text-xs">{unit.title}</h4>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {unit.hours} Teaching Hours
                          </span>
                        </div>

                        <ul className="space-y-1 pl-7 text-slate-600 text-[11px]">
                          {unit.topics.map((t, idx) => (
                            <li key={idx} className="list-disc leading-relaxed">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Learning Materials & Notes */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>Lecture Notes &amp; Handouts</span>
                    </CardTitle>
                    <CardDescription>
                      Official faculty study guides, handouts, and code snippets
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2.5 text-xs">
                    {activeSubject.notes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookmarkCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                          <div>
                            <p className="font-semibold text-slate-800 text-xs">{note.title}</p>
                            <span className="text-[10px] text-slate-500">
                              Format: {note.type} &bull; Size: {note.size}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs shrink-0 shadow-2xs"
                          onClick={() => alert(`Downloading handout: ${note.title} (Demo)`)}
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Download</span>
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Textbooks & Video Lectures */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Recommended Textbooks</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {activeSubject.textbooks.map((tb, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700 leading-relaxed">
                          &bull; {tb}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-rose-600" />
                        <span>Recorded Video Lectures</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {activeSubject.videoLectures.map((vid, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
                          <div>
                            <p className="font-semibold text-slate-800">{vid.title}</p>
                            <span className="text-[10px] text-slate-500">{vid.duration} &bull; {vid.platform}</span>
                          </div>
                          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline text-[10px]">
                            Watch
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
