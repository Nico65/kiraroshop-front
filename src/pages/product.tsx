"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);


  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
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
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-5"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="mt-4 text-lg font-bold text-black">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
              <button
                className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={() => handleViewDetails(product)}
              >
                View Details
              </button>
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
                </div>
                <div className="flex justify-end space-x-4">
                  <Button color="success" onClick={() => alert("Added to cart!")}>
                    Add to Cart
                  </Button>
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
