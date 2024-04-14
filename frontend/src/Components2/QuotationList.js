import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import orderService from '../Services2/order.service';
import'./../CSS/QuotationList.css';
import Jumbotron from '../Components/Jumbotron';

function QuotationList() {
  const [ordersWithCheckMark, setOrdersWithCheckMark] = useState([]);
  const [ordersWithoutCheckMark, setOrdersWithoutCheckMark] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await orderService.getAll();
      console.log('querySnapshot:', querySnapshot); // Log the value of querySnapshot
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
        // Update the check mark status in the database
        await orderService.update(orderId, { checkMark: true });
    
        // Refetch data to update the tables
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
        // Update the check mark status in the database
        await orderService.update(orderId, { checkMark: false });
    
        // Refetch data to update the tables
        fetchData();
      } catch (error) {
        console.error('Error updating check mark status:', error);
      }
    }
  };
  
  
  return (
  
    <div>
        <Jumbotron></Jumbotron>
      
      <h2>With Check Mark</h2>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Check Mark</th>
          </tr>
        </thead>
        <tbody>
          {ordersWithCheckMark.map(order => (
            <tr key={order.id}>
              <td><Link to={`/orders/${order.id}`}>{order.id}</Link></td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>✓</td>
              <button onClick={() => handleUncheckMarkClick(order.id)}>Uncheck</button>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <h2>Without Check Mark</h2>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Check Mark</th>
          </tr>
        </thead>
        <tbody>
          {ordersWithoutCheckMark.map(order => (
            <tr key={order.id}>
              <td><Link to={`/orders/${order.id}`}>{order.id}</Link></td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>
                <button onClick={() => handleCheckMarkClick(order.id)}>Check</button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuotationList;
