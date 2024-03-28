import firebase from "./firebase";

const db = firebase.collection("/useproducts");

class OrderService {
  getAll() {
    return db.get();
  }

  getById(id) {
    return db.doc(id).get();
  }

  create(order) {
    return db.add(order);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }

  // New method to update an order
  updateOrder(id, order) {
    // Remove the ID from the order object as it's already provided separately
    const { id: orderId, ...orderData } = order;
    return db.doc(id).update(orderData);
  }
}

export default new OrderService();
