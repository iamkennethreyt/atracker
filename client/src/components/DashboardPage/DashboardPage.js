import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import { getTeachers } from "../../actions/teacherActions";
import { getClassSections } from "../../actions/classsectionsAction";
import { getStudents } from "../../actions/studentActions";
import FooterPage from "../Layouts/FooterPage";

class DashboardPage extends Component {
  state = {
    students: "",
    classsections: "",
    teachers: ""
  };
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getClassSections();
    this.props.getStudents();
    this.props.getTeachers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      students: nextProps.students.length,
      classsections: nextProps.classsections.length,
      teachers: nextProps.teachers.length
    });
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
              <div className="container dark-grey-text">
                <section className="text-center my-5">
                  <h2 className="h1-responsive font-weight-bold my-5">
                    Welcome to aTracker
                  </h2>
                  <p className="lead w-responsive mx-auto mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>

                  <div className="row">
                    <div className="col-md-4">
                      <i className="fas fa-address-card fa-3x blue-text" />
                      <h2 className="font-weight-bold my-4">
                        {this.state.students}
                      </h2>
                      <h5 className="font-weight-bold my-4">
                        {" "}
                        Registerd Students
                      </h5>
                    </div>

                    <div className="col-md-4">
                      <i className="fas fa-chalkboard-teacher fa-3x blue-text" />
                      <h2 className="font-weight-bold my-4">
                        {this.state.teachers - 1}
                      </h2>
                      <h5 className="font-weight-bold my-4">
                        Registerd Teachers
                      </h5>
                    </div>

                    <div className="col-md-4">
                      <i className="fas fa-users fa-3x blue-text" />
                      <h2 className="font-weight-bold my-4">
                        {this.state.classsections}
                      </h2>
                      <h5 className="font-weight-bold my-4">
                        Class Sections Created
                      </h5>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </React.Fragment>
    );
  }
}

DashboardPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getClassSections: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  getTeachers: PropTypes.func.isRequired,
  classsections: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classsections: state.classsections.classsections,
  teachers: state.teachers.teachers,
  students: state.students.students
});

export default connect(
  mapStateToProps,
  {
    getClassSections,
    getStudents,
    getTeachers
  }
)(DashboardPage);
