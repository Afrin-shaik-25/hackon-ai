from typing import Optional
from pydantic import BaseModel

class CodeExecutionRequest(BaseModel):
    language: str  # python, java, c
    code: str
    stdin_input: Optional[str] = None

class CodeExecutionResponse(BaseModel):
    language: str
    stdout: str
    stderr: str
    exit_code: int
    execution_time_ms: int
    status: str  # success, compilation_error, runtime_error, timeout, service_unavailable
    service_configured: bool
