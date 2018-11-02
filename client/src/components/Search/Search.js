import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCats } from "../../actions/shopActions";
import "./Search.css";

class ProductRow extends Component {
  render() {
    const product = this.props.product;
    const name = product.name;
    const breed = product.breed;
    const gender = product.gender;
    const age = product.age;
    const img = product.img;

    return (
      <tr>
        <td className="img-box">
          <img className="search-img img-thumbnail" src={img} alt={name} />
        </td>
        <td className="text-uppercase">{name}</td>
        <td>{breed}</td>
        <td>{gender}</td>
        <td>{age}</td>
      </tr>
    );
  }
}

class ProductTable extends Component {
  render() {
    const filterText = this.props.filterText;

    const rows = [];
    this.props.products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      rows.push(<ProductRow product={product} key={product.name} />);
    });

    return (
      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Breed</th>
            <th>Gender</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends Component {
  handleFilterTextChange = e => {
    this.props.onFilterTextChange(e.target.value);
  };

  render() {
    return (
      <div className="SearchBox">
        <form>
          <input
            className="form-control p-4"
            type="text"
            placeholder="Search by Name ..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
        </form>
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ""
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  componentDidMount() {
    this.props.getCats();
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    const { cats, loading } = this.props.cats;

    if (cats === null || loading) {
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
        </div>
      );
    } else {
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <ProductTable products={cats} filterText={this.state.filterText} />
        </div>
      );
    }
  }
}

Search.propTypes = {
  getCats: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  cats: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  cats: state.cats
});

export default connect(
  mapStateToProps,
  { getCats }
)(withRouter(Search));
