// components/HomeIcon.tsx
import { forwardRef } from "react";

const HomeIcon = forwardRef<SVGSVGElement>((props, ref) => (
  <svg
    ref={ref}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="4" fill="#198754" />
    <text
      x="50%"
      y="50%"
      fontSize="20"
      fontWeight="bold"
      fill="white"
      textAnchor="middle"
      dominantBaseline="central" // Thay middle bằng central để căn dọc chính xác hơn
      dy="0.05em" // Giảm dy để tinh chỉnh thêm
      fontFamily="system-ui, -apple-system, sans-serif" // Chỉ định font để nhất quán
    >
      NL
    </text>
  </svg>
));

HomeIcon.displayName = "HomeIcon";

export default HomeIcon;