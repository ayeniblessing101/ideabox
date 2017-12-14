import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './common/Header';
import MainFooter from './common/MainFooter';
import { validatesaveNewPasswordInput } from '../validations/validations';
import { resetPassword } from '../actions/resetPasswordAction';

/**
 * @class ResetPassword
 * @extends {React.Component}
 */
class ResetPassword extends React.Component {
  /**
   * binds onchange and onsubmit event to the form
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmNewPassword: '',
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handle handleChange event
   * @param {*} event
   * @memberof ResetPassword
   *
   * @returns {void}
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * Checks if the ResetPassword  form input(s) is valid
   * @memberof ResetPassword
   * @return {isValid} - checks if the fields are not empty
   */
  isValid() {
    const { errors, isValid } = validatesaveNewPasswordInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * handle handleSubmit event
   * @param {*} event
   * @memberof ResetPassword
   *
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    const token = this.props.location.search.split('=')[1];
    if (this.isValid()) {
      this.props.resetPassword(token, this.state).then((response) => {
        if (response) {
          Materialize.toast(
            `${this.props.newPassword.successMessage}`,
            4000,
            'green',
          );
        } else {
          Materialize.toast(`${this.props.newPassword.error}`, 4000, 'red');
        }
      });
    }
  }

  /**
   *  renders ResetPassword component
   *
   * @return {jsx} - ResetPassword component
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Header />
        <div className="mainContainer">
          <div className="container">
            <div className="row">
              <div className="col s12 m4 l2" />
              <div
                className="col s12 m4 l8"
                style={{ backgroundColor: 'white', marginTop: '50px' }}
              >
                <h4>Password Reset</h4>
                <div className="row">
                  <form className="col s12 m12" onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="input-field col s12 m12">
                        <input
                          id="newPassword"
                          type="password"
                          name="newPassword"
                          value={this.state.newPassword}
                          onChange={this.handleChange}
                          className="validate"
                        />
                        {errors.newPassword && (
                          <span style={{ color: 'red' }}>
                            {errors.newPassword}
                          </span>
                        )}
                        <label htmlFor="newPassword">New Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12 m12">
                        <input
                          id="confirmNewPassword"
                          type="password"
                          name="confirmNewPassword"
                          value={this.state.confirmNewPassword}
                          onChange={this.handleChange}
                          className="validate"
                        />
                        {errors.confirmNewPassword && (
                          <span style={{ color: 'red' }}>
                            {errors.confirmNewPassword}
                          </span>
                        )}
                        <label htmlFor="confirmNewPassword">
                          Confirm New Password
                        </label>
                      </div>
                    </div>
                    <button className="btn btn-primary signinBtn" type="submit">
                      CHANGE MY PASSWORD
                    </button>
                    <br />
                    <br />
                  </form>
                </div>
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

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  newPassword: PropTypes.shape({
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

ResetPassword.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  newPassword: state.resetPasswordReducer,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
