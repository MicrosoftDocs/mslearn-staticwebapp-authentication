import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div className="column is-2">
      <nav className="menu">
        <p className="menu-label">Menu</p>
        <ul className="menu-list">
          <NavLink to="/products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/about" activeClassName="active-link">
            About
          </NavLink>
        </ul>
        {props.children}
      </nav>
    </div>
  );
};

export default NavBar;
