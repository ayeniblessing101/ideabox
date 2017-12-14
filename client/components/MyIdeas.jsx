import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import { getAllIdeasByAUser, deleteAnIdea } from '../actions/ideaAction';

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
    this.deleteIdea = this.deleteIdea.bind(this);
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
   * deletes an idea
   * @param {string} ideaId
   * @returns {void}
   */
  deleteIdea(ideaId) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to recover the document",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      allowOutsideClick: false,
    }).then(() => {
      this.props.deleteAnIdea(ideaId).then((response) => {
        if (response) {
          swal({
            type: 'success',
            html: `${this.props.idea.successMessage}`,
            title: 'Success',
            allowOutsideClick: false,
            showCloseButton: true,
            confirmButtonText: 'Ok',
          });
          this.props.getAllIdeasByAUser();
        } else {
          swal({
            type: 'error',
            html: `${this.props.idea.error}`,
            showCloseButton: true,
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
          });
        }
      });
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
                          <span className="card-title cardTitle">{myIdea.title}</span>
                          <p>
                            {myIdea.description}{' '}
                            <span className="edited-card-text">
                              {myIdea.modified === true ? '[..edited]' : ' '}
                            </span>
                          </p>
                        </div>
                        <div className="card-action">
                          <Link to={`/my-idea/${myIdea._id}`}>
                            <i
                              className="fa fa-pencil-square-o fa-lg left"
                              aria-hidden="true"
                            />
                          </Link>
                          <button
                            className="delete"
                            onClick={() => this.deleteIdea(myIdea._id)}
                          >
                            <i
                              className="fa fa-trash fa-lg left"
                              aria-hidden="true"
                            />
                          </button>
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
  deleteAnIdea: PropTypes.func.isRequired,
  myIdeas: PropTypes.array.isRequired,
  idea: PropTypes.shape({
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  myIdeas: state.ideaReducer.myIdeas,
  idea: state.ideaReducer,
});

export default connect(mapStateToProps, { getAllIdeasByAUser, deleteAnIdea })(MyIdeas, );
