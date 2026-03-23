# React + TypeScript + Vite

## Getting Started

### Prerequisites

- **Node.js**: version 20.19+ or 22.12+

### Installation

To install the project dependencies, run:

```bash
npm install
```

### Running the Development Server

To start the local development server, run:

```bash
npm run dev
```

### Running the Backend Server

To start the backend server (Node.js + Express), run:

```bash
npm run backend-server
```

> [!IMPORTANT]
> The backend server **must be running** for the **Favourites** functionality to work. It handles the storage and retrieval of saved dog images.

### Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

### Known Limitations & Production Considerations

Some trade-offs were made for scope that would need attention in a production environment.

#### Authentication

- Authentication uses [DummyJSON](https://dummyjson.com/docs/auth), a mock API. There is no real user management, password hashing, or secure credential storage.
- Token refresh runs on a client-side interval timer that doesn't survive page refreshes or multiple tabs.

#### Favourites Backend

- Favourites are stored in a local JSON file (`favourites.json`) instead of a database. This doesn't scale, isn't concurrent-safe, and data would be lost in a containerised deployment.
- There is no user association, so favourites are global and shared across all sessions.
- The backend is a standalone Express server that must be run separately. In production this would be unified or deployed as its own service.

#### Testing

- Test coverage is limited to a few unit tests (`ErrorState`, `api-client`). A production app would benefit from integration tests, component tests for key user flows, and end-to-end tests.

#### Deployment

- The Vercel configuration proxies auth requests to DummyJSON but doesn't support the favourites backend, so that feature only works in local development.

#### Other

- No CI/CD pipeline.
- No error boundaries. A runtime error in a component could crash the entire app.
- Environment variables (API URLs, ports) are hardcoded rather than managed via `.env` files.

## Deployment

### Vercel

The frontend of this project is configured for easy deployment on [Vercel](https://vercel.com/).

1. **API Proxy**: The project uses a `vercel.json` file to proxy requests from `/api` to `https://dummyjson.com`.
2. **SPA Routing**: All non-asset requests are redirected to `index.html` to support client-side routing.
