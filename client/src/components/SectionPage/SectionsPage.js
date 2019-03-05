import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import { getSections, deleteSection } from "../../actions/sectionActions";
import FooterPage from "../Layouts/FooterPage";

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
              <div className="container dark-grey-text">
                <div className="d-flex justify-content-between">
                  <h1>Section Management</h1>
                  <Link
                    to="/sections/add"
                    className="btn btn-outline-primary waves-effect"
                  >
                    Add
                  </Link>
                </div>

                <table className="table">
                  <thead className="blue darken-1 white-text">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Section Name</th>
                      <th scope="col">Year Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.sections.map((section, id) => {
                      return (
                        <tr key={id}>
                          <th scope="row">{id + 1}</th>
                          <td>{section.name}</td>
                          <td>{section.yearlevel}</td>
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
