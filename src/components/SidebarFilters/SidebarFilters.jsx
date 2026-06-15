import React, { useState, useEffect } from "react";
import "./SidebarFilters.css";
import { IoIosSearch } from "react-icons/io";

const SidebarFilters = ({
  categories = [],
  brands = [],
  selectedCategory,
  setSelectedCategory,
  selectedBrands = [],
  setSelectedBrands,
  minPrice,
  maxPrice,
  setPriceRange,
}) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLocalMin(minPrice || "");
  }, [minPrice]);

  useEffect(() => {
    setLocalMax(maxPrice || "");
  }, [maxPrice]);

  const handleApplyPrice = () => {
    setPriceRange(localMin, localMax);
  };

  const handleBrandCheckboxChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const getCategoryName = (cat) => {
    if (typeof cat === "object" && cat !== null)
      return cat.name || cat.slug || "";
    return cat;
  };

  const getCategoryValue = (cat) => {
    if (typeof cat === "object" && cat !== null)
      return cat.slug || cat.name || "";
    return cat;
  };

  return (
    <aside className="sidebar-filters">
      <div className="sidebar-search-wrapper">
        <span className="sidebar-search-icon">
          <IoIosSearch />
        </span>
        <input
          type="text"
          placeholder="Search brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sidebar-search-input"
        />
      </div>

      {/* Categories Section */}
      <div className="filter-section">
        <h4 className="filter-section-heading">Categories</h4>
        <div className="filter-list-box">
          {categories.map((cat) => {
            const catValue = getCategoryValue(cat);
            const catName = getCategoryName(cat);
            return (
              <label key={catValue} className="filter-checkbox-row">
                <input
                  type="checkbox"
                  checked={selectedCategory === catValue}
                  onChange={() =>
                    setSelectedCategory(
                      selectedCategory === catValue ? "" : catValue
                    )
                  }
                />
                <span className="checkbox-custom-label">{catName}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="filter-section">
        <h4 className="filter-section-heading">Price Range</h4>
        <div className="price-inputs-row">
          <input
            type="number"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="price-field"
          />
          <input
            type="number"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="price-field"
          />
        </div>
        <button
          type="button"
          onClick={handleApplyPrice}
          className="apply-filters-btn"
        >
          Apply
        </button>
      </div>

      {/* Brands Section */}
      <div className="filter-section">
        <h4 className="filter-section-heading">Brands</h4>
        <div className="filter-list-box">
          {brands
            .filter(
              (b) => b && b.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((brand) => (
              <label key={brand} className="filter-checkbox-row">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandCheckboxChange(brand)}
                />
                <span className="checkbox-custom-label">{brand}</span>
              </label>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;
