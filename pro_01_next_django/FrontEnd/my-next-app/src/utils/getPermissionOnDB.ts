// Hàm lấy params model_key cho API NCC, có thể mở rộng sau này
export function getSupplierModelKey() {
  // Có thể lấy từ config, env, hoặc truyền động từ props/context nếu cần
  return "TB";
}
