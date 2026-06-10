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
        //Kiểm tra nếu email đã tồn tại
        const result = await pool.query(
            "SELECT id FROM users WHERE email = $1",[email]);
        if(result.rows.length > 0){
            return res.status(409).json({
                success: false,
                message: "Email đã được sử dụng"
            });
        }
        const saltRounds = 10; //số lần lặp thuật toán hash của chuỗi ngẫu nhiên thêm vào pass
        const password_hash = await bcrypt.hash(password,saltRounds); // hash password
        
        //thêm dữ liệu vào db
        const insertResult = await pool.query(
            "INSERT INTO users(name,email,password_hash) VALUES ($1,$2,$3) RETURNING id,name,email,created_at",
            [name,email,password_hash]);


        const user = insertResult.rows[0]; // lấy thông tin user vừa tạo (RETURNING trả về mảng, user là phần tử đầu)

        //Tạo JWT token
        const jwtToken = jwt.sign({userId: user.id},process.env.JWT_SECRET,{ expiresIn: '1h' });
        res.status(201).json({
            success: true,
            token: jwtToken,
            user: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server",
            error: error.message
        })
    }
}


const login = async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Vui lòng không được bỏ trống"
        });
    }
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        if(result.rows.length === 0){
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không đúng"
            });
        }
        const user = result.rows[0];

        //so sánh password
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không đúng"
            });
        }

        // Tạo JWT token
        const jwtToken = jwt.sign({userId: user.id},process.env.JWT_SECRET,{ expiresIn: '1h' });
        const {password_hash, ...safeUser} = user;
        res.status(200).json({
            success: true,
            token: jwtToken,
            user: safeUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server",
            error: error.message
        })
    }
}


module.exports = {register, login};