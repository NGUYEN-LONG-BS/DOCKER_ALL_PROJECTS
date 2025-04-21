'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  name: string;
  email: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('/api/submit-form', formData);  // Đảm bảo URL là đúng
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError('Không thể gửi dữ liệu, vui lòng thử lại!');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Form Nhập Liệu</h2>
      
      {success && <div className="alert alert-success">Dữ liệu đã được gửi thành công!</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded-3 bg-light">
        <div className="mb-4">
          <label htmlFor="name" className="form-label">Họ và tên</label>
          <input
            type="text"
            className="form-control shadow-sm rounded"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Nhập họ và tên của bạn"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control shadow-sm rounded"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Nhập email của bạn"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Đang gửi...' : 'Gửi dữ liệu'}
        </button>
      </form>
    </div>
  );
};

export default Form;
