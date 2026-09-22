# Run commands

Use one method at a time: both use **http://localhost:8080**.

Run these commands from the project root, the directory containing `docker-compose.yml` and the `client` and `server` folders.

## With Docker

Run from a terminal:

```bash
sudo docker compose up --build --wait --wait-timeout 180
```

Docker runs the frontend, API, Redis, and Nginx together in the background. The project already has `.env`; for a new copy, create it with `test -f .env || cp .env.example .env` before starting.

Stop:

```bash
sudo docker compose down
```

## Without Docker — local development

Requires Node.js 22+ and a local Redis server. The frontend and backend reload when source files change. Next.js forwards `/api/*` and `/health/*` to the API on port 4000 in development; no local Nginx installation is needed.

### One-time setup

```bash
sudo apt update
sudo apt install -y redis-server
npm --prefix server ci --registry=https://registry.npmjs.org
npm --prefix client ci --registry=https://registry.npmjs.org
```

### Each time you run the project

If the Docker version is running, stop it with the Docker stop command above to release port 8080.

Terminal 1 — start Redis and the backend:

```bash
sudo systemctl start redis-server
REDIS_URL=redis://127.0.0.1:6379 npm --prefix server run dev
```

Terminal 2 — start the frontend:

```bash
npm --prefix client run dev -- --hostname 127.0.0.1 --port 8080
```

Open **http://localhost:8080**. Keep both terminals running. Press **Ctrl+C** in each to stop the frontend and backend. Redis continues as a system service; if it is only used by this project, you can stop it with `sudo systemctl stop redis-server`.

These local commands use the API's default settings, including port 4000, origin `http://localhost:8080`, and disabled newsletter integration. The root `.env` configures Docker Compose and is not automatically loaded by the backend's `dev` script. Supply any other local API settings as environment variables in Terminal 1.

## Check either running setup

From the project directory, in another terminal:

```bash
curl http://localhost:8080/health/ready
node scripts/smoke.mjs
```

The smoke script checks readiness, Redis caching, checkout totals, and API validation. For status and logs when using Docker, run `sudo docker compose ps` and `sudo docker compose logs --tail=100`.
