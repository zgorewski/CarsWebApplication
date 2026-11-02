@echo off
cd /d "%~dp0"
where node >nul 2>nul || (echo Brak Node.js - zainstaluj wersje LTS z https://nodejs.org & start https://nodejs.org & pause & exit /b 1)
node -v
if not exist node_modules call npm install
echo API (json-server): http://localhost:3001/cars   Aplikacja: http://localhost:5173
call npm start
pause
