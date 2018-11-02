import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import "react-datepicker/dist/react-datepicker.css";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      birthday: moment(),
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onDateChange = event => {
    this.setState({ birthday: event });
  };

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      birthday: this.state.birthday
    };

    this.props.registerUser(newUser, this.props.history);
    this.props.onChangeAction("signin");
  };

  render() {
    return (
      <div className="signup">
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.onChange}
              required
            />
            <div id="datePicker">
              <label className="birthday">Birthday</label>
              <DatePicker
                id="date"
                dateFormat="DD/MM/YYYY"
                maxDate={moment()}
                onChange={this.onDateChange}
                selected={this.state.birthday}
              />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              required
            />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={this.state.password2}
              onChange={this.onChange}
              required
            />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(SignUp);
