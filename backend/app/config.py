import os
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./studylens.db"
    DIRECT_URL: Optional[str] = None
    SECRET_KEY: str = "studylens_secret_dev_key_2026_jwt_token_auth"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"
    CODE_SANDBOX_TIMEOUT_SECONDS: int = 5
    CODE_SANDBOX_MAX_OUTPUT_BYTES: int = 65536
    DEMO_DATA_ENABLED: bool = True

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    @staticmethod
    def _normalize_db_url(raw_url: Optional[str]) -> str:
        if not raw_url:
            return "sqlite:///./studylens.db"
        
        # SQLite URLs do not require PostgreSQL normalization
        if raw_url.startswith("sqlite"):
            return raw_url

        try:
            from sqlalchemy.engine.url import make_url
            url = make_url(raw_url)
            query = dict(url.query)
            # Remove pgbouncer flag which is unsupported by libpq / psycopg2 DSN
            query.pop("pgbouncer", None)
            # Ensure SSL is requested for remote cloud hosts like Supabase
            if url.host and url.host not in ("localhost", "127.0.0.1"):
                query.setdefault("sslmode", "require")
            
            driver = "postgresql+psycopg2" if url.drivername in ("postgres", "postgresql", "postgresql+psycopg2") else url.drivername
            return url.set(drivername=driver, query=query).render_as_string(hide_password=False)
        except Exception:
            # Safe string fallback
            clean_url = raw_url
            if "?" in clean_url:
                base, q = clean_url.split("?", 1)
                params = [p for p in q.split("&") if not p.startswith("pgbouncer=")]
                clean_url = base + ("?" + "&".join(params) if params else "")
            if clean_url.startswith("postgres://"):
                clean_url = clean_url.replace("postgres://", "postgresql+psycopg2://", 1)
            elif clean_url.startswith("postgresql://") and not clean_url.startswith("postgresql+"):
                clean_url = clean_url.replace("postgresql://", "postgresql+psycopg2://", 1)
            return clean_url

    @property
    def sqlalchemy_database_url(self) -> str:
        return self._normalize_db_url(self.DATABASE_URL)

    @property
    def sqlalchemy_direct_url(self) -> str:
        return self._normalize_db_url(self.DIRECT_URL or self.DATABASE_URL)

settings = Settings()
