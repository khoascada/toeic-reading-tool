---
name: using-agent-skills
description: Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to the current task. This is the meta-skill that governs how all other skills are discovered and invoked.
---

# Sử Dụng Agent Skills

## Tổng quan

Agent Skills là một tập hợp các skill workflow cho kỹ thuật, được tổ chức theo từng giai đoạn phát triển. Mỗi skill mã hóa một quy trình cụ thể mà các kỹ sư senior thường áp dụng. Meta-skill này giúp bạn tìm đúng skill và áp dụng nó cho task hiện tại.

## Khám phá skill

Khi có một task mới, hãy xác định nó đang thuộc giai đoạn phát triển nào và áp dụng skill tương ứng. Cây dưới đây CHỈ liệt kê các skill thực sự đã được cài trong project này, không route sang skill nào ngoài cây này.

```text
Task arrives
    |
    |-- Ask mơ hồ, thiếu who/why/success? ------------------> interview-me
    |-- Có concept thô, cần variants/stress-test? ----------> idea-refine
    |-- Feature/change lớn, chưa có spec? ------------------> spec-driven-development
    |
    |-- Implementing code?
    |   |-- Business logic / API / hooks / services / state / naming / imports -> code-conventions
    |   |-- UI - visual / design system (màu, font, radius, motion, layout) --> frontend-design
    |   |-- UI - engineering (a11y, state mgmt, component architecture) ------> frontend-ui-engineering
    |   |-- Refactor component API / compound / render props / context -------> vercel-composition-patterns
    |   `-- Performance / re-render / data fetching / bundle -----------------> vercel-react-best-practices
    |
    `-- Review UI / a11y audit / UX check -----------------------------------> web-design-guidelines
```

### Phân vai skill cho FE

Khi `frontend-design` và `frontend-ui-engineering` cùng được áp dụng, ví dụ khi build UI mới, hãy phân vai như sau:

- `frontend-design` = nguồn hướng dẫn cho phần visual / design system: màu sắc, font, radius, motion, layout và tính nhất quán về thị giác.
- `frontend-ui-engineering` = nguồn hướng dẫn cho phần engineering: a11y, state management, component architecture, loading/empty/error states.

Khi có xung đột về mặt visual, hãy ưu tiên design system thực tế của project hiện tại.

## Hành vi vận hành cốt lõi

Những hành vi này luôn áp dụng, ở mọi thời điểm và cho mọi skill. Đây là các nguyên tắc không được bỏ qua.

### 1. Nêu rõ giả định

Trước khi implement bất kỳ thứ gì không quá nhỏ, hãy nói rõ các giả định của bạn:

```text
NHỮNG GIẢ ĐỊNH MÌNH ĐANG ĐẶT RA:
1. [giả định về yêu cầu]
2. [giả định về kiến trúc]
3. [giả định về phạm vi]
-> Nếu có gì sai, sửa mình ngay lúc này; nếu không mình sẽ tiếp tục với các giả định này.
```

Đừng âm thầm tự điền vào những chỗ yêu cầu còn mơ hồ. Kiểu lỗi phổ biến nhất là tự đặt giả định sai rồi cứ thế làm tiếp mà không kiểm tra. Hãy bộc lộ phần chưa chắc chắn từ sớm, như vậy rẻ hơn nhiều so với làm lại.

### 2. Chủ động xử lý sự mơ hồ

Khi bạn gặp điểm không nhất quán, yêu cầu mâu thuẫn hoặc đặc tả chưa rõ:

1. DỪNG LẠI. Đừng tiếp tục bằng một phỏng đoán.
2. Chỉ ra chính xác chỗ đang gây mơ hồ.
3. Nêu tradeoff hoặc hỏi câu làm rõ.
4. Chờ được làm rõ rồi mới tiếp tục.

Ví dụ không tốt: âm thầm chọn một cách hiểu rồi hy vọng nó đúng.
Ví dụ tốt: "Mình thấy spec nói X nhưng code hiện tại lại là Y. Cái nào mới là ưu tiên?"

### 3. Phản biện khi cần thiết

Bạn không phải một cỗ máy chỉ biết đồng ý. Khi một hướng làm có vấn đề rõ ràng:

- Chỉ ra vấn đề một cách trực tiếp
- Giải thích downside cụ thể, càng định lượng được càng tốt
- Đề xuất một phương án thay thế
- Chấp nhận quyết định của người dùng nếu họ vẫn muốn đi tiếp sau khi đã có đủ thông tin

Sự xu nịnh là một failure mode. Câu kiểu "Đúng rồi!" rồi đi implement một ý tưởng tệ sẽ không giúp ai cả. Bất đồng kỹ thuật một cách trung thực có giá trị hơn nhiều so với đồng ý cho có.

### 4. Giữ sự đơn giản

Xu hướng tự nhiên là làm mọi thứ phức tạp hơn mức cần thiết. Hãy chủ động chống lại điều đó.

Trước khi chốt một implementation, hãy tự hỏi:

