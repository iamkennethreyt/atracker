import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import classnames from "classnames";
import FooterPage from "../Layouts/FooterPage";
import {
  getClassSection,
  registerStudent
} from "../../actions/classsectionsAction";
import { getStudents } from "../../actions/studentActions";

class AddStudentClassSectionPage extends Component {
  state = {
    _id: "",
    errors: {},
    name: "",
    sy: "",
    section: {
      name: "",
      yearlevel: ""
    },

    teacher: {
      firstname: "",
      lastname: ""
    },
    isOpen: false,
    student: "",
    allstudents: [
      {
        _id: "",
        firstname: "",
        lastname: ""
      }
    ],
    students: [
      {
        student: {
          _id: "",
          firstname: "",
          lastname: ""
        }
      }
    ]
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    this.props.getClassSection(this.props.match.params.id);
    this.props.getStudents();
  }

  isOpenForm = () => {
    this.setState({ isOpen: true });
  };

  isCloseForm = () => {
    this.setState({ isOpen: false });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.classsection) {
      const { teacher, section, sy, _id } = nextProps.classsection;

      this.setState({
        section,
        teacher,
        sy,
        _id
      });
    }

    if (nextProps.registeredStudent) {
      this.setState({
        students: nextProps.registeredStudent
      });
    }

    if (nextProps.students) {
      this.setState({
        allstudents: nextProps.students
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      link: this.props.match.params,
      student: this.state.student
    };

    this.props.registerStudent(data, this.props.history);
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
                {this.state.section ? (
                  <div>
                    <div className="d-flex justify-content-between">
                      <h1>Class Section</h1>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h5>
                        Section Name :{" "}
                        <strong>{this.state.section.name}</strong>
                      </h5>
                      <h5>
                        School Year : <strong>{this.state.sy}</strong>
                      </h5>
                      <h5>
                        Teacher :{" "}
                        <strong>
                          {this.state.teacher.firstname +
                            " " +
                            this.state.teacher.lastname}
                        </strong>
                      </h5>
                    </div>

                    <form
                      className="border border-light p-5"
                      onSubmit={this.onSubmit}
                    >
                      <div className="form-group">
                        <label htmlFor="gradelevel">Students</label>
                        <select
                          id="student"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.student
                            }
                          )}
                          name="student"
                          value={this.state.student}
                          onChange={this.onChange}
                        >
                          <option hidden>Students</option>
                          {this.state.allstudents.map(student => (
                            <option key={student._id} value={student._id}>
                              {student.lastname + " " + student.firstname}
                            </option>
                          ))}
                        </select>
                        {errors.student && (
                          <div className="invalid-feedback">
                            {errors.student}
                          </div>
                        )}
                      </div>

                      <button
                        className="btn red accent-4 btn-block mt-4"
                        type="submit"
                      >
                        Save
                      </button>
                      <Link
                        to={`/classsections/${this.props.match.params.id}`}
                        className="btn btn-outline-danger btn-block mt-2"
                      >
                        Cancel
                      </Link>
                    </form>
                  </div>
                ) : (
                  <h1>Loading...</h1>
                )}
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </React.Fragment>
    );
  }
}

AddStudentClassSectionPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getClassSection: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  classsection: PropTypes.object.isRequired,
  students: PropTypes.array.isRequired,
  getStudents: PropTypes.func.isRequired,
  registerStudent: PropTypes.func.isRequired,
  enrolledStud: PropTypes.array.isRequired,
  registeredStudent: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classsection: state.classsections.classsection,
  errors: state.errors,
  students: state.students.students,
  enrolledStud: state.classsections.students,
  registeredStudent: state.classsections.students
});

export default connect(
  mapStateToProps,
  { getClassSection, getStudents, registerStudent }
)(AddStudentClassSectionPage);
