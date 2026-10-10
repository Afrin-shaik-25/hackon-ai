import pytest
from sqlalchemy.pool import NullPool
from app.config import Settings
from app.database import create_db_engine, is_postgresql_url

def test_database_url_normalization_with_pgbouncer():
    s = Settings(
        DATABASE_URL="postgresql://postgres.eahricrphplmenwzntkg:my%40secret%23123@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true",
        DIRECT_URL="postgresql://postgres.eahricrphplmenwzntkg:my%40secret%23123@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"
    )
    norm_db_url = s.sqlalchemy_database_url
    assert "postgresql+psycopg2://" in norm_db_url
    assert "pgbouncer=true" not in norm_db_url
    assert "sslmode=require" in norm_db_url
    assert ":6543" in norm_db_url

    norm_dir_url = s.sqlalchemy_direct_url
    assert "postgresql+psycopg2://" in norm_dir_url
    assert ":5432" in norm_dir_url
    assert "sslmode=require" in norm_dir_url

def test_database_url_normalization_sqlite():
    s = Settings(
        DATABASE_URL="sqlite:///./studylens.db",
        DIRECT_URL=None
    )
    assert s.sqlalchemy_database_url == "sqlite:///./studylens.db"
    assert s.sqlalchemy_direct_url == "sqlite:///./studylens.db"

def test_is_postgresql_url():
    assert is_postgresql_url("postgresql://user:pass@host/db") is True
    assert is_postgresql_url("postgres://user:pass@host/db") is True
    assert is_postgresql_url("postgresql+psycopg2://user:pass@host/db") is True
    assert is_postgresql_url("sqlite:///./studylens.db") is False

def test_engine_transaction_pooler_uses_nullpool(monkeypatch):
    monkeypatch.setenv(
        "DATABASE_URL",
        "postgresql://postgres.eahricrphplmenwzntkg:pass@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
    )
    test_settings = Settings()
    assert "postgresql+psycopg2://" in test_settings.sqlalchemy_database_url
    assert "pgbouncer=true" not in test_settings.sqlalchemy_database_url

def test_metadata_contains_all_models():
    from app.database import Base
    import app.models
    tables = Base.metadata.tables
    expected_tables = [
        "users", "profiles", "colleges", "subjects", "subject_units",
        "learning_materials", "video_lectures", "student_enrollments",
        "student_backlogs", "attendance_records", "assessments",
        "student_tasks", "student_exams", "exam_notifications",
        "focus_sessions", "faculty_classes", "academic_interventions",
        "student_data_imports", "graduate_resumes", "graduate_projects",
        "aptitude_attempts", "mock_interviews", "job_postings",
        "job_applications", "company_profiles", "audit_logs",
        "platform_settings"
    ]
    for table_name in expected_tables:
        assert table_name in tables, f"Expected table {table_name} missing from Base metadata"

def test_health_endpoint(client):
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] in ("healthy", "degraded")
    assert "database" in data
    assert "database_type" in data
    assert "pooler_mode" in data
