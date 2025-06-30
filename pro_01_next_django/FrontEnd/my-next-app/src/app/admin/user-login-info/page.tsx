"use client";

import React, { useEffect, useState } from "react";
import { API_user_login } from '@/api/api';
import Header from "@/components/header/header_Home";
import Footer from '@/components/footer/Footer';
import { useRouter } from "next/navigation";
import { checkPermission } from "@/utils/checkPermission";
import { permissionData } from "@/permission/data";

export default function UserPermissionPage() {
  // ========== Permission Check =========
  const router = useRouter();
  useEffect(() => {
      const currentPage = "admin___user_login"; // Update dynamically if needed
      const permissions = permissionData[currentPage];
      checkPermission(permissions, router);
  }, [router]);
  // =====================================


  const [permissions, setPermissions] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [form, setForm] = useState({ login_id: "", pass_field: ""});
  const [filter, setFilter] = useState({ login_id: "", pass_field: ""});

  // Fetch all permissions
  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_user_login);
      if (!res.ok) throw new Error("Không thể tải dữ liệu");
      const data = await res.json();
      setPermissions(data);
    } catch (err: any) {
      setError(err.message || "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // Thêm hoặc cập nhật
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `${API_user_login}${editing.id}/` : API_user_login;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Lưu thất bại");
      setForm({ login_id: "", pass_field: ""});
      setEditing(null);
      fetchPermissions();
    } catch (err: any) {
      setError(err.message || "Lỗi không xác định");
    }
  };

  // Xoá
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xoá?")) return;
    setError("");
    try {
      const res = await fetch(`${API_user_login}${id}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("Xoá thất bại");
      fetchPermissions();
    } catch (err: any) {
      setError(err.message || "Lỗi không xác định");
    }
  };

  // Sửa
  const handleEdit = (perm: any) => {
    setEditing(perm);
    setForm({ login_id: perm.login_id, pass_field: perm.pass_field });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-5 flex-grow-1">
        
        <div className="container py-4">
      <h2 className="mb-4">Quản lý User Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4 row g-2 align-items-end">
        <div className="col-md-3">
          <label className="form-label">User ID</label>
          <input className="form-control" value={form.login_id} required onChange={e => setForm(f => ({ ...f, login_id: e.target.value }))} />
        </div>
        <div className="col-md-3">
          <label className="form-label">pass_field</label>
          <input className="form-control" value={form.pass_field} required onChange={e => setForm(f => ({ ...f, pass_field: e.target.value }))} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">{editing ? "Cập nhật" : "Thêm mới"}</button>
        </div>
      </form>
      {/* Bộ lọc */}
      <div className="row mb-3 g-2">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Lọc theo User ID"
            value={filter.login_id}
            onChange={e => setFilter(f => ({ ...f, login_id: e.target.value }))}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Lọc theo pass_field"
            value={filter.pass_field}
            onChange={e => setFilter(f => ({ ...f, pass_field: e.target.value }))}
          />
        </div>
      </div>
      {/* Table có giới hạn chiều cao và filter */}
      {loading ? <div>Đang tải...</div> : (
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          <table className="table table-bordered table-hover mb-0" style={{ minWidth: 700 }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff' }}>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>pass_field</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {permissions
                .filter(perm =>
                  perm.login_id.toLowerCase().includes(filter.login_id.toLowerCase()) &&
                  perm.pass_field.toLowerCase().includes(filter.pass_field.toLowerCase())
                )
                .map(perm => (
                  <tr key={perm.id} onClick={() => setForm({ login_id: perm.login_id, pass_field: perm.pass_field })} style={{ cursor: 'pointer' }}>
                    <td>{perm.id}</td>
                    <td>{perm.login_id}</td>
                    <td>{perm.pass_field}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={e => { e.stopPropagation(); handleEdit(perm); }}>Sửa</button>
                      <button className="btn btn-sm btn-danger" onClick={e => { e.stopPropagation(); handleDelete(perm.id); }}>Xoá</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

      </main>
      <Footer />
    </div>
    
  );
}
