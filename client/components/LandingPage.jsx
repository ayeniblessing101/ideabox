import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

/**
 * renders the LandingPage component
 *
 * @return {jsx} - LandingPage component
 */
const LandingPage = () => {
  return (
    <div>
      <div className="mainWrapper">
        <div className="header">
          <Navbar />
        </div>
        <div className="mainContent">
          <div className="row">
            <div className="col s12 m12 l6">
              <div className="ideaboxFig">
                <div className="ideaboxMainFig">
                  <img src="/images/laptop.png" alt="laptop" />
                  <div className="ideaInner" style={{ left: 20, top: -67 }}>
                    <img src="images/food.png" alt="food" />
                  </div>
                  <div className="ideaInner" style={{ left: 10, top: 120 }}>
                    <img src="/images/camera.png" alt="camera" />
                  </div>
                  <div className="ideaInner" style={{ left: 70, top: 300 }}>
                    <img src="images/headphone.png" alt="headphone" />
                  </div>
                  <div
                    className="ideaInner"
                    style={{ left: 180, bottom: -100 }}
                  >
                    <img src="images/pen.png" width="200" alt="pen" />
                  </div>
                  <div className="ideaInner" style={{ right: 40, top: 130 }}>
                    <img src="images/juice.png" alt="juice" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col s12 m12 l6">
              <div className="weAre">
                <h1>We Are</h1>
                <h4>Idea Box</h4>
                <span>
                  Ideabox is a simple application that allows<br /> users to
                  create a pool of ideas and <br /> promote collaboration.<br />
                  <br />
                  Ths simple application also allows users to edit,<br /> delete
                  ideas and also add comments to existing Ideas.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
