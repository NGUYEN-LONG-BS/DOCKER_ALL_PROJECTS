"use client";

import React, { useEffect, useState } from "react";
import { API_user_permissions } from '@/api/api';
import Header from "@/components/header/header_Home";
import Footer from '@/components/footer/Footer';
import { useRouter } from "next/navigation";
import { checkPermission } from "@/utils/checkPermission";
import { permissionData } from "@/permission/data";

interface UserPermission {
  id: number;
  user_id: string;
  subsidiary: string;
  department: string;
}

export default function UserPermissionPage() {
  // ========== Permission Check =========
    const router = useRouter();
    useEffect(() => {
        const currentPage = "admin___user"; // Update dynamically if needed
        const permissions = permissionData[currentPage];
        checkPermission(permissions, router);
    }, [router]);
    // =====================================


  const [permissions, setPermissions] = useState<UserPermission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<UserPermission | null>(null);
  const [form, setForm] = useState({ user_id: "", subsidiary: "", department: "" });
  const [filter, setFilter] = useState({ user_id: "", subsidiary: "", department: "" });

  // Fetch all permissions
  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_user_permissions);
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
      const url = editing ? `${API_user_permissions}${editing.id}/` : API_user_permissions;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Lưu thất bại");
      setForm({ user_id: "", subsidiary: "", department: "" });
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
      const res = await fetch(`${API_user_permissions}${id}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("Xoá thất bại");
      fetchPermissions();
    } catch (err: any) {
      setError(err.message || "Lỗi không xác định");
    }
  };

  // Sửa
  const handleEdit = (perm: UserPermission) => {
    setEditing(perm);
    setForm({ user_id: perm.user_id, subsidiary: perm.subsidiary, department: perm.department });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-5 flex-grow-1">
        
        <div className="container py-4">
      <h2 className="mb-4">Quản lý User Permissions</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4 row g-2 align-items-end">
        <div className="col-md-3">
          <label className="form-label">User ID</label>
          <input className="form-control" value={form.user_id} required onChange={e => setForm(f => ({ ...f, user_id: e.target.value }))} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Subsidiary</label>
          <input className="form-control" value={form.subsidiary} required onChange={e => setForm(f => ({ ...f, subsidiary: e.target.value }))} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Department</label>
          <input className="form-control" value={form.department} required onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
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
            value={filter.user_id}
            onChange={e => setFilter(f => ({ ...f, user_id: e.target.value }))}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Lọc theo Subsidiary"
            value={filter.subsidiary}
            onChange={e => setFilter(f => ({ ...f, subsidiary: e.target.value }))}
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Lọc theo Department"
            value={filter.department}
            onChange={e => setFilter(f => ({ ...f, department: e.target.value }))}
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
                <th>Subsidiary</th>
                <th>Department</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {permissions
                .filter(perm =>
                  perm.user_id.toLowerCase().includes(filter.user_id.toLowerCase()) &&
                  perm.subsidiary.toLowerCase().includes(filter.subsidiary.toLowerCase()) &&
                  perm.department.toLowerCase().includes(filter.department.toLowerCase())
                )
                .map(perm => (
                  <tr key={perm.id} onClick={() => setForm({ user_id: perm.user_id, subsidiary: perm.subsidiary, department: perm.department })} style={{ cursor: 'pointer' }}>
                    <td>{perm.id}</td>
                    <td>{perm.user_id}</td>
                    <td>{perm.subsidiary}</td>
                    <td>{perm.department}</td>
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
