export const filterProducts = (
    products,
    filters
  ) => {
    return products.filter((product) => {
      const categoryMatch =
        !filters.category ||
        product.category === filters.category;
  
      const brandMatch =
        filters.brands.length === 0 ||
        filters.brands.includes(product.brand);
  
      const minMatch =
        !filters.minPrice ||
        product.price >= filters.minPrice;
  
      const maxMatch =
        !filters.maxPrice ||
        product.price <= filters.maxPrice;
  
      return (
        categoryMatch &&
        brandMatch &&
        minMatch &&
        maxMatch
      );
    });
  };