import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Signup from './Signup';
import Signin from './Signin';

/**
 * @class Tabs
 * @extends {React.Component}
 */
class AuthenticationForm extends React.Component {
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
          <Signup />
        </div>
        <div id="sign-in" className="col s12 m12 tabsBody">
          <h4>Log Into Your Account</h4>
          {/* <Signin /> */}
        </div>
      </div>
    );
  }
}

AuthenticationForm.propTypes = {
  activeTab: PropTypes.string.isRequired,
};
export default AuthenticationForm;
