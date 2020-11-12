import React from "react";

// Stateless Functional Component
const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <img
        src="https://cdn.pixabay.com/photo/2018/07/18/13/05/ecommerce-3546296__340.jpg"
        alt=""
        style={{ width: "100%", height: "300px" }}
      ></img>
      <h1 className="navbar-brand" href="#">
        Total ={" "}
        <span className="badge badge-pill badge-success">{totalCounters}</span>
      </h1>
    </nav>
  );
};

export default NavBar;