- Việc này có thể làm với ít dòng hơn không?
- Các abstraction này có thực sự đáng với độ phức tạp mà nó mang lại không?
- Nếu một staff engineer nhìn vào, họ có nói "sao không làm cách đơn giản hơn?" không?

Nếu bạn viết 1000 dòng trong khi 100 dòng là đủ, thì đó là thất bại. Hãy ưu tiên giải pháp đơn giản, nhàm chán nhưng rõ ràng. Sự clever rất đắt đỏ.

### 5. Giữ kỷ luật về phạm vi

Chỉ chạm vào đúng phần được yêu cầu.

KHÔNG làm những việc sau:

- Xóa comment mà bạn chưa hiểu
- "Dọn dẹp" những đoạn code không liên quan trực tiếp tới task
- Refactor các hệ thống lân cận như một tác dụng phụ
- Xóa code có vẻ như không dùng đến khi chưa được cho phép rõ ràng
- Thêm tính năng ngoài spec chỉ vì "có vẻ hữu ích"

Công việc của bạn là chính xác như phẫu thuật, không phải tự ý cải tạo nhà.

### 6. Kiểm chứng, đừng đoán

Mỗi skill đều có bước verification. Một task chưa được xem là hoàn tất cho tới khi verification pass. "Trông có vẻ đúng" không bao giờ là đủ, phải có bằng chứng như test pass, build output hoặc dữ liệu runtime.

## Các failure mode cần tránh

Đây là những lỗi tinh vi, trông có vẻ như đang làm việc hiệu quả nhưng thực ra lại gây vấn đề:

1. Đặt giả định sai mà không kiểm tra
2. Không tự quản lý sự mơ hồ của chính mình, cứ làm tiếp dù đang bị lạc hướng
3. Không nêu ra những điểm không nhất quán mà bạn nhận thấy
4. Không trình bày tradeoff ở những quyết định không hiển nhiên
5. Xu nịnh, kiểu "Tất nhiên rồi!" với những hướng đi có vấn đề rõ ràng
6. Làm code và API phức tạp quá mức
7. Sửa code hoặc comment ngoài phạm vi task
8. Xóa những thứ mà bạn chưa thực sự hiểu
9. Bắt tay build mà không có spec chỉ vì "chắc là hiển nhiên"
10. Bỏ qua verification chỉ vì "nhìn có vẻ ổn"

## Quy tắc dùng skill

1. Trước khi bắt đầu, hãy kiểm tra xem có skill nào áp dụng được không. Skill tồn tại để mã hóa các quy trình giúp tránh lỗi phổ biến.
2. Skill là workflow, không phải gợi ý tham khảo. Hãy làm theo các bước theo đúng thứ tự. Đừng bỏ qua bước verification.
3. Nhiều skill có thể cùng áp dụng. Ví dụ một feature có thể đi theo chuỗi `interview-me` -> `idea-refine` -> `spec-driven-development` -> `code-conventions` cho logic + `frontend-design`/`frontend-ui-engineering` cho UI -> `web-design-guidelines` để review.
4. Khi còn phân vân, hãy bắt đầu bằng spec. Nếu task không nhỏ và chưa có spec, hãy bắt đầu bằng `spec-driven-development`.

## Trình tự vòng đời

Với một feature hoàn chỉnh, chuỗi skill điển hình sẽ là:

```text
1. interview-me              -> Làm rõ user thực sự muốn gì
2. idea-refine               -> Làm sắc nét ý tưởng, stress-test giả định
3. spec-driven-development   -> Xác định chính xác thứ sẽ được build
4. Implement:
     code-conventions          -> Business logic / API / hooks / services / state
     frontend-design           -> UI visual / design system
     frontend-ui-engineering   -> UI engineering (a11y, state, architecture)
     vercel-composition-patterns / vercel-react-best-practices -> component API / perf
5. web-design-guidelines     -> Review UI / a11y / UX trước khi merge
```

Không phải task nào cũng cần dùng hết tất cả skill. Một chỉnh sửa UI nhỏ có thể chỉ cần `frontend-design` + `frontend-ui-engineering`. Một thay đổi chỉ có logic có thể chỉ cần `code-conventions`.

## Tham chiếu nhanh

| Giai đoạn | Skill | Tóm tắt một dòng |
| --- | --- | --- |
| Define | interview-me | Làm rõ user thực sự muốn gì trước khi có plan, spec hoặc code |
| Define | idea-refine | Mài sắc ý tưởng bằng tư duy phân kỳ và hội tụ có cấu trúc |
| Define | spec-driven-development | Chốt requirements và acceptance criteria trước khi code |
| Build | code-conventions | Business logic, API, hooks, services, state, naming, imports |
| Build | frontend-design | UI visual / design system (màu, font, radius, motion, layout) |
| Build | frontend-ui-engineering | UI engineering - a11y, state management, component architecture |
| Build | vercel-composition-patterns | Compound components, render props, context, component API |
| Build | vercel-react-best-practices | Performance, re-render, data fetching, bundle optimization |
| Review | web-design-guidelines | Review UI theo Web Interface Guidelines về a11y và UX |
