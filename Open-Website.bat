@echo off
setlocal
cd /d "%~dp0"

echo Building website...
call npm run build
if errorlevel 1 (
  echo Build failed. Please check errors in this window.
  pause
  exit /b 1
)

start "" cmd /c "cd /d ""%~dp0"" && npm run preview -- --host 127.0.0.1 --port 4173"
timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:4173/"

echo Website opened at http://127.0.0.1:4173/
echo Close the preview server window when done.
