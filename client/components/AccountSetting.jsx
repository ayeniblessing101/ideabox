import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Sidebar from './common/Sidebar';
import MainFooter from './common/MainFooter';
import { validateUpdateProfileInput } from '../validations/validations';
import { getAUser, updateAUserProfile } from '../actions/userAction';

/**
 * @class AccountSetting
 * @extends {React.Component}
 */
class AccountSetting extends React.Component {
  /**
   * binds onchange and onsubmit event to the form
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      email: this.props.user.email,
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Checks if the form input(s) is valid
   * @memberof AccountSetting
   * @return {isValid} - checks if the fields are not empty
   */
  isValid() {
    const { errors, isValid } = validateUpdateProfileInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * handle handleChange event
   * @param {*} event
   * @memberof AccountSetting
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
   * @memberof AccountSetting
   *
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props.updateAUserProfile(this.state).then((response) => {
        if (response) {
          Materialize.toast(
            `${this.props.message.successMessage}`,
            4000,
            'green',
          );
          this.props.getAUser(this.state);
        }
      });
    } else {
      Materialize.toast(`${this.props.message.error}`, 4000, 'red');
    }
  }

  /**
   * Calls the getUser method when the component has mounted
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getAUser();
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();
  }

  /**
   * updates the component with new user details
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      firstname: nextProps.user.firstname,
      lastname: nextProps.user.lastname,
      email: nextProps.user.email,
    });
  }
  /**
   * renders AccountSetting component
   *
   * @returns {jsx} - AccountSettings component
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col m3 s12 l3">
            <Sidebar />
          </div>
          <div className="col m7 s12 l7">
            <div className="row">
              <div className="col s12 m12 l9 ideaContent">
                <h5>General Account Settings</h5>
                <form className="col s12 m12" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12 m12">
                      <input
                        id="firstname"
                        type="text"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleChange}
                        className="validate required"
                      />
                      {errors.firstname && (
                        <span style={{ color: 'red' }}>{errors.firstname}</span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12">
                      <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleChange}
                        className="validate required"
                      />
                      {errors.lastname && (
                        <span style={{ color: 'red' }}>{errors.lastname}</span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="validate required"
                      />
                      {errors.email && (
                        <span style={{ color: 'red' }}>{errors.email}</span>
                      )}
                    </div>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    UPDATE
                  </button>
                  <br />
                </form>
              </div>
              <div className="col s12 m4 l1" />
              <div className="col s12 m4 l2" />
            </div>
            <br />
            <br />
          </div>
        </div>
        <MainFooter />
      </div>
    );
  }
}
AccountSetting.propTypes = {
  getAUser: PropTypes.func.isRequired,
  updateAUserProfile: PropTypes.func.isRequired,
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  message: PropTypes.shape({
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  message: state.userReducer,
});

export default connect(mapStateToProps, { getAUser, updateAUserProfile })(AccountSetting, );
