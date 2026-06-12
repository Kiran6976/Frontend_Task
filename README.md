# App Graph Builder

A modern, responsive **App Graph Builder** UI built with React, Vite, Tailwind CSS, TypeScript, ReactFlow (xyflow), Zustand, and TanStack Query. It allows users to visualize, select, configure, and manage service topologies (API, Database, Cache, Worker nodes) across different applications.

*   🔗 **GitHub Repository**: [https://github.com/Kiran6976/Frontend_Task.git](https://github.com/Kiran6976/Frontend_Task.git)
*   🌐 **Live Demo (Vercel)**: [https://frontend-task-liart-six.vercel.app/](https://frontend-task-liart-six.vercel.app/)

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have **Node.js** (v18.x or later) and **npm** installed on your system.

### ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kiran6976/Frontend_Task.git
   cd reactflow-canvas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the displayed URL (typically `http://localhost:5173`).

---

## 🛠️ Available Scripts

In the project directory, you can run:

*   `npm run dev`: Starts the local Vite development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles TypeScript and builds the production-ready bundle into the `dist` directory.
*   `npm run preview`: Starts a local server to preview the production build.
*   `npm run lint`: Runs ESLint to check for code quality and syntax issues.
*   `npm run typecheck`: Runs the TypeScript compiler (`tsc`) in no-emit mode to verify types.

---

## 🎯 Key Architectural Decisions

1. **Zustand for UI & Graph State Management**
   *   **Separation of Concerns**: UI states (selected app, selected node, mobile drawer visibility, active inspector tab) are stored in `appStore`. ReactFlow node and edge states are stored in `graphStore`.
   *   **Minimal Render Footprint**: Zustand selectors ensure components only re-render when their specific slices of state change, preventing unnecessary renders.
   *   **Real-time Node Modifications**: Updates made in the inspector are instantly persisted directly to the selected node's `data` block, which reacts in real-time.

2. **TanStack Query for Data Fetching & Cache Management**
   *   **Automatic Cache Invalidation**: Query results are cached and refetched automatically when the selected `appId` changes. Toggling the "Mock Error" switch invalidates the cache and forces a reload to demonstrate error boundaries.
   *   **Simulated Latency**: API endpoints simulate standard network latencies (500ms–650ms) to trigger smooth loading skeletons and status spinners.

3. **Tailored Styling Accents by Service Kind (Bonus)**
   *   To create a premium feel, nodes and inspector layouts are dynamically styled based on their kind:
       *   **API Node**: Violet left border and subtle violet icon container.
       *   **Database Node**: Cyan left border and subtle cyan icon container.
       *   **Cache Node**: Amber left border and subtle amber icon container.
       *   **Worker Node**: Emerald left border and subtle emerald icon container.

4. **Synchronized Numeric Slider & Input**
   *   The inspector provides synced inputs for CPU budgets. Both the Slider component and the Numeric Input are linked to the same reactive source, and user inputs are automatically clamped between 0 and 100 to ensure data integrity.

---

## ⌨️ Keyboard Shortcuts

*   Press **`F`** or **`f`**: Fits the canvas layout centered on the screen (`fitView`).
*   Press **`P`** or **`p`**: Toggles the visibility of the left Application list panel.
*   Press **`Delete`** or **`Backspace`**: Deletes the selected service node (including all connected edges).

*Note: Keyboard shortcuts are automatically ignored when you are actively typing inside input fields, textareas, or content-editable areas to prevent input collision.*

---

## ⚠️ Known Limitations

1. **State Persistence**: The mock database is held in memory. Creating new service nodes or modifying existing attributes will reset back to the mock defaults if the browser window is reloaded.
2. **Auto-layout**: When creating new service nodes, their default layout position is determined using a simple linear offset. In production, an auto-layout library (e.g., ELK or dagre) would be used to place nodes dynamically.

---

## 🌐 Deployment Settings (Vercel)

This project is deployed to **Vercel** with the following build configurations:
*   **Framework Preset**: `Vite`
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
