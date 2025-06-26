import React, { useState } from 'react';
import axios from 'axios';
import { API_submit_inventory_categories } from '@/api/api';
import { getSupplierModelKey } from '@/utils/getPermissionOnDB';

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
    ma_kho_luu_tru: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [modelKey, setModelKey] = useState<string | null>(null);

  React.useEffect(() => {
    async function fetchModelKey() {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') || '' : '';
      if (userId) {
        const key = await getSupplierModelKey(userId);
        setModelKey(key);
      }
    }
    fetchModelKey();
  }, []);

  // Hàm xử lý thay đổi giá trị trong form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const payload = { ...formData, model_key: modelKey };
      const response = await axios.post(API_submit_inventory_categories, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Nếu thành công
      setSuccess('Dữ liệu đã được gửi thành công!');
      console.log(response.data);
    } catch (error) {
      setError('Đã có lỗi xảy ra, vui lòng thử lại!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Nhập thông tin hàng hóa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3" style={{ display: 'none' }}>
          <label htmlFor="id_nhan_vien" className="form-label">ID Nhân Viên</label>
          <input
            type="text"
            id="id_nhan_vien"
            name="id_nhan_vien"
            className="form-control"
            value={formData.id_nhan_vien}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3" style={{ display: 'none' }}>
          <label htmlFor="xoa_sua" className="form-label">Xóa/Sửa</label>
          <input
            type="text"
            id="xoa_sua"
            name="xoa_sua"
            className="form-control"
            value={formData.xoa_sua}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ma_hang" className="form-label">Mã Hàng</label>
          <input
            type="text"
            id="ma_hang"
            name="ma_hang"
            className="form-control"
            value={formData.ma_hang}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ten_hang" className="form-label">Tên Hàng</label>
          <input
            type="text"
            id="ten_hang"
            name="ten_hang"
            className="form-control"
            value={formData.ten_hang}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dvt" className="form-label">Đơn Vị Tính</label>
          <input
            type="text"
            id="dvt"
            name="dvt"
            className="form-control"
            value={formData.dvt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sl_ton_dau_ky" className="form-label">Số Lượng Tồn Đầu Kỳ</label>
          <input
            type="number"
            id="sl_ton_dau_ky"
            name="sl_ton_dau_ky"
            className="form-control"
            value={formData.sl_ton_dau_ky}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="don_gia_ton_dau_ky" className="form-label">Đơn Giá Tồn Đầu Kỳ</label>
          <input
            type="number"
            id="don_gia_ton_dau_ky"
            name="don_gia_ton_dau_ky"
            className="form-control"
            value={formData.don_gia_ton_dau_ky}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ma_kho_luu_tru" className="form-label">Mã Kho Lưu Trữ</label>
          <input
            type="text"
            id="ma_kho_luu_tru"
            name="ma_kho_luu_tru"
            className="form-control"
            value={formData.ma_kho_luu_tru}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang gửi...' : 'Gửi'}
        </button>
      </form>

      {/* Hiển thị thông báo lỗi hoặc thành công */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </div>
  );
};

export default InventoryForm;
