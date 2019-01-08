import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import classnames from "classnames";
import { registerStudent } from "../../actions/studentActions";

class AddStudentsPage extends Component {
  state = {
    studentid: "",
    firstname: "",
    lastname: "",
    middlename: "",
    guardianname: "",
    contactnumber: "",
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

    const newStudent = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      middlename: this.state.middlename,
      contactnumber: this.state.contactnumber,
      guardianname: this.state.guardianname,
      studentid: this.state.studentid
    };

    this.props.registerStudent(newStudent, this.props.history);
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
                  <h1>Register New Student</h1>
                </div>
                <form
                  className="border border-light p-5"
                  onSubmit={this.onSubmit}
                >
                  <input
                    type="text"
                    className={classnames("form-control mt-2", {
                      "is-invalid": errors.studentid
                    })}
                    placeholder="Student ID"
                    name="studentid"
                    value={this.state.studentid}
                    onChange={this.onChange}
                  />
                  {errors.studentid && (
                    <div className="invalid-feedback">{errors.studentid}</div>
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

                  <input
                    type="text"
                    className={classnames("form-control mt-2", {
                      "is-invalid": errors.guardianname
                    })}
                    placeholder="Guardian name"
                    name="guardianname"
                    value={this.state.guardianname}
                    onChange={this.onChange}
                  />
                  {errors.guardianname && (
                    <div className="invalid-feedback">
                      {errors.guardianname}
                    </div>
                  )}

                  <input
                    type="text"
                    className={classnames("form-control mt-2", {
                      "is-invalid": errors.contactnumber
                    })}
                    placeholder="Contact Number"
                    name="contactnumber"
                    value={this.state.contactnumber}
                    onChange={this.onChange}
                  />
                  {errors.contactnumber && (
                    <div className="invalid-feedback">
                      {errors.contactnumber}
                    </div>
                  )}

                  <button
                    className="btn red accent-4 btn-block mt-4"
                    type="submit"
                  >
                    Save
                  </button>
                  <Link
                    to="/students"
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

AddStudentsPage.propTypes = {
  auth: PropTypes.object.isRequired,
  registerStudent: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerStudent }
)(AddStudentsPage);
