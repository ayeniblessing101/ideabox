import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="landingPage">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            IdeaBox
          </Link>
          <Link to="/" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/auth#sign-in">Sign In</Link>
            </li>
            <li className="getStarted">
              <Link to="/auth#sign-up">Get Started</Link>
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li>
              <Link to="/auth">Sign In</Link>
            </li>
            <li>
              <Link to="/auth">Get Started</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
