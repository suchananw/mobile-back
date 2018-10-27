import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  // componentDidMount() {
  //   if (!this.props) {
  //     window.location.href = "/home";
  //   }
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/home");
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} noValidate>
          <img
            className="login-img p-3"
            src="https://cdn.onlinewebfonts.com/svg/img_219849.png"
            id="icon"
            alt="User Icon"
          />
          <input
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
            onChange={this.onChange}
            type="email"
            name="email"
            placeholder="E-mail"
            value={this.state.email}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
          <input
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
            onChange={this.onChange}
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(SignIn);
