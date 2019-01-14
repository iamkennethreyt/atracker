import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import { getClassSection } from "../../actions/classsectionsAction";
import { getStudents } from "../../actions/studentActions";
import FooterPage from "../Layouts/FooterPage";

class EditClassSections extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.classsection) {
      const { teacher, section, sy, _id, students } = nextProps.classsection;

      this.setState({
        section,
        teacher,
        sy,
        _id,
        students
      });
    }

    if (nextProps.students) {
      this.setState({
        allstudents: nextProps.students
      });
    }
  }

  render() {
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
                    <Link
                      to={`/classsections/register/student/${
                        this.props.match.params.id
                      }`}
                      className="btn red accent-4  mt-4"
                    >
                      Add Student
                    </Link>

                    <table className="table">
                      <thead className="red accent-4 white-text">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Student ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Guardian</th>
                          <th scope="col">Contact Number</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.students.map((student, id) => {
                          return (
                            <tr key={id}>
                              <th scope="row">{id + 1}</th>
                              <td>{student.studentid}</td>
                              <td>
                                {student.student.firstname +
                                  " " +
                                  student.student.lastname}
                              </td>
                              <td>{student.student.guardianname}</td>
                              <td>{student.student.contactnumber}</td>
                              <td>
                                <Link
                                  className="btn btn-sm btn-outline-danger"
                                  to={`/students/edit/${student._id}`}
                                >
                                  Edit
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

EditClassSections.propTypes = {
  auth: PropTypes.object.isRequired,
  getClassSection: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  classsection: PropTypes.object.isRequired,
  students: PropTypes.array.isRequired,
  getStudents: PropTypes.func.isRequired,
  enrolledStud: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classsection: state.classsections.classsection,
  errors: state.errors,
  students: state.students.students,
  enrolledStud: state.classsections.students
});

export default connect(
  mapStateToProps,
  { getClassSection, getStudents }
)(EditClassSections);
