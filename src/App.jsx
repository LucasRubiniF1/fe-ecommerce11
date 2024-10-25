import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProductSearchWithBoundary from './pages/ProductSearch'; // Importa el componente con Error Boundary
import ProductDetail from './pages/ProductDetail';
import ProductEdit from './pages/ProductEdit';
import ProductCreate from './pages/ProductCreate';

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <div className="app-container">
          <div className="main-content">
            <Sidebar />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<ProductSearchWithBoundary />} /> {/* Usa el componente con Error Boundary */}
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/product/edit/:id" element={<ProductEdit />} />
                <Route path="/product/create" element={<ProductCreate />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
