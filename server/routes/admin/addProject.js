var express = require("express");
var router = express.Router();
var mongo = require("../../connection");

router.post("/", async function(req, res) {
  const db1 = mongo.get().collection("project_details");

  var max = await db1
    .find({})
    .sort({ _id: -1 })
    .toArray();

  var answer = {
    status: "",
    id: ""
  };
  if (max.length === 0) {
    max = 1;
  } else {
    max = max[0]._id + 1;
  }

  var projectDetails = {
    _id: max,
    PTITLE: req.body.PTITLE,
    PDOMAIN: req.body.PDOMAIN,
    PFACULTY: req.body.PFACULTY,
    PFACULTY_NAME: req.body.PFACULTY_NAME,
    LEAD: req.body.LEAD,
    LEADREGNO: req.body.LEADREGNO,
    S1NAME: req.body.S1NAME,
    S1NO: req.body.S1NO,
    S2NAME: req.body.S2NAME,
    S2NO: req.body.S2NO,
    S3NAME: req.body.S3NAME,
    S3NO: req.body.S3NO,
    PROGRESS: 0,
    STATUS: "ACTIVE"
  };

  await db1.insertOne(projectDetails, function(err, result) {
    answer.status = "sucess";
    answer.id = max;
    //console.log(answer);
    res.send(answer);
  });

  const db = mongo.get().collection("review");
  var _id = max;
  //console.log(_id);
  var rev = {
    _id: _id,
    REVIEW1: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Q1: "",
      R_Q2: "",
      R_Q3: "",
      R_Q4: "",
      R_Q5: "",
      R_PROGRESS: 0
    },
    REVIEW2: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Q1: "",
      R_Q2: "",
      R_Q3: "",
      R_Q4: "",
      R_Q5: "",
      R_PROGRESS: 0
    },
    REVIEW3: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Q1: "",
      R_Q2: "",
      R_Q3: "",
      R_Q4: "",
      R_Q5: "",
      R_PROGRESS: 0
    },
    REVIEW4: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Q1: "",
      R_Q2: "",
      R_Q3: "",
      R_Q4: "",
      R_Q5: "",
      R_PROGRESS: 0
    },
    REVIEW5: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Q1: "",
      R_Q2: "",
      R_Q3: "",
      R_Q4: "",
      R_Q5: "",
      R_PROGRESS: 0
    },
    OVERALL_PROGRESS: 0
  };
  db.insert(rev);
  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }
  const db2 = mongo.get().collection("project_duration");
  db2.insert({
    _id: max,
    START_DATE: toTimestamp(new Date()),
    END_DATE: 0
  });
});

router.get("/getProjectDetails", async function(req, res) {
  const db1 = mongo.get().collection("project_details");

  db1
    .find({})
    .sort({ _id: -1 })
    .toArray(function(err, result) {
      if (err) console.log(err);
      else res.send(result);
    });
});

router.post("/getIndividualProject", async function(req, res) {
  //console.log("Ss")
  const db1 = mongo.get().collection("project_details");
  //console.log("dkflas");
  //console.log(req.body._id)
  db1.find({ _id: parseInt(req.body._id) }).toArray(function(err, result) {
    if (err) console.log(err);
    else {
      //console.log(result);
      res.send(result);
    }
  });
});

router.post("/getProjectDuration", async function(req, res) {
  //console.log("Ss")
  const db1 = mongo.get().collection("project_duration");
  //console.log("dkflas");
  //console.log(req.body._id)
  db1.find({ _id: parseInt(req.body._id) }).toArray(function(err, result) {
    if (err) console.log(err);
    else {
      //console.log(result);
      res.send(result);
    }
  });
});

router.post("/getFacultyProjectDetails", async function(req, res) {
  const db1 = mongo.get().collection("project_details");
  var name = "";
  db1.find({ PFACULTY: req.body.PFACULTY }).toArray(function(err, result) {
    if (err) console.log(err);
    else {
      res.send(result);
      //console.log(result);
    }
    //res.send(result)};
  });
});

module.exports = router;
