import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Welcome to Our Product Store</h1>
          <p className="mt-2 text-lg">Find the best products for your needs</p>
        </div>
      </header>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example Product Cards */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Product 1</h3>
            <p className="text-gray-600 mt-2">Description for product 1.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Product 2</h3>
            <p className="text-gray-600 mt-2">Description for product 2.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Product 3</h3>
            <p className="text-gray-600 mt-2">Description for product 3.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
