"use client";

import React, { useState, useEffect } from "react";
import { 
  API_get_data_TB_SUPPLIER_CATEGORIES,
  API_create_supplier_category,
  API_get_next_ma_nha_cung_cap,
  API_export_tb_supplier_categories,
  API_update_xoa_sua_supplier_categories,
} from '@/api/api';
import Header from "@/components/header/header_Home";
import Footer from '@/components/footer/Footer';
import axios from "axios";
import { useUserId } from '@/utils/useUserId';
import { getCreateStatus } from '@/utils/getRecordStatus';
import { getSupplierModelKey } from "@/utils/getPermissionOnDB";

interface supplier {
  id: number;
  ma_nha_cung_cap: string;
  ten_nha_cung_cap: string;
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

const supplierManagementPage = () => {
  const userId = useUserId();

  const [suppliers, setsuppliers] = useState<supplier[]>([]);
  const [form, setForm] = useState<supplier>({
    id: 0,
    ma_nha_cung_cap: "",
    ten_nha_cung_cap: "",
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
    ma_nha_cung_cap: "",
    ten_nha_cung_cap: "",
    mst: "",
    ma_phan_loai_01: "",
    ma_phan_loai_02: "",
    ma_phan_loai_03: "",
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [debouncedFilter, setDebouncedFilter] = useState(filter);
  // Lưu modelKey vào state để dùng lại nhiều nơi
  const [modelKey, setModelKey] = useState<string | null>(null);

  const tableColumns = [
    { label: "Mã NCC", width: "150px" },
    { label: "Tên nhà cung cấp", width: "600px" },
    { label: "Địa chỉ", width: "500px" },
    { label: "MST", width: "100px" },
    { label: "Mã cũ", width: "150px" },
    { label: "Mã phân loại 02", width: "150px" },
    { label: "Mã phân loại 03", width: "150px" },
    { label: "Mã phân loại 04", width: "150px" },
    { label: "Mã phân loại 05", width: "150px" },
    { label: "Mã phân loại 06", width: "150px" },
    { label: "Mã phân loại 07", width: "150px" },
    { label: "Mã thành viên", width: "150px" },
  ];

  // Fetch initial suppliers
  const fetchsuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_get_data_TB_SUPPLIER_CATEGORIES}?page=1&limit=25`); // Limit initial load to 25 records
      setsuppliers(response.data.results); // Access the `results` field for the list of records
      setPage(2); // Set next page for lazy loading
      setHasMore(response.data.results.length === 25); // Update hasMore based on data length
    } catch (err) {
      setError("Failed to fetch suppliers.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch more suppliers on scroll
  const fetchsuppliersLazy = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_get_data_TB_SUPPLIER_CATEGORIES}?page=${page}&limit=25`);
      const fetchedData: supplier[] = response.data.results; // Explicitly type fetchedData
      if (!fetchedData || fetchedData.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setsuppliers((prev) => {
          const newData = fetchedData.filter(
            (item: supplier) => !prev.some((existing) => existing.id === item.id)
          );
          return [...prev, ...newData];
        });
        setPage((prev) => prev + 1); // Increment page for next fetch
      }
    } catch (err) {
      setError("Failed to fetch suppliers.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchsuppliers();
  }, []);

