# Modern Kanban Board - Frontend 🚀

A robust, Jira-style task management application built with **React** and **TypeScript**.  
Designed to demonstrate modern frontend architecture, complex state management, and high-performance drag-and-drop interactions.

- 🔗 **Live Demo:** [Click Here](https://phraewchuthamat.github.io/task-board-react/)
- 📂 **Frontend Repository:** [task-board-react](https://github.com/phraewchuthamat/task-board-react)
- 🔗 **Backend Repository:** [task-board-api](https://github.com/phraewchuthamat/task-board-api)

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite)

---

## ✨ Key Features

### 🎯 Core Functionality
- **Dynamic Columns:** Create, edit, and delete custom columns with personalized colors
- **Drag & Drop:** Fully interactive board using `@dnd-kit`. Supports **reordering** tasks within columns and **moving** tasks between columns with smooth animations
- **CRUD Operations:** Create, Read, Update, and Delete tasks with real-time UI updates
- **Search & Filter:** Instant search by title/description and filter by priority (Low, Medium, High)
- **JWT Authentication:** Secure user authentication with login/logout functionality

### 🎨 User Experience (UX)
- **Jira-like Layout:** Fixed viewport height with independent internal scrolling for columns and horizontal scrolling for the board
- **Snap Scrolling:** CSS Scroll Snap implementation for a native-app feel on touch devices
- **Dark/Light Mode:** System-aware theme switching with persistent preference
- **Internationalization (i18n):** Instant language switching (English/Thai) without page reload using React Context
- **Responsive Design:** Mobile-first approach, optimized for phones, tablets, and desktops

### 💾 Data Persistence
- **Backend API Integration:** Task and column data is persisted via RESTful API with JWT authentication
- **Local Storage:** Theme and language preferences are stored locally for instant loading
- **Optimistic Updates:** Immediate UI feedback before API confirmation

---

## 🛠️ Technical Highlights

### 1. Architecture & State Management
- **Context API:** Centralized state management system for tasks, columns, authentication, theme, and language
- **Custom Hooks:** Logic abstracted into reusable hooks like `useBoardDrag`, `useTaskModal`, `useAuth`, and `useLanguage` to maintain **Separation of Concerns**

### 2. TypeScript Integration
- Fully typed codebase with interfaces for `Task`, `Column`, `Priority`, `User`
- Strict type checking to prevent runtime errors and improve code maintainability

### 3. Performance Optimization
- **React.memo:** Used on `TaskCard` and `TaskColumn` to prevent unnecessary re-renders during drag operations
- **Event Delegation:** Optimized touch/click sensors in `dnd-kit` to handle conflict between dragging and button clicking
- **Code Splitting:** Dynamic imports for optimal bundle size

### 4. API Integration
- **Axios Interceptors:** Automatic token injection and refresh token handling
- **Error Handling:** Comprehensive error handling with user-friendly messages
- **Protected Routes:** Route guards to prevent unauthorized access

### 5. Accessibility & Polish
- **Accessible Colors:** High contrast colors for text and badges
- **Confirm Dialogs:** Defensive UX design to prevent accidental data loss
- **Loading States:** Skeleton screens and loading indicators

---

## 💻 Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Headless UI, Material-UI
- **Drag & Drop:** @dnd-kit (Core, Sortable, Utilities)
- **HTTP Client:** Axios with interceptors
- **Routing:** React Router v6
- **Icons:** Heroicons
- **Tools:** ESLint, Prettier

### Backend
> **Note:** This is a frontend repository. For backend setup and API documentation, please visit the [task-board-api](https://github.com/phraewchuthamat/task-board-api) repository.

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL 8.0 with Prisma ORM
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
│   ├── column/       # Column components (TaskColumn, AddColumnButton, ColumnForm)
│   ├── dialog/       # Confirmation Dialogs
│   ├── TaskCard/     # Draggable Task Card components
│   ├── TaskList/     # Task List Container (Droppable area)
│   ├── TaskModal/    # Create/Edit Task Modal forms
│   ├── ui/           # Reusable UI elements (Buttons, Inputs, etc.)
│   └── Navbar.tsx    # Top Navigation Bar with logout
├── contexts/         # React Context Providers
│   ├── AuthContext.tsx      # Authentication state management
│   ├── TaskContext.tsx      # Task CRUD operations
│   ├── ColumnContext.tsx    # Column CRUD operations
│   ├── ThemeContext.tsx     # Dark/Light mode
│   ├── LanguageContext.tsx  # i18n (English/Thai)
│   └── AlertContext.tsx     # Global alerts
├── hooks/            # Custom Hooks (Logic abstraction)
│   ├── useBoardDrag.ts      # Drag & drop logic
│   ├── useTaskModal.ts      # Task modal state
│   ├── useColumnForm.ts     # Column form logic
│   └── useKanban.ts         # Kanban board logic
├── pages/            # Page components
│   ├── SignIn.tsx           # Login page
│   ├── SignUp.tsx           # Registration page
│   ├── KanbanBoard.tsx      # Main board page
│   └── AppLayout.tsx        # Layout wrapper
├── routes/           # Route protection
│   └── ProtectedRoute.tsx   # Auth guard
├── services/         # API service layer
│   └── api.ts               # Axios instance with interceptors
├── utils/            # Helper functions
│   ├── i18n.ts              # Translation definitions
│   ├── formatters.ts        # Data formatters
│   └── storage.ts           # Type definitions
└── App.tsx           # Main Application Entry with routing
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version)
- npm or yarn
- Backend API running (see [task-board-api](https://github.com/phraewchuthamat/task-board-api))

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/phraewchuthamat/task-board-react.git
cd task-board-react
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create environment file
```bash
# Create .env file in the root directory
cat > .env << EOF
VITE_API_URL=http://localhost:4000
EOF
```

> **Note:** Make sure to update `VITE_API_URL` to match your backend API URL.

#### 4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

---

## � Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

---

## � Backend Setup

This frontend requires a running backend API. Please follow the setup instructions in the [task-board-api](https://github.com/phraewchuthamat/task-board-api) repository.

**Quick Backend Setup:**
```bash
# Clone backend repository
git clone https://github.com/phraewchuthamat/task-board-api.git
cd task-board-api

# Follow setup instructions in backend README
# The backend will run on http://localhost:4000 by default
```

---

## � API Integration

The frontend communicates with the backend API using Axios. All API calls are handled through the `src/services/api.ts` file.

### Authentication Flow
1. User logs in via `/auth/login`
2. Backend returns `accessToken` and `refreshToken`
3. Tokens are stored in `localStorage`
4. Axios interceptor automatically adds `Authorization` header to all requests
5. If token expires, interceptor automatically refreshes it

### Protected Routes
- `/dashboard` - Main Kanban board (requires authentication)
- `/login` - Login page (public)
- `/register` - Registration page (public)

---

## 🎨 Customization

### Theme
- Modify `src/contexts/ThemeContext.tsx` for theme logic
- Update Tailwind config in `tailwind.config.js` for colors

### Language
- Add new translations in `src/utils/i18n.ts`
- Support for English and Thai out of the box

### Styling
- All components use Tailwind CSS
- Custom styles in component files
- Global styles in `src/index.css`

---

## 🐛 Troubleshooting

### 403 Forbidden Error
- Make sure you're logged in
- Check if `accessToken` exists in localStorage (DevTools → Application → Local Storage)
- Try logging out and logging in again
- Ensure backend is running and accessible

### CORS Error
- Ensure backend is running on the correct port (default: 4000)
- Check backend CORS configuration allows your frontend origin
- Update `VITE_API_URL` in `.env` if backend port is different

### Port Already in Use
```bash
# Vite will automatically use the next available port
# Check the terminal output for the actual port number
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
```

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=<your-backend-url>`

---

## 👨‍💻 Author

**Phraew Chuthamat**
- GitHub: [@phraewchuthamat](https://github.com/phraewchuthamat)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎯 Future Enhancements

- [ ] Add real-time updates with WebSockets
- [ ] Implement task comments
- [ ] Add file attachments to tasks
- [ ] User profile management
- [ ] Team collaboration features
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Offline mode with service workers
