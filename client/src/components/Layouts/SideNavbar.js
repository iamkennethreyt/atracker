import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class Navbar extends Component {
  onLogout = e => {
    e.preventDefault();

    confirmAlert({
      title: "Confirm to Logout",
      message: "Are you sure do you want to logout this account?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.logoutUser(this.props)
        },
        {
          label: "No"
        }
      ]
    });
  };

  render() {
    return (
      <ul className="list-group">
        <Link to="/" className="list-group-item text-muted">
          Home
        </Link>
        <Link to="/teachers" className="list-group-item text-muted">
          Teacher Management
        </Link>
        <Link to="/students" className="list-group-item text-muted">
          Student Management
        </Link>
        <Link to="/sections" className="list-group-item text-muted">
          Section Management
        </Link>
        <Link to="/classsections" className="list-group-item text-muted">
          Class Section Management
        </Link>
        <Link to="/settings" className="list-group-item text-muted">
          Account Settings
        </Link>
        <Link to="/about" className="list-group-item text-muted">
          About aTracker
        </Link>
        <li
          onClick={this.onLogout}
          className="list-group-item text-muted"
          style={{ cursor: "pointer" }}
        >
          Sign Out
        </li>
        <div style={{ height: "140px" }} />
      </ul>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser }
)(Navbar);
