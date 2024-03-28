import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import orderService from '../Services2/order.service';

function ProductList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await orderService.getAll();
        console.log('querySnapshot:', querySnapshot); // Log the value of querySnapshot
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <div>
      <h1>Orders List</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <Link to={`/orders/${order.id}`}>
              Order ID: {order.id}, Name: {order.name}, Email: {order.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
