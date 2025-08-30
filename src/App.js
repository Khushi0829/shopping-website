import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Element, Link as ScrollLink } from 'react-scroll';
import Home from './components/Home';
import About from './components/About';
import Features from './components/Features';
import Feedback from './components/Feedback';
import Contact from './components/Contact';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Footer from './components/Footer' ;
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import AdminPanel from "./components/AdminPanel";
import './App.css';




const AppContent = () => {
  
  const [showNavbar, setShowNavbar] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);
const [modalOpen, setModalOpen] = useState(false); // control from Shop


useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // scrolling down
    } else {
      setShowNavbar(true);  // scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);



  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
const isHome = location.pathname === '/';
  const texts = [
    "Buy 2, Grab 10% OFF on the 3rd !!!",
    "New Arrivals just landed",
    "Limited Time Offer: 20% OFF Storewide!"
  ];
  
  // Slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const nextText = () => setCurrentIndex((prev) => (prev + 1) % texts.length);
  const prevText = () => setCurrentIndex((prev) => (prev - 1 + texts.length) % texts.length);

  return (
  <>
   
    {showNavbar && !modalOpen && (
    <>
    
      <div className="top-bar">
        <span className="arrow left-arrow" onClick={prevText}>&lt;</span>
        <span>{texts[currentIndex]}</span>
        <span className="arrow right-arrow" onClick={nextText}>&gt;</span>
      </div>

      

      <nav className="navbar-main">
        <div className="logo">
          <Link to="/">Shopping4u</Link>
        </div>
        <div className="nav-links">
          {isHome ? (
            <>
              <ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink>
              <ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink>
              <ScrollLink to="features" smooth={true} duration={500}>Features</ScrollLink>
              <ScrollLink to="feedback" smooth={true} duration={500}>Feedback</ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500}>Contact</ScrollLink>
            </>
          ) : (
            <Link to="/">Back to Home</Link>
          )}
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="nav-icons">
          {/* <i className="fas fa-search"></i> */}
          <i className="fas fa-user"></i>
          <i className="fas fa-shopping-bag"></i>
        </div>
      </nav>
      </>
      )}

      <Routes>
        
        <Route path="/" element={
          <>
            <Element name="home">
              <section id="home">
               <Home />
              </section>
            </Element>
            <Element name="about">
              <section id="about">
                <About />
              </section>
            </Element>
            <Element name="features">
              <section id="features">
                <Features />
              </section>
            </Element>
            <Element name="feedback">
              <section id="feedback">
                <Feedback />
              </section>
            </Element>
            <Element name="contact">
              <section id="contact">
                <Contact />
              </section>
            </Element>
          </>
        } />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop" element={<Shop setModalOpen={setModalOpen} />} />

        <Route path="/cart" element={<Cart />} />

       <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </>
  );
}

// ✅ Only Router and AppContent in App
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
