from fastapi import APIRouter, status
from app.schemas.code import CodeExecutionRequest, CodeExecutionResponse
from app.services.code_runner import CodeExecutionService

router = APIRouter(prefix="/api/code", tags=["Coding Playground"])

@router.post("/execute", response_model=CodeExecutionResponse)
def execute_code(req: CodeExecutionRequest):
    """
    Executes user submitted code in a secure isolated subprocess.
    Supports Python, Java, and C with execution limits and real output/error streams.
    """
    result = CodeExecutionService.execute_code(
        language=req.language,
        code=req.code,
        stdin_input=req.stdin_input
    )
    return CodeExecutionResponse(
        language=result["language"],
        stdout=result["stdout"],
        stderr=result["stderr"],
        exit_code=result["exit_code"],
        execution_time_ms=result["execution_time_ms"],
        status=result["status"],
        service_configured=result["service_configured"]
    )
