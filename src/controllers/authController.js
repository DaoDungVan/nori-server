const bcrypt = require('bcryptjs'); // Thư viện để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Thư viện để tạo và xác thực JSON Web Tokens (JWT)
const pool = require('../config/db'); // Import pool kết nối đến cơ sở dữ liệu PostgreSQL/Supabase

const register = async (req, res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){ // Kiểm tra nếu thiếu thông tin
        return res.status(400).json({ // Trả về lỗi nếu thiếu thông tin
            success: false,
            message: "Vui lòng điền đầy đủ thông tin"
        });
    }

    try {
        const result = await pool.query(
            "SELECT id FROM users WHERE email = $1",[email]);
        if(result.rows.length > 0){
            return res.status(409).json({
                success: false,
                message: "Email đã được sử dụng"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server",
            error: error.message
        })
    }
}