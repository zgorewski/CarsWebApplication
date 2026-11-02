#!/bin/bash
# Dwuklik w Finderze: instaluje zależności (za 1. razem) i uruchamia json-server + aplikację React.
cd "$(dirname "$0")"
export PATH="$PATH:/usr/local/bin:/opt/homebrew/bin"

if ! command -v node >/dev/null 2>&1; then
  echo "Brak Node.js. Zainstaluj wersję LTS (22 lub nowszą): https://nodejs.org"
  open "https://nodejs.org"
  read -n 1 -s -r -p "Po instalacji uruchom ten plik ponownie. Nacisnij dowolny klawisz..."
  exit 1
fi

echo "Node: $(node -v)"
[ -d node_modules ] || npm install
echo "API (json-server): http://localhost:3001/cars   Aplikacja: http://localhost:5173   (Ctrl+C zatrzymuje)"
npm start
