---

# Amin Diagnostics & Medical Services Web Application

A full-stack platform for booking doctor appointments and medical tests, built with **Next.js** (frontend), **Payload CMS** (backend, v3.44+), and **PostgreSQL**. Designed for scalable deployment on **Netlify** (frontend) and any cloud service for backend (Railway/Render/VPS).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
  - [Frontend (Netlify)](#frontend-netlify)
  - [Backend (Payload CMS)](#backend-payload-cms)
- [Environment Variables & Credentials](#environment-variables--credentials)
- [Database Setup](#database-setup)
- [Netlify Configuration](#netlify-configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Doctor directory with specialization & availability.
- Patient registration and authentication.
- Appointment scheduling & management.
- Medical test booking & result management.
- Admin dashboard for staff.
- Secure, modern UI (ShadCN/Tailwind).
- Fully headless CMS (Payload v3.44+).

---

## Tech Stack

- **Frontend:** Next.js (TypeScript, Tailwind CSS, ShadCN UI)
- **Backend:** Payload CMS (v3.44+), REST API
- **Database:** PostgreSQL
- **Deployment:** Netlify (Frontend), Railway/Render/VPS (Backend)

---

## Architecture

- `/frontend` – Next.js App (deployed on Netlify)
- `/backend` – Payload CMS (Node.js, deployed separately)
- **PostgreSQL** – single DB shared by backend
- **Frontend** communicates with backend via REST API

---

## Local Development

### Prerequisites

- [Node.js (18.x+)](https://nodejs.org/)
- [PostgreSQL (Latest)](https://www.postgresql.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/Ahmedzubairbd/Devops.git
cd Devops
```

### 2. Setup Database

Create a database and user:

```sql
-- Use psql or your favorite GUI
CREATE DATABASE amindb;
CREATE USER admin_user WITH ENCRYPTED PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE amindb TO admin_user;
```

### 3. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
# Payload CMS Server config
PAYLOAD_DATABASE_URI=postgres://admin_user:your_strong_password@localhost:5432/amindb
PAYLOAD_SECRET=your_payload_secret
SERVER_URL=http://localhost:3001
```

Install and start Payload:

```bash
npm install
npm run dev
```

Payload admin panel will be at `http://localhost:3001/admin`

### 4. Configure Frontend

```bash
cd ../frontend
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3001/api
```

Install and run:

```bash
npm install
npm run dev
```

Frontend will be at `http://localhost:3000`

---

## Production Deployment

### Frontend (Netlify)

1. **Push `frontend` to a separate repo or a subfolder build (Netlify supports monorepos).**
2. In Netlify dashboard:
   - Set **Build Command:** `npm run build`
   - Set **Publish directory:** `out` (for static) or `.next` (for SSR)
   - **Set Environment Variables:**
     - `NEXT_PUBLIC_PAYLOAD_API_URL=https://<your-backend-domain>/api`
   - **Enable Next.js Runtime or use Netlify Adapter if SSR is needed.**
3. **Deploy!**

### Frontend (Vercel)

1. **Import the repository on <https://vercel.com/new>** and select the project.
2. Keep the **root directory** as `./`.
3. Set **Build Command:** `npm run build`.
4. Set **Output Directory:** `.next` (Vercel uses this by default).
5. Add environment variable `NEXT_PUBLIC_PAYLOAD_API_URL` pointing to your deployed Payload backend.
6. Confirm the Node.js version (18+) in **Project Settings** if needed.
7. Click **Deploy** and wait for Vercel to build and host your app.

### Backend (Payload CMS)

- Deploy `/backend` to [Railway](https://railway.app/), [Render](https://render.com/), or your own VPS.
- Set environment variables in your deployment UI:
  - `PAYLOAD_DATABASE_URI`
  - `PAYLOAD_SECRET`
  - `SERVER_URL`
- Expose your backend at `https://<your-backend-domain>`

---

## Environment Variables & Credentials

### Backend (`backend/.env`):

| Variable             | Description                                                      |
| -------------------- | ---------------------------------------------------------------- |
| PAYLOAD_DATABASE_URI | PostgreSQL URI (see [Database Setup](#database-setup))           |
| PAYLOAD_SECRET       | Secret key for Payload CMS sessions                              |
| SERVER_URL           | Public URL of your backend (e.g. https://api.myhospitalsite.com) |

### Frontend (`frontend/.env.local`):

| Variable                    | Description                                                      |
| --------------------------- | ---------------------------------------------------------------- |
| NEXT_PUBLIC_PAYLOAD_API_URL | URL to Payload CMS API (e.g. https://api.myhospitalsite.com/api) |

**Do NOT use example credentials in production!**

---

## Database Setup

- **Database:** `amindb`
- **User:** `admin_user`
- **Password:** _choose a strong password_
- **Host:** `localhost` (change as needed for production)
- **Port:** `5432` (default)

---

## Netlify Configuration

If using a monorepo, set `base directory` to `frontend` and configure build settings accordingly.

For SSR, ensure Netlify Edge/SSR is enabled, or use the [Netlify Next.js Adapter](https://github.com/netlify/next-runtime).

---

## Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

**For questions or support, open an issue or contact the maintainer via GitHub.**

---

**Deploy and enjoy your full-stack hospital appointment system!**

---

**MCP Directive:**  
Maintain version control, use feature branches, and leverage GitHub Copilot for continuous improvement.

---

**End of README**
