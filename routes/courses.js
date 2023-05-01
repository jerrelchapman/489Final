var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Course = require("../models/Course");

/* Validators */
//TODO: THis is where you need to implement your custom validators
const courseidValidator = async (value) => {
  if (!value.startsWith("CPTS")) {
    throw new Error("CourseID must start with CPTS");
  }
};
const enrollnumValidator = async (value, { req }) => {
  const courseid = req.body.courseid;
  const courseType = courseid.charAt(4);
  if (courseType == 4 && value > 60) {
    throw new Error("For 400 level courses enrollnum should not exceed 60");
  }
};

router.get("/", async function (req, res, next) {
  const courses = await Course.findAll();
  if (req.query.msg) {
    res.locals.msg = req.query.msg;
  }
  res.render("courses", { courses });
});

router.post(
  "/create",
  //TODO: This is where you will be using your custom validators
  body("courseid").custom(courseidValidator),
  body("enrollnum").custom(enrollnumValidator),
  async function (req, res, next) {
    try {
      const result = validationResult(req);
      const result2 = result.formatWith((error) => error.msg);
      const errors2 = result2.array();
      console.log(errors2);
      if (!result.isEmpty()) {
        throw new Error(errors2[0]);
      } else {
        await Course.create({
          courseid: req.body.courseid,
          coursename: req.body.coursename,
          semester: req.body.semester,
          coursedesc: req.body.coursedesc,
          enrollnum: req.body.enrollnum,
        });
        res.redirect("/?msg=success");
      }
    } catch (error) {
      res.redirect("/?msg=" + new URLSearchParams(error.toString()).toString());
    }
  }
);

router.get("/:recordid", async function (req, res, next) {
  const course = await Course.findCourse(req.params.recordid);
  if (course) {
    res.render("coursedetails", { course });
  } else {
    res.redirect("/?msg=course+not+found");
  }
});

module.exports = router;
