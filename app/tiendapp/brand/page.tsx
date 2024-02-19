"use client";

import { useState, useEffect } from "react";

export default function BrandsPage({}) {
  const [brands, setBrands] = useState([]);
  const getBrandsUrl = "http://tiendapp.local/api/brandsApi";

  async function getBrands() {
    const response = await fetch(getBrandsUrl);
    const responseData = await response.json();
    setBrands(responseData);
  }

  const handleEditClick = (brand) => {
    localStorage.setItem("editBrand", JSON.stringify(brand));
    window.location.href = "/tiendapp/brand/edit";
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://tiendapp.local/api/deleteBrand`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ id: id }]),
      });

      if (response.ok) {
        setBrands(brands.filter((brand) => brand.id !== id));
        alert("Brand deleted successfully.");
      } else {
        alert("Failed to delete brand. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  const handleProductClick = (brand) => {
    localStorage.setItem("brandProducts", JSON.stringify(brand));
    window.location.href = "/tiendapp/product";
  };
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Brands</h1>
      <a className="btn btn-create create_products" href={`brand/create`}>
        Create Brand
      </a>
      <table style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={"brand_" + brand.id}>
              <td>{brand.name}</td>
              <td>
                <a
                  className="btn btn-create create_products"
                  onClick={() => handleProductClick(brand)}
                >
                  Products
                </a>
                <button
                  style={{ marginRight: "1rem" }}
                  onClick={() => handleEditClick(brand)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteClick(brand.id)}
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
