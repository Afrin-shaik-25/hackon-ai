import uuid
import pytest
from datetime import datetime
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from app.database import SessionLocal, engine
from app.config import settings
from app.models import (
    User, Profile, College, Subject, StudentEnrollment,
    StudentTask, StudentBacklog, JobPosting, JobApplication
)

def test_database_is_real_postgresql():
    """Verify that the application connects to Supabase PostgreSQL and not local SQLite."""
    with engine.connect() as conn:
        db_version = conn.execute(text("SELECT version();")).fetchone()[0]
        assert "PostgreSQL" in db_version
        assert "SQLite" not in db_version
        assert ":6543" in settings.DATABASE_URL or ":5432" in settings.DATABASE_URL

def test_transaction_rollback_on_failure():
    """Verify that transactions roll back completely when an operation fails."""
    db = SessionLocal()
    unique_email = f"rollback-test-{uuid.uuid4().hex[:6]}@apex.edu"
    test_id = f"test-usr-{uuid.uuid4().hex[:6]}"
    
    try:
        # Step 1: Add a valid user
        user = User(
            id=test_id,
            email=unique_email,
            hashed_password="hashed_pw",
            role="student",
            name="Rollback Test"
        )
        db.add(user)
        db.flush()

        # Step 2: Intentionally execute an invalid SQL statement to trigger exception
        db.execute(text("INSERT INTO non_existent_table VALUES (1)"))
        db.commit()
    except Exception:
        db.rollback()
    finally:
        # Check that the user was NOT saved due to rollback
        db_check = SessionLocal()
        found = db_check.query(User).filter(User.id == test_id).first()
        db_check.close()
        db.close()
        assert found is None, "Failed transaction was not properly rolled back!"

def test_foreign_key_referential_integrity():
    """Verify PostgreSQL rejects invalid foreign keys."""
    db = SessionLocal()
    invalid_task = StudentTask(
        id=f"tsk-inv-{uuid.uuid4().hex[:6]}",
        student_id="non-existent-user-id-99999",
        title="Invalid Task",
        due_date="2026-10-15"
    )
    db.add(invalid_task)
    with pytest.raises(IntegrityError):
        db.commit()
    db.rollback()
    db.close()

def test_unique_constraint_email():
    """Verify PostgreSQL rejects duplicate user emails."""
    db = SessionLocal()
    unique_email = f"dup-test-{uuid.uuid4().hex[:6]}@apex.edu"
    u1 = User(
        id=f"u1-{uuid.uuid4().hex[:6]}",
        email=unique_email,
        hashed_password="pw1",
        role="student",
        name="User One"
    )
    u2 = User(
        id=f"u2-{uuid.uuid4().hex[:6]}",
        email=unique_email,
        hashed_password="pw2",
        role="student",
        name="User Two"
    )
    db.add(u1)
    db.commit()

    db.add(u2)
    with pytest.raises(IntegrityError):
        db.commit()
    db.rollback()

    # Clean up u1
    db.delete(u1)
    db.commit()
    db.close()

def test_crud_persistence_and_cleanup():
    """Verify CRUD persistence: create, retrieve, update, delete with real commit."""
    db = SessionLocal()
    task_id = f"tsk-crud-{uuid.uuid4().hex[:6]}"
    
    # 1. Create task for existing student std-001
    task = StudentTask(
        id=task_id,
        student_id="std-001",
        title="CRUD Test Task",
        description="Testing live persistence",
        due_date="2026-10-20",
        priority="high",
        category="Academic",
        completed=False
    )
    db.add(task)
    db.commit()

    # 2. Retrieve in a fresh session
    fresh_db = SessionLocal()
    saved = fresh_db.query(StudentTask).filter(StudentTask.id == task_id).first()
    assert saved is not None
    assert saved.title == "CRUD Test Task"
    assert saved.completed is False

    # 3. Update
    saved.completed = True
    fresh_db.commit()

    # 4. Verify update
    fresh_db.refresh(saved)
    assert saved.completed is True

    # 5. Delete & clean up
    fresh_db.delete(saved)
    fresh_db.commit()
    assert fresh_db.query(StudentTask).filter(StudentTask.id == task_id).first() is None

    fresh_db.close()
    db.close()
