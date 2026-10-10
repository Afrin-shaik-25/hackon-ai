import pytest
import os
import sys

# Ensure backend directory is in python path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from app.main import app
from app.database import engine, Base, SessionLocal
from app.seed import seed_database

@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    seed_database()
    yield

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def student_auth_headers(client):
    res = client.post("/api/auth/login", json={
        "email": "arav.sharma@apex.edu",
        "password": "password123",
        "role": "student"
    })
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

@pytest.fixture
def faculty_auth_headers(client):
    res = client.post("/api/auth/login", json={
        "email": "k.raman@apex.edu",
        "password": "password123",
        "role": "faculty"
    })
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

@pytest.fixture
def graduate_auth_headers(client):
    res = client.post("/api/auth/login", json={
        "email": "sneha.m@graduate.example.com",
        "password": "password123",
        "role": "graduate"
    })
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

@pytest.fixture
def company_auth_headers(client):
    res = client.post("/api/auth/login", json={
        "email": "recruitment@nexatech.example.com",
        "password": "password123",
        "role": "company"
    })
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

@pytest.fixture
def admin_auth_headers(client):
    res = client.post("/api/auth/login", json={
        "email": "admin@studylens.ai",
        "password": "password123",
        "role": "admin"
    })
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
