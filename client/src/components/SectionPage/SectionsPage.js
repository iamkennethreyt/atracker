import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import { getSections, deleteSection } from "../../actions/sectionActions";

class SectionsPage extends Component {
  state = {
    sections: [
      {
        name: "",
        gradelevel: ""
      }
    ]
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getSections();
  }

  componentWillReceiveProps(prop) {
    this.setState({ sections: prop.sections });
  }

  onDelete = id => {
    this.props.deleteSection(id);
    // console.log(id);
  };

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
                  <h1>Section Management</h1>
                  <Link
                    to="/sections/add"
                    className="btn btn-outline-danger waves-effect"
                  >
                    Add
                  </Link>
                </div>

                <table className="table">
                  <thead className="red accent-4 white-text">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Section Name</th>
                      <th scope="col">Year Level</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.sections.map((section, id) => {
                      return (
                        <tr key={id}>
                          <th scope="row">{id + 1}</th>
                          <td>{section.name}</td>
                          <td>{section.yearlevel}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={this.onDelete.bind(this, section._id)}
                            >
                              Delete
                            </button>
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
      </React.Fragment>
    );
  }
}

SectionsPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getSections: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  sections: state.sections.sections
});

export default connect(
  mapStateToProps,
  { getSections, deleteSection }
)(SectionsPage);
