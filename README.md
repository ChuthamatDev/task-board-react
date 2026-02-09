# Modern Kanban Board - Frontend 🚀

แอปพลิเคชันจัดการงานสไตล์ Jira ที่สร้างด้วย **React** และ **TypeScript**  
ออกแบบมาเพื่อแสดงให้เห็นถึงสถาปัตยกรรม frontend ที่ทันสมัย การจัดการ state ที่ซับซ้อน และการลากวางที่มีประสิทธิภาพสูง

- 🔗 **Backend Repository:** [task-board-api](https://github.com/phraewchuthamat/task-board-api)

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite)

---

## ✨ ฟีเจอร์หลัก

### 🎯 ฟังก์ชันหลัก
- **คอลัมน์แบบไดนามิก:** สร้าง แก้ไข และลบคอลัมน์ที่กำหนดเองพร้อมสีที่เลือกได้
- **ลากและวาง:** บอร์ดแบบโต้ตอบเต็มรูปแบบด้วย `@dnd-kit` รองรับการ**จัดเรียง**งานภายในคอลัมน์และ**ย้าย**งานระหว่างคอลัมน์พร้อมแอนิเมชันที่ลื่นไหล
- **CRUD Operations:** สร้าง อ่าน อัปเดต และลบงานพร้อมการอัปเดต UI แบบเรียลไทม์
- **ค้นหาและกรอง:** ค้นหาทันทีตามชื่อ/รายละเอียด และกรองตามความสำคัญ (ต่ำ, กลาง, สูง)
- **JWT Authentication:** การยืนยันตัวตนที่ปลอดภัยพร้อมฟังก์ชันเข้าสู่ระบบ/ออกจากระบบ

### 🎨 ประสบการณ์ผู้ใช้ (UX)
- **เลย์เอาต์สไตล์ Jira:** ความสูงวิวพอร์ตคงที่พร้อมการเลื่อนภายในแบบอิสระสำหรับคอลัมน์และการเลื่อนแนวนอนสำหรับบอร์ด
- **Snap Scrolling:** การใช้งาน CSS Scroll Snap เพื่อให้รู้สึกเหมือนแอปพลิเคชันดั้งเดิมบนอุปกรณ์สัมผัส
- **โหมดมืด/สว่าง:** การสลับธีมที่รู้จักระบบพร้อมการบันทึกค่าที่ตั้ง
- **หลายภาษา (i18n):** สลับภาษาทันที (อังกฤษ/ไทย) โดยไม่ต้องโหลดหน้าใหม่โดยใช้ React Context
- **การออกแบบแบบ Responsive:** แนวทาง Mobile-first ปรับให้เหมาะกับโทรศัพท์ แท็บเล็ต และเดสก์ท็อป

### 💾 การจัดเก็บข้อมูล
- **การเชื่อมต่อ Backend API:** ข้อมูลงานและคอลัมน์ถูกเก็บผ่าน RESTful API พร้อม JWT authentication
- **Local Storage:** ธีมและการตั้งค่าภาษาถูกเก็บไว้ในเครื่องเพื่อการโหลดที่รวดเร็ว
- **Optimistic Updates:** ข้อเสนอแนะ UI ทันทีก่อนการยืนยันจาก API

---

## 🛠️ จุดเด่นทางเทคนิค

### 1. สถาปัตยกรรมและการจัดการ State
- **Context API:** ระบบจัดการ state แบบรวมศูนย์สำหรับงาน คอลัมน์ การยืนยันตัวตน ธีม และภาษา
- **Custom Hooks:** ตรรกะที่แยกออกมาเป็น hooks ที่ใช้ซ้ำได้เช่น `useBoardDrag`, `useTaskModal`, `useAuth` และ `useLanguage` เพื่อรักษา**การแยกส่วนของความกังวล**

### 2. การรวม TypeScript
- โค้ดเบสที่มีการกำหนดประเภทอย่างเต็มรูปแบบด้วย interfaces สำหรับ `Task`, `Column`, `Priority`, `User`
- การตรวจสอบประเภทที่เข้มงวดเพื่อป้องกันข้อผิดพลาดในขณะทำงานและปรับปรุงการบำรุงรักษาโค้ด

