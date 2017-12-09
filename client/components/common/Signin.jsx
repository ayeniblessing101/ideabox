import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validateLoginInput } from '../../validations/validations';
import { loginAUser } from '../../actions/authenticationAction';

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
      email: '',
      password: '',
      errors: {},
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
          this.context.router.history.push('/');
        }
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <form className="col s12 m12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12 m12">
              <input
                id="email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="validate"
              />
              {errors.email && (
                <span style={{ color: 'red' }}>{errors.email}</span>
              )}
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12">
              <input
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="validate"
              />
              {errors.password && (
                <span style={{ color: 'red' }}>{errors.password}</span>
              )}
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="btn btn-primary" type="submit" name="action">
            SIGN IN
          </button>
          <br />
          <br />
          <Link to="/">Forgot your password?</Link>
        </form>
      </div>
    );
  }
}

Signin.propTypes = {
  loginAUser: PropTypes.func.isRequired,
};

Signin.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(null, { loginAUser })(Signin);
