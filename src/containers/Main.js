import React, { Component } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import { settings } from "../portfolio.js";

export default class Main extends Component {
  render() {
    // const theme = this.props.theme;
    // console.log(theme);
    if (settings.isSplash) {
      return (
        <div>
          <HashRouter basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route
                path={`${process.env.PUBLIC_URL}/`}
                exact
                render={(props) => (
                  <Splash {...props} theme={this.props.theme} />
                )}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/home`}
                render={(props) => <Home {...props} theme={this.props.theme} />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/experience`}
                exact
                render={(props) => (
                  <Experience {...props} theme={this.props.theme} />
                )}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/education`}
                render={(props) => (
                  <Education {...props} theme={this.props.theme} />
                )}
              />
              {/* <Route
                path="/opensource"
                render={(props) => (
                  <Opensource {...props} theme={this.props.theme} />
                )}
              /> */}
              <Route
                path={`${process.env.PUBLIC_URL}/contact`}
                render={(props) => (
                  <Contact {...props} theme={this.props.theme} />
                )}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/splash`}
                render={(props) => (
                  <Splash {...props} theme={this.props.theme} />
                )}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/projects`}
                render={(props) => (
                  <Projects {...props} theme={this.props.theme} />
                )}
              />
            </Switch>
          </HashRouter>
        </div>
      );
    } else {
      return (
        <div>
          <HashRouter basename={"/"}>
            <Switch>
              <Route
                path={`${process.env.PUBLIC_URL}/`}
                exact
                render={(props) => <Home {...props} theme={this.props.theme} />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/home`}
                render={(props) => <Home {...props} theme={this.props.theme} />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/experience`}
                exact
                render={(props) => (
                  <Experience {...props} theme={this.props.theme} />
                )}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/education`}
                render={(props) => (
                  <Education {...props} theme={this.props.theme} />
                )}
              />
              {/* <Route
                path="/opensource"
                render={(props) => (
                  <Opensource {...props} theme={this.props.theme} />
                )}
              /> */}
              <Route
                path={`${process.env.PUBLIC_URL}/contact`}
                render={(props) => (
                  <Contact {...props} theme={this.props.theme} />
                )}
              />
              {/* <Route
							path="/splash"
							render={(props) => (
								<Splash
									{...props}
									theme={this.props.theme}
								/>
							)}
						/> */}
              <Route
                path={`${process.env.PUBLIC_URL}/projects`}
                render={(props) => (
                  <Projects {...props} theme={this.props.theme} />
                )}
              />
            </Switch>
          </HashRouter>
        </div>
      );
    }
  }
}
