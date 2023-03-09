import React from "react";
import { Navbar, NavbarBrand, Nav } from "reactstrap";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <Navbar color="dark" dark expand>
        <div className="container">
          <NavbarBrand href="/">TUMI</NavbarBrand>

          <Nav className="me-auto" navbar>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/signup">Register</NavLink>
            <NavLink to="/signin">Sign in</NavLink>
            <NavLink to="/admin">admin</NavLink>
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
