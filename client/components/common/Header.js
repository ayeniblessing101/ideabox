import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav className="mainPageHeader">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            IdeaBox
          </Link>
          <Link to="/" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
