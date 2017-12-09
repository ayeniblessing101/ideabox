import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validateSignUpInput } from '../../validations/validations';
import { createNewUser } from '../../actions/authenticationAction';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      errors: {},
      password: '',
      confirmPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * handle onchange event
   * @param {*} event
   * @memberof Signup
   *
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Checks if the form input(s) is valid
   * @memberof Signup
   * @return {isValid} - checks if the fields are not empty
   */
  isValid() {
    const { errors, isValid } = validateSignUpInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * handle onsubmit event
   * @param {*} event
   * @memberof Signup
   *
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.createNewUser(this.state).then(
        (response) => {
          if (response) {
            this.context.router.history.push('/');
          }
        },
        ({ response }) => {
          this.setState({
            errors: response.data,
          });
        },
      );
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <form className="col s12 m12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6 m6">
              <input
                id="firstname"
                type="text"
                name="firstname"
                className="validate"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
              {errors.firstname && (
                <span style={{ color: 'red' }}>{errors.firstname}</span>
              )}
              <label htmlFor="firstname">First Name*</label>
            </div>
            <div className="input-field col s6 m6">
              <input
                id="lastname"
                type="text"
                name="lastname"
                className="validate"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
              {errors.lastname && (
                <span style={{ color: 'red' }}>{errors.lastname}</span>
              )}
              <label htmlFor="lastname">Last Name*</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input
                id="email"
                type="email"
                name="email"
                className="validate"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {errors.email && (
                <span style={{ color: 'red' }}>{errors.email}</span>
              )}
              <label htmlFor="email">Email*</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6 m6">
              <input
                id="password"
                type="password"
                name="password"
                className="validate"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {errors.password && (
                <span style={{ color: 'red' }}>{errors.password}</span>
              )}
              <label htmlFor="password">Password*</label>
            </div>
            <div className="input-field col s6 m6">
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="validate"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              {errors.confirmPassword && (
                <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
              )}
              <label htmlFor="confirmPassword">Confirm Password*</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            SIGN UP
          </button>
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  createNewUser: PropTypes.func.isRequired,
};

Signup.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(null, { createNewUser })(Signup);
