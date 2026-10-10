import json

def test_student_endpoints_schema_contract(client, student_auth_headers):
    """Verify all Student API endpoints return valid response schemas matching frontend expectations."""
    # 1. Dashboard
    res = client.get("/api/student/dashboard", headers=student_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert "student_name" in data
    assert "semester" in data
    assert "enrolled_subjects" in data
    assert "upcoming_exams" in data

    # 2. Profile
    res = client.get("/api/student/profile", headers=student_auth_headers)
    assert res.status_code == 200
    prof = res.json()
    assert "email" in prof
    assert "profile" in prof

    # 3. Academics
    res = client.get("/api/student/academics", headers=student_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 4. Backlogs
    res = client.get("/api/student/backlogs", headers=student_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 5. Subjects
    res = client.get("/api/student/subjects?semester=5", headers=student_auth_headers)
    assert res.status_code == 200
    subjects = res.json()
    assert isinstance(subjects, list)
    if subjects:
        assert "units" in subjects[0]
        assert "notes" in subjects[0]
        assert "video_lectures" in subjects[0]

    # 6. Attendance
    res = client.get("/api/student/attendance", headers=student_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 7. Assessments
    res = client.get("/api/student/assessments", headers=student_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 8. Tasks
    res = client.get("/api/student/tasks", headers=student_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 9. Exams
    res = client.get("/api/student/exams", headers=student_auth_headers)
    assert res.status_code == 200
    exams = res.json()
    assert isinstance(exams, list)
    if exams:
        assert "notifications" in exams[0]
        assert "days_remaining" in exams[0]

def test_faculty_endpoints_schema_contract(client, faculty_auth_headers):
    """Verify Faculty API endpoints match frontend schemas."""
    # 1. Dashboard
    res = client.get("/api/faculty/dashboard", headers=faculty_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert "faculty_name" in data
    assert "assigned_classes" in data
    assert "students_requiring_support" in data

    # 2. Classes
    res = client.get("/api/faculty/classes", headers=faculty_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 3. Students
    res = client.get("/api/faculty/students", headers=faculty_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 4. Interventions
    res = client.get("/api/faculty/interventions", headers=faculty_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

def test_graduate_endpoints_schema_contract(client, graduate_auth_headers):
    """Verify Graduate API endpoints match frontend schemas."""
    # 1. Dashboard
    res = client.get("/api/graduate/dashboard", headers=graduate_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert "graduate_name" in data
    assert "ats_score" in data
    assert "aptitude_tests_passed" in data
    assert "recent_jobs" in data

    # 2. Resume
    res = client.get("/api/graduate/resume", headers=graduate_auth_headers)
    assert res.status_code == 200
    resume = res.json()
    assert "ats_score" in resume
    assert "skills" in resume

    # 3. Jobs
    res = client.get("/api/graduate/jobs", headers=graduate_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 4. Applications
    res = client.get("/api/graduate/applications", headers=graduate_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

def test_company_endpoints_schema_contract(client, company_auth_headers):
    """Verify Company API endpoints match frontend schemas."""
    # 1. Dashboard
    res = client.get("/api/company/dashboard", headers=company_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert "company_name" in data
    assert "verification_status" in data
    assert "active_jobs_count" in data

    # 2. Jobs
    res = client.get("/api/company/jobs", headers=company_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 3. Candidates
    res = client.get("/api/company/candidates", headers=company_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 4. Applications
    res = client.get("/api/company/applications", headers=company_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

def test_admin_endpoints_schema_contract(client, admin_auth_headers):
    """Verify Platform Admin API endpoints match frontend schemas."""
    # 1. Dashboard
    res = client.get("/api/admin/dashboard", headers=admin_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert "total_users" in data
    assert "colleges_count" in data
    assert "recent_audit_logs" in data

    # 2. Users
    res = client.get("/api/admin/users", headers=admin_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 3. Colleges
    res = client.get("/api/admin/colleges", headers=admin_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 4. Verifications
    res = client.get("/api/admin/verifications", headers=admin_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 5. Audit logs
    res = client.get("/api/admin/audit-logs", headers=admin_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # 6. Settings
    res = client.get("/api/admin/settings", headers=admin_auth_headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)