### 3. การเพิ่มประสิทธิภาพ
- **React.memo:** ใช้กับ `TaskCard` และ `TaskColumn` เพื่อป้องกันการ re-render ที่ไม่จำเป็นระหว่างการลาก
- **Event Delegation:** เซ็นเซอร์สัมผัส/คลิกที่ปรับให้เหมาะสมใน `dnd-kit` เพื่อจัดการความขัดแย้งระหว่างการลากและการคลิกปุ่ม
- **Code Splitting:** การนำเข้าแบบไดนามิกเพื่อขนาด bundle ที่เหมาะสม

### 4. การรวม API
- **Axios Interceptors:** การฉีดโทเค็นอัตโนมัติและการจัดการ refresh token
- **Error Handling:** การจัดการข้อผิดพลาดที่ครอบคลุมพร้อมข้อความที่เป็นมิตรกับผู้ใช้
- **Protected Routes:** การป้องกันเส้นทางเพื่อป้องกันการเข้าถึงที่ไม่ได้รับอนุญาต

### 5. การเข้าถึงและความสมบูรณ์
- **สีที่เข้าถึงได้:** สีที่มีความตัดกันสูงสำหรับข้อความและป้าย
- **กล่องโต้ตอบยืนยัน:** การออกแบบ UX แบบป้องกันเพื่อป้องกันการสูญเสียข้อมูลโดยไม่ตั้งใจ
- **สถานะการโหลด:** หน้าจอโครงร่างและตัวบ่งชี้การโหลด

---

