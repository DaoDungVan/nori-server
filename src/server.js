const express = require("express"); // Import thư viện Express
const cors = require("cors"); // Thêm thư viện cors để xử lý CORS để cho phép truy cập từ các nguồn khác nhau
require("dotenv").config(); // Thêm thư viện dotenv để quản lý biến môi trường
const authRoutes = require('./routes/authRoutes');

const pool = require("./config/db"); // Import pool kết nối đến cơ sở dữ liệu PostgreSQL/Supabase từ file db.js

const app = express();// Khởi tạo ứng dụng Express

app.use(cors()); // Sử dụng middleware cors để cho phép truy cập từ các nguồn khác nhau
app.use(express.json()); // Cho phép server đọc dữ liệu JSON từ req.body
app.use('/api/auth',authRoutes);

app.get("/", (req, res) => { // API GET mặc định khi truy cập localhost:5000
  res.json({ // Trả dữ liệu JSON về client
    success: true,
    message: "Nori API is running...",      
  })
});


app.get("/db-test", async (req, res) => { // API GET để kiểm tra kết nối đến cơ sở dữ liệu
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "Database connected successfully",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});


// Khởi động server và lắng nghe trên cổng được chỉ định trong biến môi trường PORT hoặc mặc định là 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});