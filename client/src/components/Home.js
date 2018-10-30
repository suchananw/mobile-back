import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCats } from "../actions/shopActions";
import Show from "./Show/Show";

class Home extends Component {
  componentDidMount() {
    this.props.getCats();
  }

  render() {
    const { cats, loading } = this.props.cats;

    let content;

    if (cats === null || loading) {
      content = "Loading...";
    } else {
      content = cats.map(cat => <Show cat={cat} />);
    }

    return (
      <div className="container">
        <div className="row m-4">{content}</div>
      </div>
    );
  }
}

Home.propTypes = {
  getCats: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cats: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cats: state.cats
});

export default connect(
  mapStateToProps,
  { getCats }
)(withRouter(Home));
