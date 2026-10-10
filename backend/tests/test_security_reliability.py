import uuid
from app.database import SessionLocal
from app.models import User, StudentTask

def test_unauthenticated_access_rejected(client):
    """Verify endpoints reject unauthenticated requests with 401/403."""
    endpoints = [
        "/api/student/dashboard",
        "/api/faculty/dashboard",
        "/api/graduate/dashboard",
        "/api/company/dashboard",
        "/api/admin/dashboard",
        "/api/auth/me"
    ]
    for ep in endpoints:
        res = client.get(ep)
        assert res.status_code in (401, 403), f"Endpoint {ep} allowed unauthenticated access!"

def test_role_based_access_control(client, student_auth_headers, faculty_auth_headers):
    """Verify role authorization blocks cross-role privilege escalation."""
    # Student attempting Admin route
    res_admin = client.get("/api/admin/users", headers=student_auth_headers)
    assert res_admin.status_code == 403

    # Student attempting Company job creation
    res_job = client.post("/api/company/jobs", json={
        "title": "Unauthorized Job",
        "salary": "20 LPA",
        "deadline": "2026-12-01",
        "required_skills": ["Python"],
        "description": "Unauthorized"
    }, headers=student_auth_headers)
    assert res_job.status_code == 403

    # Faculty attempting Admin platform settings update
    res_setting = client.put("/api/admin/settings", json={
        "key": "test_key",
        "value": "hacked"
    }, headers=faculty_auth_headers)
    assert res_setting.status_code == 403

def test_idor_task_isolation(client, student_auth_headers):
    """Verify a user cannot modify or delete a task belonging to another user."""
    db = SessionLocal()
    # Create task belonging to a different user
    foreign_task = StudentTask(
        id=f"tsk-foreign-{uuid.uuid4().hex[:6]}",
        student_id="fac-101", # Different user ID
        title="Faculty Private Task",
        due_date="2026-10-15"
    )
    db.add(foreign_task)
    db.commit()
    task_id = foreign_task.id
    db.close()

    try:
        # Arav Sharma (student std-001) attempts to toggle faculty's task
        res_toggle = client.patch(f"/api/student/tasks/{task_id}/toggle", headers=student_auth_headers)
        assert res_toggle.status_code == 404  # Isolated, not found for this user

        # Attempt to delete faculty's task
        res_del = client.delete(f"/api/student/tasks/{task_id}", headers=student_auth_headers)
        assert res_del.status_code == 404
    finally:
        # Cleanup
        clean_db = SessionLocal()
        item = clean_db.query(StudentTask).filter(StudentTask.id == task_id).first()
        if item:
            clean_db.delete(item)
            clean_db.commit()
        clean_db.close()

def test_sql_injection_resilience(client):
    """Verify parameterized queries prevent SQL injection in login authentication."""
    malicious_inputs = [
        "' OR '1'='1",
        "admin@apex.edu' --",
        "admin@apex.edu' /*",
        "'; DROP TABLE users; --"
    ]
    for injection in malicious_inputs:
        res = client.post("/api/auth/login", json={
            "email": injection,
            "password": "random_password"
        })
        # Must return 401 or 422 (validation error on invalid email)
        assert res.status_code in (401, 422)

def test_passwords_are_securely_hashed():
    """Verify passwords are never stored in plaintext in the database."""
    db = SessionLocal()
    users = db.query(User).all()
    assert len(users) > 0
    for u in users:
        assert u.hashed_password != "password123"
        assert u.hashed_password.startswith("$2b$") or len(u.hashed_password) >= 40
    db.close()
