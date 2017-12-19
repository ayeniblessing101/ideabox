import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import queryString from 'query-string';
import { connect } from 'react-redux';
import MainFooter from './common/MainFooter';
import Sidebar from './common/Sidebar';
import { searchIdeas } from '../actions/ideaAction';
/**
 * This class is the component for SearchResult
 * It is responsible for managing all the state changes in the component
 * @class SearchResult
 * @extends {React.Component}
 */
class SearchResult extends React.Component {
  /**
   * set the ideas to state
   * @param {*} props
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      ideas: this.props.ideas,
    };
    this.searchParams = queryString.parse(this.props.location.search).searchParams;
  }

  /**
   * initializes materialize sideNav, dropdown jquery method
   * and calls the getAllIdeas method
   *
   * @return {void}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();
    this.props.searchIdeas(this.searchParams);
  }

  /**
   * updates the component with new ideas created
   * @param {array} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      ideas: nextProps.ideas,
    });
  }

  /**
   * renders the Dashboard component
   *
   * @return {jsx} - Dashboard component
   */
  render() {
    const { ideas } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col m3 s12 l3">
            <Sidebar />
          </div>
          <div className="col m7 s12 l7 ideaDashboard">
            <h5>Search Result(s)</h5>
            <div id="card-container" className="row">
              {ideas && ideas.length === 0
                ? 'Search returned no match'
                : ideas.map((idea, index) => {
                  return (
                    <div className="col s12 m12 l6" key={index}>
                      <div className="card ">
                        <div className="card-content">
                          <div className="card-profile-header">
                            <span
                              className="new badge"
                              data-badge-caption={idea.ideaType}
                            />
                            <div className="card-profile-name">
                              <span className="author">
                                  Author: {idea.user.firstname}
                              </span>
                              <span className="dateCreated">
                                {moment(idea.createdAt).format('DD/MM/YY')}
                              </span>
                            </div>
                          </div>
                          <span className="card-title">{idea.title}</span>
                          <p>
                            {idea.description.substr(0, 15)}
                            {
                              <span
                                style={{
                                  fontSize: '10px',
                                  fontWeight: '300',
                                }}
                              >
                                {' '}
                                <Link to={`/idea/${idea._id}`}>
                                    Read More{' '}
                                </Link>
                              </span>
                            }
                            <span className="edited-card-text">
                              {idea.modified === true ? '[..edited]' : ' '}
                            </span>
                          </p>
                        </div>
                        <div className="card-action">
                          <Link to="/">
                            <i className="fa fa-share" aria-hidden="true" />
                          </Link>
                          <Link to="/">
                            {idea.ideaType === 'Public' ? (
                              <i
                                className="fa fa-comment-o"
                                aria-hidden="true"
                              />
                            ) : (
                              ''
                            )}
                          </Link>
                          <span
                            className="new badge blue ideaCategory"
                            data-badge-caption={idea.category}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    );
  }
}

SearchResult.propTypes = {
  searchIdeas: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  ideas: PropTypes.array,
};

const mapStateToProps = state => ({
  ideas: state.ideaReducer.ideas,
  auth: state.authenticationReducer.user,
});

export default connect(mapStateToProps, { searchIdeas })(SearchResult);
