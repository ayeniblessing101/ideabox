import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authenticationAction';

/**
 * @class Sidebar
 * @extends {React.Component}
 */
class Sidebar extends React.Component {
  /**
   * This method is called when the logout button is clicked
   * it removed the user token from localstorage
   * @param {any} event
   * @memberof Header
   *
   * @return {void}
   */
  logout(event) {
    event.preventDefault();
    this.props.logout(this.state);
  }

  /**
   * Sidebar component
   *
   * @return {jsx} - Sidebar component
   */
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <ul id="dropdown2" className="dropdown-content">
          <li>
            <Link to="/my-ideas">My Ideas</Link>
          </li>
          <li>
            <Link to="/all-ideas">All Ideas</Link>
          </li>
        </ul>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <Link to="/settings">
              <i className="fa fa-cog fa-lg" aria-hidden="true" />Account
              Setting
            </Link>
          </li>
          <li>
            <button onClick={this.logout.bind(this)} className="logout">
              <span className="logout">
                <i className="fa fa-power-off fa-lg" aria-hidden="true" />
              </span>{' '}
              Logout
            </button>
          </li>
        </ul>
        <ul id="nav-mobile" className="side-nav fixed">
          <li>
            <i
              className="fa fa-user-circle-o fa-fw fa-3x userAvatar"
              aria-hidden="true"
            />
          </li>
          <li>
            <Link
              className="dropdown-button userProfile"
              to="/"
              data-activates="dropdown1"
            >
              {isAuthenticated === true ? user.email : ''}
              <i className="fa fa-caret-down fa-fw right" aria-hidden="true" />
            </Link>
          </li>
          <div className="border" />
          <li>
            <form id="searchForm">
              <input
                type="text"
                name="search"
                placeholder="Search for Ideas"
                id="searchBar"
              />
            </form>
          </li>
          <div className="border" />
          <li>
            <Link to="/create-idea">
              <i
                className="fa fa-plus-circle fa-lg"
                aria-hidden="true"
                style={{ paddingRight: '0' }}
              />Add a new idea
            </Link>
          </li>
          <li>
            <Link to="/" className="dropdown-button" data-activates="dropdown2">
              <i className="fa fa-lightbulb-o fa-lg" aria-hidden="true" />
              Ideas<span className="new badge red">4</span>
              <i className="fa fa-caret-down fa-fw right" aria-hidden="true" />
            </Link>
          </li>
          <div className="border" />
          <li>
            <Link to="#!">
              <i className="fa fa-filter" aria-hidden="true" />Filter By
              Category
              <ul>
                <li>
                  <input
                    type="checkbox"
                    name=""
                    className=""
                    id="Engineering"
                    checked=""
                    value="Engineering"
                  />
                  <label htmlFor="Engineering">Engineering</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name=""
                    className=""
                    id="Technology"
                    checked=""
                    value="Technology"
                  />
                  <label htmlFor="classes">Technology</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name=""
                    className=""
                    id="festival-event"
                    checked=""
                    value="Science"
                  />
                  <label htmlFor="festival-event">Science</label>
                </li>
              </ul>
            </Link>
          </li>
        </ul>
        <Link to="#!" data-activates="slide-out" className="button-collapse">
          <i className="mdi-navigation-menu" />
        </Link>
      </div>
    );
  }
}

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = state => ({
  auth: state.authenticationReducer,
});
export default connect(mapStateToProps, { logout })(Sidebar);
