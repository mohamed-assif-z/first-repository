var express = require("express");
var router = express.Router();
var mongo = require("../../connection");

router.post("/addReview", async function (req, res) {
  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }
  console.log(req.body.date);
  console.log(toTimestamp(req.body.date));
  //console.log(req.body);
  const db1 = mongo.get().collection("review");
  const db3 = mongo.get().collection("project_details");
  let _id = parseInt(req.body._id);
  let r_date = toTimestamp(req.body.date);
  let r_points = req.body.points;
  let r_comments = req.body.coments;
  let r_suggestions = req.body.suggestions;
  let review = req.body.review;
  let r_q1 = req.body.q1;
  let r_q2 = req.body.q2;
  let r_q3 = req.body.q3;
  let r_q4 = req.body.q4;
  let r_q5 = req.body.q5;
  let r_progress = req.body.progress;


  //console.log(ar);
  if (review == 1) {
    db1.update(
      { _id: _id },
      {
        $set: {
          REVIEW1: {
            R_DATE: r_date,
            R_POINTS: r_points,
            R_COMMENTS: r_comments,
            R_SUGGESTIONS: r_suggestions,
            R_Q1: r_q1,
            R_Q2: r_q2,
            R_Q3: r_q3,
            R_Q4: r_q4,
            R_Q5: r_q5,
            R_PROGRESS: r_progress
          }
        }
      }
    );
  }
  if (review == 2) {
    db1.update(
      { _id: _id },
      {
        $set: {
          REVIEW2: {
            R_DATE: r_date,
            R_POINTS: r_points,
            R_COMMENTS: r_comments,
            R_SUGGESTIONS: r_suggestions,
            R_Q1: r_q1,
            R_Q2: r_q2,
            R_Q3: r_q3,
            R_Q4: r_q4,
            R_Q5: r_q5,
            R_PROGRESS: r_progress
          }
        }
      }
    );
  }
  if (review == 3) {
    db1.update(
      { _id: _id },
      {
        $set: {
          REVIEW3: {
            R_DATE: r_date,
            R_POINTS: r_points,
            R_COMMENTS: r_comments,
            R_SUGGESTIONS: r_suggestions,
            R_Q1: r_q1,
            R_Q2: r_q2,
            R_Q3: r_q3,
            R_Q4: r_q4,
            R_Q5: r_q5,
            R_PROGRESS: r_progress
          }
        }
      }
    );
  }
  if (review == 4) {
    db1.update(
      { _id: _id },
      {
        $set: {
          REVIEW4: {
            R_DATE: r_date,
            R_POINTS: r_points,
            R_COMMENTS: r_comments,
            R_SUGGESTIONS: r_suggestions,
            R_Q1: r_q1,
            R_Q2: r_q2,
            R_Q3: r_q3,
            R_Q4: r_q4,
            R_Q5: r_q5,
            R_PROGRESS: r_progress
          }
        }
      }
    );
  }
  if (review == 5) {
    db1.update(
      { _id: _id },
      {
        $set: {
          REVIEW5: {
            R_DATE: r_date,
            R_POINTS: r_points,
            R_COMMENTS: r_comments,
            R_SUGGESTIONS: r_suggestions,
            R_Q1: r_q1,
            R_Q2: r_q2,
            R_Q3: r_q3,
            R_Q4: r_q4,
            R_Q5: r_q5,
            R_PROGRESS: r_progress
          }
        }
      }
    );       
    const db2 = mongo.get().collection("project_duration");
    db2.update({_id:_id},
      {
        $set:{
          END_DATE:r_date
        }
      })
      db3.update(
        { _id: _id },
        {
          $set: {
            STATUS : "CLOSED"
          }
        }      
      )
  }
  db1.find({_id:_id}).toArray((err,res)=>{
    console.log("check");
    console.log(res);
    var overallProgress=res[0].REVIEW1.R_PROGRESS+res[0].REVIEW2.R_PROGRESS+res[0].REVIEW3.R_PROGRESS+res[0].REVIEW4.R_PROGRESS+res[0].REVIEW5.R_PROGRESS;    
    console.log(overallProgress)
    db1.update(
      { _id: _id },
      {
        $set: {
          OVERALL_PROGRESS: overallProgress/5
        }
      }      
    )
    db3.update(
      { _id: _id },
      {
        $set: {
          PROGRESS : overallProgress/5
        }
      }      
    )
  })

  // var ans=0;
  // db1.find({ _id: _id }).toArray(function (err, result) {
  //   // console.log(result)
  //   // res.send(result);
  //   //review_id=result;
  //   console.log(result);
  //   ans=(result[0].REVIEW1.R_PROGRESS+result[0].REVIEW2.R_PROGRESS+result[0].REVIEW3.R_PROGRESS+result[0].REVIEW4.R_PROGRESS+result[0].REVIEW5.R_PROGRESS)/5;
  //   //console.log("this");
  //   //console.log(ans);
  // })
  // console.log(review_id);
  
  // const db = mongo.get().collection("project_details");
  // db.update(
  //   { _id: _id },
  //   {
  //     $set: {
  //       PROGRESS:100
  //     }
  //   }
  // );
});

