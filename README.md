# Bếp Nhỏ — 6651071015_LAB2

Trang khám phá công thức nấu ăn cá nhân hóa cho MSSV **6651071015**.

## Cá nhân hóa theo MSSV

| Giá trị | Phép tính | Kết quả |
|---|---|---|
| S | 6 + 6 + 5 + 1 + 0 + 7 + 1 + 0 + 1 + 5 | 32 |
| D | 32 mod 15 | 2 — Công thức nấu ăn |
| F | 15 mod 10 | 5 — VI/EN không tải lại; so sánh nhiều món; skeleton loading |
| C | 6 mod 5 | 1 — Emerald `#059669` |

Website có 21 công thức riêng bằng tiếng Việt và tiếng Anh. Có thể tìm món, lọc
theo danh mục và thời gian nấu, xem cách làm chi tiết, đổi ngôn ngữ không tải lại
và so sánh tối đa ba công thức. Ngôn ngữ và danh sách so sánh được lưu trong
`localStorage`.

## Công nghệ

- React 18, TypeScript strict, Vite 6.
- Tailwind CSS 3; CSS bổ sung điều khiển bố cục và các breakpoint.
- React Router 6, React Context và React Hooks.
- ESLint 9, Vitest 5, React Testing Library, jsdom.

## Chạy trên máy

Yêu cầu Node.js và npm.

```powershell
cd D:\6651071015_LAB2
npm install
npm run dev
```

Mở URL Vite hiển thị trong terminal (thường là `http://localhost:5173`).

## Kiểm tra chất lượng

```powershell
npx tsc --noEmit
npx eslint .
npm run test
npm run build
```

## Cấu trúc chính

```text
src/
  components/    Giao diện dùng chung, thẻ món và skeleton
  context/       Ngôn ngữ, so sánh và thông báo
  data/          Dữ liệu công thức và kiểm tra dữ liệu
  pages/         Trang danh sách, chi tiết và so sánh
  utils.ts       Bốn tiện ích bắt buộc
  utils.test.ts  Giữ nguyên sáu trường hợp kiểm thử được cấp trong đề
```

## Cài đặt tính năng so sánh (đoạn tham khảo để tự trình bày)

Tính năng so sánh được xây dựng để người dùng có thể chọn tối đa ba công thức và đối chiếu chúng ngay trên một trang. Mình lưu danh sách mã công thức bằng React Context để mọi trang đều đọc được cùng một trạng thái, sau đó đồng bộ danh sách đó với localStorage để lựa chọn vẫn còn khi tải lại trang. Khi nhấn nút so sánh trên thẻ món ăn, ứng dụng kiểm tra món đó đã có trong danh sách chưa: nếu đã có thì bỏ chọn, nếu chưa có và vẫn còn chỗ thì thêm món mới. Nếu đã chọn đủ ba món, ứng dụng không thêm món thứ tư mà hiện thông báo giới hạn cho người dùng. Trang so sánh tra cứu các mã đã chọn trong bộ dữ liệu, rồi hiển thị tên món, thời gian nấu, lượng calo, nguyên liệu và các bước làm trong một bảng. Mỗi món đều có nút xóa riêng, đồng thời người dùng có thể xóa toàn bộ lựa chọn hoặc quay lại danh sách để chọn thêm món. Bảng có thể cuộn ngang trên màn hình nhỏ; các nút có nhãn hỗ trợ trình đọc màn hình. Mình chọn cách này vì yêu cầu bài không cho cài thư viện quản lý trạng thái ngoài, còn Context, Hooks và localStorage đã đủ cho bộ dữ liệu tĩnh của bài.

> Hãy chỉnh lại đoạn tham khảo bằng lời của chính bạn trước khi đưa vào báo cáo, như đề yêu cầu.

## Ghi hình và nộp bài

1. Chụp ảnh toàn màn hình terminal sau từng lệnh kiểm tra; giữ cả tên lệnh và
   kết quả thành công trong ảnh.
2. Chạy Lighthouse cho **Mobile**, rồi chụp trang báo cáo có Performance,
   Accessibility và Best Practices. Mục tiêu lần lượt là 70, 90 và 90 trở lên.
3. Quay video demo tối đa 3 phút: đổi VI/EN, tìm/lọc món, mở trang chi tiết,
   chọn hai hoặc ba món và chỉ trang so sánh, sau đó tải lại trang để cho thấy
   lựa chọn được lưu.
4. Tạo PDF gồm họ tên, MSSV, phép tính cá nhân hóa, link GitHub, link website
   đã deploy, link video, bốn ảnh chụp kiểm tra và phần giải thích kỹ thuật do
   chính bạn viết. Nộp PDF lên Moodle đúng hạn.

## Triển khai

Có thể kết nối repository với Vercel hoặc Netlify và triển khai nhánh `main`.
Trước khi nộp, mở link công khai ở cửa sổ riêng tư để xác nhận trang truy cập
được.
