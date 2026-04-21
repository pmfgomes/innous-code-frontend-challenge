# Innuos Frontend Challenge - Playlist Application

This project is a React-based frontend application built for the Innuos frontend challenge. It features a music playlist and albums view where users can browse, search, and interact with tracks and albums.

## Tech Stack

The application is built with modern web technologies:
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router/latest) configured with file-based routing
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with shadcn/ui utility patterns (`clsx`, `tailwind-merge`)
- **Components:** [@base-ui/react](https://base-ui.com/) and [Lucide React](https://lucide.dev/) for icons
- **Search:** [Fuse.js](https://fusejs.io/) for fuzzy searching
- **Linting & Formatting:** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) & [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)

## Prerequisites

This project uses [Bun](https://bun.sh/) as its package manager and runtime context, though it should also be compatible with `npm`, `yarn`, or `pnpm`.

Please ensure you have [Bun](https://bun.sh/) installed:
```bash
curl -fsSL https://bun.sh/install | bash
```

## Getting Started

1. **Install dependencies:**
   ```bash
   bun install
   ```
   *(Alternatively, run `npm install` or `pnpm install` if you prefer).*

2. **Run the development server:**
   ```bash
   bun run dev
   ```
   This will start the Vite development server. You can open your browser to the URL printed in the terminal (usually `http://localhost:5173`).

3. **Build for production:**
   ```bash
   bun run build
   ```
   The production-ready files will be generated in the `dist/` directory.

4. **Lint and Format code:**
   - To lint the codebase: `bun run lint`
   - To format the codebase: `bun run fmt`

## Running with Docker (Alternative)

If you prefer not to install dependencies like Bun or Node.js on your local machine, you can run the project entirely inside a Docker container using Docker Compose.

1. **Ensure you have [Docker](https://docs.docker.com/get-docker/) installed and running.**
2. **Start the application:**
   ```bash
   docker compose up
   ```
   *(Add the `-d` flag if you want to run it in detached mode).*
3. Open your browser to `http://localhost:5173`.
   
   *Note: Hot Module Replacement (HMR) is supported inside the container, so your local changes will still reflect immediately.*

## Project Structure

- `src/components/`: Reusable UI components (buttons, badges, cards, etc.).
- `src/pages/`: Page-level components matching the application routes.
- `src/routes/`: TanStack Router file-based route definitions.
- `src/store/`: Redux Toolkit slices (e.g., `albums-slice.ts`, `playlist-slice.ts`) and global store configuration.
- `src/hooks/`: Custom React hooks, including `use-fuzzy-search.ts`.
- `public/` & `src/assets/`: Static assets, mock JSON data (`albums.json`, `playlist.json`), and images.

## Features

- **Playlist & Albums Views:** Browse the available music library.
- **Fuzzy Search:** Quickly find tracks or albums using Fuse.js.
- **Responsive Design:** Styled with Tailwind CSS for various screen sizes.
- **Modern Routing:** Fully type-safe routing using TanStack Router.

