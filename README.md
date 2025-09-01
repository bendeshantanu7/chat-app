# Chat App

Simple real-time chat application (client + server).
- Client: Vite + React + TypeScript
- Server: Express + TypeScript, Supabase (Postgres) for auth/meta, MongoDB for message persistence, Socket.IO for realtime

---

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (URI)
- Supabase project (URL + anon/service key)

---

## Required environment variables

Server (`/server/.env`)
- MONGO_URL=<your mongodb connection string>
- MONGO_DB=chatapp (optional; defaults used in code)
- PORT=3000 (optional)
- JWT_SECRET=<your jwt secret>
- SUPABASE_URL=<your supabase url>
- SUPABASE_ANON_KEY=<your supabase anon key> (or service key depending on operations)

Client (`/client/.env`)
- VITE_SUPABASE_URL=<your supabase url> (if used by client)
- VITE_SUPABASE_KEY=<your supabase anon key>
- VITE_API_URL=http://localhost:3000 (if client calls server endpoints directly)

---

## Install & run

Server
1. cd server
2. npm install
3. npm run dev
   - uses nodemon + ts-node (hot reload)

Client
1. cd client
2. npm install
3. npm run dev

Production
- Build client: `npm run build` in client
- Build server: `npm run build` in server then `npm start`

---

## Notes / Troubleshooting

- MongoNotConnectedError
  - Ensure `MONGO_URL` is set.
  - Ensure `run()` in `server/src/mongo.ts` returns a connected MongoClient and does not close it.
  - Restart server after changes.

- Supabase RLS (error 42501)
  - If RLS is enabled, add appropriate policies for `users` and `conversations` (SELECT / INSERT) or use authenticated requests.
  - Example quick policy for reads:
    ```
    CREATE POLICY "Allow read" ON public.users FOR SELECT USING (true);
    ```

- Conversation validation & caching
  - Server caches validated conversation IDs in memory. For multi-instance deployments use Redis or DB-based cache.

---

## Project layout (important files)
- server/src/index.ts — entry, socket.io handlers
- server/src/mongo.ts — mongo client connection
- server/src/controllers/messageController.ts — validate conversation & insert to Mongo
- server/src/controllers/signup-controller.ts — user signup (Supabase)
- client/src/components/Sidebar.tsx — sidebar / user list
- client/src/routes/__root.tsx — root layout (header/sidebar conditional rendering)

---

If you want, I can:
- Add npm scripts to root for running both client + server concurrently
- Add a sample `.env.example` for both client and server
- Add graceful shutdown to Mongo
