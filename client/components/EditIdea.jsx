import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import MainFooter from './common/MainFooter';
import { validateUpdateIdeaInput } from '../validations/validations';
import { getAnIdea, updateAnIdea } from '../actions/ideaAction';

/**
 * This class is the component for MyIdeas
 * It is responsible for managing all the state changes in the component
 * @class EditIdea
 * @extends {React.Component}
 */
class EditIdea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.idea.title,
      ideaType: this.props.idea.ideaType,
      category: this.props.idea.category,
      description: this.props.idea.description,
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handle handleChange event
   * @param {*} event
   * @memberof EditIdea
   *
   * @returns {void}
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Checks if the form input(s) is valid
   * @memberof EditIdea
   * @return {isValid} - checks if the fields are not empty
   */
  isValid() {
    const { errors, isValid } = validateUpdateIdeaInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * handle handleSubmit event
   * @param {*} event
   * @memberof EditIdea
   *
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props
        .updateAnIdea(this.props.match.params.id, this.state)
        .then((response) => {
          if (response) {
            this.context.router.history.push('/my-ideas');
          }
        });
    }
  }

  /**
   * calls the getAnIdea method when the
   * component is done mount
   *
   * @return {void}
   */
  componentDidMount() {
    this.props.getAnIdea(this.props.match.params.id);
  }

  /**
   * updates the component with new idea details
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.idea.title,
      ideaType: nextProps.idea.ideaType,
      category: nextProps.idea.category,
      description: nextProps.idea.description,
    });
  }

  /**
   * renders the EditIdea Component
   *
   * @returns {jsx} - object
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
                <h5>Edit Idea</h5>
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
                      <label htmlFor="title">Title</label>
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
                        {errors.ideaType && (
                          <span style={{ color: 'red' }}>
                            {errors.ideaType}
                          </span>
                        )}
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
                      {errors.category && (
                        <span style={{ color: 'red' }}>{errors.category}</span>
                      )}
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
                    UPDATE
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

EditIdea.propTypes = {
  getAnIdea: PropTypes.func.isRequired,
  updateAnIdea: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  idea: PropTypes.shape({
    title: PropTypes.string.isRequired,
    ideaType: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

EditIdea.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  idea: state.ideaReducer.idea,
});

export default connect(mapStateToProps, { getAnIdea, updateAnIdea })(EditIdea);
