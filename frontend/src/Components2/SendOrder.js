import React, { Component } from "react";
import orderService from "../Services2/order.service";
import AdminProductService from "../Services2/AdminProductService";
import "./../CSS/SendOrder.css";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      contact: "",
      categories: [],
      subcategories: [],
      products: [],
      totalPrize: 0,
      submitted: false,
    };
  }

  componentDidMount() {
    // Fetch categories from AdminProductService
    AdminProductService.getAllCategories().then((querySnapshot) => {
      const categories = [];
      querySnapshot.forEach((doc) => {
        const categoryData = {
          id: doc.id,
          name: doc.data().name,
        };
        categories.push(categoryData);
      });
      this.setState({ categories });
    });
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangeContact = (e) => {
    this.setState({
      contact: e.target.value,
    });
  };
  
  onChangeCategory = async (e) => {
    const categoryId = e.target.value;
  
    try {
      // Fetch subcategories for the selected category
      const snapshot = await AdminProductService.getSubcategoriesByCategory(categoryId);
      const subcategories = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));
  
      // Fetch category details including density
      const categoryDoc = await AdminProductService.getCategory(categoryId);
      const categoryData = categoryDoc.data(); // Retrieve document data
      const { name: category, density } = categoryData; // Destructure name and density from categoryData
  
      this.setState({
        subcategories,
        density,
        category,
      });
    } catch (error) {
      console.error("Error fetching subcategories or category data:", error);
      // Handle error state or alert the user
    }
  };
  
  

  onChangeSubcategory = (e, index) => {
    const { value } = e.target;
    const subcategory = this.state.subcategories.find(sub => sub.id === value);
  
    this.setState(prevState => {
      const products = [...prevState.products];
      products[index] = {
        ...products[index],
        subcategory: subcategory ? subcategory.name : '', 
      };
      return { products };
    });
  };
  

  onChangeHeight = (e, index) => {
    const { value } = e.target;
    this.setState((prevState) => {
      const products = [...prevState.products];
      products[index] = {
        ...products[index],
        height: value,
      };
      return { products };
    });
  };

  onChangeWidth = (e, index) => {
    const { value } = e.target;
    this.setState((prevState) => {
      const products = [...prevState.products];
      products[index] = {
        ...products[index],
        width: value,
      };
      return { products };
    });
  };

  onChangeLength = (e, index) => {
    const { value } = e.target;
    this.setState((prevState) => {
      const products = [...prevState.products];
      products[index] = {
        ...products[index],
        length: value,
      };
      return { products };
    });
  };

  onChangeNoOfSheets = (e, index) => {
    const { value } = e.target;
    this.setState((prevState) => {
      const products = [...prevState.products];
      products[index] = {
        ...products[index],
        noofsheets: value,
      };
      return { products };
    });
  };

  addProduct = () => {
    this.setState((prevState) => ({
      products: [
        ...prevState.products,
        {
          category:"",
          subcategory: "",
          height: "",
          width: "",
          length: "",
          noofsheets: 1,
          density: 0, // Initialize density
        },
      ],
    }));
  };

  removeProduct = (index) => {
    this.setState((prevState) => ({
      products: prevState.products.filter((_, i) => i !== index),
    }));
  };

  saveCustomer = () => {
    // Check if any required field is empty for any product
    const hasEmptyField = this.state.products.some(
      (product) =>
        !product.subcategory ||
        !product.height ||
        !product.width ||
        !product.length ||
        !product.noofsheets
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
      alert("Please fill in all required fields for all products.");
    }
  };

  newCustomer = () => {
    this.setState({
      name: "",
      email: "",
      contact: "",
      products: [],
      totalPrize: 0,
      submitted: false,
    });
  };

  render() {
    return (
      <div className="orderbg">
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
              <br />
              <br />
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

              {this.state.products.map((product, index) => (
                <div key={index}>
                  <hr />
                  <h5>Product {index + 1}</h5>

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      className="form-control"
                      onChange={this.onChangeCategory}
                      value={this.state.category}
                      required
                    >
                      <option value="">Select Category</option>
                      {this.state.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    
                  </div>

                  { (
                    <div>
                      <div className="form-group">
                        <label htmlFor="subcategory">Subcategory</label>
                        <select
                          className="form-control"
                          onChange={(e) => this.onChangeSubcategory(e, index)}
                          value={product.subcategory}
                          required
                        >
                          <option value="">Select Subcategory</option>
                          {this.state.subcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>
                              {subcategory.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
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

                      <div className="form-group">
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

                      <div className="form-group">
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

                      <div className="form-group">
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

                      <button
                        className="btn btn-danger"
                        onClick={() => this.removeProduct(index)}
                      >
                        Remove Product
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <button className="btn btn-primary mt-2" onClick={this.addProduct}>
                Add another Product
              </button>

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
