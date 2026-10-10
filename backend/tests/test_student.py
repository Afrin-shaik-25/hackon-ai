def test_student_dashboard(client, student_auth_headers):
    res = client.get("/api/student/dashboard", headers=student_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert data["student_name"] == "Arav Sharma"
    assert data["semester"] == 5
    assert len(data["enrolled_subjects"]) == 5
    assert data["active_backlogs_count"] == 1
    assert "Grade A+" in data["academic_indicator"]
    assert "Regular" in data["attendance_indicator"]
    assert len(data["upcoming_exams"]) >= 1

def test_semester_subjects_filtering(client, student_auth_headers):
    # Test Semester 5
    res5 = client.get("/api/student/subjects?semester=5", headers=student_auth_headers)
    assert res5.status_code == 200
    sem5_codes = [s["code"] for s in res5.json()]
    assert "CS501" in sem5_codes
    assert "CS502" in sem5_codes

    # Test Semester 4 (Must NOT be Semester 5 or Semester 1 defaults!)
    res4 = client.get("/api/student/subjects?semester=4", headers=student_auth_headers)
    assert res4.status_code == 200
    sem4_codes = [s["code"] for s in res4.json()]
    assert "CS401" in sem4_codes
    assert "CS402" in sem4_codes
    assert "CS501" not in sem4_codes

    # Test Semester 3
    res3 = client.get("/api/student/subjects?semester=3", headers=student_auth_headers)
    assert res3.status_code == 200
    sem3_codes = [s["code"] for s in res3.json()]
    assert "CS301" in sem3_codes
    assert "CS302" in sem3_codes

    # Test Semester 1
    res1 = client.get("/api/student/subjects?semester=1", headers=student_auth_headers)
    assert res1.status_code == 200
    sem1_codes = [s["code"] for s in res1.json()]
    assert "CS101" in sem1_codes
    assert "CS102" in sem1_codes

def test_student_backlogs_record(client, student_auth_headers):
    res = client.get("/api/student/backlogs", headers=student_auth_headers)
    assert res.status_code == 200
    backlogs = res.json()
    assert len(backlogs) >= 1
    assert backlogs[0]["subject_code"] == "CS302"
    assert backlogs[0]["originating_semester"] == 3
    assert backlogs[0]["status"] == "Active"

def test_student_tasks_crud(client, student_auth_headers):
    # 1. Create task
    create_res = client.post("/api/student/tasks", json={
        "title": "Solve 5 LeetCode Graph Problems",
        "due_date": "2026-10-15",
        "priority": "high",
        "category": "Academic"
    }, headers=student_auth_headers)
    assert create_res.status_code == 201
    task = create_res.json()
    task_id = task["id"]
    assert task["completed"] is False

    # 2. Toggle task
    toggle_res = client.patch(f"/api/student/tasks/{task_id}/toggle", headers=student_auth_headers)
    assert toggle_res.status_code == 200
    assert toggle_res.json()["completed"] is True

    # 3. Delete task
    del_res = client.delete(f"/api/student/tasks/{task_id}", headers=student_auth_headers)
    assert del_res.status_code == 200

def test_student_upcoming_exams(client, student_auth_headers):
    res = client.get("/api/student/exams", headers=student_auth_headers)
    assert res.status_code == 200
    exams = res.json()
    assert len(exams) >= 3
    for exam in exams:
        assert "days_remaining" in exam
        assert exam["days_remaining"] >= 0
        assert len(exam["notifications"]) > 0  # 5-day daily morning reminders prepared

def test_student_academics_year_and_semester_filtering(client, student_auth_headers):
    # Test semester 5 filter
    res = client.get("/api/student/academics?semester=5", headers=student_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 1
    for item in data:
        assert item["semester"] == 5

    # Test academic year filter
    res_year = client.get("/api/student/academics?academic_year=2025-2026", headers=student_auth_headers)
    assert res_year.status_code == 200
    assert len(res_year.json()) >= 1

def test_student_attendance_and_assessments(client, student_auth_headers):
    res_att = client.get("/api/student/attendance", headers=student_auth_headers)
    assert res_att.status_code == 200
    assert len(res_att.json()) >= 1

    res_ass = client.get("/api/student/assessments", headers=student_auth_headers)
    assert res_ass.status_code == 200
    assert len(res_ass.json()) >= 1

def test_student_focus_log(client, student_auth_headers):
    res = client.post("/api/student/focus", json={
        "duration_minutes": 45,
        "target_task": "Algorithm Study"
    }, headers=student_auth_headers)
    assert res.status_code == 200
    assert res.json()["duration_minutes"] == 45
