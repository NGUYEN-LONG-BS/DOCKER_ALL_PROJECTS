import React, { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';

// Định nghĩa kiểu dữ liệu cho form
interface InventoryFormData {
  id_nhan_vien: string;
  xoa_sua: string;
  ma_hang: string;
  ten_hang: string;
  dvt: string;
  sl_ton_dau_ky: number;
  don_gia_ton_dau_ky: number;
  ma_kho_luu_tru: string;
}

const API_URL = 'http://localhost:8000/api/get-inventory-categories/';

const InventoryForm: React.FC = () => {
  // State để lưu trữ dữ liệu form
  const [formData, setFormData] = useState<InventoryFormData>({
    id_nhan_vien: 'NV01',
    xoa_sua: 'new',
    ma_hang: '',
    ten_hang: '',
    dvt: '',
    sl_ton_dau_ky: 0,
    don_gia_ton_dau_ky: 0,
    ma_kho_luu_tru: 'Kho A', // Mặc định là Kho A
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Hàm xử lý thay đổi giá trị trong form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm gửi dữ liệu form tới API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8000/api/submit-inventory-categories/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Nếu thành công
      setSuccess('Dữ liệu đã được gửi thành công!');
      mutate(API_URL); // Cập nhật lại bảng inventory khi thêm mới thành công
      console.log(response.data);
    } catch (error) {
      setError('Đã có lỗi xảy ra, vui lòng thử lại!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 w-100" style={{ maxWidth: 'unset', margin: 0 }}>
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="row g-3">
          {/* Mã Hàng */}
          <div className="col-12 col-md-6">
            <label htmlFor="ma_hang" className="form-label fw-semibold">Mã Hàng</label>
            <input
              type="text"
              id="ma_hang"
              name="ma_hang"
              className="form-control"
              value={formData.ma_hang}
              onChange={handleChange}
              required
              placeholder="Nhập mã hàng..."
              autoComplete="off"
            />
          </div>
          {/* Tên Hàng */}
          <div className="col-12 col-md-6">
            <label htmlFor="ten_hang" className="form-label fw-semibold">Tên Hàng</label>
            <input
              type="text"
              id="ten_hang"
              name="ten_hang"
              className="form-control"
              value={formData.ten_hang}
              onChange={handleChange}
              required
              placeholder="Nhập tên hàng..."
              autoComplete="off"
            />
          </div>
          {/* Đơn Vị Tính */}
          <div className="col-12 col-md-6">
            <label htmlFor="dvt" className="form-label fw-semibold">Đơn Vị Tính</label>
            <input
              type="text"
              id="dvt"
              name="dvt"
              className="form-control"
              value={formData.dvt}
              onChange={handleChange}
              required
              placeholder="VD: cái, hộp, kg..."
              autoComplete="off"
            />
          </div>
          {/* Số Lượng Tồn Đầu Kỳ */}
          <div className="col-12 col-md-6">
            <label htmlFor="sl_ton_dau_ky" className="form-label fw-semibold">Số Lượng Tồn Đầu Kỳ</label>
            <input
              type="number"
              id="sl_ton_dau_ky"
              name="sl_ton_dau_ky"
              className="form-control"
              value={formData.sl_ton_dau_ky}
              onChange={handleChange}
              required
              min={0}
              placeholder="0"
            />
          </div>
          {/* Đơn Giá Tồn Đầu Kỳ */}
          <div className="col-12 col-md-6">
            <label htmlFor="don_gia_ton_dau_ky" className="form-label fw-semibold">Đơn Giá Tồn Đầu Kỳ</label>
            <input
              type="number"
              id="don_gia_ton_dau_ky"
              name="don_gia_ton_dau_ky"
              className="form-control"
              value={formData.don_gia_ton_dau_ky}
              onChange={handleChange}
              required
              min={0}
              placeholder="0"
            />
          </div>
          {/* Mã Kho Lưu Trữ */}
          <div className="col-12 col-md-6">
            <label htmlFor="ma_kho_luu_tru" className="form-label fw-semibold">Mã Kho Lưu Trữ</label>
            <select
              id="ma_kho_luu_tru"
              name="ma_kho_luu_tru"
              className="form-select"
              value={formData.ma_kho_luu_tru}
              onChange={handleChange}
              required
            >
              <option value="Kho A">Kho A</option>
              <option value="Kho B">Kho B</option>
              <option value="Kho C">Kho C</option>
            </select>
          </div>
        </div>
        {/* Hidden fields */}
        <div className="d-flex justify-content-end mt-4">
          <button type="submit" className="btn btn-primary btn-sm shadow-sm px-4" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {loading ? 'Sending...' : 'Save'}
          </button>
        </div>
        {/* Hiển thị thông báo lỗi hoặc thành công */}
        {error && <div className="alert alert-danger mt-3 mb-0 py-2 px-3 small">{error}</div>}
        {success && <div className="alert alert-success mt-3 mb-0 py-2 px-3 small">{success}</div>}
      </form>
    </div>
  );
};

export default InventoryForm;
