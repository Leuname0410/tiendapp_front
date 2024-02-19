"use client";
import { useState, useEffect } from "react";

export default function EditProductPage() {
  const [product, setProduct] = useState({
    brand_id: "",
    product_name: "",
    size: "",
    inventory_quantity: "",
    shipment_date: "",
    observations: "",
  });

  useEffect(() => {
    const editProduct = JSON.parse(localStorage.getItem("editProduct"));
    setProduct(editProduct);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(product);

      const response = await fetch(`http://tiendapp.local/api/editProduct`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product updated successfully");
        window.location.href = "/tiendapp/product";
      } else {
        alert("Failed to update product. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ margin: "1rem" }}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            maxLength={30}
            required
          />
        </div>
        <div>
          <select
            name="size"
            value={product.size}
            onChange={handleChange}
            required
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>
        <div>
          <label>Inventory Quantity:</label>
          <input
            type="number"
            name="inventory_quantity"
            value={product.inventory_quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Shipment Date:</label>
          <input
            type="date"
            name="shipment_date"
            value={product.shipment_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Observations:</label>
          <textarea
            name="observations"
            value={product.observations}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
