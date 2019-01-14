import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import classnames from "classnames";
import { getTeacher, updateTeacher } from "../../actions/teacherActions";
import FooterPage from "../Layouts/FooterPage";

class EditTeachersPage extends Component {
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

    this.props.getTeacher(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.teachers.teacher) {
      const { firstname, lastname, middlename } = nextProps.teachers.teacher;
      this.setState({
        firstname,
        lastname,
        middlename
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const updatedTeacher = {
      id: this.props.match.params.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      middlename: this.state.middlename,
      teacherid: this.state.teacherid
    };

    this.props.updateTeacher(updatedTeacher, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <div className="container dark-grey-text">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar />
            </div>
            <div className="col-md-9">
              <div className="container">
                <div className="d-flex justify-content-between">
                  <h1>Edit Teacher</h1>
                </div>
                <form
                  className="border border-light p-5"
                  onSubmit={this.onSubmit}
                >
                  <input
                    type="text"
                    className={classnames("form-control mt-4", {
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
                    className={classnames("form-control mt-4", {
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
                    className={classnames("form-control mt-4", {
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

EditTeachersPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getTeacher: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  teachers: PropTypes.object.isRequired,
  updateTeacher: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  teachers: state.teachers,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTeacher, updateTeacher }
)(EditTeachersPage);
