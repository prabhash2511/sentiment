import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import ProductDetail1 from "./components/ProductDetail1";
import ProductDetail2 from "./components/ProductDetail2";
import ProductDetail3 from "./components/ProductDetail3";
import ProductDetail4 from "./components/ProductDetail4";
import Login from "./components/Login";
import Registration from "./components/Registration";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail1" element={<ProductDetail1 />} />
        <Route path="/product-detail2" element={<ProductDetail2 />} />
        <Route path="/product-detail3" element={<ProductDetail3 />} />
        <Route path="/product-detail4" element={<ProductDetail4 />} />
      </Routes>
    </Router>
  );
};

export default App;
