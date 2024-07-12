const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kaustubhdevlopershere@gmail.com',
    pass: 'zhhh uhot uphb mpbn'
  }
});

const generatePDF = (order, callback) => {
  const doc = new PDFDocument();
  const fileName = `invoice-${order.id}.pdf`;
  const filePath = `./${fileName}`;
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  // Add PDF content
  doc.fontSize(25).text('Invoice', { align: 'center' });
  doc.fontSize(12).text(`Invoice ID: ${order.id}`, { align: 'left' });
  doc.text(`Name: ${order.name}`, { align: 'left' });
  doc.text(`Contact: ${order.contact}`, { align: 'left' });
  doc.text(`Total Prize: ${order.totalPrize}`, { align: 'left' });
  doc.text('Products:', { align: 'left' });
  order.products.forEach((product, index) => {
    doc.text(`Product ${index + 1}`, { align: 'left' });
    doc.text(`Category: ${product.category}`, { align: 'left' });
    doc.text(`Subcategory: ${product.subcategory}`, { align: 'left' });
    doc.text(`Height: ${product.height} mm`, { align: 'left' });
    doc.text(`Width: ${product.width} mm`, { align: 'left' });
    doc.text(`Length: ${product.length} mm`, { align: 'left' });
    doc.text(`Number of Sheets: ${product.noofsheets}`, { align: 'left' });
    doc.text(' ', { align: 'left' }); // Add some space between products
  });

  doc.end();

  stream.on('finish', () => {
    callback(filePath);
  });
};

app.post('/send-notification', (req, res) => {
  const { email, quotationId, details } = req.body;

  const mailOptions = {
    from: 'kaustubhdevlopershere@gmail.com',
    to: email,
    subject: 'New Quotation Request',
    html: `
      <h2>New Quotation Request</h2>
      <p>Dear Customer,</p>
      <p>Thank you for your quotation request. Here are the details:</p>
      <p>Name: ${details.name}</p>
      <p>Contact: ${details.contact}</p>
      <p>Total Prize: ${details.totalPrize}</p>
      <h3>Products:</h3>
      ${details.products.map((product, index) => `
        <div>
          <h4>Product ${index + 1}</h4>
          <p>Category: ${product.category}</p>
          <p>Subcategory: ${product.subcategory}</p>
          <p>Height: ${product.height} mm</p>
          <p>Width: ${product.width} mm</p>
          <p>Length: ${product.length} mm</p>
          <p>Number of Sheets: ${product.noofsheets}</p>
        </div>
      `).join('')}
      <p><a href="http://your-website.com/quotation/${quotationId}">Click here</a> to view your quotation.</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Notification email sent successfully');
  });
});

app.post('/send-email', (req, res) => {
  const { to, subject, text, order } = req.body;

  generatePDF(order, (filePath) => {
    const mailOptions = {
      from: 'kaustubhdevlopershere@gmail.com',
      to,
      subject,
      text,
      attachments: [
        {
          filename: `invoice-${order.id}.pdf`,
          path: filePath
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });

      if (error) {
        return res.status(500).send(error.toString());
      }
      res.send('Email sent: ' + info.response);
      console.log(info.response);
    });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
