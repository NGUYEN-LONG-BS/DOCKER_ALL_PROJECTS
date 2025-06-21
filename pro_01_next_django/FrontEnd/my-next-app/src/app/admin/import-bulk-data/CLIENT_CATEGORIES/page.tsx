"use client";

import React, { useState } from "react";
import axios from "axios";
import {
    API_import_bulk_data_to_all_CLIENT_CATEGORIES,
} from "@/api/api"
import Header from "@/components/header/header_Home";
import Footer from '@/components/footer/Footer';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPermission } from "@/utils/checkPermission";
import { permissionData } from "@/permission/data";

const PAGE_TITLE: Record<string, string> = {
  TB: "TB_CLIENT_CATEGORIES",
  LA: "LA_CLIENT_CATEGORIES",
  PA: "PA_CLIENT_CATEGORIES",
  MIENTAY: "MIENTAY_CLIENT_CATEGORIES",
  HANOI: "HANOI_CLIENT_CATEGORIES",
  NAMAN: "NAMAN_CLIENT_CATEGORIES",
};

const categoryData: Record<string, { table_name: string; combobox_label: string; combobox_value: string }> = {
  TB: {
    table_name: "TB_CLIENT_CATEGORIES",
    combobox_label: "TB",
    combobox_value: "TB",
  },
  LA: {
    table_name: "LA_CLIENT_CATEGORIES",
    combobox_label: "LA",
    combobox_value: "LA",
  },
  PA: {
    table_name: "PA_CLIENT_CATEGORIES",
    combobox_label: "PA",
    combobox_value: "PA",
  },
  MIENTAY: {
    table_name: "MIENTAY_CLIENT_CATEGORIES",
    combobox_label: "MIENTAY",
    combobox_value: "MIENTAY",
  },
  HANOI: {
    table_name: "HANOI_CLIENT_CATEGORIES",
    combobox_label: "HANOI",
    combobox_value: "HANOI",
  },
  NAMAN: {
    table_name: "NAMAN_CLIENT_CATEGORIES",
    combobox_label: "NAMAN",
    combobox_value: "NAMAN",
  },
};

const API_URL = API_import_bulk_data_to_all_CLIENT_CATEGORIES;

const ImportBulkDataPage = () => {

  const router = useRouter();
    useEffect(() => {
      const currentPage = "admin___import_bulk_data___INVENTORY_CATEGORIES"; // Update dynamically if needed
      const permissions = permissionData[currentPage];
      checkPermission(permissions, router);
    }, [router]);

  const [selectedCategory, setSelectedCategory] = useState<string>("TB");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setMessage("Vui lòng chọn file Excel.");
      return;
    }

    const apiUrl = API_URL;
    if (!apiUrl) {
      setMessage("Loại dữ liệu không hợp lệ.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model_key", selectedCategory); // Gửi thêm model_key cho backend

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message || "File đã được gửi thành công!");
    } catch (error: any) {
      setMessage(
        error.response?.data?.error || "Có lỗi xảy ra khi gửi file."
      );
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-5 flex-grow-1">
        <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: 500, marginTop: 40 }}>
          <h1 className="h4 text-center mb-3">{PAGE_TITLE[selectedCategory]}</h1>
          <p className="text-center text-muted mb-4">{categoryData[selectedCategory]?.table_name || "---"}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="category" className="form-label fw-semibold">Chọn loại dữ liệu</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="form-select"
              >
                {Object.values(categoryData).map((option) => (
                  <option key={option.combobox_value} value={option.combobox_value}>
                    {option.combobox_label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label fw-semibold">Chọn file Excel</label>
              <input
                type="file"
                id="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Gửi</button>
          </form>
          {message && <div className={`alert mt-3 ${message.toLowerCase().includes('thành công') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ImportBulkDataPage;