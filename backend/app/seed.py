import json
import uuid
from datetime import datetime, date, timedelta
from app.database import engine, Base, SessionLocal
from app.models import (
    User, Profile, College, Subject, SubjectUnit, LearningMaterial, VideoLecture,
    StudentEnrollment, StudentBacklog, AttendanceRecord, Assessment,
    StudentTask, StudentExam, ExamNotification, FocusSession,
    FacultyClass, AcademicIntervention, StudentDataImport,
    GraduateResume, GraduateProject, AptitudeAttempt, MockInterview,
    JobPosting, JobApplication, CompanyProfile, AuditLog, PlatformSetting
)
from app.services.auth import hash_password
from app.services.exam_notifications import ExamNotificationService

def seed_database():
    print("Creating all tables in database...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        existing_student = db.query(User).filter(User.email == "arav.sharma@apex.edu").first()
        if not existing_student:
            print("Seeding users, curriculum, and student records...")
            # 1. STUDENT USER
            std_user = User(
                id="std-001",
                email="arav.sharma@apex.edu",
                hashed_password=hash_password("password123"),
                role="student",
                name="Arav Sharma",
                avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
                is_active=True
            )
            std_prof = Profile(
                id="prof-std-001",
                user_id="std-001",
                student_type="Undergraduate",
                college="Apex Institute of Technology",
                department="Computer Science",
                degree="B.Tech",
                branch="Computer Science & Engineering",
                year=3,
                semester=5,
                student_id="2023CS101",
                verified=True
            )
            db.add_all([std_user, std_prof])
    
            # 2. FACULTY USER
            fac_user = User(
                id="fac-101",
                email="k.raman@apex.edu",
                hashed_password=hash_password("password123"),
                role="faculty",
                name="Dr. K. Raman",
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                is_active=True
            )
            fac_prof = Profile(
                id="prof-fac-101",
                user_id="fac-101",
                college="Apex Institute of Technology",
                department="Computer Science & Engineering",
                employee_id="FAC-CS-042",
                designation="Associate Professor",
                verified=True
            )
            db.add_all([fac_user, fac_prof])
    
            # 3. GRADUATE USER
            grad_user = User(
                id="grad-001",
                email="sneha.m@graduate.example.com",
                hashed_password=hash_password("password123"),
                role="graduate",
                name="Sneha Mukherjee",
                avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
                is_active=True
            )
            grad_prof = Profile(
                id="prof-grad-001",
                user_id="grad-001",
                college="National School of Applied Sciences",
                department="Information Technology",
                degree="B.Tech Computer Science",
                year=2026,
                verified=True
            )
            db.add_all([grad_user, grad_prof])
    
            # 4. COMPANY USER
            comp_user = User(
                id="comp-usr-01",
                email="recruitment@nexatech.example.com",
                hashed_password=hash_password("password123"),
                role="company",
                name="Vikram Malhotra",
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
                is_active=True
            )
            comp_prof = Profile(
                id="prof-comp-01",
                user_id="comp-usr-01",
                company_name="NexaTech Systems",
                industry="Enterprise Cloud Solutions",
                recruiter_role="University Talent Lead",
                verified=True
            )
            db.add_all([comp_user, comp_prof])
    
            # 5. ADMIN USER
            adm_user = User(
                id="adm-001",
                email="admin@studylens.ai",
                hashed_password=hash_password("password123"),
                role="admin",
                name="Dr. Elena Rostova",
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                is_active=True
            )
            adm_prof = Profile(
                id="prof-adm-001",
                user_id="adm-001",
                college="Apex Consortium Administration",
                department="Academic Operations",
                verified=True
            )
            db.add_all([adm_user, adm_prof])
            db.commit()
    
            comp_entity = CompanyProfile(
                id="cp-01",
                user_id="comp-usr-01",
                company_name="NexaTech Systems",
                industry="Enterprise Cloud Solutions",
                website="https://nexatech.example.com",
                location="Bengaluru, KA",
                description="Leading provider of distributed systems, telemetry engines, and enterprise AI orchestration.",
                verification_status="Verified"
            )
            db.add(comp_entity)
            db.commit()
    
            # COLLEGES
            colleges = [
                College(id="col-01", name="Apex Institute of Technology", code="AIT", location="Bengaluru, KA", students_count=4200, faculty_count=280, status="Active"),
                College(id="col-02", name="National School of Applied Sciences", code="NSAS", location="Pune, MH", students_count=3100, faculty_count=195, status="Active"),
                College(id="col-03", name="Metro Institute of Engineering", code="MIE", location="Hyderabad, TS", students_count=2800, faculty_count=160, status="Active"),
            ]
            db.add_all(colleges)
            db.commit()
    
            # CURRICULUM SUBJECTS (SEMESTERS 1 to 8)
            print("Seeding semester-wise subjects...")
            subjects_data = [
                # Semester 1
                ("CS101", "Engineering Physics", 1, 4, "Dr. P. Sen", [
                    (1, "Wave Optics & Interference", ["Young's double slit", "Newton's rings", "Diffraction gratings"]),
                    (2, "Quantum Mechanics Basics", ["de Broglie hypothesis", "Schrodinger wave equation", "Particle in a box"])
                ]),
                ("CS102", "Calculus & Linear Algebra", 1, 4, "Prof. M. Joshi", [
                    (1, "Matrices & Vector Spaces", ["Eigenvalues and eigenvectors", "Cayley-Hamilton theorem", "Orthogonal matrices"]),
                    (2, "Differential Calculus", ["Rolle's theorem", "Taylor and Maclaurin series", "Partial derivatives"])
                ]),
                ("CS103", "Basic Electrical Engineering", 1, 3, "Dr. K. Swamy", [
                    (1, "DC Circuit Analysis", ["Kirchhoff laws", "Thevenin and Norton theorems", "Superposition theorem"]),
                    (2, "AC Circuits & Phasors", ["Sinusoidal waveforms", "Power factor", "Three-phase balance circuits"])
                ]),
                ("CS104", "Communicative English & Technical Writing", 1, 2, "Prof. S. Roy", [
                    (1, "Technical Vocabulary & Grammar", ["Sentence structures", "Active/Passive voice", "Report writing"]),
                    (2, "Oral Communication", ["Presentation techniques", "Group discussions", "Professional correspondence"])
                ]),
    
                # Semester 2
                ("CS201", "Programming for Problem Solving (C)", 2, 4, "Dr. A. Gupta", [
                    (1, "Introduction to C Syntax", ["Data types", "Control statements", "Loops and branches"]),
                    (2, "Pointers & Dynamic Memory", ["Pointer arithmetic", "malloc, calloc, realloc, free", "Structures and unions"])
                ]),
                ("CS202", "Differential Equations & Transforms", 2, 4, "Prof. V. Murthy", [
                    (1, "Ordinary Differential Equations", ["First order equations", "Higher order linear ODEs", "Cauchy-Euler equations"]),
                    (2, "Laplace Transforms", ["Properties of Laplace transforms", "Inverse Laplace transforms", "Solving initial value problems"])
                ]),
                ("CS203", "Engineering Chemistry & Materials", 2, 3, "Dr. R. Bannerjee", [
                    (1, "Electrochemistry & Batteries", ["Nernst equation", "Lithium-ion and lead-acid batteries", "Corrosion mechanisms"]),
                    (2, "Polymers & Nanomaterials", ["Thermosetting vs thermoplastics", "Carbon nanotubes", "Synthesis methods"])
                ]),
    
                # Semester 3
                ("CS301", "Data Structures & Fundamentals", 3, 4, "Dr. K. Raman", [
                    (1, "Linear Data Structures", ["Arrays, Stacks, Queues", "Linked Lists (Singly, Doubly, Circular)", "Applications of stacks"]),
                    (2, "Non-Linear Structures", ["Binary trees", "Binary Search Trees (BST)", "AVL tree rotations"])
                ]),
                ("CS302", "Digital Logic & Computer Design", 3, 4, "Prof. T. Iyer", [
                    (1, "Boolean Algebra & Logic Gates", ["Karnaugh maps (K-maps)", "Quine-McCluskey minimization", "Logic gate ICs"]),
                    (2, "Combinational & Sequential Circuits", ["Multiplexers and decoders", "Flip-Flops (SR, JK, D, T)", "Synchronous and asynchronous counters"])
                ]),
                ("CS303", "Object Oriented Programming using C++", 3, 3, "Dr. N. Sinha", [
                    (1, "Core OOP Principles", ["Classes, objects, constructors", "Encapsulation and data abstraction", "Operator overloading"]),
                    (2, "Inheritance & Polymorphism", ["Virtual functions and runtime polymorphism", "Abstract classes", "Standard Template Library (STL)"])
                ]),
    
                # Semester 4
                ("CS401", "Discrete Mathematical Structures", 4, 4, "Dr. V. Rao", [
                    (1, "Set Theory, Relations & Functions", ["Equivalence relations", "Partial orders and lattices", "Hasse diagrams"]),
                    (2, "Combinatorics & Graph Theory", ["Pigeonhole principle", "Eulerian and Hamiltonian graphs", "Planar graphs and coloring"])
                ]),
                ("CS402", "Computer Organization & Architecture", 4, 4, "Prof. R. Menon", [
                    (1, "Instruction Set Architecture", ["MIPS instruction format", "Addressing modes", "ALU datapath design"]),
                    (2, "Pipelining & Memory Hierarchy", ["Pipeline hazards (data, control, structural)", "Cache direct-mapped vs set-associative", "Virtual memory"])
                ]),
    
                # Semester 5
                ("CS501", "Design & Analysis of Algorithms", 5, 4, "Dr. K. Raman", [
                    (1, "Asymptotic Analysis & Recurrences", ["Big-O, Omega, Theta notations", "Master Theorem", "Substitution method"]),
                    (2, "Divide & Conquer and Sorting", ["Merge Sort, Quick Sort", "Lower bounds for comparison sorting", "Median finding"]),
                    (3, "Greedy & Dynamic Programming", ["Activity selection", "0/1 Knapsack", "Matrix Chain Multiplication", "LCS"]),
                    (4, "Graph Algorithms", ["Dijkstra, Bellman-Ford", "Floyd-Warshall", "Prim and Kruskal MST"]),
                    (5, "NP-Completeness", ["Classes P, NP, NP-Hard, NP-Complete", "Polynomial reductions", "3-SAT, Vertex Cover"])
                ]),
                ("CS502", "Database Management Systems", 5, 4, "Prof. S. Iyer", [
                    (1, "Data Modeling & ER Diagrams", ["Entity-Relationship models", "Extended ER", "Relational mapping"]),
                    (2, "Relational Algebra & SQL", ["Complex joins, subqueries", "Window functions", "Triggers, views, procedures"]),
                    (3, "Normalization", ["1NF, 2NF, 3NF, BCNF", "Lossless join & dependency preservation"]),
                    (4, "Indexing & Query Optimization", ["B-Trees and B+ Trees", "Cost-based query evaluation plans"]),
                    (5, "Transactions & Concurrency", ["ACID properties", "Two-Phase Locking (2PL)", "Timestamp ordering", "WAL Crash recovery"])
                ]),
                ("CS503", "Operating Systems", 5, 4, "Dr. N. Sharma", [
                    (1, "OS Structures & Process Concepts", ["System calls", "PCB and context switching", "fork() process creation"]),
                    (2, "CPU Scheduling & Synchronization", ["Round Robin, Priority, Multilevel feedback", "Semaphores, Mutex, Banker's algorithm"]),
                    (3, "Memory Management & Virtual Memory", ["Paging, TLB, Page replacement (LRU, FIFO, Optimal)", "Thrashing prevention"])
                ]),
                ("CS504", "Computer Networks", 5, 3, "Dr. M. Verma", [
                    (1, "Layering & Data Link Layer", ["OSI and TCP/IP models", "Framing, CRC, Sliding window protocols"]),
                    (2, "Network & Transport Layers", ["IPv4/IPv6 addressing, CIDR", "Routing (OSPF, BGP)", "TCP 3-way handshake, Congestion control (AIMD)"]),
                    (3, "Application Layer", ["DNS resolution", "HTTP/2, HTTP/3", "TLS/SSL security basics"])
                ]),
                ("CS505", "Artificial Intelligence Foundations", 5, 4, "Prof. A. Sen", [
                    (1, "Intelligent Agents & Problem Search", ["PEAS definitions", "BFS, DFS, Uniform-cost search"]),
                    (2, "Informed Search & Game Playing", ["A* Search and heuristic admissibility", "Minimax and Alpha-Beta pruning"]),
                    (3, "Constraint Satisfaction & Logic", ["Arc consistency (AC-3)", "Propositional & First-Order Logic", "Resolution refutation"])
                ]),
    
                # Semester 6
                ("CS601", "Compiler Design", 6, 4, "Dr. D. Bhat", [
                    (1, "Lexical & Syntax Analysis", ["Lexical analyzers (Flex)", "Context-free grammars", "LL(1), LR(0), LALR(1) parsers"]),
                    (2, "Code Generation & Optimization", ["Three-address code (TAC)", "Basic blocks and control flow graphs", "Register allocation"])
                ]),
                ("CS602", "Software Engineering & Agile Methodologies", 6, 3, "Prof. H. Patel", [
                    (1, "Agile Lifecycle & Scrum", ["User stories and sprint planning", "Scrum ceremonies", "CI/CD pipelines"]),
                    (2, "Design Patterns & Testing", ["Factory, Observer, Singleton patterns", "Unit testing, Integration testing, TDD"])
                ]),
                ("CS603", "Cloud Computing & Distributed Systems", 6, 4, "Dr. R. Kapoor", [
                    (1, "Cloud Architectures", ["IaaS, PaaS, SaaS", "Virtualization & Containers (Docker)", "Kubernetes basics"]),
                    (2, "Distributed Systems Foundations", ["CAP Theorem", "Consensus algorithms (Raft, Paxos)", "Microservices design"])
                ]),
    
                # Semester 7
                ("CS701", "Big Data Analytics & Platforms", 7, 4, "Dr. P. Roy", [
                    (1, "Hadoop & MapReduce", ["HDFS architecture", "MapReduce programming model", "YARN resource manager"]),
                    (2, "Apache Spark & Stream Processing", ["Resilient Distributed Datasets (RDDs)", "Spark DataFrames and Spark SQL", "Kafka streaming"])
                ]),
                ("CS702", "Cybersecurity & Cryptography", 7, 4, "Prof. S. Nair", [
                    (1, "Classical & Modern Encryption", ["AES, DES symmetric ciphers", "RSA asymmetric cryptography", "Diffie-Hellman key exchange"]),
                    (2, "Network Security & Ethical Hacking", ["Firewalls, IDS/IPS", "Web vulnerabilities (OWASP Top 10)", "Penetration testing"])
                ]),
    
                # Semester 8
                ("CS801", "Major Capstone Industry Project", 8, 10, "Dr. K. Raman", [
                    (1, "Project Formulation & System Architecture", ["Problem statement", "High-level architecture design", "Tech stack selection"]),
                    (2, "Implementation, Testing & Defense", ["Full implementation", "Performance benchmarks", "Viva-voce defense"])
                ]),
                ("CS802", "Professional Ethics & Intellectual Property", 8, 2, "Prof. E. Rostova", [
                    (1, "Engineering Ethics & Cyber Law", ["ACM code of ethics", "Data privacy acts (GDPR, DPDP)", "Whistleblower protection"]),
                    (2, "Patents, Copyrights & Trademarks", ["Patent filing process", "Open source licensing (MIT, Apache, GPL)"])
                ])
            ]
    
            created_subjects = {}
            for code, name, sem, credits, instructor, units in subjects_data:
                s_id = f"subj-{code.lower()}"
                subj = Subject(
                    id=s_id,
                    code=code,
                    name=name,
                    degree="B.Tech",
                    branch="Computer Science & Engineering",
                    semester=sem,
                    credits=credits,
                    department="Computer Science",
                    instructor_name=instructor,
                    description=f"Coursework syllabus for {name} ({code}) - Semester {sem}",
                    is_demo=True
                )
                db.add(subj)
                created_subjects[code] = s_id
    
                for u_num, u_title, u_topics in units:
                    unit = SubjectUnit(
                        id=f"unit-{code.lower()}-{u_num}",
                        subject_id=s_id,
                        unit_number=u_num,
                        title=u_title,
                        topics_json=json.dumps(u_topics),
                        hours=8
                    )
                    db.add(unit)
    
                # Handouts & notes
                db.add(LearningMaterial(
                    id=f"mat-{code.lower()}-01",
                    subject_id=s_id,
                    title=f"{code} Complete Module Lecture Notes & Slides",
                    type="Handout",
                    file_size="4.2 MB",
                    is_demo=True
                ))
                db.add(LearningMaterial(
                    id=f"mat-{code.lower()}-02",
                    subject_id=s_id,
                    title=f"{code} Formula Sheet & Key Recurrences",
                    type="Cheat Sheet",
                    file_size="1.8 MB",
                    is_demo=True
                ))
    
                # Video lecture
                db.add(VideoLecture(
                    id=f"vid-{code.lower()}-01",
                    subject_id=s_id,
                    title=f"{name}: Architecture & Solved Problems",
                    duration="52 mins",
                    platform="Institutional LMS"
                ))
    
            db.commit()
    
            # STUDENT ENROLLMENTS (Semester 5 for Arav Sharma)
            print("Seeding student enrollments for Arav Sharma...")
            sem5_courses = [
                ("CS501", 38, 54, 92, "A+", 94.0, 4),
                ("CS502", 36, 52, 88, "A", 90.0, 4),
                ("CS503", 37, 51, 88, "A", 92.0, 4),
                ("CS504", 28, 41, 69, "B+", 89.0, 3),
                ("CS505", 39, 56, 95, "O", 96.0, 4),
            ]
            for c_code, internal, external, total, grade, att, cred in sem5_courses:
                db.add(StudentEnrollment(
                    id=f"enr-{c_code.lower()}",
                    student_id="std-001",
                    subject_id=created_subjects[c_code],
                    semester=5,
                    academic_year="2025-2026",
                    internal_marks=float(internal),
                    external_marks=float(external),
                    total_marks=float(total),
                    max_marks=100.0,
                    grade=grade,
                    attendance_pct=att,
                    credits=cred,
                    status="Enrolled",
                    is_demo=True
                ))
    
            # 1 REAL BACKLOG RECORD (Semester 3 originating: CS302 Digital Logic Design)
            print("Seeding backlog record...")
            db.add(StudentBacklog(
                id="backlog-01",
                student_id="std-001",
                subject_id=created_subjects["CS302"],
                originating_semester=3,
                status="Active",
                attempts_count=1,
                remarks="Backlog registered in Digital Logic Design (CS302). Re-examination scheduled for Nov 2026 session.",
                is_demo=True
            ))
    
            # ATTENDANCE LOGS
            att_logs = [
                ("CS501", "2026-10-09", "Present", "Dynamic Programming - Matrix Chain Multiplication"),
                ("CS502", "2026-10-08", "Present", "B+ Tree Indexing & Internal Node Splitting"),
                ("CS503", "2026-10-07", "Present", "Virtual Memory & Demand Paging Page Faults"),
                ("CS504", "2026-10-06", "Present", "TCP Congestion Avoidance & Tahoe vs Reno"),
                ("CS505", "2026-10-05", "Present", "A* Heuristic Admissibility & Monotonicity Proofs"),
            ]
            for code, dt, st, top in att_logs:
                db.add(AttendanceRecord(
                    id=f"att-{uuid.uuid4().hex[:8]}",
                    student_id="std-001",
                    subject_code=code,
                    date=dt,
                    status=st,
                    topic=top
                ))
    
            # ASSESSMENTS
            assessments = [
                ("Mid-Semester Test 1: Algorithmic Efficiency", "MCQ", "CS501", 24.5, 25.0, "2026-09-20", "Completed", "Top percentile score in asymptotic analysis."),
                ("Lab Practical Assessment: SQL Normalization", "Coding", "CS502", 48.0, 50.0, "2026-09-26", "Completed", "Excellent query plans and indexing rationale."),
                ("Quiz: Virtual Memory & Page Tables", "MCQ", "CS503", 18.0, 20.0, "2026-10-02", "Completed", "Strong comprehension of TLB miss handling."),
            ]
            for title, cat, code, sc, max_sc, dt, st, fb in assessments:
                db.add(Assessment(
                    id=f"ass-{uuid.uuid4().hex[:8]}",
                    student_id="std-001",
                    title=title,
                    category=cat,
                    subject_code=code,
                    score=sc,
                    max_score=max_sc,
                    date=dt,
                    status=st,
                    feedback=fb
                ))
    
            # TASKS
            tasks = [
                ("Submit CS501 Dynamic Programming Lab Assignment", "Complete 0/1 knapsack and longest common subsequence memoized C code.", "2026-10-12", "high", "Academic", False),
                ("Review CS502 Normalization BCNF Decomposition Practice", "Work through chapter 7 exercises on functional dependencies.", "2026-10-14", "medium", "Academic", False),
                ("Conduct FocusNest 45-min Session on Dijkstra Algorithm", "Trace shortest path on 8-node directed graph.", "2026-10-11", "medium", "Academic", True),
            ]
            for title, desc, due, prio, cat, comp in tasks:
                db.add(StudentTask(
                    id=f"tsk-{uuid.uuid4().hex[:8]}",
                    student_id="std-001",
                    title=title,
                    description=desc,
                    due_date=due,
                    priority=prio,
                    category=cat,
                    completed=comp
                ))
    
            db.commit()
    
            # UPCOMING EXAMS
            today = date.today()
            exams = [
                ("CS501", "Design & Analysis of Algorithms", (today + timedelta(days=4)).strftime("%Y-%m-%d"), "09:30 AM - 12:30 PM", "Hall 302, Academic Block B", "End-Semester"),
                ("CS502", "Database Management Systems", (today + timedelta(days=6)).strftime("%Y-%m-%d"), "09:30 AM - 12:30 PM", "Hall 105, Computing Center", "End-Semester"),
                ("CS503", "Operating Systems", (today + timedelta(days=9)).strftime("%Y-%m-%d"), "02:00 PM - 05:00 PM", "Hall 201, Main Auditorium", "End-Semester"),
            ]
            for code, name, ex_date, ex_time, venue, ex_type in exams:
                ex_obj = StudentExam(
                    id=f"exam-{code.lower()}",
                    student_id="std-001",
                    subject_code=code,
                    subject_name=name,
                    exam_date=ex_date,
                    exam_time=ex_time,
                    venue=venue,
                    exam_type=ex_type,
                    reminder_enabled=True
                )
                db.add(ex_obj)
                db.commit()
                ExamNotificationService.prepare_5_day_reminders(db, ex_obj)
                db.commit()
    
        # FACULTY CLASSES & OTHER PORTALS
        if not db.query(FacultyClass).first():
            print("Seeding faculty, graduate, company, and admin modules...")
            fac_classes = [
                FacultyClass(id="fc-01", faculty_id="fac-101", course_code="CS501", course_name="Design & Analysis of Algorithms", section="Section A", schedule_time="Mon & Wed 10:00 AM", room="Hall 302", enrolled_count=64),
                FacultyClass(id="fc-02", faculty_id="fac-101", course_code="CS502", course_name="Database Management Systems", section="Section B", schedule_time="Tue & Thu 02:00 PM", room="Lab 4", enrolled_count=58),
            ]
            db.add_all(fac_classes)
    
            # ACADEMIC INTERVENTIONS
            db.add(AcademicIntervention(
                id="int-01",
                faculty_id="fac-101",
                student_id="std-001",
                student_name="Arav Sharma",
                student_code="2023CS101",
                faculty_name="Dr. K. Raman",
                reason="Advising checkup regarding Semester 3 Digital Logic backlog clearance preparation.",
                recommended_action="Attend faculty peer clinic every Friday and complete 5 previous years' exam papers.",
                follow_up_date="2026-10-18",
                status="Scheduled",
                notes="Student demonstrated solid grasp of CS501 and CS502 coursework.",
                private_notes="High potential; recommend encouragement."
            ))
    
            # GRADUATE RESUME, PROJECTS & PRACTICE
            db.add(GraduateResume(
                id="res-001",
                user_id="grad-001",
                title="Associate Full-Stack Software Engineer",
                summary="Passionate computer science graduate with proven skills in Python, FastAPI, Next.js, and relational database systems.",
                skills_json=json.dumps(["Python", "FastAPI", "React", "TypeScript", "SQL", "Docker", "Git", "REST APIs"]),
                experience_json=json.dumps([{"role": "Software Developer Intern", "company": "Apex Labs", "duration": "Jan 2026 - Jun 2026"}]),
                education_json=json.dumps([{"degree": "B.Tech Computer Science", "institution": "National School of Applied Sciences", "year": "2026"}]),
                projects_json=json.dumps([{"name": "Distributed Analytics Engine", "tech": "Python, Docker", "status": "Verified"}]),
                ats_score=88
            ))
    
            db.add(GraduateProject(
                id="proj-01",
                user_id="grad-001",
                title="StudyLens Real-Time Telemetry & Progress Platform",
                description="Built an end-to-end full-stack analytics engine with role-based access control and live exam reminders.",
                tech_json=json.dumps(["FastAPI", "Next.js", "SQLAlchemy", "TailwindCSS"]),
                github_url="https://github.com/example/studylens",
                live_url="http://localhost:3000",
                verified=True,
                verified_by="Faculty Board Assessment",
                date="2026-09-15"
            ))
    
            db.add(AptitudeAttempt(
                id="apt-01",
                user_id="grad-001",
                category="Logical Reasoning & Quantitative",
                score=18,
                total_questions=20,
                time_spent_secs=720,
                passed=True
            ))
    
            db.add(MockInterview(
                id="mock-01",
                user_id="grad-001",
                role_targeted="Junior Software Engineer (Cloud & Backend)",
                score=86,
                feedback="Strong architectural explanations, clear communication on algorithm complexity.",
                strengths_json=json.dumps(["Algorithmic thinking", "Clean REST API design", "Database indexing concepts"]),
                improvements_json=json.dumps(["Practice multi-threading concurrency corner cases"]),
                conducted_at=datetime.utcnow()
            ))
    
            # JOB POSTINGS
            jobs = [
                JobPosting(
                    id="job-01",
                    company_id="comp-usr-01",
                    company_name="NexaTech Systems",
                    title="Associate Cloud Platform Engineer",
                    type="Full-time",
                    location="Bengaluru, KA",
                    remote=True,
                    salary="14 - 18 LPA",
                    deadline="2026-11-15",
                    required_skills_json=json.dumps(["Python", "FastAPI", "Docker", "Linux"]),
                    preferred_skills_json=json.dumps(["Kubernetes", "PostgreSQL", "AWS"]),
                    experience="0-1 years",
                    description="Join our core platform engineering team building next-generation distributed telemetry and AI workloads.",
                    openings=4,
                    status="Active"
                ),
                JobPosting(
                    id="job-02",
                    company_id="comp-usr-01",
                    company_name="NexaTech Systems",
                    title="Frontend Engineer (React / Next.js)",
                    type="Full-time",
                    location="Hyderabad, TS",
                    remote=False,
                    salary="12 - 16 LPA",
                    deadline="2026-11-20",
                    required_skills_json=json.dumps(["React", "TypeScript", "Next.js", "CSS"]),
                    preferred_skills_json=json.dumps(["TailwindCSS", "REST APIs", "Design Systems"]),
                    experience="0-2 years",
                    description="Craft fluid, accessible, high-performance interfaces for enterprise analytics users.",
                    openings=2,
                    status="Active"
                )
            ]
            db.add_all(jobs)
            db.commit()
    
            # JOB APPLICATION
            db.add(JobApplication(
                id="app-01",
                job_id="job-01",
                candidate_id="grad-001",
                candidate_name="Sneha Mukherjee",
                candidate_email="sneha.m@graduate.example.com",
                applied_date="2026-10-05",
                status="Shortlisted",
                match_score=92,
                matched_skills_json=json.dumps(["Python", "FastAPI", "Docker"]),
                missing_skills_json=json.dumps(["Kubernetes"]),
                recruiter_notes="Strong candidate; demonstrated high project score and clean GitHub portfolio.",
                interview_date="2026-10-15 11:00 AM"
            ))
    
            # AUDIT LOGS
            db.add(AuditLog(
                id="audit-001",
                user_id="adm-001",
                user_email="admin@studylens.ai",
                role="admin",
                action="SYSTEM_INITIALIZED",
                ip_address="127.0.0.1",
                details_json='{"status": "Database seed completed", "modules": 8}'
            ))
    
            # PLATFORM SETTINGS
            settings_data = [
                ("academic_year_active", "2025-2026", "Currently active academic session"),
                ("grading_scale", "10-Point Absolute Scale", "Standard CGPA calculation standard"),
                ("exam_reminder_days", "5", "Daily morning notification countdown threshold"),
                ("demo_mode_enabled", "true", "Transparent demonstration mode flag")
            ]
            for k, v, d in settings_data:
                db.add(PlatformSetting(
                    id=f"set-{uuid.uuid4().hex[:8]}",
                    key=k,
                    value=v,
                    description=d
                ))
    
            db.commit()
            print("Database initial curriculum and demo seed completed!")
        
        # Always run reproducible evaluation account seed idempotently
        seed_synthetic_evaluator_accounts(db)

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

def seed_synthetic_evaluator_accounts(db: Session):
    print("Checking and seeding reproducible synthetic evaluator accounts...")
    hashed_pw = hash_password("password123")
    
    # 1. 20 Synthetic Students
    student_specs = [
        ("eval-std-01", "student01@studylens.ai", "Synthetic Student 01 - Aarav", 1, "STU2025001", "9800000001", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-02", "student02@studylens.ai", "Synthetic Student 02 - Ananya", 1, "STU2025002", "9800000002", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-03", "student03@studylens.ai", "Synthetic Student 03 - Rohan", 2, "STU2025003", "9800000003", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-04", "student04@studylens.ai", "Synthetic Student 04 - Ishita", 2, "STU2025004", "9800000004", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-05", "student05@studylens.ai", "Synthetic Student 05 - Kabir", 3, "STU2025005", "9800000005", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-06", "student06@studylens.ai", "Synthetic Student 06 - Tanvi", 3, "STU2025006", "9800000006", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-07", "student07@studylens.ai", "Synthetic Student 07 - Aditya", 4, "STU2025007", "9800000007", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-08", "student08@studylens.ai", "Synthetic Student 08 - Meera", 4, "STU2025008", "9800000008", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-09", "student09@studylens.ai", "Synthetic Student 09 - Vihaan", 5, "STU2025009", "9800000009", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-10", "student10@studylens.ai", "Synthetic Student 10 - Diya", 5, "STU2025010", "9800000010", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-11", "student11@studylens.ai", "Synthetic Student 11 - Arjun", 5, "STU2025011", "9800000011", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-12", "student12@studylens.ai", "Synthetic Student 12 - Riya", 6, "STU2025012", "9800000012", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-13", "student13@studylens.ai", "Synthetic Student 13 - Devansh", 6, "STU2025013", "9800000013", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-14", "student14@studylens.ai", "Synthetic Student 14 - Sneha", 6, "STU2025014", "9800000014", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-15", "student15@studylens.ai", "Synthetic Student 15 - Siddharth", 7, "STU2025015", "9800000015", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-16", "student16@studylens.ai", "Synthetic Student 16 - Pooja", 7, "STU2025016", "9800000016", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-17", "student17@studylens.ai", "Synthetic Student 17 - Varun", 7, "STU2025017", "9800000017", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-18", "student18@studylens.ai", "Synthetic Student 18 - Neha", 8, "STU2025018", "9800000018", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-19", "student19@studylens.ai", "Synthetic Student 19 - Yash", 8, "STU2025019", "9800000019", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
        ("eval-std-20", "student20@studylens.ai", "Synthetic Student 20 - Kritika", 8, "STU2025020", "9800000020", "Undergraduate", "B.Tech", "Computer Science & Engineering"),
    ]

    for uid, email, name, sem, stu_id, phone, stype, deg, branch in student_specs:
        if not db.query(User).filter(User.email == email).first():
            u = User(
                id=uid,
                email=email,
                hashed_password=hashed_pw,
                role="student",
                name=name,
                avatar=f"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
                is_active=True
            )
            p = Profile(
                id=f"prof-{uid}",
                user_id=uid,
                student_type=stype,
                college="Apex Institute of Technology",
                department="Computer Science & Engineering",
                degree=deg,
                branch=branch,
                year=(sem + 1) // 2,
                semester=sem,
                student_id=stu_id,
                phone=phone,
                verified=True
            )
            db.add_all([u, p])
            db.flush()

            # Enroll in subjects of their semester
            subjs = db.query(Subject).filter(Subject.semester == sem).all()
            for s in subjs:
                enr_id = f"enr-{uid}-{s.code.lower()}"
                if not db.query(StudentEnrollment).filter(StudentEnrollment.id == enr_id).first():
                    db.add(StudentEnrollment(
                        id=enr_id,
                        student_id=uid,
                        subject_id=s.id,
                        semester=sem,
                        academic_year="2025-2026",
                        internal_marks=26.0,
                        external_marks=62.0,
                        total_marks=88.0,
                        max_marks=100.0,
                        grade="A+",
                        attendance_pct=92.0,
                        credits=s.credits,
                        status="Enrolled",
                        is_demo=True
                    ))
    db.commit()

    # 2. 10 Faculty Accounts
    faculty_specs = [
        ("eval-fac-01", "faculty01@studylens.ai", "Synthetic Faculty 01 - Dr. K. Raman", "FAC-CS-001", "Professor", "Computer Science & Engineering", "9810000001"),
        ("eval-fac-02", "faculty02@studylens.ai", "Synthetic Faculty 02 - Prof. S. Iyer", "FAC-CS-002", "Associate Professor", "Computer Science & Engineering", "9810000002"),
        ("eval-fac-03", "faculty03@studylens.ai", "Synthetic Faculty 03 - Dr. Anita Desai", "FAC-IT-003", "Associate Professor", "Information Technology", "9810000003"),
        ("eval-fac-04", "faculty04@studylens.ai", "Synthetic Faculty 04 - Prof. Rajesh Verma", "FAC-IT-004", "Assistant Professor", "Information Technology", "9810000004"),
        ("eval-fac-05", "faculty05@studylens.ai", "Synthetic Faculty 05 - Dr. Priya Nambiar", "FAC-DS-005", "Professor", "Data Science & AI", "9810000005"),
        ("eval-fac-06", "faculty06@studylens.ai", "Synthetic Faculty 06 - Prof. Amit Sengupta", "FAC-DS-006", "Assistant Professor", "Data Science & AI", "9810000006"),
        ("eval-fac-07", "faculty07@studylens.ai", "Synthetic Faculty 07 - Dr. Vikram Rao", "FAC-EC-007", "Associate Professor", "Electronics & Communication", "9810000007"),
        ("eval-fac-08", "faculty08@studylens.ai", "Synthetic Faculty 08 - Prof. Neha Kapoor", "FAC-EE-008", "Assistant Professor", "Electrical Engineering", "9810000008"),
        ("eval-fac-09", "faculty09@studylens.ai", "Synthetic Faculty 09 - Dr. Manoj Joshi", "FAC-MA-009", "Professor", "Applied Mathematics & Computing", "9810000009"),
        ("eval-fac-10", "faculty10@studylens.ai", "Synthetic Faculty 10 - Prof. Sunita Roy", "FAC-HU-010", "Associate Professor", "Humanities & Management", "9810000010"),
    ]

    for uid, email, name, emp_id, desig, dept, phone in faculty_specs:
        if not db.query(User).filter(User.email == email).first():
            u = User(
                id=uid,
                email=email,
                hashed_password=hashed_pw,
                role="faculty",
                name=name,
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                is_active=True
            )
            p = Profile(
                id=f"prof-{uid}",
                user_id=uid,
                college="Apex Institute of Technology",
                department=dept,
                employee_id=emp_id,
                designation=desig,
                phone=phone,
                verified=True
            )
            db.add_all([u, p])
    db.commit()

    # 3. 10 Graduate / Alumni Accounts
    grad_specs = [
        ("eval-grad-01", "graduate01@studylens.ai", "Synthetic Graduate 01 - Sneha M.", "B.Tech Computer Science", 2025, "Associate Full-Stack Engineer", "9820000001"),
        ("eval-grad-02", "graduate02@studylens.ai", "Synthetic Graduate 02 - Rohan K.", "B.Tech Information Technology", 2025, "Cloud DevOps Specialist", "9820000002"),
        ("eval-grad-03", "graduate03@studylens.ai", "Synthetic Graduate 03 - Ananya B.", "B.Tech Data Science", 2025, "Junior ML Engineer", "9820000003"),
        ("eval-grad-04", "graduate04@studylens.ai", "Synthetic Graduate 04 - Siddharth P.", "B.Tech Computer Science", 2026, "Backend Systems Developer", "9820000004"),
        ("eval-grad-05", "graduate05@studylens.ai", "Synthetic Graduate 05 - Tanvi N.", "B.Tech Electronics & Comm", 2025, "Embedded Firmware Engineer", "9820000005"),
        ("eval-grad-06", "graduate06@studylens.ai", "Synthetic Graduate 06 - Kabir S.", "B.Tech Computer Science", 2026, "Site Reliability Engineer", "9820000006"),
        ("eval-grad-07", "graduate07@studylens.ai", "Synthetic Graduate 07 - Pooja D.", "B.Tech Information Technology", 2025, "Frontend UX Developer", "9820000007"),
        ("eval-grad-08", "graduate08@studylens.ai", "Synthetic Graduate 08 - Aditya V.", "B.Tech Data Science", 2026, "Data Analytics Associate", "9820000008"),
        ("eval-grad-09", "graduate09@studylens.ai", "Synthetic Graduate 09 - Meera T.", "B.Tech Computer Science", 2025, "Information Security Analyst", "9820000009"),
        ("eval-grad-10", "graduate10@studylens.ai", "Synthetic Graduate 10 - Varun R.", "B.Tech Computer Science", 2026, "Distributed Systems Engineer", "9820000010"),
    ]

    for uid, email, name, deg, y, title, phone in grad_specs:
        if not db.query(User).filter(User.email == email).first():
            u = User(
                id=uid,
                email=email,
                hashed_password=hashed_pw,
                role="graduate",
                name=name,
                avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
                is_active=True
            )
            p = Profile(
                id=f"prof-{uid}",
                user_id=uid,
                college="Apex Institute of Technology",
                department="Computer Science",
                degree=deg,
                year=y,
                phone=phone,
                verified=True
            )
            db.add_all([u, p])
            db.flush()

            # Seed resume for graduate
            res_id = f"res-{uid}"
            if not db.query(GraduateResume).filter(GraduateResume.user_id == uid).first():
                db.add(GraduateResume(
                    id=res_id,
                    user_id=uid,
                    title=title,
                    summary=f"Certified {deg} graduate specializing in production engineering, API scaling, and high-performance algorithms.",
                    skills_json=json.dumps(["Python", "React", "TypeScript", "SQL", "Docker", "Git"]),
                    experience_json=json.dumps([{"role": "Engineering Fellow", "company": "Tech Innovations", "duration": "6 months"}]),
                    education_json=json.dumps([{"degree": deg, "institution": "Apex Institute of Technology", "year": str(y)}]),
                    projects_json=json.dumps([{"name": "Distributed Microservice Suite", "tech": "Go, Docker", "status": "Verified"}]),
                    ats_score=90
                ))
    db.commit()

    # 4. 5 Company Accounts
    comp_specs = [
        ("eval-comp-01", "company01@studylens.ai", "Recruiter - NexaTech Systems", "NexaTech Systems", "Enterprise Cloud Solutions", "Bengaluru, KA", "https://nexatech.example.com", "9830000001", "Associate Cloud Systems Engineer", "10 - 14 LPA"),
        ("eval-comp-02", "company02@studylens.ai", "Recruiter - CloudCore Dynamics", "CloudCore Dynamics", "Distributed Telemetry & SRE", "Hyderabad, TS", "https://cloudcore.example.com", "9830000002", "Junior Site Reliability Engineer", "11 - 15 LPA"),
        ("eval-comp-03", "company03@studylens.ai", "Recruiter - DataVantage AI", "DataVantage AI", "Predictive Analytics & LLMs", "Pune, MH", "https://datavantage.example.com", "9830000003", "Associate AI/ML Platform Engineer", "12 - 18 LPA"),
        ("eval-comp-04", "company04@studylens.ai", "Recruiter - CyberShield Labs", "CyberShield Labs", "Enterprise Cybersecurity & DevSecOps", "Mumbai, MH", "https://cybershield.example.com", "9830000004", "Information Security Specialist", "9 - 13 LPA"),
        ("eval-comp-05", "company05@studylens.ai", "Recruiter - QuantumBit Solutions", "QuantumBit Solutions", "High Performance Computing & FinTech", "Gurugram, HR", "https://quantumbit.example.com", "9830000005", "Low Latency Backend Engineer", "14 - 20 LPA"),
    ]

    for uid, email, name, cname, ind, loc, site, phone, job_title, sal in comp_specs:
        if not db.query(User).filter(User.email == email).first():
            u = User(
                id=uid,
                email=email,
                hashed_password=hashed_pw,
                role="company",
                name=name,
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
                is_active=True
            )
            p = Profile(
                id=f"prof-{uid}",
                user_id=uid,
                company_name=cname,
                industry=ind,
                phone=phone,
                recruiter_role="Campus Talent Acquisition Lead",
                verified=True
            )
            db.add_all([u, p])
            db.flush()

            cp_id = f"cp-{uid}"
            if not db.query(CompanyProfile).filter(CompanyProfile.user_id == uid).first():
                db.add(CompanyProfile(
                    id=cp_id,
                    user_id=uid,
                    company_name=cname,
                    industry=ind,
                    website=site,
                    location=loc,
                    description=f"Verified technology partner offering tier-1 graduate career trajectories in {ind}.",
                    verification_status="Verified"
                ))

            # Add sample job posting
            j_id = f"job-{uid}"
            if not db.query(JobPosting).filter(JobPosting.id == j_id).first():
                db.add(JobPosting(
                    id=j_id,
                    company_id=uid,
                    company_name=cname,
                    title=job_title,
                    type="Full-time",
                    location=loc,
                    remote=False,
                    salary=sal,
                    deadline="2026-12-15",
                    required_skills_json=json.dumps(["Python", "SQL", "Git", "Docker"]),
                    preferred_skills_json=json.dumps(["FastAPI", "React", "Cloud Architecture"]),
                    experience="0-1 years",
                    description=f"Recruiting top performing student graduates for {job_title} at {cname}.",
                    openings=3,
                    status="Active"
                ))
    db.commit()

    # 5. 1 Platform Admin Account
    admin_email = "admin@studylens.ai"
    if not db.query(User).filter(User.email == admin_email).first():
        u = User(
            id="eval-adm-01",
            email=admin_email,
            hashed_password=hashed_pw,
            role="admin",
            name="Platform Administrator - Antigravity Root",
            avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            is_active=True
        )
        p = Profile(
            id="prof-eval-adm-01",
            user_id="eval-adm-01",
            college="Apex Consortium Administration",
            department="Academic Operations & Quality Assurance",
            phone="9899999999",
            verified=True
        )
        db.add_all([u, p])
        db.commit()

    print("SUCCESS: 20 Students, 10 Faculty, 10 Graduates, 5 Companies, and 1 Admin seeded/verified.")

if __name__ == "__main__":
    seed_database()
