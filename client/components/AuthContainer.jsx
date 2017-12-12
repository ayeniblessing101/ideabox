import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Auth container class
 * @class AuthContainer
 * @extends {Component}
 */
class AuthContainer extends Component {
  /**
   * Creates an instance of AuthContainer.
   * @param {any} props
   * @memberOf AuthContainer
   */
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.auth.isAuthenticated,
    };
  }

  /**
   * Fired when component will receive new props
   * @param {any} nextProps
   * @returns {void}
   * @memberOf AuthContainer
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.auth.isAuthenticated,
    });
  }

  /**
   * Renders the Auth component
   * @returns {void}
   * @memberOf AuthContainer
   */
  render() {
    const { Comp, path } = this.props;
    const { isAuthenticated } = this.state;
    if (isAuthenticated) {
      return <Route exact path={path} render={() => <Comp />} />;
    }
    Materialize.toast('You need to login to access that page', 4000, 'red');
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  auth: state.authenticationReducer,
});

AuthContainer.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  Comp: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {})(withRouter(AuthContainer));
