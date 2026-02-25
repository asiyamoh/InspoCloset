# InspoCloset

InspoCloset is a web application built for designers and boutiques to organize, search, and manage private inspiration libraries.

The platform was created to streamline the creative workflow during client consultations by enabling fast, tag-based search and structured browsing. It focuses on improving collaboration, organization, and efficiency within design teams.

## Demo

Coming soon. A live demo will be added once the application is fully polished and publicly accessible.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router
- React Query
- Headless UI
- React Hook Form
- Zod

### Backend
- NestJS
- Prisma
- Supabase
- PostgreSQL (via Supabase)

### Deployment
- Vercel

### Other
- Sharp (image processing)
- Multer (file uploads)

## Installation

This project requires running both the frontend and API in separate terminals.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/inspoCloset.git
cd inspoCloset
```

### 2. Frontend Setup (Root Folder)

Install dependencies:
```bash
npm install
```

Create a `.env` file in the root directory and add:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=your_backend_url
```

Start the frontend:
```bash
npm run dev
```

### 3. API Setup (Backend Folder)

Open a second terminal:
```bash
cd api
npm install
```

Create a `.env` file in the backend folder and add:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_postgresql_connection_string
```

Generate the Prisma client:
```bash
npx prisma generate
```

Run migrations (if needed):
```bash
npx prisma migrate dev
```

Start the API:
```bash
npm run start:dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_SUPABASE_URL | Supabase project URL (frontend) |
| VITE_SUPABASE_ANON_KEY | Supabase anonymous key (frontend) |
| VITE_API_URL | Backend API URL |
| SUPABASE_URL | Supabase project URL (backend) |
| SUPABASE_ANON_KEY | Supabase anonymous key (backend) |
| DATABASE_URL | PostgreSQL connection string |

## What I Learned

- Building and deploying a full-stack application with a modern TypeScript-based stack
- Structuring a scalable frontend with React, TanStack Router, and React Query
- Managing authentication and database logic with Supabase and Prisma
- Designing tag-based search systems for real-world workflow efficiency
- Handling file uploads and image processing on the backend
- Coordinating frontend and backend communication across environments

## Challenges

- Authentication flow complexity — currently resolving a bug in the auth system
- Designing intuitive user flows for designers and boutiques
- Frontend styling consistency and visual hierarchy
- Balancing flexibility in tagging with structured data design

## Future Improvements

- Improve overall UI styling and design system consistency
- Fix and fully stabilize the authentication bug
- Expand access to allow brides to create accounts and use the platform
- Improve role-based access control and permissions
