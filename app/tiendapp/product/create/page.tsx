"use client";
import { useState } from "react";

export default function CreateProductPage() {
  const [product_name, setName] = useState("");
  const [size, setSize] = useState("");
  const [inventory_quantity, setInventoryQuantity] = useState("");
  const [shipment_date, setDate] = useState("");
  const [observations, setObservations] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const brand = JSON.parse(localStorage.getItem("brandId"));
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      if (shipment_date > currentDate) {
        alert("Shipment date must be less than or equal to the current date.");
        return;
      }

      const response = await fetch("http://tiendapp.local/api/storeProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            brand_id: brand,
            product_name: product_name,
            size: size,
            inventory_quantity: inventory_quantity,
            shipment_date: shipment_date,
            observations: observations,
          },
        ]),
      });
      if (response.ok) {
        alert("Product created successfully");
        window.location.href = "/tiendapp/product";
      } else {
        alert("Failed to create product. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ margin: "1rem" }}>
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={product_name}
            onChange={(event) => setName(event.target.value)}
            maxLength={30}
            required
          />
        </div>
        <div>
          <label>Size:</label>
          <select
            name="size"
            value={size}
            onChange={(event) => setSize(event.target.value)}
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
            value={inventory_quantity}
            onChange={(event) => setInventoryQuantity(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Shipment Date:</label>
          <input
            type="date"
            name="shipment_date"
            value={shipment_date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Observations:</label>
          <textarea
            name="observations"
            value={observations}
            onChange={(event) => setObservations(event.target.value)}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
