import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import { getAllIdeasByAUser } from '../actions/ideaAction';

/**
 * This class is the component for MyIdeas
 * It is responsible for managing all the state changes in the component
 * @class MyIdeas
 * @extends {React.Component}
 */
class MyIdeas extends React.Component {
  /**
   * set the ideas to state
   * @param {*} props
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      myIdeas: this.props.myIdeas,
    };
  }

  /**
   * initializes materialize sideNav, dropdown query method
   *
   * @returns {void}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();
    this.props.getAllIdeasByAUser();
  }

  /**
   * updates the component with new ideas created
   * @param {array} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      myIdeas: nextProps.myIdeas,
    });
  }

  /**
   * renders the MyIdeas component
   *
   * @return {jsx} - MyIdeas component
   */
  render() {
    const { myIdeas } = this.state;
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col m3 s12 l3">
            <Sidebar />
          </div>
          <div className="col m7 s12 l7 ideaDashboard">
            <h5>My Ideas</h5>
            <div id="card-container" className="row">
              {myIdeas !== '' ? (
                myIdeas.map((myIdea, index) => {
                  return (
                    <div className="col s12 m12 l6" key={index}>
                      <div className="card ">
                        <div className="card-content">
                          <div className="card-profile-header">
                            <span
                              className="new badge"
                              data-badge-caption={myIdea.ideaType}
                            />
                            <div className="card-profile-name">
                              <span className="author">
                                Author: {myIdea.user.firstname}
                              </span>
                              <span className="dateCreated">
                                {moment(myIdea.createdAt).format('DD/MM/YY')}
                              </span>
                            </div>
                          </div>
                          <span className="card-title">{myIdea.title}</span>
                          <p>
                            {myIdea.description}{' '}
                            <span className="edited-card-text">[..edited]</span>
                          </p>
                        </div>
                        <div className="card-action">
                          <Link to="/">
                            <i
                              className="fa fa-trash fa-lg left"
                              aria-hidden="true"
                            />
                          </Link>
                          <Link to="/">
                            <i
                              className="fa fa-pencil-square-o fa-lg left"
                              aria-hidden="true"
                            />
                          </Link>
                          <span
                            className="new badge blue"
                            data-badge-caption={myIdea.category}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h3>No Ideas</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyIdeas.propTypes = {
  getAllIdeasByAUser: PropTypes.func.isRequired,
  myIdeas: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  myIdeas: state.ideaReducer.myIdeas,
});

export default connect(mapStateToProps, { getAllIdeasByAUser })(MyIdeas);
