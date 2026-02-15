# Modern Kanban Board - Frontend 🚀

แอปพลิเคชันจัดการงานสไตล์ Jira ที่สร้างด้วย **React** และ **TypeScript**  
ออกแบบมาเพื่อแสดงให้เห็นถึงสถาปัตยกรรม frontend ที่ทันสมัย การจัดการ state ที่ซับซ้อน และการลากวางที่มีประสิทธิภาพสูง

- 🔗 **Backend Repository:** [task-board-api](https://github.com/phraewchuthamat/task-board-api)
- 🚀 **Live Demo:** [Task Board App](https://task-board-react-ivory.vercel.app/login)

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite)
![Playwright](https://img.shields.io/badge/Playwright-Tested-2EAD33?style=for-the-badge&logo=playwright)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

---

## ✨ ฟีเจอร์หลัก

### 🎯 ฟังก์ชันหลัก
- **คอลัมน์แบบไดนามิก:** สร้าง แก้ไข และลบคอลัมน์ที่กำหนดเองพร้อมสีที่เลือกได้
- **ลากและวาง:** บอร์ดแบบโต้ตอบเต็มรูปแบบด้วย `@dnd-kit` รองรับการ**จัดเรียง**งานภายในคอลัมน์และ**ย้าย**งานระหว่างคอลัมน์พร้อมแอนิเมชันที่ลื่นไหล
- **CRUD Operations:** สร้าง อ่าน อัปเดต และลบงานพร้อมการอัปเดต UI แบบเรียลไทม์
- **ค้นหาและกรอง:** ค้นหาทันทีตามชื่อ/รายละเอียด และกรองตามความสำคัญ (ต่ำ, กลาง, สูง)
- **ระบบสมาชิกครบวงจร:** สมัครสมาชิก, เข้าสู่ระบบ, ลืมรหัสผ่าน, รีเซ็ตรหัสผ่าน และแก้ไขโปรไฟล์
- **JWT Authentication:** การยืนยันตัวตนที่ปลอดภัยพร้อมระบบ Refresh Token อัตโนมัติ

### 🎨 ประสบการณ์ผู้ใช้ (UX)
- **เลย์เอาต์สไตล์ Jira:** ความสูงวิวพอร์ตคงที่พร้อมการเลื่อนภายในแบบอิสระสำหรับคอลัมน์และการเลื่อนแนวนอนสำหรับบอร์ด
- **Snap Scrolling:** การใช้งาน CSS Scroll Snap เพื่อให้รู้สึกเหมือนแอปพลิเคชันดั้งเดิมบนอุปกรณ์สัมผัส
- **โหมดมืด/สว่าง:** การสลับธีมที่รู้จักระบบพร้อมการบันทึกค่าที่ตั้ง (Persisted Theme)
- **หลายภาษา (i18n):** สลับภาษาทันที (อังกฤษ/ไทย) โดยไม่ต้องโหลดหน้าใหม่โดยใช้ React Context
- **การออกแบบแบบ Responsive:** แนวทาง Mobile-first ปรับให้เหมาะกับโทรศัพท์ แท็บเล็ต และเดสก์ท็อป
- **Micro-interactions:** แอนิเมชัน (Framer Motion) และการตอบสนองต่อผู้ใช้ที่ลื่นไหล

### 💾 การจัดเก็บข้อมูล
- **การเชื่อมต่อ Backend API:** เชื่อมต่อกับ Backend ที่เก็บข้อมูลบน **PostgreSQL**
- **Local Storage:** ธีมและการตั้งค่าภาษาถูกเก็บไว้ในเครื่องเพื่อการโหลดที่รวดเร็ว
- **Optimistic Updates:** ข้อเสนอแนะ UI ทันทีก่อนการยืนยันจาก API

---

## 🛠️ จุดเด่นทางเทคนิค

### 1. สถาปัตยกรรมและการจัดการ State
- **Context API:** ระบบจัดการ state แบบรวมศูนย์สำหรับงาน (`TaskContext`), คอลัมน์ (`ColumnContext`), การยืนยันตัวตน (`AuthContext`), ธีม (`ThemeContext`), ภาษา (`LanguageContext`) และการแจ้งเตือน (`AlertContext`)
- **Custom Hooks:** แยกลอจิกการทำงานออกจาก UI เช่น `useBoardDrag`, `useTaskModal`, `useAuth` เพื่อความสะอาดและนำกลับมาใช้ใหม่ได้ง่าย

### 2. การรวม TypeScript
- **Type Safety:** โค้ดเบสที่มีการกำหนดประเภทอย่างเต็มรูปแบบด้วย interfaces สำหรับ `Task`, `Column`, `Priority`, `User` และ DTOs
- **Strict Mode:** ป้องกันข้อผิดพลาดที่อาจเกิดขึ้นขณะ runtime

### 3. การเพิ่มประสิทธิภาพ
- **Performance Optimization:** ใช้ `React.memo` และ `useCallback` เพื่อลดการ re-render ที่ไม่จำเป็น
- **Code Splitting:** การนำเข้าแบบไดนามิกผ่าน Vite เพื่อขนาด bundle ที่เหมาะสม
- **CSS Optimization:** ใช้ Tailwind CSS v4 ที่มีประสิทธิภาพสูง

### 4. การรวม API & Security
- **Axios Interceptors:** จัดการ Token (Attach/Refresh) และ Error Handling (401/403) โดยอัตโนมัติ
- **Secure Handling:** ป้องกัน Unauthorized Access ด้วย `ProtectedRoute` และจัดการ Redirect อย่างเหมาะสม

---

## 💻 เทคโนโลยีที่ใช้

### Frontend
- **Runtime/Build:** React 19 (Vite)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4, Headless UI, MUI Material
- **Forms:** React Hook Form
- **Drag & Drop:** @dnd-kit (Core, Sortable, Utilities)
- **Animation:** Framer Motion
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Icons:** Heroicons
- **Testing:** Playwright (E2E)
- **Tools:** ESLint, Prettier

### Backend
> **หมายเหตุ:** โปรเจคนี้เป็นส่วนของ Frontend เท่านั้น สำหรับ Backend API สามารถดูได้ที่ [task-board-api](https://github.com/phraewchuthamat/task-board-api)

- **Database:** PostgreSQL (ย้ายจาก MySQL)
- **ORM:** Prisma
- **Framework:** Express.js / Node.js
- **Auth:** JWT

---

## 📂 โครงสร้างโปรเจค

```bash
src/
├── assets/           # ทรัพยากรไฟล์ภาพและไอคอน
├── components/       # UI Components
│   ├── AlertPopup/   # ระบบแจ้งเตือน (Toast Notification)
│   ├── board/        # เลย์เอาต์บอร์ด Kanban และ Logic หัวตาราง
│   ├── column/       # คอมโพเนนต์คอลัมน์และการจัดการคอลัมน์
│   ├── dialog/       # กล่องโต้ตอบยืนยัน (Confirm Dialog)
│   ├── TaskCard/     # การ์ดงาน (Draggable)
│   ├── TaskList/     # รายการงานในแต่ละคอลัมน์ (Droppable)
│   ├── TaskModal/    # ฟอร์มสร้าง/แก้ไขงาน
│   ├── ui/           # คอมโพเนนต์พื้นฐาน (Button, Input, LoadingScreen)
│   └── AppLayout.tsx # โครงสร้างหลักของแอป
├── contexts/         # React Context Providers (Global State)
├── hooks/            # Custom Hooks (Business Logic)
├── pages/            # หน้าหลัก (SignIn, SignUp, KanbanBoard, Profile, NotFound)
├── routes/           # การจัดการ Route และ ProtectedRoute
├── services/         # API Service และ Axios Interceptors
├── theme/            # การตั้งค่าธีม
├── utils/            # ฟังก์ชันช่วยเหลือ (i18n, formatting)
├── App.tsx           # Main App Component
└── main.tsx          # Entry Point

tests/
├── auth.spec.ts      # ทดสอบระบบ Authentication (11 tests)
└── kanban.spec.ts    # ทดสอบระบบ Kanban Board (5 tests)
```

---

## 🧪 Testing (E2E)

ทดสอบระบบแบบ End-to-End ด้วย **Playwright** ครอบคลุมฟีเจอร์หลักทั้งหมด บันทึกวิดีโอ Full HD (1920×1080) ทุกครั้งที่รัน

### 📋 Test Cases (16 tests)

#### Authentication (`auth.spec.ts`)

| กลุ่ม | Test Case | สิ่งที่ทดสอบ |
|---|---|---|
| **Register** | ✅ สมัครสมาชิกสำเร็จ | กรอกข้อมูล → redirect ไปหน้า Login |
| | ✅ Username สั้นเกินไป | Username < 3 ตัวอักษร → แสดง error |
| | ✅ Password สั้นเกินไป | Password < 6 ตัวอักษร → แสดง error |
| | ✅ Password ไม่ตรงกัน | Confirm password ผิด → แสดง error |
| **Login** | ✅ เข้าสู่ระบบสำเร็จ | Register → Login → เข้า Dashboard + Navbar |
| | ✅ Username สั้นเกินไป | Username < 3 ตัวอักษร → แสดง error |
| | ✅ Password สั้นเกินไป | Password < 6 ตัวอักษร → แสดง error |
| **Protected Route** | ✅ Redirect ถ้าไม่ login | เข้า `/dashboard` → ถูก redirect ไป `/login` |
| **Navigation** | ✅ Login ↔ Register | ลิงก์ระหว่างหน้าทำงานถูกต้อง |
| | ✅ Register → Login | ลิงก์กลับหน้า Login ทำงานถูกต้อง |
| | ✅ Forgot Password | ลิงก์ไปหน้า Reset Password ทำงานถูกต้อง |

#### Kanban Board (`kanban.spec.ts`)

| กลุ่ม | Test Case | สิ่งที่ทดสอบ |
|---|---|---|
| **Column** | ✅ สร้าง Column สำเร็จ | กรอกชื่อ + เลือกสี → Column ปรากฏ |
| | ✅ ชื่อว่างไม่ได้ | กด Save โดยไม่กรอกชื่อ → แสดง error |
| **Task** | ✅ สร้าง Task ใน Column แรก | Task ใหม่ปรากฏใน Column แรกเสมอ |
| | ✅ Task อยู่ Column แรกเสมอ | มี 2 Column → Task ใหม่อยู่ Column แรก |
| **Drag & Drop** | ✅ ลาก Task ข้าม Column | ลาก Task จาก Column 1 → Column 2 สำเร็จ |

### 🚀 วิธีรันเทสต์

```bash
# ติดตั้ง Playwright browsers (ครั้งแรก)
npx playwright install

# รันเทสต์พร้อม UI (แนะนำ)
npx playwright test --ui

# รันเทสต์ผ่าน CLI
npx playwright test --project=chromium

# ดูรายงานผลเทสต์
npx playwright show-report
```

> **หมายเหตุ:** ต้องเปิด dev server (`npm run dev`) ก่อนรันเทสต์

---

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น
- Node.js (เวอร์ชัน LTS)
- npm หรือ yarn
- Backend API ที่กำลังทำงาน (ดู [task-board-api](https://github.com/phraewchuthamat/task-board-api))

### การติดตั้ง

1. **โคลน repository**
   ```bash
   git clone https://github.com/phraewchuthamat/task-board-react.git
   cd task-board-react
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **สร้างไฟล์ environment**
   สร้างไฟล์ `.env` ในไดเรกทอรีหลัก:
   ```bash
   VITE_API_BASE_URL=https://task-board-api-bu5l.onrender.com
   ```
   > หรือ URL ของ Backend ที่คุณรันเองในเครื่อง (เช่น `http://localhost:4000`)

4. **เริ่มเซิร์ฟเวอร์พัฒนา**
   ```bash
   npm run dev
   ```

---

## ☁️ Deployment Details

**Current Production Build:**
- **URL:** [https://task-board-react-ivory.vercel.app](https://task-board-react-ivory.vercel.app/login)
- **Platform:** Vercel
- **Status:** ✅ Live
- **Backend:** PostgreSQL on Render (Free Tier)

---

## 👨‍💻 ผู้เขียน

**Phraew Chuthamat**
- GitHub: [@phraewchuthamat](https://github.com/phraewchuthamat)

---

## 📄 License

This project is licensed under the ISC License.
