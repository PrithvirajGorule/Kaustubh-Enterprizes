import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import orderService from "../Services2/order.service";
import { Link } from 'react-router-dom';
import './../CSS/OrderDetail.css';
function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [editedPrices, setEditedPrices] = useState({});
  const [loadingPackingCharges, setLoadingPackingCharges] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

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

  const handleLoadingPackingChargesChange = (e) => {
    const value = parseFloat(e.target.value);
    setLoadingPackingCharges(value);
  };

  const calculateQuantity = (product) => {
    const { height, width, length, density, noofsheets } = product;

    const volume = (height * width * length) / 1000; // Convert mm^3 to cm^3
    const metalDensity = density ? parseFloat(density) / 1000 : 1; // Convert g/cm^3 to kg/mm^3 or default to 1 kg/mm^3
    const totalVolume = volume * noofsheets;
    const quantityInKg = totalVolume * metalDensity;
    return quantityInKg;
  };

  const calculateTotalAmount = () => {
    let total = 0;
    if (order) {
      order.products.forEach((product, index) => {
        const { price } = product;
        const pricePerKg = editedPrices[index] !== undefined ? parseFloat(editedPrices[index]) : parseFloat(price);
        const quantityInKg = calculateQuantity(product);
        const amount = quantityInKg * pricePerKg;
        total += amount;
      });
      total += loadingPackingCharges;
    }
    setTotalAmount(total);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedOrder = {
        ...order,
        products: order.products.map((product, index) => ({
          ...product,
          price: editedPrices[index] !== undefined ? parseFloat(editedPrices[index]) : parseFloat(product.price),
        })),
        loadingPackingCharges: loadingPackingCharges,
        totalAmount: totalAmount,
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

  useEffect(() => {
    calculateTotalAmount();
  }, [order, editedPrices, loadingPackingCharges]);

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
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <div>
        <label htmlFor="loadingPackingCharges">Loading/Packing Charges:</label>
        <input
          type="number"
          id="loadingPackingCharges"
          value={loadingPackingCharges}
          onChange={handleLoadingPackingChargesChange}
        />
      </div>
      <h3>Products:</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size (mm)</th>
            <th>Quantity (Kg)</th>
            <th>Rate (Price per Kg)</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={index}>
              <td>{product.subcategory}</td>
              <td>{product.height} x {product.width} x {product.length}</td>
              <td>{calculateQuantity(product).toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  value={editedPrices[index] !== undefined ? editedPrices[index] : product.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
              </td>
              <td>${(calculateQuantity(product) * (editedPrices[index] || product.price)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSaveChanges}>Save Changes</button>
      <Link to={`/invoice/${id}`}>
        Generate Invoice
      </Link>
    </div>
  );
}

export default OrderDetail;
