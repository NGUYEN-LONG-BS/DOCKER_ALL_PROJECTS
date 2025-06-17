"use client";

import React, { useState } from "react";
import axios from "axios";
import {
    API_import_bulk_data_TB_INVENTORY_CATEGORIES,
    API_import_bulk_data_LA_INVENTORY_CATEGORIES,
    API_import_bulk_data_PA_INVENTORY_CATEGORIES,
} from "@/api/api"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPermission } from "@/utils/checkPermission";
import { permissionData } from "@/permission/data";


const categoryData: Record<string, { apiUrl: string; table_name: string; combobox_label: string; combobox_value: string }> = {
  TB: {
    apiUrl: API_import_bulk_data_TB_INVENTORY_CATEGORIES,
    table_name: "TB_INVENTORY_CATEGORIES",
    combobox_label: "TB",
    combobox_value: "TB",
  },
  LA: {
    apiUrl: API_import_bulk_data_LA_INVENTORY_CATEGORIES,
    table_name: "LA_INVENTORY_CATEGORIES",
    combobox_label: "LA",
    combobox_value: "LA",
  },
  PA: {
    apiUrl: API_import_bulk_data_PA_INVENTORY_CATEGORIES,
    table_name: "PA_INVENTORY_CATEGORIES",
    combobox_label: "PA",
    combobox_value: "PA",
  },
};

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

    const apiUrl = categoryData[selectedCategory]?.apiUrl;
    if (!apiUrl) {
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

  return (
    <div>
      <h1>INVENTORY_CATEGORIES</h1>
      <p>{categoryData[selectedCategory]?.table_name || "---"}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Chọn loại dữ liệu:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {Object.values(categoryData).map((option) => (
              <option key={option.combobox_value} value={option.combobox_value}>
                {option.combobox_label}
              </option>
            ))}
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