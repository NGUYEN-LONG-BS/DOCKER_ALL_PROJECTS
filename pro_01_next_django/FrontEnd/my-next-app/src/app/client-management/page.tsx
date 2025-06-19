"use client";

import React, { useState, useEffect } from "react";
import { API_get_data_TB_CLIENT_CATEGORIES } from '@/api/api';
import Header from "@/components/header/header_Home";
import Footer from '@/components/footer/Footer';
import axios from "axios";

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
  const [activeTab, setActiveTab] = useState("tab1");
  const [filter, setFilter] = useState({
    ma_khach_hang: "",
    ten_khach_hang: "",
    mst: "",
    ma_phan_loai_01: "",
    ma_phan_loai_02: "",
    ma_phan_loai_03: "",
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const tableColumns = [
    { label: "Mã KH", width: "150px" },
    { label: "Tên khách hàng", width: "600px" },
    { label: "Địa chỉ", width: "500px" },
    { label: "MST", width: "100px" },
    { label: "Mã phân loại 01", width: "150px" },
    { label: "Mã phân loại 02", width: "150px" },
    { label: "Mã phân loại 03", width: "150px" },
    { label: "Mã phân loại 04", width: "150px" },
    { label: "Mã phân loại 05", width: "150px" },
    { label: "Mã phân loại 06", width: "150px" },
    { label: "Mã phân loại 07", width: "150px" },
    { label: "Mã phân loại 08", width: "150px" },
  ];

  // Fetch clients
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_get_data_TB_CLIENT_CATEGORIES);
      setClients(response.data);
    } catch (err) {
      setError("Failed to fetch clients.");
    } finally {
      setLoading(false);
    }
  };

  const fetchClientsLazy = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_get_data_TB_CLIENT_CATEGORIES}?page=${page}`);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setClients((prev) => [...prev, ...response.data]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError("Failed to fetch clients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    fetchClientsLazy();
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
        await axios.put(`${API_get_data_TB_CLIENT_CATEGORIES}/${editingId}/`, form);
      } else {
        await axios.post(API_get_data_TB_CLIENT_CATEGORIES, form);
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
      // Removed setError("Failed to save client.")
    }
  };

  // Handle edit
  const handleEdit = (client: Client) => {
    setForm({
      id: client.id || 0,
      ma_khach_hang: client.ma_khach_hang ?? "",
      ten_khach_hang: client.ten_khach_hang ?? "",
      dia_chi: client.dia_chi ?? "",
      mst: client.mst ?? "",
      ma_phan_loai_01: client.ma_phan_loai_01 ?? "",
      ma_phan_loai_02: client.ma_phan_loai_02 ?? "",
      ma_phan_loai_03: client.ma_phan_loai_03 ?? "",
      ma_phan_loai_04: client.ma_phan_loai_04 ?? "",
      ma_phan_loai_05: client.ma_phan_loai_05 ?? "",
      ma_phan_loai_06: client.ma_phan_loai_06 ?? "",
      ma_phan_loai_07: client.ma_phan_loai_07 ?? "",
      ma_phan_loai_08: client.ma_phan_loai_08 ?? "",
    });
    setEditingId(client.id ?? null);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_get_data_TB_CLIENT_CATEGORIES}/${id}/`);
      fetchClients();
    } catch (err) {
      setError("Failed to delete client.");
    }
  };

  const handleRowClick = (client: Client) => {
    setForm({
      id: client.id || 0,
      ma_khach_hang: client.ma_khach_hang ?? "",
      ten_khach_hang: client.ten_khach_hang ?? "",
      dia_chi: client.dia_chi ?? "",
      mst: client.mst ?? "",
      ma_phan_loai_01: client.ma_phan_loai_01 ?? "",
      ma_phan_loai_02: client.ma_phan_loai_02 ?? "",
      ma_phan_loai_03: client.ma_phan_loai_03 ?? "",
      ma_phan_loai_04: client.ma_phan_loai_04 ?? "",
      ma_phan_loai_05: client.ma_phan_loai_05 ?? "",
      ma_phan_loai_06: client.ma_phan_loai_06 ?? "",
      ma_phan_loai_07: client.ma_phan_loai_07 ?? "",
      ma_phan_loai_08: client.ma_phan_loai_08 ?? "",
    });
    setEditingId(client.id ?? null);
  };

  const filteredClients = clients.filter(client => {
    return (
      (!filter.ma_khach_hang || client.ma_khach_hang.includes(filter.ma_khach_hang)) &&
      (!filter.ten_khach_hang || client.ten_khach_hang.includes(filter.ten_khach_hang)) &&
      (!filter.mst || client.mst.includes(filter.mst)) &&
      (!filter.ma_phan_loai_01 || client.ma_phan_loai_01.includes(filter.ma_phan_loai_01)) &&
      (!filter.ma_phan_loai_02 || client.ma_phan_loai_02.includes(filter.ma_phan_loai_02))
    );
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      fetchClientsLazy();
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container py-1 flex-grow-1">
            <div className="container">
            <h1 className="text-center">Quản lý khách hàng</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-4">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                      onClick={() => setActiveTab("tab1")}
                    >
                      Thông tin khách hàng
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                      onClick={() => setActiveTab("tab2")}
                    >
                      Chỉ tiêu phân loại
                    </button>
                  </li>
                </ul>

                {activeTab === "tab1" && (
                  <div className="tab-content mt-3">
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
                    </div>
                  </div>
                )}

                {activeTab === "tab2" && (
                  <div className="tab-content mt-3">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                          <label>PL01 - Khu Vực:</label>
                          <input
                          type="text"
                          name="ma_phan_loai_01"
                          value={form.ma_phan_loai_01}
                          onChange={handleChange}
                          className="form-control"
                          />
                      </div>
                      <div className="col-md-6 mb-3">
                          <label>PL02 - Điện lực/Xây lắp:</label>
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
                  </div>
                )}
                <div className="d-flex gap-1">
                  <button 
                    type="submit" 
                    className="btn btn-primary">
                    Thêm mới
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning">
                    Cập nhật
                  </button>
                </div>
            </form>

            {/* Bộ lọc */}
            <div className="row mb-4 g-2">
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Lọc theo Mã khách hàng"
                  value={filter.ma_khach_hang}
                  onChange={e => setFilter(f => ({ ...f, ma_khach_hang: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Lọc theo Tên khách hàng"
                  value={filter.ten_khach_hang}
                  onChange={e => setFilter(f => ({ ...f, ten_khach_hang: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Lọc theo MST"
                  value={filter.mst}
                  onChange={e => setFilter(f => ({ ...f, mst: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Lọc theo Mã phân loại 1"
                  value={filter.ma_phan_loai_01}
                  onChange={e => setFilter(f => ({ ...f, ma_phan_loai_01: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Lọc theo Mã phân loại 2"
                  value={filter.ma_phan_loai_02}
                  onChange={e => setFilter(f => ({ ...f, ma_phan_loai_02: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Lọc theo Mã phân loại 3"
                  value={filter.ma_phan_loai_03}
                  onChange={e => setFilter(f => ({ ...f, ma_phan_loai_03: e.target.value }))}
                />
              </div>
            </div>

            <div
              style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}
              onScroll={handleScroll}
            >
              <table className="table table-bordered table-responsive" style={{ position: "relative", width: "1500px" }}>
                <thead className="thead-dark" style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "#343a40" }}>
                <tr>
                  {tableColumns.map((column, index) => (
                    <th key={index} style={{ width: column.width }}>{column.label}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id} onClick={() => handleRowClick(client)} style={{ cursor: "pointer" }}>
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
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex gap-1 mt-3">
              <button 
                type="submit" 
                className="btn btn-primary">
                All data to Excel
              </button>
            </div>
            </div>
        </main>
        <Footer />
    </div>
    
  );
};

export default ClientManagementPage;