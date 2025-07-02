// src/features/formReceiptSlip/documentNumberSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_new_number_slip_pxk } from '@/api/api';
import { DOCUMENT_NUMBER_SELECTED_ACTION } from '@/actions/documentNumberActions';
import { getPermissionOnDB } from '@/utils/getPermissionOnDB';
import { useUserId } from '@/utils/useUserId';

interface DocumentNumberState {
  documentNumber: string;
  loading: boolean;
  error: string | null;
}

const currentYear = new Date().getFullYear().toString().slice(-2);
// Hàm lấy số phiếu PXK mặc định động theo quyền user
function getDefaultDocumentNumberIssue() {
  if (typeof window !== 'undefined') {
    const userId = localStorage.getItem('user_id') || '';
    const modelKey = localStorage.getItem('model_key') || 'null';
    const SLIP_TYPE_MAP: Record<string, { prefix: string; type: string }> = {
      TB: { prefix: 'TB', type: 'PXK' },
      LA: { prefix: 'LA', type: 'PXK' },
      PA: { prefix: 'PA', type: 'PXK' },
      NAMAN: { prefix: 'NA', type: 'PXK' },
      HANOI: { prefix: 'HN', type: 'PXK' },
      MIENTAY: { prefix: 'MY', type: 'PXK' },
      null: { prefix: '--', type: '---' },
    };
    const slip = SLIP_TYPE_MAP[modelKey] || SLIP_TYPE_MAP['TB'];
    return `${slip.prefix}-${slip.type}-${currentYear}0001`;
  }
  // fallback server-side
  return "null";
}

const initialState: DocumentNumberState = {
  documentNumber: getDefaultDocumentNumberIssue(),
  loading: false,
  error: null,
};

// Đặt map loại phiếu ở đầu file
const SLIP_TYPE_MAP: Record<string, { prefix: string; type: string }> = {
  TB: { prefix: 'TB', type: 'PXK' },
  LA: { prefix: 'LA', type: 'PXK' },
  PA: { prefix: 'PA', type: 'PXK' },
  NAMAN: { prefix: 'NA', type: 'PXK' },
  HANOI: { prefix: 'HN', type: 'PXK' },
  MIENTAY: { prefix: 'MY', type: 'PXK' },
  null: { prefix: '--', type: '---' },
};

export const fetchNewDocumentNumberIssue = createAsyncThunk(
  'documentNumber/fetchNewDocumentNumberIssue',
  async (_: void, { dispatch }) => {
    // Lấy userId từ hook (ưu tiên Redux, fallback localStorage)
    const userId = (typeof window !== 'undefined' && useUserId && useUserId()) || 'unknown';
    try {
      const model_key = await getPermissionOnDB(userId);
      const url =
        model_key && typeof model_key === 'string' && model_key.trim()
          ? `${API_new_number_slip_pxk}?model_key=${encodeURIComponent(model_key)}`
          : API_new_number_slip_pxk;
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
    setDocumentNumberIssue(state, action: PayloadAction<string>) {
      state.documentNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewDocumentNumberIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewDocumentNumberIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.documentNumber = action.payload;
      })
      .addCase(fetchNewDocumentNumberIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch new number';
      });
  },
});

export const { setDocumentNumberIssue } = documentNumberSlice.actions;
export default documentNumberSlice.reducer;