router.post("/getAllReview", async function (req, res) {
  const db = mongo.get().collection("review");
  var _id = parseInt(req.body._id);
  db.find({ _id: _id }).toArray(function (err, result) {
    //console.log(result)
    res.send(result);
  })
})

router.post("/setOverallProgress", async function (req, res) {
  console.log("working set");
  console.log(req.body);
  const db = mongo.get().collection("project_details");
  var _id = parseInt(req.body._id);
  db.update(
    { _id: _id },
    {
      $set: {
        PROGRESS: req.body.progress,
        STATUS:req.body.status
      }
    }
  );

  const db1 = mongo.get().collection("review");
  db1.update(
    { _id: _id },
    {
      $set: {
        OVERALL_PROGRESS: req.body.progress
      }
    }
  );
})

router.post("/getReview", async function (req, res) {
  console.log("working");
  const db = mongo.get().collection("review");
  var _id = parseInt(req.body._id);
  var answer = {
    status: "",
    review: ""
  };
  //console.log(req.body.review);
  console.log(_id);
  if (req.body.review == 1) {
    db.find(
      {
        _id: _id
      },
      {
        REVIEW1: true
      }
    ).toArray(function (err, result) {
      if (err) console.log(err);
      else {
        //res.send(result);
        console.log(result);
        if (result[0].REVIEW1.R_DATE != '') {
          answer.status = 1;
          answer.review = result[0].REVIEW1;
        } else {
          answer.status = 0;
        }
        res.send(answer);
      }
    });
  }
  if (req.body.review == 2) {
    db.find(
      {
        _id: _id
      },
      {
        REVIEW2: true
      }
    ).toArray(function (err, result) {
      if (err) console.log(err);
      else {
        //res.send(result);
        console.log(result);
        if (result[0].REVIEW2.R_DATE != '') {
          answer.status = 1;
          answer.review = result[0].REVIEW2;
        } else {
          answer.status = 0;
        }
        res.send(answer);
      }
    });
  }
  if (req.body.review == 3) {
    db.find(
      {
        _id: _id
      },
      {
        REVIEW3: true
      }
    ).toArray(function (err, result) {
      if (err) console.log(err);
      else {
        //res.send(result);
        if (result[0].REVIEW3.R_DATE != '') {
          answer.status = 1;
          answer.review = result[0].REVIEW3;
        } else {
          answer.status = 0;
        }
        res.send(answer);
      }
    });
  }
  if (req.body.review == 4) {
    db.find(
      {
        _id: _id
      },
      {
        REVIEW4: true
      }
    ).toArray(function (err, result) {
      if (err) console.log(err);
      else {
        //res.send(result);
        console.log(result);
        if (result[0].REVIEW4.R_DATE != '') {
          answer.status = 1;
          answer.review = result[0].REVIEW4;
        } else {
          answer.status = 0;
        }
        res.send(answer);
      }
    });
  }
  if (req.body.review == 5) {
    db.find(
      {
        _id: _id
      },
      {
        REVIEW5: true
      }
    ).toArray(function (err, result) {
      if (err) console.log(err);
      else {
        //res.send(result);
        console.log(result);
        if (result[0].REVIEW5.R_DATE != '') {
          answer.status = 1;
          answer.review = result[0].REVIEW5;
        } else {
          answer.status = 0;
        }
        res.send(answer);
      }
    });
  }
});

module.exports = router;
