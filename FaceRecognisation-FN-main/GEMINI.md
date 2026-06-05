# GEMINI.md - FaceRecognisation-FN Project Context

## Project Overview
**FaceRecognisation-FN** is a comprehensive, enterprise-grade attendance and user management system built with Next.js. The core feature is biometric facial recognition for attendance tracking, supported by a structured administrative hierarchy for organizations and users.

### Key Technologies
- **Framework**: Next.js (App Router)
- **Face Recognition**: `face-api.js` (TensorFlow.js) with models in `/public/models`
- **State Management**: Redux with Redux Thunk
- **Backend/Hosting**: Firebase
- **Styling**: Tailwind CSS v4 & PostCSS
- **Testing**: Vitest & React Testing Library
- **API Client**: Axios with global request/response interceptors

### Architecture
1.  **Routes**: Organized under `src/app/`, using the `(dashboard)` group for authenticated areas.
2.  **Handlers**: Business logic and API interactions are abstracted into `src/handlers/` (e.g., `OrgOnboardingHandler.jsx`).
3.  **Services**: Core API utilities are in `src/lib/`, specifically `ApiServiceFunctions.js` for execution and `ApiServiceEndpoint.js` for routing.
4.  **Components**: Shared UI elements (Sidebar, Header) and Providers (Auth, Redux) are in `src/components/`.

---

## Building and Running

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Generates a static production build (exported to `/out`). |
| `npm run test` | Executes unit tests using Vitest. |
| `npm run lint` | Runs ESLint to check for code quality and style issues. |
| `npm run start` | Serves the production build (if not exported). |

---

## Development Conventions

### 1. API Management
- **Endpoints**: Always define new API paths in `src/lib/ApiServiceEndpoint.js`.
- **Environment Variables**: Use `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_SSO_API_URL` in `.env.local` for environment-specific URLs.
- **Interceptors**: The `ApiService` in `src/lib/ApiServiceFunctions.js` automatically handles Bearer token injection from local storage.

### 2. File Naming & Structure
- **Handlers**: Use `PascalCase` for handler files (e.g., `UserRegistrationHandler.jsx`).
- **Components**: Shared UI components should reside in `src/components/` with `PascalCase`.
- **Pages**: Use the Next.js App Router convention (`page.jsx` inside feature folders).

### 3. Styling
- **Tailwind CSS**: Preferred for layout and standard UI elements.
- **Custom CSS**: Specific module styles are located in `src/styles/` (e.g., `dashboard.css`).

### 4. Testing
- **Location**: Test files should be placed in `src/__tests__/` following the directory structure of the target file.
- **Framework**: Use `Vitest` for mocking and assertions.

---

## Important File Paths
- `src/lib/ApiServiceEndpoint.js`: Source of truth for all backend routes.
- `src/handlers/`: Contains all modular business logic.
- `public/models/`: Essential weights for the face detection engine.
- `src/components/tokenStorage.jsx`: Utility for managing SSO access tokens.
