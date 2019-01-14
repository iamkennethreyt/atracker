import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import classnames from "classnames";
import { updatePassword } from "../../actions/teacherActions";

class EditTeachersPage extends Component {
  state = {
    password: "",
    password2: "",
    password3: "",
    errors: {}
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const updatedPasswod = {
      password: this.state.password,
      password2: this.state.password2,
      password3: this.state.password3
    };

    this.props.updatePassword(updatedPasswod, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar />
            </div>
            <div className="col-md-9">
              <div className="container">
                <div className="d-flex justify-content-between">
                  <h1>Edit Account</h1>
                </div>
                <form
                  className="border border-light p-5"
                  onSubmit={this.onSubmit}
                >
                  <input
                    type="password"
                    className={classnames("form-control mt-4", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Current Password"
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
                    placeholder="Confirm Password"
                    name="password3"
                    value={this.state.password3}
                    onChange={this.onChange}
                  />
                  {errors.password3 && (
                    <div className="invalid-feedback">{errors.password3}</div>
                  )}

                  <button
                    className="btn red accent-4 btn-block mt-4"
                    type="submit"
                  >
                    Save
                  </button>
                  <Link
                    to="/"
                    className="btn btn-outline-danger btn-block mt-2"
                  >
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

EditTeachersPage.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updatePassword }
)(EditTeachersPage);
