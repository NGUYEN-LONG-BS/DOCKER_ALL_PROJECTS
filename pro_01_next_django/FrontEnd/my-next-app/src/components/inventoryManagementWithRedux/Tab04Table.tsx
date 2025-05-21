"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventory,

} from "@/features/formReceiptLog/ReceiptLogTableSlice";
import { RootState } from "@/store/store";
import PopupFadeout from "../popups/errorPopupComponentTypeFadeOutNum01";
  

  

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center gap-2 mb-3">
        <button type="button" className="btn btn-primary">
          Filter
        </button>
        <button type="button" className="btn btn-outline-secondary">
          Clear filter
        </button>
      </div>

      <div className="border rounded">
        <div className="table-container">
          <table className="table table-bordered table-hover mb-0">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>STT</th>
                <th>Số phiếu</th>
                <th>Ngày</th>
                <th>Số đề nghị</th>
                <th>Mã đối tượng</th>
                <th>Tên đối tượng</th>
                <th>Mã hàng</th>
8                <th>Tên hàng</th>
                <th>Kho</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" ? (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={item.so_phieu}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "so_phieu",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={item.ngay_tren_phieu}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "ngay_tren_phieu",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={item.so_phieu_de_nghi}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "so_phieu_de_nghi",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={item.ma_doi_tuong}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "ma_doi_tuong",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={item.ten_doi_tuong || ""}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "ten_doi_tuong",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={item.ma_hang}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "ma_hang",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={item.ten_hang || ""}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "ten_hang",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={item.ma_kho_nhan}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "ma_kho_nhan",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-relative"
                        onClick={() => deleteRow(item.id)}
                        style={{
                          borderRadius: "50%",
                          padding: "5px 10px",
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        <span className="fw-bold">X</span>
                        <span
                          className="position-absolute top-100 start-50 translate-middle-x"
                          style={{
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                            display: "none",
                            zIndex: 1,
                          }}
                          id={`deleteText-${item.id}`}
                        >
                          Delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Error Popup */}
      <PopupFadeout message={errorMessage || error} onClose={() => setErrorMessage(null)} />
    </div>
  );
}