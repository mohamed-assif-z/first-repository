import React, { Component } from "react";
import { Button, Card, TextField } from "@material-ui/core";
import { withSnackbar } from 'notistack';

const axios = require("axios");

class Login extends Component {
  state = {
    UNAME: "",
    PASSWORD: "",
    status: 0
  };

  componentDidMount() {

  }

  login = e => {
    e.preventDefault();

    var data = {
      USER_ID: this.state.UNAME,
      PASSWORD: this.state.PASSWORD
    };
    axios
      .post("http://localhost:5000/project/loginCheck", data)
      .then(res => {
        if (res.data.status === 2) {
          //alert("Enter correct crendentials");
          this.props.enqueueSnackbar("Incorrecnt Credentials", {
            variant: 'error',
          });
        } else {
          if (res.data.role === 'A') {
            this.props.enqueueSnackbar("Login Successfull", {
              variant: 'success',
            });
            localStorage.setItem('user', this.state.UNAME);
            localStorage.setItem('fullname', res.data.uname);
            this.props.history.push("/coordinatorHome");
          }
          else {
            this.props.enqueueSnackbar("Login Successfull", {
              variant: 'success',
            });
            localStorage.setItem('user', this.state.UNAME);
            localStorage.setItem('fullname', res.data.uname);
            this.props.history.push("/facultyHome");
          }
        }
      })
      .catch(err => console.log(err));
  };

  UNAME = e => {
    this.setState({ UNAME: e.currentTarget.value });
  };

  PASSWORD = e => {
    this.setState({ PASSWORD: e.currentTarget.value });
  };
  render() {
    console.log(localStorage.getItem('myValueInLocalStorage'));
    return (
      <div>
        <Card style={{ width: "40%", marginLeft: "30%", marginTop: "10%" }}>
          <TextField
            label="User - ID"
            variant="outlined"
            onChange={e => this.UNAME(e)}
            style={{ width: "80%", marginLeft: "10%", marginTop: 20 }}
          />
          <br />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            onChange={e => this.PASSWORD(e)}
            style={{ width: "80%", marginLeft: "10%", marginTop: 20 }}
          />
          <br />
          <Button
            variant="outlined"
            style={{
              marginTop: 20,
              width: "30%",
              marginLeft: "35%",
              marginBottom: 20
            }}
            color="primary"
            onClick={e => this.login(e)}
          >
            Login
          </Button>
        </Card>
      </div>
    );
  }
}

export default withSnackbar(Login);
