import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Layout from "./layouts/layout";
import ProductShareLayout from "./pages/ProductShareLayout";
import Productdetails from "./pages/product";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/category/:id" element={<Layout><Category /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/Checkout" element={<Layout><CheckoutPage /></Layout>} />
        <Route path="/product/:id" element={<Layout><Productdetails /></Layout>} />
        <Route path="/ProductShareLayout/:category" element={<Layout><ProductShareLayout /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
