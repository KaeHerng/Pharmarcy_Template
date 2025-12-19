import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Layout from "./layouts/layout";
import ProductShareLayout from "./pages/ProductShareLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/category/:id" element={<Layout><Category /></Layout>} />
        <Route path="/ProductShareLayout/:category" element={<Layout><ProductShareLayout /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