  // Reset pagination and fetch data when filters change
  useEffect(() => {
    setsuppliers([]);
    setPage(1);
    setHasMore(true);
    fetchsuppliers();
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

  // Lấy modelKey khi userId thay đổi
  useEffect(() => {
    async function fetchModelKey() {
      if (userId) {
        const key = await getSupplierModelKey(userId);
        setModelKey(key);
      }
    }
    fetchModelKey();
  }, [userId]);

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
      ma_nha_cung_cap: form.ma_nha_cung_cap,
      ten_nha_cung_cap: form.ten_nha_cung_cap,
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
      await axios.post(API_create_supplier_category, payload);
      setsuppliers([]);
      setPage(1);
      setHasMore(true);
      fetchsuppliers();
      setForm({
        id: 0,
        ma_nha_cung_cap: "",
        ten_nha_cung_cap: "",
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
      setError("Failed to save supplier.");
    }
  };

  // Fix type mismatch for handleEdit
  const handleEditButtonClick = async () => {
    const payload = {
      id_nhan_vien: userId, // Use userId from the hook,
      xoa_sua: getCreateStatus(),
      ma_nha_cung_cap: form.ma_nha_cung_cap,
      ten_nha_cung_cap: form.ten_nha_cung_cap,
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
      await axios.post(API_create_supplier_category, payload);
      setsuppliers([]);
      setPage(1);
      setHasMore(true);
      fetchsuppliers();
      setForm({
        id: 0,
        ma_nha_cung_cap: "",
        ten_nha_cung_cap: "",
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
      setError("Failed to save supplier.");
    }
  };

  // Add modal for password input
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    if (!form.ma_nha_cung_cap) {
      setError("Vui lòng chọn đối tượng cần xoá.");
      return;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }
    try {
      const response = await axios.post(API_update_xoa_sua_supplier_categories, {
        ma_nha_cung_cap: form.ma_nha_cung_cap,
        pass_field: password,
      });
      if (response.status === 200) {
        alert("Record updated successfully.");
        fetchsuppliers(); // Refresh the table
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
  const handleRowClick = (supplier: supplier) => {
    setForm({
      id: supplier.id || 0,
      ma_nha_cung_cap: supplier.ma_nha_cung_cap ?? "",
      ten_nha_cung_cap: supplier.ten_nha_cung_cap ?? "",
      dia_chi: supplier.dia_chi ?? "",
      mst: supplier.mst ?? "",
      ma_phan_loai_01: supplier.ma_phan_loai_01 ?? "",
      ma_phan_loai_02: supplier.ma_phan_loai_02 ?? "",
      ma_phan_loai_03: supplier.ma_phan_loai_03 ?? "",
      ma_phan_loai_04: supplier.ma_phan_loai_04 ?? "",
      ma_phan_loai_05: supplier.ma_phan_loai_05 ?? "",
      ma_phan_loai_06: supplier.ma_phan_loai_06 ?? "",
      ma_phan_loai_07: supplier.ma_phan_loai_07 ?? "",
      ma_phan_loai_08: supplier.ma_phan_loai_08 ?? "",
    });
    setEditingId(supplier.id ?? null);
  };

  // Filter suppliers
  const filteredsuppliers = suppliers.filter(supplier => {
    return (
      (!debouncedFilter.ma_nha_cung_cap || supplier.ma_nha_cung_cap.includes(debouncedFilter.ma_nha_cung_cap)) &&
      (!debouncedFilter.ten_nha_cung_cap || supplier.ten_nha_cung_cap.includes(debouncedFilter.ten_nha_cung_cap)) &&
      (!debouncedFilter.mst || supplier.mst.includes(debouncedFilter.mst)) &&
      (!debouncedFilter.ma_phan_loai_01 || supplier.ma_phan_loai_01.includes(debouncedFilter.ma_phan_loai_01)) &&
      (!debouncedFilter.ma_phan_loai_02 || supplier.ma_phan_loai_02.includes(debouncedFilter.ma_phan_loai_02)) &&
      (!debouncedFilter.ma_phan_loai_03 || supplier.ma_phan_loai_03.includes(debouncedFilter.ma_phan_loai_03))
    );
  });

  // Handle scroll for lazy loading
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      fetchsuppliersLazy();
    }
  };

  // Prevent form state loss during tab switches
  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };

  // Add refresh icon and functionality for Mã nhà cung cấp
  const handleRefreshMaNhaCungCap = async () => {
    try {
      const response = await axios.get(API_get_next_ma_nha_cung_cap, {
        params: { model_key: modelKey },
      });
      const nextMaNhaCungCap = response.data.next_ma_nha_cung_cap;
      setForm((prev) => ({ ...prev, ma_nha_cung_cap: nextMaNhaCungCap }));
    } catch (err) {
      setError("Failed to fetch next Mã nhà cung cấp.");
    }
  };

  // Add functionality to download Excel file
  const handleExportToExcel = async () => {
    try {
      const response = await axios.get(API_export_tb_supplier_categories, {
        responseType: 'blob', // Ensure the response is treated as a binary file
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'TB_supplier_CATEGORIES.xlsx');
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
          <h1 className="text-center">Quản lý nhà cung cấp</h1>
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
                  Thông tin nhà cung cấp
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
                    <label>Mã nhà cung cấp:</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="ma_nha_cung_cap"
                        value={form.ma_nha_cung_cap}
                        onChange={handleChange}
                        className="form-control"
                        required
                        readOnly
                        style={{ backgroundColor: "#d3d3d3" }} // Set a darker background color
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleRefreshMaNhaCungCap}
                      >
                        <i className="bi bi-arrow-clockwise"></i> {/* Bootstrap icon for refresh */}
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Tên nhà cung cấp:</label>
                    <input
                      type="text"
                      name="ten_nha_cung_cap"
                      value={form.ten_nha_cung_cap}
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
                    <label>PL01 - Mã cũ:</label>
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
                placeholder="Lọc theo Mã nhà cung cấp"
                value={filter.ma_nha_cung_cap}
                onChange={e => setFilter(f => ({ ...f, ma_nha_cung_cap: e.target.value }))}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Lọc theo Tên nhà cung cấp"
                value={filter.ten_nha_cung_cap}
                onChange={e => setFilter(f => ({ ...f, ten_nha_cung_cap: e.target.value }))}
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
                placeholder="Lọc theo mã cũ"
                value={filter.ma_phan_loai_01}
                onChange={e => setFilter(f => ({ ...f, ma_phan_loai_01: e.target.value }))}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Lọc theo PL02"
                value={filter.ma_phan_loai_02}
                onChange={e => setFilter(f => ({ ...f, ma_phan_loai_02: e.target.value }))}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Lọc theo PL03"
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
                {filteredsuppliers.map((supplier) => (
                  <tr key={supplier.id} onClick={() => handleRowClick(supplier)} style={{ cursor: "pointer" }}>
                    <td>{supplier.ma_nha_cung_cap}</td>
                    <td>{supplier.ten_nha_cung_cap}</td>
                    <td>{supplier.dia_chi}</td>
                    <td>{supplier.mst}</td>
                    <td>{supplier.ma_phan_loai_01}</td>
                    <td>{supplier.ma_phan_loai_02}</td>
                    <td>{supplier.ma_phan_loai_03}</td>
                    <td>{supplier.ma_phan_loai_04}</td>
                    <td>{supplier.ma_phan_loai_05}</td>
                    <td>{supplier.ma_phan_loai_06}</td>
                    <td>{supplier.ma_phan_loai_07}</td>
                    <td>{supplier.ma_phan_loai_08}</td>
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

export default supplierManagementPage;