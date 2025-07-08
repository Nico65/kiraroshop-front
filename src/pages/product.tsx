// src/pages/product.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useCart } from "../contexts/cartContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  image: string;
  category: string;
}

const ProductPage = () => {
  const categories = ["All", "Adidas", "AirJordan", "StanSmith", "AirForce"];
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1); // Réinitialiser la quantité
    setIsModalOpen(true);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      if (!user) {
        // Si l'utilisateur n'est pas connecté, afficher une alerte
        alert("Please login to add items to your cart");
        return;
      }
      
      addToCart(selectedProduct, quantity);
      setIsModalOpen(false);
      
      // Afficher une notification de confirmation
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50';
      notification.innerHTML = `
        <div class="flex items-center">
          <div class="py-1"><svg class="h-6 w-6 mr-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg></div>
          <div>
            <p class="font-bold">Added to cart!</p>
            <p class="text-sm">${selectedProduct.name} (${quantity}) has been added to your cart.</p>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      
      // Supprimer la notification après 3 secondes
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }
  };

  return (
    <div className="bg-gray-50 py-10 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-black mb-10">Our Products</h1>

        <div className="flex justify-center mb-10">
          <select
            className="block w-1/2 p-3 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="mt-4 text-lg font-bold text-black">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={() => handleViewDetails(product)}
                >
                  View Details
                </button>
                {user && (
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    onClick={() => {
                      addToCart(product, 1);
                      
                      // Notification rapide
                      const notification = document.createElement('div');
                      notification.className = 'fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50';
                      notification.innerHTML = `
                        <div class="flex items-center">
                          <div class="py-1"><svg class="h-6 w-6 mr-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg></div>
                          <div>
                            <p class="font-bold">Added to cart!</p>
                            <p class="text-sm">${product.name} has been added to your cart.</p>
                          </div>
                        </div>
                      `;
                      document.body.appendChild(notification);
                      setTimeout(() => {
                        document.body.removeChild(notification);
                      }, 3000);
                    }}
                  >
                    Quick Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-10 text-center text-gray-500">
            No products found for the selected category.
          </p>
        )}

        {selectedProduct && (
          <Modal
            show={isModalOpen}
            size="md"
            popup
            onClose={() => setIsModalOpen(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6 p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold text-black">{selectedProduct.name}</h3>
                  <p className="text-gray-700 mt-2">Price: ${selectedProduct.price}</p>
                  <p className="text-gray-700 mt-2">{selectedProduct.description}</p>
                  
                  {user && (
                    <div className="flex items-center mt-4">
                      <label htmlFor="quantity" className="mr-3 text-gray-700">Quantity:</label>
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id="quantity"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none"
                        />
                        <button 
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => setQuantity(q => q + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-4">
                  {user ? (
                    <Button color="success" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  ) : (
                    <Button color="success" onClick={() => alert("Please login to add items to your cart")}>
                      Add to Cart
                    </Button>
                  )}
                  <Button color="gray" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ProductPage;