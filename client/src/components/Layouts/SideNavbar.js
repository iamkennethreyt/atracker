import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
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
        <Link to="/about" className="list-group-item text-muted">
          About
        </Link>
      </ul>
    );
  }
}

export default Navbar;
