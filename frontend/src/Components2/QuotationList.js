import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import orderService from '../Services2/order.service';
import Jumbotron from '../Components/Jumbotron';
import './../CSS/QuotationList.css';

function QuotationList() {
  const [ordersWithCheckMark, setOrdersWithCheckMark] = useState([]);
  const [ordersWithoutCheckMark, setOrdersWithoutCheckMark] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await orderService.getAll();
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrdersWithCheckMark(data.filter(order => order.checkMark));
      setOrdersWithoutCheckMark(data.filter(order => !order.checkMark));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckMarkClick = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to mark this order?");
    if (confirmed) {
      try {
        await orderService.update(orderId, { checkMark: true });
        fetchData();
      } catch (error) {
        console.error('Error updating check mark status:', error);
      }
    }
  };

  const handleUncheckMarkClick = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to uncheck this order?");
    if (confirmed) {
      try {
        await orderService.update(orderId, { checkMark: false });
        fetchData();
      } catch (error) {
        console.error('Error updating check mark status:', error);
      }
    }
  };

  const handleDeleteClick = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      try {
        await orderService.delete(orderId);
        fetchData();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  return (
    <div className="quotation-list-container">
      <Jumbotron />
      
      <h2>With Check Mark</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordersWithCheckMark.map(order => (
            <tr key={order.id}>
              <td><Link to={`/orders/${order.id}`}>{order.id}</Link></td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>
                <button className="check-btn" onClick={() => handleUncheckMarkClick(order.id)}>Uncheck</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Without Check Mark</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordersWithoutCheckMark.map(order => (
            <tr key={order.id}>
              <td><Link to={`/orders/${order.id}`}>{order.id}</Link></td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>
                <button className="uncheck-btn" onClick={() => handleCheckMarkClick(order.id)}>Check</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuotationList;
