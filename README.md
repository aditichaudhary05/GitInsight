# GitInsight

GitInsight is a GitHub profile analytics dashboard. Enter a GitHub username to explore repositories, language usage, activity, achievements, profile completeness, repository health, and tailored insights.

## Features

- GitHub username search with an invalid-user recovery screen
- Overview dashboard with repository highlights, productivity, language distribution, health metrics, and smart insights
- Repository explorer with search, sorting, filtering, and export controls
- Language analytics and primary-stack breakdown
- Achievement progress and unlocked achievements
- Profile information, completeness score, and shared smart insights
- Responsive layouts for desktop, tablet, and mobile

## Tech stack

- Frontend: React, Vite, Recharts, Lucide React
- Backend: Node.js, Express, Axios
- Data source: GitHub REST API

## Prerequisites

- Node.js 18 or later
- npm
- A GitHub personal access token is recommended to avoid low unauthenticated API rate limits

## Getting started

1. Clone the repository and open the project folder.

2. Configure the backend environment file at `backend/.env`:

   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   PORT=5000
   ```

3. Install and start the backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. In a second terminal, install and start the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Frontend configuration

Optional variables can be set in `frontend/.env`:

```env
VITE_GITHUB_USERNAME=octocat
VITE_API_BASE_URL=http://localhost:5000
# Optional: override the overview endpoint. Use :username as the placeholder.
VITE_OVERVIEW_API_URL=http://localhost:5000/api/overview/:username
```

Without `VITE_GITHUB_USERNAME`, the app searches `octocat` by default.

## API endpoints

The backend exposes the following username-based endpoints:

| Endpoint | Purpose |
| --- | --- |
| `GET /api/overview/:username` | Dashboard summary, highlights, activity, health, languages, and insights |
| `GET /api/repositories/:username` | Repository list and repository analytics |
| `GET /api/languages/:username` | Language distribution and trends |
| `GET /api/achievements/:username` | Achievement progress and earned badges |
| `GET /api/profile/:username` | GitHub profile details |

## Scripts

### Frontend

```bash
cd frontend
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build
```

### Backend

```bash
cd backend
npm run dev   # Start with Nodemon
npm start     # Start with Node.js
```

## Project structure

```text
Gitinsight/
├── frontend/        # React dashboard
│   └── src/
├── backend/         # Express API and GitHub data services
│   └── src/
└── README.md
```

## Notes

- Never commit `backend/.env` or a GitHub token.
- GitHub API availability and rate limits can affect data loading.
