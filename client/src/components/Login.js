import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const User = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(User);
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4 m-auto">
          <form
            className="text-center border border-light p-5"
            onSubmit={this.onSubmit}
          >
            <p className="h4 mb-4">Sign in</p>

            <input
              type="text"
              className="form-control mb-4"
              placeholder="User name"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />

            <input
              type="password"
              className="form-control mb-4"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <button className="btn btn-info btn-block my-4" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
