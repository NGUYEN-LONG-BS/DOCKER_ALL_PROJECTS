"use client";

import React, { useState, useEffect } from "react";
import { API_user_permissions } from '@/api/api';
import Header from "@/components/header/header_Home";
import Footer from '@/components/footer/Footer';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = "http://localhost:8000/api/client-categories";

interface Client {
  id: number;
  ma_khach_hang: string;
  ten_khach_hang: string;
  dia_chi: string;
  mst: string;
  ma_phan_loai_01: string;
  ma_phan_loai_02: string;
  ma_phan_loai_03: string;
  ma_phan_loai_04: string;
  ma_phan_loai_05: string;
  ma_phan_loai_06: string;
  ma_phan_loai_07: string;
  ma_phan_loai_08: string;
}

const ClientManagementPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState<Client>({
    id: 0,
    ma_khach_hang: "",
    ten_khach_hang: "",
    dia_chi: "",
    mst: "",
    ma_phan_loai_01: "",
    ma_phan_loai_02: "",
    ma_phan_loai_03: "",
    ma_phan_loai_04: "",
    ma_phan_loai_05: "",
    ma_phan_loai_06: "",
    ma_phan_loai_07: "",
    ma_phan_loai_08: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch clients
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setClients(response.data);
    } catch (err) {
      setError("Failed to fetch clients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/${editingId}/`, form);
      } else {
        await axios.post(API_BASE_URL, form);
      }
      fetchClients();
      setForm({
        id: 0,
        ma_khach_hang: "",
        ten_khach_hang: "",
        dia_chi: "",
        mst: "",
        ma_phan_loai_01: "",
        ma_phan_loai_02: "",
        ma_phan_loai_03: "",
        ma_phan_loai_04: "",
        ma_phan_loai_05: "",
        ma_phan_loai_06: "",
        ma_phan_loai_07: "",
        ma_phan_loai_08: "",
      });
      setEditingId(null);
    } catch (err) {
      setError("Failed to save client.");
    }
  };

  // Handle edit
  const handleEdit = (client: Client) => {
    setForm(client);
    setEditingId(client.id);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}/`);
      fetchClients();
    } catch (err) {
      setError("Failed to delete client.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container py-5 flex-grow-1">
            <div className="container mt-5">
            <h1 className="text-center mb-4">Quản lý khách hàng</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Mã khách hàng:</label>
                    <input
                    type="text"
                    name="ma_khach_hang"
                    value={form.ma_khach_hang}
                    onChange={handleChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Tên khách hàng:</label>
                    <input
                    type="text"
                    name="ten_khach_hang"
                    value={form.ten_khach_hang}
                    onChange={handleChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Địa chỉ:</label>
                    <input
                    type="text"
                    name="dia_chi"
                    value={form.dia_chi}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>MST:</label>
                    <input
                    type="text"
                    name="mst"
                    value={form.mst}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Mã phân loại 01:</label>
                    <input
                    type="text"
                    name="ma_phan_loai_01"
                    value={form.ma_phan_loai_01}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Mã phân loại 02:</label>
                    <input
                    type="text"
                    name="ma_phan_loai_02"
                    value={form.ma_phan_loai_02}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Mã phân loại 03:</label>
                    <input
                    type="text"
                    name="ma_phan_loai_03"
                    value={form.ma_phan_loai_03}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Mã phân loại 04:</label>
                    <input
                    type="text"
                    name="ma_phan_loai_04"
                    value={form.ma_phan_loai_04}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Mã phân loại 05:</label>
                    <input
                    type="text"
                    name="ma_phan_loai_05"
                    value={form.ma_phan_loai_05}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Mã phân loại 06:</label>
                    <input
                    type="text"
                    name="ma_phan_loai_06"
                    value={form.ma_phan_loai_06}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Mã phân loại 07:</label>
                    <input
                    type="text"
                    name="ma_phan_loai_07"
                    value={form.ma_phan_loai_07}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Mã phân loại 08:</label>
                    <input
                    type="text"
                    name="ma_phan_loai_08"
                    value={form.ma_phan_loai_08}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                </div>
                <button type="submit" className="btn btn-primary">
                {editingId ? "Cập nhật" : "Thêm mới"}
                </button>
            </form>

            <table className="table table-bordered table-responsive">
                <thead className="thead-dark">
                <tr>
                    <th>Mã khách hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Địa chỉ</th>
                    <th>MST</th>
                    <th>Mã phân loại 01</th>
                    <th>Mã phân loại 02</th>
                    <th>Mã phân loại 03</th>
                    <th>Mã phân loại 04</th>
                    <th>Mã phân loại 05</th>
                    <th>Mã phân loại 06</th>
                    <th>Mã phân loại 07</th>
                    <th>Mã phân loại 08</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                    <td>{client.ma_khach_hang}</td>
                    <td>{client.ten_khach_hang}</td>
                    <td>{client.dia_chi}</td>
                    <td>{client.mst}</td>
                    <td>{client.ma_phan_loai_01}</td>
                    <td>{client.ma_phan_loai_02}</td>
                    <td>{client.ma_phan_loai_03}</td>
                    <td>{client.ma_phan_loai_04}</td>
                    <td>{client.ma_phan_loai_05}</td>
                    <td>{client.ma_phan_loai_06}</td>
                    <td>{client.ma_phan_loai_07}</td>
                    <td>{client.ma_phan_loai_08}</td>
                    <td>
                        <button
                        className="btn btn-sm btn-warning mr-2"
                        onClick={() => handleEdit(client)}
                        >
                        Sửa
                        </button>
                        <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(client.id)}
                        >
                        Xóa
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </main>
        <Footer />
    </div>
    
  );
};

export default ClientManagementPage;