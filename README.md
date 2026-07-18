# Nadoumi Portal - Frontend Application

The frontend client portal for **Nadoumi**, an educational consulting platform connecting international students with prestigious scholarships and academic programs in China.

## Tech Stack

* **Framework**: [Next.js 16.2.6](https://nextjs.org/) (App Router & React 19)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Data Fetching & Caching**: [TanStack React Query v5](https://tanstack.com/query/latest)
* **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod Validation](https://zod.dev/)
* **Icons & UI Assets**: [Lucide React](https://lucide.dev/)
* **Alerts & Toast Messages**: [React Hot Toast](https://react-hot-toast.com/)

## Features

* **Scholarship Exploration**: Rich landing page, robust search/filtering options, and details view for fully-funded/partial scholarships.
* **Student Dashboard**: Track and manage active applications, monitor application timelines, view interview parameters, download admission letters/JW202 forms, and communicate.
* **Admin Workspace**: Complete management interface for applications, university profiles, and scholarship catalog. Includes:
  * Application audit trails and status logs.
  * Modal interface to schedule interviews, reject, or revoke applications with rich metadata.
  * PDF document uploading.
* **Dynamic SEO**: High-performance Server-Side Rendering (SSR) for scholarship routes.

## Implemented Best Practices

### 1. React Server Components (RSC) & SEO Optimization
* **Server-Side Rendered Routes**: Detail routes like `app/scholarships/[id]/page.tsx` fetch data server-side, enabling fast initial page load times and letting Google search crawlers index content immediately.
* **Dynamic Metadata**: Leverages Next.js `generateMetadata()` on dynamic routes to dynamically write semantic, page-specific search keywords, title elements, and descriptions.

### 2. Layout Shift & Flash Prevention
* **TanStack Query Hydration**: The scholarship client components accept pre-fetched `initialData` from Server Components as props. This is passed directly into React Query's `initialData` option, preventing loading-state layout flashes and empty spinners during page transitions.

### 3. Edge-Level Router Guards
* **Next.js 16 Edge Proxy**: User session authentication and dashboard routing guards are handled at the Edge network layer via the new Next.js 16 `proxy.ts` routing proxy convention. Guest users attempting to reach private dashboard locations are immediately intercepted and redirected to `/login` before download of page assets.

### 4. Highly Componentized Design
* Layout, design system, and business logic are cleanly decoupled:
  * UI widgets (Button, Modal, Input, Badge) are located in the global `components/ui/` folder.
  * Module-specific features (e.g. applications table, filter components) are encapsulated in sub-feature directories.

## Getting Started

### 1. Configure the Environment
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
```

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Start Development Server
Run the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
Generate the optimized production static compilation bundle:
```bash
npm run build
```
The compiler utilizes Turbopack optimization to bundle files for maximum performance.
