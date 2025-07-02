// src/features/formReceiptSlip/documentNumberSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_new_number_slip_pnk } from '@/api/api';
import { DOCUMENT_NUMBER_SELECTED_ACTION } from '@/actions/documentNumberActions';
import { getPermissionOnDB } from '@/utils/getPermissionOnDB';
import { useUserId } from '@/utils/useUserId';

interface DocumentNumberState {
  documentNumber: string;
  loading: boolean;
  error: string | null;
}

const currentYear = new Date().getFullYear().toString().slice(-2);
// Hàm lấy số phiếu mặc định động theo quyền user
function getDefaultDocumentNumber() {
  if (typeof window !== 'undefined') {
    const userId = localStorage.getItem('user_id') || '';
    // getPermissionOnDB là async, nhưng initialState cần sync, nên chỉ lấy từ localStorage
    const modelKey = localStorage.getItem('model_key') || 'null';
    const SLIP_TYPE_MAP: Record<string, { prefix: string; type: string }> = {
      TB: { prefix: 'TB', type: 'PNK' },
      LA: { prefix: 'LA', type: 'PNK' },
      PA: { prefix: 'PA', type: 'PNK' },
      NAMAN: { prefix: 'NA', type: 'PNK' },
      HANOI: { prefix: 'HN', type: 'PNK' },
      MIENTAY: { prefix: 'MY', type: 'PNK' },
      null: { prefix: '--', type: '---' },
    };
    const slip = SLIP_TYPE_MAP[modelKey] || SLIP_TYPE_MAP['null'];
    return `${slip.prefix}-${slip.type}-${currentYear}0001`;
  }
  // fallback server-side
  return "null";
}

const initialState: DocumentNumberState = {
  documentNumber: getDefaultDocumentNumber(),
  loading: false,
  error: null,
};

// Đặt map loại phiếu ở đầu file
const SLIP_TYPE_MAP: Record<string, { prefix: string; type: string }> = {
  TB: { prefix: 'TB', type: 'PNK' },
  LA: { prefix: 'LA', type: 'PNK' },
  PA: { prefix: 'PA', type: 'PNK' },
  NAMAN: { prefix: 'NA', type: 'PNK' },
  HANOI: { prefix: 'HN', type: 'PNK' },
  MIENTAY: { prefix: 'MY', type: 'PNK' },
  null: { prefix: '--', type: '---' },
};

export const fetchNewDocumentNumberReceipt = createAsyncThunk(
  'documentNumber/fetchNewDocumentNumberReceipt',
  async (_: void, { dispatch }) => {
    // Lấy userId từ hook (ưu tiên Redux, fallback localStorage)
    const userId = (typeof window !== 'undefined' && useUserId && useUserId()) || 'unknown';
    try {
      const model_key = await getPermissionOnDB(userId);
      const url =
        model_key && typeof model_key === 'string' && model_key.trim()
          ? `${API_new_number_slip_pnk}?model_key=${encodeURIComponent(model_key)}`
          : API_new_number_slip_pnk;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch new document number');
      const data = await response.json();
      return data.new_number_slip;
    } catch (error) {
      // Lấy prefix động từ model_key nếu có, mặc định là TB
      let model_key = 'null';
      if (typeof userId === 'string' && userId.trim()) {
        const key = await getPermissionOnDB(userId);
        if (key && SLIP_TYPE_MAP[key]) model_key = key;
      }
      const slip = SLIP_TYPE_MAP[model_key] || SLIP_TYPE_MAP['null'];
      return `${slip.prefix}-${slip.type}-${currentYear}0001`;
    }
  }
);

const documentNumberSlice = createSlice({
  name: DOCUMENT_NUMBER_SELECTED_ACTION,
  initialState,
  reducers: {
    setDocumentNumberReceipt(state, action: PayloadAction<string>) {
      state.documentNumber = action.payload;
    },
    reset(state) {
      state.documentNumber = initialState.documentNumber;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewDocumentNumberReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewDocumentNumberReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.documentNumber = action.payload;
      })
      .addCase(fetchNewDocumentNumberReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch new number';
      });
  },
});

export const { setDocumentNumberReceipt } = documentNumberSlice.actions;
export default documentNumberSlice.reducer;