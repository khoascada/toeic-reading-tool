---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

Skill này hướng dẫn cách tạo ra các giao diện frontend khác biệt, đạt chất lượng production và tránh cảm giác thẩm mỹ chung chung kiểu "AI slop". Hãy triển khai mã chạy thực tế, đồng thời chú ý đặc biệt đến chi tiết thẩm mỹ và các lựa chọn sáng tạo.

Người dùng sẽ cung cấp yêu cầu frontend: một component, trang, ứng dụng hoặc giao diện cần xây dựng. Họ cũng có thể đưa thêm ngữ cảnh về mục đích sử dụng, đối tượng người dùng hoặc các ràng buộc kỹ thuật.

Phiên bản tiếng Việt: Đề xuất chiến lược frontend

1. Định hướng thẩm mỹ: "Edutech hiện đại - độ chính xác mang tính trò chơi":
Tầm nhìn cốt lõi là kết hợp chất thẩm mỹ của một công cụ năng suất cao cấp, chuyên nghiệp (như Linear hoặc Vercel) với phản hồi giàu năng lượng của một trò chơi.

Chiến lược kiểu chữ:
- Nội dung học tập: Dùng Lexend, một variable font được thiết kế riêng để giảm căng thẳng thị giác và cải thiện khả năng đọc, rất phù hợp cho ứng dụng học từ vựng.
- Điểm nhấn giao diện: Kết hợp với một font Serif hiện đại như Fraunces để tạo cảm giác "biên tập cao cấp", giúp trải nghiệm trông được tuyển chọn kỹ và có chất lượng cao.
- Màu sắc và chủ đề: dùng màu tương tự `colors.css`; điểm nhấn có tác động mạnh: chỉ dành các màu rực rỡ cho trạng thái thành công (trả lời đúng, lên cấp) để tạo phần thưởng tâm lý rõ rệt.

## Hướng dẫn layout và component

### Dashboard kiểu Bento Grid
- Thiết kế lại dashboard bằng layout **Bento Grid**
- Áp dụng hiệu ứng **Glassmorphism** với lớp nền làm mờ
- Dùng **đường viền siêu mảnh** (`0.5px`) để tạo cảm giác tinh tế

### Chuyển động và animation
- Dùng `tailwindcss-animate` cho các animation dựa trên CSS
- Tập trung vào các **thời điểm có tác động mạnh**: lúc tải trang, lúc chuyển trạng thái
- Triển khai **hiệu ứng xuất hiện so le** với `animation-delay`

### Animation phản hồi FSRS
- Tạo animation cho "Vòng đời ghi nhớ" khi thuật toán FSRS lên lịch cho một từ
- **Mức Hard**: animation thoát chậm, nặng
- **Mức Easy**: thẻ bay ra nhanh, dứt khoát

## Quy tắc styling cho component

1. **Dùng Radix UI primitives** từ `components/ui/`
2. **Áp dụng màu sắc** từ các CSS variables trong `styles/colors.css`
3. **Hỗ trợ dark/light mode** qua `next-themes`
4. **Giữ tính nhất quán** với design system hiện có

## Nên và không nên

### Nên
- Dùng không gian màu OKLCH từ `colors.css`
- Áp dụng các màu ngữ nghĩa (`--success`, `--error`, `--warning`)
- Chỉ dành màu rực rỡ cho trạng thái thành công (phản hồi phần thưởng)
- Dùng `--primary` cho các phần tử tương tác
- Dùng `min-h-[100dvh]` (hoặc `min-h-dvh`) cho các section toàn màn hình để tránh hiện tượng layout bị nhảy do thanh địa chỉ trên mobile (iOS Safari)

### Không nên
- Hardcode giá trị màu
- Dùng các font quá phổ thông (Arial, Inter, Roboto)
- Tạo gradient tím trên nền trắng
- Bỏ qua hỗ trợ dark mode
- Dùng `100vh` / `h-screen` cho các section toàn màn hình vì gây nhảy layout trên iOS Safari
