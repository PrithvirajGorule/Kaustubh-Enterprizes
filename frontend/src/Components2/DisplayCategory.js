import React, { useState, useEffect } from "react";
import AdminProductService from "../Services2/AdminProductService";
import "./../CSS/Mainpage.css";
import { Link } from "react-router-dom";

function MainPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await AdminProductService.getAllCategories();
        const categoriesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="main-page">
      <h2>Main Categories</h2>
      <div className="categories-list">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/subcategories/${category.id}`}
            className="category-card"
          >
            <img src={category.image} alt={category.name} />
            <div className="category-card-content">
              <h3>{category.name}</h3>
              <p>Description: {category.description}</p>
              <p>Density: {category.density}</p>
              <Link
                to={`/subcategories/${category.id}`}
                className="view-subcategories-btn"
              >
                View Subcategories
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
