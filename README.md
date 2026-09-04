# 📖 TOEIC Reading Mastery Tool

Hệ thống Fullstack (Next.js App Router + Prisma + PostgreSQL + Ollama/Gemini) hỗ trợ học và luyện thi TOEIC Reading kết hợp AI phân tích bài đọc, giải thích câu hỏi và trích xuất từ vựng.

---

## 🎯 Tính năng chính

- **Quản lý & Luyện tập Bài đọc (Passages)**: Part 6 & Part 7 TOEIC với giao diện làm bài trực quan, đồng hồ đếm giờ.
- **AI Phân tích chuyên sâu (Question & Passage Analysis)**:
  - Phân tích chiến lược đọc từng đoạn văn.
  - Giải thích lý do vì sao đáp án đúng, phân tích bẫy các phương án sai (distractor analysis).
  - Trích xuất dẫn chứng chính xác trong bài đọc (evidence).
  - Chiến lược tiếp cận câu hỏi (solving strategy).
- **Sổ từ vựng thông minh (Vocabulary)**: Tự động trích xuất từ vựng theo bài đọc kèm phiên âm IPA, loại từ, nghĩa, collocations, từ đồng nghĩa/trái nghĩa và ví dụ thực tế.
- **Lịch sử làm bài & Thống kê**: Lưu lịch sử làm bài (Passage & Question Attempts), phân tích điểm yếu theo từng dạng câu hỏi (Main Idea, Detail, Inference, NOT/TRUE, Vocabulary,...).
- **Hỏi đáp AI (Explain Chat)**: Chat trực tiếp với AI để làm rõ thêm các câu hỏi chưa hiểu.

---

## 🏗️ Kiến trúc & Công nghệ

```
┌──────────────────────────────────────────────┐
│           Next.js Fullstack App              │
│                                              │
│  /app               → UI Pages & Layouts     │
│  /app/api           → API Route Handlers     │
│  /components/ui     → Reusable UI Components │
│  /lib/prisma        → Prisma Database Client │
│  /features          → Feature Modules        │
└──────────────────────┬───────────────────────┘
                       │
             ┌─────────┴─────────┐
             │                   │
        PostgreSQL          AI Engine
        (toeic_reading)     (Ollama / Gemini)
```

---

## 🚀 Cài đặt & Chạy ứng dụng

1. **Cài đặt thư viện**:
   ```bash
   npm install
   ```

2. **Cấu hình môi trường**:
   - Sao chép `.env.example` thành `.env`:
     ```env
     DATABASE_URL=postgresql://postgres:postgres@localhost:5432/toeic_reading?schema=public
     OLLAMA_BASE_URL=http://localhost:11434
     OLLAMA_MODEL=qwen3.5:9b
     ```

3. **Khởi động Database qua Docker (nếu dùng Docker)**:
   ```bash
   docker compose up -d
   ```

4. **Đẩy Database Schema (Prisma)**:
   ```bash
   npx prisma db push
   # hoặc npx prisma migrate dev
   ```

5. **Chạy server phát triển**:
   ```bash
   npm run dev
   ```
