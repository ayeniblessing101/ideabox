import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import Tabs from './common/Tabs';
import MainFooter from './common/MainFooter';

/**
 * This class is the component for Authentication
 * It is responsible for managing all the state changes in the component
 * @class Header
 * @extends {React.Component}
 */
class Authentication extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class.
   * @param {any} props
   * @memberof Authentication
   */
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'sign-in',
    };
  }
  /**
   * Set the signin or signup to state
   * @return {void}
   */
  componentWillMount() {
    this.setState({
      activeTab: this.props.match.params.signup ? 'sign-up' : 'sign-in',
    });
  }
  /**
   * renders the Authentication component
   *
   * @return {jsx} - Authentication component
   */
  render() {
    const { activeTab } = this.state;
    return (
      <div>
        <Header />
        <div className="mainContainer">
          <div className="container">
            <div className="row">
              <div className="col s12 m4 l2" />
              <div
                className="col s12 m4 l8"
                style={{ backgroundColor: 'white' }}
              >
                <Tabs activeTab={activeTab} />
              </div>
              <div className="col s12 m4 l2" />
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    );
  }
}

Authentication.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      signup: PropTypes.string,
    }),
  }),
};

export default Authentication;
