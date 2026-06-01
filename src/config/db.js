const {Pool} = require('pg');

//tạo pool kết nối đến cơ sở dữ liệu PostgreSQL/Supabase
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Lấy URL kết nối từ biến môi trường
    ssl: {
        rejectUnauthorized: false, // Cho phép kết nối SSL mà không cần xác thực chứng chỉ
    },
});

module.exports = pool;