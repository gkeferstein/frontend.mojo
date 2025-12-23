# frontend.mojo

Headless WordPress Frontend für mojo-institut.de

## Übersicht

Dieses Projekt stellt die WordPress-Seite von `https://mojo-institut.de` als Headless-Setup bereit:

- **WordPress** als Backend (REST API)
- **Next.js Frontend** (React), das die WordPress REST API nutzt
- **MySQL** als Datenbank (persistent als Volume)
- **Traefik** für serverseitiges Routing
- **Docker Compose** für Container-Orchestrierung

## Architektur

```
┌─────────────────┐
│   Traefik       │ (serverseitig, bereits vorhanden)
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│Frontend│ │WordPress│
│(Next.js)│ │(REST API)│
└───┬───┘ └──┬───────┘
    │        │
    └───┬────┘
        │
    ┌───▼────┐
    │  MySQL │
    │(Volume)│
    └────────┘
```

## Schnellstart

### Voraussetzungen

- Docker und Docker Compose installiert
- Traefik läuft auf dem Server
- Docker Network `mojo-frontend-network` existiert (wird automatisch erstellt)

### Lokale Entwicklung

1. **Repository klonen:**
   ```bash
   cd /root/projects/frontend.mojo
   ```

2. **Umgebungsvariablen konfigurieren:**
   ```bash
   cp .env.example .env
   # Bearbeite .env und setze Passwörter und Konfiguration
   ```

3. **Docker Network erstellen (falls nicht vorhanden):**
   ```bash
   docker network create mojo-frontend-network
   ```

4. **Container starten:**
   ```bash
   docker-compose up -d
   ```

5. **Status prüfen:**
   ```bash
   docker-compose ps
   curl http://localhost:46500/health
   ```

### Frontend lokal entwickeln

```bash
cd frontend
npm install
npm run dev
```

Frontend läuft dann auf `http://localhost:3000`

## Konfiguration

### Umgebungsvariablen (.env)

```bash
# WordPress Database
WORDPRESS_DB_HOST=db
WORDPRESS_DB_USER=wordpress
WORDPRESS_DB_PASSWORD=change_me
WORDPRESS_DB_NAME=wordpress
MYSQL_ROOT_PASSWORD=change_me_root

# WordPress Settings
WORDPRESS_DEBUG=0

# Frontend
NODE_ENV=production
WORDPRESS_API_URL=http://wordpress/wp-json
PORT=46500
```

### Port-Konfiguration

Siehe [docs/PORT.md](docs/PORT.md) für Details.

- **Frontend:** Port 46500
- **WordPress:** Port 46501 (intern)
- **MySQL:** Port 3306 (intern)

## WordPress Setup

Nach dem ersten Start:

1. **WordPress Admin öffnen:**
   - URL: `http://localhost:46501/wp-admin`
   - Oder über Traefik: `https://dev.frontend.mojo-institut.de/wp-admin`

2. **WordPress Installation abschließen:**
   - Admin-Benutzer erstellen
   - Permalinks konfigurieren (Settings → Permalinks → "Post name")

3. **REST API aktivieren:**
   - REST API ist standardmäßig aktiviert
   - Test: `http://localhost:46501/wp-json/wp/v2`

4. **Hauptseite erstellen/bearbeiten:**
   - Erstelle oder bearbeite die Hauptseite in WordPress
   - Das Frontend lädt automatisch die erste Seite (nach menu_order)

## Traefik Routing

Das Projekt nutzt serverseitiges Traefik-Routing:

- **Frontend:** `dev.frontend.mojo-institut.de`
- **WordPress API:** `dev.frontend.mojo-institut.de/wp-json`
- **WordPress Admin:** `dev.frontend.mojo-institut.de/wp-admin`

Traefik erkennt die Services automatisch über Docker Labels.

## Deployment

Das Projekt wird automatisch über GitHub Actions deployed, wenn Code nach `main` oder `develop` gepusht wird.

### CI/CD Pipeline

Die Pipeline führt automatisch aus:

1. **Test:** Frontend-Tests und Build
2. **Deploy:** 
   - SSH zum Server
   - Git Pull
   - Docker Compose Build & Up
   - Health Checks
3. **Smoke Tests:** Health-Checks für Frontend und API

### GitHub Secrets benötigt

- `DEPLOY_SERVER`: Server-IP oder Hostname
- `SSH_PRIVATE_KEY`: SSH-Key für Server-Zugriff

## Datenbank

Die MySQL-Datenbank wird als Docker Volume gespeichert:

- **Volume:** `frontend-db`
- **Persistenz:** Datenbank bleibt erhalten bei Container-Neustarts
- **Backup:** Volume kann für Backups genutzt werden

### Backup erstellen

```bash
docker exec frontend-mojo-db mysqldump -u root -p${MYSQL_ROOT_PASSWORD} wordpress > backup.sql
```

### Backup wiederherstellen

```bash
docker exec -i frontend-mojo-db mysql -u root -p${MYSQL_ROOT_PASSWORD} wordpress < backup.sql
```

## Troubleshooting

### Container starten nicht

```bash
# Logs prüfen
docker-compose logs

# Einzelne Services
docker-compose logs frontend
docker-compose logs wordpress
docker-compose logs db
```

### Frontend kann WordPress API nicht erreichen

1. Prüfe ob WordPress läuft:
   ```bash
   docker-compose ps wordpress
   curl http://localhost:46501/wp-json/wp/v2
   ```

2. Prüfe WORDPRESS_API_URL in .env:
   ```bash
   grep WORDPRESS_API_URL .env
   ```

3. Prüfe Docker Network:
   ```bash
   docker network inspect mojo-frontend-network
   ```

### Datenbank-Verbindungsfehler

1. Prüfe ob MySQL läuft:
   ```bash
   docker-compose ps db
   ```

2. Prüfe Datenbank-Credentials in .env

3. Prüfe MySQL Logs:
   ```bash
   docker-compose logs db
   ```

### Traefik Routing funktioniert nicht

1. Prüfe Docker Labels:
   ```bash
   docker inspect frontend-mojo-app | grep -A 20 Labels
   ```

2. Prüfe ob Container im richtigen Network sind:
   ```bash
   docker network inspect mojo-frontend-network
   ```

3. Prüfe Traefik Logs (auf dem Server)

## Entwicklung

### Frontend-Struktur

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # Hauptseite
│   │   ├── layout.tsx    # Root Layout
│   │   └── health/       # Health Check Endpoint
│   └── lib/
│       └── wordpress.ts  # WordPress API Client
├── Dockerfile            # Multi-Stage Build
└── package.json
```

### WordPress API Client

Der WordPress API Client (`src/lib/wordpress.ts`) bietet:

- `fetchWordPressPage(slug?)`: Lädt eine Seite (Standard: Hauptseite)
- `fetchWordPressPages()`: Lädt alle Seiten

### Neue Features hinzufügen

1. Frontend-Komponenten in `src/components/`
2. Neue Seiten in `src/app/`
3. API-Routen in `src/app/api/`

## Dokumentation

- Port-Konfiguration: [docs/PORT.md](docs/PORT.md)
- CI/CD Pipeline: [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml)

## Lizenz

MIT


