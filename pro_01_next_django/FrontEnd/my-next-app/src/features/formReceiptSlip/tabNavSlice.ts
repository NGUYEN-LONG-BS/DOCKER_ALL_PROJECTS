import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa hằng số TAB_NAMES
export const TAB_NAMES = {
  NHAP_KHO: 'nhap-kho',
  XUAT_KHO: 'xuat-kho',
  TAO_MOI_MA_HANG: 'tao-moi-ma-hang',
  NHAT_KY_NHAP_KHO: 'nhat-ky-nhap-kho',
  NHAT_KY_XUAT_KHO: 'nhat-ky-xuat-kho',
  BAO_CAO_TON_KHO: 'bao-cao-ton-kho',
} as const;

interface TabNavState {
  activeTab: string;
}

const initialState: TabNavState = {
  activeTab: TAB_NAMES.NHAP_KHO,
};

const tabNavSlice = createSlice({
  name: 'tabNav',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = tabNavSlice.actions;
export default tabNavSlice.reducer;