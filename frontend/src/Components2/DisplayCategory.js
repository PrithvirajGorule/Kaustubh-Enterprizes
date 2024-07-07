import React, { useState, useEffect } from "react";
import AdminProductService from "../Services2/AdminProductService";
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
    <div>
      <h2>Main Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h3>{category.name}</h3>
            <p>Description: {category.description}</p>
            <p>Density: {category.density}</p>
            <img src={category.image} alt={category.name} />
            <a href={`/subcategories/${category.id}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
