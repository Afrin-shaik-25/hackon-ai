import shutil

def test_execute_python_valid(client):
    res = client.post("/api/code/execute", json={
        "language": "python",
        "code": "print(2 + 3)"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["exit_code"] == 0
    assert "5" in data["stdout"]
    assert data["status"] == "success"
    assert data["service_configured"] is True

def test_execute_python_with_stdin(client):
    res = client.post("/api/code/execute", json={
        "language": "python",
        "code": "name = input()\nprint(f'Hello {name}')",
        "stdin_input": "StudyLens"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["exit_code"] == 0
    assert "Hello StudyLens" in data["stdout"]

def test_execute_python_runtime_error(client):
    res = client.post("/api/code/execute", json={
        "language": "python",
        "code": "print(10 / 0)"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["exit_code"] != 0
    assert "ZeroDivisionError" in data["stderr"]
    assert data["status"] == "runtime_error"

def test_execute_java_valid_if_available(client):
    if shutil.which("javac") and shutil.which("java"):
        code = """public class Main {
            public static void main(String[] args) {
                System.out.println("Hello from Java");
            }
        }"""
        res = client.post("/api/code/execute", json={
            "language": "java",
            "code": code
        })
        assert res.status_code == 200
        data = res.json()
        assert data["exit_code"] == 0
        assert "Hello from Java" in data["stdout"]
        assert data["status"] == "success"

def test_execute_java_compilation_error_if_available(client):
    if shutil.which("javac"):
        code = "public class Main { broken_syntax }"
        res = client.post("/api/code/execute", json={
            "language": "java",
            "code": code
        })
        assert res.status_code == 200
        data = res.json()
        assert data["exit_code"] != 0
        assert data["status"] == "compilation_error"
        assert len(data["stderr"]) > 0

def test_execute_c_compiler_status(client):
    c_compiler = shutil.which("gcc") or shutil.which("clang")
    code = """#include <stdio.h>
    int main() {
        printf("Hello from C\\n");
        return 0;
    }"""
    res = client.post("/api/code/execute", json={
        "language": "c",
        "code": code
    })
    assert res.status_code == 200
    data = res.json()
    if c_compiler:
        assert data["exit_code"] == 0
        assert "Hello from C" in data["stdout"]
        assert data["status"] == "success"
    else:
        # Explicit service unavailable without faking results
        assert data["service_configured"] is False
        assert data["status"] == "service_unavailable"
        assert "not configured" in data["stderr"] or "not installed" in data["stderr"]
