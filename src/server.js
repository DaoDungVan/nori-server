// Import thư viện Express
const express = require("express");
const cors = require("cors"); // Thêm thư viện cors để xử lý CORS để cho phép truy cập từ các nguồn khác nhau
require("dotenv").config(); // Thêm thư viện dotenv để quản lý biến môi trường

const pool = require("./config/db"); // Import pool kết nối đến cơ sở dữ liệu PostgreSQL/Supabase từ file db.js

const app = express();// Khởi tạo ứng dụng Express

app.use(cors()); // Sử dụng middleware cors để cho phép truy cập từ các nguồn khác nhau
app.use(express.json()); // Cho phép server đọc dữ liệu JSON từ req.body

app.get("/", (req, res) => { // API GET mặc định khi truy cập localhost:5000
  res.json({ // Trả dữ liệu JSON về client
    success: true,
    message: "Nori API is running...",      
  })
});

// Khởi động server và lắng nghe trên cổng được chỉ định trong biến môi trường PORT hoặc mặc định là 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});