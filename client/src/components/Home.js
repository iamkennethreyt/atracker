import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className="container">
        <h1>{isAuthenticated ? user.name : "Welcome to my login app"}</h1>
        {isAuthenticated ? (
          <Link to="/accountsettings" className="btn purple text-white my-4">
            Change Password
          </Link>
        ) : null}
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
