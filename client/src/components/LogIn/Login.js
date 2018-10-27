import React, { Component } from "react";
import "./Login.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      status: "signin"
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  onChangeAction = action => {
    this.setState({ status: action });
  };

  render() {
    const ACTIVE = "active mx-3";
    const INACTIVE = "inactive underlineHover mx-3";
    const { status } = this.state;

    return (
      <div className="wrapper">
        <div id="formContent">
          <h2
            className={status === "signin" ? ACTIVE : INACTIVE}
            onClick={() => this.onChangeAction("signin")}
          >
            Sign In
          </h2>
          <h2
            className={status === "signup" ? ACTIVE : INACTIVE}
            onClick={() => this.onChangeAction("signup")}
          >
            Sign Up
          </h2>
          {status === "signin" ? (
            <SignIn />
          ) : (
            <SignUp onChangeAction={this.onChangeAction} />
          )}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(Login));
