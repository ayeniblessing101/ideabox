import React from 'react';
import { Link } from 'react-router-dom';

/**
 * renders the main footer component
 * @memberof MainFooter
 *
 * @return {jsx} - main footer component
 */
const MainFooter = () => {
  return (
    <div>
      <footer className="mainpage-footer">
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

export default MainFooter;
