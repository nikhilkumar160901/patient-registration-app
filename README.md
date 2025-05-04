# Patient Registration App (Frontend-only)

A simple, frontend-only patient registration system built with React, TypeScript, and PGlite (PostgreSQL in the browser). The app persists data using IndexedDB and supports real-time multi-tab synchronization using the BroadcastChannel API.

---

## 🚀 Features

- Register patients with name, age, gender, and contact
- View patient records in a table
- Data stored persistently in browser using IndexedDB
- Multi-tab synchronization using BroadcastChannel API

---

## 📦 Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [PGlite (ElectricSQL)](https://electric-sql.dev/docs/pglite)
- Native `BroadcastChannel` API

---

## 🛠 Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/nikhilkumar160901/patient-registration-app.git
   cd patient-registration-app
   npm install
   npm run dev

Test multi-tab support
- Open multiple browser tabs
- Register a patient in one tab
- See the new entry instantly appear in the others
   

---

## ❗ Known Limitations
- No backend or authentication
- Data is per-browser only (no cross-device sync)

---

## ⚠️ Challenges Faced

- **Persistence with PGlite:** Data did not persist across refreshes initially due to using `DROP TABLE IF EXISTS` on every load. Fix: Removed table drop and used `CREATE TABLE IF NOT EXISTS`.

- **Multi-tab sync issues:** While using a shared DB instance (`db`), other tabs fetched stale data. Solution: Each tab now re-initializes its own `PGlite` instance before querying.

- **BroadcastChannel edge cases:** The `BroadcastChannel` was closed too early or shared incorrectly across components, which caused silent failures. Fix: Created per-component channels and handled cleanup properly.

