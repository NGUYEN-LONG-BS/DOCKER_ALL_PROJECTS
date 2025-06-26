'use client';
import React from 'react';
import useSWR from 'swr';
import { API_get_json_data, API_get_inventory_categories } from '@/api/api';
import { getSupplierModelKey } from '@/utils/getPermissionOnDB';

// Định nghĩa các kiểu dữ liệu
interface FontConfig {
  family: string;
  size: number;
  weight: string;
}

interface ColumnConfig {
  name: string;
  width: string; // Sử dụng string vì có đơn vị (px)
  min_width: string; // Sử dụng string vì có đơn vị (px)
  anchor: string;
  stretch: boolean;
  font: FontConfig;
  background_color: string;
  foreground_color: string;
  show: string;
}

interface TableConfig {
  table: {
    name: string;
    description: string;
    headings: FontConfig;
    columns: ColumnConfig[];
    general: {
      border_width: number;
      relief: string;
      padding: string;
      background_color: string;
    };
  };
}

interface InventoryRow {
  [key: string]: any; // Cho phép các thuộc tính có tên bất kỳ với kiểu giá trị bất kỳ
}

// Hàm fetch dữ liệu từ API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Component để hiển thị bảng
interface TableProps {
  columns: string[]; // Các cột cần hiển thị
  data: InventoryRow[]; // Dữ liệu bảng
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Component Table_TestCategory
const Table_test_02category = () => {
  const [modelKey, setModelKey] = React.useState<string | null>(null);
  React.useEffect(() => {
    async function fetchModelKey() {
      const userId = localStorage.getItem('user_id') || '';
      if (userId) {
        const key = await getSupplierModelKey(userId);
        setModelKey(key);
      }
    }
    fetchModelKey();
  }, []);

  // Fetch dữ liệu từ API
  const { data: tableConfig, error: tableError } = useSWR<TableConfig>(API_get_json_data, fetcher);
  const { data: inventoryData, error: inventoryError } = useSWR<InventoryRow[]>(
    modelKey ? `${API_get_inventory_categories}?model_key=${modelKey}` : null,
    fetcher
  );
  console.log(inventoryData);
  console.log(inventoryError);
  console.log(useSWR<InventoryRow[]>(API_get_inventory_categories, fetcher));

  // Kiểm tra lỗi
  if (tableError || inventoryError) {
    return <div>Error loading data.</div>;
  }

  // Kiểm tra nếu dữ liệu chưa sẵn sàng
  if (!tableConfig || !inventoryData) {
    return <div>Loading...</div>;
  }

  // Tạo danh sách cột từ tableConfig
  const columns = tableConfig.table.columns.map((col) => col.name);

  return (
    <div>
      {/* <h1>{tableConfig.table.name}</h1>
      <p>{tableConfig.table.description}</p> */}
      <Table columns={columns} data={inventoryData} />
    </div>
  );
};

export default Table_test_02category;
