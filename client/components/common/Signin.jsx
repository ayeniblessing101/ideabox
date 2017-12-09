import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {
  render() {
    return (
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
          <br />
          <br />
          <Link to="/">Forgot your password?</Link>
        </form>
      </div>
    );
  }
}

export default Signup;
