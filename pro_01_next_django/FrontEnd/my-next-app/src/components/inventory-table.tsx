"use client"

import { useState } from "react"

interface InventoryItem {
  id: number
  code: string
  name: string
  unit: string
  quantity: number
  price: number
  notes: string
}

export function InventoryTable() {
  const [items, setItems] = useState<InventoryItem[]>([])

  const addRow = () => {
    const newItem: InventoryItem = {
      id: items.length + 1,
      code: "",
      name: "",
      unit: "",
      quantity: 0,
      price: 0,
      notes: "",
    }
    setItems([...items, newItem])
  }

  const deleteRow = () => {
    if (items.length > 0) {
      const newItems = [...items]
      newItems.pop()
      setItems(newItems)
    }
  }

  const clearRows = () => {
    setItems([])
  }

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center gap-2 mb-3">
        <button type="button" className="btn btn-primary" onClick={addRow}>
          Add Row
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={deleteRow}>
          Delete Row
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={clearRows}>
          Clear Rows
        </button>
      </div>

      <div className="border rounded">
        <div className="table-container">
          <table className="table table-bordered table-hover mb-0">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>STT</th>
                <th>Mã hàng</th>
                <th>Tên mặt hàng</th>
                <th>Đvt</th>
                <th>SL thực nhập</th>
                <th>Đơn giá</th>
                <th>Giá trị</th>
                <th>Ghi chú sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Mã hàng"
                        value={item.code}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].code = e.target.value
                          setItems(newItems)
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Tên mặt hàng"
                        value={item.name}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].name = e.target.value
                          setItems(newItems)
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Đvt"
                        value={item.unit}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].unit = e.target.value
                          setItems(newItems)
                        }}
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].quantity = Number(e.target.value)
                          setItems(newItems)
                        }}
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.price}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].price = Number(e.target.value)
                          setItems(newItems)
                        }}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.quantity * item.price}
                        readOnly
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Ghi chú"
                        value={item.notes}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].notes = e.target.value
                          setItems(newItems)
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
