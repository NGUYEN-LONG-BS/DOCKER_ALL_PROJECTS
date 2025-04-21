'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  login_id: string;
  pass_field: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    login_id: '',
    pass_field: '',
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
      // Gửi dữ liệu tới backend để thêm vào bảng login_info
      const response = await axios.post('/api/submit-login-info', formData);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(err);  // Log the error to the console
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
          <label htmlFor="login_id" className="form-label">Login ID</label>
          <input
            type="text"
            className="form-control shadow-sm rounded"
            id="login_id"
            name="login_id"
            value={formData.login_id}
            onChange={handleInputChange}
            required
            placeholder="Nhập Login ID của bạn"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pass_field" className="form-label">Mật khẩu</label>
          <input
            type="password"
            className="form-control shadow-sm rounded"
            id="pass_field"
            name="pass_field"
            value={formData.pass_field}
            onChange={handleInputChange}
            required
            placeholder="Nhập mật khẩu của bạn"
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
