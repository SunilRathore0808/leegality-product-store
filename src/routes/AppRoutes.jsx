import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductListingPage from "../pages/ProductListingPage/ProductListingPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProductListingPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
