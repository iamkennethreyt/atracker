import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import classnames from "classnames";
import { registerSection } from "../../actions/sectionActions";
import FooterPage from "../Layouts/FooterPage";

class AddSectionPage extends Component {
  state = {
    name: "",
    yearlevel: "",
    errors: {}
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newData = {
      name: this.state.name,
      yearlevel: this.state.yearlevel
    };

    this.props.registerSection(newData, this.props.history);
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
              <div className="container dark-grey-text">
                <div className="d-flex justify-content-between">
                  <h1>Register New Section</h1>
                </div>
                <form
                  className="border border-light p-5"
                  onSubmit={this.onSubmit}
                >
                  <input
                    type="text"
                    className={classnames("form-control mt-2", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Section Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}

                  <div className="form-group">
                    <label htmlFor="gradelevel">Grade Level</label>
                    <select
                      id="gradelevel"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.yearlevel
                      })}
                      name="yearlevel"
                      value={this.state.yearlevel}
                      onChange={this.onChange}
                    >
                      <option hidden>Year Level</option>
                      {["I", "II", "III", "IV", "V", "VI"].map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.yearlevel && (
                      <div className="invalid-feedback">{errors.yearlevel}</div>
                    )}
                  </div>

                  {/* <input
                    type="text"
                    className={classnames("form-control mt-2", {
                      "is-invalid": errors.yearlevel
                    })}
                    placeholder="Year Level"
                    name="yearlevel"
                    value={this.state.yearlevel}
                    onChange={this.onChange}
                  /> */}

                  <button
                    className="btn blue darken-1 btn-block mt-4"
                    type="submit"
                  >
                    Save
                  </button>
                  <Link
                    to="/sections"
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

AddSectionPage.propTypes = {
  auth: PropTypes.object.isRequired,
  registerSection: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerSection }
)(AddSectionPage);
