const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kaustubhdevlopershere@gmail.com",
    pass: "zhhh uhot uphb mpbn",
  },
});

const generatePDF = (order, callback) => {
  const doc = new PDFDocument();
  const fileName = `invoice-${order.id}.pdf`;
  const filePath = `./${fileName}`;
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  // Add PDF content
  doc.fontSize(25).text("Invoice", { align: "center" });
  doc.fontSize(12).text(`Invoice ID: ${order.id}`, { align: "left" });
  doc.text(`Name: ${order.name}`, { align: "left" });
  doc.text(`Contact: ${order.contact}`, { align: "left" });
  doc.text(`Total Prize: ${order.totalPrize}`, { align: "left" });
  doc.text("Products:", { align: "left" });
  order.products.forEach((product, index) => {
    doc.text(`Product ${index + 1}`, { align: "left" });
    doc.text(`Category: ${product.category}`, { align: "left" });
    doc.text(`Subcategory: ${product.subcategory}`, { align: "left" });
    doc.text(`Height: ${product.height} mm`, { align: "left" });
    doc.text(`Width: ${product.width} mm`, { align: "left" });
    doc.text(`Length: ${product.length} mm`, { align: "left" });
    doc.text(`Number of Sheets: ${product.noofsheets}`, { align: "left" });
    doc.text(" ", { align: "left" }); // Add some space between products
  });

  doc.end();

  stream.on("finish", () => {
    callback(filePath);
  });
};

app.post("/send-notification", (req, res) => {
  const { email, quotationId, details } = req.body;

  const mailOptions = {
    from: "kaustubhdevlopershere@gmail.com",
    to: `${email}, kaustubhdevlopershere@gmail.com`,
    subject: "New Quotation Request",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      background-color: #f4f4f4;
      padding: 10px;
      border-bottom: 2px solid #ddd;
      text-align: center;
    }
    .details, .products {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .details th, .details td, .products th, .products td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .details th, .products th {
      background-color: #f4f4f4;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
    }
    a.button {
      display: inline-block;
      padding: 10px 20px;
      color: #fff;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Quotation Request</h2>
    <p>Dear Customer,</p>
    <p>Thank you for your quotation request. Here are the details:</p>
    
    <table class="details">
      <tr>
        <th>Name</th>
        <td>${details.name}</td>
      </tr>
      <tr>
        <th>Contact</th>
        <td>${details.contact}</td>
      </tr>
      <tr>
        <th>Total Prize</th>
        <td>${details.totalPrize}</td>
      </tr>
    </table>
    
    <h3>Products:</h3>
    <table class="products">
      <tr>
        <th>Product</th>
        <th>Category</th>
        <th>Subcategory</th>
        <th>Height</th>
        <th>Width</th>
        <th>Length</th>
        <th>Number of Sheets</th>
      </tr>
      ${details.products
        .map(
          (product, index) => `
      <tr>
        <td>Product ${index + 1}</td>
        <td>${product.category}</td>
        <td>${product.subcategory}</td>
        <td>${product.height} mm</td>
        <td>${product.width} mm</td>
        <td>${product.length} mm</td>
        <td>${product.noofsheets}</td>
      </tr>
      `
        )
        .join("")}
    </table>
    
    <div class="footer">
      <p><a class="button" href="http://your-website.com/quotation/${quotationId}">Click here to view your quotation</a></p>
    </div>
  </div>
</body>
</html>

       `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Notification email sent successfully");
  });
});

app.post("/send-invoice", (req, res) => {
  const { to } = req.body;
  const mailOptions = {
    from: "kaustubhdevlopershere@gmail.com",
    to,
    subject: "Your Invoice",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .invoice-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #ccc;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .invoice-header h1 {
          font-size: 24px;
          color: #333;
          margin: 0;
        }
        .invoice-details {
          margin-bottom: 20px;
        }
        .invoice-details p {
          margin: 5px 0;
        }
        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .invoice-table th, .invoice-table td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        .invoice-table th {
          background-color: #f4f4f4;
        }
        .invoice-total {
          margin-top: 20px;
          font-size: 18px;
        }
        .invoice-total strong {
          font-size: 20px;
        }
        .invoice-footer {
          margin-top: 20px;
          text-align: center;
        }
        .invoice-footer p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="invoice-header">
          <h1>Invoice</h1>
          <p>Date: July 13, 2024</p>
        </div>
        <div class="invoice-details">
          <p><strong>Invoice ID:</strong> #123456</p>
          <p><strong>Billed To:</strong> John Doe</p>
          <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
        </div>
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product A</td>
              <td>2</td>
              <td>$50.00</td>
              <td>$100.00</td>
            </tr>
            <tr>
              <td>Product B</td>
              <td>1</td>
              <td>$75.00</td>
              <td>$75.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3"><strong>Subtotal:</strong></td>
              <td>$175.00</td>
            </tr>
            <tr>
              <td colspan="3"><strong>Tax (9% GST):</strong></td>
              <td>$15.75</td>
            </tr>
            <tr>
              <td colspan="3"><strong>Total:</strong></td>
              <td>$190.75</td>
            </tr>
          </tfoot>
        </table>
        <div class="invoice-total">
          <p><strong>Total Amount in Words:</strong> One Hundred Ninety Dollars and Seventy-Five Cents</p>
          <p><strong>Payment Due By:</strong> July 20, 2024</p>
        </div>
        <div class="invoice-footer">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Invoice sent successfully");
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
