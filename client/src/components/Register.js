import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
    // console.log(newUser);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col-md-4 m-auto">
          <form className="border border-light p-5" onSubmit={this.onSubmit}>
            <p className="h4 mb-4">Sign up</p>

            <input
              type="text"
              className={classnames("form-control mt-4", {
                "is-invalid": errors.name
              })}
              placeholder="Full name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}

            <input
              type="text"
              className={classnames("form-control mt-4", {
                "is-invalid": errors.username
              })}
              placeholder="User name"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
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
            <input
              type="password"
              className={classnames("form-control mt-4", {
                "is-invalid": errors.password2
              })}
              placeholder="Confirm password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
            <button className="btn btn-info btn-block my-4" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
