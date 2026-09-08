import { revalidatePath } from 'next/cache';

/**
 * Revalidate toàn bộ ứng dụng (Root Layout & tất cả các trang con).
 * Giúp đảm bảo dữ liệu luôn đồng bộ tức thì trên tất cả các trang
 * khi có bất kỳ thao tác Thêm / Sửa / Xóa dữ liệu nào.
 */
export function revalidateApp() {
  revalidatePath('/', 'layout');
}
