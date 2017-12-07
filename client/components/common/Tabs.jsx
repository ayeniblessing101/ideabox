import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

/**
 * @class Tabs
 * @extends {React.Component}
 */
class Tabs extends React.Component {
  /**
   * Initializes the materialize tabs components
   *
   * @method componentDidMount
   * @memberof Tab
   * @returns {void}
   */
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  /**
   * renders the signup and signin component
   * @memberof Header
   *
   * @return {jsx} - signup and signin component
   */
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s6 m6">
              <a
                className={this.props.activeTab !== 'sign-in' ? 'active' : ''}
                href="#sign-up"
              >
                Sign Up
              </a>
            </li>
            <li className="tab col s6 m6">
              <a
                className={this.props.activeTab === 'sign-in' ? 'active' : ''}
                href="#sign-in"
              >
                Sign In
              </a>
            </li>
          </ul>
        </div>
        <div id="sign-up" className="col s12 m12">
          <h4>Create Your Account</h4>
          <div className="row">
            <form className="col s12 m12">
              <div className="row">
                <div className="input-field col s6 m6">
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    className="validate"
                  />
                  <label htmlFor="firstname">First Name</label>
                </div>
                <div className="input-field col s6 m6">
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    className="validate"
                  />
                  <label htmlFor="lastname">Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m12">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="validate"
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 m6">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="validate"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s6 m6">
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="validate"
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
              </div>
              <button className="btn btn-primary" type="submit" name="action">
                SIGN UP
              </button>
            </form>
          </div>
        </div>
        <div id="sign-in" className="col s12 m12 tabsBody">
          <h4>Log Into Your Account</h4>
          <div className="row">
            <form className="col s12 m12">
              <div className="row">
                <div className="input-field col s12 m12">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="validate"
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m12">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="validate"
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <button className="btn btn-primary" type="submit" name="action">
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
};
export default Tabs;
