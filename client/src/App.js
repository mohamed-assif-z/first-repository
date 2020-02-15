
import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import addProject from "./Pages/admin/AdminComponents/AddFacultyAndProjectComponents/addProjectPage";
// import addFaculty from "./Pages/admin/AdminComponents/AddFacultyAndProjectComponents/addFacultyPage";
// import viewFaculty from "./Pages/admin/viewFacultyPage";
import CoordinatorHome from "./Pages/admin/coordinatorHome";
import login from "./Pages/loginPage";
import facultyHome from "./Pages/faculty/facultyHome";
// import projectPage from "./Pages/faculty/projectHomePage";
// import srsPage from "./Pages/faculty/srsPage";
// import basicPage from "./Pages/faculty/basicPage";
// import reviewPageHome from "./Pages/faculty/reviewPageHome";
// import AprojectPage from "./Pages/admin/adminProjectHomePage";
// import AsrsPage from "./Pages/admin/adminSrsPage";
// import AbasicPage from "./Pages/admin/adminBasicPage";
// import AreviewPageHome from "./Pages/admin/adminReviewPageHome";



class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={login}></Route>
          {/* <Route exact path="/addProject" component={addProject}></Route>
          <Route exact path="/addFaculty" component={addFaculty}></Route>
          <Route exact path="/viewFaculty" component={viewFaculty}></Route>*/}
          <Route exact path="/login" component={login}></Route> 
          <Route
            exact
            path="/coordinatorHome"
            component={CoordinatorHome}
          ></Route>
          <Route
            exact
            path="/facultyHome"
            component={facultyHome}
          ></Route>
          {/* <Route exact path="/projectHomePage" component={projectPage}></Route>
          <Route exact path="/srsPage" component={srsPage}></Route>
          <Route exact path="/basicPage" component={basicPage}></Route>
          <Route exact path="/reviewPageHome" component={reviewPageHome}></Route>

          <Route exact path="/adminProjectHomePage" component={AprojectPage}></Route>
          <Route exact path="/adminSrsPage" component={AsrsPage}></Route>
          <Route exact path="/adminBasicPage" component={AbasicPage}></Route>
          <Route exact path="/adminReviewPageHome" component={AreviewPageHome}></Route> */}
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
