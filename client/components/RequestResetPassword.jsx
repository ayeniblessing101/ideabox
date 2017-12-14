import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestPasswordChange } from '../actions/resetPasswordAction';
import { validateEmailInput } from '../validations/validations';

/**
 * @class ResetPassword
 * @extends {React.Component}
 */
class RequestResetPassword extends React.Component {
  /**
   * binds onchange and onsubmit event to the form
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      resetPasswordEmail: '',
      errors: {},
      successMessage: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Checks if the signin form input(s) is valid
   * @memberof Signin
   * @return {isValid} - checks if the fields are not empty
   */
  isValid() {
    const { errors, isValid } = validateEmailInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
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
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * handle handleSubmit event
   * @param {*} event
   * @memberof Signin
   *
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, error: '', successMessage: '' });
    if (this.isValid()) {
      this.props
        .requestPasswordChange(this.state)
        .then((response) => {
          if (response) {
            this.setState({ successMessage: response.data.message });
          }
        })
        .catch((error) => {
          this.setState({ errors: {} });
          this.setState({ error: error.response.data.error });
        });
    }
  }

  /**
   * renders the ResetPassword Component
   *
   * @returns {jsx} - object
   */
  render() {
    const { errors, successMessage, error } = this.state;
    return (
      <div>
        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content resetPassword">
            <div className="resetPasswordInfo">
              <h4>Reset Your Password</h4>
              <p>
                Please provide the email address you used when you signed up for
                your IdeaBox account.
              </p>
              <p>
                We will send you an email with a link to reset your password.
              </p>
            </div>
            <div className="row resetPasswordFormContainer">
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {error && <div className="alert alert-danger">{error}</div>}
              {errors.resetPasswordEmail && (
                <span style={{ color: 'red' }}>
                  {errors.resetPasswordEmail}
                </span>
              )}
              <div className="resetPasswordForm">
                <div className="input-field col s8">
                  <input
                    id="resetPasswordEmail"
                    type="email"
                    name="resetPasswordEmail"
                    value={this.state.resetPasswordEmail}
                    onChange={this.handleChange}
                    className="validate"
                  />
                </div>

                <div className="input-field col s4">
                  <button type="button" onClick={this.handleSubmit}>
                    SEND EMAIL
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-action modal-close waves-effect waves-green btn-flat reset-button "
            >
              Close
            </a>
          </div>
        </div>
      </div>
    );
  }
}

RequestResetPassword.propTypes = {
  requestPasswordChange: PropTypes.func.isRequired,
};

export default connect(null, { requestPasswordChange })(RequestResetPassword);
