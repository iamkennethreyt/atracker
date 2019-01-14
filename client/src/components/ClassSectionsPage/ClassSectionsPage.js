import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import FooterPage from "../Layouts/FooterPage";
import SideNavbar from "../Layouts/SideNavbar";
import { getClassSections } from "../../actions/classsectionsAction";

class ClassSectionsPage extends Component {
  state = {
    classsections: [
      {
        section: {
          name: ""
        },
        teacher: {
          firstname: "",
          lastname: ""
        },
        sy: ""
      }
    ]
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getClassSections();
  }

  componentWillReceiveProps(prop) {
    this.setState({ classsections: prop.classsections });
    // console.log(prop.classsections);
  }

  render() {
    console.log(this.state.classsections);
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
                <div className="d-flex justify-content-between">
                  <h1>Class Section Management</h1>
                  <Link
                    to="/classsections/add"
                    className="btn btn-outline-danger waves-effect"
                  >
                    Add
                  </Link>
                </div>

                <table className="table">
                  <thead className="red accent-4 white-text">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Class Sections</th>
                      <th scope="col">Teachers</th>
                      <th scope="col">Year Level</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.classsections.map((cs, id) => {
                      return (
                        <tr key={id}>
                          <th scope="row">{id + 1}</th>
                          <td>
                            {cs.section.name + " " + cs.section.yearlevel}
                          </td>
                          <td>
                            {cs.teacher.firstname + " " + cs.teacher.lastname}
                          </td>
                          <td>{cs.sy}</td>
                          <td>
                            <Link
                              to={`/classsections/edit/${cs._id}`}
                              className="btn btn-sm btn-outline-danger"
                            >
                              View
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

ClassSectionsPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getClassSections: PropTypes.func.isRequired,
  classsections: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classsections: state.classsections.classsections
});

export default connect(
  mapStateToProps,
  { getClassSections }
)(ClassSectionsPage);
