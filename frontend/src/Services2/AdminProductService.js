import firebase from "./firebase";

const db = firebase.collection("/products");

class AdminProductService {
  getAll() {
    return db.get();
  }

  create(product) {
    return db.add(product);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }

  // Add the get method to retrieve a single product by ID
  get(id) {
    return db.doc(id).get();
  }
}

export default new AdminProductService();
