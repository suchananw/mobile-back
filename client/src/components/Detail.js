import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentCat } from "../actions/shopActions";

class Detail extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getCurrentCat(this.props.match.params.id);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.cats.cat === null && this.props.cats.loading) {
  //     this.props.history.push("/home");
  //   }
  // }

  render() {
    const { cat, loading } = this.props.cats;

    if (cat === null || loading) {
      return (
        <div className="container">
          <div className="row m-4">Loading...</div>
        </div>
      );
    } else {
      return (
        <div class="container p-3">
          <div class="row">
            <div class="col-md-6 img">
              <img src={cat.img} alt={cat.name} class="img-rounded" />
            </div>
            <div class="col-md-6 details p-3">
              <h4 className="text-uppercase">{cat.name}</h4>
              <p>
                Breed : {cat.breed} <br />
                Gender : {cat.gender} <br />
                Age : {cat.age}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

Detail.propTypes = {
  getCurrentCat: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cats: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cats: state.cats
});

export default connect(
  mapStateToProps,
  { getCurrentCat }
)(withRouter(Detail));
