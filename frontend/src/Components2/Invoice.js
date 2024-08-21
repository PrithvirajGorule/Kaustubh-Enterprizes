import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import orderService from "../Services2/order.service";
import "./../CSS/Invoice.css";
import { faAlignRight } from "@fortawesome/free-solid-svg-icons";

export const roundToTwoDecimalPlaces = (value) => {
  return Number(parseFloat(value).toFixed(2));
};

export const calculateQuantity = (product) => {
  // const { height, width, length, density, noofsheets } = product;
  // const volume = parseFloat(height) * parseFloat(width) * parseFloat(length); // Calculate volume in mm³
  // const metalDensity = parseFloat(density) || 1; // Default density to 1 if not provided
  // const quantity = volume * metalDensity * parseInt(noofsheets) / 1000000; // Convert volume from mm³ to m³ (density in g/cm³)

  const { height, width, length, density, noofsheets } = product;

  const volume = (height * width * length) ; // Convert mm^3 to cm^3
  const metalDensity = density ? parseFloat(density): 1; // Convert g/cm^3 to kg/mm^3 or default to 1 kg/mm^3
  const totalVolume = volume * noofsheets;
  const quantity = totalVolume * metalDensity;
  // return roundToTwoDecimalPlaces(quantity); // Round off to two decimal places
  return quantity.toFixed(4);
};

export const calculateTotalAmount = (products, loadingPackingCharge) => {
  const subtotal = products.reduce((total, product) => {
    const amount = product.price * calculateQuantity(product);
    return total + amount;
  }, 0);

  const gstRate = 0.09; // GST rate of 9%

  const cgst = roundToTwoDecimalPlaces(subtotal * gstRate);
  const sgst = roundToTwoDecimalPlaces(subtotal * gstRate);
  const total = roundToTwoDecimalPlaces(subtotal + cgst + sgst + loadingPackingCharge);

  return {
    subtotal: roundToTwoDecimalPlaces(subtotal),
    cgst,
    sgst,
    total,
  };
};

export const convertToWords = (amount) => {
  // Function to convert amount to words (same as before)
};

export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

