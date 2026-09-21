# Hướng Dẫn Cấu Hình Bác Sĩ AI (Chatbot)

Tính năng Chatbot Bác Sĩ AI sử dụng chuẩn kết nối OpenAI (có thể dùng với OpenRouter, Groq, ChatGPT, v.v.). Để Chatbot hoạt động ở chế độ Online, bạn bắt buộc phải tuân thủ hướng dẫn về Môi trường (Environment) dưới đây.

## 1. Lưu ý TỐI QUAN TRỌNG về Môi trường chạy (Tránh lỗi 404)

Hệ thống API gọi tới AI được lập trình dưới dạng **Vercel Serverless Function** (tại file `api/chat.js`) và cũng có thể chạy local với Express (tại `backend/server.js`).

❌ **Nhưng cách chạy GÂY LỖI 404 (Luôn Offline):**
- Mở thẳng file `index.html` bằng trình duyệt (giao thức `file:///`).
- Dùng các phần mềm Static Server như Live Server của VSCode, `python -m http.server`, `http-server`...
> Ở các môi trường này, đường dẫn `/api/chat` KHÔNG TỒN TẠI. Bot sẽ không tìm thấy server ảo và tự động chuyển về 🔴 Offline Mode.

✅ **CÁCH CHẠY CHUẨN ĐỂ ONLINE:**
1. **Chạy Node.js Local:** Mở terminal, chạy lệnh `node backend/server.js`. Sau đó truy cập `http://localhost:8899`.
2. **Chạy bằng Vercel CLI (vercel dev):** Nếu bạn có cài đặt Vercel CLI, dùng lệnh `vercel dev` và truy cập cổng 3000.
3. **Chạy Production (Đã đưa lên mạng):** Truy cập trực tiếp tên miền Vercel (ví dụ `https://ifyoufall.vercel.app`).

---

## 2. Thiết Lập API Key
Dự án sử dụng chuẩn biến môi trường `OPENAI_API_KEY`. Bạn có thể lấy API Key miễn phí từ các nền tảng như [OpenRouter](https://openrouter.ai/) hoặc [Groq](https://console.groq.com/).

### Chạy Local
- Copy file `.env.example` thành `.env` ở thư mục gốc (nếu có) hoặc tạo file `.env` mới.
- Điền API Key của bạn vào: `OPENAI_API_KEY=sk-or-v1-...`
- (Tuỳ chọn) Nếu dùng Groq, bạn có thể thiết lập `OPENAI_API_URL=https://api.groq.com/openai/v1/chat/completions` và `AI_MODEL=llama3-8b-8192`. Mặc định đang thiết lập cho OpenRouter.

### Chạy Production (Đã deploy Vercel)
Vì file `.env` chứa mật khẩu nên sẽ BỊ CHẶN không cho đẩy lên GitHub/Vercel (do đã cài đặt trong `.gitignore`).
Do đó, khi đưa lên mạng, API Key của bạn sẽ bị mất, gây lỗi 🔴 Offline.

**Cách khắc phục:**
1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard).
2. Chọn dự án "If You Fall" ➔ Settings ➔ Environment Variables.
3. Thêm biến mới với tên `OPENAI_API_KEY` và dán key của bạn vào.
4. (Tuỳ chọn) Thêm biến `OPENAI_API_URL` và `AI_MODEL` nếu dùng nhà cung cấp khác OpenRouter.
5. Bấm **Deployments** ➔ Redeploy bản mới nhất để Vercel nhận diện key mới.

---

## 3. Khắc phục sự cố thường gặp (Troubleshooting)

Nếu gặp cảnh báo Offline, hãy mở F12 (Console) trên trình duyệt để đọc log:
- **Lý do 404 - Sai môi trường:** Bạn đang không chạy server cục bộ hoặc không truy cập qua domain thật.
- **Lý do Sai API Key (401/403):** API Key đã hết hạn, chưa kích hoạt, hoặc copy thiếu ký tự.
- **Lý do 429 - Quá tải/Giới hạn:** Provider của bạn đã chặn do gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng đợi một lát rồi thử lại.
- **Mất kết nối API:** Rớt mạng hoặc Backend Vercel đang bị lỗi tạm thời. Hệ thống vẫn sẽ trả lời bạn bằng dữ liệu sơ cứu nội bộ.
