import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logoPharm.png";
import "./TopNav.css";
const TopNav = () => {
  const menuData = [
    {
      path: "/",
      name: "Accueil",
    },
    {
      path: "/about",
      name: "A propos",
    },
    {
      path: "/contact",
      name: "Contact",
    },
  ];
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Link to={"/"} key={"home"}>
          <Navbar.Brand className="brand d-flex justify-content-center align-items-center">
            <img
              src={logo} // add your logo here
              height="50"
              className="d-inline-block align-top me-3"
              alt="Pharmacie logo"
            />
            PharmOuvert
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            {menuData.map((item) => (
              <Link to={item.path} key={item.name}>
                <div className="list_item">{item.name}</div>
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
