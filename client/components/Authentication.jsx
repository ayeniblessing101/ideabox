import React from 'react';
import Header from './common/Header';
import Tabs from './common/Tabs';
import MainFooter from './common/MainFooter';

class Authentication extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="mainContainer">
          <div className="container">
            <div className="row">
              <div className="col s12 m4 l2" />
              <div className="col s12 m4 l8">
                <Tabs />
              </div>
              <div className="col s12 m4 l2" />
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    );
  }
}

export default Authentication;
