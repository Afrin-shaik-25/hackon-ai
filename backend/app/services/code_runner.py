import os
import sys
import time
import shutil
import tempfile
import subprocess
from typing import Optional, Dict, Any
from app.config import settings

class CodeExecutionService:
    @staticmethod
    def is_compiler_available(language: str) -> bool:
        lang = language.lower()
        if lang == "python":
            return bool(sys.executable and os.path.exists(sys.executable))
        elif lang == "java":
            return bool(shutil.which("javac") and shutil.which("java"))
        elif lang == "c":
            return bool(shutil.which("gcc") or shutil.which("clang"))
        return False

    @classmethod
    def execute_code(
        cls,
        language: str,
        code: str,
        stdin_input: Optional[str] = None
    ) -> Dict[str, Any]:
        lang = language.lower()
        if not cls.is_compiler_available(lang):
            compiler_name = "gcc" if lang == "c" else "javac/java" if lang == "java" else "python"
            return {
                "language": lang,
                "stdout": "",
                "stderr": f"Code execution service not configured for {lang.upper()}. Required toolchain '{compiler_name}' is not installed on the server.",
                "exit_code": -1,
                "execution_time_ms": 0,
                "status": "service_unavailable",
                "service_configured": False
            }

        start_time = time.time()
        timeout = settings.CODE_SANDBOX_TIMEOUT_SECONDS
        max_bytes = settings.CODE_SANDBOX_MAX_OUTPUT_BYTES

        with tempfile.TemporaryDirectory() as temp_dir:
            try:
                if lang == "python":
                    script_path = os.path.join(temp_dir, "script.py")
                    with open(script_path, "w", encoding="utf-8") as f:
                        f.write(code)

                    cmd = [sys.executable, "-u", "-I", script_path]
                    proc = subprocess.Popen(
                        cmd,
                        stdin=subprocess.PIPE if stdin_input else None,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.PIPE,
                        cwd=temp_dir,
                        text=True,
                        encoding="utf-8",
                        errors="replace"
                    )

                    try:
                        stdout, stderr = proc.communicate(
                            input=stdin_input if stdin_input else None,
                            timeout=timeout
                        )
                    except subprocess.TimeoutExpired:
                        proc.kill()
                        return {
                            "language": lang,
                            "stdout": "",
                            "stderr": f"Execution timed out after {timeout} seconds.",
                            "exit_code": -1,
                            "execution_time_ms": int((time.time() - start_time) * 1000),
                            "status": "timeout",
                            "service_configured": True
                        }

                    exec_time = int((time.time() - start_time) * 1000)
                    status_str = "success" if proc.returncode == 0 else "runtime_error"

                    return {
                        "language": lang,
                        "stdout": (stdout or "")[:max_bytes],
                        "stderr": (stderr or "")[:max_bytes],
                        "exit_code": proc.returncode,
                        "execution_time_ms": exec_time,
                        "status": status_str,
                        "service_configured": True
                    }

                elif lang == "java":
                    java_file = os.path.join(temp_dir, "Main.java")
                    with open(java_file, "w", encoding="utf-8") as f:
                        f.write(code)

                    # Step 1: Compile
                    javac_path = shutil.which("javac")
                    compile_proc = subprocess.run(
                        [javac_path, "Main.java"],
                        capture_output=True,
                        text=True,
                        cwd=temp_dir,
                        timeout=timeout,
                        encoding="utf-8",
                        errors="replace"
                    )

                    if compile_proc.returncode != 0:
                        return {
                            "language": lang,
                            "stdout": "",
                            "stderr": compile_proc.stderr[:max_bytes],
                            "exit_code": compile_proc.returncode,
                            "execution_time_ms": int((time.time() - start_time) * 1000),
                            "status": "compilation_error",
                            "service_configured": True
                        }

                    # Step 2: Run
                    java_path = shutil.which("java")
                    cmd = [java_path, "-Xmx128m", "Main"]
                    proc = subprocess.Popen(
                        cmd,
                        stdin=subprocess.PIPE if stdin_input else None,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.PIPE,
                        cwd=temp_dir,
                        text=True,
                        encoding="utf-8",
                        errors="replace"
                    )

                    try:
                        stdout, stderr = proc.communicate(
                            input=stdin_input if stdin_input else None,
                            timeout=timeout
                        )
                    except subprocess.TimeoutExpired:
                        proc.kill()
                        return {
                            "language": lang,
                            "stdout": "",
                            "stderr": f"Execution timed out after {timeout} seconds.",
                            "exit_code": -1,
                            "execution_time_ms": int((time.time() - start_time) * 1000),
                            "status": "timeout",
                            "service_configured": True
                        }

                    exec_time = int((time.time() - start_time) * 1000)
                    status_str = "success" if proc.returncode == 0 else "runtime_error"

                    return {
                        "language": lang,
                        "stdout": (stdout or "")[:max_bytes],
                        "stderr": (stderr or "")[:max_bytes],
                        "exit_code": proc.returncode,
                        "execution_time_ms": exec_time,
                        "status": status_str,
                        "service_configured": True
                    }

                elif lang == "c":
                    c_compiler = shutil.which("gcc") or shutil.which("clang")
                    source_file = os.path.join(temp_dir, "main.c")
                    binary_name = "main.exe" if sys.platform == "win32" else "main"
                    binary_path = os.path.join(temp_dir, binary_name)

                    with open(source_file, "w", encoding="utf-8") as f:
                        f.write(code)

                    # Step 1: Compile
                    compile_proc = subprocess.run(
                        [c_compiler, "-O2", "main.c", "-o", binary_name],
                        capture_output=True,
                        text=True,
                        cwd=temp_dir,
                        timeout=timeout,
                        encoding="utf-8",
                        errors="replace"
                    )

                    if compile_proc.returncode != 0:
                        return {
                            "language": lang,
                            "stdout": "",
                            "stderr": compile_proc.stderr[:max_bytes],
                            "exit_code": compile_proc.returncode,
                            "execution_time_ms": int((time.time() - start_time) * 1000),
                            "status": "compilation_error",
                            "service_configured": True
                        }

                    # Step 2: Run
                    proc = subprocess.Popen(
                        [binary_path],
                        stdin=subprocess.PIPE if stdin_input else None,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.PIPE,
                        cwd=temp_dir,
                        text=True,
                        encoding="utf-8",
                        errors="replace"
                    )

                    try:
                        stdout, stderr = proc.communicate(
                            input=stdin_input if stdin_input else None,
                            timeout=timeout
                        )
                    except subprocess.TimeoutExpired:
                        proc.kill()
                        return {
                            "language": lang,
                            "stdout": "",
                            "stderr": f"Execution timed out after {timeout} seconds.",
                            "exit_code": -1,
                            "execution_time_ms": int((time.time() - start_time) * 1000),
                            "status": "timeout",
                            "service_configured": True
                        }

                    exec_time = int((time.time() - start_time) * 1000)
                    status_str = "success" if proc.returncode == 0 else "runtime_error"

                    return {
                        "language": lang,
                        "stdout": (stdout or "")[:max_bytes],
                        "stderr": (stderr or "")[:max_bytes],
                        "exit_code": proc.returncode,
                        "execution_time_ms": exec_time,
                        "status": status_str,
                        "service_configured": True
                    }

                else:
                    return {
                        "language": lang,
                        "stdout": "",
                        "stderr": f"Unsupported language '{language}'. Supported: python, java, c",
                        "exit_code": -1,
                        "execution_time_ms": 0,
                        "status": "service_unavailable",
                        "service_configured": False
                    }

            except Exception as e:
                return {
                    "language": lang,
                    "stdout": "",
                    "stderr": f"Execution environment error: {str(e)}",
                    "exit_code": -1,
                    "execution_time_ms": int((time.time() - start_time) * 1000),
                    "status": "runtime_error",
                    "service_configured": True
                }
