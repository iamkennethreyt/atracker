import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

import DashboardPage from "./components/DashboardPage/DashboardPage";
import LoginPage from "./components/LoginPage/LoginPage";
import AboutPage from "./components/AboutPage/AboutPage";
import TeachersPage from "./components/TeachersPage/TeachersPage";
import AddTeachersPage from "./components/TeachersPage/AddTeachersPage";
import EditTeachersPage from "./components/TeachersPage/EditTeachersPage";
import StudentsPage from "./components/StudentPage/StudentsPage";
import AddStudentsPage from "./components/StudentPage/AddStudentsPage";
import EditStudentsPage from "./components/StudentPage/EditStudentsPage";
import SectionsPage from "./components/SectionPage/SectionsPage";
import AddSectionsPage from "./components/SectionPage/AddSectionsPage";
import ClassSectionsPage from "./components/ClassSectionsPage/ClassSectionsPage";
import AddClassSectionsPage from "./components/ClassSectionsPage/AddClassSectionsPage";
import EditClassSectionsPage from "./components/ClassSectionsPage/EditClassSectionsPage";
import AddStudentClassSectionPage from "./components/ClassSectionsPage/AddStudentClassSectionPage";
import SettingsPage from "./components/SettingsPage/SettingsPage";

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check fo expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //redirect to
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={DashboardPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/teachers" component={TeachersPage} />
            <Route exact path="/teachers/add" component={AddTeachersPage} />
            <Route
              exact
              path="/teachers/edit/:id"
              component={EditTeachersPage}
            />

            <Route exact path="/students" component={StudentsPage} />
            <Route exact path="/students/add" component={AddStudentsPage} />
            <Route
              exact
              path="/students/edit/:id"
              component={EditStudentsPage}
            />
            <Route exact path="/sections" component={SectionsPage} />
            <Route exact path="/sections/add" component={AddSectionsPage} />

            <Route exact path="/classsections" component={ClassSectionsPage} />
            <Route
              exact
              path="/classsections/add"
              component={AddClassSectionsPage}
            />
            <Route
              exact
              path="/classsections/edit/:id"
              component={EditClassSectionsPage}
            />
            <Route
              exact
              path="/classsections/register/student/:id"
              component={AddStudentClassSectionPage}
            />
            <Route exact path="/settings" component={SettingsPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
