const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");


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


// Configure multer for file upload
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Middleware to parse JSON (if needed)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle file and form data
app.post('/send-invoice', upload.single('invoice'), (req, res) => {
  // Check if required fields are present
  // if (!req.file || !req.body.recipientEmail) {
  //   return res.status(400).json({ error: 'Missing required fields' });
  // }

  // Log received data for debugging
  console.log('Received file:', req.file.originalname);
  console.log('Recipient email:', req.body.recipientEmail);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kaustubhdevlopershere@gmail.com",
        pass: "zhhh uhot uphb mpbn",
      },
    });

    const mailOptions = {
      from: "kaustubhdevlopershere@gmail.com",
      to: req.body.recipientEmail, // Use recipient email from frontend
      subject: "Your Invoice",
      text: "Please find your invoice attached.",
      attachments: [
        {
          filename: "invoice.pdf",
          content: req.file.buffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Failed to send email");
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).send("Email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send("Internal Server Error");
  }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running on port 3001");
});
