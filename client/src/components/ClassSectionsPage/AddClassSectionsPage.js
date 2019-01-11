import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import classnames from "classnames";
import { registerClassSection } from "../../actions/classsectionsAction";
import { getSections } from "../../actions/sectionActions";
import { getTeachers } from "../../actions/teacherActions";

class AddClassSectionsPage extends Component {
  state = {
    teacher: "",
    section: "",
    sy: "",
    errors: {},
    teachers: [
      {
        _id: "",
        firstname: "",
        lastname: ""
      }
    ],
    sections: [
      {
        _id: "",
        name: "",
        yearlevel: ""
      }
    ]
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    this.props.getSections();
    this.props.getTeachers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.teachers) {
      this.setState({ teachers: nextProps.teachers });
    }

    if (nextProps.sections) {
      this.setState({ sections: nextProps.sections });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newData = {
      section: this.state.section,
      teacher: this.state.teacher,
      sy: this.state.sy
    };

    // console.log(newData);
    this.props.registerClassSection(newData, this.props.history);
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
                  <h1>Register New Class Section</h1>
                </div>
                <form
                  className="border border-light p-5"
                  onSubmit={this.onSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="sy">Instructor Name</label>
                    <select
                      id="gradelevel"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.teacher
                      })}
                      name="teacher"
                      value={this.state.teacher}
                      onChange={this.onChange}
                    >
                      <option hidden>Teachers</option>
                      {this.state.teachers.map((teacher, i) => (
                        <option key={i} value={teacher._id}>
                          {teacher.firstname + " " + teacher.lastname}
                        </option>
                      ))}
                    </select>
                    {errors.teacher && (
                      <div className="invalid-feedback">{errors.teacher}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="section">Section Name</label>
                    <select
                      id="section"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.section
                      })}
                      name="section"
                      value={this.state.section}
                      onChange={this.onChange}
                    >
                      <option hidden>Section Name</option>
                      {this.state.sections.map((section, i) => (
                        <option key={i} value={section._id}>
                          {section.name + " " + section.yearlevel}
                        </option>
                      ))}
                    </select>
                    {errors.section && (
                      <div className="invalid-feedback">{errors.section}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="gradelevel">School Year</label>
                    <select
                      id="sy"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.sy
                      })}
                      name="sy"
                      value={this.state.sy}
                      onChange={this.onChange}
                    >
                      <option hidden>Year Level</option>
                      {["2019-2020", "2020-2021", "2011-2022"].map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.sy && (
                      <div className="invalid-feedback">{errors.sy}</div>
                    )}
                  </div>

                  <button
                    className="btn red accent-4 btn-block mt-4"
                    type="submit"
                  >
                    Save
                  </button>
                  <Link
                    to="/classsections"
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

AddClassSectionsPage.propTypes = {
  auth: PropTypes.object.isRequired,
  registerClassSection: PropTypes.func.isRequired,
  getSections: PropTypes.func.isRequired,
  getTeachers: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  teachers: state.teachers,
  sections: state.sections.sections,
  teachers: state.teachers.teachers
});

export default connect(
  mapStateToProps,
  { registerClassSection, getSections, getTeachers }
)(AddClassSectionsPage);
