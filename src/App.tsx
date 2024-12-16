import { Component as Navbar } from "./components/nav";
import { Foot } from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import ProductPage from "./pages/product";
import ContactUs from "./pages/contact";

function App() {
  return (
    <div>
      <Navbar />

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

      <Foot />
    </div>
  );
}

export default App;
