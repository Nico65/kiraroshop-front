// src/App.js
import { useState, useEffect } from "react";
import { Component as Navbar } from "./components/nav";
import { Foot } from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import ProductPage from "./pages/product";
import ContactUs from "./pages/contact";
import LoginPage from "./pages/loginPage";
import CartPage from "./pages/cart";
import OrdersPage from "./pages/orders";
import { CartProvider } from "./contexts/cartContext";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      setIsLoggedIn(!!storedUser);
    };
    
    checkLoginStatus();
    
    // Écouter les changements de stockage pour gérer les connexions/déconnexions
    window.addEventListener('storage', checkLoginStatus);
    
    // Écouter l'événement personnalisé de déconnexion
    const handleLogout = () => {
      setIsLoggedIn(false);
      setRefreshKey(prevKey => prevKey + 1);
    };
    window.addEventListener('userLogout', handleLogout);
    
    // Écouter l'événement personnalisé de connexion
    const handleLogin = () => {
      setIsLoggedIn(true);
      setRefreshKey(prevKey => prevKey + 1);
    };
    window.addEventListener('userLogin', handleLogin);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('userLogout', handleLogout);
      window.removeEventListener('userLogin', handleLogin);
    };
  }, []);

  // Fonction pour gérer la navigation
  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Si on navigue vers login, s'assurer que la page est bien affichée
    if (page === "login" || page === "cart" || page === "orders") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Rediriger vers la page d'accueil si l'utilisateur se connecte
  useEffect(() => {
    if (isLoggedIn && currentPage === "login") {
      setCurrentPage("home");
    }
    // Rediriger vers login si l'utilisateur tente d'accéder à des pages protégées
    if (!isLoggedIn && (currentPage === "cart" || currentPage === "orders")) {
      setCurrentPage("login");
    }
  }, [isLoggedIn, currentPage]);

  return (
    <CartProvider>
      <div key={refreshKey} className="flex flex-col min-h-screen">
        <Navbar onNavigate={handleNavigate} />
        <main className="flex-grow">
          {currentPage === "login" ? ( 
            <LoginPage onLoginSuccess={() => setCurrentPage("home")} />
          ) : currentPage === "cart" ? (
            <CartPage />
          ) : currentPage === "orders" ? (
            <OrdersPage />
          ) : (
            <div>
              <div id="home">
                <Home />
              </div>
              <div id="about">
                <About />
              </div>
              <div id="products">
                <ProductPage />
              </div>
              <div id="contact">
                <ContactUs />
              </div>
            </div>
          )}
        </main>
        <Foot />
      </div>
    </CartProvider>
  );
}

export default App;