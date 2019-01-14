import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../Layouts/Navbar";
import SideNavbar from "../Layouts/SideNavbar";
import FooterPage from "../Layouts/FooterPage";

class AboutPage extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar />
            </div>
            <div className="col-md-9">
              <div className="container dark-grey-text">
                <section className="team-section text-center my-5">
                  <h2 className="h1-responsive font-weight-bold my-5">
                    Our amazing team
                  </h2>
                  <p className="grey-text w-responsive mx-auto mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit, error amet numquam iure provident voluptate esse
                    quasi, veritatis totam voluptas nostrum quisquam eum porro a
                    pariatur veniam.
                  </p>

                  <div className="row text-center">
                    <div className="col-md-3 mb-md-0 mb-5">
                      <div className="avatar mx-auto">
                        <img
                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                          className="rounded z-depth-1-half w-100"
                          alt="Sample avatar"
                        />
                      </div>
                      <h4 className="font-weight-bold dark-grey-text my-4">
                        Tobe Sederiosa
                      </h4>
                      <h6 className="text-uppercase grey-text mb-3">
                        <strong>Scrum Master</strong>
                      </h6>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-5">
                      <div className="avatar mx-auto">
                        <img
                          src="https://mdbootstrap.com/img/Photos/Avatars/img(8).jpg"
                          className="rounded z-depth-1-half w-100"
                          alt="Sample avatar"
                        />
                      </div>
                      <h4 className="font-weight-bold dark-grey-text my-4">
                        Vince Mata
                      </h4>
                      <h6 className="text-uppercase grey-text mb-3">
                        <strong>Frontend UI Developer</strong>
                      </h6>
                    </div>
                    <div className="col-md-3">
                      <div className="avatar mx-auto">
                        <img
                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                          className="rounded z-depth-1-half w-100"
                          alt="Sample avatar"
                        />
                      </div>
                      <h4 className="font-weight-bold dark-grey-text my-4">
                        Manoy Rosal
                      </h4>
                      <h6 className="text-uppercase grey-text mb-3">
                        <strong>Backend Software Engineer</strong>
                      </h6>
                    </div>
                    <div className="col-md-3">
                      <div className="avatar mx-auto">
                        <img
                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(29).jpg"
                          className="rounded z-depth-1-half w-100"
                          alt="Sample avatar"
                        />
                      </div>
                      <h4 className="font-weight-bold dark-grey-text my-4">
                        Boss Ranger
                      </h4>
                      <h6 className="text-uppercase grey-text mb-3">
                        <strong>Test Engineer</strong>
                      </h6>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </React.Fragment>
    );
  }
}

AboutPage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AboutPage);
