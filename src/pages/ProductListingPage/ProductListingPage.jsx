import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
} from "../../api/productApi";

import { IoIosSearch } from "react-icons/io";
import Navbar from "../../components/Navbar/Navbar";
import SidebarFilters from "../../components/SidebarFilters/SidebarFilters";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import ErrorState from "../../components/ErrorState/ErrorState";

import "./ProductListingPage.css";

const ProductListingPage = () => {
  // 1. Raw API Data Storage States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const selectedBrandsString = searchParams.get("brands");
  const selectedBrands = selectedBrandsString
    ? selectedBrandsString.split(",")
    : [];

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const PRODUCTS_PER_PAGE = 8;

  const updateFilters = (newParams) => {
    const updated = new URLSearchParams(searchParams);

    Object.keys(newParams).forEach((key) => {
      const value = newParams[key];

      if (value !== undefined) {
        if (value === "" || (Array.isArray(value) && value.length === 0)) {
          updated.delete(key);
        } else {
          updated.set(key, Array.isArray(value) ? value.join(",") : value);
        }
      }
    });

    if (!newParams.hasOwnProperty("page")) {
      updated.set("page", "1");
    }

    setSearchParams(updated);
  };

  const setSelectedCategory = (category) => updateFilters({ category });

  const setPriceRange = (min, max) =>
    updateFilters({ minPrice: min, maxPrice: max });

  const setSelectedBrands = (brandsArr) => updateFilters({ brands: brandsArr });
  const setCurrentPage = (page) => updateFilters({ page });

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await getCategories();
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to fetch sidebar category metrics:", err);
      }
    };
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        setError("");

        let response;
        if (selectedCategory) {
          response = await getProductsByCategory(selectedCategory);
        } else {
          response = await getProducts(100);
        }

        setProducts(response.data.products || []);
      } catch (err) {
        setError(
          "Failed to load catalog products. Please check connection status."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    const price = Number(product.price);

    const matchesMinPrice = minPrice === "" || price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === "" || price <= parseFloat(maxPrice);
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return matchesMinPrice && matchesMaxPrice && matchesBrand;
  });

  const isAnyFilterApplied =
    selectedCategory !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    selectedBrands.length > 0;

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProductsToDisplay = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const uniqueBrands = [
    ...new Set(products.map((p) => p.brand).filter(Boolean)),
  ];

  return (
    <div className="app-window-frame">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="main-layout-container">
        {isSidebarOpen && (
          <SidebarFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setPriceRange={setPriceRange}
            brands={uniqueBrands}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />
        )}

        <div className="content-space">
          {isAnyFilterApplied && (
            <h3 className="filters-grid-title">
              <IoIosSearch
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              Filters
            </h3>
          )}

          {loading && <Loader />}
          {error && <ErrorState message={error} />}

          {!loading && !error && (
            <>
              <div className="product-grid">
                {currentProductsToDisplay.length > 0 ? (
                  currentProductsToDisplay.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="no-products-container">
                    No products match your selected filter options.
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
