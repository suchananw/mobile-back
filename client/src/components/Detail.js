import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentCat } from "../actions/shopActions"

class Detail extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getCurrentCat(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cats.cat === null && this.props.cats.loading) {
      this.props.history.push('/home');
    }
  }

  render() {
    const { cat, loading } = this.props.cats;

    if (cat === null || loading) {
      return (
        <div className="container">
          <div className="row m-4">
              Loading...
          </div>
        </div>
      );
    } else {
      return (
        <div class="container">
            <div class="row">
                <div class="col-md-6 img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzOpl3-kqfNbPcA_u_qEZcSuvu5Je4Ce_FkTMMjxhB-J1wWin-Q"  alt="" class="img-rounded"/>
                </div>
                <div class="col-md-6 details">
                    <h5>{cat.name}</h5>
                <p>
                    breed : {cat.breed} <br/>
                    gender : {cat.gender} <br/>
                    age : {cat.age}
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
  cat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cat: state.cat
});

export default connect(mapStateToProps, { getCurrentCat })(withRouter(Detail));
