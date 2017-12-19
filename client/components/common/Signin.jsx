import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { connect } from 'react-redux';
import { validateLoginInput } from '../../validations/validations';
import { loginAUser } from '../../actions/authenticationAction';
import RequestResetPassword from '../RequestResetPassword';

/**
 * @class signin
 * @extends {React.Component}
 */
class Signin extends Component {
  /**
   * binds onchange and onsubmit event to the form
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * initializes materialize modal jQuery mthod
   * when the component mounts
   *
   * @return {void}
   */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
   * Checks if the signin form input(s) is valid
   * @memberof Signin
   * @return {isValid} - checks if the fields are not empty
   */
  isValid() {
    const { errors, isValid } = validateLoginInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  /**
   * handle handleChange event
   * @param {*} event
   * @memberof Signin
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
    if (this.isValid()) {
      this.props.loginAUser(this.state).then((response) => {
        if (response) {
          this.context.router.history.push('/dashboard');
          Materialize.toast(`${this.props.auth.successMessage}`, 4000, 'green');
        } else {
          Materialize.toast(`${this.props.auth.error}`, 4000, 'red');
        }
      });
    }
  }

  /**
   *  renders Signin component
   *
   * @return {jsx} - Signin component
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <form className="col s12 m12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12 m12">
              <input
                id="userEmail"
                type="email"
                name="userEmail"
                value={this.state.userEmail}
                onChange={this.handleChange}
                className="validate"
              />
              {errors.userEmail && (
                <span style={{ color: 'red' }}>{errors.userEmail}</span>
              )}
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input
                id="userPassword"
                type="password"
                name="userPassword"
                value={this.state.userPassword}
                onChange={this.handleChange}
                className="validate"
              />
              {errors.userPassword && (
                <span style={{ color: 'red' }}>{errors.userPassword}</span>
              )}
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="btn btn-primary signinBtn" type="submit">
            SIGN IN
          </button>
          <br />
          <br />
          <button
            data-target="modal1"
            className="btn modal-trigger forgetPasswordBtn"
          >
            Forgot your password?
          </button>
          <RequestResetPassword />
        </form>
      </div>
    );
  }
}

Signin.propTypes = {
  loginAUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }),
};

Signin.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authenticationReducer,
});

export default connect(mapStateToProps, { loginAUser })(Signin);
