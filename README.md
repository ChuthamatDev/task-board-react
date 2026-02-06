# Modern Kanban Board 🚀

A robust, full-stack task management application built with **React**, **TypeScript**, **Node.js**, and **MySQL**.  
Designed to demonstrate modern full-stack architecture, RESTful API design, JWT authentication, and high-performance drag-and-drop interactions.

- 🔗 **Frontend Repository:** [task-board-react](https://github.com/phraewchuthamat/task-board-react)
- � **Backend Repository:** [task-board-api](https://github.com/phraewchuthamat/task-board-api)

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-LTS-green?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

---

## ✨ Key Features

### 🎯 Core Functionality
- **Dynamic Columns:** Create, edit, and delete custom columns with personalized colors
- **Drag & Drop:** Fully interactive board using `@dnd-kit`. Supports **reordering** tasks within columns and **moving** tasks between columns with smooth animations
- **CRUD Operations:** Create, Read, Update, and Delete tasks with real-time UI updates
- **Search & Filter:** Instant search by title/description and filter by priority (Low, Medium, High)
- **JWT Authentication:** Secure user authentication with access and refresh tokens

### 🎨 User Experience (UX)
- **Jira-like Layout:** Fixed viewport height with independent internal scrolling for columns and horizontal scrolling for the board
- **Snap Scrolling:** CSS Scroll Snap implementation for a native-app feel on touch devices
- **Dark/Light Mode:** System-aware theme switching with persistent preference
- **Internationalization (i18n):** Instant language switching (English/Thai) without page reload using React Context
- **Responsive Design:** Mobile-first approach, optimized for phones, tablets, and desktops

### 💾 Data Persistence
- **Backend API:** Task and column data is persisted via RESTful API with JWT authentication
- **MySQL Database:** Relational database with Prisma ORM for type-safe queries
- **Local Storage:** Theme and language preferences are stored locally for instant loading

---

## 🛠️ Technical Highlights

### 1. Full-Stack Architecture
- **Frontend:** React 19 + TypeScript + Vite
- **Backend:** Node.js + Express.js + TypeScript
- **Database:** MySQL 8.0 with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens) with refresh token rotation
- **Deployment:** Docker & Docker Compose for containerization

### 2. State Management
- **Context API:** Centralized state management for tasks, columns, authentication, theme, and language
- **Custom Hooks:** Logic abstraction with reusable hooks like `useBoardDrag`, `useTaskModal`, `useAuth`

### 3. TypeScript Integration
- Fully typed codebase across frontend and backend
- Strict type checking to prevent runtime errors
- Prisma-generated types for database models

### 4. Performance Optimization
- **React.memo:** Prevents unnecessary re-renders during drag operations
- **Optimistic Updates:** Immediate UI feedback before API confirmation
- **Event Delegation:** Optimized touch/click sensors in `dnd-kit`

---

## 💻 Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Headless UI, Material-UI
- **Drag & Drop:** @dnd-kit (Core, Sortable, Utilities)
- **HTTP Client:** Axios with interceptors for auth
- **Icons:** Heroicons
- **Tools:** ESLint, Prettier

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MySQL 8.0
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Security:** Helmet, CORS
- **Deployment:** Docker & Docker Compose

---

## 📂 Project Structure

### Frontend (task-board-react)
```bash
src/
├── assets/           # Static resources
├── components/       # UI Components
│   ├── AlertPopup/   # Alert/Notification components
│   ├── board/        # Main Board Layout, Header, Logic
│   ├── column/       # Column components (TaskColumn, AddColumnButton)
│   ├── dialog/       # Confirmation Dialogs
│   ├── TaskCard/     # Draggable Task Card components
│   ├── TaskList/     # Task List Container (Droppable area)
│   ├── TaskModal/    # Create/Edit Task Modal forms
│   ├── ui/           # Reusable UI elements (Buttons, Inputs, etc.)
│   └── Navbar.tsx    # Top Navigation Bar with logout
├── contexts/         # React Context Providers
│   ├── AuthContext.tsx      # Authentication state
│   ├── TaskContext.tsx      # Task management
│   ├── ColumnContext.tsx    # Column management
│   ├── ThemeContext.tsx     # Dark/Light mode
│   └── LanguageContext.tsx  # i18n
├── hooks/            # Custom Hooks (Logic abstraction)
├── pages/            # Page components (SignIn, SignUp, KanbanBoard)
├── routes/           # Route protection (ProtectedRoute)
├── services/         # API service (axios instance)
├── utils/            # Helper functions, i18n translations
└── App.tsx           # Main Application Entry
```

### Backend (task-board-api)
```bash
src/
├── controllers/      # Business Logic
│   ├── authController.ts    # Register, Login, Refresh Token
│   ├── taskController.ts    # Task CRUD operations
│   └── columnController.ts  # Column CRUD operations
├── routes/           # API Routes
│   ├── authRoutes.ts
│   ├── taskRoutes.ts
│   └── columnRoutes.ts
├── middlewares/      # Middleware Functions
│   └── authMiddleware.ts    # JWT verification
├── prisma.ts         # Prisma Client Instance
└── app.ts            # Main Application
prisma/
├── schema.prisma     # Database Schema
└── migrations/       # Database Migrations
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version)
- MySQL 8.0 (or use Docker)
- npm or yarn

### Option 1: Full-Stack with Docker Compose (Recommended)

This will run both frontend, backend, and MySQL database together.

#### 1. Clone both repositories
```bash
# Clone backend
git clone https://github.com/phraewchuthamat/task-board-api.git

# Clone frontend
git clone https://github.com/phraewchuthamat/task-board-react.git
```

#### 2. Setup Backend
```bash
cd task-board-api

# Create .env file
cat > .env << EOF
DATABASE_URL="mysql://root:rootpassword@db:3306/taskboard_db"
JWT_SECRET="your_secret_key_here"
PORT=4000
EOF
```

#### 3. Run Docker Compose
```bash
# Start all services (Backend + Database + Frontend)
docker-compose up -d --build

# Run Prisma Migration (first time only)
docker exec -it taskboard-api sh
npx prisma migrate deploy
exit
```

#### 4. Access the application
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:4000
- **MySQL:** localhost:3307

### Option 2: Local Development

#### Backend Setup

```bash
cd task-board-api

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL="mysql://root:rootpassword@localhost:3306/taskboard_db"
JWT_SECRET="your_secret_key_here"
PORT=4000
EOF

# Run MySQL (using Docker)
docker run --name mysql-taskboard \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=taskboard_db \
  -p 3306:3306 -d mysql:8.0

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Start backend server
npx ts-node src/app.ts
```

#### Frontend Setup

```bash
cd task-board-react

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:4000
EOF

# Start development server
npm run dev
```

The frontend will be available at http://localhost:5173 (or 5174 if 5173 is in use)

---

## 📡 API Endpoints

### 🔐 Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "testuser"
  }
}
```

### 📊 Columns (Protected)

All column endpoints require `Authorization: Bearer <token>` header.

#### Get All Columns
```http
GET /columns
Authorization: Bearer <token>
```

#### Create Column
```http
POST /columns
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "In Progress"
}
```

#### Update Column
```http
PATCH /columns/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Done",
  "position": 3000
}
```

#### Delete Column
```http
DELETE /columns/:id
Authorization: Bearer <token>
```

### ✅ Tasks (Protected)

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer <token>
```

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "columnId": "uuid",
  "priority": "medium"
}
```

#### Update Task
```http
PATCH /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "columnId": "new-column-uuid",
  "priority": "high",
  "position": 2000
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

---

## 🗄️ Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  password  String
  columns   Column[]
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Column {
  id        String   @id @default(uuid())
  title     String
  position  Int      @default(1000)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Task {
  id          String   @id @default(uuid())
  title       String
  description String?  @db.Text
  priority    String   @default("medium")
  position    Int      @default(1000)
  columnId    String
  column      Column   @relation(fields: [columnId], references: [id], onDelete: Cascade)
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🔒 Security Features

- **JWT Authentication:** Secure token-based authentication with refresh tokens
- **Password Hashing:** bcryptjs for secure password storage
- **CORS Protection:** Configured CORS for allowed origins
- **Helmet.js:** Security headers for Express.js
- **Input Validation:** Server-side validation for all inputs
- **SQL Injection Protection:** Prisma ORM prevents SQL injection

---

## 🐛 Troubleshooting

### Frontend Issues

**403 Forbidden Error:**
- Make sure you're logged in
- Check if `accessToken` exists in localStorage (DevTools → Application → Local Storage)
- Try logging out and logging in again

**CORS Error:**
- Ensure backend is running on the correct port (default: 4000)
- Check backend CORS configuration allows your frontend origin

### Backend Issues

**Database Connection Failed:**
```bash
# Check if MySQL is running
docker ps

# Restart MySQL container
docker restart mysql-taskboard
```

**Prisma Client Not Working:**
```bash
# Regenerate Prisma Client
npx prisma generate
```

**Port Already in Use:**
```bash
# Change PORT in .env file
PORT=5000
```

---

## 👨‍💻 Author

**Phraew Chuthamat**
- GitHub: [@phraewchuthamat](https://github.com/phraewchuthamat)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎯 Next Steps

- [ ] Add real-time updates with WebSockets
- [ ] Implement task comments and attachments
- [ ] Add user profile management
- [ ] Implement team collaboration features
- [ ] Add email notifications
- [ ] Deploy to production (Vercel + Railway/Render)
