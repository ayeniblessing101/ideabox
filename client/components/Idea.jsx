import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import { validateCommentInput } from '../validations/validations';
import {
  getAnIdea,
  addAComment,
  getAnIdeaComments,
} from '../actions/ideaAction';

/**
 * This class is the component for MyIdeas
 * It is responsible for managing all the state changes in the component
 * @class MyIdeas
 * @extends {React.Component}
 */
class Idea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      idea: this.props.Idea,
      errors: {},
      comments: this.props.comments,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * calls the getAnIdea method when the
   * component is done mount
   *
   * @return {void}
   */
  componentDidMount() {
    this.props.getAnIdea(this.props.match.params.id);
    this.props.getAnIdeaComments(this.props.match.params.id);
  }
  /**
   * updates the component with new idea details
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      idea: nextProps.Idea,
      comments: nextProps.comments,
    });
  }
  /**
   * handle handleChange event
   * @param {*} event
   * @memberof Idea
   *
   * @returns {void}
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * Checks if the form input(s) is valid
   * @memberofIdea
   * @return {isValid} - checks if the fields are not empty
   */
  isValid() {
    const { errors, isValid } = validateCommentInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * handle handleSubmit event
   * @param {*} event
   * @memberof Idea
   *
   * @returns {void}
   */
  handleSubmit(event) {
    this.setState({ errors: {}, comment: '' });
    event.preventDefault();
    if (this.isValid()) {
      this.props
        .addAComment(this.props.match.params.id, this.state)
        .then((response) => {
          if (response) {
            this.props.getAnIdeaComments();
          }
        });
    }
  }

  /**
   * renders the MyIdeas component
   *
   * @return {jsx} - MyIdeas component
   */
  render() {
    const { errors, idea, comments } = this.state;
    return (
      <div>
        <Header />
        <div className="row singleIdea">
          <div className="col m3 s12 l3">
            <Sidebar />
          </div>
          <div className="col m7 s12 l9 ">
            <div className="col s12 m12 l11">
              <div className="card large">
                <div className="card-content read-content">
                  <div className="card-profile-header profile-header">
                    <div>
                      <span
                        className="new badge blue"
                        data-badge-caption={idea.category}
                      />
                      <span
                        className="new badge"
                        data-badge-caption={idea.ideaType}
                      />
                    </div>

                    <div className="card-profile-name">
                      <span className="author">
                        Author: {idea.user.firstname}
                      </span>
                      <span className="dateCreated">
                        Created: {moment(idea.createdAt).format('DD/MM/YY')}
                      </span>
                    </div>
                  </div>
                  <span className="card-title singleIdeaTitle">
                    {idea.title}
                  </span>
                  <div className="description-comment">
                    <div className="description">
                      <p>
                        {idea.description}{' '}
                        <span>
                          <script
                            async
                            src="https://platform.twitter.com/widgets.js"
                            charSet="utf-8"
                          />

                          <a
                            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                            className="twitter-share-button"
                            data-show-count="false"
                          >
                            <i className="fa fa-twitter" aria-hidden="true" />
                          </a>
                        </span>
                      </p>
                    </div>
                    <div>
                      {comments.map((comment, index) => {
                        return (
                          <ul key={index}>
                            <li className="comment">
                              <span>{comment.user.firstname}</span>
                              <span>
                                {moment(
                                  comment.createdAt,
                                  moment.ISO_8601,
                                ).fromNow()}
                              </span>
                              <span>{comment.comment}</span>
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="card-action commentCardAction">
                  {errors.comment && (
                    <span style={{ color: 'red' }}>{errors.comment}</span>
                  )}
                  <div className="commentForm">
                    <div className="input-field col s10">
                      <input
                        id="comment"
                        type="text"
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleChange}
                        className="validate"
                      />
                    </div>

                    <div className="input-field col s2">
                      <button type="button" onClick={this.handleSubmit}>
                        COMMENT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Idea.propTypes = {
  getAnIdea: PropTypes.func.isRequired,
  addAComment: PropTypes.func.isRequired,
  getAnIdeaComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  Idea: PropTypes.shape({
    title: PropTypes.string.isRequired,
    ideaType: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  Idea: state.ideaReducer.idea,
  comments: state.ideaReducer.comments,
});

export default connect(mapStateToProps, {
  getAnIdea,
  addAComment,
  getAnIdeaComments,
})(Idea);
