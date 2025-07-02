// src/utils/resetReduxStore.ts
import { store } from '@/store/store';

/**
 * Reset toàn bộ Redux store về trạng thái mặc định (initialState) của các slice.
 * Sử dụng cho logout hoặc các trường hợp cần clear toàn bộ state.
 *
 * Cách dùng:
 *   import { resetReduxStore } from '@/utils/resetReduxStore';
 *   resetReduxStore();
 */
export function resetReduxStore() {
  // Lấy tất cả các reducer keys
  const stateKeys = Object.keys(store.getState());
  // Dispatch action type @@RESET cho từng slice (nếu slice có lắng nghe)
  stateKeys.forEach(key => {
    store.dispatch({ type: `${key}/reset` });
  });
  // Ngoài ra, có thể dispatch thêm action logout nếu cần
  // store.dispatch({ type: 'user/logout' });
}
