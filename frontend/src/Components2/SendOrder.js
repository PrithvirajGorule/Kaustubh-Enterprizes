import React, { Component } from "react";
import orderService from "../Services2/order.service";
import AdminProductService from "../Services2/AdminProductService";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      name: "",
      email: "",
      contact: "",
      products: [],
      productOptions: [], // Options for the dropdown menu
      totalPrize: 0,
      submitted: false
    };
  }

  componentDidMount() {
    // Fetch product options from AdminProductService
    AdminProductService.getAll().then(querySnapshot => {
      const productOptions = [];
      querySnapshot.forEach(doc => {
        // Assuming you have a field called url in your product document for the image URL
        const productData = {
          id: doc.id,
          name: doc.data().name,
          imageUrl: doc.data().url // Adjust according to your data structure
        };
        productOptions.push(productData);
      });
      this.setState({ productOptions });
    });
  }


  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeContact(e) {
    this.setState({
      contact: e.target.value
    });
  }

  onChangeProduct(e, index) {
    const { value } = e.target;
    this.setState(prevState => {
      const products = [...prevState.products];
      products[index] = { ...products[index], name: value };
      return { products };
    });
  }

  onChangeQuantity(e, index) {
    const { value } = e.target;
    this.setState(prevState => {
      const products = [...prevState.products];
      products[index] = { ...products[index], quantity: parseInt(value) };
      return { products };
    });
  }

  addProduct() {
    this.setState(prevState => ({
      products: [...prevState.products, { name: "", price: 0, quantity: 1 }]
    }));
  }

  calculateTotal() {
    const totalPrize = this.state.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    this.setState({ totalPrize });
  }

  saveCustomer() {
    const data = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      products: this.state.products,
      totalPrize: this.state.totalPrize
    };

    orderService
      .create(data)
      .then(() => {
        console.log("Customer data saved successfully!");
        this.setState({ submitted: true });
      })
      .catch(error => {
        console.error("Error saving customer data:", error);
      });
  }

  newCustomer() {
    this.setState({
      name: "",
      email: "",
      contact: "",
      products: [],
      totalPrize: 0,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCustomer}>
              Add Another Quotation
            </button>
          </div>
        ) : (
          <div>
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
              <label htmlFor="products">Products</label>
              <div>
                {this.state.products.map((product, index) => (
                  <div key={index}>
                    <select
                      className="form-control mb-2"
                      value={product.name}
                      onChange={e => this.onChangeProduct(e, index)}
                    >
                      <option value="">Select Product</option>
                      {this.state.productOptions.map(option => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    {product.name && (
                      <img
                        src={this.state.productOptions.find(
                          option => option.name === product.name
                        ).imageUrl}
                        alt={product.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      value={product.quantity}
                      onChange={e => this.onChangeQuantity(e, index)}
                    />
                  </div>
                ))}
              </div>
              <button className="btn btn-primary mt-2" onClick={this.addProduct}>
                Add Product
              </button>
            </div>

            {/* <div className="form-group">
              <label htmlFor="totalPrize">Total Prize</label>
              <input
                type="text"
                className="form-control"
                id="totalPrize"
                value={this.state.totalPrize}
                readOnly
              />
            </div> */}

            <button onClick={this.saveCustomer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
