import React, { Component } from "react";
import orderService from "../Services2/order.service";
import AdminProductService from "../Services2/AdminProductService";
import "./../CSS/SendOrder.css";
//hello
export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeNoOfSheets = this.onChangeNoOfSheets.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeWidth = this.onChangeWidth.bind(this);
    this.onChangeLength = this.onChangeLength.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      name: "",
      email: "",
      contact: "",
      products: [],
      productOptions: [],
      totalPrize: 0,
      submitted: false,
    };
  }

  componentDidMount() {
    // Fetch product options from AdminProductService
    AdminProductService.getAll().then((querySnapshot) => {
      const productOptions = [];
      querySnapshot.forEach((doc) => {
        // Assuming you have a field called url in your product document for the image URL
        const productData = {
          id: doc.id,
          name: doc.data().name,
          imageUrl: doc.data().url, // Adjust according to your data structure
          height: doc.data().thickness || "",
          width: doc.data().width || "",
          density: doc.data().density || 0, // Fetch density from backend
        };
        productOptions.push(productData);
      });
      this.setState({ productOptions });
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeContact(e) {
    this.setState({
      contact: e.target.value,
    });
  }

  onChangeProduct(e, index) {
    const { value } = e.target;
    this.setState((prevState) => {
      const products = [...prevState.products];
      const selectedProduct = this.state.productOptions.find((p) => p.name === value);
      products[index] = {
        ...products[index],
        name: value,
        density: selectedProduct ? selectedProduct.density : 0,
      };
      return { products };
    });
  }

  onChangeNoOfSheets(e, index) {
    const { value } = e.target;
    this.setState((prevState) => {
      const products = [...prevState.products];
      products[index] = { ...products[index], noofsheets: parseInt(value) };
      return { products };
    });
  }

  onChangeHeight(e, index) {
    const { value } = e.target;
    this.setState((prevState) => {
      const products = [...prevState.products];
      products[index] = { ...products[index], height: value };
      return { products };
    });
  }

  onChangeWidth(e, index) {
    const { value } = e.target;
    this.setState((prevState) => {
      const products = [...prevState.products];
      products[index] = { ...products[index], width: value };
      return { products };
    });
  }

  onChangeLength(e, index) {
    const { value } = e.target;
    this.setState((prevState) => {
      const products = [...prevState.products];
      products[index] = { ...products[index], length: value };
      return { products };
    });
  }

  addProduct() {
    this.setState((prevState) => ({
      products: [
        ...prevState.products,
        {
          name: "",
          price: 0,
          noofsheets: 1,
          height: "",
          width: "",
          length: "",
          density: 0, // Initialize density
        },
      ],
    }));
  }

  calculateTotal() {
    const totalPrize = this.state.products.reduce(
      (total, product) => total + product.price * product.noofsheets,
      0
    );
    this.setState({ totalPrize });
  }

  saveCustomer() {
    // Check if any required field is empty for any product
    const hasEmptyField = this.state.products.some(
      (product) =>
        !product.name ||
        !product.noofsheets ||
        !product.height ||
        !product.width ||
        !product.length
    );

    if (
      this.state.name &&
      this.state.email &&
      this.state.contact &&
      !hasEmptyField
    ) {
      const data = {
        name: this.state.name,
        email: this.state.email,
        contact: this.state.contact,
        products: this.state.products,
        totalPrize: this.state.totalPrize,
      };

      orderService
        .create(data)
        .then(() => {
          console.log("Customer data saved successfully!");
          this.setState({ submitted: true });
        })
        .catch((error) => {
          console.error("Error saving customer data:", error);
        });
    } else {
      alert("Please fill in all required fields.");
    }
  }

  newCustomer() {
    this.setState({
      name: "",
      email: "",
      contact: "",
      products: [],
      totalPrize: 0,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="orderbg" href={"../../public/Assets/image2.png"} >
    
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button
              className="btn btn-success"
              onClick={this.newCustomer}
            >
              Add Another Quotation
            </button>
          </div>
        ) : (
          <div>
            <br></br>
            <br></br>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                required
                value={this.state.contact}
                onChange={this.onChangeContact}
                name="contact"
              />
            </div>

            <div className="form-group">
              <br></br>
              <label htmlFor="products">Products</label>
              <div>
                <br></br>
                {this.state.products.map((product, index) => (
                  <div key={index}>
                    <select
                      className="form-control mb-2"
                      value={product.name}
                      onChange={(e) => this.onChangeProduct(e, index)}
                      required
                    >
                      <option value="">Select Product</option>
                      {this.state.productOptions.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    {product.name && (
                      <div>
                        <img
                          src={
                            this.state.productOptions.find(
                              (option) => option.name === product.name
                            ).imageUrl
                          }
                          alt={product.name}
                          style={{ width: "100px", height: "100px" }}
                        />
                        <div>
                          <br></br>

                          <label htmlFor="height">Height (mm)</label>
                          <input
                            type="number"
                            className="form-control"
                            id="height"
                            value={product.height}
                            onChange={(e) => this.onChangeHeight(e, index)}
                            name="height"
                            required
                          />
                        </div>
                        <br></br>
                        <div>
                          <label htmlFor="width">Width (mm)</label>
                          <input
                            type="number"
                            className="form-control"
                            id="width"
                            value={product.width}
                            onChange={(e) => this.onChangeWidth(e, index)}
                            name="width"
                            required
                          />
                        </div>
                        <br></br>
                        <div>
                          <label htmlFor="length">Length (mm)</label>
                          <input
                            type="number"
                            className="form-control"
                            id="length"
                            value={product.length}
                            onChange={(e) => this.onChangeLength(e, index)}
                            name="length"
                            required
                          />
                        </div>
                        <br></br>
                        <div>
                          <label htmlFor="noofsheets">Number of Sheets</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Number of Sheets"
                            value={product.noofsheets}
                            onChange={(e) => this.onChangeNoOfSheets(e, index)}
                            required
                          />
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <br></br>
              <button
                className="btn btn-primary mt-2"
                onClick={this.addProduct}
              >
                Add another Product
              </button>
            </div>

            <button onClick={this.saveCustomer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
      </div>
    );
  }
}
