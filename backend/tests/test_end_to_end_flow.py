import uuid
from app.database import SessionLocal
from app.models import User, Profile, StudentTask

def test_complete_student_lifecycle_e2e(client):
    """
    End-to-End Integration Flow:
    1. Register new student via /api/auth/register
    2. Confirm persistence in Supabase PostgreSQL
    3. Login via /api/auth/login and verify JWT authentication
    4. Fetch /api/student/dashboard with JWT
    5. Update profile via PUT /api/student/profile
    6. Confirm updated values in PostgreSQL
    7. Create, toggle, and delete a task
    8. Safe cleanup of test account
    """
    unique_suffix = uuid.uuid4().hex[:6]
    test_email = f"e2e.student.{unique_suffix}@apex.edu"
    test_password = "SecurePassword123!"
    test_name = f"E2E Student {unique_suffix}"

    # 1. Register
    reg_payload = {
        "email": test_email,
        "password": test_password,
        "name": test_name,
        "role": "student",
        "student_type": "Undergraduate",
        "college": "Apex Institute of Technology",
        "department": "Computer Science",
        "degree": "B.Tech",
        "branch": "Computer Science & Engineering",
        "year": 2,
        "semester": 4
    }
    reg_res = client.post("/api/auth/register", json=reg_payload)
    assert reg_res.status_code == 201
    reg_data = reg_res.json()
    token = reg_data["access_token"]
    user_id = reg_data["user"]["id"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Confirm in Supabase PostgreSQL
    db = SessionLocal()
    persisted_user = db.query(User).filter(User.id == user_id).first()
    assert persisted_user is not None
    assert persisted_user.email == test_email.lower()
    assert persisted_user.name == test_name
    assert persisted_user.profile.semester == 4
    db.close()

    # 3. Login
    login_res = client.post("/api/auth/login", json={
        "email": test_email,
        "password": test_password,
        "role": "student"
    })
    assert login_res.status_code == 200
    login_token = login_res.json()["access_token"]
    assert login_token is not None

    # 4. Fetch Dashboard
    dash_res = client.get("/api/student/dashboard", headers=headers)
    assert dash_res.status_code == 200
    dash_data = dash_res.json()
    assert dash_data["student_name"] == test_name
    assert dash_data["semester"] == 4
    assert dash_data["degree"] == "B.Tech"

    # 5. Update Profile
    update_res = client.put("/api/student/profile", json={
        "name": f"Updated {test_name}",
        "student_type": "Postgraduate",
        "semester": 5
    }, headers=headers)
    assert update_res.status_code == 200
    updated_data = update_res.json()
    assert updated_data["name"] == f"Updated {test_name}"
    assert updated_data["profile"]["student_type"] == "Postgraduate"
    assert updated_data["profile"]["semester"] == 5

    # 6. Confirm Profile update in Supabase PostgreSQL
    db2 = SessionLocal()
    refreshed_prof = db2.query(Profile).filter(Profile.user_id == user_id).first()
    assert refreshed_prof.student_type == "Postgraduate"
    assert refreshed_prof.semester == 5
    db2.close()

    # 7. Create, Toggle & Delete Task
    task_res = client.post("/api/student/tasks", json={
        "title": "E2E Integration Verification Task",
        "due_date": "2026-10-30",
        "priority": "high",
        "category": "Academic"
    }, headers=headers)
    assert task_res.status_code == 201
    task_id = task_res.json()["id"]

    # Toggle task
    toggle_res = client.patch(f"/api/student/tasks/{task_id}/toggle", headers=headers)
    assert toggle_res.status_code == 200
    assert toggle_res.json()["completed"] is True

    # Delete task
    del_res = client.delete(f"/api/student/tasks/{task_id}", headers=headers)
    assert del_res.status_code == 200

    # 8. Clean up test user & associated records
    clean_db = SessionLocal()
    u = clean_db.query(User).filter(User.id == user_id).first()
    if u:
        clean_db.delete(u)
        clean_db.commit()
    clean_db.close()
