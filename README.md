# Modern Kanban Board 🚀

A robust, Jira-style task management application built with **React** and **TypeScript**.  
Designed to demonstrate modern frontend architecture, complex state management, and high-performance drag-and-drop interactions.

- 🔗 **Live Demo:** [Click Here](https://phraewchuthamat.github.io/task-board-react/)
- 📂 **Repository:** [Github Repo](https://github.com/phraewchuthamat/task-board-react.git)

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite)

---

## ✨ Key Features

### 🎯 Core Functionality
- **Drag & Drop:** Fully interactive board using `@dnd-kit`. Supports **reordering** tasks within columns and **moving** tasks between columns with smooth animations.
- **CRUD Operations:** Create, Read, Update, and Delete tasks with real-time UI updates.
- **Search & Filter:** Instant search by title/description and filter by priority (Low, Medium, High).

### 🎨 User Experience (UX)
- **Jira-like Layout:** Fixed viewport height with independent internal scrolling for columns and horizontal scrolling for the board.
- **Snap Scrolling:** CSS Scroll Snap implementation for a native-app feel on touch devices.
- **Dark/Light Mode:** System-aware theme switching with persistent preference.
- **Internationalization (i18n):** Instant language switching (English/Thai) without page reload using React Context.
- **Responsive Design:** Mobile-first approach, optimized for phones, tablets, and desktops.

### 💾 Data Persistence
- **Backend API:** Task and column data is persisted via RESTful API with JWT authentication.
- **Local Storage:** Theme and language preferences are stored locally for instant loading.

---

## 🛠️ Technical Highlights (Why I built it this way)

### 1. Architecture & State Management
- **Context API + useReducer:** Implemented a centralized state management system (`TaskContext`) to handle complex logic separately from UI components.
- **Custom Hooks:** Logic is abstracted into reusable hooks like `useBoardDrag`, `useTaskModal`, and `useLanguage` to maintain **Separation of Concerns**.

### 2. TypeScript Integration
- Fully typed codebase (Interfaces for `Task`, `Column`, `Priority`).
- Strict type checking to prevent runtime errors and improve code maintainability.

### 3. Performance Optimization
- **React.memo:** Used on `TaskCard` and `TaskColumn` to prevent unnecessary re-renders during drag operations.
- **Event Delegation:** Optimized touch/click sensors in `dnd-kit` to handle conflict between dragging and button clicking (e.g., Delete button on card).

### 4. Accessibility & Polish
- **Accessible Colors:** High contrast colors for text and badges.
- **Confirm Dialogs:** Defensive UX design to prevent accidental data loss.

---

## 💻 Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Headless UI, Material-UI
- **Drag & Drop:** @dnd-kit (Core, Sortable, Utilities)
- **HTTP Client:** Axios
- **Icons:** Heroicons
- **Tools:** ESLint, Prettier

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Docker & Docker Compose

---

## 📂 Project Structure

```bash
src/
├── assets/           # Static resources
├── components/       # UI Components
│   ├── AlertPopup/   # Alert/Notification components
│   ├── board/        # Main Board Layout, Header, Logic
│   ├── column/       # Column components
│   ├── dialog/       # Confirmation Dialogs
│   ├── TaskCard/     # Draggable Task Card components
│   ├── TaskList/     # Task List Container (Droppable area)
│   ├── TaskModal/    # Create/Edit Task Modal forms
│   ├── ui/           # Reusable UI elements (Buttons, Inputs, etc.)
│   └── Navbar.tsx    # Top Navigation Bar
├── contexts/         # React Context Providers (Task, Language, etc.)
├── hooks/            # Custom Hooks (Logic abstraction)
├── reducer/          # State Reducers
├── utils/            # Helper functions, LocalStorage, i18n
└── App.tsx           # Main Application Entry
```

---

##  Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/phraewchuthamat/task-board-react.git
```

### 2. Navigate to project directory
```bash
cd task-board-react
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm run dev
```
