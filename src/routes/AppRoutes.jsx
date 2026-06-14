import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductListingPage from "../pages/ProductListingPage/ProductListingPage"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
    </Router>
)

export default AppRoutes