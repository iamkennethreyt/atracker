import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import { getStudents } from "../../actions/studentActions";
import FooterPage from "../Layouts/FooterPage";

class StudentsPage extends Component {
  state = {
    students: [
      {
        studentid: "",
        firstname: "",
        lastname: "",
        guardianname: "",
        contactnumber: ""
      }
    ]
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getStudents();
  }

  componentWillReceiveProps(prop) {
    this.setState({ students: prop.students });
  }

  render() {
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
                  <h1>Student Management</h1>
                  <Link
                    to="/students/add"
                    className="btn btn-outline-primary waves-effect"
                  >
                    Add
                  </Link>
                </div>

                <table className="table">
                  <thead className="blue darken-1 white-text">
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
                          <td>{student.firstname + " " + student.lastname}</td>
                          <td>{student.guardianname}</td>
                          <td>{student.contactnumber}</td>
                          <td>
                            <Link
                              className="btn btn-sm btn-outline-primary"
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
            </div>
          </div>
        </div>
        <FooterPage />
      </React.Fragment>
    );
  }
}

StudentsPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  students: state.students.students
});

export default connect(
  mapStateToProps,
  { getStudents }
)(StudentsPage);