## 💻 เทคโนโลยีที่ใช้

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
> **หมายเหตุ:** นี่คือ repository ของ frontend สำหรับการตั้งค่า backend และเอกสาร API โปรดไปที่ [task-board-api](https://github.com/phraewchuthamat/task-board-api)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL 8.0 with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Docker & Docker Compose

---

## 📂 โครงสร้างโปรเจค

```bash
src/
├── assets/           # ทรัพยากรคงที่
├── components/       # UI Components
│   ├── AlertPopup/   # คอมโพเนนต์แจ้งเตือน
│   ├── board/        # เลย์เอาต์บอร์ดหลัก, Header, Logic
│   ├── column/       # คอมโพเนนต์คอลัมน์ (TaskColumn, AddColumnButton, ColumnForm)
│   ├── dialog/       # กล่องโต้ตอบยืนยัน
│   ├── TaskCard/     # คอมโพเนนต์การ์ดงานที่ลากได้
│   ├── TaskList/     # คอนเทนเนอร์รายการงาน (พื้นที่วางได้)
│   ├── TaskModal/    # ฟอร์มโมดัลสร้าง/แก้ไขงาน
│   ├── ui/           # องค์ประกอบ UI ที่ใช้ซ้ำได้ (ปุ่ม, อินพุต, ฯลฯ)
│   └── Navbar.tsx    # แถบนำทางด้านบนพร้อมออกจากระบบ
├── contexts/         # React Context Providers
│   ├── AuthContext.tsx      # การจัดการสถานะการยืนยันตัวตน
│   ├── TaskContext.tsx      # การดำเนินการ CRUD ของงาน
│   ├── ColumnContext.tsx    # การดำเนินการ CRUD ของคอลัมน์
│   ├── ThemeContext.tsx     # โหมดมืด/สว่าง
│   ├── LanguageContext.tsx  # i18n (อังกฤษ/ไทย)
│   └── AlertContext.tsx     # การแจ้งเตือนทั่วไป
├── hooks/            # Custom Hooks (การแยกตรรกะ)
│   ├── useBoardDrag.ts      # ตรรกะการลากและวาง
│   ├── useTaskModal.ts      # สถานะโมดัลงาน
│   ├── useColumnForm.ts     # ตรรกะฟอร์มคอลัมน์
│   └── useKanban.ts         # ตรรกะบอร์ด Kanban
├── pages/            # คอมโพเนนต์หน้า
│   ├── SignIn.tsx           # หน้าเข้าสู่ระบบ
│   ├── SignUp.tsx           # หน้าลงทะเบียน
│   ├── KanbanBoard.tsx      # หน้าบอร์ดหลัก
│   └── AppLayout.tsx        # Layout wrapper
├── routes/           # การป้องกันเส้นทาง
│   └── ProtectedRoute.tsx   # Auth guard
├── services/         # ชั้น API service
│   └── api.ts               # Axios instance with interceptors
├── utils/            # ฟังก์ชันช่วยเหลือ
│   ├── i18n.ts              # คำจำกัดความการแปล
│   ├── formatters.ts        # ตัวจัดรูปแบบข้อมูล
│   └── storage.ts           # คำจำกัดความประเภท
└── App.tsx           # จุดเข้าแอปพลิเคชันหลักพร้อมการกำหนดเส้นทาง
```

---

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น
- Node.js (เวอร์ชัน LTS)
- npm หรือ yarn
- Backend API ที่กำลังทำงาน (ดู [task-board-api](https://github.com/phraewchuthamat/task-board-api))

### การติดตั้ง

#### 1. โคลน repository
```bash
git clone https://github.com/phraewchuthamat/task-board-react.git
cd task-board-react
```

#### 2. ติดตั้ง dependencies
```bash
npm install
```

#### 3. สร้างไฟล์ environment
```bash
# สร้างไฟล์ .env ในไดเรกทอรีหลัก
cat > .env << EOF
VITE_API_URL=http://localhost:4000
EOF
```

> **หมายเหตุ:** อย่าลืมอัปเดต `VITE_API_URL` ให้ตรงกับ URL ของ backend API ของคุณ

#### 4. เริ่มเซิร์ฟเวอร์พัฒนา
```bash
npm run dev
```

แอปพลิเคชันจะพร้อมใช้งานที่ `http://localhost:5173` (หรือพอร์ตถัดไปที่ว่าง)

---

## 📜 คำสั่งที่ใช้ได้

```bash
# เริ่มเซิร์ฟเวอร์พัฒนา
npm run dev

# สร้างสำหรับ production
npm run build

# ดูตัวอย่าง production build
npm run preview

# ตรวจสอบโค้ด
npm run lint

# จัดรูปแบบโค้ด
npm run format
```

---

## 🔧 การตั้งค่า Backend

Frontend นี้ต้องการ backend API ที่กำลังทำงาน โปรดทำตามคำแนะนำการตั้งค่าใน [task-board-api](https://github.com/phraewchuthamat/task-board-api) repository

**การตั้งค่า Backend แบบรวดเร็ว:**
```bash
# โคลน backend repository
git clone https://github.com/phraewchuthamat/task-board-api.git
cd task-board-api

# ทำตามคำแนะนำการตั้งค่าใน backend README
# Backend จะทำงานที่ http://localhost:4000 โดยค่าเริ่มต้น
```

---

## 🔌 การรวม API

Frontend สื่อสารกับ backend API โดยใช้ Axios การเรียก API ทั้งหมดจัดการผ่านไฟล์ `src/services/api.ts`

### ขั้นตอนการยืนยันตัวตน
1. ผู้ใช้เข้าสู่ระบบผ่าน `/auth/login`
2. Backend ส่งคืน `accessToken` และ `refreshToken`
3. โทเค็นถูกเก็บใน `localStorage`
4. Axios interceptor เพิ่ม header `Authorization` ให้กับคำขอทั้งหมดโดยอัตโนมัติ
5. หากโทเค็นหมดอายุ interceptor จะรีเฟรชโดยอัตโนมัติ

### เส้นทางที่ได้รับการป้องกัน
- `/dashboard` - บอร์ด Kanban หลัก (ต้องการการยืนยันตัวตน)
- `/login` - หน้าเข้าสู่ระบบ (สาธารณะ)
- `/register` - หน้าลงทะเบียน (สาธารณะ)

---

## 🎨 การปรับแต่ง

### ธีม
- แก้ไข `src/contexts/ThemeContext.tsx` สำหรับตรรกะธีม
- อัปเดตการกำหนดค่า Tailwind ใน `tailwind.config.js` สำหรับสี

### ภาษา
- เพิ่มการแปลใหม่ใน `src/utils/i18n.ts`
- รองรับภาษาอังกฤษและไทยโดยค่าเริ่มต้น

### การจัดรูปแบบ
- คอมโพเนนต์ทั้งหมดใช้ Tailwind CSS
- สไตล์ที่กำหนดเองในไฟล์คอมโพเนนต์
- สไตล์ทั่วไปใน `src/index.css`

---

## 🐛 การแก้ไขปัญหา

### ข้อผิดพลาด 403 Forbidden
- ตรวจสอบว่าคุณเข้าสู่ระบบแล้ว
- ตรวจสอบว่า `accessToken` มีอยู่ใน localStorage (DevTools → Application → Local Storage)
- ลองออกจากระบบและเข้าสู่ระบบอีกครั้ง
- ตรวจสอบว่า backend กำลังทำงานและเข้าถึงได้

### ข้อผิดพลาด CORS
- ตรวจสอบว่า backend กำลังทำงานบนพอร์ตที่ถูกต้อง (ค่าเริ่มต้น: 4000)
- ตรวจสอบการกำหนดค่า CORS ของ backend อนุญาตต้นทางของ frontend ของคุณ
- อัปเดต `VITE_API_URL` ใน `.env` หากพอร์ต backend แตกต่างกัน

### พอร์ตถูกใช้งานอยู่แล้ว
```bash
# Vite จะใช้พอร์ตถัดไปที่ว่างโดยอัตโนมัติ
# ตรวจสอบเอาต์พุตเทอร์มินัลสำหรับหมายเลขพอร์ตจริง
```

### ข้อผิดพลาดในการสร้าง
```bash
# ล้าง node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install

# ล้างแคช Vite
rm -rf .vite
```

---

## 🚢 การ Deploy

### สร้างสำหรับ Production
```bash
npm run build
```

สิ่งนี้จะสร้าง production build ที่ปรับให้เหมาะสมในโฟลเดอร์ `dist/`

### Deploy ไปยัง GitHub Pages
```bash
# ติดตั้ง gh-pages
npm install --save-dev gh-pages

# เพิ่มใน package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Deploy ไปยัง Vercel/Netlify
1. เชื่อมต่อ GitHub repository ของคุณ
2. ตั้งค่าคำสั่งสร้าง: `npm run build`
3. ตั้งค่าไดเรกทอรีเอาต์พุต: `dist`
4. เพิ่มตัวแปรสภาพแวดล้อม: `VITE_API_URL=<your-backend-url>`

---

## 👨‍💻 ผู้เขียน

**Phraew Chuthamat**
- GitHub: [@phraewchuthamat](https://github.com/phraewchuthamat)

---

## 📄 ใบอนุญาตและลิขสิทธิ์

**Copyright © 2026 Phraew Chuthamat. All rights reserved.**

โปรเจคนี้เป็นโอเพนซอร์สและเผยแพร่ภายใต้ [MIT License](LICENSE)  
คุณสามารถใช้งาน แก้ไข และแจกจ่ายซอฟต์แวร์นี้ได้อย่างอิสระ โดยต้องรักษาประกาศลิขสิทธิ์และใบอนุญาตนี้ไว้

---

## 🎯 การปรับปรุงในอนาคต

- [ ] เพิ่มการอัปเดตแบบเรียลไทม์ด้วย WebSockets
- [ ] ใช้งานความคิดเห็นของงาน
- [ ] เพิ่มไฟล์แนบให้กับงาน
- [ ] การจัดการโปรไฟล์ผู้ใช้
- [ ] ฟีเจอร์การทำงานร่วมกันของทีม
- [ ] การแจ้งเตือนทางอีเมล
- [ ] แอปมือถือ (React Native)
- [ ] โหมดออฟไลน์ด้วย service workers
