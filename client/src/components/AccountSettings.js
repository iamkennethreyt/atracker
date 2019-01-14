import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import classnames from "classnames";
import { changePassword } from "../actions/authActions";

class AcountSettings extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      password2: "",
      password3: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      password: this.state.password,
      password2: this.state.password2,
      password3: this.state.password3
    };

    this.props.changePassword(userData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="row dark-grey-text">
        <div className="col-md-4 m-auto">
          <form className="border border-light p-5" onSubmit={this.onSubmit}>
            <p className="h4 mb-4">Account Settings</p>

            <input
              type="password"
              className={classnames("form-control mt-4", {
                "is-invalid": errors.password
              })}
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}

            <input
              type="password"
              className={classnames("form-control mt-4", {
                "is-invalid": errors.password2
              })}
              placeholder="New Password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}

            <input
              type="password"
              className={classnames("form-control mt-4", {
                "is-invalid": errors.password3
              })}
              placeholder="Confirm New password"
              name="password3"
              value={this.state.password3}
              onChange={this.onChange}
            />

            {errors.password3 && (
              <div className="invalid-feedback">{errors.password3}</div>
            )}
            <button className="btn purple btn-block my-4" type="submit">
              Change Password
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AcountSettings.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { changePassword }
)(AcountSettings);
