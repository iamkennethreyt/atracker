import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import { getTeachers } from "../../actions/teacherActions";

class TeachersPage extends Component {
  state = {
    teachers: [
      {
        teacherid: "",
        firstname: "",
        lastname: ""
      }
    ]
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getTeachers();
  }

  componentWillReceiveProps(prop) {
    this.setState({ teachers: prop.teachers });
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
                <div className="d-flex justify-content-between">
                  <h1>Teacher Management</h1>
                  <Link
                    to="teachers/add"
                    className="btn btn-outline-danger waves-effect"
                  >
                    Add
                  </Link>
                </div>

                <table className="table">
                  <thead className="red accent-4 white-text">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Teacher ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.teachers.map((teacher, id) => {
                      return (
                        <tr key={id}>
                          <th scope="row">{id + 1}</th>
                          <td>{teacher.teacherid}</td>
                          <td>{teacher.firstname + " " + teacher.lastname}</td>
                          <td>button</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

TeachersPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getTeachers: PropTypes.func.isRequired,
  teachers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  teachers: state.teachers.teachers
});

export default connect(
  mapStateToProps,
  { getTeachers }
)(TeachersPage);
