import React from 'react';
import { Link } from 'react-router-dom';

/**
 * renders the footer component
 *
 * @return {jsx} - footer component
 */
const Footer = () => {
  return (
    <div>
      <footer className="page-footer">
        <div className="footer-copyright">
          <div className="container">
            © Copyright, 2017 IdeaBox
            <Link className="grey-text text-lighten-4 right" to="#!">
              Ayeni Blessing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
