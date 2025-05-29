"use client"

import type React from "react"
import { useState } from "react"

interface SearchFilterComponentProps {
  onSearch?: (searchTerm: string) => void
  onFilter?: () => void
}

const SearchFilterComponent: React.FC<SearchFilterComponentProps> = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleFilterClick = () => {
    if (onFilter) {
      onFilter()
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  return (
    <div className="search-container-new d-flex">
      <form className="search-input-wrapper flex-grow-1 position-relative" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="form-control search-input-new"
          placeholder="Tìm kiếm mẫu ảnh..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-icon-new border-0 bg-transparent">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <button className="btn btn-filter ms-2" onClick={handleFilterClick}>
        <i className="fas fa-filter me-1"></i>
        Lọc
      </button>
    </div>
  )
}

export default SearchFilterComponent
