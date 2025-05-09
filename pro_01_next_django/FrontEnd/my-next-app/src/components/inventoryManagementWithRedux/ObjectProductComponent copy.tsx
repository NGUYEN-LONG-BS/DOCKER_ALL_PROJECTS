import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  setSearchText,
  setFilteredProducts,
  setShowDropdown,
  setLoading,
  setProduct,
  setInventoryItem,
  updateInventoryItem,
} from '../../store/productSlice';

// Define the ProductData interface
interface ProductData {
  code: string;
  name: string;
  unit: string;
}

const ProductComponent = () => {
  const dispatch = useDispatch();
  const {
    searchText,
    filteredProducts,
    showDropdown,
    loading,
    product,
    inventoryItem,
  } = useSelector((state: RootState) => state.product);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/get-inventory-categories/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const products = data.map((item: { ma_hang: string, ten_hang: string, dvt: string }) => ({
        code: item.ma_hang,
        name: item.ten_hang,
        unit: item.dvt,
      }));
      dispatch(setFilteredProducts(products));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleFilter = (text: string) => {
    dispatch(setSearchText(text));

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      dispatch(setLoading(true));
      const filtered = filteredProducts.filter(
        (product) =>
          product.code.toLowerCase().includes(text.toLowerCase()) ||
          product.name.toLowerCase().includes(text.toLowerCase())
      );
      dispatch(setFilteredProducts(filtered));
      dispatch(setLoading(false));
      dispatch(setShowDropdown(true));
    }, 300);
  };

  const handleSelectProduct = (selectedItem: ProductData) => {
    dispatch(setProduct(selectedItem));
    dispatch(setSearchText(selectedItem.code));
    dispatch(setFilteredProducts([]));
    dispatch(setShowDropdown(false));

    dispatch(updateInventoryItem({ quantity: 0, price: 0, notes: '' }));
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unit = e.target.value;
    dispatch(updateInventoryItem({ unit }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateInventoryItem({ quantity: parseFloat(value.replace(/\./g, '')) || 0 }));
  };

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateInventoryItem({ price: parseFloat(value.replace(/\./g, '')) || 0 }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateInventoryItem({ notes: value }));
  };

  return (
    <div className="card" ref={wrapperRef}>
      <div className="card-body py-2">
        <div className="mb-1 position-relative">
          <div className="d-flex align-items-center gap-2" style={{ marginBottom: '0px' }}>
            <label htmlFor="Product-code" className="form-label mb-0" style={{ width: '120px', whiteSpace: 'nowrap' }}>
              Sản phẩm
            </label>
            <input
              type="text"
              className="form-control"
              id="Product-code"
              placeholder="Search here"
              value={searchText}
              onChange={(e) => handleFilter(e.target.value)}
            />
            <input
              type="text"
              className="form-control flex-grow-1"
              id="Product-name"
              placeholder="tên hàng"
              value={product.name}
              onChange={(e) => dispatch(setProduct({ ...product, name: e.target.value }))}
            />
          </div>

          {showDropdown && (
            <ul
              className="list-group position-absolute mt-1 shadow"
              ref={dropdownRef}
              style={{
                zIndex: 1000,
                width: 'calc(100% - 50px)',
                marginLeft: '100px',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {loading ? (
                <li className="list-group-item text-center">Đang tải...</li>
              ) : (
                filteredProducts.map((s, index) => (
                  <li
                    key={s.code}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: 'pointer', fontSize: '0.9rem' }}
                    onClick={() => handleSelectProduct(s)}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr", gap: "10px" }}>
                      <div><span>{s.code}</span></div>
                      <div><span>{s.name}</span></div>
                      <div><span>{s.unit}</span></div>
                    </div>
                  </li>
                ))
              )}
              {filteredProducts.length === 0 && !loading && (
                <li className="list-group-item text-muted">Vui lòng gợi ý thông tin</li> // Display message if no Products found
              )}
            </ul>
          )}
        </div>

        <div className="row mb-1 g-1">

          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="Product-unit"
              placeholder="đvt"
              value={inventoryItem.unit || ''}
              onChange={handleUnitChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="quantity"
              placeholder="số lượng"
              value={inventoryItem.quantity || ''}
              onChange={handleQuantityChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="unitPrice"
              placeholder="đơn giá"
              value={inventoryItem.price || ''}
              onChange={handleUnitPriceChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="value"
              placeholder="giá trị"
              value={(inventoryItem.quantity * inventoryItem.price).toString()}
              readOnly
            />
          </div>
        </div>

        <div className="row mb-1">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="Product-notes"
              placeholder="ghi chú sản phẩm"
              value={inventoryItem.notes}
              onChange={handleNotesChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
