import React, { Component } from "react";
import { Grid,Button,Tooltip} from "@material-ui/core";
import { withSnackbar } from "notistack";
import AddProjectPage from "./AddFacultyAndProjectComponents/addProjectPage";
import AddOrEditFaculty from "./AddFacultyAndProjectComponents/AddOrEditFaculty";
import FullScreenModel from './../../FullScreenModel';
import { withRouter } from "react-router-dom";

import axios from "axios";




class AddFacultyAndProject extends Component {
  state = {
    projectDetails: [],
    facultyDetails: [],
    facultyName: "",
    _id: "",
    open1: false,
    open2: false
  };

  componentDidMount() {
    var a = localStorage.getItem("user");
    if (a === "ADMIN") {
      axios
        .get("http://localhost:5000/project/addProject/getProjectDetails")
        .then(res =>
          this.setState({
            projectDetails: res.data
          })
        )
        .catch(err => console.log(err));

      console.log(this.state.projectDetails);

      axios
        .get("http://localhost:5000/project/addFaculty/getFacultyDetails/")
        .then(res =>
          this.setState({
            facultyDetails: res.data
          })
        )
        .catch(err => console.log(err));
    } else {
      alert("You Cannot Add Project and Faculty So Please Login Again");
      this.props.history.push("/login");
    }
  }
 
  handleClickOpen=(e)=>{
    console.log(e.currentTarget.id)
    console.log(e.currentTarget.name)
    this.setState({
      [e.currentTarget.name]: e.currentTarget.id==='true'
    });
  }
 

  handleCloseAddProject = () => {
    this.setState({
      open1: false
    });
    this.componentDidMount();
  };  

  handleCloseAddFaculty = () => {
    this.setState({
      open2: false
    });
    this.componentDidMount();
  }; 

  render() {



    return (
      <div style={{ marginBottom: "2%" }}>

        <Grid container spacing={5}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            item
            xs={12}
            sm={6}
          >
            <h2 style={{ marginLeft: 20 }}>
              Welcome {localStorage.getItem("user")} !
            </h2>
            <h4 style={{ marginLeft: 20 }}>
              Total No. Of Projects : {this.state.projectDetails.length}{" "}
            </h4>
            <h4 style={{ marginLeft: 20 }}>
              Total No. Of Faculties : {this.state.facultyDetails.length - 1}{" "}
            </h4>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            item
            xs={12}
            sm={6}
          >
            <Tooltip title="Add a new project" placement="right">
              <Button
                variant="outlined"
                color="primary"
                id="true"
                name="open1"
                onClick={this.handleClickOpen}
              >
                Add Project
              </Button>
            </Tooltip>
            <Tooltip title="Add/Edit Faculty Details" placement="left">
              <Button
                variant="outlined"
                color="primary"
                id="true"
                name="open2"
                onClick={this.handleClickOpen}
              >
                Add/Edit Faculty
              </Button>
            </Tooltip>
          </Grid>
        </Grid>       
        
         <FullScreenModel component={<AddProjectPage handleClose={this.handleCloseAddProject}/>} open={this.state.open1} handleClose={this.handleCloseAddProject}  title="Add new Project"/>
        <FullScreenModel component={ <AddOrEditFaculty />} open={this.state.open2} handleClose={this.handleCloseAddFaculty} title="Add/Edit Faculty Details"/>
       
        
      </div>
    );
  }
}

export default withRouter(withSnackbar(AddFacultyAndProject));

