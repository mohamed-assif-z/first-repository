import React, { Component } from "react";
import {
  Typography,
  Toolbar,
  Button,
  Card,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  Fade
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";
const axios = require("axios");

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "1%"
  },
  paper: {
    padding: theme.spacing(3, 2),
    marginRight: "1%",
    marginLeft: "1%"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  card: {
    maxWidth: 345,
    marginLeft: "1%"
  }
});

class ReviewHome extends Component {
  state = {
    date: new Date(),
    points: "",
    coments: "",
    suggestions: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    review: 1,
    progress: 0,
    display: false,
    disableStatus:false
  };
  logout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };
  submitReview = () => {
    let data = {
      _id: parseInt(localStorage.getItem("project_id")),
      date: this.state.date,
      points: this.state.points,
      coments: this.state.coments,
      suggestions: this.state.suggestions,
      progress: this.state.progress,
      q1: this.state.q1,
      q2: this.state.q2,
      q3: this.state.q3,
      q4: this.state.q4,
      q5: this.state.q5,
      review: this.state.review
    };
    //console.log(data);
    if (
      !data.date ||
      !data.points ||
      !data.coments ||
      !data.suggestions ||
      !data.progress ||
      !data.q1 ||
      !data.q2 ||
      !data.q3 ||
      !data.q4 ||
      !data.q5 ||
      !data.review
    ) {
      this.props.enqueueSnackbar("Enter all Details", {
        variant: "error"
      });
    } else {
      this.props.enqueueSnackbar("Updated Successfully", {
        variant: "success"
      });
      axios
        .post("http://localhost:5000/project/review/addReview", data)
        .then(res => {
          // alert("Updated SuccessFully");
          // console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  };
  componentDidMount() {
    let data = {
      _id: parseInt(localStorage.getItem("project_id")),
      review: 1
    };
    if(this.props.user==='f')
    {
      this.setState({
        disableStatus:true
      })
    }
    axios
      .post("http://localhost:5000/project/review/getReview", data)
      .then(res => {
        console.log(res.data);
        console.log(new Date(res.data.review.R_DATE));
        if (res.data.status === 1) {
          this.setState({
            date: new Date(res.data.review.R_DATE * 1000),
            points: res.data.review.R_POINTS,
            coments: res.data.review.R_COMMENTS,
            suggestions: res.data.review.R_SUGGESTIONS,
            q1: res.data.review.R_Q1,
            q2: res.data.review.R_Q2,
            q3: res.data.review.R_Q3,
            q4: res.data.review.R_Q4,
            q5: res.data.review.R_Q5,
            progress: res.data.review.R_PROGRESS
          });
        } else {
          this.setState({
            date: new Date(),
            points: "",
            coments: "",
            suggestions: "",
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            progress: 0
          });
        }
      })
      .catch(err => console.log(err));
  }
  handleDateChange = date => {
    this.setState({
      date: date
    });
    console.log(date);
    console.log(this.state);
  };
  handlePoints = e => {
    this.setState({
      points: e.target.value
    });
  };
  handleComents = e => {
    this.setState({
      coments: e.target.value
    });
  };
  handleSuggestions = e => {
    this.setState({
      suggestions: e.target.value
    });
  };
  q1Change = e => {
    this.setState({
      q1: e.target.value
    });
  };
  q2Change = e => {
    this.setState({
      q2: e.target.value
    });
  };
  q3Change = e => {
    this.setState({
      q3: e.target.value
    });
  };
  q4Change = e => {
    this.setState({
      q4: e.target.value
    });
  };
  q5Change = e => {
    this.setState({
      q5: e.target.value
    });
  };
  handleSlide = e => {
    console.log(e);
    this.setState({
      progress: e
    });
  };
  navigate = e => {
    this.props.history.push("/adminProjectHomePage");
  };
  setReview = e => {
    this.setState({
      review: e.target.value
    });
    let data = {
      _id: parseInt(localStorage.getItem("project_id")),
      review: e.target.value
    };
    axios
      .post("http://localhost:5000/project/review/getReview", data)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 1) {
          this.setState({
            date: new Date(res.data.review.R_DATE * 1000),
            points: res.data.review.R_POINTS,
            coments: res.data.review.R_COMMENTS,
            suggestions: res.data.review.R_SUGGESTIONS,
            q1: res.data.review.R_Q1,
            q2: res.data.review.R_Q2,
            q3: res.data.review.R_Q3,
            q4: res.data.review.R_Q4,
            q5: res.data.review.R_Q5,
            progress: res.data.review.R_PROGRESS
          });
        } else {
          this.setState({
            date: new Date(),
            points: "",
            coments: "",
            suggestions: "",
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            progress: 0
          });
        }
        // this.setState({
        //   console.log(res.data);
        // })
      })
      .catch(err => console.log(err));
  };
  openReview = () => {
    this.setState({
      display: true
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <div style={{marginBottom:"2%"}}>
          <Card style={{ width: "70%", marginLeft: "15%" }}>
            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <FormControl
                variant="outlined"
                style={{ width: "50%", marginLeft: "25%" }}
              >
                <InputLabel>Choose Review</InputLabel>
                <Select onChange={this.setReview} value={this.state.review}>
                  <MenuItem value={1}>Review 1</MenuItem>
                  <MenuItem value={2}>Review 2</MenuItem>
                  <MenuItem value={3}>Review 3</MenuItem>
                  <MenuItem value={4}>Review 4</MenuItem>
                  <MenuItem value={5}>Review 5</MenuItem>
                </Select>
              </FormControl>
              <Button
                style={{
                  width: "20%",
                  marginLeft: "40%",
                  marginTop: 20,
                  marginBottom: 20
                }}
                variant="outlined"
                color="primary"
                onClick={() => this.openReview()}
              >
                Open Review Form
              </Button>
            </div>
          </Card>
          <Fade in={this.state.display}>
            <Card style={{ width: "70%", marginLeft: "15%" }}>
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      disabled={this.state.disableStatus}
                      margin="normal"
                      id="date-picker-dialog"
                      label="Select Date"
                      format="dd/MM/yyyy"
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                      value={this.state.date}
                      onChange={e => this.handleDateChange(e)}
                    />
                    <KeyboardTimePicker
                      disabled={this.state.disableStatus}
                      margin="normal"
                      id="time-picker"
                      label="Select Time"
                      KeyboardButtonProps={{
                        "aria-label": "change time"
                      }}
                      value={this.state.date}
                      onChange={this.handleDateChange}
                    />
                  </Grid>
                  <form style={{ marginTop: 20 }}>
                    <div style={{ marginTop: 10 }}>
                      <TextField
                      disabled={this.state.disableStatus}
                        style={{ width: "100%" }}
                        id="Points_Discussed"
                        label="Points Discussed"
                        multiline
                        rows="4"
                        variant="outlined"
                        onChange={this.handlePoints}
                        value={this.state.points}
                      />
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <TextField
                      disabled={this.state.disableStatus}
                        style={{ width: "100%" }}
                        id="Comments"
                        label="Comments"
                        multiline
                        rows="4"
                        variant="outlined"
                        onChange={this.handleComents}
                        value={this.state.coments}
                      />
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <TextField
                      disabled={this.state.disableStatus}
                        style={{ width: "100%" }}
                        id="Suggestions"
                        label="Suggestions"
                        multiline
                        rows="4"
                        variant="outlined"
                        onChange={this.handleSuggestions}
                        value={this.state.suggestions}
                      />
                    </div>
                  </form>
                  <Card style={{ marginTop: 20 }}>
                    <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
                      <Typography
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          color: "white"
                        }}
                      >
                        Evaluation
                      </Typography>
                    </Toolbar>
                    <div style={{ textAlign: "center" }}>
                      <FormControl component="fieldset">
                        <Typography style={{ marginTop: 20 }}>
                          Question 1
                        </Typography>
                        <RadioGroup
                          aria-label="position"
                          name="position"
                          value={this.state.q1}
                          onChange={e => this.q1Change(e)}
                          row
                        >
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Very Bad"
                            control={<Radio color="primary" />}
                            label="Very Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Bad"
                            control={<Radio color="primary" />}
                            label="Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Satisfactory"
                            control={<Radio color="primary" />}
                            label="Satisfactory"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Good"
                            control={<Radio color="primary" />}
                            label="Good"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Excellent"
                            control={<Radio color="primary" />}
                            label="Excellent"
                            labelPlacement="bottom"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Card>

                  <Card style={{ marginTop: 20 }}>
                    <div style={{ textAlign: "center" }}>
                      <FormControl component="fieldset">
                        <Typography style={{ marginTop: 20 }}>
                          Question 2
                        </Typography>
                        <RadioGroup
                          aria-label="position"
                          name="position"
                          value={this.state.q2}
                          onChange={e => this.q2Change(e)}
                          row
                        >
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Very Bad"
                            control={<Radio color="primary" />}
                            label="Very Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Bad"
                            control={<Radio color="primary" />}
                            label="Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Satisfactory"
                            control={<Radio color="primary" />}
                            label="Satisfactory"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Good"
                            control={<Radio color="primary" />}
                            label="Good"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Excellent"
                            control={<Radio color="primary" />}
                            label="Excellent"
                            labelPlacement="bottom"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Card>

                  <Card style={{ marginTop: 20 }}>
                    <div style={{ textAlign: "center" }}>
                      <FormControl component="fieldset">
                        <Typography style={{ marginTop: 20 }}>
                          Question 3
                        </Typography>
                        <RadioGroup
                          aria-label="position"
                          name="position"
                          value={this.state.q3}
                          onChange={e => this.q3Change(e)}
                          row
                        >
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Very Bad"
                            control={<Radio color="primary" />}
                            label="Very Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Bad"
                            control={<Radio color="primary" />}
                            label="Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Satisfactory"
                            control={<Radio color="primary" />}
                            label="Satisfactory"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Good"
                            control={<Radio color="primary" />}
                            label="Good"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Excellent"
                            control={<Radio color="primary" />}
                            label="Excellent"
                            labelPlacement="bottom"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Card>

                  <Card style={{ marginTop: 20 }}>
                    <div style={{ textAlign: "center" }}>
                      <FormControl component="fieldset">
                        <Typography style={{ marginTop: 20 }}>
                          Question 4
                        </Typography>
                        <RadioGroup
                          aria-label="position"
                          name="position"
                          value={this.state.q4}
                          onChange={e => this.q4Change(e)}
                          row
                        >
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Very Bad"
                            control={<Radio color="primary" />}
                            label="Very Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Bad"
                            control={<Radio color="primary" />}
                            label="Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Satisfactory"
                            control={<Radio color="primary" />}
                            label="Satisfactory"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Good"
                            control={<Radio color="primary" />}
                            label="Good"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Excellent"
                            control={<Radio color="primary" />}
                            label="Excellent"
                            labelPlacement="bottom"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Card>

                  <Card style={{ marginTop: 20 }}>
                    <div style={{ textAlign: "center" }}>
                      <FormControl component="fieldset">
                        <Typography style={{ marginTop: 20 }}>
                          Question 5
                        </Typography>
                        <RadioGroup                        
                          aria-label="position"
                          name="position"
                          value={this.state.q5}
                          onChange={e => this.q5Change(e)}
                          row
                        >
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Very Bad"
                            control={<Radio color="primary" />}
                            label="Very Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Bad"
                            control={<Radio color="primary" />}
                            label="Bad"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Satisfactory"
                            control={<Radio color="primary" />}
                            label="Satisfactory"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Good"
                            control={<Radio color="primary" />}
                            label="Good"
                            labelPlacement="bottom"
                          />
                          <FormControlLabel
                          disabled={this.state.disableStatus}
                            value="Excellent"
                            control={<Radio color="primary" />}
                            label="Excellent"
                            labelPlacement="bottom"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Card>

                  <Card style={{ marginTop: 20, width: "100%" }}>
                    <div
                      style={{
                        textAlign: "center",
                        width: "80%",
                        marginLeft: "10%"
                      }}
                    >
                      <Typography>Progress Level</Typography>
                      <Slider
                      disabled={this.state.disableStatus}
                        style={{ marginTop: 40 }}
                        value={this.state.progress}
                        onChange={(e, value) => this.handleSlide(value)}
                        step={1}
                        marks
                        min={0}
                        max={100}
                        valueLabelDisplay="on"
                      />
                    </div>
                  </Card>
                  {
                    !this.state.disableStatus ? (
                  <Button
                    style={{
                      width: "20%",
                      marginLeft: "40%",
                      marginTop: 20,
                      marginBottom: 20
                    }}
                    variant="outlined"
                    color="primary"
                    onClick={() => this.submitReview()}
                  >
                    Submit Review
                  </Button>
                    ):""
                  }
                </MuiPickersUtilsProvider>
              </div>
            </Card>
          </Fade>
        </div>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(ReviewHome));
