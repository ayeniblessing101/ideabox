import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Header from './common/Header';
import Sidebar from './common/Sidebar';

class Dashboard extends React.Component {
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col m3 s12 l3">
            <Sidebar />
          </div>
          <div className="col m7 s12 l7 ideaDashboard">
            <h5>All Ideas</h5>
            <div id="card-container" className="row">
              <div className="col s12 m6 l4">
                <div className="card ">
                  <div className="card-content">
                    <span className="card-title">Card Title</span>
                    <p>
                      I am a very simple card. I am good at containing small
                      bits of information. I am convenient because I require
                      little markup to use effectively.
                    </p>
                  </div>
                  <div className="card-action">
                    <Link to="/">
                      <i className="fa fa-share left" aria-hidden="true" />
                    </Link>
                    <Link to="/">
                      <i className="fa fa-comment-o right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l4">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title">Card Title</span>
                    <p>
                      I am a very simple card. I am good at containing small
                      bits of information. I am convenient because I require
                      little markup to use effectively.
                    </p>
                  </div>
                  <div className="card-action">
                    <Link to="/">
                      <i className="fa fa-share left" aria-hidden="true" />
                    </Link>
                    <Link to="/">
                      <i className="fa fa-comment-o right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l4">
                <div className="card ">
                  <div className="card-content ">
                    <span className="card-title">Card Title</span>
                    <p>
                      I am a very simple card. I am good at containing small
                      bits of information. I am convenient because I require
                      little markup to use effectively.
                    </p>
                  </div>
                  <div className="card-action">
                    <Link to="/">
                      <i className="fa fa-share left" aria-hidden="true" />
                    </Link>
                    <Link to="/">
                      <i className="fa fa-comment-o right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l4">
                <div className="card ">
                  <div className="card-content">
                    <span className="card-title">Card Title</span>
                    <p>
                      I am a very simple card. I am good at containing small
                      bits of information. I am convenient because I require
                      little markup to use effectively.
                    </p>
                  </div>
                  <div className="card-action">
                    <Link to="/">
                      <i className="fa fa-share left" aria-hidden="true" />
                    </Link>
                    <Link to="/">
                      <i className="fa fa-comment-o right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l4">
                <div className="card ">
                  <div className="card-content">
                    <span className="card-title">Card Title</span>
                    <p>
                      I am a very simple card. I am good at containing small
                      bits of information. I am convenient because I require
                      little markup to use effectively.
                    </p>
                  </div>
                  <div className="card-action">
                    <Link to="/">
                      <i className="fa fa-share left" aria-hidden="true" />
                    </Link>
                    <Link to="/">
                      <i className="fa fa-comment-o right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l4">
                <div className="card ">
                  <div className="card-content">
                    <span className="card-title">Card Title</span>
                    <p>
                      I am a very simple card. I am good at containing small
                      bits of information. I am convenient because I require
                      little markup to use effectively.
                    </p>
                  </div>
                  <div className="card-action">
                    <Link to="/">
                      <i className="fa fa-share left" aria-hidden="true" />
                    </Link>
                    <Link to="/">
                      <i className="fa fa-comment-o right" aria-hidden="true" />
                    </Link>
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

export default Dashboard;
