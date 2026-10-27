#!/bin/bash
# Dwuklik w Finderze uruchamia API (macOS).
cd "$(dirname "$0")"
export PATH="$PATH:/usr/local/share/dotnet:$HOME/.dotnet"

if ! command -v dotnet >/dev/null 2>&1 || ! dotnet --list-sdks | grep -qE '^(9|1[0-9])\.'; then
  echo "Brak .NET SDK 9 (lub nowszego)."
  echo "Pobierz instalator macOS Arm64: https://dotnet.microsoft.com/download/dotnet/9.0"
  open "https://dotnet.microsoft.com/download/dotnet/9.0"
  read -n 1 -s -r -p "Po instalacji uruchom ten plik ponownie. Nacisnij dowolny klawisz..."
  exit 1
fi

echo "SDK: $(dotnet --version)"
echo "Startuje API... Swagger: http://localhost:5050/swagger  (Ctrl+C zatrzymuje)"
dotnet run --project Cars.API --launch-profile http
