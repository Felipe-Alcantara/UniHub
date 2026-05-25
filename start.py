#!/usr/bin/env python3
"""Install dependencies and start ATLETIZA (backend + frontend)."""

import os
import shutil
import subprocess
import sys
import signal
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BACKEND = ROOT / "backend"
FRONTEND = ROOT / "frontend"
VENV = BACKEND / ".venv"
VENV_PYTHON = VENV / ("Scripts/python.exe" if os.name == "nt" else "bin/python")


def run(cmd, cwd=None, env=None):
    print(f"\n> {' '.join(cmd)}")
    subprocess.run(cmd, cwd=cwd, check=True, env=env)


def ensure_env_file(directory):
    env_file = directory / ".env"
    example = directory / ".env.example"
    if not env_file.exists() and example.exists():
        shutil.copy(example, env_file)
        print(f"  Criado {env_file.relative_to(ROOT)}")


def find_python():
    """Return a Python command list that can create a working venv.

    Python 3.14 ships without ensurepip on some Windows installs, so prefer
    an explicit 3.13 via the py launcher when available.
    """
    major, minor = sys.version_info[:2]
    if major == 3 and minor >= 14:
        result = subprocess.run(["py", "-3.13", "--version"], capture_output=True)
        if result.returncode == 0:
            return ["py", "-3.13"]
    return [sys.executable]


def setup_backend():
    print("\n=== Backend ===")

    if not VENV.exists():
        print("Criando virtualenv...")
        run(find_python() + ["-m", "venv", str(VENV)])

    print("Instalando dependências...")
    run([str(VENV_PYTHON), "-m", "pip", "install", "-q", "-r", "requirements.txt"], cwd=BACKEND)

    ensure_env_file(BACKEND)

    print("Aplicando migrations...")
    run([str(VENV_PYTHON), "manage.py", "migrate", "--run-syncdb"], cwd=BACKEND)

    print("Populando dados demo...")
    run([str(VENV_PYTHON), "manage.py", "seed_demo"], cwd=BACKEND)


def setup_frontend():
    print("\n=== Frontend ===")

    npm = shutil.which("npm")
    if npm is None:
        print("ERRO: npm não encontrado. Instale o Node.js primeiro.")
        sys.exit(1)

    print("Instalando dependências...")
    run([npm, "install"], cwd=FRONTEND)

    ensure_env_file(FRONTEND)


def start():
    print("\n=== Iniciando servidores ===")
    npm = shutil.which("npm")

    backend_proc = subprocess.Popen(
        [str(VENV_PYTHON), "manage.py", "runserver", "8000"],
        cwd=BACKEND,
    )

    frontend_proc = subprocess.Popen(
        [npm, "run", "dev"],
        cwd=FRONTEND,
    )

    print("\n  Backend  -> http://localhost:8000")
    print("  Frontend -> http://localhost:3000")
    print("\n  Pressione Ctrl+C para parar.\n")

    def shutdown(sig, frame):
        print("\nEncerrando...")
        backend_proc.terminate()
        frontend_proc.terminate()
        backend_proc.wait()
        frontend_proc.wait()
        sys.exit(0)

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    while True:
        if backend_proc.poll() is not None or frontend_proc.poll() is not None:
            print("Um dos servidores parou inesperadamente.")
            shutdown(None, None)
        time.sleep(1)


if __name__ == "__main__":
    setup_backend()
    setup_frontend()
    start()
