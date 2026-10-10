import uuid

def test_student_login_success(client):
    res = client.post("/api/auth/login", json={
        "email": "arav.sharma@apex.edu",
        "password": "password123",
        "role": "student"
    })
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["role"] == "student"
    assert data["user"]["name"] == "Arav Sharma"
    assert data["user"]["profile"]["degree"] == "B.Tech"
    assert data["user"]["profile"]["semester"] == 5

def test_login_wrong_password(client):
    res = client.post("/api/auth/login", json={
        "email": "arav.sharma@apex.edu",
        "password": "wrong_password",
        "role": "student"
    })
    assert res.status_code == 401
    assert "Invalid institutional email or password" in res.json()["detail"]

def test_student_registration_flow(client):
    random_email = f"student_{uuid.uuid4().hex[:6]}@apex.edu"
    res = client.post("/api/auth/register", json={
        "email": random_email,
        "password": "secretpassword",
        "name": "Pooja Hegde",
        "role": "student",
        "student_type": "Undergraduate",
        "college": "Apex Institute of Technology",
        "degree": "B.Tech",
        "branch": "Computer Science & Engineering",
        "year": 2,
        "semester": 4
    })
    assert res.status_code == 201
    data = res.json()
    assert data["role"] == "student"
    assert data["user"]["name"] == "Pooja Hegde"
    assert data["user"]["profile"]["year"] == 2
    assert data["user"]["profile"]["semester"] == 4

def test_duplicate_registration_rejected(client):
    res = client.post("/api/auth/register", json={
        "email": "arav.sharma@apex.edu",
        "password": "newpassword123",
        "name": "Duplicate Arav",
        "role": "student"
    })
    assert res.status_code == 400
    assert "already registered" in res.json()["detail"]

def test_get_me_authenticated(client, student_auth_headers):
    res = client.get("/api/auth/me", headers=student_auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert data["email"] == "arav.sharma@apex.edu"
    assert data["role"] == "student"

def test_unauthenticated_request_rejected(client):
    res = client.get("/api/student/dashboard")
    assert res.status_code == 401
