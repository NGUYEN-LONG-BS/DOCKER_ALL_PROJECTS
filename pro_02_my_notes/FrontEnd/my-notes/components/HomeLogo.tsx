// components/HomeLogo.tsx
import { forwardRef } from "react";

const HomeLogo = forwardRef<SVGSVGElement>((props, ref) => (
  <svg
    ref={ref}
    width="100"
    height="40"
    viewBox="0 0 100 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="4" fill="#198754" />
    <text
      x="20"
      y="20"
      fontSize="20"
      fontWeight="bold"
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      dy="0.05em"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      NL
    </text>
    <text
      x="48"
      y="20"
      fontSize="16"
      fontWeight="600"
      fill="#155724"
      textAnchor="start"
      dominantBaseline="central"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      Learning
    </text>
  </svg>
));

HomeLogo.displayName = "HomeLogo";

export default HomeLogo;