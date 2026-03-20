# Stage 1: Build the React Application
FROM node:18-alpine as build

WORKDIR /app

# คัดลอก package.json เพื่อติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# กำหนด VITE_API_URL ตอน Build time
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# คัดลอกโค้ดทั้งหมด
COPY . .

# Build โค้ดสำหรับ Production
RUN npm run build

# Stage 2: Serve the Built Application with Nginx
FROM nginx:alpine

# นำไฟล์ที่ Build เสร็จ (จากโฟลเดอร์ dist) มาใส่ Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# คัดลอก Nginx Config หากมี (ถ้าไม่มีใช้ Default)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
