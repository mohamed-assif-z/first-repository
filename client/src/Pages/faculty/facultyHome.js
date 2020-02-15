import React, { Component } from "react";

import FacultyHomeHeader from './FacultyComponents/FacultyHomeHeader';
import FacultyIntroduction from './FacultyComponents/FacultyIntroduction';
import FacultyProjectDetails from './FacultyComponents/FacultyProjectDetails';

class facultyHome extends Component {
  
  render() {
    return (
      <div>
        <FacultyHomeHeader/>               
        <div style={{ padding: "1%" }}>    
          <FacultyIntroduction/>    
          <FacultyProjectDetails/>                     
        </div>
      </div>
    );
  }
}

export default facultyHome;
