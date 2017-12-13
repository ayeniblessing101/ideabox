import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import MainFooter from './common/MainFooter';
import { validateCreateIdeaInput } from '../validations/validations';
import { createAnIdea } from '../actions/ideaAction';

/**
 * This class is the component for CreateIdea
 * It is responsible for managing all the state changes in the component
 * @class CreateIdea
 * @extends {React.Component}
 */
class CreateIdea extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class.
   * @param {any} props
   * @memberof CreateIdea
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      ideaType: '',
      category: '',
      description: '',
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Checks if the signin form input(s) is valid
   * @memberof CreateIdea
   * @return {isValid} - checks if the fields are not empty
   */
  isValid() {
    const { errors, isValid } = validateCreateIdeaInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * handle handleChange event
   * @param {*} event
   * @memberof CreateIdea
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
      this.props.createAnIdea(this.state).then((response) => {
        if (response) {
          this.context.router.history.push('/dashboard');
          Materialize.toast(
            `${this.props.newIdea.newIdeaSuccessMessage}`,
            5000,
            'green',
          );
        } else {
          Materialize.toast(
            `${this.props.newIdea.newIdeaerrorMessage}`,
            5000,
            'red',
          );
        }
      });
    }
  }

  /**
   * initializes materialize sideNav, dropdown and select query method
   *
   * @returns {void}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();
    $('select').material_select();
  }

  /**
   * renders the CreateIdea component
   *
   * @return {jsx} - CreateIdea component
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col m3 s12 l3">
            <Sidebar />
          </div>
          <div className="col m7 s12 l7">
            <div className="row">
              <div className="col s12 m12 l9 ideaContent">
                <h5>Add a New Idea</h5>
                <form className="col s12 m12" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12 m12">
                      <input
                        id="title"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        className="validate required"
                      />
                      {errors.title && (
                        <span style={{ color: 'red' }}>{errors.title}</span>
                      )}
                      <label htmlFor="ideaTitle">Title</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 m6">
                      <select
                        className="icons required browser-default"
                        value={this.state.ideaType}
                        name="ideaType"
                        onChange={this.handleChange}
                      >
                        <option value="" disabled>
                          Choose your idea type
                        </option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                    </div>
                    <div className="col s12 m6">
                      <select
                        className="browser-default required"
                        value={this.state.category}
                        name="category"
                        onChange={this.handleChange}
                      >
                        <option value="" disabled>
                          Choose a category
                        </option>
                        <option value="Technology">Technology</option>
                        <option value="Science">Science</option>
                        <option value="Engineering">Engineering</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      className="materialize-textarea validate col s12 m12"
                    />
                    {errors.description && (
                      <span style={{ color: 'red' }}>{errors.description}</span>
                    )}
                  </div>
                  <button
                    className="btn btn-danger createIdeaBtn"
                    type="submit"
                  >
                    CREATE
                  </button>
                  <br />
                  <br />
                </form>
              </div>
              <div className="col s12 m4 l1" />
              <div className="col s12 m4 l2" />
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    );
  }
}

CreateIdea.propTypes = {
  createAnIdea: PropTypes.func.isRequired,
  newIdea: PropTypes.shape({
    newIdeaSuccessMessage: PropTypes.string.isRequired,
    newIdeaerrorMessage: PropTypes.string.isRequired,
  }),
};

CreateIdea.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  newIdea: state.ideaReducer,
});

export default connect(mapStateToProps, { createAnIdea })(CreateIdea);
