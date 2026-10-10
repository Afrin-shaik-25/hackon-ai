from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from sqlalchemy.pool import NullPool
from app.config import settings

def is_postgresql_url(url: str) -> bool:
    return any(url.startswith(prefix) for prefix in ("postgresql", "postgres"))

def create_db_engine():
    db_url = settings.sqlalchemy_database_url
    if is_postgresql_url(db_url):
        # When using PostgreSQL, particularly with Supabase's transaction-mode pooler (port 6543):
        # We disable client-side pooling with NullPool so that connections are cleanly managed
        # by the upstream PgBouncer transaction pooler without connection leaks or stale sessions.
        return create_engine(
            db_url,
            poolclass=NullPool,
            pool_pre_ping=True,
            connect_args={"connect_timeout": 15}
        )
    else:
        # SQLite local development
        return create_engine(
            db_url,
            connect_args={"check_same_thread": False},
            pool_pre_ping=True
        )

engine = create_db_engine()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
