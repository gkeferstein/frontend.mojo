# Port-Konfiguration

**Projekt:** frontend.mojo  
**Port:** 46500  
**URL:** http://116.203.109.90/frontend.mojo/  
**Status:** ⚠️ Muss gestartet werden

## Service-Details

| Service | Port | Typ | Beschreibung |
|---------|------|-----|-------------|
| **Frontend** | 46500 | Docker | Next.js Frontend (Headless WordPress) |
| **WordPress** | 46501 | Docker | WordPress REST API (intern) |
| **MySQL** | 3306 | Docker | Datenbank (intern) |

## Lokaler Zugriff

```bash
# Frontend
curl http://localhost:46500/

# WordPress API (intern)
curl http://localhost:46501/wp-json/wp/v2/pages
```

## Öffentlicher Zugriff

- **Frontend:** http://116.203.109.90/frontend.mojo/
- **WordPress API:** http://116.203.109.90/frontend.mojo/wp-json/

## Traefik Routing

Das Projekt nutzt serverseitiges Traefik-Routing:
- **Frontend:** `dev.frontend.mojo-institut.de`
- **WordPress API:** `dev.frontend.mojo-institut.de/wp-json`

## Start-Befehle

```bash
# Projekt starten
cd /root/projects/frontend.mojo
docker-compose up -d

# Status prüfen
docker-compose ps
curl http://localhost:46500/health
```

## nginx-Konfiguration

Die nginx-Konfiguration wird automatisch generiert basierend auf dieser Datei.

**Zuletzt aktualisiert:** $(date +%Y-%m-%d)


