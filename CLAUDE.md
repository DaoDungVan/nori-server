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
- Cách giải thích hiệu quả với user này:
  - So sánh khái niệm mới với cái user **đã biết** (vd: middleware giống controller nhưng có thêm `next`)
  - Dùng **chính code user vừa viết** làm ví dụ minh họa, không dùng ví dụ trừu tượng
  - Vẽ sơ đồ luồng (ASCII) khi giải thích thứ tự xử lý / flow
  - Kết thúc bằng 1 câu tóm tắt ngắn gọn ("Tóm lại — 1 câu: ...")
- Cách viết skeleton hiệu quả với user này:
  - Giữ nguyên phần code user đã biết/đã quen (try/catch, res.status, cấu trúc hàm) — chỉ để trống (`// TODO`) đúng phần kiến thức MỚI cần học
  - Đánh số TODO (`TODO 1`, `TODO 2`...) nếu có nhiều chỗ trống, để user dễ trả lời theo thứ tự
  - Trước hoặc sau skeleton, đặt 1 câu hỏi gợi mở liên quan đến phần TODO quan trọng nhất — để user tự suy nghĩ trước khi viết, không chỉ chép
  - Khi có hàm tương tự đã viết trước đó (vd: register vs login vs getMe), chỉ rõ "giống hàm X, chỉ khác chỗ Y" thay vì giải thích lại từ đầu

---

## Tiến độ

### ✅ Phase 1 — Database
6 bảng đã tạo trên Supabase (without RLS): `users`, `mood_logs`, `workout_logs`, `nutrition_logs`, `sleep_logs`, `weight_logs`

### ✅ Phase 2 — Authentication BACKEND: HOÀN THÀNH
- [x] Bảng `users` có thêm cột `role VARCHAR(20) DEFAULT 'user'` (chuẩn bị cho admin sau này)
- [x] `src/controllers/authController.js` — register, login, getMe — đều xong + test OK
- [x] `src/routes/authRoutes.js` — POST /register, POST /login, GET /me (có `protect`)
- [x] `src/middleware/authMiddleware.js` (`protect`) — xong, test đủ 3 case (token đúng/thiếu/sai)
- [x] `.env` — đã có `JWT_SECRET`

🔜 Backend Phase 2 xong hoàn toàn. Việc tiếp theo cho Phase 2 nằm ở **nori-client** (frontend: Register/Login/Protected Route).

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
