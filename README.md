# Sycamore Data Fetching Assessment

A user directory implementation fetching data from JSONPlaceholder, built with Nuxt 4 and Tailwind CSS v4.

## ⚡ Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/brainiacerudite/sycamore-test-integration.git
cd sycamore-test-integration

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

## 🏗️ Architecture & Decisions

### 1. Logic Extraction (`composables/useUsers.ts`)

I moved the fetching logic out of `index.vue` and into a composable.

**Why**: It separates the "Business Logic" (fetching, error handling, state derivation) from the "Presentation."

**Benefit**: The UI component stays dumb and focused only on rendering the current state.

### 2. Data Strategy (`useFetch`)

Used Nuxt's built-in `useFetch` instead of axios or native fetch.

- **Reactivity**: It gives us `status`, `error`, and `data` refs out of the box.
- **Performance**: Enabled `{ lazy: true }` so navigation isn't blocked by network requests. The skeleton loader handles the visual transition.

### 3. State Management

I explicitly handle 4 distinct UI states to prevent "layout shift" or confusion:

- **Loading**: Skeleton UI (matches the card layout).
- **Error**: Retry button (calls `refresh()`).
- **Empty**: Specific check for `length === 0`.
- **Success**: The grid view.

**Added Bonus**: I implemented a client-side Search Filter to make the UI feel interactive, rather than just dumping a static list of 10 users.

### 4. Styling (Tailwind 4)

Configured Tailwind CSS v4 using the Vite plugin (`@tailwindcss/vite`).

**Why**: It's faster and requires zero configuration compared to v3.

### 5. Type Safety

Defined a strict `User` interface in `types/index.ts`.

**Why**: To safely access nested properties like `user.company.name` without TypeScript shouting or runtime errors.
