"""Compatibility entry point for the offline Chromium browser suite."""
from pathlib import Path
import subprocess

project = Path(__file__).resolve().parents[1]
raise SystemExit(subprocess.call(['node', 'tests/e2e.mjs'], cwd=project))
