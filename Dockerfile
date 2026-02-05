# Stage 1: Build React App
FROM node:latest as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy ไฟล์ที่ build เสร็จแล้ว
COPY --from=builder /app/dist /usr/share/nginx/html

# แก้ไข: เขียน Config ลงไฟล์ default.conf ให้ครอบคลุม MIME Type และ SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # จัดการไฟล์ Static (JS, CSS) ให้ Cache ได้และมี MIME Type ถูกต้อง \
    location /assets/ { \
        try_files $uri =404; \
    } \
    \
    # สำหรับ SPA: ถ้าหาไฟล์ไม่เจอ ให้ส่ง index.html กลับไป \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]