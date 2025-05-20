// Hàm định dạng số với dấu phân cách hàng nghìn và phần thập phân
export const formatNumber = (value: string | number): string => {
  if (!value && value !== 0) return "";
  const num = parseFloat(value.toString().replace(/,/g, ""));
  if (isNaN(num)) return "";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
    maximumFractionDigits: 2,
  }).replace(/\.00$/, ""); // Loại bỏ .00 nếu là số nguyên
};