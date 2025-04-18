# Sử dụng image Node.js chính thức làm image cơ sở
FROM node:16

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng dự án Next.js
RUN npm run build

# Mở port 3000
EXPOSE 3000

# Chạy ứng dụng Next.js
CMD ["npm", "start"]
