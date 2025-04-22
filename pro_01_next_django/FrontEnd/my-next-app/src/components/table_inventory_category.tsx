'use client';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ColumnConfig {
  name: string;
  width: number;
  min_width: number;
  anchor: string;
  stretch: boolean;
  font: {
    family: string;
    size: number;
    weight: string;
  };
  background_color: string;
  foreground_color: string;
  show: string;
}

interface TableConfig {
  table: {
    name: string;
    description: string;
    headings: {
      family: string;
      size: number;
      weight: string;
    };
    columns: ColumnConfig[];
    general: {
      border_width: number;
      relief: string;
      padding: number;
      background_color: string;
    };
  };
}

interface InventoryRow {
  [key: string]: any; // Each row can have multiple fields with dynamic keys
}

const TableInventoryCategories: React.FC = () => {
  // Fetch table config data
  const { data: tableConfig, error: tableError } = useSWR<TableConfig>('http://localhost:8000/api/get-json-data/', fetcher);
  // Fetch inventory data
  const { data: inventoryData, error: inventoryError } = useSWR<InventoryRow[]>('http://localhost:8000/api/get-inventory-categories/', fetcher);

  // Check for errors or loading states
  if (tableError || inventoryError) return <div>Error loading data...</div>;
  if (!tableConfig || !inventoryData) return <div>Loading...</div>;

  const { columns, general } = tableConfig.table;

  return (
    <div className="table-responsive">
      <h2>{tableConfig.table.name}</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  width: column.width,
                  minWidth: column.min_width,
                  textAlign: column.anchor === 'center' ? 'center' : 'left',
                  backgroundColor: column.background_color,
                  color: column.foreground_color,
                  fontFamily: column.font.family,
                  fontSize: `${column.font.size}px`,
                  fontWeight: column.font.weight,
                }}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows */}
          {inventoryData.length > 0 ? (
            inventoryData.map((row: InventoryRow, rowIndex: number) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex: number) => ( // Explicitly typing colIndex as number
                  <td
                    key={colIndex}
                    style={{
                      textAlign: column.anchor === 'center' ? 'center' : 'left',
                      backgroundColor: column.background_color,
                      color: column.foreground_color,
                      fontFamily: column.font.family,
                      fontSize: `${column.font.size}px`,
                      fontWeight: column.font.weight,
                    }}
                  >
                    {row[column.name.toLowerCase().replace(/\s+/g, '_')]} {/* Adjust this line based on your data */}
                  </td>
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

export default TableInventoryCategories;
