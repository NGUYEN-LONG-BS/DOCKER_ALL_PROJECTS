"use client";

import React, { useState, useEffect } from "react";
import { 
  API_get_data_TB_CLIENT_CATEGORIES,
  API_create_client_category,
  API_get_next_ma_khach_hang,
  API_export_tb_client_categories,
  API_update_xoa_sua_client_categories,
} from '@/api/api';
import Header from "@/components/header/header_Home";
import Footer from '@/components/footer/Footer';
import axios from "axios";
import { useUserId } from '@/utils/useUserId';
import { getCreateStatus } from '@/utils/getRecordStatus';
import { getSupplierModelKey } from "@/utils/getPermissionOnDB";

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
  pass_field?: string; // Add optional pass_field property
}

const ClientManagementPage = () => {
  const userId = useUserId();

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
  const [debouncedFilter, setDebouncedFilter] = useState(filter);

  const tableColumns = [
    { label: "Mã KH", width: "150px" },
    { label: "Tên khách hàng", width: "600px" },
    { label: "Địa chỉ", width: "500px" },
    { label: "MST", width: "100px" },
    { label: "Khu vực", width: "150px" },
    { label: "DL/XL", width: "150px" },
    { label: "Mã cũ", width: "150px" },
    { label: "Mã phân loại 04", width: "150px" },
    { label: "Mã phân loại 05", width: "150px" },
    { label: "Mã phân loại 06", width: "150px" },
    { label: "Mã phân loại 07", width: "150px" },
    { label: "Mã thành viên", width: "150px" },
  ];

  // Fetch initial clients
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_get_data_TB_CLIENT_CATEGORIES}?page=1&limit=25`); // Limit initial load to 25 records
      setClients(response.data.results); // Access the `results` field for the list of records
      setPage(2); // Set next page for lazy loading
      setHasMore(response.data.results.length === 25); // Update hasMore based on data length
    } catch (err) {
      setError("Failed to fetch clients.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch more clients on scroll
  const fetchClientsLazy = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_get_data_TB_CLIENT_CATEGORIES}?page=${page}&limit=25`);
      const fetchedData: Client[] = response.data.results; // Explicitly type fetchedData
      if (!fetchedData || fetchedData.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setClients((prev) => {
          const newData = fetchedData.filter(
            (item: Client) => !prev.some((existing) => existing.id === item.id)
          );
          return [...prev, ...newData];
        });
        setPage((prev) => prev + 1); // Increment page for next fetch
      }
    } catch (err) {
      setError("Failed to fetch clients.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchClients();
  }, []);

  // Reset pagination and fetch data when filters change
  useEffect(() => {
    setClients([]);
    setPage(1);
    setHasMore(true);
    fetchClients();
  }, [debouncedFilter]);

  // Debounce filter input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Fix the handleSubmit function to separate create and edit actions
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      id_nhan_vien: userId,
      xoa_sua: getCreateStatus(),
      ma_khach_hang: form.ma_khach_hang,
      ten_khach_hang: form.ten_khach_hang,
      dia_chi: form.dia_chi,
      mst: form.mst,
      ma_phan_loai_01: form.ma_phan_loai_01,
      ma_phan_loai_02: form.ma_phan_loai_02,
      ma_phan_loai_03: form.ma_phan_loai_03,
      ma_phan_loai_04: form.ma_phan_loai_04,
      ma_phan_loai_05: form.ma_phan_loai_05,
      ma_phan_loai_06: form.ma_phan_loai_06,
      ma_phan_loai_07: form.ma_phan_loai_07,
      ma_phan_loai_08: form.ma_phan_loai_08,
      action: "create",
    };
    console.log("Data to be sent:", payload);
    try {
      await axios.post(API_create_client_category, payload);
      setClients([]);
      setPage(1);
      setHasMore(true);
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

  // Fix type mismatch for handleEdit
  const handleEditButtonClick = async () => {
    const payload = {
      id_nhan_vien: userId, // Use userId from the hook,
      xoa_sua: getCreateStatus(),
      ma_khach_hang: form.ma_khach_hang,
      ten_khach_hang: form.ten_khach_hang,
      dia_chi: form.dia_chi,
      mst: form.mst,
      ma_phan_loai_01: form.ma_phan_loai_01,
      ma_phan_loai_02: form.ma_phan_loai_02,
      ma_phan_loai_03: form.ma_phan_loai_03,
      ma_phan_loai_04: form.ma_phan_loai_04,
      ma_phan_loai_05: form.ma_phan_loai_05,
      ma_phan_loai_06: form.ma_phan_loai_06,
      ma_phan_loai_07: form.ma_phan_loai_07,
      ma_phan_loai_08: form.ma_phan_loai_08,
      action: "edit",
    };
    console.log("Data to be sent:", payload);
    try {
      await axios.post(API_create_client_category, payload);
      setClients([]);
      setPage(1);
      setHasMore(true);
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

  // Add modal for password input
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    if (!form.ma_khach_hang) {
      setError("Vui lòng chọn đối tượng cần xoá.");
      return;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }
    try {
      const response = await axios.post(API_update_xoa_sua_client_categories, {
        ma_khach_hang: form.ma_khach_hang,
        pass_field: password,
      });
      if (response.status === 200) {
        alert("Record updated successfully.");
        fetchClients(); // Refresh the table
        setShowModal(false); // Close modal
      } else {
        const errorMessage = response.data?.error;
        if (errorMessage === "overtime to delete") {
          setError("Quá thời gian xoá, vui lòng liên hệ admin để được hỗ trợ.");
        } else {
          setError(errorMessage || "Failed to delete record.");
        }
      }
    } catch (err: any) {
      const backendError = err.response?.data?.error;
      if (backendError === "overtime to delete") {
        setError("Quá thời gian xoá, vui lòng liên hệ admin để được hỗ trợ.");
      } else {
        setError("Failed to delete record.");
      }
    }
  };

  // Handle row click
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

  // Filter clients
  const filteredClients = clients.filter(client => {
    return (
      (!debouncedFilter.ma_khach_hang || client.ma_khach_hang.includes(debouncedFilter.ma_khach_hang)) &&
      (!debouncedFilter.ten_khach_hang || client.ten_khach_hang.includes(debouncedFilter.ten_khach_hang)) &&
      (!debouncedFilter.mst || client.mst.includes(debouncedFilter.mst)) &&
      (!debouncedFilter.ma_phan_loai_01 || client.ma_phan_loai_01.includes(debouncedFilter.ma_phan_loai_01)) &&
      (!debouncedFilter.ma_phan_loai_02 || client.ma_phan_loai_02.includes(debouncedFilter.ma_phan_loai_02)) &&
      (!debouncedFilter.ma_phan_loai_03 || client.ma_phan_loai_03.includes(debouncedFilter.ma_phan_loai_03))
    );
  });

  // Handle scroll for lazy loading
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      fetchClientsLazy();
    }
  };

  // Prevent form state loss during tab switches
  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };

  // Add refresh icon and functionality for Mã khách hàng
  const handleRefreshMaKhachHang = async () => {
    try {
      const response = await axios.get(API_get_next_ma_khach_hang, {
        params: { model_key: getSupplierModelKey() },
      });
      const nextMaKhachHang = response.data.next_ma_khach_hang;
      setForm((prev) => ({ ...prev, ma_khach_hang: nextMaKhachHang }));
    } catch (err) {
      setError("Failed to fetch next Mã khách hàng.");
    }
  };

  // Add functionality to download Excel file
  const handleExportToExcel = async () => {
    try {
      const response = await axios.get(API_export_tb_client_categories, {
        responseType: 'blob', // Ensure the response is treated as a binary file
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'TB_CLIENT_CATEGORIES.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Failed to export data to Excel.");
    }
  };

  // Close modal and then call handleDelete
  const handleConfirmPassword = () => {
    setShowModal(false);
    handleDelete();
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
    setPassword(""); // Clear password when modal closes
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-1 flex-grow-1">
        <div className="container">
          <h1 className="text-center">Quản lý khách hàng</h1>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          <form onSubmit={handleCreate} className="mb-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  type="button" // Change type to button to avoid form submission
                  className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => handleTabSwitch("tab1")}
                >
                  Thông tin khách hàng
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button" // Change type to button to avoid form submission
                  className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => handleTabSwitch("tab2")}
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
                    <div className="input-group">
                      <input
                        type="text"
                        name="ma_khach_hang"
                        value={form.ma_khach_hang}
                        onChange={handleChange}
                        className="form-control"
                        required
                        readOnly
                        style={{ backgroundColor: "#d3d3d3" }} // Set a darker background color
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleRefreshMaKhachHang}
                      >
                        <i className="bi bi-arrow-clockwise"></i> {/* Bootstrap icon for refresh */}
                      </button>
                    </div>
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
                    <label>PL03 - Mã cũ:</label>
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
                className="btn btn-primary" 
                onClick={handleEditButtonClick}>
                Cập nhật
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={() => setShowModal(true)}>
                Xoá
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
                placeholder="Lọc theo khu vực"
                value={filter.ma_phan_loai_01}
                onChange={e => setFilter(f => ({ ...f, ma_phan_loai_01: e.target.value }))}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Lọc theo DL/XL"
                value={filter.ma_phan_loai_02}
                onChange={e => setFilter(f => ({ ...f, ma_phan_loai_02: e.target.value }))}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Lọc theo mã cũ"
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
                {filteredClients.map((client) => (
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
            {!hasMore && !loading && <p className="text-center mt-3">No more data to load.</p>}
          </div>
          <div className="d-flex gap-1 mt-3">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleExportToExcel}>
              All data to Excel
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nhập mật khẩu</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Đóng
                </button>
                <button type="button" className="btn btn-primary" onClick={handleConfirmPassword}>
                  Xác nhận pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagementPage;