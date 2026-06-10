const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // Bước 1: Lấy header "authorization" từ req.headers
    const authHeader = req.headers.authorization;

    // Bước 2: Kiểm tra header có tồn tại không, và có bắt đầu bằng "Bearer " không
    // Nếu không hợp lệ -> return res.status(401).json({ success: false, message: "..." })
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: "Không thể authorize vì thiếu token"
        });
    }

    // Bước 3: Tách lấy phần token ra khỏi chuỗi "Bearer <token>"
    const jwtToken = authHeader.split(' ')[1];

    // Bước 4: Dùng jwt.verify(token, process.env.JWT_SECRET) để giải mã token
    // Đặt trong try/catch vì token sai/hết hạn sẽ throw error
    // Nếu lỗi -> return res.status(401).json({ success: false, message: "Token không hợp lệ" })
    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

        // Bước 5: Lấy userId từ payload, gắn vào req.userId
        req.userId = decoded.userId;

        // Bước 6: Cho request đi tiếp
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token không hợp lệ"
        });
    }
};

module.exports = protect;
