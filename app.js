var createError = require("http-errors");
var express = require("express");
var path = require("path");
const sequelize = require("./db");

var coursesRouter = require("./routes/courses");
const Course = require("./models/Course");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", coursesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

async function setup() {
  //TODO: This where you will create your very first instance
  const webdev = await Course.create({
    courseid: "CPTS489",
    coursename: "Web Development",
    semester: "Spring",
    coursedesc: "Introduction to Web Development",
    enrollnum: 80,
  });
}

sequelize.sync({ force: true }).then(() => {
  console.log("Sequelize Sync Completed...");
  setup().then(() => console.log("Setup complete"));
});

module.exports = app;
