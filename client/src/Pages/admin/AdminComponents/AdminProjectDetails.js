import React, { Component } from "react";
import { Typography, Toolbar, IconButton, Button, Table, TableHead, TableCell, TableRow, TableBody, Card, Tooltip, Paper, InputBase } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { Progress } from "react-sweet-progress";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import AdminProjectHome from "./../../project/adminProjectHomePage";
import FullScreenModel from './../../FullScreenModel';
import { withRouter } from "react-router-dom";

const styles = theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        flex: 1
    },
    root1: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 260
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
});




class coordinatorHome extends Component {

    state = {
        projectDetails: [],
        facultyDetails: [],
        facultyName: "",
        _id: "",
        open: false,
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
            alert("You Cannot View Projects List So Please Login Again");
            this.props.history.push("/login");
        }
    }
    

    //Search Project Id
    projectID = e => {
        this.setState({ _id: e.currentTarget.value });
    };

    navigate = e => {
        console.log(e);
        localStorage.setItem("project_id", e);
        localStorage.setItem("open", true);
        this.setState({
            open: true
        });
    };
    handleClose = () => {
        this.setState({
            open: false
        })
        this.componentDidMount();
    };

    pendingSnack = () => {
        this.props.enqueueSnackbar("Project not yet Completed", {
            variant: "warning"
        });
    };
    closedSnack = () => {
        this.props.enqueueSnackbar("Project Completed", {
            variant: "success"
        });
    };

    search = () => {
        var data = {
            _id: this.state._id
        };
        axios
            .post(
                "http://localhost:5000/project/addProject/getIndividualProject",
                data
            )
            .then(res =>
                this.setState({
                    projectDetails: res.data
                })
            )
            .catch(err => console.log(err));
    };

    refresh = () => {
        this.setState({
            projectDetails: [],
            facultyDetails: [],
            _id:""
        });
        this.componentDidMount()
    }

    render() {

        const { classes } = this.props;

        return (

            <div>
                <Card style={{ marginLeft: "10%", marginRight: "10%", marginTop: 20 }}>
                    <Toolbar style={{ backgroundColor: "#3f51b5 " }}>
                        <Typography style={{ marginLeft: "auto", marginRight: "auto", color: "white" }}>
                            PROJECTS
                        </Typography>

                        {/* Search Project */}
                        <Paper component="form" className={classes.root1}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Projects by Project ID"
                                value={this.state._id}
                                onChange={e => this.projectID(e)}
                            />
                            <IconButton
                                onClick={() => this.search()}
                                className={classes.iconButton}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        {/* Search Project */}
                        <Button variant="contained" color="secondary" style={{ marginLeft: "1%" }} onClick={this.refresh}>Refresh</Button>
                    </Toolbar>
                    <div>
                        <Table size="large" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">PROJECT ID</TableCell>
                                    <TableCell align="center">TITLE</TableCell>
                                    <TableCell align="center">DOMAIN</TableCell>
                                    <TableCell align="center">FACULTY</TableCell>
                                    <TableCell align="center">PROJECT LEAD</TableCell>
                                    <TableCell align="center">PROGRESS</TableCell>
                                    <TableCell align="center">STATUS</TableCell>
                                    <TableCell align="center">OPEN OROJECT</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.projectDetails.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{item._id}</TableCell>
                                        <TableCell align="center">{item.PTITLE}</TableCell>
                                        <TableCell align="center">{item.PDOMAIN}</TableCell>
                                        <TableCell align="center">
                                            {item.PFACULTY_NAME} - {item.PFACULTY}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.LEAD} - {item.LEADREGNO}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.PROGRESS < 35 ? (
                                                <Progress
                                                    theme={{
                                                        low: {
                                                            color: "red"
                                                        }
                                                    }}
                                                    type="circle"
                                                    width={50}
                                                    percent={item.PROGRESS}
                                                    status="low"
                                                />
                                            ) : item.PROGRESS > 75 ? (
                                                <Progress
                                                    theme={{
                                                        done: {
                                                            color: "#4CAF50"
                                                        }
                                                    }}
                                                    type="circle"
                                                    width={50}
                                                    percent={item.PROGRESS}
                                                    status="done"
                                                />
                                            ) : (
                                                        <Progress
                                                            theme={{
                                                                active: {
                                                                    color: "blue"
                                                                }
                                                            }}
                                                            type="circle"
                                                            width={50}
                                                            percent={item.PROGRESS}
                                                            status="active"
                                                        />
                                                    )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.STATUS === "ACTIVE" ? (
                                                <Button
                                                    onClick={() => this.pendingSnack()}
                                                    style={{
                                                        backgroundColor: "#4CAF50",
                                                        width: "100%"
                                                    }}
                                                >
                                                    <Typography
                                                        style={{ color: "white", fontSize: 13 }}
                                                    >
                                                        ACTIVE
                                                    </Typography>
                                                </Button>
                                            ) : (
                                                    <Button
                                                        onClick={() => this.closedSnack()}
                                                        style={{ backgroundColor: "grey", width: "100%" }}
                                                    >
                                                        <Typography
                                                            style={{ color: "white", fontSize: 13 }}
                                                        >
                                                            CLOSED
                                                        </Typography>
                                                    </Button>
                                                )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="View Detailed Information">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => this.navigate(parseInt(item._id))}
                                                >
                                                    VIEW
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>


                <FullScreenModel component={<AdminProjectHome user="a"/>} open={this.state.open} handleClose={this.handleClose} title="Project Home Page" />

            </div>
        );
    }
}

export default withRouter(withSnackbar(withStyles(styles)(coordinatorHome)));


