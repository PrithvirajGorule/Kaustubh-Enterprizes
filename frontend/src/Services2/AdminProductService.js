import firebase from "./firebase";

const db = firebase.collection("/products");

class AdminProductService {
  getAll() {
    return db.get();
  }

  create(product) {
    return db.add(product);
  }

  // update(id, value) {
  //   return db.doc(id).update(value);
  // }

  update(id, order) {
    // Remove the ID from the order object as it's already provided separately
    const { id: orderId, ...orderData } = order;
    return db.doc(id).set(orderData, { merge: true });
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
