import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * A middleware that ensure a user is authenticated to access certain routes
 * @param {object} ComposedComponent - ComposedComponent
 * @return {void} - void
 */
export default (ComposedComponent) => {
  class requireAuth extends React.Component {
    componentWillMount() {
      if (!this.props.requireAuth) {
        Materialize.toast('You need to login to access this page', 5000, 'red');
        this.context.router.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.requireAuth) {
        Materialize.toast('You need to login to access this page', 5000, 'red');
        this.context.router.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  requireAuth.propTypes = {
    requireAuth: PropTypes.bool.isRequired,
  };

  requireAuth.contextTypes = {
    router: PropTypes.object.isRequired,
  };
  /**
   * maps the store state isAuthenticated to props
   * @param {*} state
   *
   * @returns {void}
   */
  const mapStateToProps = (state) => {
    return {
      requireAuth: state.authenticationReducer.isAuthenticated,
    };
  };

  return connect(mapStateToProps)(requireAuth);
};