function Invoice() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderSnapshot = await orderService.getById(id);
        if (orderSnapshot.exists) {
          const orderData = orderSnapshot.data();
          console.log(orderData);
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

  const sendInvoice = async () => {
    const invoiceDetails = calculateTotalAmount(order.products, loadingPackingCharge);
    const invoiceData = {
      id: order.id,
      date: formatDate(new Date()),
      name: order.name,
      contact: order.contact,
      products: order.products.map((product, index) => ({
        category: product.category,
        subcategory: product.subcategory,
        height: product.height,
        width: product.width,
        length: product.length,
        noofsheets: product.noofsheets,
        quantity: calculateQuantity(product),
        price: product.price,
        amount: roundToTwoDecimalPlaces(product.price * calculateQuantity(product)),
      })),
      loadingPackingCharge,
      cgst: invoiceDetails.cgst,
      sgst: invoiceDetails.sgst,
      totalPrize: invoiceDetails.total,
      totalInWords: convertToWords(invoiceDetails.total),
    };

    const response = await fetch('https://kaustubh-enterprizes.onrender.com/send-invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: order.email,
        subject: 'Your Invoice',
        text: 'Please find your invoice attached.',
        order: invoiceData
      }),
    });

    if (!response.ok) {
      console.error('Failed to send email');
    } else {
      console.log('Email sent successfully');
      alert('Email sent successfully')
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  const { products } = order;
  const loadingPackingCharge = localStorage.getItem('loadingPackingCharges') || 0;; // Example loading and packing charges
  const invoiceDetails = calculateTotalAmount(products, loadingPackingCharge);

  return (
    <div className="invoice-container">
      <div className="invoiceheader">
        <h1 className="invoiceHead">PROFORMA INVOICE</h1>
        <h3 className="invoiceHead">TAX INVOICE</h3>
        {/* <img src={logo} alt="Company Logo" className="invoicelogo" /> */}
      </div>
      <div className="quotation-info">
        <div>
          <p><strong>M/s.Kaustubh Enterprises</strong></p>
          <p>W-265, Near Sanket Hotel, MIDC. BHOSARI, PUNE-411026</p>
          <p>Ph No: 9325006428</p>
          <p>GSTIN/UIN: 27AGNPM0213C1ZV</p>
          <p>State Name: Maharashtra, Code: 27</p>
          <p>Email: kishor.marudwar@gmail.com</p>
        </div>
        <div>
          <p><strong>Consignee (Ship to)</strong></p>
          <p>{order.name}</p>
          <p>State Name: Maharashtra, Code: 27</p>
          <p><strong>Buyer (Bill to)</strong></p>
          <p>{order.name}</p>
          <p>State Name: Maharashtra, Code: 27</p>
        </div>
      </div>
      <div className="invoice-details">
        <div>
          <p><strong>Invoice Id:</strong> {order.id}</p>
          <p><strong>Dated:</strong> {formatDate(new Date())}</p>
        </div>
        <div>
          <p><strong>Delivery Note:</strong></p>
          <p><strong>Dispatched through:</strong></p>
          <p><strong>Destination:</strong></p>
          <p><strong>Terms of Delivery:</strong></p>
        </div>
      </div>
      <h3>Products:</h3>
      <table className="invoice-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Description of Goods</th>
            <th style={{ textAlign: 'center' }}>HSN/SAC</th>
            <th style={{ textAlign: 'center' }}>Quantity (KGS)</th>
            <th style={{ textAlign: 'center' }}>Rate</th>
            <th style={{ textAlign: 'center' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.subcategory}</td>
              <td>720852</td>
              <td  style={{ textAlign: 'right' }}>{calculateQuantity(product)} KGS</td>
              <td style={{ textAlign: 'right' }}>{roundToTwoDecimalPlaces(product.price)}</td>
              <td style={{ textAlign: 'right' }}>{roundToTwoDecimalPlaces(product.price * calculateQuantity(product))}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">Loading & Packing Charges</td>
            <td>Rs {loadingPackingCharge}</td>
          </tr>
          <tr>
            <td colSpan="5">OUTPUT-CGST 9%</td>
            <td>Rs {invoiceDetails.cgst}</td>
          </tr>
          <tr>
            <td colSpan="5">OUTPUT-SGST 9%</td>
            <td>Rs {invoiceDetails.sgst}</td>
          </tr>
          <tr>
            <td colSpan="5">Rounded Off</td>
            <td>-0.46</td>
          </tr>
          <tr>
            <td colSpan="5"><strong>Total</strong></td>
            <td><strong>Rs {invoiceDetails.total}</strong></td>
          </tr>
        </tfoot>
      </table>
      <div className="totals">
        <p><strong>Amount Chargeable (in words):</strong> {convertToWords(invoiceDetails.total)}</p>
      </div>
      <div className="invoicefooter">
        <p><strong>Terms & Conditions:</strong> E. & O.E</p>
        <p><strong>Company’s PAN:</strong> AGNPM0213C</p>
        <p><strong>Declaration:</strong> We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
      </div>
      <div className="bank-details">
        <p><strong>Company’s Bank Details</strong></p>
        <p><strong>A/c Holder’s Name:</strong> M/s.Kaustubh Enterprises</p>
        <p><strong>Bank Name:</strong> BANK ICICI A/C:- 777705932500</p>
        <p><strong>A/c No:</strong> 777705932500</p>
        <p><strong>Branch & IFS Code:</strong> CHINCHWAD & ICIC0000321</p>
      </div>
      <div className="button-container">
        <button onClick={handlePrint}>Print</button>
        <button onClick={sendInvoice}>Send</button>
        <Link to={`/orders/${id}`}>Back to Order Detail</Link>
      </div>
    </div>
  );
}

export default Invoice;
