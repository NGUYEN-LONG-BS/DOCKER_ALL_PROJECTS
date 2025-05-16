// Handle save action
const handleSave = async () => {
  // Log state của bảng (items từ inventoryTableSlice)
  console.log("Tab01Form - Inventory Table State on Save:", tableItems);

  // Log all states of child components
  console.log("Tab01Form - States on Save:", {
    DateComponent: { date },
    DocumentNumberComponent: { documentNumber },
    DocumentRequestNumberComponent: { documentRequestNumber },
    SupplierComponent: { supplier },
    InventoryNoteOfStockReceiveSlip: { slipNote },
    ProductComponent: { selectedProduct },
    InventoryTableStockReceiveSlip: { inventoryTable, tableItems },
    FormStates: { selectedFile: selectedFile ? selectedFile.name : null, loading },
  });

  // Validate inventoryTable
  if (!tableItems || !Array.isArray(tableItems) || tableItems.length === 0) {
    console.warn("inventoryTable is empty or invalid:", tableItems);
    dispatch(setErrorMessage("Không có mặt hàng nào để lưu"));
    return;
  }

  // Tạo ngày hiện tại ở định dạng ISO
  const currentDate = new Date().toISOString();
  // Chuyển đổi date thành định dạng ISO (chỉ lấy phần ngày)
  const formattedDate = date ? new Date(date).toISOString().split('T')[0] + 'T00:00:00Z' : currentDate;

  const data = tableItems.map((item, index) => {
    if (!item || typeof item !== "object") {
      console.warn(`Invalid item at index ${index}:`, item);
      return {};
    }
    return {
      id: uuidv4(), // Tạo UUID cho mỗi mục
      date: currentDate, // Ngày hiện tại ở định dạng ISO
      id_nhan_vien: "NV01", // Mã nhân viên cố định
      xoa_sua: "new", // Trạng thái: new
      so_phieu: documentNumber || "TB-PNK-250001", // Mã phiếu nhập kho
      phan_loai_nhap_xuat_hoan: "receipt", // Loại phiếu: nhập kho
      ma_doi_tuong: supplier.code || "madoituong", // Mã đối tượng (nhà cung cấp)
      ngay_tren_phieu: formattedDate, // Ngày trên phiếu ở định dạng ISO
      so_phieu_de_nghi: documentRequestNumber || "TB-DNNK-250001", // Số phiếu đề nghị
      thong_tin_them: slipNote.notesOfSlip || "", // Thông tin thêm
      ma_kho_nhan: slipNote.selectedWarehouse || "Kho A", // Mã kho nhận
      ma_kho_xuat: ".", // Mã kho xuất
      stt_dong: index + 1, // Số thứ tự dòng
      ma_hang: item.code || "", // Mã hàng
      ten_hang: item.name || "", // Tên hàng
      don_vi_tinh: item.unit || "", // Đơn vị tính
      so_luong: (item.quantity > 0 ? item.quantity : 1).toFixed(2), // Số lượng, định dạng 2 chữ số thập phân
      don_gia: (item.price > 0 ? item.price : 1).toFixed(2), // Đơn giá, định dạng 2 chữ số thập phân
      thanh_tien: ((item.quantity > 0 && item.price > 0) ? item.quantity * item.price : 0).toFixed(2), // Thành tiền
      ghi_chu_sp: item.notes || "", // Ghi chú sản phẩm
    };
  });

  // Log the mapped data for debugging
  console.log("Tab01Form - Data to save:", JSON.stringify(data, null, 2));

  // Gửi dữ liệu qua Redux thunk
  dispatch(saveInventory(data));
};