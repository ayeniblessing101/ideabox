import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authenticationAction';
import { filterIdeas } from '../../actions/filterIdeasAction';
import addCategory from '../../utils/addCategory';

/**
 * @class Sidebar
 * @extends {React.Component}
 */
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: '',
      category: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ category: addCategory(name, this.state.category) }, () => {
      this.props.filterIdeas(this.state);
    });
  }
  /**
   * This method is called when the logout button is clicked
   * it removed the user token from localstorage
   * @param {any} event
   * @memberof Header
   *
   * @return {void}
   */
  logout(event) {
    event.preventDefault();
    this.props.logout(this.state);
  }

  handleSearchChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * This method is called when the search
   * is made and redirects the search result page
   * @memberof Sidebar
   *
   * @return {void}
   */
  handleSubmit() {
    this.context.router.history
      .push(`/ideas/search?searchParams=${this.state.searchParams}`);
  }

  /**
   * Sidebar component
   *
   * @return {jsx} - Sidebar component
   */
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <Link
          to="/"
          data-activates="slide-out"
          className="button-collapse show-on-large"
        >
          <i className="material-icons">menu</i>
        </Link>
        <ul id="dropdown2" className="dropdown-content">
          <li>
            <Link to="/my-ideas">My Ideas</Link>
          </li>
          <li>
            <Link to="/dashboard">All Ideas</Link>
          </li>
        </ul>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <Link to="/settings">
              <i className="fa fa-cog fa-lg" aria-hidden="true" />Account
              Setting
            </Link>
          </li>
          <li>
            <button onClick={this.logout.bind(this)} className="logout">
              <span className="logout">
                <i className="fa fa-power-off fa-lg" aria-hidden="true" />
              </span>{' '}
              Logout
            </button>
          </li>
        </ul>

        <ul id="slide-out" className="side-nav fixed">
          <li>
            <Link to="/" className="brand-logo">
              <h4>IdeaBox</h4>
            </Link>
          </li>
          <li>
            <i
              className="fa fa-user-circle-o fa-fw fa-3x userAvatar"
              aria-hidden="true"
            />
          </li>
          <li>
            <Link
              className="dropdown-button userProfile"
              to="/"
              data-activates="dropdown1"
            >
              {isAuthenticated === true ? user.email : ''}
              <i className="fa fa-caret-down fa-fw right" aria-hidden="true" />
            </Link>
          </li>
          <div className="border" />
          <li>
            <form id="searchForm" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="searchParams"
                placeholder="Search for Ideas"
                value={this.state.searchParams}
                onChange={this.handleSearchChange}
                id="searchBar"
              />
            </form>
          </li>
          <div className="border" />
          <li>
            <Link to="/create-idea">
              <i
                className="fa fa-plus-circle fa-lg"
                aria-hidden="true"
                style={{ paddingRight: '0' }}
              />Add a new idea
            </Link>
          </li>
          <li>
            <Link to="/" className="dropdown-button" data-activates="dropdown2">
              <i className="fa fa-lightbulb-o fa-lg" aria-hidden="true" />
              Ideas
              <i className="fa fa-caret-down fa-fw right" aria-hidden="true" />
            </Link>
          </li>
          <div className="border" />
          <li>
            <div className="filterIdeas">
              <i className="fa fa-filter" aria-hidden="true" />Filter By
              Category
              <ul>
                <li>
                  <input
                    type="checkbox"
                    name="engineering"
                    className="filled-in"
                    id="Engineering"
                    value="engineering"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="Engineering">Engineering</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="technology"
                    className="filled-in"
                    id="Technology"
                    value="technology"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="Technology">Technology</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="science"
                    className="filled-in"
                    id="Science"
                    value="science"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="Science">Science</label>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  filterIdeas: PropTypes.func.isRequired,
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }),
};

Sidebar.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authenticationReducer,
});
export default connect(mapStateToProps, { logout, filterIdeas })(Sidebar);
