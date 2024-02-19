"use client";
import { useState, useEffect } from "react";

export default function ProductsPage({}) {
  const [products, setProducts] = useState([]);
  const [brandName, setBrandName] = useState();
  const [brandId, setBrandId] = useState();

  async function getProducts() {
    const brand = JSON.parse(localStorage.getItem("brandProducts"));

    try {
      setBrandName(brand.name);
      setBrandId(brand.id);

      const response = await fetch(`http://tiendapp.local/api/productsApi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ id: brand }]),
      });
      if (response.ok) {
        const responseData = await response.json();
        setProducts(responseData);
      } else {
        alert("Failed to delete product. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  }

  const handleCreateProductClick = (brandId) => {
    localStorage.setItem("brandId", JSON.stringify(brandId));
    window.location.href = "product/create";
  };

  const handleDetailsClick = (product) => {
    localStorage.setItem("editProduct", JSON.stringify(product));
    window.location.href = "product/show";
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://tiendapp.local/api/deleteProduct`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ id: id, brand_id: brandId }]),
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
        alert("Product deleted successfully.");
      } else {
        alert("Failed to delete product. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  const handleReturnToBrand = () => {
    window.location.href = "/tiendapp/brand";
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Products of {brandName} brand</h1>
      <a
        className="btn btn-create create_products"
        onClick={() => handleCreateProductClick(brandId)}
      >
        Create Product
      </a>
      <a
        style={{ marginBottom: "1rem" }}
        className="btn btn-create create_products"
        onClick={handleReturnToBrand}
      >
        Return to brands
      </a>
      <table style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Size</th>
            <th>Inventory Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={"product_" + product.id}>
              <td>{product.product_name}</td>
              <td>{product.size}</td>
              <td>{product.inventory_quantity}</td>
              <td>
                <button
                  style={{ marginRight: "1rem" }}
                  onClick={() => handleDetailsClick(product)}
                >
                  Details
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
