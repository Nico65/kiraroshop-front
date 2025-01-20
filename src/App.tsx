import { useState, useEffect } from "react";
import { Component as Navbar } from "./components/nav";
import { Foot } from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import ProductPage from "./pages/product";
import ContactUs from "./pages/contact";
import LoginPage from "./pages/loginPage";


function App() {
  const [currentPage, setCurrentPage] = useState("home"); // État pour gérer la page actuelle

 
  useEffect(() => {
    if (currentPage === "login") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div>
      <Navbar onNavigate={setCurrentPage} /> {/* Passer la fonction de navigation */}
      {currentPage === "login" ? ( // Afficher la page login uniquement si elle est sélectionnée
        <LoginPage />
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
      <Foot />
    </div>
  );
}

export default App;
