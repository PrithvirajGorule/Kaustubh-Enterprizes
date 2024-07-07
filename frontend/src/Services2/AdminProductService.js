import firebase from "./firebase";

const productsDb = firebase.collection("/products");
const categoriesDb = firebase.collection("/categories");
const subcategoriesDb = firebase.collection("/subcategories");

class AdminProductService {
  // Product methods
  getAllProducts() {
    return productsDb.get();
  }

  createProduct(product) {
    return productsDb.add(product);
  }

  updateProduct(id, product) {
    const { id: productId, ...productData } = product;
    return productsDb.doc(id).set(productData, { merge: true });
  }

  deleteProduct(id) {
    return productsDb.doc(id).delete();
  }

  getProduct(id) {
    return productsDb.doc(id).get();
  }

  // Category methods
  getAllCategories() {
    return categoriesDb.get();
  }

  createCategory(category) {
    return categoriesDb.add(category);
  }

  updateCategory(id, category) {
    const { id: categoryId, ...categoryData } = category;
    return categoriesDb.doc(id).set(categoryData, { merge: true });
  }

  deleteCategory(id) {
    return categoriesDb.doc(id).delete();
  }

  getCategory(id) {
    return categoriesDb.doc(id).get();
  }

  // Subcategory methods
  getAllSubcategories() {
    return subcategoriesDb.get();
  }

  createSubcategory(subcategory) {
    return subcategoriesDb.add(subcategory);
  }

  updateSubcategory(id, subcategory) {
    const { id: subcategoryId, ...subcategoryData } = subcategory;
    return subcategoriesDb.doc(id).set(subcategoryData, { merge: true });
  }

  deleteSubcategory(id) {
    return subcategoriesDb.doc(id).delete();
  }

  getSubcategory(id) {
    return subcategoriesDb.doc(id).get();
  }

  getSubcategoriesByCategory(categoryId) {
    console.log(subcategoriesDb.where("category", "==", categoryId).get());
    return subcategoriesDb.where("category", "==", categoryId).get();
  }
}

export default new AdminProductService();
