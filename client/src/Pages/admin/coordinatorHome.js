import React, { Component } from "react";

import AdminProjectDetails from './AdminComponents/AdminProjectDetails';
import AdminHomeHeader from './AdminComponents/AdminHomeHeader';
import AddFacultyAndProject from './AdminComponents/AddFacultyAndProject';


class coordinatorHome extends Component {  

  render() {

    return (
      <div style={{ marginBottom: "2%" }}>
        <AdminHomeHeader/>
        <AddFacultyAndProject/>
        <AdminProjectDetails/>     
      </div>
    );

  }
}

export default coordinatorHome;

