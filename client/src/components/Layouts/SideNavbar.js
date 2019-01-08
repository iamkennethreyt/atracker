import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <ul className="list-group">
        <Link to="/" className="list-group-item">
          Home
        </Link>
        <Link to="/teachers" className="list-group-item">
          Teacher Management
        </Link>
        <Link to="/students" className="list-group-item">
          Student Management
        </Link>
        <Link to="/sections" className="list-group-item">
          Section Management
        </Link>
        <Link to="/about" className="list-group-item">
          About
        </Link>
      </ul>
    );
  }
}

export default Navbar;
