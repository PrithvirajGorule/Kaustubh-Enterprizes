import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminProductService from '../Services2/AdminProductService';
function SubcategoryPage() {
  const { categoryId } = useParams(); // Extract categoryId from URL params
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const snapshot = await AdminProductService.getSubcategoriesByCategory(categoryId);
        const subcategoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubcategories(subcategoriesData);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  return (
    <div>
      <h2>Subcategories for Category</h2>
      <ul>
        {subcategories.map(subcategory => (
          <li key={subcategory.id}>
            <div>
              <h3>{subcategory.name}</h3>
              <p>{subcategory.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubcategoryPage;
