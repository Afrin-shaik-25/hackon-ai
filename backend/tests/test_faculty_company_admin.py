import io

def test_faculty_dashboard(client, faculty_auth_headers):
    res = client.get("/api/faculty/dashboard", headers=faculty_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert data["faculty_name"] == "Dr. K. Raman"
    assert len(data["assigned_classes"]) >= 2
    assert "cohort_distribution" in data
    assert len(data["students_requiring_support"]) >= 1

def test_faculty_import_validation(client, faculty_auth_headers):
    csv_content = b"studentId,subjectCode,marks\n2023CS101,CS501,92\n2023CS102,CS501,85\ninvalid_row_here\n"
    file = ("grades.csv", io.BytesIO(csv_content), "text/csv")
    res = client.post(
        "/api/faculty/import?source=academics",
        files={"file": file},
        headers=faculty_auth_headers
    )
    assert res.status_code == 200
    data = res.json()
    assert data["totalRows"] == 3
    assert data["acceptedRows"] == 2
    assert data["rejectedRows"] == 1
    assert len(data["rejectedDetails"]) == 1

def test_graduate_dashboard_and_resume(client, graduate_auth_headers):
    res = client.get("/api/graduate/dashboard", headers=graduate_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert data["graduate_name"] == "Sneha Mukherjee"
    assert data["ats_score"] >= 80

    # Resume update
    update_res = client.put("/api/graduate/resume", json={
        "title": "Cloud & AI Platform Engineer",
        "skills": ["Python", "FastAPI", "Docker", "Kubernetes", "PostgreSQL", "React", "TypeScript"]
    }, headers=graduate_auth_headers)
    assert update_res.status_code == 200
    assert update_res.json()["title"] == "Cloud & AI Platform Engineer"

def test_company_dashboard_and_jobs(client, company_auth_headers):
    res = client.get("/api/company/dashboard", headers=company_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert data["company_name"] == "NexaTech Systems"
    assert data["active_jobs_count"] >= 1

    # Candidate discovery
    cand_res = client.get("/api/company/candidates", headers=company_auth_headers)
    assert cand_res.status_code == 200
    assert len(cand_res.json()) >= 1

def test_admin_rbac_and_dashboard(client, admin_auth_headers, student_auth_headers):
    # 1. Student attempting to access admin dashboard -> 403 Forbidden
    unauthorized_res = client.get("/api/admin/dashboard", headers=student_auth_headers)
    assert unauthorized_res.status_code == 403

    # 2. Admin accessing admin dashboard -> 200 OK
    res = client.get("/api/admin/dashboard", headers=admin_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_users"] >= 5
    assert len(data["recent_audit_logs"]) >= 1

def test_admin_settings_update(client, admin_auth_headers):
    res = client.put("/api/admin/settings", json={
        "key": "exam_reminder_days",
        "value": "5",
        "description": "5-day daily morning countdown threshold"
    }, headers=admin_auth_headers)
    assert res.status_code == 200
    assert res.json()["value"] == "5"
