import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import classnames from "classnames";
import { registerTeacher } from "../../actions/teacherActions";
import FooterPage from "../Layouts/FooterPage";

class AddTeachersPage extends Component {
  state = {
    teacherid: "",
    firstname: "",
    lastname: "",
    middlename: "",
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

    const newTeacher = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      middlename: this.state.middlename,
      teacherid: this.state.teacherid
    };

    this.props.registerTeacher(newTeacher, this.props.history);
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
                  <h1>Register New Teacher</h1>
                </div>
                <form
                  className="border border-light p-5"
                  onSubmit={this.onSubmit}
                >
                  <input
                    type="text"
                    className={classnames("form-control mt-2", {
                      "is-invalid": errors.teacherid
                    })}
                    placeholder="Teacher ID"
                    name="teacherid"
                    value={this.state.teacherid}
                    onChange={this.onChange}
                  />
                  {errors.teacherid && (
                    <div className="invalid-feedback">{errors.teacherid}</div>
                  )}

                  <input
                    type="text"
                    className={classnames("form-control mt-2", {
                      "is-invalid": errors.firstname
                    })}
                    placeholder="First Name"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChange}
                  />
                  {errors.firstname && (
                    <div className="invalid-feedback">{errors.firstname}</div>
                  )}

                  <input
                    type="text"
                    className={classnames("form-control mt-2", {
                      "is-invalid": errors.middlename
                    })}
                    placeholder="Middle name"
                    name="middlename"
                    value={this.state.middlename}
                    onChange={this.onChange}
                  />
                  {errors.middlename && (
                    <div className="invalid-feedback">{errors.middlename}</div>
                  )}

                  <input
                    type="text"
                    className={classnames("form-control mt-2", {
                      "is-invalid": errors.lastname
                    })}
                    placeholder="Last name"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChange}
                  />
                  {errors.lastname && (
                    <div className="invalid-feedback">{errors.lastname}</div>
                  )}

                  <button
                    className="btn red accent-4 btn-block mt-4"
                    type="submit"
                  >
                    Save
                  </button>
                  <Link
                    to="/teachers"
                    className="btn btn-outline-danger btn-block mt-2"
                  >
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </React.Fragment>
    );
  }
}

AddTeachersPage.propTypes = {
  auth: PropTypes.object.isRequired,
  registerTeacher: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerTeacher }
)(AddTeachersPage);
