"use client";

import React, { useState, useEffect } from "react";
import { 
  API_get_data_ALL_SUPPLIER_CATEGORIES,
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

interface Supplier {
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

const SupplierManagementPage = () => {
  const userId = useUserId();

  const [Suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [form, setForm] = useState<Supplier>({
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

  // Fetch initial Suppliers
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const dynamicModelKey = await getSupplierModelKey(userId);
      const params: any = { page: 1, limit: 25, model_key: dynamicModelKey };
      const response = await axios.get(API_get_data_ALL_SUPPLIER_CATEGORIES, { params });
      setSuppliers(response.data.results);
      setPage(2);
      setHasMore(response.data.results.length === 25);
    } catch (err) {
      setError("Failed to fetch Suppliers.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch more Suppliers on scroll
  const fetchSuppliersLazy = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const dynamicModelKey = await getSupplierModelKey(userId);
      const params: any = { page, limit: 25, model_key: dynamicModelKey };
      const response = await axios.get(API_get_data_ALL_SUPPLIER_CATEGORIES, { params });
      const fetchedData: Supplier[] = response.data.results;
      if (!fetchedData || fetchedData.length === 0) {
        setHasMore(false);
      } else {
        setSuppliers((prev) => {
          const newData = fetchedData.filter(
            (item: Supplier) => !prev.some((existing) => existing.id === item.id)
          );
          return [...prev, ...newData];
        });
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError("Failed to fetch Suppliers.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Reset pagination and fetch data when filters change
  useEffect(() => {
    setSuppliers([]);
    setPage(1);
    setHasMore(true);
    fetchSuppliers();
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
    const dynamicModelKey = await getSupplierModelKey(userId);
    if (!dynamicModelKey || typeof dynamicModelKey !== 'string' || !dynamicModelKey.trim()) {
      setError("Không xác định được model key. Vui lòng thử lại hoặc F5.");
      return;
    }
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
      model_key: dynamicModelKey,
    };
    console.log("Data to be sent (CREATE):", payload);
    try {
      await axios.post(API_create_supplier_category, payload);
      setSuppliers([]);
      setPage(1);
      setHasMore(true);
      fetchSuppliers();
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
      setError("Failed to save Supplier.");
    }
  };

  // Fix type mismatch for handleEdit
  const handleEditButtonClick = async () => {
    const dynamicModelKey = await getSupplierModelKey(userId);
    if (!dynamicModelKey || typeof dynamicModelKey !== 'string' || !dynamicModelKey.trim()) {
      setError("Không xác định được model key. Vui lòng thử lại hoặc F5.");
      return;
    }
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
      action: "edit",
      model_key: dynamicModelKey,
    };
    console.log("Data to be sent (EDIT):", payload);
    try {
      await axios.post(API_create_supplier_category, payload);
      setSuppliers([]);
      setPage(1);
      setHasMore(true);
      fetchSuppliers();
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
      setError("Failed to save Supplier.");
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
    let keyToSend = await getSupplierModelKey(userId);
    const response = await axios.post(API_update_xoa_sua_supplier_categories, {
      ma_nha_cung_cap: form.ma_nha_cung_cap,
      pass_field: password,
      model_key: keyToSend,
    });
    if (response.status === 200) {
      alert("Record updated successfully.");
      fetchSuppliers(); // Refresh the table
      setShowModal(false); // Close modal
    } else {
      const errorMessage = response.data?.error;
      if (errorMessage === "overtime to delete") {
        setError("Quá thời gian xoá, vui lòng liên hệ admin để được hỗ trợ.");
      } else {
        setError(errorMessage || "Failed to delete record.");
      }
    }
  };

  // Handle row click
  const handleRowClick = (Supplier: Supplier) => {
    setForm({
      id: Supplier.id || 0,
      ma_nha_cung_cap: Supplier.ma_nha_cung_cap ?? "",
      ten_nha_cung_cap: Supplier.ten_nha_cung_cap ?? "",
      dia_chi: Supplier.dia_chi ?? "",
      mst: Supplier.mst ?? "",
      ma_phan_loai_01: Supplier.ma_phan_loai_01 ?? "",
      ma_phan_loai_02: Supplier.ma_phan_loai_02 ?? "",
      ma_phan_loai_03: Supplier.ma_phan_loai_03 ?? "",
      ma_phan_loai_04: Supplier.ma_phan_loai_04 ?? "",
      ma_phan_loai_05: Supplier.ma_phan_loai_05 ?? "",
      ma_phan_loai_06: Supplier.ma_phan_loai_06 ?? "",
      ma_phan_loai_07: Supplier.ma_phan_loai_07 ?? "",
      ma_phan_loai_08: Supplier.ma_phan_loai_08 ?? "",
    });
    setEditingId(Supplier.id ?? null);
  };

  // Filter Suppliers
  const filteredSuppliers = Suppliers.filter(Supplier => {
    return (
      (!debouncedFilter.ma_nha_cung_cap || Supplier.ma_nha_cung_cap.includes(debouncedFilter.ma_nha_cung_cap)) &&
      (!debouncedFilter.ten_nha_cung_cap || Supplier.ten_nha_cung_cap.includes(debouncedFilter.ten_nha_cung_cap)) &&
      (!debouncedFilter.mst || Supplier.mst.includes(debouncedFilter.mst)) &&
      (!debouncedFilter.ma_phan_loai_01 || Supplier.ma_phan_loai_01.includes(debouncedFilter.ma_phan_loai_01)) &&
      (!debouncedFilter.ma_phan_loai_02 || Supplier.ma_phan_loai_02.includes(debouncedFilter.ma_phan_loai_02)) &&
      (!debouncedFilter.ma_phan_loai_03 || Supplier.ma_phan_loai_03.includes(debouncedFilter.ma_phan_loai_03))
    );
  });

  // Handle scroll for lazy loading
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      fetchSuppliersLazy();
    }
  };

  // Prevent form state loss during tab switches
  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };

  // Add refresh icon and functionality for Mã nhà cung cấp
  const handleRefreshMaNhaCungCap = async () => {
    try {
      const dynamicModelKey = await getSupplierModelKey(userId);
      const response = await axios.get(API_get_next_ma_nha_cung_cap, {
        params: { model_key: dynamicModelKey },
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
      const dynamicModelKey = await getSupplierModelKey(userId);
      const response = await axios.get(API_export_tb_supplier_categories, {
        params: { model_key: dynamicModelKey },
        responseType: 'blob', // Ensure the response is treated as a binary file
      });
      // Lấy tên file từ header Content-Disposition
      let fileName = 'CLIENT_CATEGORIES.xlsx';
      const disposition = response.headers['content-disposition'];
      if (disposition) {
        const match = disposition.match(/filename="(.+?)"/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
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
                className="btn btn-primary"
                disabled={Boolean(!userId || userId === 'unknown')}
              >
                Thêm mới
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleEditButtonClick}
                disabled={Boolean(!userId || userId === 'unknown')}
              >
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
                {filteredSuppliers.map((Supplier) => (
                  <tr key={Supplier.id} onClick={() => handleRowClick(Supplier)} style={{ cursor: "pointer" }}>
                    <td>{Supplier.ma_nha_cung_cap}</td>
                    <td>{Supplier.ten_nha_cung_cap}</td>
                    <td>{Supplier.dia_chi}</td>
                    <td>{Supplier.mst}</td>
                    <td>{Supplier.ma_phan_loai_01}</td>
                    <td>{Supplier.ma_phan_loai_02}</td>
                    <td>{Supplier.ma_phan_loai_03}</td>
                    <td>{Supplier.ma_phan_loai_04}</td>
                    <td>{Supplier.ma_phan_loai_05}</td>
                    <td>{Supplier.ma_phan_loai_06}</td>
                    <td>{Supplier.ma_phan_loai_07}</td>
                    <td>{Supplier.ma_phan_loai_08}</td>
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

export default SupplierManagementPage;