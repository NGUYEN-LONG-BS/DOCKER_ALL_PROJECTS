"use client";

import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Thay đổi URL nếu cần
export const API_import_bulk_data_TB_INVENTORY_CATEGORIES = `${API_BASE_URL}/api/import_bulk_data_TB_INVENTORY_CATEGORIES/`;
export const API_import_bulk_data_LA_INVENTORY_CATEGORIES = `${API_BASE_URL}/api/import_bulk_data_LA_INVENTORY_CATEGORIES/`;
export const API_import_bulk_data_PA_INVENTORY_CATEGORIES = `${API_BASE_URL}/api/import_bulk_data_PA_INVENTORY_CATEGORIES/`;

const ImportBulkDataPage = () => {
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

    let apiUrl = "";
    switch (selectedCategory) {
      case "TB":
        apiUrl = API_import_bulk_data_TB_INVENTORY_CATEGORIES;
        break;
      case "LA":
        apiUrl = API_import_bulk_data_LA_INVENTORY_CATEGORIES;
        break;
      case "PA":
        apiUrl = API_import_bulk_data_PA_INVENTORY_CATEGORIES;
        break;
      default:
        setMessage("Loại dữ liệu không hợp lệ.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

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

  const getTitle = () => {
    switch (selectedCategory) {
      case "TB":
        return "Import Bulk Data to table: TB_INVENTORY_CATEGORIES";
      case "LA":
        return "Import Bulk Data to table: LA_INVENTORY_CATEGORIES";
      case "PA":
        return "Import Bulk Data to table: PA_INVENTORY_CATEGORIES";
      default:
        return "Import Bulk Data";
    }
  };

  return (
    <div>
      <h1>{getTitle()}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Chọn loại dữ liệu:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="TB">TB</option>
            <option value="LA">LA</option>
            <option value="PA">PA</option>
          </select>
        </div>
        <div>
          <label htmlFor="file">Chọn file Excel:</label>
          <input
            type="file"
            id="file"
            accept=".xlsx"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Gửi</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImportBulkDataPage;