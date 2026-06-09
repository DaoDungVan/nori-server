# Nori Server

Backend của ứng dụng theo dõi sức khỏe Nori.

## Stack
- Node.js + Express + PostgreSQL (Supabase) + JWT + bcryptjs

## Cách chạy
```bash
npm run dev   # chạy trên port 5000
```

## Cấu trúc
```
src/
  config/db.js          # kết nối Supabase
  controllers/          # xử lý logic
  routes/               # khai báo API endpoints
  middleware/           # xác thực JWT
  server.js             # entry point
```

## Hướng dẫn cho AI
- Đây là dự án học tập — giải thích từng bước, đưa skeleton để user tự viết, không viết thay
- User đang học backend từ đầu

---

## Tiến độ

### ✅ Phase 1 — Database
6 bảng đã tạo trên Supabase (without RLS): `users`, `mood_logs`, `workout_logs`, `nutrition_logs`, `sleep_logs`, `weight_logs`

### 🔄 Phase 2 — Authentication (ĐANG LÀM)
- [x] `src/controllers/authController.js` — hàm `register` đang viết dở
  - [x] Validate thiếu thông tin → 400
  - [x] Kiểm tra email tồn tại → 409
  - [ ] Hash password: `bcrypt.hash(password, 10)`
  - [ ] INSERT user vào DB (`RETURNING id, name, email, created_at`)
  - [ ] Tạo JWT: `jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })`
  - [ ] Trả về `201 + token + user`
  - [ ] Viết hàm `login`
  - [ ] Viết hàm `getMe`
- [ ] `src/routes/authRoutes.js`
- [ ] `src/middleware/authMiddleware.js`
- [ ] Đăng ký routes vào `server.js`
- [ ] Test bằng Thunder Client

### ⏳ Phase 3 — Tâm trạng
- [ ] moodController.js, moodRoutes.js

### ⏳ Phase 4 — Thể hình
- [ ] workoutController.js, weightController.js, routes

### ⏳ Phase 5 — Dinh dưỡng
- [ ] nutritionController.js, routes

### ⏳ Phase 6 — Ngủ nghỉ
- [ ] sleepController.js, routes

### ⏳ Phase 7 — AI Integration
- [ ] Tích hợp Claude API, phân tích sức khỏe, gợi ý thói quen

### ⏳ Phase 8 — Dashboard & Reports
- [ ] API thống kê tổng hợp cho dashboard
