# AGENTS.md — Next.js Starter Architecture

`AGENTS.md` là hướng dẫn vận hành chính cho repo này. Nếu có mâu thuẫn giữa các file AI docs, ưu tiên file này và cây `.agents/**`.

## Quy trình bắt buộc

1. Đọc file này trước khi sửa code hoặc docs quan trọng.
2. Route task qua [.agents/skills/using-agent-skills/SKILL.md](.agents/skills/using-agent-skills/SKILL.md).
3. Nếu task chạm vào logic/code, đọc thêm skill phù hợp được meta-skill chỉ ra.
4. Nếu task liên quan SSR với React Query, đọc thêm [.agents/docs/ssr-react-query-setup.md](.agents/docs/ssr-react-query-setup.md).
5. Nếu user yêu cầu trái với skill hoặc hard rule, dừng lại và làm rõ trước khi sửa.

## Nguồn sự thật

- Hướng dẫn vận hành chính: `AGENTS.md`
- Skills chính: `.agents/skills/**`
- Docs chính: `.agents/docs/**`
- Compatibility mirror: `CLAUDE.md` và `.claude/**`

Không duy trì policy trùng lặp ở nhiều nơi. Nếu cần cập nhật hướng dẫn, cập nhật ở `.agents/**` trước.

## Skill routing

Mọi quyết định "task này nên dùng skill nào" phải đi qua:

- [.agents/skills/using-agent-skills/SKILL.md](.agents/skills/using-agent-skills/SKILL.md)

Không tự dựng route table ở file khác.

## External skill: `design-taste-frontend`

Đây là skill ngoài, chỉ nên dùng khi bài toán thực sự cần tăng chất lượng thẩm mỹ hoặc exploratory design. Không bật mặc định.

Hard rule:

- Skill ngoài phải nhường cho design system, token, component patterns và constraints đang tồn tại trong repo hiện tại.
- Có thể mượn layout thinking, motion principles, a11y/UX checks.
- Không áp aesthetic, font, màu, radius hay visual language từ skill ngoài nếu repo local đã có quy ước riêng.

## Hard rules

- File và folder dùng `kebab-case`.
- Ưu tiên App Router patterns hiện tại của Next.js.
- Với page client có logic riêng:
  - Nếu page đủ dài hoặc có nhiều state/handlers/derived state, ưu tiên tách thành 3 phần: `use-*-page.ts` cho logic, `*-page-view.tsx` cho UI, và `*-page-client.tsx` để nối hook với view.
  - Nếu page ngắn và logic rất đơn giản, ví dụ chỉ fetch data rồi render, có thể giữ gọn trong một `*-page-client.tsx`.
- Shared UI primitives nằm trong `components/ui`.
- Shared UI primitives nằm trong `components/ui`.
- Shared reusable UI khác nằm trong `components/shared` hoặc `components/layouts` khi phù hợp.
- Hạ tầng dùng chung, config, providers, helpers đặt trong `lib/`.
- Services/API layer đặt trong `services/`.
- Không dùng `any` nếu chưa rõ type. Dùng `unknown` rồi narrow sau.
- Chỉ dùng `validateResponse` cho endpoint có blast radius cao nếu utility đó thực sự đang được dùng trong repo.
- Khi cần log cho development, ưu tiên utility nội bộ của repo thay vì thêm pattern logging mới.
- Khi trả lời user với file local, dùng markdown link có path rõ ràng.

## Ponytail

Khi code, ưu tiên cách tối giản đúng nghĩa:

1. Không cần thì đừng build.
2. Có sẵn trong codebase thì reuse.
3. Stdlib làm được thì dùng stdlib.
4. Native platform làm được thì dùng native.
5. Tránh thêm dependency mới nếu vài dòng là đủ.
6. Viết ít file nhất, diff nhỏ nhất, không abstraction thừa.

Luôn đọc flow liên quan trước khi sửa. Fix root cause, không vá triệu chứng.
Không được tối giản mất validation, error handling quan trọng, security, accessibility.

## Scope của starter này

Repo này là một starter tổng quát cho Next.js, không gắn với domain cũ. Đừng giả định:

- có i18n
- có feature-based architecture bắt buộc
- có route groups cố định
- có auth/payment/search flow mặc định
- có visual identity cố định

Chỉ dựa vào cấu trúc và code đang tồn tại trong workspace hiện tại.
