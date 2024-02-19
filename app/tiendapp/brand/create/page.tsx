"use client";
import { useState } from "react";

export default function CreateBrand() {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://tiendapp.local/api/storeBrand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ name: name }]),
      });

      if (response.ok) {
        window.location.href = "/tiendapp/brand";
      } else {
        alert("Failed to create brand. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h1>Create New Brand</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brandName">Brand Name:</label>
          <input
            id="brandName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="form-control"
            maxLength={50}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Brand
        </button>
      </form>
    </div>
  );
}
