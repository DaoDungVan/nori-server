# Nori Server

Backend của ứng dụng theo dõi sức khỏe Nori.

## Giới thiệu đề tài

NORI — Ứng dụng theo dõi sức khỏe cá nhân tích hợp AI

### Vấn đề / Lý do chọn đề tài
- Dữ liệu sức khỏe bị rời rạc — mỗi thứ ghi một nơi
- Không có ai phân tích dữ liệu để đưa ra lời khuyên cá nhân hóa
- Thiếu động lực/nhắc nhở để duy trì thói quen tốt

### Mục tiêu đề tài
Xây dựng ứng dụng web tập trung dữ liệu sức khỏe cá nhân vào 1 nơi, kèm AI phân tích để đưa ra gợi ý phù hợp với từng người dùng.

### Đối tượng sử dụng
Người dùng cá nhân muốn theo dõi và cải thiện sức khỏe hàng ngày — không cần kiến thức y khoa.

### Phạm vi chức năng (4 mảng chính)
| Mảng | Người dùng làm gì | AI hỗ trợ gì |
|------|-------------------|--------------|
| Tâm trạng | Ghi nhật ký cảm xúc (vui/buồn/stress/mệt) | Gợi ý cách cải thiện tinh thần |
| Thể hình | Theo dõi cân nặng, BMI, lưu hoạt động tập | Gợi ý bài tập phù hợp mục tiêu |
| Dinh dưỡng | Ghi nhật ký ăn uống, theo dõi calo | Phân tích bữa ăn, gợi ý thực đơn |
| Ngủ nghỉ | Ghi giờ ngủ, đánh giá chất lượng | Gợi ý lịch ngủ tốt hơn |

### Vai trò của AI
AI không phải tính năng chính/trung tâm, mà là lớp hỗ trợ chạy ngầm:
- Phân tích dữ liệu sức khỏe đã ghi nhận
- Gợi ý thói quen tốt hơn dựa trên xu hướng dữ liệu
- Tạo báo cáo cá nhân (tuần/tháng)
- Nhắc nhở người dùng (ví dụ: "Bạn chưa ghi nhật ký hôm nay")

### Công nghệ sử dụng
- Backend: Node.js, Express, PostgreSQL (Supabase), JWT (xác thực)
- Frontend: React, Vite
- AI: Tích hợp Claude API (phase sau)

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
- [x] Bảng `users` có thêm cột `role VARCHAR(20) DEFAULT 'user'` (chuẩn bị cho admin sau này)
- [x] `src/controllers/authController.js`
  - [x] Hàm `register` — HOÀN THÀNH, đã test OK (201 Created)
  - [x] Hàm `login` — HOÀN THÀNH, đã test OK (200 + 401 sai password + 401 sai email)
  - [ ] Viết hàm `getMe` (cần middleware xong mới viết được)
- [x] `src/routes/authRoutes.js` — POST /register, /login
- [x] Đăng ký routes vào `server.js`
- [x] `.env` — đã thêm `JWT_SECRET`
- [x] `src/middleware/authMiddleware.js` — HOÀN THÀNH
  - Đủ 6 bước: lấy header, kiểm tra format `Bearer <token>`, tách token, jwt.verify (try/catch), gắn `req.userId`, `next()`
- [ ] ĐANG LÀM TIẾP — Viết hàm `getMe` trong `authController.js`
- [ ] Route GET /api/auth/me (dùng middleware `protect` + `getMe`)

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
