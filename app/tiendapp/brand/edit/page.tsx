"use client";
import { useState, useEffect } from "react";

export default function EditBrand() {
  const [brand, setBrand] = useState({ name: "" });

  useEffect(() => {
    // Obtener los datos del brand del almacenamiento local del navegador al cargar la página
    const editBrand = JSON.parse(localStorage.getItem("editBrand"));
    setBrand(editBrand);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let id = brand.id;
      let name = brand.name;
      const response = await fetch("http://tiendapp.local/api/editBrand", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ id: id, name: name }]),
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBrand((prevBrand) => ({
      ...prevBrand,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1>Edit Brand</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brandName">Brand Name:</label>
          <input
            id="brandName"
            type="text"
            name="name"
            value={brand.name}
            onChange={handleChange}
            className="form-control"
            required
          />
          <input hidden name="id" id="brandId" />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Brand
        </button>
      </form>
    </div>
  );
}
