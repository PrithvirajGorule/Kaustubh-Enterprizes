// Invoice.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import orderService from "../Services2/order.service";
import { Link } from 'react-router-dom';
import "./Invoice.css"; // Import CSS file for styling

function Invoice() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderSnapshot = await orderService.getById(id);
        if (orderSnapshot.exists) {
          const orderData = orderSnapshot.data();
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
  const handlePrint = () => {
    window.print();
  };
  if (!order) {
    return <div>Loading...</div>;
  }

   // Helper function to round to two decimal places
   const roundToTwoDecimalPlaces = (value) => {
    return Number.parseFloat(value).toFixed(2);
  };

  // Calculate CGST and SGST rounded to two decimal places
  const cgst = roundToTwoDecimalPlaces(calculateTax(order.products, 0.09));
  const sgst = roundToTwoDecimalPlaces(calculateTax(order.products, 0.09));

  // Calculate total amount rounded to two decimal places
  const subtotal = roundToTwoDecimalPlaces(calculateSubtotal(order.products));
  const total = roundToTwoDecimalPlaces(parseFloat(subtotal) + parseFloat(cgst) + parseFloat(sgst));

  // Convert total amount to words
  const totalInWords = convertToWords(total);

  return (
    <div className="invoice-container">
      <div className="header">
        <img src="https://media.licdn.com/dms/image/C560BAQFQdCGK8os3jg/company-logo_200_200/0/1630644964827?e=1719446400&v=beta&t=iDdGbN_WJKVF3Nssfq-6EcWaD3PT-6TOuOSlFD1cfvA" alt="Company Logo" className="logo" />
        <div className="quotation-info">
          <p>Quotation By: Your Name</p>
          <p>Quotation To: {order.name}</p>
          <p>Invoice Date: {formatDate(new Date())}</p>
          <p>Country of Supply: India</p>
          <p>Place of Supply: Pune</p>
        </div>
      </div>
      <h2>Invoice</h2>
      <p>ID: {order.id}</p>
      <p>Email: {order.email}</p>
      <p>Contact: {order.contact}</p>
      <h3>Products:</h3>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>${product.price * product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totals">
        <p>Subtotal: ${subtotal}</p>
        <p>CGST (9%): ${cgst}</p>
        <p>SGST (9%): ${sgst}</p>
        <p>Total: ${total}</p>
        <p>Total in Words: {totalInWords}</p>
      </div>
      <div className="footer">
        <p>Terms & Conditions:</p>
        <p>Additional Notes:</p>
        <p>For any queries, email us at: example@example.com</p>
        <p>Or call us at: 123-456-7890</p>
      </div>
      <button onClick={handlePrint}>Print</button>
      <button onClick={sendInvoice}>Send</button>
      <Link to={`/orders/${id}`}>Back to Order Detail</Link>
    </div>
  );
}

// Helper function to calculate tax
const calculateTax = (products, taxRate) => {
  return products.reduce((totalTax, product) => {
    return totalTax + (product.price * product.quantity * taxRate);
  }, 0);
}

// Helper function to calculate subtotal
const calculateSubtotal = (products) => {
  return products.reduce((total, product) => total + (product.price * product.quantity), 0);
}

// Helper function to convert amount to words
const convertToWords = (amount) => {
    // Array of words for numbers from 0 to 19
    const ones = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
      "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];

    // Array of words for multiples of 10 from 20 to 90
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    // Array of words for powers of 10 (e.g., thousand, million, billion)
    const scales = ["", "thousand", "million", "billion"];

    // Function to convert a three-digit number to words
    const convertThreeDigits = (num) => {
      let words = "";
      if (num >= 100) {
        words += ones[Math.floor(num / 100)] + " hundred ";
        num %= 100;
      }
      if (num >= 20) {
        words += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      }
      if (num > 0) {
        words += ones[num] + " ";
      }
      return words.trim();
    };

    // Function to convert the whole number to words
    const convertWholeNumber = (num) => {
      let words = "";
      let scaleIndex = 0;
      while (num > 0) {
        if (num % 1000 !== 0) {
          let part = convertThreeDigits(num % 1000);
          if (scaleIndex > 0) {
            part += " " + scales[scaleIndex];
          }
          words = part + " " + words;
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
      }
      return words.trim();
    };

    // Separate whole and decimal parts
    const [wholePart, decimalPart] = amount.toString().split(".");

    // Convert the whole part to words
    let words = convertWholeNumber(parseInt(wholePart));

    // Add "and" for the decimal part if it exists
    if (decimalPart!=0) {
      words += " and " + convertThreeDigits(parseInt(decimalPart));
    }

    return words+" only ".trim();
  };


// Helper function to format date
const formatDate = (date) => {
  // Implementation of date formatting
  return date.toISOString().split('T')[0]; // Placeholder implementation
}

// Temporary function placeholders
const printInvoice = () => {
  console.log("Printing invoice...");
}

const sendInvoice = () => {
  console.log("Sending invoice...");
}

export default Invoice;
