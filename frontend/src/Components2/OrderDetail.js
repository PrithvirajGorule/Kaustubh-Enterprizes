import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import orderService from "../Services2/order.service";
import { Link } from 'react-router-dom';
function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [editedPrices, setEditedPrices] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderSnapshot = await orderService.getById(id);
        if (orderSnapshot.exists) {
          const orderData = orderSnapshot.data();
          const initialEditedPrices = {};
          orderData.products.forEach((product, index) => {
            initialEditedPrices[index] = product.price;
          });
          setEditedPrices(initialEditedPrices);
          setOrder({ id: orderSnapshot.id, ...orderData });
        } else {
          console.log("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  const handlePriceChange = (index, newValue) => {
    if (!isNaN(newValue)) {
      setEditedPrices((prevState) => ({
        ...prevState,
        [index]: parseFloat(newValue),
      }));
    } else {
      console.error("Invalid price value:", newValue);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedOrder = {
        ...order,
        products: order.products.map((product, index) => ({
          ...product,
          price: editedPrices[index] !== undefined ? editedPrices[index] : product.price,
        })),
      };

      await orderService.updateOrder(id, updatedOrder);

      setEditedPrices({}); // Clear editedPrices after saving changes

      // Refetch the order after changes are saved
      const updatedOrderSnapshot = await orderService.getById(id);
      if (updatedOrderSnapshot.exists) {
        const updatedOrderData = updatedOrderSnapshot.data();
        setOrder({ id: updatedOrderSnapshot.id, ...updatedOrderData });
      } else {
        console.log("Order not found after update");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Calculate total price based on edited prices
  let totalPrice = 0;
  if (order) {
    totalPrice = order.products.reduce((acc, product, index) => {
      const editedPrice = editedPrices[index] !== undefined ? editedPrices[index] : product.price;
      return acc + editedPrice * product.quantity;
    }, 0);
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Detail</h2>
      <p>ID: {order.id}</p>
      <p>Name: {order.name}</p>
      <p>Email: {order.email}</p>
      <p>Contact: {order.contact}</p>
      <p>Total Price: ${totalPrice}</p>
      <h3>Products:</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Edit Price</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <input
                  type="number"
                  value={editedPrices[index] !== undefined ? editedPrices[index] : product.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSaveChanges}>Save Changes</button>
      <Link to={`/invoice/${id}`}>
              invoice
            </Link>
    </div>
  );
}

export default OrderDetail;
