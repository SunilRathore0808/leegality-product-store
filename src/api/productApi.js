import axiosInstance from "./axiosInstance";

export const getProducts = (limit = 100) => {
  return axiosInstance.get(`/products?limit=${limit}`);
};

export const getCategories = () => {
  return axiosInstance.get("/products/categories");
};

export const getProductById = (id) => {
  return axiosInstance.get(`/products/${id}`);
};

export const getProductsByCategory = (category) => {
  return axiosInstance.get(`/products/category/${category}`);
};