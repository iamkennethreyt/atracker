import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      teacherid: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
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
      teacherid: this.state.teacherid,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="row dark-grey-text">
        <div className="col-md-4 m-auto">
          <form className="border border-light p-5" onSubmit={this.onSubmit}>
            <p className="h4 mb-4">Sign in</p>

            <input
              type="text"
              className={classnames("form-control mt-4", {
                "is-invalid": errors.teacherid
              })}
              placeholder="User name"
              name="teacherid"
              value={this.state.teacherid}
              onChange={this.onChange}
            />
            {errors.teacherid && (
              <div className="invalid-feedback">{errors.teacherid}</div>
            )}

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
            <button className="btn red accent-4 btn-block my-4" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
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
)(LoginPage);
