'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const AddItem = () => {
  const [itemData, setItemData] = useState({
    code: '',  // Mã hàng
    name: '',  // Tên mã hàng
    description: '', // Mô tả
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Gửi dữ liệu tới API
      const response = await axios.post('/api/add-item', itemData);
      setSuccess(true);
      setLoading(false);
      setItemData({
        code: '',
        name: '',
        description: '',
      }); // Reset form sau khi gửi thành công
    } catch (err) {
      setError('Không thể thêm mã hàng, vui lòng thử lại!');
      setLoading(false);
    }
  };

  const router = useRouter(); // Khởi tạo router

  const handleGoHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();  // Ngăn không gửi form khi nhấn nút
    router.push('/'); // Điều hướng về trang chủ (home)
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Thêm Mã Hàng Mới</h2>
      
      {success && <div className="alert alert-success">Mã hàng đã được thêm thành công!</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded-3 bg-light">
        <div className="mb-4">
          <label htmlFor="code" className="form-label">Mã Hàng</label>
          <input
            type="text"
            className="form-control shadow-sm rounded"
            id="code"
            name="code"
            value={itemData.code}
            onChange={handleInputChange}
            required
            placeholder="Nhập mã hàng"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="form-label">Tên Mã Hàng</label>
          <input
            type="text"
            className="form-control shadow-sm rounded"
            id="name"
            name="name"
            value={itemData.name}
            onChange={handleInputChange}
            required
            placeholder="Nhập tên mã hàng"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label">Mô Tả</label>
          <textarea
            className="form-control shadow-sm rounded"
            id="description"
            name="description"
            value={itemData.description}
            onChange={handleInputChange}
            required
            placeholder="Nhập mô tả mã hàng"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Đang gửi...' : 'Thêm Mã Hàng'}
        </button>

        {/* Nút quay lại trang home */}
        <button onClick={handleGoHome} className="btn btn-secondary mt-4 w-100">
            Quay Lại Trang Chủ
        </button>
      </form>
    </div>
  );
};

export default AddItem;
