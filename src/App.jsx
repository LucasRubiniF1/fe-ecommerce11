//import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductSearch from './pages/ProductSearch';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    
<>
    <Navbar />    

    <Router>

      <div className="app-container">  
        <div className="main-content">
          {/* <Sidebar /> */}
          <div className="page-content">
            <Routes>
              <Route path="/" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart/:userId" element={ <Cart/> }/>
              <Route path="/checkout/:userId" element={ <Checkout/> }/>
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