import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props);
  };

  componentWillReceiveProps(props) {
    // console.log(props);
    if (!props.auth.isAuthenticated) {
      //   this.props.history.push("/");
      window.location.href = "/login";
    }
  }
  render() {
    const { user } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark red accent-4 mb-3">
        <div className="container">
          <Link className="nav-brand text-white" to="/">
            aTracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#basicExampleNav"
            aria-controls="basicExampleNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="basicExampleNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  {user.firstname + " " + user.lastname + " |"}
                </a>
              </li>
              <li className="nav-item">
                <a href="/" onClick={this.onLogout} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
